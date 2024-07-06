import { Button, Modal } from "react-bootstrap";
import './ModalReport.scss'
import ReportComponent from "../ReportComponent/ReportComponent";

const ModalReport = (props) => {

    const { setReportCurent, handleOke, handleClose, show, hasAction = false } = props

    return (
        <div>
            <Modal className='container-modal-report' show={show} onHide={handleClose}>
                <Modal.Body>
                    <ReportComponent
                        hasAction={hasAction}
                        setReportCurent={setReportCurent}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={handleOke}
                    >
                        Oke
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalReport;