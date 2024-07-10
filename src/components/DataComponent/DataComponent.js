import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { getTable } from "../../services/ReportService"
import TableComponent from "../TableComponent/TableComponent"
import { Button } from 'react-bootstrap';
import './DataComponent.scss'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { getReportDetailsBy_report_id } from '../../services/ReportService'
import SplineChart from "../Chart/SplineChart/SplineChart";

const DataComponent = () => {

    const { currentSelectTB, currentSelect, isShowModalReport, setReportDetailsCurrent } = useContext(AppContext)
    const [tableSource, setTableSource] = useState()
    const [tableSink, setTableSink] = useState()

    const getTB = async () => {
        const inputSource = { nameDB: currentSelectTB.schemaName, nameTB: currentSelectTB.dataSourceName }
        const resSource = await getTable(inputSource)

        setTableSource(resSource.data)

        const inputSink = { nameDB: currentSelectTB.schemaName, nameTB: currentSelectTB.dataSinkName }
        const resSink = await getTable(inputSink)

        setTableSink(resSink.data)
    }

    useEffect(() => {
        currentSelectTB && getTB()
    }, [currentSelectTB])

    const fetchReportDetails = async () => {
        if (currentSelect && currentSelect.report_id) {
            const res = await getReportDetailsBy_report_id(currentSelect?.report_id)
            setReportDetailsCurrent(res.data)
        }
    }

    useEffect(() => {
        fetchReportDetails()
    }, [currentSelect, isShowModalReport])


    const exportToExcel = async (data, fileName) => {
        try {
            // Tạo một Workbook mới
            const workbook = XLSX.utils.book_new();
            const sheetName = 'Sheet1';

            // Chuyển đổi mảng thành dạng dữ liệu cho Sheet
            const worksheet = XLSX.utils.json_to_sheet(data);

            // Thêm Sheet vào Workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

            // Tạo file Excel dưới dạng Blob
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

            // Lưu file
            saveAs(blob, fileName);
            console.log(`File đã được lưu thành công: ${fileName}`);
        } catch (err) {
            console.error(`Lỗi khi lưu file: ${err}`);
        }
    }

    const handleExport = (data, fileName) => {
        exportToExcel(data, fileName)
    }


    return (
        <div className='container-data'>
            <div className='row'>
                <div className='left title-body'>
                    <div className="title">
                        <div className="title">Table: {currentSelectTB?.dataSourceName}</div>
                    </div>
                    <div className="body">
                        <SplineChart
                            // data={tableSource}
                            type={'area'}
                        />
                    </div>
                </div>
                <div className='right title-body'>
                    <div className="title">
                        <div className="title">Table: {currentSelectTB?.dataSourceName}</div>
                    </div>
                    <div className="body">
                        <SplineChart
                            // data={tableSource}
                            type={'bar'}
                        />
                    </div>
                </div>
            </div>
            <div className='row '>
                <div className='title-table'>
                    <div className="title-button">
                        <div className="title">Table: {currentSelectTB?.dataSourceName}</div>
                        <div className="button">
                            <Button
                                variant="success"
                                onClick={() => handleExport(tableSource, `${currentSelectTB.dataSourceName}.xlsx`)}
                            >
                                Export
                            </Button>
                        </div>
                    </div>
                    <div className="table">
                        <TableComponent
                            data={tableSource}
                        />
                    </div>
                </div>
            </div>
            <div className='row '>
                <div className='title-table'>
                    <div className="title-button">
                        <div className="title">Table: {currentSelectTB?.dataSinkName}</div>
                        <div className="button">
                            <Button
                                variant="success"
                                onClick={() => handleExport(tableSource, `${currentSelectTB.dataSinkName}.xlsx`)}
                            >
                                Export
                            </Button>
                        </div>
                    </div>
                    <div className="table">
                        <TableComponent
                            data={tableSink}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataComponent