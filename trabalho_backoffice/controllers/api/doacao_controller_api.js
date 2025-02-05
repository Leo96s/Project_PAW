var mongoose = require("mongoose");
var Doacao = require("../../models/Doacao");
var Calculos = require("../doacao_controller");
var doacaoControllerAPI = {};

doacaoControllerAPI.criarDoacao = async function (req, res, next) {
  try {
    var doacao = new Doacao(req.body);
    var contaTotal = 0;

    for (var i = 0; i < doacao.pecaRoupa.length; i++) {
      try {
        var conta =
          (await Calculos.obterPontos(
            doacao.pecaRoupa[i].qualidade,
            doacao.pecaRoupa[i].tipo
          )) * doacao.pecaRoupa[i].quantidade;
        doacao.pecaRoupa[i].pontos = conta;
        contaTotal += conta;
      } catch (error) {
        console.error(
          "Error calculating points for item:",
          doacao.pecaRoupa[i],
          error
        );
        return next(error);
      }
    }

    doacao.totalPontos = contaTotal;
    doacao.estadoDoacao = "Pendente";

    doacao.save(function (err) {
      if (err) {
        console.error("Error saving doacao:", err);
        return next(err);
      } else {
        console.log("Doacao saved successfully:");
        res.json(doacao);
      }
    });
  } catch (error) {
    console.error("Error in criarDoacao:", error);
    next(error);
  }
};

doacaoControllerAPI.obterTodasDoacoes = function (req, res, next) {
  Doacao.find().exec(function (err, doacoes) {
    if (err) {
      next(err);
    } else {
      res.json(doacoes);
    }
  });
};

doacaoControllerAPI.obterDoacaoPorNif = function (req, res, next) {
  var nif = req.params.doacoesNIF;
  console.log(nif);
  // Verifica se o NIF foi fornecido
  if (!nif) {
    return res.status(400).json({ message: "NIF não fornecido" });
  }

  Doacao.find({ nif: nif }).exec(function (err, doacoes) {
    if (err) {
      // Trata erros de execução da query
      return next(err);
    } else {
      // Retorna a lista de doações encontradas
      return res.status(200).json(doacoes);
    }
  });
};

doacaoControllerAPI.obterDoacaoPorEntidade = function (req, res, next) {
  var nome_entidade = req.params.nomeEntidade;
  console.log(nome_entidade);
  // Verifica se o nomeEntidade foi fornecido
  if (!nome_entidade) {
    console.error("NomeEntidade não fornecido");
    return res.status(400).json({ message: "NomeEntidade não fornecido" });
  }

  // Executa a busca no banco de dados
  Doacao.find({ nomeEntidade: nome_entidade }).exec(function (err, doacoes) {
    if (err) {
      console.error("Database query error:", err);
      return next(err);
    } else {
      console.log("Donations found:", doacoes);
      return res.status(200).json(doacoes);
    }
  });
};

doacaoControllerAPI.doacoesAprovadas = function (req, res) {
  Doacao.find({ estadoDoacao: "Aprovado" }).exec(function (err, doacoes) {
    if (err) {
      console.log("Error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(doacoes);
    }
  });
};

module.exports = doacaoControllerAPI;
