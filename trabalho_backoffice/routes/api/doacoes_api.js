var express = require("express");
var router = express.Router();
var doacaoControllerAPI = require("../../controllers/api/doacao_controller_api.js");
var authController = require("../../controllers/api/auth_controller_api.js");

// rota da api para obter todos os doacaoes da base de dados
router.get(
  "/doacoes",
  authController.verifyToken,
  doacaoControllerAPI.obterTodasDoacoes
);

// rota da api para salvar os dados de uma doacao na base de dados
router.post(
  "/doacoes",
  authController.verifyToken,
  authController.verifyRoleDoador,
  doacaoControllerAPI.criarDoacao
);

router.get(
  "/doacoes/nif/:doacoesNIF",
  authController.verifyToken,
  doacaoControllerAPI.obterDoacaoPorNif
);

router.get(
  "/doacoes/entidade/:nomeEntidade",
  authController.verifyToken,
  doacaoControllerAPI.obterDoacaoPorEntidade
);

router.get(
  "/doacoes/aprovadas",
  authController.verifyToken,
  doacaoControllerAPI.doacoesAprovadas
);

module.exports = router;
