import React from "react";

const SummaryCard = ({ Summary1, Summary2, title, bigImg, smallImg }) => {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 capitalize">
        📘 Summary: {title}
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Image Section */}
        <div className="md:w-1/3 flex-shrink-0">
          <img
            alt="Image Faild to Rendered"
            src={bigImg}
            className="w-full h-auto object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
          />
          <p className="text-xs text-gray-500 mt-1 text-center">
            {/* Figure: {images[2]} */}
          </p>
        </div>

        {/* Scrollable Summary */}
        <div className="md:w-2/3 h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 text-sm leading-relaxed scroll-smooth">
          <p className="text-justify">{Summary1}</p>
          <br />
          <img
            alt="Image Faild to Rendered"
            src={smallImg}
            className="w-full rounded-lg my-2"
          />{" "}
          {<p>{Summary2}</p>}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
