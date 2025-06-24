const { json } = require("stream/consumers");
const Brain = require("../config/Gemini");
const fs = require("fs");
const User = require("../model/User");
const pdf = require("pdf-parse");
const extractTextFromPDF = require("../utils/pdfToText");
//
const Generate = async (req, res) => {
  let user = req.user;
  const prmt = req.body.prompt;
  // const uploadedPdf = req.file;
  if (prmt) {
    try {
      if (!prmt) {
        return res.status(401).json({ msg: "Promt Not found" });
      }
      let genPromt =
        "I want a summary (2 paragraphs long, returned as an array of two text values), 2 relevant image links from Unsplash, 10 flashcards (each as an object with 'question' and 'answer'), and 10 mcqs (each as an object with 'question', 'correct_answer', and 'options' array) in JSON format about " +
        prmt +
        ". Do not include any extra formatting such as backslashes (\\), code blocks (```), or the word 'json'. Return only the plain text content.";
      let result = await Brain(genPromt);
      // fs.writeFileSync("result.json", result, "utf-8");
      const updatingUploads = await User.findByIdAndUpdate(req.user._id, {
        $push: {
          uploads: [
            {
              title: prmt,
              data: result,
            },
          ],
        },
      });
      if (!updatingUploads) {
        return res.status(401).json({ msg: "Failed to update uploads" });
      }
      res.status(200).json({
        result: result,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(400).json({
      msg: "Fileds is empty please select pdf or fill the need in input box",
    });
  }
};
const GenerateWithPdf = async (req, res) => {
  let user = req?.user;
  const uploadedPdf = req?.file;
  // console.log(uploadedPdf);

  if (uploadedPdf) {
    try {
      const pdfData = await extractTextFromPDF(uploadedPdf.path);
      let genPromt =
        "Based on the following PDF content: (" +
        pdfData +
        "), generate a structured JSON response with the following keys:" +
        "\n\n1. summary: A concise summary of the content in 2  long paragraphs, returned as an array of text strings." +
        "\n2. images: Provide 2 relevant image links from Unsplash based on the topic." +
        "\n3. flashcards: Generate a reasonable number of flashcards based on the content (each as an object with 'question' and 'answer')." +
        "\n4. mcqs: Generate a suitable number of multiple-choice questions based on the content (each with 'question', 'correct_answer', and 'options' array)." +
        "\n\nOutput only the raw JSON (no markdown, no extra characters, no backslashes, no explanations, no ```json). Keep the structure clean and minimal.";
      let result = await Brain(genPromt);
      if (!result) {
        return res
          .status(401)
          .json({ msg: "Failed to uploads ! Try again later" });
      }
      // fs.writeFileSync("result.json", result, "utf-8");
      fs.unlinkSync(uploadedPdf.path);
      const updatingUploads = await User.findByIdAndUpdate(req.user._id, {
        $push: {
          uploads: [
            {
              title: uploadedPdf.originalname,
              data: result,
            },
          ],
        },
      });
      if (!updatingUploads) {
        return res.status(401).json({ msg: "Failed to update uploads" });
      }
      res.status(200).json({
        result: result,
        msg: "Question Prepared ",
        title: uploadedPdf.originalname,
      });
    } catch (error) {
      fs.unlinkSync(uploadedPdf.path);
      return res.status(400).json({
        msg: "The model is overloaded. Please try again later.",
      });
    }
  } else {
    return res.status(400).json({
      msg: "Fileds is empty please select pdf or fill the need in input box",
    });
  }
};

module.exports = { Generate, GenerateWithPdf };
