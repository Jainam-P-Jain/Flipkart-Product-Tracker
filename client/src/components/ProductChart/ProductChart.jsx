import React, { useState } from "react";
import Chart from "react-apexcharts"; // Importing ApexCharts

const ProductChart = ({ priceHistory }) => {
  const [options, setOptions] = useState({
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Product Price History",
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      title: {
        text: "Price (₹)",
      },
    },
    xaxis: {
      type: "datetime", 
    },
    tooltip: {
      shared: false,
    },
  });

  const formattedData = priceHistory.map(entry => ({
    x: new Date(entry.date), 
    y: entry.price,
  }));

  // Series data for the chart
  const [series, setSeries] = useState([
    {
      name: "Price History",
      data: formattedData, 
    },
  ]);

  if (priceHistory.length <= 5) {
    return <p className="text-danger mt-0">Not enough data to display the chart.</p>;
  }

  return (
    <div id="chart">
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default ProductChart;
