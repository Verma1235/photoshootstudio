import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const analyticsData = [
  { day: "Sun", value: 70 },
  { day: "Mon", value: 55 },
  { day: "Tue", value: 32 },
  { day: "Wed", value: 85 },
  { day: "Thu", value: 58 },
  { day: "Fri", value: 40 }
];

const chartConfig = {
  barColor: "#3B82F6",
  hoverColor: "#1D4ED8"
};

const AnalyticsCard = () => {
  return (
    <div className="bg-white/40 rounded-2xl shadow-md p-5 w-full h-fit">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-700 font-semibold text-lg">
          Analytics
        </h2>

        <button className="text-gray-400 hover:text-gray-600">
          •••
        </button>
      </div>

      {/* Chart */}
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analyticsData}>
            
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              className="text-sm text-gray-400"
            />

            <Tooltip />

            <Bar
              dataKey="value"
              fill={chartConfig.barColor}
              radius={[6, 6, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export {AnalyticsCard};