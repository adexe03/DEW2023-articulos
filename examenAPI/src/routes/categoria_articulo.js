var { Router } = require('express');
var router = Router();

const USUARIOS = require('../data/usuarios');
const CATEGORIAS = require('../data/categorias');
const ARTICULOS = require('../data/articulos');

var id_nuevo = Math.max(...ARTICULOS.map(a=>a.id));

router.get('/:id_c/articulo', (req,res)=>{
  console.log("------------------------------------------");
  let id_categoria = req.params.id_c;
  console.log("Ejecutando método: GET de articulos filtrando por categoría: ",id_categoria);
  if (CATEGORIAS.some(c=>c.id==id_categoria)) {
    console.log("La categoría existe");
    res.json(ARTICULOS.filter(a=>a.id_categoria==id_categoria));
  } else {
    console.log("ERROR: La categoría indicada no existe");
    res.status(404).json({
      "error": "La categoría indicada no existe"
    })
  }
});

router.post('/:id_c/articulo', (req,res)=>{
  console.log("------------------------------------------");
  console.log("Ejecutando método: POST de articulos indicando la categoria en la url.")
  let id_categoria = req.params.id_c;
  console.log("La categoría indicada es: ",id_categoria);
  let articulo = req.body;
  console.log("Se recibe en el cuerpo de la petición: ", articulo);
  if (CATEGORIAS.some(c=>c.id==id_categoria)) {
    console.log("El id de categoría existe");
    if (articulo.usuario && articulo.titulo && articulo.cuerpo) {
      articulo.id = ++id_nuevo;
      articulo.id_categoria=id_categoria;
      articulo.fecha = (new Date()).toUTCString();
      ARTICULOS.push(articulo);
      console.log("--> Articulo creado:")
      console.log(articulo);
      res.json(articulo);
    } else {
      console.log("ERROR: en los parámetros. Faltan o son erroneos (usuario, titulo y/o cuerpo)");
      res.status(400).json({
        "error": "en los parámetros. Faltan o son erroneos (usuario, titulo y/o cuerpo)"
      });
    }
  } else {
    console.log("ERROR: el id de categoría NO existe!!!");
    console.log("No se pudo crear el articulo.")
    res.status(404).json({
      "Error": "No se puede crear el artículo porque no existe la categoría indicada."
    })
  }
});

router.post('/:id_c/articulo_secure', (req,res)=>{
  console.log("------------------------------------------");
  console.log("Ejecutando método: POST de articulos indicando la categoria en la url.")
  let id_categoria = req.params.id_c;
  console.log("La categoría indicada es: ",id_categoria);
  let articulo = req.body;
  console.log("Se recibe en el cuerpo de la petición: ", articulo);
  if (CATEGORIAS.some(c=>c.id==id_categoria)) {
    console.log("El id de categoría existe");
    // Se comprueba el login y el password.
    let usuario=USUARIOS.filter(u=>u.login==articulo.usuario && u.password==articulo.password);
    if (usuario[0]) {
      console.log("El usuario se valida correctamente");
      // Se comprueban los datos recibidos.
      if (articulo.usuario && articulo.titulo && articulo.cuerpo) {
        articulo.id = ++id_nuevo;
        articulo.id_categoria=id_categoria;
        articulo.fecha = (new Date()).toUTCString();
        delete articulo.password;
        ARTICULOS.push(articulo);
        console.log("--> Articulo creado:")
        console.log(articulo);
        res.json(articulo);
      } else {
        console.log("ERROR: en los parámetros. Faltan o son erroneos (usuario, titulo y/o cuerpo)");
        res.status(400).json({
          "error": "en los parámetros. Faltan o son erroneos (usuario, titulo y/o cuerpo)"
        });
      }
    } else {
      console.log("ERROR: Debe haber un error en el login o password!!!");
      res.status(401).json({
        "error": "Debe haber un error en el login o password."
      })
    }
  } else {
    console.log("ERROR: el id de categoría NO existe!!!");
    console.log("No se pudo crear el articulo.")
    res.status(404).json({
      "error": "No se puede crear el artículo porque no existe la categoría indicada."
    })
  }
});

module.exports = router;
