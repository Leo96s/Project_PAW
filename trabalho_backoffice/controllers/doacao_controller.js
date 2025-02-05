var Doacao = require("../models/Doacao");
var models = require("../models/Utilizador");
var Utilizador = models.Utilizador;
var Entidade = models.Entidade;
var Doador = models.Doador;
const fs = require("fs").promises;
const { render } = require("ejs");

var doacaoController = {};

doacaoController.obterPontosJson = async function () {
  try {
    const data = await fs.readFile("pontos.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
};

doacaoController.obterPontos = async function (qualidade, tipo) {
  let pontos = 0;
  let dados = await doacaoController.obterPontosJson();
  pontos = dados.tipo[tipo] * dados.qualidade[qualidade];

  return pontos;
};

doacaoController.editPontos = async function (req, res) {
  let dados = await doacaoController.obterPontosJson();

  res.render("../views/pontos/edit_pontos", {
    pontos: dados,
  });
};

doacaoController.salvarPontosJson = function (req, res) {
  let novosPontos = {
    tipo: {
      "T-shirt": req.body.tshirt,
      Camisola: req.body.camisola,
      Calças: req.body.calcas,
      Casaco: req.body.casaco,
      Vestido: req.body.vestido,
      Fato: req.body.fato,
      Sapatos: req.body.sapatos,
      Acessórios: req.body.acessorios,
    },
    qualidade: {
      Excelente: req.body.excelente,
      Boa: req.body.boa,
      Aceitável: req.body.aceitavel,
    },
  };

  let dadosEmJson = JSON.stringify(novosPontos);

  fs.writeFile("pontos.json", dadosEmJson, (err) => {
    if (err) {
      console.log(err);
      res.render("../views/pontos/edit_pontos", {
        pontos: novosPontos,
      });
    } else {
      console.log("Dados gravados com sucesso.");
    }
  });

  console.log("Sucessfully updated points.");
  res.redirect("/utilizador");
};

doacaoController.doacoes = function (req, res) {
  res.render("../views/utilizadores/doador/doacoes", { nome: req.userName });
};

// Método para renderizar a página de criação de doação
doacaoController.criarDoacao = async function (req, res) {
  try {
    // Recupera apenas o campo 'name' das entidades
    var entidades = await Entidade.find({}, "name");
  } catch (error) {
    console.error("Erro ao recuperar entidades:", error);
    res.status(500).send("Erro ao recuperar entidades");
  }
  res.render("../views/utilizadores/doador/doar", {
    nome: req.userName,
    entidades: entidades,
  });
};

// Método para salvar uma nova doação
doacaoController.salvarDoacao = async (req, res) => {
  const nif = req.body.nif;

  // Recuperar o doador pelo NIF (assumindo que o NIF é único para cada doador)
  const doador = await Utilizador.findOne({ nif: req.body.nif });

  // Verifica se o doador foi encontrado
  if (doador !== null && doador.position === "Doador") {
    let tipos = req.body["tipo[]"];
    let qualidades = req.body["qualidade[]"];
    let quantidades = req.body["quantidade[]"];
    let nomeEntidade = req.body.doacao;
    let doacaoId = req.body._id; // Pegar o _id do corpo da solicitação

    // Se tiver apenas um item, os dados virão como strings simples em vez de arrays
    if (!Array.isArray(tipos)) {
      tipos = [tipos];
      qualidades = [qualidades];
      quantidades = [quantidades];
    }

    let totalPontos = 0;
    const itens = [];

    totalPontos = await doacaoController.calcularPontos(
      tipos,
      qualidades,
      quantidades,
      itens
    );

    // Atualizar os pontos do doador
    if (doador) {
      doador.points += totalPontos;
      await doador.save();

      // Salvar a doação no banco de dados
      const novaDoacao = new Doacao({
        nif,
        pecaRoupa: itens,
        nomeEntidade,
        totalPontos: totalPontos,
        estadoDoacao: "Aprovado",
      });

      await novaDoacao.save();
    }
    // Recuperar as doações do doador
    const doacoes = await Doacao.find({ nif: req.body.nif });
    res.render("../views/utilizadores/doador/form", {
      nif,
      nome: req.userName,
      nomeEntidade,
      totalPontos,
    });
  } else {
    // Se o doador não foi encontrado, exibe uma mensagem de erro
    try {
      var entidades = await Entidade.find({}, "name");
    } catch (error) {
      console.error("Erro ao recuperar entidades:", error);
      res.status(500).send("Erro ao recuperar entidades");
    }
    if (doador === null) {
      res.render("../views/utilizadores/doador/doar", {
        nome: req.userName,
        errorMessage: "Doador não encontrado",
        entidades: entidades,
      });
    } else {
      res.render("../views/utilizadores/doador/doar", {
        nome: req.userName,
        errorMessage: "Este utilizador nao é um doador",
        entidades: entidades,
      });
    }
  }
};

// Método para mostrar o perfil do doador
doacaoController.mostrarPerfil = async (req, res) => {
  const nif = req.query.nif; // Recupera o NIF da query string
  const nomeEntidade = req.query.nomeEntidade; // Recupera o nomeEntidade da query string

  // Recuperar o doador pelo NIF (assumindo que o NIF é único para cada doador)
  const utilizador = await Doador.findOne({ nif });

  // Recuperar as doações do doador
  const doacoes = await Doacao.find({ nif });

  res.render("../views/utilizadores/doador/show", {
    utilizador,
    nome: req.userName,
    nomeEntidade,
    doacoes,
  });
};

// Função para calcular pontos com base nos tipos de roupa, qualidades e quantidades
doacaoController.calcularPontos = async (
  tipos,
  qualidades,
  quantidades,
  itens
) => {
  let totalPontos = 0;
  for (let i = 0; i < tipos.length; i++) {
    const tipo = tipos[i];
    const qualidade = qualidades[i];
    const quantidade = parseInt(quantidades[i], 10); // ParseInt com base 10
    let pontos = 0;

    pontos = (await doacaoController.obterPontos(qualidade, tipo)) * quantidade;

    itens.push({
      tipo,
      qualidade,
      quantidade,
      pontos,
    });

    totalPontos += pontos;
  }
  return totalPontos;
};

// Método para listar todas as doações
doacaoController.list = function (req, res) {
  Doacao.find({}).exec(function (err, doacoesList) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/utilizadores/doador/listaDoacoes", {
        doacoes: doacoesList,
        nome: req.userName,
        nif: req.body.nif,
      });
    }
  });
};
doacaoController.gerirDoacoes = function (req, res) {
  Doacao.find({ estadoDoacao: "Pendente" }).exec(function (err, doacoesList) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/utilizadores/doador/listaDoacoes", {
        doacoes: doacoesList,
        nome: req.userName,
        nif: req.body.nif,
      });
    }
  });
};

doacaoController.alterarEstadoDoacao = function (req, res) {
  Doacao.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        estadoDoacao: req.body.estadoDoacao,
      },
    },
    { new: true },
    function (err, doacao) {
      if (err) {
        console.log(err);
      }
      if (doacao.estadoDoacao == "Aprovado") {
        doacaoController.alterarTotalPontosDoador(
          req.body.nif,
          doacao.totalPontos
        );
      }
      res.redirect("/utilizador/gerirDoacoes");
    }
  );
};

doacaoController.alterarTotalPontosDoador = function (nif, totalPoints) {
  Doador.findOne({ nif: nif }).exec(function (err, doador) {
    if (err) {
      console.log("Error:", err);
    } else {
      if (doador.codigoAngariadorIndicado) {
        doacaoController.alterarTotalPontosAngariador(
          doador.codigoAngariadorIndicado,
          totalPoints
        );
      }
      Doador.findByIdAndUpdate(
        doador._id,
        {
          $set: {
            points: doador.points + totalPoints,
          },
        },
        { new: true },
        function (err, doador) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });
};

doacaoController.alterarTotalPontosAngariador = async function (
  codigoAngariadorIndicado,
  totalPoints
) {
  try {
    console.log("Buscando angariador com código: " + codigoAngariadorIndicado);
    const angariador = await Doador.findOne({
      codigoAngariador: codigoAngariadorIndicado,
    }).exec();

    if (!angariador) {
      console.error("Angariador não encontrado");
      return;
    }

    console.log(
      "Total de pontos a adicionar ao angariador: " + totalPoints * 0.1
    );

    const updatedAngariador = await Doador.findByIdAndUpdate(
      angariador._id,
      { $inc: { points: totalPoints * 0.1 } }, // $inc instead of $set to increment points
      { new: true, useFindAndModify: false }
    ).exec();

    console.log("Angariador atualizado:" + updatedAngariador);
  } catch (err) {
    console.error("Error ao atualizar pontos do angariador:", err);
  }
};

//Método para obter métricas relacionadas às doações
doacaoController.getMetrics = async (req, res) => {
  try {
    const allDoacoes = await Doacao.find();

    // Log para verificar se as doações estão sendo corretamente recuperadas
    console.log("Todas as doações:", allDoacoes.length);

    const pontosMes = await doacaoController.pontosMes(allDoacoes);
    const doacoesDiaSemana = await doacaoController.doacoesDiaSemana(
      allDoacoes
    );
    const doacoesDiaMes = await doacaoController.doacoesDiaMes(allDoacoes);
    const totaldoacoes = allDoacoes.length;
    const locais = await doacaoController.doacaoCidade();
    const tipo = await doacaoController.quantidadeTipo();

    res.render("../views/dashboard/dashboard_geral", {
      totaldoacoes,
      locais,
      nome: req.userName,
      tipo,
      pontosMes,
      doacoesDiaSemana,
      doacoesDiaMes,
    });
  } catch (error) {
    console.error("Erro ao obter métricas:", error);
    res.status(500).send("Erro ao obter métricas");
  }
};

//Método para obter as doações agrupadas por cidade
doacaoController.doacaoCidade = async function () {
  const doacaoCidade = [
    {
      $lookup: {
        from: "Utilizadores",
        localField: "nif",
        foreignField: "nif",
        as: "doador_info",
      },
    },
    {
      $unwind: "$doador_info",
    },
    {
      $group: {
        _id: "$doador_info.city",
        quantidade: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        quantidade: 1,
      },
    },
    {
      $group: {
        _id: null,
        names: {
          $push: "$name",
        },
        quantidades: {
          $push: "$quantidade",
        },
      },
    },
    {
      $project: {
        _id: 0,
        names: 1,
        quantidades: 1,
      },
    },
  ];

  const locais = await Doacao.aggregate(doacaoCidade);
  return locais;
};

//Método para obter a quantidade de cada tipo de peça de roupa doada
doacaoController.quantidadeTipo = async function () {
  const quantidadeTipo = [
    {
      $unwind: "$pecaRoupa",
    },
    {
      $group: {
        _id: "$pecaRoupa.tipo",
        quantidadeTotal: { $sum: "$pecaRoupa.quantidade" },
      },
    },
    {
      $group: {
        _id: 0,
        tipo: {
          $push: "$_id",
        },
        quantidades: {
          $push: "$quantidadeTotal",
        },
      },
    },
    {
      $project: {
        _id: 0,
        tipo: 1,
        quantidades: 1,
      },
    },
  ];
  const tipo = await Doacao.aggregate(quantidadeTipo);

  return tipo;
};

//Método para calcular a quantidade de pontos obtidos por mês
doacaoController.pontosMes = async function (doacoes) {
  const pontosPorMes = {
    janeiro: 0,
    fevereiro: 0,
    março: 0,
    abril: 0,
    maio: 0,
    junho: 0,
    julho: 0,
    agosto: 0,
    setembro: 0,
    outubro: 0,
    novembro: 0,
    dezembro: 0,
  };

  doacoes.forEach((doacao) => {
    const mes = new Date(doacao.dataDoacao).toLocaleString("pt-PT", {
      month: "long",
    });

    doacao.pecaRoupa.forEach((peca) => {
      pontosPorMes[mes] += peca.pontos;
    });
  });

  return pontosPorMes;
};

//Método para calcular a quantidade de doações por dia da semana
doacaoController.doacoesDiaSemana = async function (doacoes) {
  const doacoesPorDia = {
    domingo: 0,
    "segunda-feira": 0,
    "terça-feira": 0,
    "quarta-feira": 0,
    "quinta-feira": 0,
    "sexta-feira": 0,
    sábado: 0,
  };

  doacoes.forEach((doacao) => {
    const diaDaSemana = new Date(doacao.dataDoacao).toLocaleString("pt-PT", {
      weekday: "long",
    });
    doacoesPorDia[diaDaSemana] += 1;
  });

  return doacoesPorDia;
};

//Método para calcular a quantidade de doações por dia do mês
doacaoController.doacoesDiaMes = async function (doacoes) {
  const doacoesPorDia = Array.from({ length: 32 }, () => 0);

  doacoes.forEach((doacao) => {
    const diaDoMes = new Date(doacao.dataDoacao).getDate();
    doacoesPorDia[diaDoMes] += 1;
  });

  return doacoesPorDia;
};

module.exports = doacaoController;
