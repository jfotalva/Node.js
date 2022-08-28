"use strict";

const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

var Usuarios = require("../models/usuarios");

var controller = {
  login: function (req, res) {
    //validamos los datos que se envían al endpoint
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    let login_info = req.body;
    //console.log(login_info);
    Usuarios.findOne({ mail: login_info.mail, pass: login_info.pass }).exec(
      (err, usuario) => {
        //console.log(usuario);
        if (err) {
          return res.status(500).json({ status: 500, mensaje: err });
        }
        if (!usuario)
          return res
            .status(200)
            .json({ status: 200, mensaje: "Credenciales inválidas. " });

        const payload = {
          user_id: usuario.id,
        };

        console.log(payload);
        const access_token = jwt.sign(
          payload,
          "iF38kDDIIj4Aife1YoyNZKDATH7VySYGaboEGl3z3ZpdaRQHiLN4lvnpQdBgE7m7QDUlgnbMc5GEExqfuIzCEKoPNgPDlwST6ZdC538StA6141X8JQiUshlWamHnDXThcvFn4YHQOTYfvQeytHj543bL6nlfovOpKSqtnASajGOZkFd3hO6Q9a1c9m1JLN7Z6XPeOe0Rvi33noM8jDFhrnKGbiysvjtjHUnBVlcqql7gVsrYCHGAvSiKVxZHyVJN",
          { expiresIn: "1m" }
        );
        console.log(access_token);
        return res.status(200).json({ status: 200, mensaje: "Usuario logueado", token: access_token });
      }
    );
  },

  logout: function (req, res) {

  },
};
module.exports = controller;
