import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const DifficultyAccuracyBarChart = ({ data }) => {
  const difficultyConstants = {
    0: 'Easy',
    1: 'Medium',
    2: 'Hard',
  };
  const chartData = Object.keys(data.difficultyStats).map((difficulty) => ({
    difficulty: difficultyConstants[difficulty],
    accuracy: data.difficultyStats[difficulty].accuracy,
  }));

  return (
    <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#666" />
      <XAxis dataKey="difficulty" stroke="#666" />
      <YAxis stroke="#666" />
      <Tooltip contentStyle={{ backgroundColor: '#666', color: '#fff' }} />
      <Legend />
      <Bar dataKey="accuracy" fill="#666" />
    </BarChart>
  );
};

export default DifficultyAccuracyBarChart;
