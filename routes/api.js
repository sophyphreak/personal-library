'use strict';

require('../db/mongoose');
const { Book } = require('../models/book');

module.exports = app => {
  app
    .route('/api/books')
    .get(async (req, res) => {
      try {
        const rawBookList = await Book.find();
        const bookList = rawBookList.map(book => {
          const { _id, title, comments } = book;
          return {
            _id,
            title,
            commentcount: comments.length
          };
        });
        res.send(bookList);
      } catch (e) {
        res.status(400).send(e);
      }
    })

    .post(async (req, res) => {
      try {
        const title = req.body.title;
        if (!title) throw { message: 'Add book failed. Please include title.' };
        const book = new Book({ title });
        const doc = await book.save();
        res.send(doc);
      } catch (e) {
        res.status(400).send(e);
      }
    })

    .delete(async (req, res) => {
      try {
        const docsDeleted = await Book.deleteMany();
        res.send(`deleted ${docsDeleted} books`);
      } catch (e) {
        res.status(400).send(e);
      }
    });

  app
    .route('/api/books/:id')
    .get(async (req, res) => {
      try {
        const id = req.params.id;
        const book = await Book.findById(id);
        res.send(book);
      } catch (e) {
        res.status(400).send(e);
      }
    })

    .post(async (req, res) => {
      try {
        const id = req.params.id;
        const comment = req.body.comment;
        if (!comment) throw { message: 'Comment not found' };
        const book = await Book.findByIdAndUpdate(
          id,
          { $push: { comments: comment } },
          { new: true }
        );
        res.send(book);
      } catch (e) {
        res.status(400).send(e);
      }
    })

    .delete(async (req, res) => {
      try {
        var id = req.params.id;
        if (!id) res.send('_id error');
        const found = await Book.findByIdAndDelete(id);
        if (found) {
          res.send('delete successsful');
        } else {
          throw { message: `no book exists at ${id}` };
        }
      } catch (e) {
        res.status(400).send(e);
      }
    });
};
