import React, { useContext, useEffect, useState } from 'react'
import './ReportInfoPage.scss'
import CompareComponent from '../../components/CompareComponent/CompareComponent'
import { Button } from 'react-bootstrap';
import { getReportDetailsBy_report_id } from '../../services/ReportService';
import { AppContext } from '../../context/AppContext';
import { ReportInfoContext, ReportProvider } from '../../context/ReportInfoContext';
import SelectComponent from '../../components/SelectComponent/SelectComponent';

const ReportInfoPage = () => {

    const { isShowModalReport, setIsShowModalReport, handleOpenModalReport, currentSelect } = useContext(AppContext)

    const [selectedButton, setSelectedButton] = useState('compare')
    // const [isShowModalReport, setIsShowModalReport] = useState(false)

    // const [reportDetailsCurrent, setReportDetailsCurrent] = useState('')


    // useEffect(() => {
    //     if (reportDetailsCurrent) {
    //         console.log(reportDetailsCurrent);
    //     }
    // }, [reportDetailsCurrent])

    const DataComponent = () => <div>Data Component</div>;
    const DescribeComponent = () => <div>Describe Component</div>;

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    return (
        <ReportProvider>
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

                    <div className='select-report'>
                        <div>
                            {/* <SelectComponent className='select-table' /> */}
                        </div>
                        <Button
                            variant="success"
                            onClick={(handleOpenModalReport)}
                        >
                            {currentSelect && currentSelect.reportName ? (
                                <span>Report: {currentSelect.reportName}</span>
                            ) : (
                                <span>List Reports</span>
                            )}
                            <i className='bx bx-chevron-down'></i>
                        </Button>
                    </div>
                </div>
                <div className='body-info'>
                    {/* <TableTest /><div> */}
                    {selectedButton === 'compare' &&
                        <CompareComponent />
                    }
                    {selectedButton === 'data' && <DataComponent />}
                    {selectedButton === 'describe' && <DescribeComponent />}
                </div>
            </div>
        </ReportProvider>
    )
}

export default ReportInfoPage
