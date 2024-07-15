import React, { useState } from 'react';
import './FindRangeComponent.scss';
import { Tabs } from 'antd';
import Find from '../Find/Find';
import Range from '../Range/Range';
import Group from '../Group/Group';

const { TabPane } = Tabs;

const FindRangeComponent = () => {
    const [activeKey, setActiveKey] = useState('find');

    const handleTabChange = (key) => {
        setActiveKey(key);
    };

    return (
        <div className='container-sub-filter'>
            <div className='r'>
                <div className='nav-sub'>
                    <Tabs activeKey={activeKey} onChange={handleTabChange}>
                        <TabPane tab="Find" key="find">
                            <Find />
                        </TabPane>
                        <TabPane tab="Range" key="range">
                            <Range />
                        </TabPane>
                        <TabPane tab="Group" key="group">
                            <Group />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default FindRangeComponent;
