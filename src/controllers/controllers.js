const controller={};



controller.horario = function(req, res){
  res.render('calendar');
};

//Registro de provededor
controller.registro = function(req, res){
  let emp = req.body;
    var username = req.body.username;
    var email = req.body.email;
    var sql = "SET @username = ?; SET @paswd = ?;SET @email = ?;SET @nombres = ?;SET @apellidos = ?; SET @categoria = ?;\
    INSERT INTO proveedor ( username, password, email, nombres, apellidos, categoria_codcategoria ) \
     VALUES ( @username,@paswd,@email, @nombres, @apellidos, @categoria);"
    var sql2 = "SET @username = ?SET @paswd = ?;SET @email = ?;SET @nombres = ?;SET @apellidos = ?;\
    CALL addproveedor(@username,@paswd,@email, @nombres, @apellidos);";
    req.getConnection((err, conn) => {

	conn.query('SELECT * FROM proveedor WHERE username = ? OR email = ?', [username, email], function(error, results, fields) {
	if (results.length > 0) {
		console.log("Not unique");

	} else {
			mysqlConnection.query(sql, [username, emp.passwd, email, emp.nombres, emp.apellidos, emp.categoria], (err, rows, fields) => {
       		if (!err)
            	res.send('Updated successfully');
			else
            	console.log(err);
    		})
	}

});
});
};


//Visualizar   horarios
controller.visualizar_horario = function(req, res){
  req.getConnection((err, conn) => {

  conn.query('SELECT horario.codhorario, horario.fecha, horario.hora_inicio, horario.hora_fin FROM horario, proveedor WHERE \
      proveedor.codproveedor = horario.proveedor_codproveedor AND proveedor.codproveedor = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
          });
        });
      };





//ingresar horarios

controller.ingresar_horario = function(req, res){
//var usercode = req.session.code;
var usercode = 2;
let emp = req.body;
let fecha = req.body.fecha;
let should = true;
req.getConnection((err, conn) => {

conn.query('SELECT horario.fecha FROM horario WHERE horario.proveedor_codproveedor = ?', [usercode], (err, rows, fields) => {
      if (!err){
        rows.forEach(function(row) {
          if(fecha == row.fecha)
            should = false;
        });
      }
      else
          console.log(err);
        });
      });
      if (should != false)	{
    var sql = "SET @fecha = ?;SET @horai = ?;SET @horaf = ?; SET @proveedor =?;\
    INSERT INTO horario ( fecha, hora_inicio, hora_fin, proveedor_codproveedor ) \
    VALUES ( @fecha, @horai, @horaf, @proveedor)";
    req.getConnection((err, conn) => {

       conn.query(sql, [emp.fecha, emp.hora_inicio, emp.hora_fin, usercode], (err, rows, fields) => {
        if (!err){
            res.send('Updated successfully');

          }
        else
            console.log(err);
  
          });
        });
      }
    };
    


//Procedimiento para obtener fechas intermedias
var getDates = function(startDate, endDate) {
  var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};


//agendar horario
controller.agendar_horario = function(req, res){
 //var usercode = session.code;
 var usercode = 1;
 let emp = req.body;
 var sql1 = "SET @horario = ?; SET @usuario = ?;\
 INSERT INTO cita ( horario_codhorario, cliente_codcliente ) \
 VALUES ( @horario, @usuario)";
 req.getConnection((err, conn) => {

 conn.query(sql1, [req.params.id, usercode], (err, rows, fields) => {
   if (!err)
       res.send('Updated successfully');

   else
       console.log(err);
      });
    });
  };




//Visualizar solicitudes

controller.ver_solicitudes = function(req, res){
  req.getConnection((err, conn) => {

  conn.query('SELECT * FROM solicitud, proveedor WHERE \
  proveedor.codproveedor = solicitud.proveedor_codproveedor AND proveedor.codproveedor = ? AND solicitud.accepted = false', [req.params.id], (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);

});
});
};






//aceptar solicitud
controller.aceptar_solicitud = function(req, res){
//var usercode = session.code;
var usercode = 2;
let emp = req.body;
var sql1 = "  UPDATE solicitud SET solicitud.accepted = 1 \
WHERE solicitud.proveedor_codproveedor = ? AND solicitud.cliente_codcliente = ?"; 
req.getConnection((err, conn) => {

conn.query(sql1, [usercode, req.params.id], (err, rows, fields) => {
  if (!err)
      res.send('Updated successfully');

  else
      console.log(err);
    });
});
};




//Modificar horario
controller.modificar_horario = function(req, res){
  //var usercode = session.code;
  var usercode = 1;
  let emp = req.body;
  var sql1 = "SET @horario = ?; SET @usuario = ?;\
  INSERT INTO cita ( horario_codhorario, cliente_codcliente ) \
  VALUES ( @horario, @usuario); \
  DELETE FROM cita WHERE horario_codhorario = ? ;";

  req.getConnection((err, conn) => {

  conn.query(sql1, [req.body.next_sch, usercode, req.body.current_sch], (err, rows, fields) => {
    if (!err)
        res.send('Updated successfully');

    else
        console.log(err);
      });
});
};




//get horarios from user
controller.horariobyuser = function(req, res){
  req.getConnection((err, conn) => {

  conn.query('SELECT * FROM cita, horario WHERE \
  cita.horario_codhorario = horario.codhorario AND cita.cliente_codcliente = 1', [], (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
      });
});
};


//get horarios not reserved
controller.horariobydoctor = function(req, res){
  req.getConnection((err, conn) => {

  conn.query('SELECT * FROM cita, horario, proveedor WHERE \
    cita.horario_codhorario = horario.codhorario AND horario.proveedor_codproveedor = proveedor.codproveedor AND proveedor.codproveedor =1', [], (err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
        });
  });
};



module.exports = controller;