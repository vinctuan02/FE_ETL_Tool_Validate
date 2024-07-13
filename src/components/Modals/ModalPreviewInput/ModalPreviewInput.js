import { useContext, useEffect, useState } from 'react';
import './ModalPreviewInput.scss'
import { toast } from 'react-toastify';
import { AppContext } from '../../../context/AppContext';
import { bulkCreateReportDetails, getReportByReportNameAxios, postCreateReport } from '../../../services/ReportService';
import TableComponent from '../../TableComponent/TableComponent';

const { Modal, Button } = require("react-bootstrap")

const ModalPreviewInput = (props) => {
    const { isShowModalPreviewInput, handleCloseModal, nameFileReport = '', dataReport, getReports } = useContext(AppContext)

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

        const arrayReportDetails = dataReport.map((item) => ({
            ...item,
            report_id: response.data.report_id
        }));

        const responseBulkCreate = await bulkCreateReportDetails(arrayReportDetails)


        if (response.code === 0 && responseBulkCreate.code === 0) {
            toast.success(response.message)
            getReports()
        }

        handleCloseModal()
    }

    const handleOnChangeInputNameReport = (event) => {
        setNameReport(event.target.value)
    }

    return (
        <>
            <Modal className='container-preview-input' show={isShowModalPreviewInput} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Import report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TableComponent data={dataReport} />
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