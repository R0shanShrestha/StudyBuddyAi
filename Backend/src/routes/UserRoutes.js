const express = require("express");
const { Generate } = require("../controllers/Ai.controller");
const { AuthMiddleware } = require("../middleware/Auth.middlware");

const AiRoutes = express.Router();

AiRoutes.post("/generate", AuthMiddleware, Generate);

module.exports = AiRoutes;
