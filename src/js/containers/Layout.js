import React from 'react';
import Header from './Header';
import DevTools from 'Redux/DevTools';

const Layout = (props) => {
    return (
        <div>
            <DevTools/>
            <Header/>
            {props.children}
        </div>
    );
};

export default Layout;
