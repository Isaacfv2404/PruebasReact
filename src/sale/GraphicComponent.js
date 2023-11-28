import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const GraphicComponent = ({ sales }) => {
  const data = {
    labels: sales.map((sale, index) => `Venta ${index + 1}`),
    datasets: [
      {
        label: 'Informe Gráfico sobre ventas',
        data: sales.map(sale => sale.total),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="myChart">
      <Bar data={data} options={options} width={1920} height={400} />
    </div>
  );
};

export default GraphicComponent;
