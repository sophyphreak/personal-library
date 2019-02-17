/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

require('../db/mongoose');

module.exports = app => {
  app
    .route('/api/books')
    .get((req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post((req, res) => {
      var title = req.body.title;
      //response will contain new book object including atleast _id and title
    })

    .delete((req, res) => {
      //if successful response will be 'complete delete successful'
    });

  app
    .route('/api/books/:id')
    .get((req, res) => {
      var bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post((req, res) => {
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
    })

    .delete((req, res) => {
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
};
