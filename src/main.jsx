import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import { CycleProvider } from './context/CycleContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CycleProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"      
      />
      </CycleProvider>
    </BrowserRouter>
  </StrictMode>,
)
