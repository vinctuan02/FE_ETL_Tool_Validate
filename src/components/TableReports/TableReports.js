import React, { useEffect, useState } from 'react'
import './TableReports.scss'
import '@fortawesome/fontawesome-free/css/all.min.css';
import TableComponent from '../../components/TableComponent/TableComponent';
import { getReportsAxios } from '../../services/ReportService';
import ModalUpdate from '../../components/ModalUpdate/ModalUpdate';
import ModalDelete from '../../components/ModalDelete/ModalDelete';

const TableReports = () => {

    // danh sách reports
    const [listReports, setListReports] = useState([])

    // thông tin reports để lưu vào db
    const [dataReport, setDataReport] = useState({})
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)

    useEffect(() => {
        getReports()
    }, [])

    const getReports = async () => {
        console.log("fetch");
        let res = await getReportsAxios()
        if (res && res.data) {
            setListReports(res.data)
        }
    }

    const handleClose = () => {
        setIsShowModalUpdate(false)
        setIsShowModalDelete(false)
        setDataReport({})
    }

    const handleShowModalUpdate = (item) => {
        setDataReport(item)
        setIsShowModalUpdate(true)
    }

    const handleShowModalDelete = (item) => {
        setDataReport(item)
        setIsShowModalDelete(true)
    }


    return (
        <div className='container-input-page'>
            <div className='container-table-reports'>
                <TableComponent
                    data={listReports} hasAction={true}
                    handleShowModalUpdate={handleShowModalUpdate}
                    handleShowModalDelete={handleShowModalDelete}
                />
            </div>

            <ModalUpdate
                show={isShowModalUpdate}
                handleClose={handleClose}
                data={dataReport}
                getReports={getReports}
            />

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                data={dataReport}
                getReports={getReports}
            />
        </div>
    )
}

export default TableReports

