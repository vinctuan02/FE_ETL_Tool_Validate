import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import ContentProgressColumn from '../ContentProgressColumn/ContentProgressColumn';
import './ProgressBarColumn.scss';
import { toast } from 'react-toastify';

const ProgressBarColumn = (props) => {
    const { arrNameTables, arrInfoSourceSink } = props;
    const steps = arrNameTables;

    const [activeStep, setActiveStep] = useState(0);
    const [currentTable, setCurrentTable] = useState(null);
    const [processingDone, setProcessingDone] = useState(false);

    useEffect(() => {
        if (arrInfoSourceSink.length > 0) {
            compareTables();
        }
    }, [arrInfoSourceSink]);

    useEffect(() => {
        if (processingDone && activeStep < steps.length - 1) {
            // Move to the next step
            setActiveStep(prevStep => prevStep + 1);
            setProcessingDone(false); // Reset processingDone for the next step
            toast.success(`Compare ${steps[activeStep]} success`);
        }
    }, [processingDone]);

    const compareTables = async () => {
        for (let i = 0; i < arrInfoSourceSink.length; i++) {
            setCurrentTable(arrInfoSourceSink[i]);
            setProcessingDone(false);

            // Wait for the table processing to complete
            await new Promise(resolve => {
                const checkProcessing = () => {
                    if (processingDone) {
                        resolve();
                    } else {
                        setTimeout(checkProcessing, 100); // check every 100ms
                    }
                };
                checkProcessing();
            });
        }
    };

    return (
        <div className='container-progress-bar-column'>
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
    );
};

export default ProgressBarColumn;
