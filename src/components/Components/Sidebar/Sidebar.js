import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Create Report',
        icon: <i className='bx bx-edit' ></i>,
        to: '/create-input',
        section: 'create-input'
    },
    {
        display: 'Open Report',
        icon: <i className="bx bx-folder-open"></i>,
        to: '/open-report',
        section: 'open-report'
    },
    {
        display: 'Report Info',
        icon: <i className="bx bx-bar-chart-alt-2"></i>,
        to: '/report-info',
        section: 'report-info'
    },
    {
        display: 'Compare',
        icon: <i className='bx bx-transfer-alt'></i>,
        to: '/compare-page',
        section: 'compare-page'
    },
    {
        display: 'Other',
        icon: <i className="bx bx-cog"></i>,
        to: '/other',
        section: 'other'
    }

]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return (
        <>
            <div className='sidebar'>
                <div className="sidebar__logo">
                    ETL Validate Tool
                </div>
                <div ref={sidebarRef} className="sidebar__menu">
                    <div
                        ref={indicatorRef}
                        className="sidebar__menu__indicator"
                        style={{
                            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                        }}
                    ></div>
                    {
                        sidebarNavItems.map((item, index) => (
                            <Link to={item.to} key={index}>
                                <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                                    <div className="sidebar__menu__item__icon">
                                        {item.icon}
                                    </div>
                                    <div className="sidebar__menu__item__text">
                                        {item.display}
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
};

export default Sidebar;
