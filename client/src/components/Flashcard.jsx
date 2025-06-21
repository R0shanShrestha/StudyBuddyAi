import React, { useState } from "react";

const Flashcard = ({ Flashcard }) => {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">
          Flashcard {index + 1}/{Flashcard.length}
        </h2>
        <p className="text-lg font-medium">{Flashcard[index].question}</p>
        {showAnswer && (
          <p className="mt-4 text-gray-700">
            💡 <strong>Answer:</strong> {Flashcard[index].answer}
          </p>
        )}
        <div className="mt-6 space-x-3">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="bg-black text-white px-4 py-2 rounded-full text-sm"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          <button
            onClick={() => {
              setIndex((prev) => (prev + 1) % Flashcard.length);
              setShowAnswer(false);
            }}
            className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-full text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
