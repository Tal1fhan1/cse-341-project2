const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Welcome']
    res.send('Welcome to my gaming laptop and dream car wishlists :)');
})
router.use('/vehicles', require('./vehicles'));
router.use('/laptops', require('./laptops'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err)}
        res.redirect('/')
    });
});

module.exports = router;