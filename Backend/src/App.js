const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AiRoutes = require("./routes/UserRoutes");
const AuthRoutes = require("./routes/AuthRoutes");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to Server");
});

app.use("/api/v1/auth/", AuthRoutes);
app.use("/api/v1/ai/", AiRoutes);

module.exports = app;
