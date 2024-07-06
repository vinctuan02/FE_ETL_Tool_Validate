import { useEffect, useState } from 'react';
import TableComponent from '../TableComponent/TableComponent';
import './ModalPreviewInput.scss'
import { bulkCreateReportDetails, getReportByReportNameAxios, postCreateReport } from '../../services/ReportService';
import { toast } from 'react-toastify';

const { Modal, Button } = require("react-bootstrap")

const ModalPreviewInput = (props) => {

    const { handleClose, show, data, nameFileReport, getReports } = props

    const [nameReport, setNameReport] = useState('')
    const [isDisableButton, setIsDisableButton] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getReportByReportNameAxios(nameReport)

            if (data && data.isExist) {
                data.isExist === 'true' && toast.error("Report name is exist")
                setIsDisableButton(data.isExist === 'true' ? true : false)
            }

        }
        fetchData();
    }, [nameReport])

    useEffect(() => {
        setNameReport(nameFileReport.split('.')[0])
    }, [nameFileReport])


    const handleInsert = async () => {
        const report = { reportName: nameReport, fileName: nameFileReport, status: 'true' }
        const response = await postCreateReport(report)

        const arrayReportDetails = data.map((item) => ({
            ...item,
            report_id: response.data.report_id
        }));

        const responseBulkCreate = await bulkCreateReportDetails(arrayReportDetails)


        if (response.code === 0 && responseBulkCreate.code === 0) {
            toast.success(response.message)
            getReports()
        }

        handleClose()
    }

    const handleOnChangeInputNameReport = (event) => {
        setNameReport(event.target.value)
    }

    return (
        <>
            <Modal className='container-preview-input' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Import report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TableComponent data={data} />
                </Modal.Body>
                <Modal.Footer>
                    <label className="">Save report as name: </label>
                    <input
                        className='input-name' style={{ width: '40%' }}
                        onChange={(event) => handleOnChangeInputNameReport(event)}
                        value={nameReport}
                    ></input>
                    <Button
                        variant="primary" onClick={handleInsert}
                        disabled={isDisableButton}
                    >
                        Insert
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalPreviewInput