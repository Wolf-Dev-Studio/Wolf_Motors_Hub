import React from 'react';
import './index.css'
import Home from './View/home'
import SobreNosotros from './View/SobreNosotros'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Americanos from './View/Americanos';
import Europeos from './View/Europeos';
import Asiaticos from './View/Asiaticos';
import Catalogo from './Component/Catalogo';
import Servicios from './Component/Servicio';
import CarDetails from './Component/Detail';
import CarInvoice from './Component/Compra';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/americanos" element={<Americanos />} />
        <Route path="/europeos" element={<Europeos />} />
        <Route path="/asiaticos" element={<Asiaticos />} />
        <Route path="/catalogo/americanos" element={<Catalogo variant="americanos" />} />
        <Route path="/catalogo/europeo" element={<Catalogo variant="europeos" />} />
        <Route path="/catalogo/asiatico" element={<Catalogo variant="asiaticos" />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/Detalle" element={<CarDetails />} />
        <Route path="/Compra" element={<CarInvoice />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
