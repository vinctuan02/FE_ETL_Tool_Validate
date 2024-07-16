import React, { useContext } from 'react'
import { AppContext } from '../../../../context/AppContext'
import TableSelect from '../../../Tables/TableSelect/TableSelect'
import './Table.scss'

const Table = () => {

    const { reportDetailsCurrent, setArrSourceSinkToCount } = useContext(AppContext)

    const handleSelect = (items) => {
        setArrSourceSinkToCount(items)
    }

    const hiddenFields = ['detail_id', 'report_id', 'schemaSourceName', 'schemaSinkName']

    return (
        <div className='container-table'>
            <TableSelect
                data={reportDetailsCurrent}
                handleSelect={handleSelect}
                hiddenFields={hiddenFields}
                hasIndex={true}
            />
        </div>
    )
}

export default Table
