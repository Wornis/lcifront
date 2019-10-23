import React from 'react';
import Header from './Header';
import DevTools from 'Redux/DevTools';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = (props) => {
    return (
        <div>
            <DevTools/>
            <Header/>
            {props.children}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover={false}/>
        </div>
    );
};

export default Layout;
