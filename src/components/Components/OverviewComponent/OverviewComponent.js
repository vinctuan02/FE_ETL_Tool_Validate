import React, { useContext, useEffect, useState } from 'react'
import './OverviewComponent.scss'
import { countRecordsTB, getInfoJDBC, getReportDetailsBy_report_id } from '../../../services/ReportService'
import { AppContext } from '../../../context/AppContext'
import ColumnChart from '../../Chart/ColumnChart/ColumnChart'
import OptionChartPopper from '../../Popper/OptionChartPopper/OptionChartPopper'
import TableComponent from '../../Tables/TableComponent/TableComponent'

const OverviewComponent = (props) => {

    const [dataColumnChart, setDataColumnChart] = useState({})

    const [arrSourceNameToNameColumnChart, setArrSourceNameToNameColumnChart] = useState([])
    // const [arrSchemaSource, setArrSchemaSource] = useState([])
    // const [arrSchemaSink, setArrSchemaSink] = useState([])

    const {
        currentSelect, reportDetailsCurrent,
        arrSourceSinkToCount, setCurrentSelectTB,
    } = useContext(AppContext)

    const {
        setSelectedButton
    } = props


    useEffect(() => {
        fetchDataColumnChart(reportDetailsCurrent);
    }, [reportDetailsCurrent]);


    useEffect(() => {
        fetchDataColumnChart(arrSourceSinkToCount)
    }, [arrSourceSinkToCount])


    const fetchDataColumnChart = async (arr) => {
        if (arr && arr.length > 0) {

            // get infoJDBC
            const resJDBCSource = await getInfoJDBC(arr[0].source_connection_id)
            const resJDBCSink = await getInfoJDBC(arr[0].sink_connection_id)

            const infoJDBCSource = resJDBCSource.data
            const infoJDBCSink = resJDBCSink.data

            let arrSourceNameToNameColumnChart = []

            const sourcePromises = arr.map((item) => {
                arrSourceNameToNameColumnChart.push(item.dataSourceName)
                return countRecord(item.schemaSourceName, item.dataSourceName, infoJDBCSource)
            });
            const sinkPromises = arr.map((item) => {
                return countRecord(item.schemaSinkName, item.dataSinkName, infoJDBCSink)
            });

            const sourceResults = await Promise.all(sourcePromises);
            const sinkResults = await Promise.all(sinkPromises);


            setArrSourceNameToNameColumnChart(arrSourceNameToNameColumnChart)
            // setArrSchemaSource(arrSchemaSource)
            // setArrSchemaSink(arrSchemaSink)

            // console.log("arrSourceNameToNameColumnChart: ", arrSourceNameToNameColumnChart);
            // console.log("arrSchemaSource: ", arrSchemaSource);
            // console.log("arrSchemaSink: ", arrSchemaSink);

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


    let countRecord = async (nameDB, nameTB, infoJDBC) => {
        let response = await countRecordsTB(nameDB, nameTB, infoJDBC)
        let count = response.data[0].countRecords
        return count
    }

    const actionDetail = (item) => {
        setSelectedButton('detail')
        setCurrentSelectTB(item)
    }

    return (
        <>
            {
                reportDetailsCurrent &&
                <div className='container-compare-component'>
                    < div className='r1' >
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
                                    categories={arrSourceNameToNameColumnChart}
                                // arrSchemaSource={arrSchemaSource}
                                // arrSchemaSink={arrSchemaSink}
                                />
                            </div>
                        </div>

                    </div >
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
                                    hiddenFields={['detail_id', 'report_id', 'source_connection_id', 'sink_connection_id']}
                                    hasDetail={true}
                                    hasIndex={true}
                                    actionDetail={actionDetail}
                                />
                            </div>
                        </div>

                    </div>
                </div >
            }
        </>
    )
}

export default OverviewComponent
