import React from 'react';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LayoutWrapper = ({ children, onClickLogout }) => (
  <>
    <Header onClickLogout={onClickLogout} />  
    <div className='todo__wrapper'>
      {children}
    </div>
    <ToastContainer 
      position='bottom-left'
    />
  </>
);

export default LayoutWrapper;
