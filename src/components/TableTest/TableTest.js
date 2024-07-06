import React from 'react';
import { Table } from 'react-bootstrap';

const TableTest = ({ data1 }) => {

    const data = [
        {
            id: 1,
            nameFile: 'file1.excel',
            nameReport: 'report1',
            result: 'true'
        },
        {
            id: 2,
            nameFile: 'file2.excel',
            nameReport: 'report2',
            result: 'true'
        },
        {
            id: 3,
            nameFile: 'file3.excel',
            nameReport: 'report3',
            result: 'true'
        },
        {
            id: 4,
            nameFile: 'file4.excel',
            nameReport: 'report4',
            result: 'true'
        },
        {
            id: 5,
            nameFile: 'file5.excel',
            nameReport: 'report5',
            result: 'false'
        },
        {
            id: 6,
            nameFile: 'file6.excel',
            nameReport: 'report6',
            result: 'false'
        },
        {
            id: 7,
            nameFile: 'file7.excel',
            nameReport: 'report7',
            result: 'true'
        },
        {
            id: 8,
            nameFile: 'file8.excel',
            nameReport: 'report8',
            result: 'true'
        },
        {
            id: 9,
            nameFile: 'file9.excel',
            nameReport: 'report9',
            result: 'true'
        },
        {
            id: 10,
            nameFile: 'file10.excel',
            nameReport: 'report10',
            result: 'false'
        }
    ];


    if (!data || !data.length) {
        return <div>Dữ liệu không hợp lệ</div>;
    }

    const keys = Object.keys(data[0]);

    return (
        <Table hover>
            {/* <table className="db-table"> */}
            <thead>
                <tr align="center">
                    {keys.map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                    {/* <th>Action</th> */}
                </tr>
            </thead>
            <tbody>
                {data.map((rowData, index) => (
                    <tr key={index} align="center">
                        {keys.map((key) => (
                            <td >{rowData[key]}</td>
                        ))}
                        {/* <td style={{ width: '250px' }}>
                            <button
                                className='btn btn-warning mx-3'
                            // onClick={() => handleClickEdit(item)}
                            >Edit</button>
                            <button
                                className='btn btn-danger mx-3'
                            // onClick={() => handleClickDelete(item)}
                            >Delete</button>
                        </td> */}
                    </tr>
                ))}
            </tbody>
            {/* </table> */}
        </Table>

    );
};

export default TableTest;