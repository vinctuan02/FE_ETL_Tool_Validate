import React, { useContext, useEffect, useState } from 'react'
import './CompareComponent.scss'
import { countRecordsTB, getReportDetailsBy_report_id } from '../../services/ReportService'
import { AppContext } from '../../context/AppContext'
import ColumnChart from '../Chart/ColumnChart/ColumnChart'
import SplineChart from '../Chart/SplineChart/SplineChart'

const CompareComponent = (props) => {
    // const [dataChart, setDataChart] = useState([])

    const [dataColumnChart, setDataColumnChart] = useState({})

    const {
        currentSelect, isShowModalReport,
        reportDetailsCurrent, setReportDetailsCurrent
    } = useContext(AppContext)

    const fetchReportDetails = async () => {
        if (currentSelect && currentSelect.report_id && isShowModalReport === false) {
            const res = await getReportDetailsBy_report_id(currentSelect?.report_id)
            setReportDetailsCurrent(res.data)
        }
    }

    useEffect(() => {
        fetchReportDetails()
    }, [currentSelect, isShowModalReport])


    // dataChartx
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const dataChartx = await convertToDataChart(reportDetailsCurrent);
    //         setDataChart(dataChartx);
    //     };
    //     fetchData()

    // }, [reportDetailsCurrent]);

    const fetchDataColumnChart = async () => {
        if (reportDetailsCurrent) {
            const sourcePromises = reportDetailsCurrent.map(item => countRecord(item.schemaName, item.dataSourceName));
            const sinkPromises = reportDetailsCurrent.map(item => countRecord(item.schemaName, item.dataSinkName));

            const sourceResults = await Promise.all(sourcePromises);
            const sinkResults = await Promise.all(sinkPromises);

            setDataColumnChart(
                [
                    {
                        name: 'Table Source',
                        data: sourceResults
                    },
                    {
                        name: 'Table Sink',
                        data: sinkResults
                    }
                ]
            )
        }
    };

    useEffect(() => {
        fetchDataColumnChart();
    }, [reportDetailsCurrent]);



    let countRecord = async (nameDB, nameTB) => {
        let input = { nameDB, nameTB }
        let response = await countRecordsTB(input)
        let count = response.data[0].countRecords
        return count
    }

    // useEffect(() => {
    //     console.log("dataApexChart: ", dataApexChart);
    // }, [dataApexChart])

    // const convertToDataChart = async (arrData) => {
    //     if (arrData) {
    //         const result = arrData.map(async (item, index) => {
    //             const dataSourcePromise = countRecord(item.schemaName, item.dataSourceName);
    //             const dataSinkPromise = countRecord(item.schemaName, item.dataSinkName);
    //             const [dataSourceCount, dataSinkCount] = await Promise.all([dataSourcePromise, dataSinkPromise]);
    //             return (
    //                 {
    //                     name: `${item.dataSourceName} ${item.dataSinkName}`,
    //                     // name: ``,
    //                     dataSource: dataSourceCount,
    //                     dataSink: dataSinkCount
    //                 }
    //             )
    //         })
    //         return Promise.all(result);
    //     }
    // }

    return (
        <div className='container-compare-component'>
            <div className='body-compare'>
                {/* dong 1 */}
                <div className='body-body-compare'>
                    <div className='body-bar-char'>
                        <div className='bar-char'>
                            <ColumnChart
                                data={dataColumnChart}
                                title={'Total record'}
                            />
                        </div>
                    </div>
                    <div className='body-bar-char'>
                        <div className='bar-char'>
                            <ColumnChart
                                data={dataColumnChart}
                                title={'Total sum column'}
                            />
                        </div>
                    </div>
                </div>

                {/* dong 2 */}
                <div className='body-body-compare'>
                    <div className='body-bar-char'>
                        <div className='bar-char'>
                            <SplineChart />
                        </div>
                    </div>
                    <div className='body-bar-char'>
                        <div className='bar-char'>
                            <SplineChart />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div>
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
            </div> */}
        </div>
    )
}

export default CompareComponent
