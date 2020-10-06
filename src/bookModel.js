// bookModel.js
var mongoose = require('mongoose');
// var Reader = require('./readerModel');
// Setup schema
var bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    is_available: {
        type: Boolean,
        default: true
    },
    take_date: Date,
    readers: [String]
});
// Export Book model
var Book = module.exports = mongoose.model('book', bookSchema);
module.exports.get = function (callback, limit) {
    Book.find(callback).limit(limit);
}