const express = require('express');
const router = express.Router();

const laptopController = require('../controllers/laptops');

const {isAuthenticated} = require("../middleware/authenticate")

router.get('/', laptopController.getAll);

router.get('/:id', laptopController.getSingle);

router.post('/', isAuthenticated, laptopController.createLaptop);

router.put('/:id', isAuthenticated, laptopController.updateLaptop);

router.delete('/:id', isAuthenticated, laptopController.deleteLaptop);

module.exports = router;