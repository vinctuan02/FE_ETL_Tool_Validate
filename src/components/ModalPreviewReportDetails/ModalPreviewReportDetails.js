import { useContext, useEffect, useState } from 'react';
import TableComponent from '../TableComponent/TableComponent';
import './ModalPreviewReportDetails.scss'
import { getReportDetailsBy_report_id } from '../../services/ReportService';
import { AppContext } from '../../context/AppContext';

const { Modal, Button } = require("react-bootstrap")

const ModalPreviewReportDetails = (props) => {

    const { handleCloseModal, dataPreviewReportDetails, isShowModalPreviewReportDetails } = useContext(AppContext)

    const [reportName, setReportName] = useState('')
    const [dataReportDetails, setDataReportDetails] = useState({})

    const report_id = dataPreviewReportDetails?.report_id

    useEffect(() => {
        setReportName(dataPreviewReportDetails?.reportName)
        fetchReportDetails(report_id)
    }, [dataPreviewReportDetails])

    const fetchReportDetails = async (id) => {
        if (id) {
            const response = await getReportDetailsBy_report_id(id)
            setDataReportDetails(response.data)
        }
    }


    const handleCompare = async () => {
        handleCloseModal()
    }

    return (
        <>
            <Modal className='container-preview-report-details' show={isShowModalPreviewReportDetails} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Report: {reportName} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TableComponent
                        data={dataReportDetails} hasBorder={true}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary" onClick={handleCompare}
                    // disabled={isDisableButton}
                    >
                        Compare
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalPreviewReportDetails