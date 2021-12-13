//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

var express = require('express');
var app = express();
var utils = require('./mysql-connector');

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

//var datos = require('./datos.json');

//Lists all devices
app.get('/devices/', function(req, res) {
    utils.query("SELECT * FROM `Devices`;",
    function(err,result,field)
    {
        if (err) {
            res.send(err).status(400);
            return;
        }
        //console.log(result);
        res.json(result);
    });
});

//Espera una consulta al endpoint EJ /devices/1
//Parámetro id = el id del dispositivo a buscar
// devuelve el dispositivo con el id que viene del parametro
app.get('/devices/:id', function(req, res) {
    utils.query("SELECT * FROM `Devices` WHERE `id` = ?",
    [req.params.id],
    function(err,result,field)
    {
        if (err) {
            res.send(err).status(400);
            return;
        }
        //console.log(result);
        res.json(result);
    });

});

//Actualiza todos los campos de un device
//Espera recibir {id:1,state:1, name, description,type, level} , impacta el cambio y lo devuelve
app.post('/devices/', function(req, res) {
   //UPDATE `Devices` SET `name`='[value-2]',`description`='[value-3]',`state`='[value-4]',`type`='[value-5]' WHERE `id`='[value-1]'
    utils.query("UPDATE `Devices` SET  `name`=?,`description`=?,`state`=?,`type`=?,`level`=? WHERE `id` = ?",
    [req.body.name, req.body.description, req.body.state, req.body.type, req.body.level,req.body.id],
    function(err,result,field)
    {
        if (err) {
            res.send(err).status(400);
            return;
        }
        //console.log(result);
        res.json(result);
    });
});


//Actualiza solo los campos de estado de un device
//Espera recibir {id:1,state:1, level} , impacta el cambio y lo devuelve
app.post('/devices/:id', function(req, res) {
    //UPDATE `Devices` SET `name`='[value-2]',`description`='[value-3]',`state`='[value-4]',`type`='[value-5]' WHERE `id`='[value-1]'
     utils.query("UPDATE `Devices` SET  `state`=?,`level`=? WHERE `id` = ?",
     [req.body.state, req.body.level,req.params.id],
     function(err,result,field)
     {
         if (err) {
             res.send(err).status(400);
             return;
         }
         //console.log(result);
         res.json(result);
     });
 });
 


//Crea un nuevo device
//Espera recibir {id:1,state:1, name, description,type} , impacta el cambio y lo devuelve
app.put('/devices/', function(req, res) {
   //INSERT INTO `Devices`(`id`, `name`, `description`, `state`, `type`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]')
    utils.query("INSERT INTO `Devices`(`id`, `name`, `description`, `state`, `type`, `level`) VALUES (?,?,?,?,?,?)",
    [req.body.id, req.body.name, req.body.description, req.body.state, req.body.type, req.body.level],
    function(err,result,field)
    {
        if (err) {
            res.send(err).status(400);
            return;
        }
        //console.log(result);
        res.json(result);
    });
});

//Elimina un nuevo device
//Espera recibir {id:1} , impacta el cambio y lo devuelve
app.delete('/devices/', function(req, res) {
     //DELETE FROM `Devices` WHERE `id`= '[value-1]'
     console.log(req);
     utils.query("DELETE FROM `Devices` WHERE `id`= ?",
     [req.body.id],
     function(err,result,field)
     {
         if (err) {
             res.send(err).status(400);
             return;
         }
         //console.log(result);
         res.json(result);
     });
 });

//=======[ Main module code ]==================================================
app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================