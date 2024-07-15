import React, { useState, useEffect, useContext } from 'react';
import './TableSelect.scss'; // Import SCSS file for styling

const TableSelect = (props) => {
    const { data, setDataSourceOrSink } = props

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // State to manage select all checkbo

    // Function to toggle select all data
    const handleSelectAll = (event) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        if (checked) {
            setSelectedRows(data.map((row, index) => index));
        } else {
            setSelectedRows([]);
        }
    };

    // Function to toggle select individual row
    const handleRowClick = (index, event) => {
        const selectedIndex = selectedRows.indexOf(index);
        let newSelectedRows = [...selectedRows];

        if (selectedIndex === -1) {
            newSelectedRows.push(index);
        } else {
            newSelectedRows.splice(selectedIndex, 1);
        }

        setSelectedRows(newSelectedRows);
        setSelectAll(newSelectedRows.length === data.length);
    };

    useEffect(() => {
        // Log selected data whenever selectedRows state changes
        const selectedRecords = selectedRows.map(index => data[index]);
        // console.log(selectedRecords);
        setDataSourceOrSink(selectedRecords)
    }, [selectedRows]);

    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th>Table Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={row.id}
                            className={selectedRows.includes(index) ? 'selected' : ''}
                            onClick={(event) => handleRowClick(index, event)}
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(index)}
                                    onChange={(event) => handleRowClick(index, event)}
                                />
                            </td>
                            <td>{row.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSelect;
