const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AiRoutes = require("./routes/UserRoutes");
const AuthRoutes = require("./routes/AuthRoutes");

const app = express();

app.use(
  cors({
    origin: ["https://study-buddy-ai-lac.vercel.app/"],
    methods: ["GET", "POST", "PUT", "UPDATE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Apply custom CORS middleware for additional headers
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("WElcome to server");
});
app.get("/test", (req, res) => {
  res.send("WElcome to test");
});

app.use("/api/v1/auth/", AuthRoutes);
app.use("/api/v1/ai/", AiRoutes);

module.exports = app;
