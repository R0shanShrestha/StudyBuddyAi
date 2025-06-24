const express = require("express");
const { Generate, GenerateWithPdf } = require("../controllers/Ai.controller");
const { AuthMiddleware } = require("../middleware/Auth.middlware");
const upload = require("../utils/MulterStorage");

const AiRoutes = express.Router();

AiRoutes.post("/generate", AuthMiddleware, Generate);
AiRoutes.post(
  "/upload/generate",
  upload.single("userfile"),
  AuthMiddleware,
  GenerateWithPdf
);


module.exports = AiRoutes;
