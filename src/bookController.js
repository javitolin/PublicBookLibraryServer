Book = require('./bookModel');
Reader = require('./readerModel');

exports.index = function (req, res) {
    Book.get(function (err, books) {
        if (err) {
            res.json({
                success: false,
                message: err,
            });
        }
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    });
};

exports.new = function (req, res) {
    var book = new Book();
    book.id = req.body.id
    book.title = req.body.title
    book.author = req.body.author
    book.owner = req.body.owner
    book.save(function (err) {
        if (err) {
            res.json({ success: false, message: err })
            return;
        }
        res.json({
            success: true,
            message: 'New book created!',
            data: book
        });
    });
};

exports.take_book = function (req, res) {
    console.log("take")
    Book.find({ "_id": req.params.id }, function (err, books) {
        if (err || books.length == 0) {
            res.json({ success: false, message: err })
            return;
        }

        var book = books[0]
        if (book.is_available != true) {
            res.json({ success: false, message: 'Book is unavailable' })
            return;
        }

        var readerName = req.body.reader
        book.is_available = false
        book.take_date = Date.now()
        book.readers.push(readerName)
        book.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                success: true,
                message: 'Book taken',
                data: book
            });

        })
    });
};

exports.return_book = function (req, res) {
    Book.find({ "_id": req.params.id }, function (err, books) {
        if (err || books.length == 0) {
            res.json({ success: false, message: err })
            return;
        }

        var book = books[0]
        if (book.is_available == true) {
            res.json({ success: false, message: 'Book is available. No need to return' })
            return;
        }

        var lastReader = book.readers[book.readers.length - 1];
        var readerName = req.body.reader
        if (book.readers.length != 0 && lastReader.toLowerCase() != readerName.toLowerCase()) {
            res.json({ success: false, message: 'Wrong reader!' })
            return;
        }

        book.is_available = true
        book.save(function (err) {
            if (err)
                res.json({ success: false, message: err })
            res.json({
                success: true,
                message: 'Book returned',
                data: book
            });
        })
    });
};