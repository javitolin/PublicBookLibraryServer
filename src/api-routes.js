let router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

var bookController = require('./bookController');
// Contact routes
router.route('/books')
    .get(bookController.index)
    .post(bookController.new);
router.route('/books/:id/take')
    .post(bookController.take_book);
router.route('/books/:id/return')
    .post(bookController.return_book);

// Export API routes
module.exports = router;