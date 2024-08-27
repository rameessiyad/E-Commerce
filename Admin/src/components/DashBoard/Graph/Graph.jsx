import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const Graph = () => {
    // Example sales data with more data points
    const data = {
        labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
            {
                label: 'Total Sales',
                data: [12000, 19000, 3000, 5000, 2000, 30000, 4500, 7000, 10000, 25000, 18000, 22000], // More data points
                fill: true, // Enables the shaded area
                backgroundColor: 'rgba(173, 216, 230, 0.4)', // Light blue shade
                borderColor: 'black', // Line color
                borderWidth: 2, // Line thickness
                pointBackgroundColor: 'black', // Point color
                tension: 0.4, // Smooth the lines for curved effect
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Ensures the aspect ratio doesn't distort the chart
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Overview',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'gray', // X-axis labels color
                },
                grid: {
                    display: false, // Hide x-axis grid lines
                },
            },
            y: {
                ticks: {
                    color: 'gray', // Y-axis labels color
                },
                grid: {
                    display: true, // Show y-axis grid lines
                },
                suggestedMin: 0,
                suggestedMax: 35000, // Adjust the max value based on your data
                grace: '5%', // Add padding for better visibility
            },
        },
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md" style={{ height: 'calc(100vh - 300px)', width: '100%' }}>
            <p className="text-2xl font-medium mb-3">Sales Details</p>
            <Line data={data} options={options} />
        </div>
    );
};

export default Graph;
