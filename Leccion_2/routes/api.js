"use strict";
const express = require("express");
const api = express.Router();
const { body } = require("express-validator");

var WelcomeController = require("../controllers/welcome");
var AlumnosController = require("../controllers/alumnosController");

api.get("/", WelcomeController.welcome);
/*
api.get("/alumnos", WelcomeController.alumnos);
api.get("/alumno", WelcomeController.alumno);
api.post("/alumno", WelcomeController.crear_alumno);
api.put("/alumno", WelcomeController.actualizar_alumno);
api.delete("/alumno", WelcomeController.eliminar_alumno);
*/
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

module.exports = api;
