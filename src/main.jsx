import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import {
  
  RouterProvider,
} from "react-router-dom";
import router from './Routes/Routes.jsx';
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='max-w-screen-xl mx-auto'>
    <ToastContainer />
   <RouterProvider router={router} />
   </div>
  </React.StrictMode>,
)
