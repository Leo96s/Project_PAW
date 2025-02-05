var express = require("express");
var router = express.Router();
var utilizador = require("../controllers/utilizador_controller.js");
var doacao = require("../controllers/doacao_controller.js");
const authController = require("../controllers/auth_controller");
const imageController = require("../controllers/image_controller");
const upload = require("./image").upload;
const { render } = require("ejs");
const utilizadorController = require("../controllers/utilizador_controller.js");
const doacaoController = require("../controllers/doacao_controller.js");

// rota para a página home do utilizador
router.get("/", authController.verifyLoginUser, function (req, res) {
  utilizador.home(req, res);
});

// rota para a lista de utilizadores
router.get(
  "/lista-utilizadores",
  authController.verifyLoginUser,
  function (req, res) {
    utilizador.list(req, res);
  }
);

// rota para mostrar o perfil do utilizador
router.get("/show/:id", authController.verifyLoginUser, function (req, res) {
  utilizador.show(req, res);
});

// rota para criar um utilizador
router.get("/create", authController.verifyLoginUser, function (req, res) {
  utilizador.create(req, res);
});

// rota para salvar um utilizador do tipo Doador ou Funcionario na base de dados
router.post(
  "/save",
  authController.verifyLoginUser,
  upload.single("file"),
  imageController.uploadFile,
  function (req, res) {
    utilizador.save(req, res);
  }
);

// rota para salvar uma entidade na base de dados
router.post(
  "/save-ent",
  authController.verifyLoginUser,
  upload.array("files", 12),
  imageController.uploadFiles,
  function (req, res) {
    utilizador.saveEntidade(req, res);
  }
);

// rota para editar utilizador
router.get("/edit/:id", authController.verifyLoginUser, function (req, res) {
  utilizador.edit(req, res);
});

// rota para atualizar um Admin na base de dados
router.post(
  "/update-admin/:id",
  authController.verifyLoginUser,
  upload.single("file"),
  imageController.uploadFile,
  function (req, res) {
    utilizador.updateAdmin(req, res);
  }
);

// rota para atualizar um Doador na base de dados
router.post(
  "/update-doador/:id",
  authController.verifyLoginUser,
  upload.single("file"),
  imageController.uploadFile,
  function (req, res) {
    utilizador.updateDoador(req, res);
  }
);

// rota para atualizar um Funcionario na base de dados
router.post(
  "/update-funcionario/:id",
  authController.verifyLoginUser,
  upload.single("file"),
  imageController.uploadFile,
  function (req, res) {
    utilizador.updateFuncionario(req, res);
  }
);

// rota para atualizar uma Entidade na base de dados
router.post(
  "/update-entidade/:id",
  authController.verifyLoginUser,
  upload.array("files", 12),
  imageController.uploadFiles,
  function (req, res) {
    utilizador.updateEntidade(req, res);
  }
);

// rota para eliminar um utilizador da base de dados
router.post(
  "/delete/:id",
  authController.verifyLoginUser,
  function (req, res, next) {
    utilizador.delete(req, res);
  }
);

// rota para o formulário de procura de utilizadores
router.get("/procurar", authController.verifyLoginUser, function (req, res) {
  utilizador.procurar(req, res);
});

// rota para a procura por tipo de utilizador
router.post(
  "/procurar-tipo",
  authController.verifyLoginUser,
  function (req, res) {
    utilizador.procurarTipo(req, res);
  }
);

// rota para a procura por nome de utilizador
router.post(
  "/procurar-nome",
  authController.verifyLoginUser,
  function (req, res) {
    utilizador.procurarNome(req, res);
  }
);

// rota para a procura por nif de utilizador
router.post(
  "/procurar-nif",
  authController.verifyLoginUser,
  function (req, res) {
    utilizador.procurarNif(req, res);
  }
);

// rota para listar as entidades pendentes no sistema (Funcional, mas não utilizada, pois não entrava no âmbito deste milestone)
router.get("/ent-pend", authController.verifyLoginUser, function (req, res) {
  utilizador.pendentes(req, res);
});

// rota para aprovar uma entidade pendente (Funcional, mas não utilizada, pois não entrava no âmbito deste milestone)
router.get(
  "/ent-aprov/:id",
  authController.verifyLoginUser,
  function (req, res) {
    utilizador.entAprov(req, res);
  }
);

// rota para mostrar o perfil de uma entidade pendente (Funcional, mas não utilizada, pois não entrava no âmbito deste milestone)
router.get(
  "/show-pend/:id",
  authController.verifyLoginUser,
  function (req, res) {
    utilizador.showPend(req, res);
  }
);

// rota para o menu de gestão de doações
router.get("/doacoes", authController.verifyLoginUser, function (req, res) {
  doacao.doacoes(req, res);
});

// rota para criar uma doação
router.get("/criarDoacao", authController.verifyLoginUser, function (req, res) {
  doacao.criarDoacao(req, res);
});

// rota para salvar uma doação na base de dados
router.post(
  "/salvarDoacao",
  authController.verifyLoginUser,
  function (req, res) {
    doacao.salvarDoacao(req, res);
  }
);

// rota para as doações do utilizador
router.get("/perfil", authController.verifyLoginUser, function (req, res) {
  doacao.mostrarPerfil(req, res);
});

// rota para a lista de doações efetuadas
router.get(
  "/listaDoacoes",
  authController.verifyLoginUser,
  function (req, res) {
    doacao.list(req, res);
  }
);
router.get(
  "/gerirDoacoes",
  authController.verifyLoginUser,
  function (req, res) {
    doacao.gerirDoacoes(req, res);
  }
);

router.post(
  "/alterarEstado/:id",
  authController.verifyLoginUser,
  function (req, res) {
    doacao.alterarEstadoDoacao(req, res);
  }
);
// rota para a dashboard com os dados estatísticos do nosso sistema
router.get("/dashboard", authController.verifyLoginUser, function (req, res) {
  doacao.getMetrics(req, res);
});

// rota para o utilizador atual poder visualizar e editar o seu perfil
router.get(
  "/minhas-informacoes",
  authController.verifyLoginUser,
  function (req, res) {
    utilizadorController.minhasInformacoes(req, res);
  }
);

router.get("/edit-pontos", authController.verifyLoginUser, function (req, res) {
  doacaoController.editPontos(req, res);
});

router.post(
  "/save-pontos",
  authController.verifyLoginUser,
  function (req, res) {
    doacaoController.salvarPontosJson(req, res);
  }
);

router.post(
  "/promover/:id",
  authController.verifyLoginUser,
  function (req, res) {
    utilizadorController.promoverParaAngariador(req, res);
  }
);

module.exports = router;
