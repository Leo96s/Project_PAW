var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./swagger/swagger.json");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// If using MongoAtlas uncomment the next line and complete the link with your cluster
//mongoose.connect('mongodb+srv://YOUR_MONGO_ATLAS_LINK', {useNewUrlParser: true} )
mongoose
  .connect(
    "mongodb+srv://user:rpbxcf8MkGg2faoq@cluster0.srscseb.mongodb.net/Project_PAW",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

var indexRouter = require("./routes/index");
var utilizadorRouter = require("./routes/utilizador");
const authRouter = require("./routes/auth");
var imageRouter = require("./routes/image");
var utilizadorApiRouter = require("./routes/api/utilizadores_api");
var doacaoApiRouter = require("./routes/api/doacoes_api");
var authApiRouter = require("./routes/api/auth_api");
var imageApiRouter = require("./routes/api/image_api");

var cors = require("cors");
var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/utilizador", utilizadorRouter);
app.use("/auth", authRouter);
app.use("/image", imageRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/u", utilizadorApiRouter);
app.use("/api/v1/d", doacaoApiRouter);
app.use("/api/v1/a", authApiRouter);
app.use("/api/v1/i", imageApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 3000; // Define a porta do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


module.exports = app;
