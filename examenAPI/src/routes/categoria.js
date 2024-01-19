var { Router } = require('express');
var router = Router();

const CATEGORIAS = require('../data/categorias');

router.get('/', (req,res)=>{
  console.log("------------------------------------------");
  console.log("Ejecutando método: GET de categorias")
  res.json(CATEGORIAS);
});

module.exports = router;
