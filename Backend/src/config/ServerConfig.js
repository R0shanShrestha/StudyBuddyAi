require("dotenv").config();

module.exports = {
  Port: process.env.PORT || 3000,
  ApiKey: process.env.Ai_API_KEY,
  MongoUri: process.env.MONGO_URI,
  JwtKey: process.env.JWT_KEY,
};
