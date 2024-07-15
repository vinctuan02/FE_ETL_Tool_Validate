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


function App() {
    return (
        <>
            <BrowserRouter>

                <Routes>
                    <Route path='/' element={<AppLayout />}>
                        <Route index element={<InputPage />} />
                        <Route path='/input' element={<InputPage />} />
                        <Route path='/create-input' element={<CreateInput />} />
                        <Route path='/report-info' element={<ReportInfoPage />} />
                        <Route path='/other' element={<OtherPage />} />
                    </Route>
                </Routes>


                <ModalPreviewInput />
                <ModalUpdate />
                <ModalDelete />
                <ModalPreviewReportDetails />
                <ModalReport />


                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </BrowserRouter >
        </>
    );
}

export default App;


// v2