var mongoose = require("mongoose");
var models = require("../../models/Utilizador");
var Utilizador = models.Utilizador;
var Doador = models.Doador;
var Entidade = models.Entidade;
var bcrypt = require("bcryptjs");
var utilizadorControllerAPI = {};
const { v4: uuidv4 } = require("uuid");

utilizadorControllerAPI.profile = function (req, res, next) {
  console.log(req.utilizadorId);

  Utilizador.findById(req.utilizadorId, function (err, utilizador) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!utilizador) return res.status(404).send("No user Found");

    res.status(200).send(utilizador);
  });
};

utilizadorControllerAPI.atualizarDoador = async function (req, res, next) {
  try {
    console.log("Doador recebido para atualização:", req.body.doador);

    // Verificar se a palavra-passe está presente
    if (req.body.doador.password) {
      const saltRounds = 8;
      req.body.doador.password = await bcrypt.hash(
        req.body.doador.password,
        saltRounds
      );
      console.log("Palavra-passe encriptada:", req.body.doador.password);
    }

    // Atualizar a data de atualização
    req.body.doador.updated_at = Date.now();

    // Atualizar a entidade no banco de dados
    Doador.findByIdAndUpdate(
      req.params.doadorId,
      req.body.doador, // Enviando o objeto entidade diretamente
      { new: true },
      function (err, doador) {
        if (err) {
          if (err.name === "MongoError" && err.code === 11000) {
            var error;
            if (Object.keys(err.keyPattern)[0] === "nif") {
              error = "Nif Repetido";
            } else if (Object.keys(err.keyPattern)[0] === "email") {
              error = "Email Repetido";
            }
            console.log(error);
            res.status(404).json({ message: error });
          } else {
            console.error("Error:", err);
            res.status(500).json({ error: "Internal server error" });
          }
        } else {
          console.log("Doador atualizado:", doador);
          res.json(doador);
        }
      }
    );
  } catch (error) {
    console.error("Erro no processo de atualização:", error);
    next(error);
  }
};

utilizadorControllerAPI.atualizarEntidade = async function (req, res, next) {
  try {
    console.log("Entidade recebida para atualização:", req.body.entidade);

    // Verificar se a palavra-passe está presente
    if (req.body.entidade.password) {
      const saltRounds = 8;
      req.body.entidade.password = await bcrypt.hash(
        req.body.entidade.password,
        saltRounds
      );
      console.log("Palavra-passe encriptada:", req.body.entidade.password);
    }

    // Atualizar a data de atualização
    req.body.entidade.updated_at = Date.now();

    // Atualizar a entidade no banco de dados
    Entidade.findByIdAndUpdate(
      req.params.entidadeId,
      req.body.entidade, // Enviando o objeto entidade diretamente
      { new: true },
      function (err, entidade) {
        if (err) {
          if (err.name === "MongoError" && err.code === 11000) {
            var error;
            if (Object.keys(err.keyPattern)[0] === "nif") {
              error = "Nif Repetido";
            } else if (Object.keys(err.keyPattern)[0] === "email") {
              error = "Email Repetido";
            }
            console.log(error);
            res.status(404).json({ message: error });
          } else {
            console.error("Error:", err);
            res.status(500).json({ error: "Internal server error" });
          }
        } else {
          console.log("Entidade atualizada:", entidade);
          res.json(entidade);
        }
      }
    );
  } catch (error) {
    console.error("Erro no processo de atualização:", error);
    next(error);
  }
};

utilizadorControllerAPI.obterTodasEntidades = function (req, res, next) {
  Utilizador.find({ position: "Entidade", estadoRegisto: "Aprovada" }).exec(
    function (err, entidades) {
      if (err) {
        next(err);
      } else {
        res.json(entidades);
      }
    }
  );
};

utilizadorControllerAPI.obterUmDoador = function (req, res) {
  res.json(req.doador);
};

utilizadorControllerAPI.obterUmaEntidade = function (req, res) {
  res.json(req.entidade);
};

function gerarCodigoAngariador() {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[randomIndex];
  }
  return codigo;
}

utilizadorControllerAPI.promoverParaAngariador = async (req, res) => {
  try {
    const doadorId = req.params.id;
    const doador = await Doador.findById(doadorId);

    if (!doador) {
      return res.status(404).send("Doador não encontrado");
    }

    doador.codigoAngariador = gerarCodigoAngariador();
    await doador.save();

    res.status(200).send({ codigoAngariador: doador.codigoAngariador });
  } catch (error) {
    res.status(500).send("Erro ao promover doador: " + error.message);
  }
};

utilizadorControllerAPI.resgatarRecompensa = function (req, res) {
  const cartao = req.body.cartao;

  console.log(req.body);

  // Verifique se o cartão está presente no corpo da requisição
  if (!cartao) {
    return res.status(400).json({ error: "Cartão não fornecido" });
  }

  cartao.codigo = uuidv4();

  Doador.findById({ _id: req.params.id }, function (err, doador) {
    if (err) {
      return res.status(404).json({ error: "Doador não encontrado" });
    }
    doador.points -= cartao.quantia;
    Doador.findByIdAndUpdate(
      req.params.id,
      doador, // Enviando o objeto entidade diretamente
      { new: true },
      function (err, doadorAtualizado) {
        if (err) {
          console.error("Erro ao atualizar o doador:", err);
          return next(err);
        }
        res.json(cartao);
      }
    );
  });
};

module.exports = utilizadorControllerAPI;
