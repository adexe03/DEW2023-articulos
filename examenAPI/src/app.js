var express = require('express');
var app = express();
var morgan = require('morgan');
var cors = require('cors');

// settings
const PORT = 3000;
const path = require('path');

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// routes
app.use('/api/usuario',require('./routes/usuario'));
app.use('/api/categoria',require('./routes/categoria'));
app.use('/api/articulo',require('./routes/articulo'));
app.use('/api/categoria/',require('./routes/categoria_articulo'));

// start
app.listen(PORT, () => {
  console.log(`Ejemplo app listening on port ${PORT}!`);
});
