var { Router } = require('express');
var router = Router();

const USUARIOS = require('../data/usuarios');
const CATEGORIAS = require('../data/categorias');
const ARTICULOS = require('../data/articulos');

var id_nuevo = Math.max(...ARTICULOS.map(a=>a.id));

router.get('/', (req,res)=>{
  console.log("------------------------------------------");
  console.log("Ejecutando método: GET de articulos")
  res.json(ARTICULOS);
});

router.post('/', (req,res)=>{
  console.log("------------------------------------------");
  console.log("Ejecutando método: POST de articulos")
  let articulo = req.body;
  console.log("Se recibe en el cuerpo de la petición: ", articulo);
  // Se comprueban los datos enviados
  if (articulo.id_categoria && articulo.usuario && articulo.titulo && articulo.cuerpo) {
    // Se comprueba si existe el usuario
    if (USUARIOS.some(u=>u.login==articulo.usuario)) {
      console.log("El usuario existe");
      // Se comprueba que existe la categoría
      if (CATEGORIAS.some(c=>c.id==articulo.id_categoria)) {
        articulo.id = ++id_nuevo;
        articulo.fecha = (new Date()).toUTCString();
        ARTICULOS.push(articulo);
        console.log("--> Articulo creado:")
        console.log(articulo);
        res.status(201).json(articulo);
      } else {
        console.log("ERROR: La categoría indicada no existe!!!");
        res.status(404).json({
          "error": "La categoría indicada no existe"
        });
      }
    } else {
      console.log("ERROR: El usuario indicado no existe!!!");
      res.status(404).json({
        "error": "El usuario indicado no existe"
      });
    }
  } else {
    console.log("ERROR: en los parámetros. Faltan o son erroneos (id_categoria, usuario, titulo y/o cuerpo)");
    res.status(400).json({
      "error": "en los parámetros. Faltan o son erroneos (id_categoria, usuario, titulo y/o cuerpo)"
    });
  }
});

module.exports = router;
