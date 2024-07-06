import React, { useEffect, useState } from 'react'

import './ReportInfoPage.scss'
import CompareComponent from '../../components/CompareComponent/CompareComponent'
import { Button } from 'react-bootstrap';
import ModalReport from '../../components/ModalReport/ModalReport';
import { getReportDetailsBy_report_id } from '../../services/ReportService';

const ReportInfoPage = () => {

    const [selectedButton, setSelectedButton] = useState('compare')
    const [isShowModalReport, setIsShowModalReport] = useState(false)

    const [reportCurrent, setReportCurent] = useState('')


    useEffect(() => {
        console.log("reportCurrent: ", reportCurrent);
    }, [reportCurrent])

    const DataComponent = () => <div>Data Component</div>;
    const DescribeComponent = () => <div>Describe Component</div>;

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    let handleOpenModalReport = () => {
        setIsShowModalReport(true)
    }

    let handleClose = () => {
        setIsShowModalReport(false)
    }

    let handleOke = async () => {
        setIsShowModalReport(false)
        if (reportCurrent) {
            let res = await getReportDetailsBy_report_id(reportCurrent.report_id)
        }
        // console.log(reportCurrent);
    }

    return (
        <div className='container-report-info'>
            <div className='header-report-info'>
                <div className='nav-info'>
                    <button
                        className={`btn-info1 btn ${selectedButton === 'compare' ? 'btn-primary' : ''}`}
                        onClick={() => handleButtonClick('compare')}
                    >
                        Compare
                    </button>
                    <button
                        className={`btn-info1 btn ${selectedButton === 'data' ? 'btn-primary' : ''}`}
                        onClick={() => handleButtonClick('data')}
                    >
                        Data
                    </button>
                    <button
                        className={`btn-info1 btn ${selectedButton === 'describe' ? 'btn-primary' : ''}`}
                        onClick={() => handleButtonClick('describe')}
                    >
                        Describe
                    </button>
                </div>

                <div>
                    <Button
                        variant="success"
                        onClick={(handleOpenModalReport)}
                    >List Reports <i className='bx bx-chevron-down'></i></Button>
                </div>
            </div>
            <div className='body-info'>
                {/* <TableTest /><div> */}
                {selectedButton === 'compare' && <CompareComponent />}
                {selectedButton === 'data' && <DataComponent />}
                {selectedButton === 'describe' && <DescribeComponent />}
            </div>
            {/* </div> */}
            <div>
                <ModalReport
                    show={isShowModalReport}
                    handleClose={handleClose}
                    handleOke={handleOke}
                    hasAction={false}
                    setReportCurent={setReportCurent}
                />
            </div>
        </div>
    )
}

export default ReportInfoPage
