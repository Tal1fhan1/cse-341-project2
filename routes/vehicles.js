const express = require('express');
const router = express.Router();

const vehicleController = require('../controllers/vehicles');

const {isAuthenticated} = require("../middleware/authenticate")

router.get('/', vehicleController.getAll);

router.get('/:id', vehicleController.getSingle);

router.post('/', isAuthenticated, vehicleController.createVehicle);

router.put('/:id', isAuthenticated, vehicleController.updateVehicle);

router.delete('/:id', isAuthenticated, vehicleController.deleteVehicle);

module.exports = router;