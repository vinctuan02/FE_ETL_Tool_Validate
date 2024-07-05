import React from 'react'
import LinesChart from '../../components/Chart/LinesChart/LinesChart'
import MyBarChart from '../../components/Chart/BarChart/BarChart'
import ModalReport from '../../components/ModalReport/ModalReport'

const ComparePage = () => {

    const data = [
        { schema: 'tuan02', dataSource: 'table1', dataSink: 'table1' },
        { schema: 'tuan02', dataSource: 'table1', dataSink: 'table2' },
        { schema: 'tuan02', dataSource: 'table2', dataSink: 'table1' },
        { schema: 'tuan02', dataSource: 'table2', dataSink: 'table2' },
    ]

    return (
        <div>
            <h3>Compare page</h3>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '700px' }}>
                    <div>Total records</div>
                    <MyBarChart />
                </div>
                <div style={{ width: '700px' }}>
                    <div>Total sum of []</div>
                    <MyBarChart />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '700px' }}>
                    <div>Total records</div>
                    <LinesChart />
                </div>
                <div style={{ width: '700px' }}>
                    <div>Total sum of []</div>
                    <LinesChart />
                </div>
            </div>
            <div>
                <ModalReport />
            </div>
        </div>
    )
}

export default ComparePage
