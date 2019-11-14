const controller = {};



controller.index = function(req, res){
  var message = '';
res.render('login',{message: message});
};


controller.log_user = function(req, res){
  var message = '';
res.render('login',{message: message});
};


controller.log_prov = function(req, res){
  var message = '';
res.render('login_p',{message: message});
};

//se agrego el codigo de sing up
controller.signup = function(req, res){
message = '';
if(req.method == "POST"){
   //post data

} else {
   res.render('signup');
}
};

controller.signup_prov = function(req, res){
  message = '';
  if(req.method == "POST"){
     //post data
  
  } else {
     res.render('signup_prov');
  }
  };


controller.login_user = function(req, res){
var message = '';
var sess = req.session; 

if(req.method == "POST"){
   var post  = req.body;
   var name= post.user_name;
   var pass= post.password;
  
   var sql="SELECT * FROM `cliente` WHERE `username`='"+name+"' and password = '"+pass+"'";                           
   req.getConnection((err, conn) => {
  conn.query(sql, function(err, results){      
    if(results.length){
     req.session.userId = results[0].codcliente;
     req.session.user = results[0];
     req.session.user.rol = 0;
     console.log(results[0].codcliente);
     //res.redirect('/home/dashboard');
    
     res.redirect('/home/dashboard');
     
    }
    else{
      message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});

    }
        
   });
  });
} else {
   res.render('login.ejs',{message: message});
}         
};

controller.login_prov = function(req, res){
  var message = '';
  var sess = req.session; 
  
  if(req.method == "POST"){
     var post  = req.body;
     var name= post.user_name;
     var pass= post.password;
    
     var sql="SELECT * FROM `proveedor` WHERE `username`='"+name+"' and password = '"+pass+"'";                           
     req.getConnection((err, conn) => {
    conn.query(sql, function(err, results){      
      if(results.length){
       req.session.userId = results[0].codproveedor;
       req.session.user = results[0];
       req.session.rol = 1;
       console.log(results[0].codproveedor);
       //res.redirect('/home/dashboard');
      
       res.redirect('/home/dashboard');
       
      }
      else{
        message = 'Wrong Credentials.';
          res.render('login_p.ejs',{message: message});
  
      }
          
     });
    });
  } else {
     res.render('login_p.ejs',{message: message});
  }         
  };
  


controller.profile = function(req, res){
	var user =  req.session.user,
	userId = req.session.userId;
	res.render('profile',{user: user});
};

controller.sign_client = function(req, res){
message = '';
if(req.method == "POST"){
   var post  = req.body;
   var account= post.account;
   var pass= post.password;
   var fname= post.first_name;
   var lname= post.last_name;
   var mail= post.mail;
   var dpi= post.dpi;
   var saldo= post.saldo;

   var sql = "INSERT INTO `cliente`(`nombres`,`apellidos`,`email`,`username`, `password`) VALUES ('" + fname + "','" + lname + "','" + mail + "','" + account + "','" + pass  + "')";
   req.getConnection((err, conn) => {

  conn.query(sql, function(err, result) {
    if (!err){
    message = "Succesfully! Your account has been created.";
    res.render('login.ejs',{message: message});
    }
    else
    message = "Wrong! There were errors";
    res.render('signup.ejs',{message: message});
    console.log(err);
   });
});
} else {
res.render('signup');
}
};

controller.sign_prov = function(req, res){
  message = '';
  if(req.method == "POST"){
     var post  = req.body;
     var account= post.account;
     var pass= post.password;
     var fname= post.first_name;
     var lname= post.last_name;
     var mail= post.mail;
     var dpi= post.dpi;
     var saldo= post.saldo;
  
     var sql = "INSERT INTO `proveedor`(`nombres`,`apellidos`,`email`,`username`, `password`,'categoria_codcategoria') VALUES ('" + fname + "','" + lname + "','" + mail + "','" + account + "','" + pass  + "'," + 1+ ")";
     req.getConnection((err, conn) => {
  
    conn.query(sql, function(err, result) {
      if (!err){
      message = "Succesfully! Your account has been created.";
      res.render('login.ejs',{message: message});
      }
      else
      message = "Wrong! There were errors";
      res.render('signup.ejs',{message: message});
      console.log(err);
     });
  });
  } else {
  res.render('signup');
  }
  };



controller.dashboard = function(req, res, next){

var user =  req.session.user,
userId = req.session.userId;

if(userId == null){
  res.redirect("/login");
  return;
}
 
     res.render('index.ejs', {user:user});	  

};

controller.logout = function(req, res, next){

req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });  

};
controller.logout_prov = function(req, res, next){

  req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/p/login');
    });  
  
  };




aksdf
;
controller.horario = function(req, res) {
  var user =  req.session.user,
	userId = req.session.userId;
  message = '';
  res.render('calendar.ejs', {user:user, message:message});	  
};

//Registro de provededor
controller.registro = function(req, res) {
  let emp = req.body;
  var username = req.body.username;
  var email = req.body.email;
  var sql =
    "SET @username = ?; SET @paswd = ?;SET @email = ?;SET @nombres = ?;SET @apellidos = ?; SET @categoria = ?;\
    INSERT INTO proveedor ( username, password, email, nombres, apellidos, categoria_codcategoria ) \
     VALUES ( @username,@paswd,@email, @nombres, @apellidos, @categoria);";
  var sql2 =
    "SET @username = ?SET @paswd = ?;SET @email = ?;SET @nombres = ?;SET @apellidos = ?;\
    CALL addproveedor(@username,@paswd,@email, @nombres, @apellidos);";
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM proveedor WHERE username = ? OR email = ?",
      [username, email],
      function(error, results, fields) {
        if (results.length > 0) {
          console.log("Not unique");
        } else {
          mysqlConnection.query(
            sql,
            [
              username,
              emp.passwd,
              email,
              emp.nombres,
              emp.apellidos,
              emp.categoria
            ],
            (err, rows, fields) => {
              if (!err) res.send("Updated successfully");
              else console.log(err);
            }
          );
        }
      }
    );
  });
};

//Visualizar   horarios
controller.visualizar_horario = function(req, res) {
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT horario.codhorario, horario.fecha, horario.hora_inicio, horario.hora_fin FROM horario, proveedor WHERE \
      proveedor.codproveedor = horario.proveedor_codproveedor AND proveedor.codproveedor = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });
};

//ingresar horarios

controller.ingresar_horario = function(req, res) {
  //var usercode = req.session.code;
  var usercode = 2;
  let emp = req.body;
  let fecha = req.body.fecha;
  let should = true;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT horario.fecha FROM horario WHERE horario.proveedor_codproveedor = ?",
      [usercode],
      (err, rows, fields) => {
        if (!err) {
          rows.forEach(function(row) {
            if (fecha == row.fecha) should = false;
          });
        } else console.log(err);
      }
    );
  });
  if (should != false) {
    var sql =
      "SET @fecha = ?;SET @horai = ?;SET @horaf = ?; SET @proveedor =?;\
    INSERT INTO horario ( fecha, hora_inicio, hora_fin, proveedor_codproveedor ) \
    VALUES ( @fecha, @horai, @horaf, @proveedor)";
    req.getConnection((err, conn) => {
      conn.query(
        sql,
        [emp.fecha, emp.hora_inicio, emp.hora_fin, usercode],
        (err, rows, fields) => {
          if (!err) {
            res.send("Updated successfully");
          } else console.log(err);
        }
      );
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
controller.agendar_horario = function(req, res) {
  //var usercode = session.code;
  var usercode = 1;
  let emp = req.body;
  var sql1 =
    "SET @horario = ?; SET @usuario = ?;\
 INSERT INTO cita ( horario_codhorario, cliente_codcliente ) \
 VALUES ( @horario, @usuario)";
  req.getConnection((err, conn) => {
    conn.query(sql1, [req.params.id, usercode], (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    });
  });
};

//Visualizar solicitudes

controller.ver_solicitudes = function(req, res) {
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM solicitud, proveedor WHERE \
  proveedor.codproveedor = solicitud.proveedor_codproveedor AND proveedor.codproveedor = ? AND solicitud.accepted = false",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });
};

//aceptar solicitud
controller.aceptar_solicitud = function(req, res) {
  //var usercode = session.code;
  var usercode = 2;
  let emp = req.body;
  var sql1 =
    "  UPDATE solicitud SET solicitud.accepted = 1 \
WHERE solicitud.proveedor_codproveedor = ? AND solicitud.cliente_codcliente = ?";
  req.getConnection((err, conn) => {
    conn.query(sql1, [usercode, req.params.id], (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    });
  });
};

//Modificar horario
controller.modificar_horario = function(req, res) {
  //var usercode = session.code;
  var usercode = 1;
  let emp = req.body;
  var sql1 =
    "SET @horario = ?; SET @usuario = ?;\
  INSERT INTO cita ( horario_codhorario, cliente_codcliente ) \
  VALUES ( @horario, @usuario); \
  DELETE FROM cita WHERE horario_codhorario = ? ;";

  req.getConnection((err, conn) => {
    conn.query(
      sql1,
      [req.body.next_sch, usercode, req.body.current_sch],
      (err, rows, fields) => {
        if (!err) res.send("Updated successfully");
        else console.log(err);
      }
    );
  });
};

//get horarios from user
controller.horariobyuser = function(req, res) {
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM cita, horario WHERE \
  cita.horario_codhorario = horario.codhorario AND cita.cliente_codcliente = 1",
      [],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });
};

//get horarios not reserved
controller.horariobydoctor = function(req, res) {
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM cita, horario, proveedor WHERE \
    cita.horario_codhorario = horario.codhorario AND horario.proveedor_codproveedor = proveedor.codproveedor AND proveedor.codproveedor =1",
      [],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });
};

//get supplier by id
controller.supplierbyid = function(req, res) {
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT nombres, apellidos, email FROM proveedor WHERE \
codproveedor = ?;",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send(rows[0]);
        else console.log(err);
      }
    );
  });
};




controller.citas_futuras = function(req, res) {
  var user =  req.session.user,
	userId = req.session.userId;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM cita, horario, proveedor \
      WHERE cita.horario_codhorario = horario.codhorario AND proveedor.codproveedor = horario.proveedor_codproveedor AND fecha > NOW() AND cliente_codcliente = ?;",
      [userId],
      (err, rows, fields) => {
        if (!err) {
          res.render('citas_pasadas.ejs', {user:user, res:rows});	  

        }
        else console.log(err);
      }
    );
  });
};


controller.citas_previas = function(req, res) {
  var user =  req.session.user,
	userId = req.session.userId;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM cita, horario, proveedor \
      WHERE cita.horario_codhorario = horario.codhorario AND proveedor.codproveedor = horario.proveedor_codproveedor AND fecha < NOW() AND cliente_codcliente = ?;",
      [userId],
      (err, rows, fields) => {
        if (!err) {
          res.render('citas_pasadas.ejs', {user:user, res:rows});	  

        }
        else console.log(err);
      }
    );
  });
};

controller.addsc = function(req, res){
  var user =  req.session.user,
	userId = req.session.userId;
  message = '';
  if(req.method == "POST"){
    
  } 
  else {
    res.render('add_schedule.ejs', {user:user, message:message});	  
  }
  };



//get de comentarios por proveedor
controller.ver_comentario=(req,res)=>{
	const { id } = req.params;
	req.getConnection((err,conn)=>{
		conn.query('select  cliente.nombres, cliente.apellidos,comentario.comentario From comentario\
    inner join cliente on comentario.cliente_codcliente=cliente.codcliente\
    where comentario.proveedor_codproveedor = ?;',[id], (err,comentario)=> {
			if(err){
				res.json(err);
			}

			console.log(comentario);
			res.render('comentarios',{
				data: comentario
			})
		});
	
});
};




module.exports = controller;
