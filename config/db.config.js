const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.set('strictQuery', true);

const mongoURI = process.env.MONGO_URI;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  return mongoose.connect(mongoURI, connectionParams);
};

module.exports = connectDB;
