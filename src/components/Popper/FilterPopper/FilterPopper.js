import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import './FilterPopper.scss';
import { AppContext } from '../../../context/AppContext';
import SelectComponent from '../../SelectComponent/SelectComponent';
import FindRangeComponent from './FindRangeComponent/FindRangeComponent';

const FilterPopper = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {
        isASC, setIsASC,
        limit, setLimit,
        toggleASCDESC,

        arrDataSelectInput, setCurrentSelectTB,

        fieldName, setFieldName, fieldValue, setFieldValue,
        getTB
    } = useContext(AppContext)

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
    }

    const handleOnChangeFiledName = (event) => {
        setFieldName(event.target.value)
    }

    const handleOnChangeFieldValue = (event) => {
        setFieldValue(event.target.value)
    }

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle Popper
    };

    const handleFind = () => {
        getTB()
    }

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
                    // zIndex: 1
                }} // Đặt z-index trực tiếp trong style của Popper
            >
                <Box sx={{
                    p: 2, bgcolor: 'background.paper',
                    border: 1, borderColor: 'grey.300',
                    borderRadius: 2,
                }}>
                    <div className='container-filter-popper'>
                        <div className='r'>
                            {
                                < SelectComponent
                                    data={arrDataSelectInput}
                                    handleChangeSelect={handleChangeSelect}
                                />
                            }
                        </div>
                        <div className='r'>
                            <div className='button'>
                                <button
                                    className={isASC ? 'active' : ''}
                                    onClick={toggleASCDESC}
                                >ASC</button>
                                <button
                                    className={!isASC ? 'active' : ''}
                                    onClick={toggleASCDESC}
                                >DESC</button>
                            </div>
                            <div className='limit'>
                                <label>{`Limit: `}</label>
                                <input type="number"
                                    onChange={handleOnChangeLimit} value={limit}
                                />
                            </div>
                        </div>
                        {/* <div className='r'>
                            <div className='field-name'>
                                <label>{`Field: `}</label>
                                <input type="text"
                                    onChange={handleOnChangeFiledName}
                                    value={fieldName}
                                />
                            </div>
                        </div>
                        <div className='r'>
                            <div className='field-value'>
                                <label>{`Value: `}</label>
                                <input type="text"
                                    onChange={handleOnChangeFieldValue}
                                    value={fieldValue}
                                />
                            </div>
                        </div> */}

                        <div className='r'>
                            <FindRangeComponent />
                        </div>
                        <div className='r' style={{ display: 'flex', alignSelf: 'flex-end' }}>
                            <Button
                                color="success"
                                variant="contained"
                                onClick={handleFind}
                            >
                                Find
                            </Button>
                        </div>
                    </div>
                </Box>
            </Popper>
        </div>
    );
};

export default FilterPopper;
