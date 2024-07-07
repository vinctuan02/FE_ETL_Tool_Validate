import React, { useEffect, useState } from 'react'
import LinesChart from '../../components/Chart/LinesChart/LinesChart'
import MyBarChart from '../../components/Chart/BarChart/BarChart'
import './CompareComponent.scss'
import { countRecordsTB } from '../../services/ReportService'

const CompareComponent = (props) => {
    const { reportDetailsCurrent = [] } = props

    const [dataChart, setDataChart] = useState([])

    // reportDetailsCurrent && console.log("reportDetailsCurrent: ", reportDetailsCurrent);


    const details = [
        { detail_id: 25, report_id: 39, schemaName: 'vinc02', dataSourceName: 'facebook', dataSinkName: 'users2' },
        { detail_id: 26, report_id: 39, schemaName: 'vinc02', dataSourceName: 'facebook', dataSinkName: 'users3' },
        { detail_id: 27, report_id: 39, schemaName: 'vinc02', dataSourceName: 'facebook', dataSinkName: 'users4' },
        { detail_id: 28, report_id: 39, schemaName: 'vinc02', dataSourceName: 'facebook', dataSinkName: 'youtube' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            const dataChartx = await convertToDataChart(reportDetailsCurrent);
            setDataChart(dataChartx);
        };
        fetchData();
    }, [reportDetailsCurrent]);

    // const data = [
    //     { name: 'Schema1', dataSource: 4000, dataSink: 2400 },
    //     { name: 'Schema1', dataSource: 3000, dataSink: 1398 },
    //     { name: 'Schema1', dataSource: 2000, dataSink: 9800 },
    // ]

    let countRecord = async (nameDB, nameTB) => {
        let input = { nameDB, nameTB }
        let response = await countRecordsTB(input)
        let count = response.data[0].countRecords
        return count
    }

    const convertToDataChart = async (arrData) => {
        if (arrData) {
            const result = arrData.map(async (item, index) => {
                const dataSourcePromise = countRecord(item.schemaName, item.dataSourceName);
                const dataSinkPromise = countRecord(item.schemaName, item.dataSinkName);
                const [dataSourceCount, dataSinkCount] = await Promise.all([dataSourcePromise, dataSinkPromise]);
                return (
                    {
                        name: `${item.dataSourceName} ${item.dataSinkName}`,
                        // name: ``,
                        dataSource: dataSourceCount,
                        dataSink: dataSinkCount
                    }
                )
            })
            return Promise.all(result);
        }
    }

    let data = []

    // const fetchData = async () => {
    //     return await convertToDataChart(details)
    // }

    return (
        <div className='container-compare-component'>
            <div className='body-compare'>
                <div className='body-body-compare'>
                    <div >
                        <div>Total records</div>
                        <MyBarChart
                            reportDetailsCurrent={reportDetailsCurrent}
                            data={dataChart}
                        />
                    </div>
                    <div >
                        <div>Total sum of []</div>
                        {/* <MyBarChart /> */}
                    </div>
                </div>
            </div>

            <div>
                <div>Component2</div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div >
                        <div>Total records</div>
                        <LinesChart />
                    </div>
                    <div>
                        <div>Total sum of []</div>
                        <LinesChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompareComponent
