"use stric";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MaestrosSchema = Schema({
  cedula: { type: Number, require: true, unique: true },
  nombre: { type: String, require: true },
  direccion: { type: String, require: true },
  mail: { type: String, require: true },
  telefono: { type: Number, require: true},
  area: { type: String, require: true },
});

module.exports = mongoose.model("maestros", MaestrosSchema);
