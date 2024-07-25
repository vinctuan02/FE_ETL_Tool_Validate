import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import './CreateReportPopper.scss';
import CreateInput from '../../../pages/CreateInputPage/CreateInput';

const CreateReportPopper = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [pinned, setPinned] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handlePin = () => {
        setPinned((prev) => !prev);
    };

    const handleClickAway = () => {
        if (!pinned) {
            setAnchorEl(null);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popper' : undefined;

    return (
        <div className='popper' style={{ position: 'relative' }}>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Create
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
                    zIndex: 1
                }}
            >
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Box className="container-create-report-popper">
                        <Button
                            onClick={handlePin}
                            className="pinned-button"
                        >
                            {pinned ? <i className="fas fa-thumbtack" style={{ fontSize: '16px' }}></i> : <i className="fas fa-thumbtack" style={{ color: "#ccc", fontSize: '16px' }}></i>}
                        </Button>

                        <div className='r'>
                            <CreateInput />
                        </div>
                    </Box>
                </ClickAwayListener>
            </Popper>
        </div>
    );
};

export default CreateReportPopper;
