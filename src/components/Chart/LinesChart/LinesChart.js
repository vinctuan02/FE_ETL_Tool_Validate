import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './LinesChart.scss'

// Dữ liệu mẫu
const data = [
    { name: '1/7/2024', table1: 2400, table2: 1300 },
    { name: '2/7/2024', table1: 1398, table2: 2800 },
    { name: '3/7/2024', table1: 9800, table2: 2300 },
    { name: '4/7/2024', table1: 3908, table2: 3908 },
    { name: '5/7/2024', table1: 4800, table2: 4900 },
    { name: '6/7/2024', table1: 3800, table2: 3800 },
    { name: '7/7/2024', table1: 4300, table2: 4300 },
];

const LinesChart = () => (
    <div className='line-chart-container'>
        <ResponsiveContainer width='100%' height='100%'>
            < LineChart
                data={data}
            // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="table1" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="table2" stroke="#82ca9d" />
            </LineChart >
        </ResponsiveContainer >
    </div>
);

export default LinesChart;
