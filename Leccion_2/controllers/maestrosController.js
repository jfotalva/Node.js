"use strict";

const { validationResult } = require("express-validator");

var Maestros = require("../models/maestros");

var controller = {
  maestros: function (req, res) {
    Maestros.find({}).exec((err, maestros) => {
      if (err) {
        return res.status(500).json({ status: 500, mensaje: err });
      }
      if (!maestros.length) {
        return res
          .status(200)
          .json({ status: 200, mensaje: "No hay Maestros." });
      } else {
        console.log(maestros);
        return res.status(200).json({ status: 200, data: maestros });
      }
    });
  },

  maestro: function (req, res) {
    let n_lista = req.params.n_lista;
    Maestros.findOne({ cedula: n_lista }).exec((err, maestro) => {
      console.log(n_lista);
      if (err) {
        return res.status(500).json({ status: 500, mensaje: err });
      }
      if (maestro) {
        console.log(maestro);
        return res.status(200).json({ status: 200, data: maestro });
      } else {
        return res
          .status(200)
          .json({ status: 200, mensaje: "No se encontró el Maestro." });
      }
    });
  },

  crear_maestro: function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    let user_info = req.body;
    Maestros.findOne({ cedula: user_info.cedula }).exec((err, maestro) => {
      if (err) {
        return res.status(500).json({ status: 500, mensaje: err });
      }

      if (maestro) {
        return res.status(200).json({
          status: 200,
          mensaje: "El Maestro ya existe, no se puede almacenar. ",
        });
      } else {
        let maestros_model = new Maestros();

        maestros_model.cedula = user_info.cedula;
        maestros_model.nombre = user_info.nombre;
        maestros_model.direccion = user_info.direccion;
        maestros_model.mail = user_info.mail;
        maestros_model.telefono = user_info.telefono;
        maestros_model.area = user_info.area;

        maestros_model.save((err, maestroStored) => {
          if (err) return res.status(500).json({ status: 500, mensaje: err });
          if (!maestroStored)
            return res.status(200).json({
              status: 200,
              mensaje: "No se logró almacenar el Maestro",
            });
          console.log(maestroStored);
          return res
            .status(200)
            .json({ status: 200, mensaje: "Maestro almacenado. " });
        });
      }
    });
  },

  update_maestro: function (req, res) {},
  delete_maestro: function (req, res) {},
};
module.exports = controller;
