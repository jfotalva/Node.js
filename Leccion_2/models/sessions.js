"use stric";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SessionsSchema = Schema({
  user_id: { type: String, require: true, unique: true },
  jwt: { type: String },
});

module.exports = mongoose.model("sessions", SessionsSchema);
