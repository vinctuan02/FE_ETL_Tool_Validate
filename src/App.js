import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InputPage from './pages/InputPage/InputPage';
import OtherPage from './pages/OtherPage/OtherPage';
import CreateInput from './pages/CreateInputPage/CreateInput';
import { ToastContainer } from 'react-toastify';
import ReportInfoPage from './pages/ReportInfoPage/ReportInfoPage';
import ModalPreviewInput from './components/Modals/ModalPreviewInput/ModalPreviewInput';
import ModalUpdate from './components/Modals/ModalUpdate/ModalUpdate';
import ModalDelete from './components/Modals/ModalDelete/ModalDelete';
import ModalPreviewReportDetails from './components/Modals/ModalPreviewReportDetails/ModalPreviewReportDetails';
import ModalReport from './components/Modals/ModalReport/ModalReport';
import AppLayout from './components/Components/Layout/AppLayout';
import DraggableWindow from './components/DraggableWindow/DraggableWindow';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import GroupWindown from './components/DraggableWindow/GroupWindow/GroupWindown';
import ComparePage from './pages/ComparePage/ComparePage';


function App() {

    const { isShowDraggableWindow, isShowGroupWindow } = useContext(AppContext)

    return (
        <>
            <BrowserRouter>

                <Routes>
                    <Route path='/' element={<AppLayout />}>
                        <Route index element={<CreateInput />} />
                        <Route path='/create-input' element={<CreateInput />} />
                        <Route path='/open-report' element={<InputPage />} />
                        <Route path='/report-info' element={<ReportInfoPage />} />
                        <Route path='/compare-page' element={<ComparePage />} />
                        <Route path='/other' element={<OtherPage />} />
                    </Route>
                </Routes>


                <ModalPreviewInput />
                <ModalUpdate />
                <ModalDelete />
                <ModalPreviewReportDetails />
                <ModalReport />


                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {
                    isShowDraggableWindow &&
                    <DraggableWindow />
                }

                {
                    isShowGroupWindow &&
                    <GroupWindown />
                }
            </BrowserRouter >
        </>
    );
}

export default App;


// v2