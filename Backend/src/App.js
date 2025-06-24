const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AiRoutes = require("./routes/UserRoutes");
const AuthRoutes = require("./routes/AuthRoutes");

const app = express();

// Allow only your frontend origin
app.use(
  cors({
    origin: ["https://study-buddy-ai-lac.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

// OR allow all origins (less secure, only for testing)
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("WElcome to server");
});

app.use("/api/v1/auth/", AuthRoutes);
app.use("/api/v1/ai/", AiRoutes);

module.exports = app;
