"use strict";
const express = require("express");
const api = express.Router();
const { body } = require("express-validator");

var WelcomeController = require("../controllers/welcome");
var AlumnosController = require("../controllers/alumnosController");
var MaestrosController = require("../controllers/maestrosController");

api.get("/", WelcomeController.welcome);

//#region Alumnos
api.get("/alumnos", AlumnosController.alumnos);
api.get("/alumno/:n_lista", AlumnosController.alumno);
api.post(
  "/alumno",
  [
    body("n_cuenta").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("genero").not().isEmpty(),
  ],
  AlumnosController.crear_alumno
);
api.put(
  "/alumno/:parametro",
  [
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("genero").not().isEmpty(),
  ],
  AlumnosController.update_alumno
);
api.delete("/alumno/:parametro", AlumnosController.delete_alumno);

//validaciones sin parámetros:
api.get("/alumno/", AlumnosController.endpoint_invalido);
api.put("/alumno/", AlumnosController.endpoint_invalido);
api.delete("/alumno/", AlumnosController.endpoint_invalido);
//#endregion

//#region Maestros
api.get("/maestros", MaestrosController.maestros);
api.get("/maestro/:n_lista", MaestrosController.maestro);
api.post(
  "/maestro",
  [
    body("cedula").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("direccion").not().isEmpty(),
    body("mail").not().isEmpty(),
    body("telefono").not().isEmpty(),
    body("area").not().isEmpty(),
  ],
  MaestrosController.crear_maestro
);
api.put(
  "/maestro/:parametro",
  [
    body("nombre").not().isEmpty(),
    body("direccion").not().isEmpty(),
    body("mail").not().isEmpty(),
    body("telefono").not().isEmpty(),
    body("area").not().isEmpty(),
  ],
  MaestrosController.update_maestro
);
api.delete("/maestro/:parametro", MaestrosController.delete_maestro);
//validaciones sin parámetros:
api.get("/maestro/", AlumnosController.endpoint_invalido);
api.put("/maestro/", AlumnosController.endpoint_invalido);
api.delete("/maestro/", AlumnosController.endpoint_invalido);
//#endregion

module.exports = api;
