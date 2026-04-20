import React from 'react';
import Navbar from '../Component/Navbar';
import BentoGridCar from '../Component/BentoGrid-Car';
import Marcas from '../Component/Marcas';
import News from '../Component/News';
import Page from '../Component/RenderPage';
import Footer from '../Component/Footer';
import Preloader from '../Component/Preloader';

function Asiaticos() {
    return (
        <>
            <Preloader variant="asiaticos" />
            <Navbar variant="asiaticos" />
            <Page variant="asiaticos" />
            <Marcas variant="asiaticos" />
            <BentoGridCar variant="asiaticos" />
            <News variant="asiaticos" />
            <Footer variant="asiaticos" />
        </>
    );
}

export default Asiaticos;