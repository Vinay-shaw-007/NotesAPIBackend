const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const connect = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
