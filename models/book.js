const mongoose = require('mongoose');

const Book = mongoose.model('Book', {
  title: {
    type: String,
    required: true
  },
  comments: [String]
});

module.exports = {
  Book
};
