import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import ContentProgressColumn from '../ContentProgressColumn/ContentProgressColumn';
import './ProgressBarColumn.scss';

const ProgressBarColumn = (props) => {
    const { arrNameTables, arrInfoSourceSink } = props;
    const steps = arrNameTables;

    const [activeStep, setActiveStep] = useState(0);
    const [currentTable, setCurrentTable] = useState(null);
    const [processingDone, setProcessingDone] = useState(false);

    useEffect(() => {
        if (arrInfoSourceSink.length > 0) {
            setCurrentTable(arrInfoSourceSink[activeStep]);
        }
    }, [arrInfoSourceSink, activeStep]);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(prevStep => prevStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(prevStep => prevStep - 1);
        }
    };

    return (
        <div className='container-progress-bar-column'>
            <div className='row1-progress-bar-column'>
                <div className='progress-bar-column'>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
                <div className='content-progress-bar-column'>
                    <ContentProgressColumn
                        currentTable={currentTable}
                        setProcessingDone={setProcessingDone}
                    />
                </div>
            </div>
            <div className='row2-progress-bar-column'>
                <div className='button-group'>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Button
                        disabled={activeStep === steps.length - 1}
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProgressBarColumn;
