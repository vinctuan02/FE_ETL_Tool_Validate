import React, { useContext, useEffect, useState } from 'react'
import './ReportInfoPage.scss'
import CompareComponent from '../../components/CompareComponent/CompareComponent'
import { Button } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';
import { ReportProvider } from '../../context/ReportInfoContext';
import SelectComponent from '../../components/SelectComponent/SelectComponent';
import DataComponent from '../../components/DataComponent/DataComponent';
import ModalComponent from '../../components/Popover/FilterPopover/FilterPopover';
import FilterPopover from '../../components/Popover/FilterPopover/FilterPopover';

const ReportInfoPage = () => {

    const { handleOpenModalReport, currentSelect, arrDataSelectInput, setCurrentSelectTB } = useContext(AppContext)

    const [selectedButton, setSelectedButton] = useState('compare')
    // const [isShowModalReport, setIsShowModalReport] = useState(false)

    // const [reportDetailsCurrent, setReportDetailsCurrent] = useState('')


    // useEffect(() => {
    //     if (reportDetailsCurrent) {
    //         console.log(reportDetailsCurrent);
    //     }
    // }, [reportDetailsCurrent])

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
                            {
                                arrDataSelectInput &&
                                <FilterPopover />
                            }

                        </div>
                        <Button
                            variant="success"
                            onClick={(handleOpenModalReport)}
                        >
                            {currentSelect && currentSelect.reportName ? (
                                <span>Report: {currentSelect.reportName} </span>
                            ) : (
                                <span>List Reports</span>
                            )}
                            <i className="fa-solid fa-angle-down"></i>
                        </Button>
                    </div>
                </div>
                <div className='body-info'>
                    {/* <TableTest /><div> */}
                    {selectedButton === 'compare' &&
                        <CompareComponent />
                    }
                    {selectedButton === 'data' &&
                        <DataComponent />
                    }
                    {selectedButton === 'describe' && <DescribeComponent />}
                </div>
            </div>
        </ReportProvider>
    )
}

export default ReportInfoPage
