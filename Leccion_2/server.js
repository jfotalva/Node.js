"use strict";
const port = 3700;
const app = require("./app");

app.listen(port, () => {
  const date = new Intl.DateTimeFormat(undefined, {
    timeStyle: "long",
  }).format(new Date());
  console.log(
    " **************************************** Servidor arriba en el puerto: " +
      port +
      " --> " +
      date +
      " ****************************************"
  );
});
