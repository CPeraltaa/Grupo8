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


//router.post('/addDesc',controllers.saveDesc)

module.exports = router;