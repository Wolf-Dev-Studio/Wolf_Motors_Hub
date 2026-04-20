import React from 'react';
import './index.css'
import Home from './View/home'
import SobreNosotros from './View/SobreNosotros'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Americanos from './View/Americanos';
import Europeos from './View/Europeos';
import Asiaticos from './View/Asiaticos';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/americanos" element={<Americanos />} />
        <Route path="/europeos" element={<Europeos />} />
        <Route path="/asiaticos" element={<Asiaticos />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
