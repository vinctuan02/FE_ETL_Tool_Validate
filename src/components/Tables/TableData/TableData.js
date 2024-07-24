import React from 'react';
import './TableData.scss';
import PopperTHead from '../../Popper/PopperTHead/PopperTHead';

const TableData = ({ data, dataCompare }) => {
    if (!data || !dataCompare || !data.length || !dataCompare.length) {
        return <div>Dữ liệu không hợp lệ</div>;
    }

    const keys1 = Object.keys(data[0]);
    const keys2 = Object.keys(dataCompare[0]);
    const keys = keys1.length >= keys2.length ? keys1 : keys2;

    const renderTableCell = (cellData1, cellData2) => {
        // So sánh dữ liệu của hai ô
        const isDifferent = cellData1 !== cellData2;

        // Chuẩn bị style và sự kiện click dựa trên tính khác nhau của dữ liệu
        const cellStyle = {
            cursor: 'pointer',
            color: isDifferent ? 'red' : 'green',
        };

        const handleClick = () => {
            console.log(`Cell 1: ${cellData1}, Cell 2: ${cellData2}`);
            // Thực hiện các hành động khi click vào ô
        };

        return (
            <td
                style={cellStyle}
                onClick={handleClick}
            >
                {cellData1}
            </td>
        );
    };

    return (
        <div className='table-data'>
            <table className=''>
                <thead>
                    <tr>
                        {keys.map((key, index) => (
                            <th key={key + index}>
                                <PopperTHead name={key} />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {keys.map((key, colIndex) => (
                                <React.Fragment key={key + colIndex}>
                                    {renderTableCell(row[key], dataCompare[index] && dataCompare[index][key])}
                                </React.Fragment>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableData;
