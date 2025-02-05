var mongoose = require("mongoose");
var models = require("../models/Utilizador");
var Utilizador = models.Utilizador;
var Doador = models.Doador;
var Funcionario = models.Funcionario;
var Entidade = models.Entidade;
var Doacao = require("../models/Doacao");

const Admin = models.Admin;

const bcrypt = require("bcryptjs");
var path = require("path");
var fs = require("fs");
const { render } = require("ejs");
const { log } = require("console");

var utilizadorController = {};

// função para redirecionar para a página home do utilizador
utilizadorController.home = async function (req, res) {
  await res.render("../views/utilizadores/index");
};

// função que lista os utilizadores da base de dados
utilizadorController.list = function (req, res) {
  Utilizador.find({}).exec(function (err, utilizadorList) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/utilizadores/lista_utilizadores", {
        utilizadores: utilizadorList,
      });
    }
  });
};

// função que redireciona para o perfil do utilizador selecionado através do id
utilizadorController.show = function (req, res) {
  Utilizador.findOne({ _id: req.params.id }).exec(async function (
    err,
    utilizador
  ) {
    if (err) {
      console.log("Error:", err);
    } else {
      switch (utilizador.position) {
        case "Doador":
          const doacoes = await Doacao.find({ nif: utilizador.nif });
          console.log(doacoes);
          res.render("../views/utilizadores/doador/show", {
            utilizador: utilizador,
            doacoes,
          });
          break;
        case "Funcionario":
          res.render("../views/utilizadores/funcionario/show", {
            utilizador: utilizador,
          });
          break;
        case "Entidade":
          res.render("../views/utilizadores/entidade/show", {
            utilizador: utilizador,
          });
        case "Admin":
          res.render("../views/utilizadores/admin/show", {
            utilizador: utilizador,
          });
          break;
      }
    }
  });
};

// função que redireciona para o formulário de criação de utilizadores
utilizadorController.create = function (req, res) {
  res.render("../views/utilizadores/create");
};

// função que salva utilizadores do tipo Doador ou Funcionario na base de dados.
// primeiro encripta a password obtida através do form e cria o caminho para a imagem do perfil
// e só depois salva os restantes dados do utilizador através seu respetivo schema.
utilizadorController.save = function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;

  var utilizadorData = req.body;
  var UtilizadorModel;

  utilizadorData.image =
    "img_perfil_" + req.body.name + "_" + req.file.filename;

  switch (utilizadorData.tipo) {
    case "Doador":
      UtilizadorModel = Doador;
      break;
    case "Funcionario":
      UtilizadorModel = Funcionario;
      break;
    default:
      console.log("Invalid userType");
      res.render("../views/utilizadores/create");
      return;
  }

  var utilizador = new UtilizadorModel(utilizadorData);

  utilizador.save(function (err) {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        var error;
        if (Object.keys(err.keyPattern)[0] === "nif") {
          error = new Error("Nif Repetido");
          console.log(error);
        } else if (Object.keys(err.keyPattern)[0] === "email") {
          error = new Error("Email Repetido");
          console.log(error);
        }
        res.render("../views/utilizadores/create", { error });
      }
    } else {
      console.log("Sucessfully created an utilizador.");
      res.redirect("/utilizador/show/" + utilizador._id);
    }
  });
};

// função que salva utilizadores do tipo Entidade na base de dados.
// primeiro encripta a password obtida através do form e cria os caminhos para as
// várias imagens submetidas pela entidade e só depois salva os restantes dados do
// utilizador através seu respetivo schema.
utilizadorController.saveEntidade = function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;

  var utilizadorData = req.body;
  var UtilizadorModel;

  utilizadorData.images = [];
  for (var i = 0; i < req.files.length; i++) {
    utilizadorData.images[i] =
      "img_perfil_" + req.body.name + "_" + req.files[i].filename;
  }

  UtilizadorModel = Entidade;

  var utilizador = new UtilizadorModel(utilizadorData);

  utilizador.estadoRegisto = "Aprovada";

  utilizador.administrador = req.userName;

  utilizador.save(function (err) {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        var error;
        if (Object.keys(err.keyPattern)[0] === "nif") {
          error = new Error("Nif Repetido");
          console.log(error);
        } else if (Object.keys(err.keyPattern)[0] === "email") {
          error = new Error("Email Repetido");
          console.log(error);
        }
        res.render("../views/utilizadores/create", { error });
      }
    } else {
      console.log("Sucessfully created an utilizador.");
      res.redirect("/utilizador/show/" + utilizador._id);
    }
  });
};

// função que redireciona para o formulário de edição do utilizador selecionado através do id.
// redireciona para formulários de edição diferentes dependendo do tipo de utilizador.
utilizadorController.edit = function (req, res) {
  Utilizador.findOne({ _id: req.params.id }).exec(function (err, utilizador) {
    var tipo;

    if (err) {
      console.log("Error:", err);
    } else {
      switch (utilizador.position) {
        case "Doador":
          tipo = "doador";
          break;
        case "Funcionario":
          tipo = "funcionario";
          break;
        case "Entidade":
          tipo = "entidade";
          break;
        case "Admin":
          tipo = "admin";
          break;
      }
      res.render("../views/utilizadores/" + tipo + "/edit", {
        utilizador: utilizador,
      });
    }
  });
};

// função auxiliar para atribuir uma password nova ao utilizador caso esta tenha sido submetida no formulário
// ou caso contrário é atribuída a anterior.
const alterarPass = function (req, res, callback) {
  Utilizador.findOne({ _id: req.params.id }).exec(function (err, utilizador) {
    if (err) {
      console.log("Error:", err);
      return res.render("../views/utilizadores/admin/edit/" + req.params.id);
    }

    var passwordToUpdate = utilizador.password;

    if (req.body.password != "") {
      passwordToUpdate = bcrypt.hashSync(req.body.password, 8);
    }

    callback(passwordToUpdate);
  });
};

// função auxiliar obter o caminho da/s imagem/ns do utilizador através da base de dados
utilizadorController.obterImagens = async function (req, res) {
  const utilizador = await Utilizador.findOne({ _id: req.params.id });

  if (utilizador.position != "Entidade") {
    return utilizador.image;
  } else {
    return utilizador.images;
  }
};

// função para atualizar os dados de um Admin selecionado através do id
utilizadorController.updateAdmin = function (req, res) {
  alterarPass(req, res, async function (passwordToUpdate) {
    var image = "";
    if (req.file != undefined) {
      await utilizadorController.eliminarImagens(req, res);
      image = "img_perfil_" + req.body.name + "_" + req.file.filename;
    } else {
      image = await utilizadorController.obterImagens(req, res);
    }
    var dadosNovos = req.body;
    dadosNovos.image = image;

    try {
      const utilizador = await Admin.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            image: image,
            name: req.body.name,
            email: req.body.email,
            password: passwordToUpdate,
            updated_at: Date.now(),
          },
        },
        { new: true }
      );
      res.redirect("/utilizador/show/" + utilizador._id);
    } catch (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        var error;
        if (Object.keys(err.keyPattern)[0] === "nif") {
          error = new Error("Nif Repetido");
        } else if (Object.keys(err.keyPattern)[0] === "email") {
          error = new Error("Email Repetido");
        }
        dadosNovos._id = req.params.id;
        res.render("../views/utilizadores/admin/edit", {
          utilizador: dadosNovos,
          error,
        });
      }
    }
  });
};

// função para atualizar os dados de um Doador selecionado através do id.
utilizadorController.updateDoador = function (req, res) {
  alterarPass(req, res, async function (passwordToUpdate) {
    var image = "";
    if (req.file != undefined) {
      await utilizadorController.eliminarImagens(req, res);
      image = "img_perfil_" + req.body.name + "_" + req.file.filename;
    } else {
      image = await utilizadorController.obterImagens(req, res);
    }

    var dadosNovos = req.body;
    dadosNovos.image = image;

    try {
      const utilizador = await Doador.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            image: image,
            name: req.body.name,
            email: req.body.email,
            password: passwordToUpdate,
            nif: req.body.nif,
            phone: req.body.phone,
            city: req.body.city,
            address: req.body.address,
            age: req.body.age,
            gender: req.body.gender,
            updated_at: Date.now(),
          },
        },
        { new: true }
      );
      res.redirect("/utilizador/show/" + utilizador._id);
    } catch (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        var error;
        if (Object.keys(err.keyPattern)[0] === "nif") {
          error = new Error("Nif Repetido");
        } else if (Object.keys(err.keyPattern)[0] === "email") {
          error = new Error("Email Repetido");
        }
        dadosNovos._id = req.params.id;
        res.render("../views/utilizadores/doador/edit", {
          utilizador: dadosNovos,
          error,
        });
      }
    }
  });
};

// função para atualizar os dados de um Funcionario selecionado através do id.
utilizadorController.updateFuncionario = async function (req, res) {
  alterarPass(req, res, async function (passwordToUpdate) {
    var image = "";
    if (req.file != undefined) {
      await utilizadorController.eliminarImagens(req, res);
      image = "img_perfil_" + req.body.name + "_" + req.file.filename;
    } else {
      image = await utilizadorController.obterImagens(req, res);
    }

    var dadosNovos = req.body;
    dadosNovos.image = image;

    try {
      const utilizador = await Funcionario.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            image: image,
            name: req.body.name,
            email: req.body.email,
            password: passwordToUpdate,
            nif: req.body.nif,
            phone: req.body.phone,
            city: req.body.city,
            address: req.body.address,
            age: req.body.age,
            gender: req.body.gender,
            updated_at: Date.now(),
          },
        },
        { new: true }
      );
      res.redirect("/utilizador/show/" + utilizador._id);
    } catch (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        var error;
        if (Object.keys(err.keyPattern)[0] === "nif") {
          error = new Error("Nif Repetido");
        } else if (Object.keys(err.keyPattern)[0] === "email") {
          error = new Error("Email Repetido");
        }
        dadosNovos._id = req.params.id;
        res.render("../views/utilizadores/funcionario/edit", {
          utilizador: dadosNovos,
          error,
        });
      }
    }
  });
};

// função para atualizar os dados de uma Entidade selecionada através do id.
utilizadorController.updateEntidade = async function (req, res) {
  alterarPass(req, res, async function (passwordToUpdate) {
    var images = [];
    if (req.files.length != 0) {
      await utilizadorController.eliminarImagens(req, res);
      images = []; // Inicialize como um array vazio
      for (var i = 0; i < req.files.length; i++) {
        images[i] = "img_perfil_" + req.body.name + "_" + req.files[i].filename;
      }
    } else {
      images = await utilizadorController.obterImagens(req, res);
    }

    var dadosNovos = req.body;
    dadosNovos.images = images;

    try {
      const utilizador = await Entidade.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            images: images,
            name: req.body.name,
            email: req.body.email,
            password: passwordToUpdate,
            nif: req.body.nif,
            phone: req.body.phone,
            city: req.body.city,
            address: req.body.address,
            missao: req.body.missao,
            atividades: req.body.atividades,
            website: req.body.website,
            estadoRegisto: "Aprovada",
            administrador: req.userName,
            updated_at: Date.now(),
          },
        },
        { new: true }
      );
      res.redirect("/utilizador/show/" + utilizador._id);
    } catch (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        var error;
        if (Object.keys(err.keyPattern)[0] === "nif") {
          error = new Error("Nif Repetido");
        } else if (Object.keys(err.keyPattern)[0] === "email") {
          error = new Error("Email Repetido");
        }
        dadosNovos._id = req.params.id;
        res.render("../views/utilizadores/entidade/edit", {
          utilizador: dadosNovos,
          error,
        });
      }
    }
  });
};

// função auxiliar para eliminar imagens antigas,caso estas existam, do utilizador selecionado através do id.
utilizadorController.eliminarImagens = async function (req, res) {
  const utilizador = await Utilizador.findOne({ _id: req.params.id }).exec();
  const nome = utilizador.name;

  const deleteFile = async (filePath) => {
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (utilizador.position != "Entidade") {
    if (utilizador.image) {
      const filePath = path.join(__dirname, "..", "upload", utilizador.image);
      await deleteFile(filePath);
    }
  } else {
    for (var i = 0; i < utilizador.images.length; i++) {
      const filePath = path.join(
        __dirname,
        "..",
        "upload",
        utilizador.images[i]
      );
      await deleteFile(filePath);
    }
  }
  return nome;
};

// função para eliminar um utilizador selecionado através do id da base de dados e remover também as suas imagens armazenadas localmente.
utilizadorController.delete = async function (req, res) {
  try {
    const nome = await utilizadorController.eliminarImagens(req, res);

    await Utilizador.remove({ _id: req.params.id }).exec();

    console.log("Utilizador deleted!");
    if (req.userName == nome) {
      res.redirect("/");
    } else {
      res.redirect("/utilizador");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// função para redirecionar para o formulário de procura de utilizadores.
utilizadorController.procurar = function (req, res) {
  res.render("../views/utilizadores/search");
};

// função para procura utilizadores por tipo.
utilizadorController.procurarTipo = function (req, res) {
  Utilizador.find({ position: req.body.position }).exec(function (
    err,
    utilizadores
  ) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/utilizadores/lista_utilizadores", {
        utilizadores: utilizadores,
      });
    }
  });
};

// função para procura utilizadores por nome.
utilizadorController.procurarNome = function (req, res) {
  Utilizador.find({ name: { $regex: req.body.name } }).exec(function (
    err,
    utilizadores
  ) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/utilizadores/lista_utilizadores", {
        utilizadores: utilizadores,
      });
    }
  });
};

// função para procura utilizadores por nif.
utilizadorController.procurarNif = function (req, res) {
  Utilizador.find({ nif: req.body.nif }).exec(function (err, utilizadores) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/utilizadores/lista_utilizadores", {
        utilizadores: utilizadores,
      });
    }
  });
};

// função para listar as entidades pendentes (Funcional, mas não utilizada, pois não entrava no âmbito deste milestone).
utilizadorController.pendentes = function (req, res) {
  Utilizador.find({ estadoRegisto: "Pendente" }).exec(function (
    err,
    utilizadorList
  ) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/utilizadores/entidade/ent_pendente", {
        utilizadores: utilizadorList,
      });
    }
  });
};

// função para mostrar o perfil da entidade pendente escolhida através do id (Funcional, mas não utilizada, pois não entrava no âmbito deste milestone).
utilizadorController.showPend = function (req, res) {
  Utilizador.findOne({ _id: req.params.id }).exec(function (err, utilizador) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/utilizadores/entidade/show_pendente", {
        utilizador: utilizador,
      });
    }
  });
};

// função para aprovar a entidade selecionada através do id (Funcional, mas não utilizada, pois não entrava no âmbito deste milestone).
utilizadorController.entAprov = function (req, res) {
  Entidade.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        estadoRegisto: "Aprovada",
        administrador: req.userName,
      },
    },
    { new: true },
    function (err, utilizador) {
      if (err) {
        console.log(err);
      }

      res.redirect("/utilizador/show/" + utilizador._id);
    }
  );
};

// função que redireciona para a página inicial do utilizador.
utilizadorController.minhasInformacoes = function (req, res) {
  res.redirect("/utilizador/show/" + req.userId);
};

function gerarCodigoAngariador() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codigo = '';
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[randomIndex];
  }
  return codigo;
}

utilizadorController.promoverParaAngariador = async (req, res) => {
  try {
    const doadorId = req.params.id;
    const doador = await Doador.findById(doadorId);

    if (!doador) {
      return res.status(404).send('Doador não encontrado');
    }

    doador.codigoAngariador = gerarCodigoAngariador();
    await doador.save();

    res.status(200).send('Doador promovido a angariador com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao promover doador: ' + error.message);
  }
};

module.exports = utilizadorController;
