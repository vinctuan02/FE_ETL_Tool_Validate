import React, { useContext, useEffect, useState } from 'react'
import LinesChart from '../../components/Chart/LinesChart/LinesChart'
import MyBarChart from '../../components/Chart/BarChart/BarChart'
import './CompareComponent.scss'
import { countRecordsTB, getReportDetailsBy_report_id } from '../../services/ReportService'
import { AppContext } from '../../context/AppContext'

const CompareComponent = (props) => {
    const [dataChart, setDataChart] = useState([])
    const {
        currentSelect, isShowModalReport,
        reportDetailsCurrent, setReportDetailsCurrent
    } = useContext(AppContext)

    useEffect(() => {
        const fetchData = async () => {
            if (currentSelect && currentSelect.report_id && isShowModalReport === false) {
                const res = await getReportDetailsBy_report_id(currentSelect?.report_id)
                setReportDetailsCurrent(res.data)
            }
        }
        fetchData()
    }, [currentSelect, isShowModalReport])

    useEffect(() => {
        const fetchData = async () => {
            const dataChartx = await convertToDataChart(reportDetailsCurrent);
            setDataChart(dataChartx);
        };
        fetchData();
    }, [reportDetailsCurrent]);

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
                    <div className='body-bar-char'>
                        <div>Total records</div>
                        <div className='bar-char'>
                            <MyBarChart
                                // reportDetailsCurrent={reportDetailsCurrent}
                                data={dataChart}
                            />
                        </div>
                    </div>
                    <div className='body-bar-char'>
                        <div>Total sum of []</div>
                        <div className='bar-char'>
                            <MyBarChart
                                data={dataChart}
                            />
                        </div>
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
