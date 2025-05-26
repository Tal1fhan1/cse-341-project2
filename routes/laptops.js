const express = require('express');
const router = express.Router();

const laptopController = require('../controllers/laptops');

router.get('/', laptopController.getAll);

router.get('/:id', laptopController.getSingle);

router.post('/', laptopController.createLaptop);

router.put('/:id', laptopController.updateLaptop);

router.delete('/:id', laptopController.deleteLaptop);

module.exports = router;