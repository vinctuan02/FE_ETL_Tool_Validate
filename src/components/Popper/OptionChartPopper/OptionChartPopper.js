import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import './OptionChartPopper.scss';
import { Tabs } from 'antd';
import Table from './Table/Table';
import Range from './Range/Range';

const OptionChartPopper = (props) => {
    const {isDisabled} = props

    const items = [
        {
            key: 'table',
            label: 'Table',
            children: <Table />
        },
        {
            key: 'range',
            label: 'Range',
            children: <Range />
        }
    ]


    const onChange = (key) => {
        console.log(key);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [pinned, setPinned] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle Popper
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
            <Button aria-describedby={id} variant="contained"
                onClick={handleClick}
                disabled={isDisabled}
            >
                More
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
                    <Box className="container-option-popper">
                        <Button
                            onClick={handlePin}
                            className="pinned-button"
                        >
                            {pinned ?
                                <i className="fas fa-thumbtack" style={{ fontSize: '16px' }}></i>
                                :
                                <i className="fas fa-thumbtack" style={{ color: "#ccc", fontSize: '16px' }}></i>
                            }
                        </Button>

                        <div className='r'>
                            <h5>
                                More
                            </h5>
                        </div>

                        <div className='r2'>
                            <div className='tabs'>
                                <Tabs defaultActiveKey="find"
                                    items={items}
                                    onChange={onChange} />
                            </div>
                        </div>
                    </Box>
                </ClickAwayListener>
            </Popper>
        </div>
    );
};

export default OptionChartPopper;
