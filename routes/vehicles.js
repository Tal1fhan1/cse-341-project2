const express = require('express');
const router = express.Router();

const vehicleController = require('../controllers/vehicles');

router.get('/', vehicleController.getAll);

router.get('/:id', vehicleController.getSingle);

router.post('/', vehicleController.createVehicle);

router.put('/:id', vehicleController.updateVehicle);

router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;