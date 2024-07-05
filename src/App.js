import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import InputPage from './pages/InputPage/InputPage';
import OtherPage from './pages/OtherPage/OtherPage';
import CreateInput from './pages/CreateInputPage/CreateInput';
import DataPage from './pages/DataPage/DataPage';
import DescribePage from './pages/DescribePage/DescribePage';
import { ToastContainer } from 'react-toastify';
import ComparePage from './pages/ComparePage/ComparePage';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<AppLayout />}>
                        <Route index element={<InputPage />} />
                        <Route path='/input' element={<InputPage />} />
                        <Route path='/create-input' element={<CreateInput />} />
                        <Route path='/compare' element={<ComparePage />} />
                        <Route path='/data' element={<DataPage />} />
                        <Route path='/describe' element={<DescribePage />} />
                        <Route path='/other' element={<OtherPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
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
