import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import './AppLayout.scss';
import Header from "../Header/HeaderComponent";

const AppLayout = () => {
    const [headerVisible, setHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Lấy vị trí cuộn hiện tại
            const currentScrollY = window.scrollY;

            // Kiểm tra nếu vị trí cuộn lớn hơn 50 và người dùng đang cuộn xuống
            if (currentScrollY > 50 && currentScrollY > lastScrollY) {
                setHeaderVisible(false);
            } else {
                setHeaderVisible(true);
            }

            // Cập nhật vị trí cuộn cuối cùng
            setLastScrollY(currentScrollY);
        };

        // Lắng nghe sự kiện cuộn
        window.addEventListener('scroll', handleScroll);

        // Xóa bỏ sự kiện khi component bị unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className="container-app-layout">
            <Sidebar />
            <div className="container-header-outlet">
                <div className={`container-header ${headerVisible ? '' : 'header-hidden'}`}>
                    <div className="header">
                        <Header />
                    </div>
                </div>
                <div style={{ height: '8vh' }}></div>
                <div className="container-outlet">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
