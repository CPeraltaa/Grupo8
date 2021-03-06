const express = require('express');
const router = express.Router();//generador de rutas

const controllers = require('../controllers/controllers');

router.post('/proveedor/registry', controllers.registro);
router.get('/client/:id', controllers.visualizar_horario);
router.post('/proveedor/horario', controllers.ingresar_horario);
router.post('/cliente/schedule/:id', controllers.agendar_horario);
router.get('/proveedor/solicitud/:id', controllers.ver_solicitudes);
router.post('/proveedor/solicitud/:id',controllers.aceptar_solicitud);
router.post('/cliente/mod_schedule', controllers.modificar_horario);
router.get('/client/cita/logged', controllers.horariobyuser);
router.get('/provedor/cita/free', controllers.horariobydoctor);
router.get('/horario', controllers.horario);
router.get('/proveedor/:id', controllers.supplierbyid);
router.get('/proveedor/comentario/:id', controllers.ver_comentario);

router.get('/',controllers.index);
router.get('/login',controllers.log_user);
router.get('/p/login',controllers.log_prov);
router.post('/login',controllers.login_user);
router.post('/p/login',controllers.login_prov);
router.get('/signup',controllers.signup);
router.get('/prov/signup',controllers.signup_prov);
router.post('/signup',controllers.sign_client);
router.post('/prov/signup',controllers.sign_prov);
router.get('/home/dashboard',controllers.dashboard);
router.get('/logout',controllers.logout);
router.get('/p/logout',controllers.logout_prov);
router.get('/profile',controllers.profile);

router.get('/citas_past',controllers.citas_previas);
router.get('/citas_upc',controllers.citas_futuras);
router.get('/p/addsc',controllers.addsc);




//router.post('/addDesc',controllers.saveDesc)

module.exports = router;