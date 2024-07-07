import { useContext, useEffect, useState } from 'react';

import './ModalUpdate.scss'
import { getReportByReportNameAxios, putUpdateReport } from '../../services/ReportService';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

const { Modal, Button } = require("react-bootstrap")

const ModalUpdate = (props) => {

    const { handleCloseModal, dataUpdate, isShowModalUpdate, getReports } = useContext(AppContext)

    const [nameReport, setNameReport] = useState('')
    const [fileName, setFileName] = useState('')
    const [status, setStatus] = useState('')

    const [isDisableButton, setIsDisableButton] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getReportByReportNameAxios(nameReport)

            if (isShowModalUpdate && data && data.isExist) {
                data.isExist === 'true' && toast.error("Report name is exist")
                setIsDisableButton(data.isExist === 'true' ? true : false)
            }

        }
        fetchData();
    }, [nameReport])

    useEffect(() => {
        setNameReport(dataUpdate?.reportName)
        setFileName(dataUpdate?.fileName)
        setStatus(dataUpdate?.status)
    }, [dataUpdate])


    const handleConfirm = async () => {

        const report = { report_id: dataUpdate.report_id, reportName: nameReport, fileName: fileName, status: 'true' }

        const response = await putUpdateReport(report)

        if (response.code === 0) {
            toast.success("Update report oke")
            getReports()
        }

        handleCloseModal()
    }

    const handleChangeReportName = (event) => {
        setNameReport(event.target.value)
    }

    const handleChangeFileName = (event) => {
        // setFileName()
    }
    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
    }

    return (
        <>
            <Modal className='container-update-report' show={isShowModalUpdate} onHide={handleCloseModal}>
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
                                onChange={(event) => handleChangeFileName(event)}
                                value={fileName || ''}
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