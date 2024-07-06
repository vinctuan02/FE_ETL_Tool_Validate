import { useEffect, useState } from 'react';

import './ModalDelete.scss'
import { deleteReport, getReportByReportNameAxios, putUpdateReport } from '../../services/ReportService';
import { toast } from 'react-toastify';

const { Modal, Button } = require("react-bootstrap")

const ModalDelete = (props) => {

    const { handleClose, show, data, getReports } = props

    const [nameReport, setNameReport] = useState('')
    const [fileName, setFileName] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        setNameReport(data.reportName)
        setFileName(data.fileName)
        setStatus(data.status)
    }, [data])


    const handleDelete = async () => {

        const report = { report_id: data.report_id, reportName: nameReport, fileName: fileName, status: 'true' }

        const response = await deleteReport(report)

        if (response.code === 0) {
            toast.success("Delete report oke")
            getReports()
        }
        handleClose()
    }

    return (
        <>
            <Modal className='container-update-report' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-edit">
                        <div className="form-group">
                            <div className="form-label">Report name: </div>
                            <input
                                type="text"
                                defaultValue={nameReport || ""}
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-label">File name: </div>
                            <input
                                type="text"
                                // onChange={(event) => handleChangeFileName(event)}
                                // bug fix disable change input
                                defaultValue={fileName || ''}
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-label">Status: </div>
                            <input
                                type="text"
                                defaultValue={status || ''}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger" onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDelete