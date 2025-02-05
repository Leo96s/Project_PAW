var mongoose = require("mongoose");

var baseOptions = {
  discriminatorKey: "position",
  collection: "Utilizadores",
};

// Utilizador Base schema
var UtilizadorBase = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    nif: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{9}/.test(v);
        },
        message: (props) => `${props.value} não é um nif válido! [999999999]`,
      },
      unique: true,
      required: true,
      default: "000000000",
    },
    password: { type: String, require: true },
    position: {
      type: String,
      enum: ["Admin", "Doador", "Funcionario", "Entidade"],
      required: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  baseOptions
);

var Utilizador = mongoose.model("Utilizador", UtilizadorBase);

// Admin schema
var Admin = Utilizador.discriminator(
  "Admin",
  new mongoose.Schema({
    image: { type: String, require: true },
  })
);

// Doador schema
var Doador = Utilizador.discriminator(
  "Doador",
  new mongoose.Schema({
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{9}/.test(v);
        },
        message: (props) =>
          `${props.value} não é um número de telefone válido!`,
      },
    },
    city: { type: String, require: true },
    address: { type: String, require: true },
    age: {
      type: Number,
      validate: {
        validator: function (v) {
          return v >= 18;
        },
        message: (props) => `A idade deve ser maior ou igual a 18!`,
      },
      require: true,
    },
    gender: { type: String, enum: ["M", "F", "O"], require: true },
    image: { type: String, require: true },
    codigoAngariador: { type: String },
    codigoAngariadorIndicado: { type: String },
    points: { type: Number, default: 0 },
  })
);

// Funcionario schema
var Funcionario = Utilizador.discriminator(
  "Funcionario",
  new mongoose.Schema({
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{9}/.test(v);
        },
        message: (props) =>
          `${props.value} não é um número de telefone válido!`,
      },
    },
    city: { type: String, require: true },
    address: { type: String, require: true },
    age: {
      type: Number,
      validate: {
        validator: function (v) {
          return v >= 18;
        },
        message: (props) => `A idade deve ser maior ou igual a 18!`,
      },
      require: true,
    },
    gender: { type: String, enum: ["M", "F", "O"], require: true },
    image: { type: String, require: true },
  })
);

// Entidade schema
var Entidade = Utilizador.discriminator(
  "Entidade",
  new mongoose.Schema({
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{9}/.test(v);
        },
        message: (props) =>
          `${props.value} não é um número de telefone válido! [999999999]`,
      },
    },
    city: { type: String, require: true },
    address: { type: String, require: true },
    missao: { type: String, require: true },
    atividades: { type: String, require: true },
    website: { type: String, require: true },
    images: [{ type: String, require: true }],
    estadoRegisto: {
      type: String,
      enum: ["Pendente", "Aprovada", "Rejeitada"],
      require: true,
    },
    administrador: String,
  })
);

module.exports = {
  Utilizador: Utilizador,
  Doador: Doador,
  Funcionario: Funcionario,
  Entidade: Entidade,
  Admin: Admin,
};
