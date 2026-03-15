import React from "react";

const salesData = {
  total: 70,
  segments: {
    sale: 45,
    distribute: 15,
    return: 10,
  },
};

const colors = {
  sale: "#3B82F6",       // blue
  distribute: "#22C55E", // green
  return: "#EF4444",     // red
};

const OverAllReportCard = () => {
  const { sale, distribute, return: returnValue } = salesData.segments;

  const chartStyle = {
    background: `conic-gradient(
      ${colors.sale} 0% ${sale}%,
      ${colors.distribute} ${sale}% ${sale + distribute}%,
      ${colors.return} ${sale + distribute}% 100%
    )`,
  };

  return (
    <div className="bg-white/40 rounded-2xl shadow-md p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-gray-700 font-semibold text-lg">
          Sales Reports
        </h2>

        <button className="text-gray-400 hover:text-gray-600">
          •••
        </button>
      </div>

      {/* Circular Chart */}
      <div className="flex justify-center items-center mb-6">
        <div
          className="relative w-44 h-44 rounded-full flex items-center justify-center"
          style={chartStyle}
        >
          {/* Inner Circle */}
          <div className="absolute w-32 h-32 bg-white rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-700">
              {salesData.total}%
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-around text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.sale }}
          ></span>
          Sale
        </div>

        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.distribute }}
          ></span>
          Distribute
        </div>

        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.return }}
          ></span>
          Return
        </div>
      </div>
    </div>
  );
};

export {OverAllReportCard};