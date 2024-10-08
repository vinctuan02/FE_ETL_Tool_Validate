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
        console.log(JSON.parse(event.target.value));
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
                Filter <i className='bx bxs-chevron-down'></i>
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

                            <div className='row1' style={{}}>
                                <SelectComponent
                                    data={arrDataSelectInput}
                                    handleChangeSelect={handleChangeSelect}
                                />
                            </div>
                            <div className='row2'>
                                <div className='asc-desc'>
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
                            <div className='row3'>
                                <FindRangeComponent />
                            </div>
                            <div className='row4'>
                                <Button
                                    // color="success"
                                    // variant="contained"
                                    onClick={handleFind}
                                >
                                    Find
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
