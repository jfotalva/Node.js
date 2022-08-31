"use strict";

const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const saltRounds = 10;
var Usuarios = require("../models/usuarios");

var controller = {
  crear_usuario: function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user_info = req.body;
    //console.log(user_info);

    Usuarios.findOne({ mail: user_info.mail }).exec((err, usuario) => {
      //console.log(usuario);
      if (err) {
        return res.status(500).json({ mensaje: err });
      }

      if (usuario) {
        return res.status(200).json({
          mensaje: "El usuario ya existe, no se puede almacenar. ",
        });
      } else {
        let usuarios_model = new Usuarios();
        usuarios_model.mail = user_info.mail;
        //Encriptar Password
       bcrypt.hash(user_info.pass, saltRounds, function (err, hash) { 
          usuarios_model.pass = hash;
          usuarios_model.save((err, usuarioStored) => {
            if (err) return res.status(500).json({ mensaje: err });
            if (!usuarioStored)
              return res.status(200).json({
                mensaje: "No se logró almacenar el Usuario",
              });
            return res.status(200).json({ mensaje: "Usuario almacenado. " });
          });
        });
      }
    });
  },

  delete_usuario: function (req, res) {
    let user_info = req.body;
    Usuarios.findOneAndRemove(
      { mail: user_info.mail },
      (err, usuariodelete) => {
        if (err) {
          return res.status(500).json({ mensaje: "Error al eliminar. " + err });
        }
        if (!usuariodelete) {
          return res.status(404).json({ mensaje: "No existe el Usuario. " });
        } else {
          return res.status(200).json({
            mensaje: "Eliminación exitosa. ",
          });
        }
      }
    );
  },
};

module.exports = controller;
