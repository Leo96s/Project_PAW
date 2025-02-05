const mongoose = require("mongoose");
const mongoUser = require("../models/Utilizador");
const Utilizador = mongoUser.Utilizador;
const Doacao = require("../models/Doacao");

const jwt = require("jsonwebtoken");
const config = require("../jwt_secret/config");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

let authController = {};

// função que cria um token de autorização caso o utilizador seja válido, ou seja tem o email e a password correspondentes na base de dados.
// redireciona o utilizador para a página "por implementar" caso este seja uma Entidade ou Doador e redireciona para a página home do utilizador caso contrário.
authController.submittedLogin = function (req, res, next) {
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  Utilizador.findOne({ email: emailInput })
    .then(function (user) {
      if (!user) {
        return res.redirect("/auth/login?error=Utilizador Não encontrado!!!");
      }

      var tokenDuration = 1000 * 60 * 60 * 1;

      if (req.body.remember != undefined) {
        tokenDuration *= 24 * 7;
      }

      bcrypt.compare(passwordInput, user.password).then(function (result) {
        if (result === true) {
          const authToken = jwt.sign(
            {
              email: user.email,
              name: user.name,
              id: user._id,
            },
            config.secret,
            { expiresIn: tokenDuration }
          );
          res.cookie("auth-token", authToken, { maxAge: tokenDuration });

          if (user.position == "Doador" || user.position == "Entidade") {
            res.redirect("/por-implementar");
          } else {
            res.redirect("/utilizador");
          }
        } else {
          res.redirect("/auth/login?error=Password Errada!!!");
        }
      });
    })
    .catch(function (err) {
      next(err);
    });
};

// função que cria um administrador no sistema caso não haja nenhum
authController.createAdmin = function (req, res, next) {
  Utilizador.findOne({ position: "Admin" })
    .then(function (user) {
      if (!user) {
        const hashedPassword = bcrypt.hashSync("12345678", 8);

        const image = "img_perfil_admin_pic.png";

        var fileDestination = path.join(__dirname, "..", "upload", image);

        fs.readFile(
          path.join(__dirname, "..", "upload", "admin_pic.png"),
          function (err, data) {
            if (err) {
              throw err;
            }
            fs.writeFile(fileDestination, data, function (err) {
              if (err) {
                console.log(err);
              }
            });
          }
        );

        const admin = new Utilizador({
          name: "ADMIN",
          email: "admin@admin.admin",
          password: hashedPassword,
          position: "Admin",
          created_at: Date.now(),
          updated_at: Date.now(),
          image: image,
        });

        admin
          .save()
          .then(() => {
            console.log("Admin created successfully");
            next();
          })
          .catch((err) => {
            console.error("Error creating admin:", err);
            next(err);
          });
      } else {
        next();
      }
    })
    .catch(function (err) {
      console.error("Error finding admin:", err);
      next(err);
    });
};

// função para redirecionar para o formulário de login
authController.login = function (req, res, next) {
  if (req.cookies["auth-token"]) {
    res.redirect("/utilizador");
  } else {
    res.render("login/login", { error: req.query.error || undefined });
  }
};

// função para efetuar o logout do utilizador atual
authController.logout = function (req, res, next) {
  res.clearCookie("auth-token");
  res.redirect("/");
};

// função para redirecionar para o formulário de registo (Por implementar)
authController.createLogin = function (req, res, next) {
  res.render("login/registo");
};

// função para criar utilizador a partir do formulário (Por implementar)
authController.createLoginSubmitted = function (req, res, next) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;

  mongoUser
    .create(req.body)
    .then(function () {
      res.redirect("/");
    })
    .catch(function (err) {
      next(err);
    });
};

// função para verificar se o utilizador tem o token de autorização ativo ou se é necessário efetuar o login.
// atribui também locals para facilitar o acesso aos dados do utilizador atual caso este tenha o token.
authController.verifyLoginUser = function (req, res, next) {
  const authToken = req.cookies["auth-token"];
  if (authToken) {
    jwt.verify(authToken, config.secret, async function (err, decoded) {
      req.userEmail = decoded.email;
      req.userName = decoded.name;
      req.userId = decoded.id;

      const utilizador = await Utilizador.findOne({ _id: decoded.id });

      res.locals.userName = utilizador.name;
      res.locals.userImage = utilizador.image;
      res.locals.userPosition = utilizador.position;
      req.userPosition = utilizador.position;
      res.locals.pendEntCount = await getNumberEntPend();
      res.locals.pendDoacoesCount = await getNumberDoacoesPend();

      if (
        utilizador.position == "Doador" ||
        utilizador.position == "Entidade"
      ) {
        res.redirect("/acesso-restrito");
      }

      next();
    });
  } else {
    res.redirect("/auth/login");
  }
};

var getNumberEntPend = async function () {
  try {
    let count = await Utilizador.countDocuments({
      position: "Entidade",
      estadoRegisto: "Pendente",
    });
    return count;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

var getNumberDoacoesPend = async function () {
  try {
    let count = await Doacao.countDocuments({
      estadoDoacao: "Pendente",
    });
    return count;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

module.exports = authController;
