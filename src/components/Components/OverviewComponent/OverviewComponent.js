import React, { useContext, useEffect, useState } from 'react'
import './OverviewComponent.scss'
import { countRecordsTB, getReportDetailsBy_report_id } from '../../../services/ReportService'
import { AppContext } from '../../../context/AppContext'
import ColumnChart from '../../Chart/ColumnChart/ColumnChart'
import OptionChartPopper from '../../Popper/OptionChartPopper/OptionChartPopper'

const OverviewComponent = (props) => {
    // const [dataChart, setDataChart] = useState([])

    const [dataColumnChart, setDataColumnChart] = useState({})

    const [arrSourceName, setArrSourceName] = useState([])
    const [arrSchemaSource, setArrSchemaSource] = useState([])
    const [arrSchemaSink, setArrSchemaSink] = useState([])

    const {
        currentSelect, isShowModalReport,
        reportDetailsCurrent, setReportDetailsCurrent,
        arrSourceSinkToCount
    } = useContext(AppContext)

    useEffect(() => {
        fetchReportDetails()
    }, [currentSelect])


    useEffect(() => {
        fetchDataColumnChart(reportDetailsCurrent);
    }, [reportDetailsCurrent]);


    useEffect(() => {
        fetchDataColumnChart(arrSourceSinkToCount)
    }, [arrSourceSinkToCount])

    const fetchReportDetails = async () => {
        if (currentSelect && currentSelect.report_id) {
            const res = await getReportDetailsBy_report_id(currentSelect?.report_id)
            setReportDetailsCurrent(res.data)
        }
    }

    const fetchDataColumnChart = async (arr) => {
        if (arr && arr.length > 0) {
            let arrSourceName = []
            let arrSchemaSource = []
            let arrSchemaSink = []

            const sourcePromises = arr.map((item) => {
                arrSourceName.push(item.dataSourceName)
                arrSchemaSource.push(item.schemaSourceName)
                return countRecord(item.schemaSourceName, item.dataSourceName)
            });
            const sinkPromises = arr.map((item) => {
                arrSchemaSink.push(item.schemaSinkName)
                return countRecord(item.schemaSinkName, item.dataSinkName)
            });

            const sourceResults = await Promise.all(sourcePromises);
            const sinkResults = await Promise.all(sinkPromises);


            setArrSourceName(arrSourceName)
            setArrSchemaSource(arrSchemaSource)
            setArrSchemaSink(arrSchemaSink)

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


    let countRecord = async (nameDB, nameTB) => {
        let input = { nameDB, nameTB }
        let response = await countRecordsTB(input)
        let count = response.data[0].countRecords
        return count
    }

    return (
        <div className='container-compare-component'>
            <div className='r1'>
                <div className='container-chart'>
                    <div className='title-btn'>
                        <div className='title'>Record Count</div>
                        <OptionChartPopper
                            isDisabled={!reportDetailsCurrent || !reportDetailsCurrent.length ? true : false}
                        />
                    </div>
                    <div className='chart'>
                        <ColumnChart
                            dataInput={dataColumnChart}
                            categories={arrSourceName}
                            arrSchemaSource={arrSchemaSource}
                            arrSchemaSink={arrSchemaSink}
                        />
                    </div>
                </div>

            </div>
        </div >
    )
}

export default OverviewComponent
