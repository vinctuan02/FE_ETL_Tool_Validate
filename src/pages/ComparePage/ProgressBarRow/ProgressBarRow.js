import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import './ProgressBarRow.scss';
import ContentProgressRow from '../ContentProgressRow/ContentProgressRow';
import { compareDescribe, compareCountRecords, compareGroupRecords } from '../../../services/ReportService';

const ProgressBarRow = (props) => {
  const { currentTable, setProcessingDone } = props;

  const steps = ['Describe', 'Count Records', 'Group Records'];
  const [activeStep, setActiveStep] = useState(0);
  const [dataSource, setDataSource] = useState();
  const [dataSink, setDataSink] = useState();

  useEffect(() => {
    if (currentTable) {
      compareTable();
    }
  }, [currentTable]);

  const compareTable = async () => {
    for (let i = 0; i <= steps.length; i++) {
      setActiveStep(i);
      setProcessingDone(false); // Đặt lại trạng thái trước khi xử lý từng bước

      if (steps[i] === 'Describe') {
        console.log('Describe');
        await handleDescribe();
      } else if (steps[i] === 'Count Records') {
        console.log('Count Records');
        await handleCountRecords();
      } else if (steps[i] === 'Group Records') {
        console.log('Group Records');
        await handleGroupRecords();
      }

      // Đặt trạng thái hoàn tất sau khi xử lý từng bước
      setProcessingDone(true);
      console.log('setProcessingDone(true);', currentTable.tableSource);
    }
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

  return (
    <div className='container-progress-bar-row'>
      <div className='progress-bar-row'>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className='content-progress-bar-row'>
        <ContentProgressRow dataSource={dataSource} dataSink={dataSink} />
      </div>
    </div>
  );
};

export default ProgressBarRow;
