import React from 'react'
import './ContentProgressRow.scss'
import TableCompare from '../../../components/Tables/TableCompare/TableCompare';

const ContentProgressRow = (props) => {
    const { dataSource, dataSink } = props

    return (
        <div className='container-content-progress-column'>
            <div className='table-source'>
                <TableCompare
                    data={dataSource} dataCompare={dataSink}
                />
            </div>
            <div className='table-sink'>
                <TableCompare
                    data={dataSink} dataCompare={dataSource}
                />

            </div>
        </div>
    )
}

export default ContentProgressRow
