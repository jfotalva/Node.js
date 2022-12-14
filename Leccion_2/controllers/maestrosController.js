"use strict";

const { validationResult } = require("express-validator");

var Maestros = require("../models/maestros");

var controller = {
  maestros: function (req, res) {
    Maestros.find({}).exec((err, maestros) => {
      if (err) {
        return res.status(500).json({ mensaje: err });
      }
      if (!maestros.length) {
        return res.status(200).json({ mensaje: "No hay Maestros." });
      } else {
        return res.status(200).json({ data: maestros });
      }
    });
  },

  maestro: function (req, res) {
    let n_lista = req.params.n_lista;
    Maestros.findOne({ cedula: n_lista }).exec((err, maestro) => {
      if (err) {
        return res.status(500).json({ mensaje: err });
      }
      if (maestro) {
        return res.status(200).json({ data: maestro });
      } else {
        return res.status(200).json({ mensaje: "No se encontró el Maestro." });
      }
    });
  },

  crear_maestro: function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ serrors: errors.array() });
    }
    let user_info = req.body;
    Maestros.findOne({ cedula: user_info.cedula }).exec((err, maestro) => {
      if (err) {
        return res.status(500).json({ mensaje: err });
      }

      if (maestro) {
        return res.status(200).json({
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
          if (err) return res.status(500).json({ mensaje: err });
          if (!maestroStored)
            return res.status(200).json({
              status: 200,
              mensaje: "No se logró almacenar el Maestro",
            });
          return res.status(200).json({ mensaje: "Maestro almacenado. " });
        });
      }
    });
  },

  update_maestro: function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let _cedula = req.params.parametro;
    let user_info = req.body;

    let maestro_info_update = {
      nombre: user_info.nombre,
      direccion: user_info.direccion,
      mail: user_info.mail,
      telefono: user_info.telefono,
      area: user_info.area,
    };

    Maestros.findOneAndUpdate(
      { cedula: _cedula },
      maestro_info_update,
      { new: true },
      (err, maestroUpdate) => {
        if (err) {
          return res
            .status(500)
            .json({ mensaje: "Error al actualizar. " + err });
        }
        if (!maestroUpdate) {
          return res.status(404).json({ mensaje: "No existe el Maestro. " });
        } else {
          return res.status(200).json({
            nombre: maestroUpdate.nombre,
            direccion: maestroUpdate.direccion,
            mail: maestroUpdate.mail,
            telefono: maestroUpdate.telefono,
            area: maestroUpdate.area,
            mensaje: "Actualización exitosa. ",
          });
        }
      }
    );
  },

  delete_maestro: function (req, res) {
    let _cedula = req.params.parametro;
    Maestros.findOneAndRemove({ cedula: _cedula }, (err, maestrodelete) => {
      if (err) {
        return res.status(500).json({ mensaje: "Error al eliminar. " + err });
      }
      if (!maestrodelete) {
        return res.status(404).json({ mensaje: "No existe el Maestro. " });
      } else {
        return res.status(200).json({
          mensaje: "Eliminación exitosa. ",
        });
      }
    });
  },

  //Controlar peticiones a endpoints que requieren parámetros.
  endpoint_invalido: function (req, res) {
    return res.status(400).json({
      mensaje: "400 Bad Request - faltan parámetros en la solicitud. ",
    });
  },
};

function validar_correo(_correo) {
  return _correo;
}

module.exports = controller;
