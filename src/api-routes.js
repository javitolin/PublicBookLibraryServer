// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

var bookController = require('./bookController');
// Contact routes
router.route('/book')
    .get(bookController.index)
    .post(bookController.new);
router.route('/book/:id/take')
    .post(bookController.take_book);
router.route('/book/:id/return')
    .post(bookController.return_book);

// Export API routes
module.exports = router;