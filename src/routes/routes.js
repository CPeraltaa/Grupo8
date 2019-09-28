const express = require('express');
const router = express.Router();//generador de rutas

const controllers = require('../controllers/controllers');

router.post('/proveedor/registry');
router.get('/client/:id');
router.post('/proveedor/horario');
router.post('/cliente/schedule/:id');
router.get('/proveedor/solicitud/:id');
router.post('/proveedor/solicitud/:id');
router.post('/cliente/mod_schedule');
router.get('/client/cita/logged');
router.get('/prov/cita/notsel');


//router.post('/addDesc',controllers.saveDesc)

module.exports = router;