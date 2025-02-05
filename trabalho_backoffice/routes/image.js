var express = require("express");
var router = express.Router();
var imageController = require("../controllers/image_controller.js");
var multer = require("multer");

const { render } = require("ejs");

// configuração do multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

// rota para obter imagem
router.get("/get/:path", function (req, res) {
  imageController.get(req, res);
});

// rota para upload de uma só imagem
router.post("/upload_single", upload.single("file"), function (req, res, next) {
  // req.files é um array de arquivos 'file'
  // Seu código para lidar com o upload de múltiplos arquivos aqui.
  imageController.uploadFile(req, res, next);
});

// rota para upload de várias imagens
router.post(
  "/upload_multiple/:id",
  upload.array("file", 12),
  function (req, res, next) {
    // req.files é um array de arquivos 'file'
    // Seu código para lidar com o upload de múltiplos arquivos aqui.
    imageController.uploadFiles(req, res, callback);
  }
);

// Exportação do router
module.exports = router;
module.exports.upload = upload;
