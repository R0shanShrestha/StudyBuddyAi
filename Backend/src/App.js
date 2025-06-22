const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AiRoutes = require("./routes/UserRoutes");
const AuthRoutes = require("./routes/AuthRoutes");

const app = express();

// Custom CORS middleware to set additional headers
const customCors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*"); // Use specific origin in production
  // Another common pattern: Allow dynamic origin
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Proceed to next middleware or route
  next();
};

// Apply built-in CORS middleware (allowing all origins in this case)
app.use(
  cors({
    origin: ["https://study-buddy-ai-lac.vercel.app/"],
    credentials: true,
  })
);

// Apply custom CORS middleware for additional headers
app.use(customCors);
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
