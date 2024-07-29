import { useContext, useEffect, useState } from 'react';
import './ModalPreviewReportDetails.scss'

import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import { getReportDetailsBy_report_id } from '../../../services/ReportService';
import TableComponent from '../../Tables/TableComponent/TableComponent';

const { Modal, Button } = require("react-bootstrap")

const ModalPreviewReportDetails = (props) => {
    const navigate = useNavigate()

    const { handleCloseModal, dataPreviewReportDetails, isShowModalPreviewReportDetails, setCurrentSelect } = useContext(AppContext)

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
        navigate('/compare-page');
        // window.location.href = 'http://10.10.12.15:3000/report-info';
    }

    const hiddenFields = ['detail_id', 'report_id', 'source_connection_id', 'sink_connection_id']

    return (
        <>
            <Modal className='container-preview-report-details' show={isShowModalPreviewReportDetails} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Report: {reportName} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TableComponent
                        data={dataReportDetails}
                        hasBorder={true}
                        hiddenFields={hiddenFields}
                        hasIndex={true}
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