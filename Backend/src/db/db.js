const mongoose = require("mongoose");
const { MongoUri } = require("../config/ServerConfig");

const ConDb = async () => {
  try {
    const con = await mongoose.connect(MongoUri);
    return con;
  } catch (error) {
    console.log("Connection Error", error);
  }
};

module.exports = ConDb;
