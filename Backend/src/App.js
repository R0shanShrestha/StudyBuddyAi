const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AiRoutes = require("./routes/UserRoutes");
const AuthRoutes = require("./routes/AuthRoutes");

const app = express();
const allowedOrigins = ["https://study-buddy-ai-uok8.vercel.app/"];

app.use(
  cors({
    origin: allowedOrigins[0],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("WElcome to server");
});

app.use("/api/v1/auth/", AuthRoutes);
app.use("/api/v1/ai/", AiRoutes);

module.exports = app;
