const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(`mongodb://localhost:27017/personalLibraryTest`);
} else {
  mongoose.connect(
    `mongodb://${process.env.DB_USER}:${
      process.env.DB_PASS
    }@ds139295.mlab.com:39295/personal-library`,
    {
      useNewUrlParser: true
    }
  );
}

module.exports = {
  mongoose
};
