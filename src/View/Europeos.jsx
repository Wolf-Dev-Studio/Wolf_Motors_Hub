import React from 'react';
import Navbar from '../Component/Navbar';
import BentoGridCar from '../Component/BentoGrid-Car';
import Marcas from '../Component/Marcas';
import News from '../Component/News';
import Page from '../Component/RenderPage';
import Footer from '../Component/Footer';
import Preloader from '../Component/Preloader';

function Europeos() {
    return (
        <>
            <Preloader variant="europeos" />
            <Navbar variant="europeos" />
            <Page variant="europeos" />
            <Marcas variant="europeos" />
            <BentoGridCar variant="europeos" />
            <News variant="europeos" />
            <Footer variant="europeos" />
        </>
    );
}

export default Europeos;