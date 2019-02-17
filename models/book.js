const mongoose = require('mongoose');

const Book = mongoose.model('Book', {
  title: {
    type: String,
    required: true
  },
  comments: [{ body: String }]
});

module.exports = {
  Book
};
