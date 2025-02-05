const { render } = require("ejs");
var path = require("path");
var fs = require("fs");
const { log } = require("console");

var imageController = {};

// Função que obtém uma imagem local a partir do caminho disponibilizado
imageController.get = function (req, res) {
  const filePath = path.join(__dirname, "../../upload/", req.params.path);

  if (!filePath.startsWith(path.join(__dirname, "../../upload/"))) {
    return res.status(403).send("Acesso negado");
  }

  res.sendFile(filePath);
};

// Função para efetuar o upload de uma imagem para o sistema
imageController.uploadFile = function (req, res, next) {
  if (req.file != undefined) {
    const image = "img_perfil_" + req.body.imageName + "_" + req.file.filename;

    var fileDestination = path.join(__dirname, "../..", "upload", image);

    fs.readFile(req.file.path, function (err, data) {
      fs.writeFile(fileDestination, data, function (err) {
        if (err) {
          console.log(err);
        } else {
          fs.unlink(req.file.path, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log(image);
              response = {
                message: "File uploaded successfully",
                filename: image,
              };
              res.end(JSON.stringify(response));
            }
          });
        }
      });
    });
  }
};

module.exports = imageController;
