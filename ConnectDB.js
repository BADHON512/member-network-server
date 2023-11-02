const mongoose = require("mongoose");

const ConnectDB = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/Member-Network")
    .then((data) => {
      console.log(`mongodb connected with server ${data.connection.host}`);
    });
};

module.exports = ConnectDB;
