import React from 'react';
import Navbar from '../Component/Navbar';
import BentoGridCar from '../Component/BentoGrid-Car';
import Marcas from '../Component/Marcas';
import News from '../Component/News';
import Page from '../Component/RenderPage';
import Footer from '../Component/Footer';
import Preloader from '../Component/Preloader';

function Americanos() {
    return (
        <>
            <Preloader variant="americanos" />
            <Navbar variant="americanos" />
            <Page variant="americanos" />
            <Marcas variant="americanos" />
            <BentoGridCar variant="americanos" />
            <News variant="americanos" />
            <Footer variant="americanos" />
        </>
    );
}

export default Americanos;
