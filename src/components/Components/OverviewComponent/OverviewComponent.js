import React, { useContext, useEffect, useState } from 'react'
import './OverviewComponent.scss'
import { countRecordsTB, getReportDetailsBy_report_id } from '../../../services/ReportService'
import { AppContext } from '../../../context/AppContext'
import ColumnChart from '../../Chart/ColumnChart/ColumnChart'
import OptionChartPopper from '../../Popper/OptionChartPopper/OptionChartPopper'
import TableComponent from '../../Tables/TableComponent/TableComponent'

const OverviewComponent = (props) => {

    const [dataColumnChart, setDataColumnChart] = useState({})

    const [arrSourceName, setArrSourceName] = useState([])
    const [arrSchemaSource, setArrSchemaSource] = useState([])
    const [arrSchemaSink, setArrSchemaSink] = useState([])

    const {
        currentSelect, isShowModalReport,
        reportDetailsCurrent, setReportDetailsCurrent,
        arrSourceSinkToCount, setCurrentSelectTB,
    } = useContext(AppContext)

    const {
        setSelectedButton
    } = props

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

    const actionDetail = (item) => {
        setSelectedButton('detail')
        setCurrentSelectTB(item)
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
            <div className='ovr2'>
                <div className='container-table'>
                    <div className='title-btn'>
                        {currentSelect && currentSelect.reportName ? (
                            <span className='title'>Report: {currentSelect.reportName} </span>
                        ) : (
                            <span className='title'>Report</span>
                        )}
                    </div>
                    <div className='table'>
                        <TableComponent
                            data={reportDetailsCurrent}
                            hiddenFields={['detail_id', 'report_id']}
                            hasDetail={true}
                            actionDetail={actionDetail}
                        />
                    </div>
                </div>

            </div>
        </div >
    )
}

export default OverviewComponent
