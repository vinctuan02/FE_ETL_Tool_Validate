import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Button, CircularProgress } from '@mui/material';
import './ProgressBarRow.scss';
import ContentProgressRow from '../ContentProgressRow/ContentProgressRow';
import { compareDescribe, compareCountRecords, compareGroupRecords } from '../../../services/ReportService';

const ProgressBarRow = (props) => {
  const { currentTable, setProcessingDone } = props;

  const steps = ['Describe', 'Count Records', 'Group Records'];
  const [activeStep, setActiveStep] = useState(0);
  const [dataSource, setDataSource] = useState();
  const [dataSink, setDataSink] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentTable) {
      handleStep();
    }
  }, [currentTable]);

  const handleStep = async () => {
    setLoading(true);
    if (steps[activeStep] === 'Describe') {
      await handleDescribe();
    } else if (steps[activeStep] === 'Count Records') {
      await handleCountRecords();
    } else if (steps[activeStep] === 'Group Records') {
      await handleGroupRecords();
    }
    setProcessingDone(true);
    setLoading(false);
  };

  const handleDescribe = async () => {
    const res = await compareDescribe(currentTable);
    setDataSource(res.describe.describeTableSource);
    setDataSink(res.describe.describeTableSink);
  };

  const handleCountRecords = async () => {
    const res = await compareCountRecords(currentTable);
    setDataSource(res.countRecords.countRecordsTableSource);
    setDataSink(res.countRecords.countRecordsTableSink);
  };

  const handleGroupRecords = async () => {
    const res = await compareGroupRecords(currentTable);
    setDataSource(res.arrGroupRecordsSourceSink[0].groupRecordsSinkByColumn);
    setDataSink(res.arrGroupRecordsSourceSink[0].groupRecordsSourceByColumn);
  };

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

  useEffect(() => {
    if (currentTable) {
      handleStep();
    }
  }, [activeStep]);

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <div className='container-progress-bar-row'>
      <div className='progress-bar-row'>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index} onClick={() => handleStepClick(index)}>
              <StepLabel>
                {label}
                {loading && activeStep === index && (
                  <CircularProgress size={15} className="step-loading-spinner" />
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className='content-progress-bar-row'>
        <ContentProgressRow dataSource={dataSource} dataSink={dataSink} />
      </div>
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
  );
};

export default ProgressBarRow;
