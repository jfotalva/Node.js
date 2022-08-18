"use strict";
const mongoose = require("mongoose");
const app = require("./app");
const port = 3700;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/curso", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      "***************           Conexión a la DB exitosa           ***************"
    );

    //Crear el servidor
    var server = app.listen(port, () => {
      const date = new Intl.DateTimeFormat(undefined, {
        timeStyle: "long",
      }).format(new Date());
      console.log(
        "*************** Servidor UP en la url: http://localhost:" +
          port + " ***************"+
          " \n--> " +
          date +
          " ..."
      );
    });
  })
  .catch(console.log((err) => console.log(err)));
