import React, { useEffect, useState } from 'react'
import './InputPage.scss'
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReportComponent from '../../components/Components/ReportComponent/ReportComponent';

const InputPage = () => {
    return (
        <>
            <div className='container-input-page'>
                <ReportComponent
                    hasAction={true}
                    hasShowRowInfo={true}
                />
            </div>
        </>
    )
}

export default InputPage
