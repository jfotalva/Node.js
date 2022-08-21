"use strict";

const { validationResult } = require("express-validator");

var Alumnos = require("../models/alumnos");

var controller = {
  alumnos: function (req, res) {
    Alumnos.find({}).exec((err, alumnos) => {
      if (err) {
        return res.status(500).json({ status: 500, mensaje: err });
      }
      if (!alumnos.length) {
        return res
          .status(200)
          .json({ status: 200, mensaje: "No hay alumnos." });
      } else {
        console.log(alumnos);
        return res.status(200).json({ status: 200, data: alumnos });
      }
    });
  },

  alumno: function (req, res) {
    let n_lista = req.params.n_lista;
    Alumnos.findOne({ n_cuenta: n_lista }).exec((err, alumno) => {
      console.log(n_lista);
      if (err) {
        return res.status(500).json({ status: 500, mensaje: err });
      }
      if (alumno) {
        console.log(alumno);
        return res.status(200).json({ status: 200, data: alumno });
      } else {
        return res
          .status(200)
          .json({ status: 200, mensaje: "No se encontró el alumno." });
      }
    });
  },

  crear_alumno: function (req, res) {
    //validamos los datos que se envían al endpoint
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    let user_info = req.body;
    Alumnos.findOne({ n_cuenta: user_info.n_cuenta }).exec((err, alumno) => {
      if (err) {
        return res.status(500).json({ status: 500, mensaje: err });
      }

      if (alumno) {
        return res.status(200).json({
          status: 200,
          mensaje: "El número de cuenta ya existe, no se puede almacenar. ",
        });
      } else {
        let alumnos_model = new Alumnos();
        alumnos_model.n_cuenta = user_info.n_cuenta;
        alumnos_model.nombre = user_info.nombre;
        alumnos_model.edad = user_info.edad;
        alumnos_model.genero = user_info.genero;

        alumnos_model.save((err, alumnoStored) => {
          if (err) return res.status(500).json({ status: 500, mensaje: err });
          if (!alumnoStored)
            return res.status(200).json({
              status: 200,
              mensaje: "No se logró almacenar el alumno",
            });
          console.log(alumnoStored);
          return res
            .status(200)
            .json({ status: 200, mensaje: "Usuario almacenado. " });
        });
      }
    });
  },

  update_alumnos: function (req, res) {},
};
module.exports = controller;
