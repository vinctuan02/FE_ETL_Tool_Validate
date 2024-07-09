import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SplineChart.scss';

const SplineChart = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const seriesData = [{
        name: 'Author',
        data: [31, 40, 28, 51, 42, 60, 50, 30, 40]
    }, {
        name: 'Book',
        data: [11, 32, 45, 32, 34, 20, 41, 35, 50]
    }];

    const allCategories = [
        "2024-07-01T00:00:00.000Z",
        "2024-07-02T00:00:00.000Z",
        "2024-07-03T00:00:00.000Z",
        "2024-07-04T00:00:00.000Z",
        "2024-07-05T00:00:00.000Z",
        "2024-07-06T00:00:00.000Z",
        "2024-07-07T00:00:00.000Z",
        "2024-07-08T00:00:00.000Z",
        "2024-07-09T00:00:00.000Z",
        // "2024-07-10T00:00:00.000Z"
    ];

    const filteredCategories = allCategories.filter(date => {
        const dateObj = new Date(date);
        return (!startDate || dateObj >= startDate) && (!endDate || dateObj <= endDate);
    });

    const chartOptions = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        yaxis: {
            title: { text: 'Total records by date' },
        },
        xaxis: {
            type: 'datetime',
            categories: filteredCategories
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        }
    };

    return (
        <div>
            {/* <div className="date-picker-container">
                <DatePicker
                    selected={startDate}
                    // onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    dateFormat="yyyy-MM-dd"
                />
                <DatePicker
                    selected={endDate}
                    // onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    dateFormat="yyyy-MM-dd"
                />
            </div> */}
            <div id="chart">
                <ReactApexChart options={chartOptions} series={seriesData} type="area" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default SplineChart;
