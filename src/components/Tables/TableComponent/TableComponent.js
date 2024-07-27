import React, { useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import { AppContext } from '../../../context/AppContext';
import { Button } from '@mui/material';
import './TableComponent.scss';

const TableComponent = (props) => {

    const {
        data, hasAction = false,
        hiddenFields = [],
        hasBorder = false,
        hasSelectRow = false,
        hasShowRowInfo = false,
        hasDetail = false, actionDetail,
        hasIndex = false
    } = props;

    const {
        handleShowModalUpdate,
        handleShowModalDelete,
        handleShowReportDetails,
        setCurrentSelect
    } = useContext(AppContext);

    const [selectedRecord, setSelectedRecord] = useState(null);

    if (!data || !data.length) {
        return <div>Dữ liệu không hợp lệ</div>;
    }

    const keys = Object.keys(data[0]).filter(key => !hiddenFields.includes(key));

    const handleClickEdit = (item) => {
        handleShowModalUpdate(item);
    };

    const handleClickDelete = (item) => {
        handleShowModalDelete(item);
    };

    const handleCellClick = (item) => {
        if (hasSelectRow) {
            if (hasShowRowInfo) {
                handleShowReportDetails(item);
            }
            if (setCurrentSelect) {
                setCurrentSelect(item);
            }
            setSelectedRecord(item);
        }
        // Thực hiện các hành động khác khi click vào từng trường của bản ghi
    };

    const renderIndexColumn = (rowIndex) => {
        if (hasIndex) {
            return (
                <td
                    style={{
                        cursor: 'pointer',
                        backgroundColor: selectedRecord === rowIndex ? '#f0f0f0' : 'inherit'
                    }}
                    key={`index-${rowIndex}`}
                    onClick={() => setSelectedRecord(rowIndex)} // Đặt selectedRecord khi click vào index
                >
                    {rowIndex + 1}
                </td>
            );
        }
        return null;
    };

    return (
        <div className='container-table-component'>
            <Table bordered={hasBorder} hover>
                <thead>
                    <tr>
                        {hasIndex && <th>Index</th>}
                        {keys.map((key, index) => (
                            <th key={index}>{key}</th>
                        ))}
                        {hasAction && <th></th>}
                        {hasDetail && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((rowData, index) => (
                        <tr
                            key={index}
                            style={{
                                backgroundColor: selectedRecord === rowData ? '#f0f0f0' : 'inherit'
                            }}
                            onClick={() => handleCellClick(rowData)}
                        >
                            {renderIndexColumn(index)}
                            {keys.map((key, index) => (
                                <td
                                    key={index}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: selectedRecord === rowData ? '#f0f0f0' : 'inherit'
                                    }}
                                >
                                    {rowData[key]}
                                </td>
                            ))}
                            {
                                hasAction && (
                                <td style={{ width: '250px' }}>
                                    <button
                                        className='btn btn-warning mx-3'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClickEdit(rowData);
                                        }}
                                    >
                                        <i className="far fa-edit"></i>
                                    </button>
                                    <button
                                        className='btn btn-danger mx-3'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClickDelete(rowData);
                                        }}
                                    >
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                </td>
                            )}
                            {hasDetail && (
                                <td style={{ width: '250px' }}>
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            actionDetail(rowData);
                                        }}
                                    >
                                        Detail
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TableComponent;


// import React, { useContext, useState } from 'react';
// import { Table } from 'react-bootstrap';
// import { AppContext } from '../../../context/AppContext';
// import { Button } from '@mui/material';
// import './TableComponent.scss'

// const TableComponent = (props) => {

//     const {
//         data, hasAction = false,
//         hiddenFields = [],
//         hasBorder = false,
//         hasSelectRow = false,
//         hasShowRowInfo = false,
//         hasDetail = false, actionDetail,
//         hasIndex = false
//     } = props

//     const {
//         handleShowModalUpdate,
//         handleShowModalDelete,
//         handleShowReportDetails,
//         setCurrentSelect
//     } = useContext(AppContext)

//     const [selectedRecord, setSelectedRecord] = useState(null);

//     if (!data || !data.length) {
//         return <div>Dữ liệu không hợp lệ</div>;
//     }

//     const keys = Object.keys(data[0]).filter(key => !hiddenFields.includes(key));

//     const handleClickEdit = (item) => {
//         handleShowModalUpdate(item)
//     }

//     const handleClickDelete = (item) => {
//         handleShowModalDelete(item)
//     }

//     const handleCellClick = (item, key) => {
//         // console.log(`Clicked on ${key} of record:`, item);

//         if (hasSelectRow) {
//             if (hasShowRowInfo) {
//                 handleShowReportDetails(item)
//             }
//             if (setCurrentSelect) {
//                 setCurrentSelect(item)
//             }
//             setSelectedRecord(item);
//         }
//         // Thực hiện các hành động khác khi click vào từng trường của bản ghi
//     };

//     const renderIndexColumn = (rowIndex) => {
//         if (hasIndex) {
//             return <td
//                 style={{
//                     cursor: 'pointer',
//                     backgroundColor: selectedRecord === rowIndex ? '#f0f0f0' : 'inherit'
//                 }}
//                 key={`index-${rowIndex}`}
//             >{rowIndex + 1}</td>;
//         }
//         return null;
//     };

//     return (
//         <div className='container-table-component'>
//             <Table bordered={hasBorder} hover>
//                 <thead>
//                     <tr>
//                         {hasIndex && <th>Index</th>}
//                         {keys.map((key, index) => (
//                             <th key={index}>{key}</th>
//                         ))}
//                         {
//                             hasAction &&
//                             <th></th>
//                         }
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((rowData, index) => (
//                         <tr key={index}>
//                             {renderIndexColumn(index)}
//                             {keys.map((key, index) => (
//                                 <td
//                                     onClick={() => handleCellClick(rowData, key)}
//                                     style={{
//                                         cursor: 'pointer',
//                                         backgroundColor: selectedRecord === rowData ? '#f0f0f0' : 'inherit'
//                                     }}
//                                     key={index}
//                                 // onClick={() => handleRowClick(rowData)}
//                                 >{rowData[key]}</td>
//                             ))}
//                             {
//                                 hasAction &&
//                                 <td style={{
//                                     width: '250px',
//                                     backgroundColor: selectedRecord === rowData ? '#f0f0f0' : 'inherit'
//                                 }}>
//                                     <button
//                                         className='btn btn-warning mx-3'
//                                         onClick={() => handleClickEdit(rowData)}
//                                     ><i className="far fa-edit"></i></button>
//                                     <button
//                                         className='btn btn-danger mx-3'
//                                         onClick={() => handleClickDelete(rowData)}
//                                     ><i className="fa-regular fa-trash-can"></i></button>
//                                 </td>
//                             }
//                             {
//                                 hasDetail &&
//                                 <td style={{
//                                     width: '250px',
//                                     backgroundColor: selectedRecord === rowData ? '#f0f0f0' : 'inherit'
//                                 }}>
//                                     <Button
//                                         onClick={() => actionDetail(rowData)}
//                                     >
//                                         Detail
//                                     </Button>
//                                 </td>
//                             }
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// };

// export default TableComponent;
