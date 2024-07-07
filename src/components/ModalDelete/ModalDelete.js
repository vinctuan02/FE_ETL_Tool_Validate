import { useContext, useEffect, useState } from 'react';

import './ModalDelete.scss'
import { deleteReport, getReportByReportNameAxios, putUpdateReport } from '../../services/ReportService';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

const { Modal, Button } = require("react-bootstrap")

const ModalDelete = (props) => {
    const { handleCloseModal, dataDelete, isShowModalDelete, getReports } = useContext(AppContext)

    const [nameReport, setNameReport] = useState('')
    const [fileName, setFileName] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        setNameReport(dataDelete?.reportName)
        setFileName(dataDelete?.fileName)
        setStatus(dataDelete?.status)
    }, [dataDelete])


    const handleDelete = async () => {

        const report = { report_id: dataDelete.report_id, reportName: nameReport, fileName: fileName, status: 'true' }

        const response = await deleteReport(report)

        if (response.code === 0) {
            toast.success("Delete report oke")
            getReports()
        }
        handleCloseModal()
    }

    return (
        <>
            <Modal className='container-update-report' show={isShowModalDelete} onHide={handleCloseModal}>
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