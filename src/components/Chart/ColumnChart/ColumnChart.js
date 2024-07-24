import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ColumnChart = (props) => {
    const { dataInput, categories } = props;

    // const dataInput = [
    //     { name: 'Table Source', data: [10, 20, 30, 40, 50] },
    //     { name: 'Table Sink', data: [15, 25, 35, 45, 55] }
    // ];

    const [chartState, setChartState] = useState({
        series: [
            { name: 'Table Source', data: [0, 0] },
            { name: 'Table Sink', data: [0, 0] }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 450,
                toolbar: {
                    show: false,
                    tools: {
                        download: true, selection: false, zoom: false,
                        zoomin: false, zoomout: false, pan: false, reset: true
                    }
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false, columnWidth: '45%', endingShape: 'rounded',
                    borderRadius: 2, // Bo tròn các cột
                    borderRadiusApplication: 'end' // Bo tròn phía trên
                },
            },
            dataLabels: {
                enabled: true,
            },
            stroke: {
                show: true, width: 2, colors: ['transparent'],
            },
            xaxis: {
                categories: categories,
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
        if (dataInput && dataInput.length > 0) {
            setChartState(prevState => ({
                ...prevState,
                series: dataInput,
                options: {
                    ...prevState.options,
                    xaxis: {
                        ...prevState.options.xaxis,
                        categories: categories,
                    }
                }
            }));
        }
    }, [dataInput, categories]);

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
