const mongoose = require("mongoose");

const ConnectDB = async () => {
  await mongoose
    .connect("mongodb+srv://member-network:badhon@cluster0.ukp4otc.mongodb.net/Member-Network")
    .then((data) => {
      console.log(`mongodb connected with server ${data.connection.host}`);
    });
};

module.exports = ConnectDB;


