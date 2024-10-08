import { Button, Modal } from "react-bootstrap";
import './ModalReport.scss'
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import ReportComponent from "../../Components/ReportComponent/ReportComponent";

const ModalReport = (props) => {

    const { isShowModalReport, handleCloseModal, currentSelect } = useContext(AppContext)


    const handleClickCompare = () => {
        handleCloseModal()
    }

    return (
        <div>
            <Modal className='container-modal-report' show={isShowModalReport} onHide={handleCloseModal}>
                <Modal.Body>
                    <ReportComponent
                        hasShowRowInfo={false}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={handleClickCompare}
                    >
                        Compare
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalReport;