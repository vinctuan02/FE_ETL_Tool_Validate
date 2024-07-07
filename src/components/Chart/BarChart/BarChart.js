import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyBarChart = (props) => {

    const { data } = props

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="dataSource" fill="#F7AE1B" radius={[0, 0, 0, 0]} />
                <Bar dataKey="dataSink" fill="#56E596" radius={[0, 0, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}



export default MyBarChart;

