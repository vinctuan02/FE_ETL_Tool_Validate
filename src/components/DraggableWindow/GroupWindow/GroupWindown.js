import React, { useContext, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

import TableSelect from '../../Tables/TableSelect/TableSelect';
import { AppContext } from '../../../context/AppContext';
import { groupByColumn } from '../../../services/ReportService';

const GroupWindown = () => {

    const { setIsShowDraggableWindow, setIsShowGroupWindow, nameColumn, currentSelectTB } = useContext(AppContext)
    const [data, setData] = useState()

    const fetchDataGroup = async (input) => {
        const result = await groupByColumn(input)
        setData(result.data)
    }

    useEffect(() => {
        console.log("currentSelectTB: ", currentSelectTB);
        const input = {
            nameDB: currentSelectTB.schemaSourceName,
            nameTB: currentSelectTB.dataSourceName,
            nameColumn: nameColumn
        }
        fetchDataGroup(input)
    }, [nameColumn])


    // useEffect(() => {
    //     console.log(data);
    // }, [data])

    const handleClose = () => {
        setIsShowDraggableWindow(false)
        setIsShowGroupWindow(false)
    };

    const handleSelect = (items) => {
        console.log(items);
    }

    return (
        <Draggable>
            <div style={styles.window}>
                <div style={styles.header}>
                    Group
                    <button style={styles.closeButton} onClick={handleClose}>
                        X
                    </button>
                </div>
                <div style={styles.content}>
                    <TableSelect
                        handleSelect={handleSelect}
                        data={data}
                    />
                </div>
            </div>
        </Draggable>
    );
};

const styles = {
    window: {
        width: 'auto',
        maxHeight: 'auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        position: 'absolute',
        top: '90vh',
        left: '50vw',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f1f1f1',
        borderBottom: '1px solid #ccc',
        cursor: 'move',
    },
    closeButton: {
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'transparent',
        outline: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#888',
    },
    content: {
        padding: '10px',
    },
};

export default GroupWindown;
