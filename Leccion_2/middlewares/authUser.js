"use strict";

const jwt = require("jsonwebtoken");
let Sessions = require("../models/sessions");

const middlewares = {
  userProtectUrl: function (req, res, next) {
    const token = req.headers["access-token"];
    if (token) {
      jwt.verify(
        token,
        "iF38kDDIIj4Aife1YoyNZKDATH7VySYGaboEGl3z3ZpdaRQHiLN4lvnpQdBgE7m7QDUlgnbMc5GEExqfuIzCEKoPNgPDlwST6ZdC538StA6141X8JQiUshlWamHnDXThcvFn4YHQOTYfvQeytHj543bL6nlfovOpKSqtnASajGOZkFd3hO6Q9a1c9m1JLN7Z6XPeOe0Rvi33noM8jDFhrnKGbiysvjtjHUnBVlcqql7gVsrYCHGAvSiKVxZHyVJN",
        (err, decoded) => {
          if (err) {
            return res.status(403).json({ mensaje: "Token inválido_ " });
          } else {
            req.decoded = decoded;
            Sessions.findOne({ user_id: req.decoded.user_id, jwt: token }).exec(
              (err, session) => {
                if (err)
                  return res
                    .status(500)
                    .json({ mensaje: "Error al retornar los datos. " });
                if (!session)
                  return res
                    .status(404)
                    .json({
                      mensaje: "Los datos de autenticación son inválidos. ",
                    });
                next();
              }
            );
          }
        }
      );
    } else {
      res.status(403).send({
        mensaje: "Token inválido. ",
      });
    }
  },
};

module.exports = middlewares;
