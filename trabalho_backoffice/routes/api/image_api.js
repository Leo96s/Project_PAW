var express = require("express");
var router = express.Router();
var imageController = require("../../controllers/api/image_controller_api.js");
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
router.post(
  "/upload-single",
  upload.single("file"),
  function (req, res, next) {
    imageController.uploadFile(req, res, next);
  }
);

// Exportação do router
module.exports = router;
