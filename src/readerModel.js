var mongoose = require('mongoose');
var readerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    taken_date: {
        type: Date,
        default: Date.now
    },
    return_date: {
        type: Date,
    },
});
// Export Reader model
var Reader = module.exports = mongoose.model('reader', readerSchema);
module.exports.get = function (callback, limit) {
    Reader.find(callback).limit(limit);
}