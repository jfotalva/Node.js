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
  AlumnosController.crear_alumno);
api.put(
  "/alumno/:n_cuenta",
  [
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("genero").not().isEmpty(),
  ],
  AlumnosController.update_alumno);
api.delete("/alumno/:n_cuenta", AlumnosController.delete_alumno);
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
  "/maestro/:n_lista",
  [
    body("cedula").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("direccion").not().isEmpty(),
    body("mail").not().isEmpty(),
    body("telefono").not().isEmpty(),
    body("area").not().isEmpty(),
  ],
  MaestrosController.update_maestro
);
api.delete("/maestro/:n_lista", MaestrosController.delete_maestro);
//#endregion

module.exports = api;
