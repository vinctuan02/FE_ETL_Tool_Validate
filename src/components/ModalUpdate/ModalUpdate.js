import { useEffect, useState } from 'react';

import './ModalUpdate.scss'
import { getReportByReportNameAxios, putUpdateReport } from '../../services/ReportService';
import { toast } from 'react-toastify';

const { Modal, Button } = require("react-bootstrap")

const ModalUpdate = (props) => {

    const { handleClose, show, data, getReports } = props

    const [nameReport, setNameReport] = useState('')
    const [fileName, setFileName] = useState('')
    const [status, setStatus] = useState('')

    const [isDisableButton, setIsDisableButton] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getReportByReportNameAxios(nameReport)

            if (show && data && data.isExist) {
                data.isExist === 'true' && toast.error("Report name is exist")
                setIsDisableButton(data.isExist === 'true' ? true : false)
            }

        }
        fetchData();
    }, [nameReport])

    useEffect(() => {
        setNameReport(data.reportName)
        setFileName(data.fileName)
        setStatus(data.status)
    }, [data])


    const handleConfirm = async () => {

        const report = { report_id: data.report_id, reportName: nameReport, fileName: fileName, status: 'true' }

        const response = await putUpdateReport(report)

        if (response.code === 0) {
            toast.success("Update report oke")
            getReports()
        }

        handleClose()
    }

    const handleChangeReportName = (event) => {
        setNameReport(event.target.value)
    }

    const handleChangeFileName = (event) => {
        setFileName(event.target.value)
    }
    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
    }

    return (
        <>
            <Modal className='container-update-report' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-edit">
                        <div className="form-group">
                            <div className="form-label">Report name: </div>
                            <input
                                type="text"
                                onChange={(event) => handleChangeReportName(event)}
                                value={nameReport || ""}
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-label">File name: </div>
                            <input
                                type="text"
                                // onChange={(event) => handleChangeFileName(event)}
                                defaultValue={fileName || ''}
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-label">Status: </div>
                            <input
                                type="text"
                                onChange={(event) => handleChangeStatus(event)}
                                value={status || ''}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <label className="">Save report as name: </label>
                    <input
                        className='input-name' style={{ width: '40%' }}
                        onChange={(event) => handleOnChangeInputNameReport(event)}
                        value={nameReport}
                    ></input> */}
                    <Button
                        variant="primary" onClick={handleConfirm}
                        disabled={isDisableButton}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdate