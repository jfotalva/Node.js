"use strict";

const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

var Usuarios = require("../models/usuarios");
var Sessions = require("../models/sessions");

const _expiresIn = "1d";

var controller = {
  login: function (req, res) {
    //validamos los datos que se envían al endpoint
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    let login_info = req.body;
    Usuarios.findOne({ mail: login_info.mail }).exec((err, usuario) => {
      if (err) return res.status(500).json({ mensaje: err });
      if (!usuario)
        return res.status(200).json({ mensaje: "Credenciales inválidas. M" });

      //Comparamos info en CLARO Vs. encriptada de la DB.
      bcrypt.compare(login_info.pass, usuario.pass, function (err, result) {
        if (err) return res.status(500).json({ mensaje: err });
        if (!result)
          return res.status(200).json({ mensaje: "Credenciales inválidas. P" });

        const payload = {
          user_id: usuario.id,
        };

        //console.log(payload);
        const access_token = jwt.sign(
          payload,
          "iF38kDDIIj4Aife1YoyNZKDATH7VySYGaboEGl3z3ZpdaRQHiLN4lvnpQdBgE7m7QDUlgnbMc5GEExqfuIzCEKoPNgPDlwST6ZdC538StA6141X8JQiUshlWamHnDXThcvFn4YHQOTYfvQeytHj543bL6nlfovOpKSqtnASajGOZkFd3hO6Q9a1c9m1JLN7Z6XPeOe0Rvi33noM8jDFhrnKGbiysvjtjHUnBVlcqql7gVsrYCHGAvSiKVxZHyVJN",
          { expiresIn: _expiresIn }
        );

        let update = {
          user_id: usuario.id,
          jwt: access_token,
        };

        Sessions.findOneAndUpdate(
          { user_id: usuario.id },
          update,
          { upsert: true, new: true },
          (err, sessionsUpdate) => {
            if (err) return res.status(500).json({ mensaje: err });
            if (!sessionsUpdate)
              return res.status(404).json({ mensaje: "Datos erróneos. " });
            return res.status(200).json({
              mensaje: "Autenticación exitosa. ",
              token: access_token,
            });
          }
        );
      });
    });
  },

  logout: function (req, res) {
    console.log(req.decoded);
    Sessions.findOneAndRemove(
      { user_id: req.decoded.user_id },
      (err, sessionDeleted) => {
        if (err) return res.status(500).json({ mensaje: err });
        if (!sessionDeleted)
          return res.status(404).send({ mensaje: "Datos erróneos. " });

        return res.status(200).json({
          mensaje: "Sesión cerrada exitosamente. ",
        });
      }
    );
  },
};
module.exports = controller;
