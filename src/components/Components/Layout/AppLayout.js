import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import './AppLayout.scss'
import Header from "../Header/HeaderComponent";

const AppLayout = () => {
    return (
        <>
            <div className="container-app-layout">
                <Sidebar />
                <div className="container-header-outlet">
                    <div className="container-header">
                        <div className="header">
                            <Header />
                        </div>
                    </div>
                    <div style={{ height: '8vh' }}>
                    </div>
                    <div className="container-outlet">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
};

export default AppLayout;
