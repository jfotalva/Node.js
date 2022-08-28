"use strict";

const jwt = require("jsonwebtoken");
const middlewares = {
  userProtectUrl: function (req, res, next) {
    //const token = req.headers.get("access-token");
    //console.log(req,res);
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token,'iF38kDDIIj4Aife1YoyNZKDATH7VySYGaboEGl3z3ZpdaRQHiLN4lvnpQdBgE7m7QDUlgnbMc5GEExqfuIzCEKoPNgPDlwST6ZdC538StA6141X8JQiUshlWamHnDXThcvFn4YHQOTYfvQeytHj543bL6nlfovOpKSqtnASajGOZkFd3hO6Q9a1c9m1JLN7Z6XPeOe0Rvi33noM8jDFhrnKGbiysvjtjHUnBVlcqql7gVsrYCHGAvSiKVxZHyVJN',
        (err, decoded) => {
            if(err){
                return res.status(403).json({mensaje: "Token inválido"});
            }else{
                req.decoded = decoded;
                next();
            }
        })
    } else {
      res.status(403).send({
        mensaje: "Token inválido. ",
      });
    }
  },
};

module.exports = middlewares;
