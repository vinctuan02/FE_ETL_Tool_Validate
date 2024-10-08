import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { AppContext } from '../../../context/AppContext';
import './SelectReportPopper.scss';
import ReportComponent from '../../Components/ReportComponent/ReportComponent';

const SelectReportPopper = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [pinned, setPinned] = useState(false); // State for pinning the Popper

    const { currentSelect } = useContext(AppContext);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle Popper
    };

    const handlePin = () => {
        setPinned((prev) => !prev); // Toggle pinned state
    };

    const handleClickAway = () => {
        if (!pinned) {
            setAnchorEl(null); // Close Popper only if not pinned
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popper' : undefined;

    return (
        <div className="popper" style={{ position: 'relative' }}>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                {currentSelect && currentSelect.reportName ? (
                    <span>Report: {currentSelect.reportName} <i className='bx bxs-chevron-down'></i></span>
                ) : (
                    <span>List Reports <i className='bx bxs-chevron-down'></i></span>
                )}
            </Button>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="bottom-end"
                disablePortal={true}
                modifiers={[
                    {
                        name: 'flip',
                        enabled: false,
                    },
                    {
                        name: 'preventOverflow',
                        options: {
                            mainAxis: false,
                        },
                    },
                ]}
                style={{
                    zIndex: 1000, // Directly setting z-index in Popper's style
                }}
            >
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            position: 'relative', // Ensure relative positioning for children
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Custom box shadow
                        }}
                    >
                        {/* Pin button */}
                        <Button
                            onClick={handlePin}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '5px',
                                zIndex: 2, // Ensure the pin button is above other content
                            }}
                        >
                            {pinned ? (
                                <i className="fas fa-thumbtack" style={{ fontSize: '16px' }}></i>
                            ) : (
                                <i className="fas fa-thumbtack" style={{ color: '#ccc', fontSize: '16px' }}></i>
                            )}
                        </Button>

                        <div className="r1">
                            <ReportComponent hasShowRowInfo={false} />
                        </div>

                        <div className="r2">
                            <Button variant="contained" onClick={handleClick}>
                                Choose
                            </Button>
                        </div>
                    </Box>
                </ClickAwayListener>
            </Popper>
        </div>
    );
};

export default SelectReportPopper;
