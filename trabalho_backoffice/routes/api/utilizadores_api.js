var express = require("express");
var router = express.Router();
var utilizadorControllerAPI = require("../../controllers/api/utilizador_controller_api.js");
var authController = require("../../controllers/api/auth_controller_api.js");

router.get(
  "/profile",
  authController.verifyToken,
  utilizadorControllerAPI.profile
);

// rota da api para obter todos as entidades aprovadas da base de dados
router.get(
  "/entidades",
  authController.verifyToken,
  utilizadorControllerAPI.obterTodasEntidades
);

// rota para atualizar os dados de um doador
router.put(
  "/doador/:doadorId",
  authController.verifyToken,
  authController.verifyRoleDoador,
  utilizadorControllerAPI.atualizarDoador
);

// rota para atualizar os dados de uma entidade
router.put("/entidade/:entidadeId", utilizadorControllerAPI.atualizarEntidade);

// parametro que busca os dados de um doador a partir do id
router.param(
  "doadorId",
  authController.verifyToken,
  authController.verifyRoleDoador,
  utilizadorControllerAPI.obterDoadorPorId
);

// parametro que busca os dados de uma entidade a partir do id
router.param(
  "entidadeId",
  authController.verifyToken,
  utilizadorControllerAPI.obterEntidadePorId
);

router.post(
  "/promover/:id",
  authController.verifyToken,
  utilizadorControllerAPI.promoverParaAngariador
);

router.put(
  "/resgatar-recompensa/:id",
  authController.verifyToken,
  function (req, res) {
    utilizadorControllerAPI.resgatarRecompensa(req, res);
  }
);

module.exports = router;
