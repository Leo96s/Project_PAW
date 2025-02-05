var models = require("../../models/Utilizador");
var Utilizador = models.Utilizador;
var Doador = models.Doador;
var Entidade = models.Entidade;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../../jwt_secret/config");

var authController = {};

authController.login = function (req, res) {
  Utilizador.findOne({ email: req.body.email }, function (err, utilizador) {
    if (err) return res.status(500).send("Error on the Server.");
    if (!utilizador) return res.status(404).send("No user found.");

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      utilizador.password
    );
    if (!passwordIsValid)
      return res.status(404).send({ auth: false, token: null });

    var token = jwt.sign({ id: utilizador._id }, config.secret, {
      expiresIn: 86400,
    });

    res.status(200).send({ auth: true, token: token });
  });
};

authController.getPosition = function (req, res) {
  Utilizador.findById(req.utilizadorId, function (err, utilizador) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!utilizador) return res.status(404).send("No user Found");
    if (
      utilizador.position === "Doador" ||
      utilizador.position === "Entidade"
    ) {
      res.json({ position: utilizador.position });
    } else {
      return res.status(403).send({ auth: false, message: "Not authorized!" });
    }
  });
};

authController.logout = function (req, res) {
  res.status(200).send({ auth: false, token: null });
};

async function validarAngariador(codigoAngariador) {
  try {
    const doador = await Utilizador.findOne({
      codigoAngariador: codigoAngariador,
    }).exec();
    if (!doador) {
      throw new Error("Código de Angariador Indicado Inválido");
    }
    return doador;
  } catch (error) {
    throw error;
  }
}

authController.registerDoador = async function (req, res, next) {
  try {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var doador = new Doador(req.body);
    const codigoAngariador = doador.codigoAngariadorIndicado;
    if (codigoAngariador) {
      await validarAngariador(codigoAngariador);
      doador.points = 50;
    }

    doador.password = hashedPassword;

    doador.save(function (err) {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          var error;
          if (Object.keys(err.keyPattern)[0] === "nif") {
            error = "Nif Repetido";
          } else if (Object.keys(err.keyPattern)[0] === "email") {
            error = "Email Repetido";
          }
          console.log(error);
          res.status(404).json({ message: error });
        } else {
          console.error("Error:", err);
          res.status(500).json({ error: "Internal server error" });
        }
      } else {
        res.json(doador);
      }
    });
  } catch (error) {
    if (error.message === "Código de Angariador Indicado Inválido") {
      res.status(400).json({ message: error.message });
    } else {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

authController.registerEntidade = function (req, res, next) {
  let hashedPassword = bcrypt.hashSync(req.body.password, 8);
  let entidade = new Entidade(req.body);
  entidade.password = hashedPassword;
  entidade.estadoRegisto = "Pendente";

  entidade.save(function (err) {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        let error;
        if (Object.keys(err.keyPattern)[0] === "nif") {
          error = "Nif Repetido";
        } else if (Object.keys(err.keyPattern)[0] === "email") {
          error = "Email Repetido";
        }
        console.log(error);
        res.status(404).json({ message: error });
      }
    } else {
      res.json(entidade);
    }
  });
};

authController.verifyToken = function (req, res, next) {
  let token = req.headers["x-access-token"];

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.utilizadorId = decoded.id;
    next();
  });
};

authController.verifyRoleDoador = function (req, res, next) {
  Utilizador.findById(req.utilizadorId, function (err, utilizador) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!utilizador) return res.status(404).send("No user Found");
    if (utilizador.position === "Doador") {
      next();
    } else {
      return res.status(403).send({ auth: false, message: "Not authorized!" });
    }
  });
};

authController.verifyRoleEntidade = function (req, res, next) {
  Utilizador.findById(req.utilizadorId, function (err, utilizador) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!utilizador) return res.status(404).send("No user Found");
    if (utilizador.position === "Entidade") {
      next();
    } else {
      return res.status(403).send({ auth: false, message: "Not authorized!" });
    }
  });
};

module.exports = authController;
