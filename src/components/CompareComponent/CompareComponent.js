import React, { useState } from 'react'
import LinesChart from '../../components/Chart/LinesChart/LinesChart'
import MyBarChart from '../../components/Chart/BarChart/BarChart'
import './CompareComponent.scss'

const CompareComponent = () => {
    const data = [
        { schema: 'tuan02', dataSource: 'table1', dataSink: 'table1' },
        { schema: 'tuan02', dataSource: 'table1', dataSink: 'table2' },
        { schema: 'tuan02', dataSource: 'table2', dataSink: 'table1' },
        { schema: 'tuan02', dataSource: 'table2', dataSink: 'table2' },
    ]

    return (
        <div className='container-compare-component'>
            <div className='body-compare'>
                <div className='body-body-compare'>
                    <div >
                        <div>Total records</div>
                        <MyBarChart />
                    </div>
                    <div >
                        <div>Total sum of []</div>
                        <MyBarChart />
                    </div>
                </div>
            </div>

            <div>
                <div>Component2</div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div >
                        <div>Total records</div>
                        <LinesChart />
                    </div>
                    <div>
                        <div>Total sum of []</div>
                        <LinesChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompareComponent
