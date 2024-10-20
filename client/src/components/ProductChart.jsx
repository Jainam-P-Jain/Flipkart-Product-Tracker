import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const ProductChart = ({ priceHistory }) => {
    useEffect(() => {
        // Transform the price history into a format usable by ApexCharts
        const formattedData = priceHistory.map(entry => ({
            x: new Date(entry.date), // Ensure date is a proper Date object
            y: entry.price,
        }));

        const options = {
            series: [{
                name: 'Product Price',
                data: formattedData, // Pass the correctly formatted data here
            }],
            chart: {
                type: 'area', // Line or area chart
                height: 350,
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth' // This makes the line curved/smooth
            },
            title: {
                text: 'Product Price History',
                align: 'left'
            },
            xaxis: {
                type: 'datetime', // Ensure datetime for proper handling
                labels: {
                    rotate: -45, // Make the labels diagonal
                    format: 'dd MMM', // Format for date on the x-axis
                }
            },
            yaxis: {
                title: {
                    text: 'Price (₹)'
                }
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy' // Tooltip format for dates
                }
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // Alternating row colors
                    opacity: 0.5
                }
            },
        };

        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

        return () => chart.destroy(); // Clean up the chart on component unmount
    }, [priceHistory]);

    return (
        <div id="chart" />
    );
};

export default ProductChart;
