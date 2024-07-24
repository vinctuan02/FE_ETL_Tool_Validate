import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import './PopperTHead.scss';
import CreateInput from '../../../pages/CreateInputPage/CreateInput';
import MenuComponent from '../../MenuComponent/MenuComponent';

const PopperTHead = (props) => {

    const { name } = props

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popper' : undefined;

    return (
        <div className='popper' style={{ position: 'relative' }}>
            <Button aria-describedby={id} onClick={handleClick}>
                {name}
            </Button>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="top"
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
                    zIndex: 9999
                }}
            >
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Box className="container-create-report-popper">
                        <div className='r'>
                            <MenuComponent />
                        </div>
                    </Box>
                </ClickAwayListener>
            </Popper>
        </div>
    );
};

export default PopperTHead;


