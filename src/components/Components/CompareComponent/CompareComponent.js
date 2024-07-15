import React, { useContext, useEffect, useState } from 'react'
import './CompareComponent.scss'
import { countRecordsTB, getReportDetailsBy_report_id } from '../../../services/ReportService'
import { AppContext } from '../../../context/AppContext'
import ColumnChart from '../../Chart/ColumnChart/ColumnChart'
import TableComponent from '../../Tables/TableComponent/TableComponent'

const CompareComponent = (props) => {
    // const [dataChart, setDataChart] = useState([])

    const [dataColumnChart, setDataColumnChart] = useState({})
    const [arrSourceSink, setArrSourceSink] = useState()

    const {
        currentSelect, isShowModalReport,
        reportDetailsCurrent, setReportDetailsCurrent,
    } = useContext(AppContext)

    const fetchReportDetails = async () => {
        if (currentSelect && currentSelect.report_id) {
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
            const sourcePromises = reportDetailsCurrent.map(item => countRecord(item.schemaSourceName, item.dataSourceName));
            const sinkPromises = reportDetailsCurrent.map(item => countRecord(item.schemaSinkName, item.dataSinkName));

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

    const removeFields = (data, fields) => {
        if (data) {
            return data.map((item, index) => {
                let newItem = {}; // Tạo một đối tượng mới
                newItem.index = index + 1; // Thêm trường stt vào đối tượng mới

                let tempItem = { ...item }; // Tạo một bản sao của đối tượng gốc
                fields.forEach(field => {
                    delete tempItem[field]; // Xóa các trường không mong muốn từ bản sao
                });

                newItem = { ...newItem, ...tempItem }; // Gộp đối tượng mới với các trường còn lại
                return newItem; // Trả về đối tượng mới đã chỉnh sửa
            });
        }
    };

    const fieldsToRemove = ["detail_id", "report_id", "schemaSourceName", "schemaSinkName"];

    useEffect(() => {
        setArrSourceSink(removeFields(reportDetailsCurrent, fieldsToRemove))
    }, [reportDetailsCurrent])

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
                <div className='left'>
                    {/* <div className='body-body-compare'>
                        <div className='body-bar-char'>
                            <div className='title'>
                            </div>
                            <div className='chart bar-char'>
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
                    </div> */}
                    <div className='row'>
                        <div className='title'>Record Count</div>
                        <div className='body'>
                            <ColumnChart
                                data={dataColumnChart}
                            />
                        </div>
                    </div>

                    {/* <div className='row'>
                        <div className='title'>Sum of column</div>
                        <div className='body'>
                            <ColumnChart
                                data={dataColumnChart}
                            />
                        </div>
                    </div> */}
                </div>
                <div className='right'>
                    <div className='title'>
                        Report: {currentSelect.reportName}
                    </div>
                    <div className='body'>
                        <TableComponent
                            data={arrSourceSink}
                        />
                    </div>
                </div>
            </div>

        </div >
    )
}

export default CompareComponent
