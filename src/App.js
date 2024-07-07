import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import InputPage from './pages/InputPage/InputPage';
import OtherPage from './pages/OtherPage/OtherPage';
import CreateInput from './pages/CreateInputPage/CreateInput';
import { ToastContainer } from 'react-toastify';
import ReportInfoPage from './pages/ReportInfoPage/ReportInfoPage';
import ModalPreviewInput from './components/ModalPreviewInput/ModalPreviewInput';
import ModalUpdate from './components/ModalUpdate/ModalUpdate';
import ModalDelete from './components/ModalDelete/ModalDelete';
import ModalPreviewReportDetails from './components/ModalPreviewReportDetails/ModalPreviewReportDetails';
import ModalReport from './components/ModalReport/ModalReport';

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
            </BrowserRouter>

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
        </>
    );
}

export default App;
