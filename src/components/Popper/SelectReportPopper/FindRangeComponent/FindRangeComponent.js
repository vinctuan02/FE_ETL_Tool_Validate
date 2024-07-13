import React, { useContext, useEffect, useState } from 'react'
import './FindRangeComponent.scss'

import { AppContext } from '../../../../context/AppContext';
import Find from '../Find/Find';
import Range from '../Range/Range';

const FindRangeComponent = () => {

    // const { handleOpenModalReport, currentSelect, arrDataSelectInput, setCurrentSelectTB } = useContext(AppContext)

    const [selectedButton, setSelectedButton] = useState('find')


    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };


    return (
        <div className='container-sub-filter'>
            <div className='r'>
                <div className='nav-sub'>
                    <button
                        className={`btn-info1 btn ${selectedButton === 'find' ? 'btn-primary' : ''}`}
                        onClick={() => handleButtonClick('find')}
                    >
                        Find
                    </button>
                    <button
                        className={`btn-info1 btn ${selectedButton === 'range' ? 'btn-primary' : ''}`}
                        onClick={() => handleButtonClick('range')}
                    >
                        Range
                    </button>
                </div>
            </div>
            <div className='r'>
                <div className='body-sub'>
                    {/* <TableTest /><div> */}
                    {selectedButton === 'find' &&
                        <Find />
                    }
                    {selectedButton === 'range' &&
                        <Range />
                    }
                </div>
            </div>
        </div>
    )
}

export default FindRangeComponent
