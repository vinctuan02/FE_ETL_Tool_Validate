import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import './FilterPopper.scss';
import { AppContext } from '../../../context/AppContext';
import SelectComponent from '../../Components/SelectComponent/SelectComponent';
import FindRangeComponent from './FindRangeComponent/FindRangeComponent';

const FilterPopper = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [pinned, setPinned] = useState(false); // State for pinning the Popper

    const {
        isASC, setIsASC,
        limit, setLimit,
        toggleASCDESC,
        arrDataSelectInput, setCurrentSelectTB,
        fieldName, setFieldName, fieldValue, setFieldValue,
        getTB
    } = useContext(AppContext);

    // useEffect(() => {
    //     // setCurrentSelectTB(JSON.parse());
    //     getTB()
    // }, [])

    const handleOnChangeLimit = (event) => {
        let value = event.target.value;
        if (value > 0) {
            setLimit(value);
        } else {
            setLimit(0);
        }
    };

    const handleChangeSelect = (event) => {
        setCurrentSelectTB(JSON.parse(event.target.value));
    };

    const handleOnChangeFiledName = (event) => {
        setFieldName(event.target.value);
    };

    const handleOnChangeFieldValue = (event) => {
        setFieldValue(event.target.value);
    };

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle Popper
    };

    const handleFind = () => {
        getTB();
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
        <div className='popper' style={{ position: 'relative' }}>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Filter
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
                    zIndex: 1 // Directly setting z-index in Popper's style
                }}
            >
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Box sx={{
                        p: 2, bgcolor: 'background.paper',
                        border: 1, borderColor: 'grey.300',
                        borderRadius: 2,
                        position: 'relative', // Ensure relative positioning for children
                    }}>
                        {/* Pin button */}
                        <Button
                            // variant="contained"
                            onClick={handlePin}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '5px',
                                zIndex: 2, // Ensure the pin button is above other content
                            }}
                        >
                            {pinned ? <i className="fas fa-thumbtack" style={{ fontSize: '16px' }}></i> : <i className="fas fa-thumbtack" style={{ color: "#ccc", fontSize: '16px' }}></i>}
                        </Button>

                        <div className='container-filter-popper'>
                            <h5>
                                Filter
                            </h5>

                            <div className='r' style={{}}>
                                <SelectComponent
                                    data={arrDataSelectInput}
                                    handleChangeSelect={handleChangeSelect}
                                />
                            </div>
                            <div className='r'>
                                <div className='button'>
                                    <Button
                                        className={isASC ? 'active' : ''}
                                        // color="success"
                                        onClick={toggleASCDESC}
                                    >ASC</Button>
                                    <Button
                                        className={!isASC ? 'active' : ''}
                                        onClick={toggleASCDESC}
                                    >DESC</Button>
                                </div>
                                <div className='limit'>
                                    <label>{`Limit: `}</label>
                                    <input type="number"
                                        onChange={handleOnChangeLimit} value={limit}
                                    />
                                </div>
                            </div>
                            <div className='r'>
                                {/* 
                                <div className='field-name'>
                                    <label>{`Field: `}</label>
                                    <input type="text"
                                        onChange={handleOnChangeFiledName}
                                        value={fieldName}
                                    />
                                </div>
                                */}
                            </div>
                            <div className='r'>
                                {/* 
                                <div className='field-value'>
                                    <label>{`Value: `}</label>
                                    <input type="text"
                                        onChange={handleOnChangeFieldValue}
                                        value={fieldValue}
                                    />
                                </div>
                                */}
                            </div>
                            <div className='r'>
                                <FindRangeComponent />
                            </div>
                            <div className='r'>
                                <Button
                                    // color="success"
                                    // variant="contained"
                                    onClick={handleFind}
                                >
                                    All Reports
                                </Button>
                                <Button
                                    // color="success"
                                    // variant="contained"
                                    onClick={handleFind}
                                >
                                    Error Report
                                </Button>
                            </div>
                        </div>
                    </Box>
                </ClickAwayListener>
            </Popper>
        </div>
    );
};

export default FilterPopper;
