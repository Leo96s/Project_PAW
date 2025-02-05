var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth_controller");

// rota para entrar no formulário de login
router.get(
  "/login",
  authController.createAdmin,
  authController.login
);

// rota para submeter o login e entrar no sistema
router.post("/loginSubmitted", authController.submittedLogin);

// rota para efetuar o logout
router.get("/logout", authController.logout);

// rota para entrar no formulário de registo no sistema (Por Implementar)
//router.get("/register", authController.createLogin);

// rota para submeter o registo no sistema (Por Implementar)
router.post("/registerSubmitted", authController.createLoginSubmitted);

// rota para entrar no formulário de recuperação password (Por Implementar)
router.get("/esqueceuPassword");

// rota para pedir uma password nova (Por Implementar)
router.post("/novaPassword");

module.exports = router;
