import React, { useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';
import { ReportInfoContext } from '../../context/ReportInfoContext';

const TableComponent = (props) => {

    const { data, hasAction = false,
        hasBorder = false,
        hasSelectRow = false,
        hasShowRowInfo = false
    } = props

    const {
        handleShowModalUpdate,
        handleShowModalDelete,
        handleShowReportDetails,
        setCurrentSelect
    } = useContext(AppContext)

    const {

    } = useContext(ReportInfoContext)

    const [selectedRecord, setSelectedRecord] = useState(null);

    if (!data || !data.length) {
        return <div>Dữ liệu không hợp lệ</div>;
    }

    const keys = Object.keys(data[0]);

    const handleClickEdit = (item) => {
        handleShowModalUpdate(item)
    }

    const handleClickDelete = (item) => {
        handleShowModalDelete(item)
    }

    const handleCellClick = (item, key) => {
        // console.log(`Clicked on ${key} of record:`, item);

        if (hasSelectRow) {
            if (hasShowRowInfo) {
                handleShowReportDetails(item)
            }
            if (setCurrentSelect) {
                // console.log('set current select', item);
                setCurrentSelect(item)
            }
            setSelectedRecord(item);
        }
        // Thực hiện các hành động khác khi click vào từng trường của bản ghi
    };

    return (
        <Table bordered={hasBorder} hover>
            <thead>
                <tr>
                    {keys.map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                    {
                        hasAction &&
                        <th></th>
                    }
                </tr>
            </thead>
            <tbody>
                {data.map((rowData, index) => (
                    <tr key={index}>
                        {keys.map((key, index) => (
                            <td
                                onClick={() => handleCellClick(rowData, key)}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: selectedRecord === rowData ? '#f0f0f0' : 'inherit'
                                }}
                                key={index}
                            // onClick={() => handleRowClick(rowData)}
                            >{rowData[key]}</td>
                        ))}
                        {
                            hasAction &&
                            <td style={{
                                width: '250px',
                                backgroundColor: selectedRecord === rowData ? '#f0f0f0' : 'inherit'
                            }}>
                                <button
                                    className='btn btn-warning mx-3'
                                    onClick={() => handleClickEdit(rowData)}
                                ><i className='bx bx-edit'></i></button>
                                <button
                                    className='btn btn-danger mx-3'
                                    onClick={() => handleClickDelete(rowData)}
                                ><i className='bx bx-trash'></i></button>
                            </td>
                        }

                        {
                            false &&
                            <td style={{ width: '250px' }}>
                                <button
                                    className='btn btn-warning mx-3'
                                    onClick={() => handleClickEdit(rowData)}
                                ><i className='bx bx-code-alt'></i>
                                </button>
                            </td>
                        }
                    </tr>
                ))}
            </tbody>
        </Table>

    );
};

export default TableComponent;
