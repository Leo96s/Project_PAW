var mongoose = require("mongoose");

var DoacaoSchema = new mongoose.Schema({
  images: [{ type: String, require: true }],
  nif: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{9}/.test(v);
      },
      message: (props) => `${props.value} não é um nif válido! [999999999]`,
    },
    required: true,
  },
  pecaRoupa: [],
  nomeEntidade: { type: String, require: true },
  estadoDoacao: { type: String, require: true },
  totalPontos: { type: Number, default: 0 },
  dataDoacao: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Doacao", DoacaoSchema, "Doacoes");
