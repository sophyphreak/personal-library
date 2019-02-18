/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

require('../db/mongoose');
const { Book } = require('../models/book');

module.exports = app => {
  app
    .route('/api/books')
    .get(async (req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
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
        if (!title) throw 'Add book failed. Please include title.';
        const book = new Book({ title });
        const doc = await book.save();
        res.send(doc);
      } catch (e) {
        res.status(400).send(e);
      }
      //response will contain new book object including atleast _id and title
    })

    .delete(async (req, res) => {
      try {
        const docsDeleted = await Book.deleteMany();
        res.send(`deleted ${docsDeleted} books`);
      } catch (e) {
        res.status(400).send(e);
      }
      //if successful response will be 'complete delete successful'
    });

  app
    .route('/api/books/:id')
    .get(async (req, res) => {
      try {
        const id = req.params.id;
        const book = await Book.findById(id);
        if (!book) throw 'Book ID not found.';
        res.send(book);
      } catch (e) {
        res.status(400).send(e);
      }
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(async (req, res) => {
      try {
        const id = req.params.id;
        const comment = req.body.comment;
        const book = await Book.findByIdAndUpdate(
          id,
          { $push: { comments: comment } },
          { new: true }
        );
        res.send(book);
      } catch (e) {
        res.status(400).send(e);
      }
      //json res format same as .get
    })

    .delete(async (req, res) => {
      try {
        var bookid = req.params.id;
        if (!id) res.send('_id error');
        const found = await Book.findByIdAndDelete(id);
        if (found) {
          res.send(`deleted ${id}`);
        } else {
          res.send(`could not delete ${id}`);
        }
      } catch (e) {
        res.status(400).send(e);
      }
      //if successful response will be 'delete successful'
    });
};
