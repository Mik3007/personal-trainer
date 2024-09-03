import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BIAChart = ({ data }) => {
  const chartData = [...data].reverse().map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('it-IT', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    })
  }));

  const fieldLabels = {
    weight: 'Peso (kg)',
    fatPercentage: '% Grasso',
    musclePercentage: '% Muscolo',
    waterPercentage: '% Acqua',
    boneMass: 'Massa ossea (kg)',
    bmi: 'BMI'
  };

  const colors = {
    weight: '#8884d8',
    fatPercentage: '#82ca9d',
    musclePercentage: '#ffc658',
    waterPercentage: '#ff8042',
    boneMass: '#0088FE',
    bmi: '#00C49F'
  };

  const getComparison = (key) => {
    if (chartData.length < 2) return '';
    const latest = chartData[0][key];
    const previous = chartData[1][key];
    const diff = (latest - previous).toFixed(2);
    const sign = diff > 0 ? '+' : '';
    return ` (${sign}${diff})`;
  };

  const renderLegend = (props) => {
    const { payload } = props;
    if (!payload || payload.length === 0) return null;

    return (
      <div className="bg-gray-900 p-4 rounded-b-lg">
        <ul className="flex flex-wrap justify-center gap-4 text-sm">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} className="flex items-center">
              <span style={{ backgroundColor: entry.color, width: '10px', height: '10px', display: 'inline-block', marginRight: '5px' }}></span>
              <span>{entry.value}{getComparison(entry.dataKey)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-800 rounded-lg overflow-hidden">
      <h3 className="text-xl font-semibold p-4 text-white">Andamento BIA</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart 
          data={chartData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="date" 
            stroke="#fff" 
            tick={{ fill: '#fff' }}
            padding={{ left: 30, right: 30 }}
          />
          <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }}
            labelStyle={{ color: '#fff' }}
          />
          {Object.entries(fieldLabels).map(([key, label]) => (
            <Line 
              key={key}
              type="monotone" 
              dataKey={key} 
              stroke={colors[key]} 
              name={label} 
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          ))}
          <Legend content={renderLegend} verticalAlign="bottom" height={36} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BIAChart;