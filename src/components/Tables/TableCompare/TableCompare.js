import React, { useContext, useState } from 'react';
import './TableCompare.scss';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { AppContext } from '../../../context/AppContext';

const TableCompare = (props) => {

    const { data, dataCompare, showRowNumbers = true } = props

    const { handleOpenDraggableWindown } = useContext(AppContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCellData, setSelectedCellData] = useState(null);

    const handleCellClick = (event, cellData1) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setSelectedCellData(cellData1);
    };

    const handleClosePopper = () => {
        setAnchorEl(null);
        setSelectedCellData(null);
    };

    // Kiểm tra xem cả data và dataCompare có tồn tại và có ít nhất một phần tử không
    if (!data || !dataCompare || !data.length || !dataCompare.length) {
        return <div>Dữ liệu không hợp lệ</div>;
    }

    // Lấy các key từ object đầu tiên của mảng data hoặc dataCompare
    const keys1 = Object.keys(data[0]);
    const keys2 = Object.keys(dataCompare[0]);
    const keys = keys1.length >= keys2.length ? keys1 : keys2;

    const renderTableCell = (cellData1, cellData2) => {
        // So sánh dữ liệu của hai ô
        if (cellData1 !== cellData2) {
            // Trả về ô với màu đỏ nếu dữ liệu khác nhau
            return (
                <td
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={(event) => handleCellClick(event, cellData1)}
                >
                    {cellData1}
                </td>
            );
        } else {
            // Trả về ô bình thường nếu dữ liệu giống nhau
            return (
                <td
                    style={{ color: 'green', cursor: 'pointer' }}
                    onClick={(event) => handleCellClick(event, cellData1)}
                >
                    {cellData1}
                </td>
            );
        }
    };

    const handleClickBtn = (fieldName) => {
        handleOpenDraggableWindown(fieldName)
    }

    return (
        <div className="table-compare">
            <table>
                <thead>
                    <tr>
                        {showRowNumbers && <th>#</th>}
                        {keys.map((key, index) => (
                            <th key={index}
                            // onClick={(event) => handleClickCellThead(key, event)}
                            >
                                <Button
                                    onClick={() => handleClickBtn(key)}
                                >
                                    {key}
                                </Button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((rowData1, index) => (
                        <tr key={index}>
                            {showRowNumbers && <td>{index + 1}</td>}
                            {keys.map((key) => (
                                <React.Fragment key={key}>
                                    {renderTableCell(rowData1[key], dataCompare[index] && dataCompare[index][key])}
                                </React.Fragment>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Popper */}
            {/* <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                placement="bottom"
                onClose={handleClosePopper}
                modifiers={{
                    offset: {
                        enabled: true,
                        offset: '0, 10',
                    },
                    flip: {
                        enabled: true,
                    },
                    preventOverflow: {
                        enabled: true,
                        boundariesElement: 'scrollParent',
                    },
                }}
                style={{ maxWidth: '60%', zIndex: 9999 }}
            >
                <Paper elevation={3} style={{ padding: '10px' }}>
                    <Typography variant="body2">{selectedCellData}</Typography>
                </Paper>
            </Popper> */}
        </div>
    );
};

export default TableCompare;
