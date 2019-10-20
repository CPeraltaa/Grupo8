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

router.get('/',controllers.index);
router.get('/login',controllers.index);
router.post('/login',controllers.login);
router.get('/signup',controllers.signup);
router.get('/prov/signup',controllers.signup_prov);
router.post('/signup',controllers.sign_client);
router.post('/prov/signup',controllers.sign_prov);
router.get('/home/dashboard',controllers.dashboard);
router.get('/logout',controllers.logout);



//router.post('/addDesc',controllers.saveDesc)

module.exports = router;