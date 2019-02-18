/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
require('../db/mongoose');
const { Book } = require('../models/book');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  beforeEach(async done => {
    const alchemist = new Book({
      title: 'The Alchemist',
      comments: ['Great book', 'Seriously. Underrated']
    });
    alchemist.save();
    const zhuangzi = new Book({
      title: 'Zhuangzi',
      comments: ['Best book ever']
    });
    zhuangzi.save();
    done();
  });

  afterEach(async done => {
    Book.deleteMany({}, err => {
      if (err) console.log('error', err);
    });
    done();
  });

  suite('Routing tests', () => {
    suite(
      'POST /api/books with title => create book object/expect book object',
      () => {
        test('Test POST /api/books with title', done => {
          const title = 'Intercultural Communication: A Discourse Approach';
          chai
            .request(server)
            .post('/api/books')
            .type('form')
            .send({
              _method: 'post',
              title: title
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isObject(res.body, 'response should be an object');
              assert.equal(res.body.title, title, 'title should be correct');
              assert.property(res.body, '_id', 'Book should contain _id');
              done();
            });
        });

        test('Test POST /api/books with no title given', done => {
          const title = '';
          chai
            .request(server)
            .post('/api/books')
            .type('form')
            .send({
              _method: 'post',
              title: title
            })
            .end((err, res) => {
              assert.equal(res.status, 400);
              assert.equal(
                res.body.message,
                'Add book failed. Please include title.'
              );
              done();
            });
        });
      }
    );

    suite('GET /api/books => array of books', () => {
      test('Test GET /api/books', done => {
        chai
          .request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(
              res.body[0],
              'commentcount',
              'Books in array should contain commentcount'
            );
            assert.property(
              res.body[0],
              'title',
              'Books in array should contain title'
            );
            assert.property(
              res.body[0],
              '_id',
              'Books in array should contain _id'
            );
            // console.log(res.body);
            done();
          });
      });
    });

    suite('GET /api/books/[id] => book object with [id]', () => {
      test('Test GET /api/books/[id] with id not in db', done => {
        chai
          .request(server)
          .get('/api/books/0000000')
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.name, 'CastError');
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', async () => {
        const book = await Book.findOne({ title: 'The Alchemist' });
        const id = book._id;
        chai
          .request(server)
          .get(`/api/books/${id}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.title, 'The Alchemist');
            assert.isArray(res.body.comments, 'comments should be an array');
          });
      });
    });

    suite(
      'POST /api/books/[id] => add comment/expect book object with id',
      () => {
        test('Test POST /api/books/[id] with comment', done => {
          done();
        });
      }
    );
  });
});
