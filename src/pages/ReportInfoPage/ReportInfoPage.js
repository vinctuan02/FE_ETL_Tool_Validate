import React, { useContext, useState } from 'react';
import './ReportInfoPage.scss';
import { AppContext } from '../../context/AppContext';
import { ReportProvider } from '../../context/ReportInfoContext';
import FilterPopper from '../../components/Popper/FilterPopper/FilterPopper';
import SelectReportPopper from '../../components/Popper/SelectReportPopper/SelectReportPopper';
import DetailComponent from '../../components/Components/DetailComponent/DetailComponent';
import OverviewComponent from '../../components/Components/OverviewComponent/OverviewComponent';
import { Button } from '@mui/material';


const ReportInfoPage = () => {
    const { currentSelect, arrDataSelectInput } = useContext(AppContext);
    const [selectedButton, setSelectedButton] = useState('compare');

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    return (
        <ReportProvider>
            <div className='container-report-info'>
                <div className='header-report-info'>
                    <div className='nav-info'>
                        <Button
                            variant={selectedButton === 'compare' ? 'contained' : 'text'}
                            // color={selectedButton === 'compare' ? 'outlined' : 'outlined'}
                            // variant={'default'}
                            onClick={() => handleButtonClick('compare')}
                            className='btn-info1'
                        >
                            Overview
                        </Button>
                        <Button
                            variant={selectedButton === 'data' ? 'contained' : 'text'}
                            // color={selectedButton === 'data' ? 'outlined' : 'outlined'}
                            onClick={() => handleButtonClick('data')}
                            className='btn-info1'
                        >
                            Detail
                        </Button>
                    </div>
                    <div className='select-report'>
                        <div>
                            {arrDataSelectInput && <FilterPopper />}
                        </div>
                        <div>
                            <SelectReportPopper />
                        </div>
                    </div>
                </div>
                <div className='body-info'>
                    {selectedButton === 'compare' && <OverviewComponent />}
                    {selectedButton === 'data' && <DetailComponent />}
                </div>
            </div>
        </ReportProvider>
    );
};

export default ReportInfoPage;
