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
          .json({ status: 200, mensaje: "No hay Alumnos." });
      } else {
        //console.log(alumnos);
        return res.status(200).json({ status: 200, data: alumnos });
      }
    });
  },

  alumno: function (req, res) {
    let n_lista = req.params.n_lista;
    Alumnos.findOne({ n_cuenta: n_lista }).exec((err, alumno) => {
      //console.log(n_lista);
      if (err) {
        return res.status(500).json({ status: 500, mensaje: err });
      }
      if (alumno) {
        //console.log(alumno);
        return res.status(200).json({ status: 200, data: alumno });
      } else {
        return res
          .status(200)
          .json({ status: 200, mensaje: "No se encontró el Alumno." });
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
              mensaje: "No se logró almacenar el Alumno",
            });
          //console.log(alumnoStored);
          return res
            .status(200)
            .json({ status: 200, mensaje: "Alumno almacenado. " });
        });
      }
    });
  },

  update_alumno: function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    let n_cuenta = req.params.n_cuenta;
    let user_info = req.body;

    let alumno_info_update = {
      nombre: user_info.nombre,
      edad: user_info.edad,
      genero: user_info.genero,
    };

    Alumnos.findOneAndUpdate(
      { n_cuenta: n_cuenta },
      alumno_info_update,
      { new: true },
      (err, alumnoUpdate) => {
        if (err) {
          return res
            .status(500)
            .json({ status: 500, mensaje: "Error al actualizar. " + err });
        }
        if (!alumnoUpdate) {
          return res
            .status(404)
            .json({ status: 404, mensaje: "No existe el Alumno. " });
        } else {
          return res.status(200).json({
            nombre: alumnoUpdate.nombre,
            edad: alumnoUpdate.edad,
            genero: alumnoUpdate.genero,
            mensaje: "Actualización exitosa. ",
          });
        }
      }
    );
  },

  delete_alumno: function (req, res) {
    let n_cuenta = req.params.n_cuenta;
    Alumnos.findOneAndRemove({ n_cuenta: n_cuenta }, (err, alumnodelete) => {
      if (err) {
        return res
          .status(500)
          .json({ status: 500, mensaje: "Error al eliminar. " + err });
      }
      if (!alumnodelete) {
        return res
          .status(404)
          .json({ status: 404, mensaje: "No existe el Alumno. " });
      } else {
        //console.log(alumnodelete);
        return res.status(200).json({
          status: 200,
          mensaje: "Eliminación exitosa. ",
        });
      }
    });
  },

  //Controlar peticiones a endpoints que requieren parámetros.
  endpoint_invalido: function (req, res) {
    return res.status(400).json({
      status: 400,
      mensaje: "400 Bad Request - faltan parámetros en la solicitud. ",
    });
  },
};
module.exports = controller;
