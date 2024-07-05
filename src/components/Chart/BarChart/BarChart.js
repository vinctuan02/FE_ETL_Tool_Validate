import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { countRecordsTB } from '../../../services/ReportService';

const MyBarChart = () => (
    <ResponsiveContainer width={500} height={300}>
        <BarChart data={result} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="dataSource" fill="#6C9F6A" radius={[10, 10, 0, 0]} />
            <Bar dataKey="dataSink" fill="#6097A4" radius={[10, 10, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
);

let countRecord = async (nameDB, nameTB) => {
    let input = { nameDB, nameTB }
    let response = await countRecordsTB(input)
    let count = response.data[0].countRecords
    return count
}

// let countRecord = response.data[0].countRecords

// console.log(await countRecord('tuan02', 'table2'));



const data1 = [
    { schema: 'tuan02', dataSource: 'table1', dataSink: 'table1' },
    { schema: 'tuan02', dataSource: 'table1', dataSink: 'table2' },
    { schema: 'tuan02', dataSource: 'table2', dataSink: 'table1' },
    { schema: 'tuan02', dataSource: 'table2', dataSink: 'table2' },

    { schema: 'vinc02', dataSource: 'users2', dataSink: 'users2' },
    { schema: 'vinc02', dataSource: 'users2', dataSink: 'users3' },
    { schema: 'vinc02', dataSource: 'users3', dataSink: 'users3' },
]

const fetchData = async () => {
    const promises = data1.map(async (item, index) => {
        const dataSourcePromise = countRecord(item.schema, item.dataSource);
        const dataSinkPromise = countRecord(item.schema, item.dataSink);
        const [dataSourceCount, dataSinkCount] = await Promise.all([dataSourcePromise, dataSinkPromise]);
        return {
            name: '',
            dataSource: dataSourceCount,
            dataSink: dataSinkCount,
        };
    });
    return Promise.all(promises);
};

const result = await fetchData()

// console.log(result);

export default MyBarChart;

