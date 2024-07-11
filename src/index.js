import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './context/AppContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
                <App />
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
