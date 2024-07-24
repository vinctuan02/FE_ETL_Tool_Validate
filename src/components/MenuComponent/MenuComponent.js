import React, { useContext } from 'react';
import { Menu } from 'antd';
import './MenuComponent.scss'
import { AppContext } from '../../context/AppContext';

const MenuComponent = () => {

    const { setIsShowGroupWindow } = useContext(AppContext)

    const menuItems = [
        {
            key: 'filter',
            label: 'Filter',
        },
        {
            key: 'order',
            label: 'Order',
        },
        {
            key: '3',
            label: 'Submenu',
            children: [
                {
                    key: '7',
                    label: 'Option 7',
                },
                {
                    key: '8',
                    label: 'Option 8',
                },
            ],
        },
    ];

    const onClick = (event) => {
        console.log('click', event);
        if (event.key === 'filter') {
            setIsShowGroupWindow(true)
        }
    };

    return (
        <div className='container-menu'>
            <Menu
                onClick={onClick}
                style={{
                    width: 256,
                }}
                mode="vertical"
                items={menuItems}
            />
        </div>
    );
};

export default MenuComponent;
