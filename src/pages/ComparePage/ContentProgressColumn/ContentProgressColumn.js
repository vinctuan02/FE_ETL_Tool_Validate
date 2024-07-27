import React from 'react'
import ProgressBarRow from '../ProgressBarRow/ProgressBarRow'

const ContentProgressColumn = (props) => {
    const { currentTable, setProcessingDone } = props
    return (
        <div>
            <ProgressBarRow
                currentTable={currentTable}
                setProcessingDone={setProcessingDone}
            />
        </div>
    )
}

export default ContentProgressColumn
