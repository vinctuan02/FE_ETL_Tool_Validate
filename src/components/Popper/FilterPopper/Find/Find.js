import React, { useContext } from 'react'

import './Find.scss'
import { AppContext } from '../../../../context/AppContext'

const Find = () => {

    const { fieldName, setFieldName, fieldValue, setFieldValue, } = useContext(AppContext)

    const handleOnChangeFiledName = (event) => {
        setFieldName(event.target.value)
    }

    const handleOnChangeFieldValue = (event) => {
        setFieldValue(event.target.value)
    }

    return (
        <div className='container-find'>
            <div className='r'>
                <label className='label'>Field: </label>
                <input
                    className='input'
                    onChange={handleOnChangeFiledName}
                    value={fieldName}

                />
            </div>

            <div className='r'>
                <label className='label'>Value: </label>
                <input
                    className='input'
                    onChange={handleOnChangeFieldValue}
                    value={fieldValue}
                />
            </div>
        </div >
    )
}

export default Find
