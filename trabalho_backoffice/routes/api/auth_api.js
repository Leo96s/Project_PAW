var express = require("express");
var router = express.Router();
var authControllerAPI = require("../../controllers/api/auth_controller_api.js");

router.post("/login", authControllerAPI.login);
router.get(
  "/get-position",
  authControllerAPI.verifyToken,
  authControllerAPI.getPosition
);
router.post("/logout", authControllerAPI.logout);
router.post("/register-doador", authControllerAPI.registerDoador);
router.post("/register-entidade", authControllerAPI.registerEntidade);
module.exports = router;
