import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Componente principale per visualizzare il grafico BIA
const BIAChart = ({ data }) => {
  useEffect(() => {
    // Salva i dati nel localStorage quando cambiano
    if (data && data.length > 0) {
      localStorage.setItem('biaData', JSON.stringify(data));
    }
  }, [data]);

  // Prepara i dati per il grafico: inverte l'ordine e formatta le date
  const chartData = [...data].reverse().map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("it-IT", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  }));

  // Etichette per i campi del grafico
  const fieldLabels = {
    weight: "Peso (kg)",
    fatPercentage: "% Grasso",
    musclePercentage: "% Muscolo",
    waterPercentage: "% Acqua",
    boneMass: "Massa ossea (kg)",
    bmi: "BMI",
  };

  // Colori per le linee del grafico
  const colors = {
    weight: "#8884d8",
    fatPercentage: "#82ca9d",
    musclePercentage: "#ffc658",
    waterPercentage: "#ff8042",
    boneMass: "#0088FE",
    bmi: "#00C49F",
  };

  // Calcola la differenza tra l'ultima misurazione e la penultima
  const getComparison = (key) => {
    if (chartData.length < 2) return '';
    const latest = chartData[0][key];
    const previous = chartData[1][key];
    const diff = (previous - latest).toFixed(2);
    const sign = diff > 0 ? '+' : '';
    return ` (${sign}${diff})`;
  };
  
  // Calcola la differenza totale tra la prima e l'ultima misurazione
  const getTotalComparison = (key) => {
    if (chartData.length < 2) return '';
    const first = chartData[chartData.length - 1][key];
    const last = chartData[0][key];
    const totalDiff = (first - last).toFixed(2);
    const sign = totalDiff > 0 ? '+' : '';
    return ` (${sign}${totalDiff})`;
  };
  
  // Renderizza la legenda personalizzata con le comparazioni
  const renderLegend = (props) => {
    const { payload } = props;
    if (!payload || payload.length === 0) return null;

    return (
      <div className="bg-gray-900 p-4 rounded-b-lg mt-4">
        {/* Comparazione con la BIA precedente */}
        <h4 className="text-[#dc2626]">Comparazione con la BIA precedente :</h4>
        <ul className="flex flex-wrap justify-center gap-4 text-sm mb-4">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} className="flex items-center">
              <span style={{ backgroundColor: entry.color, width: '10px', height: '10px', display: 'inline-block', marginRight: '5px' }}></span>
              <span>{entry.value} {getComparison(entry.dataKey)}</span>
            </li>
          ))}
        </ul>
  
        {/* Comparazione con la BIA iniziale */}
        <h4 className="text-[#dc2626] mb-2">Comparazione con la BIA iniziale :</h4>
        <ul className="flex flex-wrap justify-center gap-4 text-sm mb-8">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} className="flex items-center">
              <span style={{ backgroundColor: entry.color, width: '10px', height: '10px', display: 'inline-block', marginRight: '5px' }}></span>
              <span>{entry.value} {getTotalComparison(entry.dataKey)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  return (
    <div className="w-full bg-gray-800 rounded-lg overflow-hidden">
      <h3 className="text-xl font-semibold p-4 text-white">Andamento BIA</h3>
      {/* Contenitore responsive per il grafico */}
      <ResponsiveContainer width="100%" height={400} className="w-full sm:w-95%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="date"
            stroke="#fff"
            tick={{ fill: "#fff" }}
            padding={{ left: 30, right: 30 }}
          />
          <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              border: "none",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff" }}
          />
          {/* Genera una linea per ogni campo BIA */}
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
        </LineChart>
      </ResponsiveContainer>     
      {/* Renderizza la legenda personalizzata */}
      {renderLegend({ payload: Object.keys(fieldLabels).map(key => ({ value: fieldLabels[key], color: colors[key], dataKey: key })) })}
    </div>
  );
};

export default BIAChart;