import React, { useState } from "react";

const Quizcard = ({ Mcq }) => {
  const [checked, setChecked] = useState([]);
  const [show, setShow] = useState(false);
  const [storeAns, setStoreAns] = useState([]);
  // console.log(show, storeAns)
  // console.log(storeAns);

  return (
    <div className=" px-4 py-10 flex justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">Biology Chapter 1 Quiz</h2>
        <p className="text-sm mb-6">
          You cannot Undo your Answer ! <br />
          Think Before Check !
        </p>
        {show != true &&
          Mcq.map((q, idx) => (
            <div key={idx} className="mb-6">
              <p className="font-medium">
                {idx + 1}. {q.question}
              </p>
              <div className="mt-2 space-y-2">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className={` ${
                      checked.includes(q.correct_answer) ? "hidden" : "block"
                    } `}
                  >
                    <input
                      onChange={(e) => {
                        setChecked((pre) => [q.correct_answer, ...pre]);
                      }}
                      type="checkbox"
                      onClick={() => {
                        setStoreAns((pre) => [
                          {
                            question: q.question,
                            myAnswer: opt,
                            correct: opt == q.correct_answer ? true : false,
                            msg:
                              opt == q.correct_answer
                                ? "Correct Answer"
                                : "Wrong Answer",
                            ans: q.correct_answer,
                          },
                          ...pre,
                        ]);
                      }}
                      name={`q${idx}`}
                      className={`mr-2 `}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

        {/* Checking the storedans is empty or not  */}
        {show &&
          storeAns != " " &&
          storeAns?.map((q, idx) => (
            <div key={idx} className="mb-6">
              <p className="font-medium">
                {idx + 1}. {q.question}
              </p>
              <div className="mt-2 space-y-2">
                <label className="block mx-4">
                  {q.correct
                    ? `${q.ans} is ${q.msg} ✔️`
                    : `${q.myAnswer} is ${q.msg} ❌ \n Correct Answer is ${q.ans} ✔️ `}
                </label>
              </div>
            </div>
          ))}

        {/* if show is true but storeAns is empty */}
        {show && storeAns == "" && (
          <div className="mb-6">
            <p className="font-medium">
              ⚠️ You haven't completed any of the quiz questions.
            </p>
            <div className="mt-2 space-y-2">
              <label className="block">
                ✅ Please finish them all and resubmit. 📤
              </label>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setShow(true);
          }}
          className={`bg-black text-white px-6 py-2 rounded-full ${
            !show ? "flex" : "hidden"
          }`}
        >
          Check the Answer
        </button>
        <button
          onClick={() => {
            setShow(false);
          }}
          className={`bg-black text-white px-6 py-2 rounded-full ${
            show ? "flex" : "hidden"
          }`}
        >
          More Questions
        </button>
      </div>
    </div>
  );
};

export default Quizcard;
