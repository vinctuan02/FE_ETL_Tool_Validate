import React, { useContext } from 'react';
import './Range.scss';
import { AppContext } from '../../../../context/AppContext';

const Range = () => {

    const { fieldName, setFieldName, startValue, setStartValue, endValue, setEndValue } = useContext(AppContext)

    const handleOnChangeFiledName = (event) => {
        setFieldName(event.target.value)
    }

    const handleOnChangeStartValue = (event) => {
        setStartValue(event.target.value)
    }

    const handleOnChangeEndValue = (event) => {
        setEndValue(event.target.value)
    }

    return (
        <div className='container-range'>
            <div className='field-row'>
                <label className='label'>Field: </label>
                <input className='input'
                    onChange={handleOnChangeFiledName}
                    value={fieldName}
                />
            </div>

            <div className='value-row'>
                <label className='label'>Start: </label>
                <input className='input'
                    onChange={handleOnChangeStartValue}
                    value={startValue}
                />
            </div>

            <div className='value-row'>
                <label className='label'>End: </label>
                <input className='input'
                    onChange={handleOnChangeEndValue}
                    value={endValue}
                />
            </div>
        </div>
    );
};

export default Range;
