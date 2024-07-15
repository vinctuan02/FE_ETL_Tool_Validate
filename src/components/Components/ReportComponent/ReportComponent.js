import React, { useContext, useEffect, useState } from 'react'
import './ReportComponent.scss'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import TableComponent from '../../Tables/TableComponent/TableComponent';
import { AppContext } from '../../../context/AppContext';
import CreateReportPopper from '../../Popper/CreateReportPopper/CreateReportPopper';
import { Button } from '@mui/material';


const ReportComponent = (props) => {

    const {
        handleShowModalPreviewInput, setNameFileReport,
        getReports, listReports,
        keySearch,
        handleOnChangeKeySearch
    } = useContext(AppContext)

    const { hasAction, hasShowRowInfo } = props

    useEffect(() => {
        getReports()
    }, [])

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            toast.error("Please select a file in CSV or XLSX format");
            return;
        }

        if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

                // let keys = Object.keys(worksheet[0])

                // if (keys[0] !== 'schemaName' || keys[1] !== 'dataSourceName' || keys[2] !== 'dataSinkName') {
                //     console.log(worksheet);
                //     worksheet.map((item) => {
                //         console.log(item);
                //     })
                // }
                setNameFileReport(file.name)
                handleShowModalPreviewInput(worksheet)
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className='container-input-page'>
            <div className='title'>
                List reports
            </div>
            <div className='container-search-import'>
                <div className='left col-4 my-3'>
                    <input
                        className='search'
                        placeholder='Search report by name ...'
                        value={keySearch}
                        onChange={(event) => handleOnChangeKeySearch(event)}
                    />
                </div>

                <div className='right'>
                    <div>
                        <CreateReportPopper />
                    </div>
                    <div className='import'>
                        <input
                            id='test'
                            type='file'
                            hidden
                            onChange={handleFileUpload}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            color="success"
                            htmlFor='test'
                        >
                            Import
                            <input
                                id='test'
                                type='file'
                                hidden
                                onChange={handleFileUpload}
                            />
                        </Button>
                    </div>
                </div>
            </div>
            <div className='container-table-reports'>
                <TableComponent
                    data={listReports} hasAction={hasAction}
                    hasSelectRow={true}
                    hasShowRowInfo={hasShowRowInfo}
                />
            </div>
        </div>
    )
}

export default ReportComponent