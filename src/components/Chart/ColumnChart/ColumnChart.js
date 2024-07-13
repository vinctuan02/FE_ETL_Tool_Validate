import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ColumnChart = (props) => {
    const { data, title } = props;

    const [chartState, setChartState] = useState({
        series: [
            { name: 'Table Source', data: [], },
            { name: 'Table Sink', data: [], }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false,
                    tools: {
                        download: true, selection: false, zoom: false,
                        zoomin: false, zoomout: false, pan: false, reset: false
                    }
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false, columnWidth: '45%', endingShape: 'rounded',
                    borderRadius: 6, // Bo tròn các cột
                    borderRadiusApplication: 'end' // Bo tròn phía trên
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true, width: 2, colors: ['transparent'],
            },
            xaxis: {
                categories: [],
            },
            yaxis: {
                // title: { text: title },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: { formatter: function (val) { return "" + val; }, },
            },
        },
    });

    useEffect(() => {
        if (data && data.length > 0) {
            setChartState(prevState => ({
                ...prevState,
                series: data
            }));
        }
    }, [data]);

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={chartState.options}
                    series={chartState.series}
                    type="bar"
                    height={350}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default ColumnChart;
