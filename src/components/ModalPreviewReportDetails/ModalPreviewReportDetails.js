import { useEffect, useState } from 'react';
import TableComponent from '../TableComponent/TableComponent';
import './ModalPreviewReportDetails.scss'
import { bulkCreateReportDetails, getReportByReportNameAxios, getReportDetailsBy_report_id, postCreateReport } from '../../services/ReportService';
import { toast } from 'react-toastify';

const { Modal, Button } = require("react-bootstrap")

const ModalPreviewReportDetails = (props) => {

    const { handleClose, show, data } = props

    const [reportName, setReportName] = useState('')
    const [dataReportDetails, setDataReportDetails] = useState({})
    // const [isDisableButton, setIsDisableButton] = useState(false)

    const report_id = data.report_id

    useEffect(() => {
        setReportName(data.reportName)
        fetchReportDetails(report_id)
    }, [data])

    const fetchReportDetails = async (id) => {
        if (id) {
            const response = await getReportDetailsBy_report_id(id)
            setDataReportDetails(response.data)
        }
    }


    const handleCompare = async () => {
        // const report = { reportName: nameReport, fileName: nameFileReport, status: 'true' }
        // const response = await postCreateReport(report)

        // const arrayReportDetails = data.map((item) => ({
        //     ...item,
        //     report_id: response.data.report_id
        // }));

        // const responseBulkCreate = await bulkCreateReportDetails(arrayReportDetails)


        // if (response.code === 0 && responseBulkCreate.code === 0) {
        //     toast.success(response.message)
        //     getReports()
        // }

        // console.log("report name: ", reportName);

        handleClose()
    }

    return (
        <>
            <Modal className='container-preview-report-details' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Report: {reportName} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TableComponent data={dataReportDetails} hasBorder={true} />
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