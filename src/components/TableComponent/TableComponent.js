import React from 'react';
import { Table } from 'react-bootstrap';

const TableComponent = (props) => {

    const { handleShowModalUpdate, handleShowModalDelete, data, hasAction = false } = props

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

    return (
        <Table hover>
            {/* <table className="db-table"> */}
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
                            <td key={index} >{rowData[key]}</td>
                        ))}
                        {
                            hasAction &&
                            <td style={{ width: '250px' }}>
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
                    </tr>
                ))}
            </tbody>
            {/* </table> */}
        </Table>

    );
};

export default TableComponent;
