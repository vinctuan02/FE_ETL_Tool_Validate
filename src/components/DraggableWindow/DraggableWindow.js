import React, { useContext } from 'react';
import Draggable from 'react-draggable';
import { AppContext } from '../../context/AppContext';
import MenuComponent from '../MenuComponent/MenuComponent';

const DraggableWindow = () => {

    const { setIsShowDraggableWindow } = useContext(AppContext)

    const handleClose = () => {
        setIsShowDraggableWindow(false)
    };

    return (
        <Draggable>
            <div style={styles.window}>
                <div style={styles.header}>
                    Filter
                    <button style={styles.closeButton} onClick={handleClose}>
                        X
                    </button>
                </div>
                <div style={styles.content}>
                    <MenuComponent />
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

export default DraggableWindow;
