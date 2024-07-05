import React, { useEffect, useState } from 'react'
import './InputPage.scss'
import '@fortawesome/fontawesome-free/css/all.min.css';
import TableComponent from '../../components/TableComponent/TableComponent';
import { toast } from 'react-toastify';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import ModalPreviewInput from '../../components/ModalPreviewInput/ModalPreviewInput';
import { getReportsAxios } from '../../services/ReportService';
import ModalUpdate from '../../components/ModalUpdate/ModalUpdate';
import ModalDelete from '../../components/ModalDelete/ModalDelete';

const InputPage = () => {

    // danh sách reports
    const [listReports, setListReports] = useState([])

    // thông tin reports để lưu vào db
    const [dataReport, setDataReport] = useState({})
    const [nameFileReport, setNameFileReport] = useState('')

    const [isShowModalPreviewInput, setIsShowModalPreviewInput] = useState(false)
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)

    useEffect(() => {
        getReports()
    }, [])

    const getReports = async () => {
        console.log("fetch");
        let res = await getReportsAxios()
        if (res && res.data) {
            setListReports(res.data)
        }
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        // console.log(file.name);

        setNameFileReport(file.name)

        if (file.type !== "text/csv" && file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
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
                console.log(worksheet);
                setDataReport(worksheet)
                setIsShowModalPreviewInput(true)
                // toast.success("Excel file parsed successfully");
            };
            reader.readAsArrayBuffer(file);
        } else {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    console.log(result);
                    if (result.data.length <= 0) {
                        toast.error("No data input")
                        return
                    }
                    const cleanData =
                        (result.data).map((item) => {
                            const { id, ...rest } = item
                            return rest
                        })

                    // console.log(cleanData);
                    let keyObject = Object.keys(cleanData[0])
                    // if (keyObject[0] !== 'email' || keyObject[1] !== 'password') {
                    //     toast.error("Header input")
                    //     return
                    // } else {
                    // setDataInput(cleanData)
                    // setIsShowModalPreviewInput(true)
                    // }
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                }
            });
        }
    };

    const handleClose = () => {
        setIsShowModalPreviewInput(false)
        setIsShowModalUpdate(false)
        setIsShowModalDelete(false)
        setDataReport({})
    }

    const handleShowModalUpdate = (item) => {
        setDataReport(item)
        setIsShowModalUpdate(true)
    }

    const handleShowModalDelete = (item) => {
        setDataReport(item)
        setIsShowModalDelete(true)
    }


    return (
        <div className='container-input-page'>
            <div className='title'>
                List reports
            </div>
            <div className='container-search-import'>
                <div className='col-4 my-3'>
                    <input
                        className='search'
                        placeholder='Search report by name ...'
                    // value={keyEmail}
                    // onChange={(event) => handleOnChangeKeyEmail(event)}
                    />
                </div>
                <div className='import'>
                    <label
                        htmlFor='test' className='btn btn-success'
                    >
                        <i className="fa-solid fa-download"></i> Import
                    </label>
                    <input
                        id='test' type='file' hidden
                        onChange={handleFileUpload}
                    ></input>
                </div>
            </div>
            <div className='container-table-reports'>
                <TableComponent
                    data={listReports} hasAction={true}
                    handleShowModalUpdate={handleShowModalUpdate}
                    handleShowModalDelete={handleShowModalDelete}
                />
            </div>

            <ModalPreviewInput
                show={isShowModalPreviewInput}
                hasAction={false}
                handleClose={handleClose}
                data={dataReport}
                nameFileReport={nameFileReport}
                getReports={getReports}
            />

            <ModalUpdate
                show={isShowModalUpdate}
                handleClose={handleClose}
                data={dataReport}
                getReports={getReports}
            />

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                data={dataReport}
                getReports={getReports}
            />
        </div>
    )
}

export default InputPage
