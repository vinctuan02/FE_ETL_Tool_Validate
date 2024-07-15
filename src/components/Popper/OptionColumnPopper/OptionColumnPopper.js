import React, { useState } from 'react';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';

const OptionColumnPopper = ({ cellName }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        // setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
            <Button variant="contained" onClick={handleClick}>
                {cellName}
            </Button>
            <ClickAwayListener onClickAway={handleClose}>
                <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom">
                    <Paper elevation={3} style={{ padding: '10px', maxWidth: '60%' }}>
                        <Typography variant="body2">This is a simple Popper example.</Typography>
                    </Paper>
                </Popper>
            </ClickAwayListener>
        </div>
    );
};

export default OptionColumnPopper;
