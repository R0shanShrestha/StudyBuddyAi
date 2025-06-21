const { json } = require("stream/consumers");
const Brain = require("../config/Gemini");
const fs = require("fs");
const User = require("../model/User");

const Generate = async (req, res) => {
  const prmt = req.body.prompt;
  let user = req.user;

  try {
    if (!prmt) {
      return res.status(401).json({ msg: "Promt Not found" });
    }
    let genPromt =
      "I want a summary (2 paragraphs long, returned as an array of two text values), 2 relevant image links from Unsplash, 10 flashcards (each as an object with 'question' and 'answer'), and 10 mcqs (each as an object with 'question', 'correct_answer', and 'options' array) in JSON format about " +
      prmt +
      ". Do not include any extra formatting such as backslashes (\\), code blocks (```), or the word 'json'. Return only the plain text content.";

    let result = await Brain(genPromt);

    fs.writeFileSync("result.json", result, "utf-8");
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
};

module.exports = { Generate };
