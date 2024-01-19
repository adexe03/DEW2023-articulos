var { Router } = require('express');
var router = Router();

const USUARIOS = require('../data/usuarios');

router.get('/', (req,res)=>{
  console.log("------------------------------------------");
  console.log("Ejecutando método: GET de usuarios")
  res.json(USUARIOS);
});

router.put('/:login', (req,res)=>{
  let login = req.params.login;
  let datos = req.body;
  console.log("------------------------------------------");
  console.log("Ejecutando método: PUT de usuarios")
  console.log("Se recibe como parámetro: ",login);
  console.log("Se recibe en el cuerpo de la petición: ",datos);
  let usuario=USUARIOS.filter(u=>u.login==login && u.password==datos.old);
  if (usuario[0]) {
    console.log("Cambiando la contraseña de " + usuario[0].login +
      " de " + usuario[0].password + " a " + datos.new);
    usuario[0].password = datos.new;
    res.json({
      "exito": "Se modifica la contraseña de "+login
    });
  } else {
    console.log("ERROR: No se puede validar el usuario. El login y/o password deben estar equivocados.")
    res.status(400).json({
      "error": "No se puede validar el usuario. El login y/o password deben estar equivocados."
    });
  }
})

module.exports = router;
