import React, { useContext } from 'react'
import { AppContext } from '../../../../context/AppContext'
import TableSelect from '../../../Tables/TableSelect/TableSelect'
import './Range.scss'

const Range = () => {

  const { reportDetailsCurrent, setArrSourceSinkToCount } = useContext(AppContext)

  const handleSelect = (items) => {
    setArrSourceSinkToCount(items)
  }

  const hiddenFields = ['detail_id', 'report_id', 'schemaSourceName', 'schemaSinkName']

  return (
    <div className='container-Range'>
      <TableSelect
        // data={reportDetailsCurrent}
        handleSelect={handleSelect}
      // hiddenFields={hiddenFields}
      // hasIndex={true}
      />
    </div>
  )
}

export default Range
