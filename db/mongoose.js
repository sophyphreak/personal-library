const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(`mongodb://localhost:27017/personalLibraryTest`, {
    useNewUrlParser: true
  });
} else {
  const mongoDB = `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@ds139295.mlab.com:39295/personal-library`;
  mongoose.connect(mongoDB, {
    useNewUrlParser: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = {
  mongoose
};
