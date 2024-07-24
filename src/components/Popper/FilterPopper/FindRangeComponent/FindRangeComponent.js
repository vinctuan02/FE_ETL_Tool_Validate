import React, { useState } from 'react';
import './FindRangeComponent.scss';
import { Tabs } from 'antd';
import Find from '../Find/Find';
import Range from '../Range/Range';
import Group from '../Group/Group';

const FindRangeComponent = () => {
    const [activeKey, setActiveKey] = useState('find');

    const handleTabChange = (key) => {
        setActiveKey(key);
    };

    const items = [
        {
            key: 'find',
            label: 'Find',
            children: <Find />
        },
        {
            key: 'range',
            label: 'Range',
            children: <Range />
        },
        // {
        //     key: 'group',
        //     label: 'Group',
        //     children: <Group />
        // }
    ];

    return (
        <div className='container-sub-filter'>
            <div className='r'>
                <div className='nav-sub'>
                    <Tabs activeKey={activeKey} onChange={handleTabChange} items={items} />
                </div>
            </div>
        </div>
    );
};

export default FindRangeComponent;
