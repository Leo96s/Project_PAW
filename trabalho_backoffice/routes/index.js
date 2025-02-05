var express = require("express");
var router = express.Router();
var models = require("../models/Utilizador");
var Utilizador = models.Utilizador;

// rota para a página inicial do site
router.get("/", function (req, res, next) {
  res.render("index");
});

// rota para páginas por implementar
router.get("/por-implementar", function (req, res, next) {
  res.render("por_implementar");
});

// rota para páginas que o utilizador não tem acesso
router.get("/acesso-restrito", function (req, res, next) {
  res.render("acesso_restrito");
});

module.exports = router;
