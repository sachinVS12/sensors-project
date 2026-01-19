const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/sarayu")
    .then(() => {
      console.log("Database connection successful!");
    })
    .catch((error) => {
      console.log("Database connection failed!", error);
      console.log("Attemeptting to reconnect....");
      setTimeout(() => {
        connectDB();
      }, 2000);
    });
};

module.exports = connectDB();
