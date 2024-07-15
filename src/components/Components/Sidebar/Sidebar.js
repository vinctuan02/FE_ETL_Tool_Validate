import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Open Report',
        icon: <i className="fa-regular fa-folder"></i>, // Icon để nhập dữ liệu
        to: '/',
        section: 'input'
    },
    {
        display: 'Create Report',
        icon: <i className="fa-regular fa-pen-to-square"></i>, // Icon để nhập dữ liệu
        to: '/create-input',
        section: 'create-input'
    },
    {
        display: 'Report Info',
        icon: <i className="fa-regular fa-chart-bar"></i>, // Icon để so sánh dữ liệu
        to: '/report-info',
        section: 'report-info'
    },
    {
        display: 'Other',
        icon: <i className="fa-solid fa-gears"></i>, // Icon khác
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
