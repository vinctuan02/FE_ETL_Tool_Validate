import { useEffect, useState } from 'react';
import TableComponent from '../TableComponent/TableComponent';
import './ModalReport.scss'
import { getReportByReportNameAxios, postCreateReport } from '../../services/ReportService';
import { toast } from 'react-toastify';
import InputPage from '../../pages/InputPage/InputPage';

const { Modal, Button } = require("react-bootstrap")

const ModalReport = (props) => {

    const { handleClose, show, data, nameFileReport, getReports } = props

    // const [nameReport, setNameReport] = useState('')
    // const [isDisableButton, setIsDisableButton] = useState(false)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await getReportByReportNameAxios(nameReport)

    //         if (data && data.isExist) {
    //             data.isExist === 'true' && toast.error("Report name is exist")
    //             setIsDisableButton(data.isExist === 'true' ? true : false)
    //         }

    //     }
    //     fetchData();
    // }, [nameReport])

    // useEffect(() => {
    //     setNameReport(nameFileReport.split('.')[0])
    // }, [nameFileReport])


    // const handleCompare = async () => {

    //     const report = { reportName: nameReport, fileName: nameFileReport, status: 'true' }

    //     const response = await postCreateReport(report)

    //     if (response.code === 0) {
    //         toast.success(response.message)
    //         getReports()
    //     }

    //     handleClose()
    // }

    // const handleOnChangeInputNameReport = (event) => {
    //     setNameReport(event.target.value)
    // }

    return (
        <>
            <Modal dialogClassName='container-preview-input' show={false} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>List reports</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputPage />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalReport