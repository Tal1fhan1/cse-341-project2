const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Welcome']
    res.send('Welcome to my gaming laptop and dream car wishlists :)');
})
router.use('/vehicles', require('./vehicles'));
router.use('/laptops', require('./laptops'));

module.exports = router;