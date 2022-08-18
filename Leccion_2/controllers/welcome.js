"use strict";

var controller = {
  // Forma 1 (=>)
  welcome: (req, res) => {
    res.send("Mi primer debug");
  },

  /*
  alumnos: (req, res) => {
    res.send("Mi listado de alumnos");
  },

  alumno: (req, res) => {
    let cal1 = 10;
    let cal2 = 3;
    let cal3 = 3;

    let final = (cal1 + cal2 + cal3) / 3;

    if (final < 6) {
      return res.status(203).json({
        status: 203,
        cal_final: final,
      });
    } else {
      return res.status(200).json({
        status: 200,
        cal_final: final,
      });
    }
  },

  // Forma 2 (function)
  crear_alumno: function (req, res) {
    let user_info = req.body;
    console.log(user_info);
    return res.status(200).json({
      status: 200,
      nombre_alumno: user_info.nombre + " " + 
      user_info.apellido,
      edad_alumno: user_info.edad,
    });
  },

  actualizar_alumno: function (req, res) {
    res.send("Actualizamos alumno");
  },

  eliminar_alumno: (req, res) => {
    res.send("Eliminamos un alumno");
  },
  */
};

module.exports = controller;
