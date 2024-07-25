import React, { useState, useEffect } from 'react';
import './TableSelect.scss'; // Import SCSS file for styling

const TableSelect = (props) => {
    const { data, handleSelect, hasIndex, hiddenFields = [] } = props;

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // State to manage select all checkbox
    const [lastSelectedIndex, setLastSelectedIndex] = useState(null); // State to store last selected index for shift-click

    useEffect(() => {
        const selectedRecords = selectedRows.map(index => data[index]);
        handleSelect(selectedRecords);
    }, [selectedRows]);

    if (!data || !data.length) {
        return (<div>Dữ liệu không hợp lệ</div>);
    }

    const keys = Object.keys(data[0]).filter(key => !hiddenFields.includes(key));

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

        if (!event.shiftKey || lastSelectedIndex === null) {
            // Clear selection if Shift key is not pressed or lastSelectedIndex is null
            if (selectedIndex === -1) {
                newSelectedRows.push(index);
            } else {
                newSelectedRows.splice(selectedIndex, 1);
            }
        } else {
            // Select range if Shift key is pressed
            let start = Math.min(lastSelectedIndex, index);
            let end = Math.max(lastSelectedIndex, index);
            newSelectedRows = [];
            for (let i = start; i <= end; i++) {
                newSelectedRows.push(i);
            }
        }

        setSelectedRows(newSelectedRows);
        setLastSelectedIndex(index);
        setSelectAll(newSelectedRows.length === data.length);
    };

    // Function to handle index display in table
    const renderIndexColumn = (rowIndex) => {
        if (hasIndex) {
            return <td key={`index-${rowIndex}`}>{rowIndex + 1}</td>;
        }
        return null;
    };

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
                        {hasIndex && <th>Index</th>}
                        {keys && keys.map((key, index) => (
                            <th key={`th-${index}`}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => {
                        return (
                            <tr
                                key={`row-${rowIndex}`}
                                className={selectedRows.includes(rowIndex) ? 'selected' : ''}
                                onClick={(event) => handleRowClick(rowIndex, event)}
                            >
                                <td key={`checkbox-${rowIndex}`}>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(rowIndex)}
                                        onChange={(event) => handleRowClick(rowIndex, event)}
                                    />
                                </td>
                                {renderIndexColumn(rowIndex)}
                                {keys.map((key, cellIndex) => {
                                    return <td key={`td-${rowIndex}-${cellIndex}`}>{row[key]}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableSelect;
