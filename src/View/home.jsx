import React from 'react';
import Navbar from '../Component/Navbar';
import RenderPage from '../Component/RenderPage';

function Home() {
    return (
        <>
            <Navbar variant="home" />
            <RenderPage variant="home" />
        </>
    );
}

export default Home;