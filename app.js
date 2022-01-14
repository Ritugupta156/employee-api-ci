
const express = require('express');
var cors=require('cors');
var swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');

var app = express();

app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(cors())


//swagger
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument,{explorer:true}));
//configure routes
app.use("/employees", require('./routes/employee-routes'));

//configure error handlers
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV == "development"){
    console.error(err.stack);
  }
 
    res.status(500).send({'error':'Something broke!'})
  });


  app.use((req, res, next) => {
    return res.status(404).json({
      error: "Not Found",
    });
  });
  

  
module.exports = app;