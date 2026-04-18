import React from 'react';
import './index.css'
import Home from './View/Home'
import SobreNosotros from './View/SobreNosotros'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import Nosotros from './View/Nosotros'
//import Contacto from './View/Contacto'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        {/*<Route path="/contacto" element={<Contacto />} />*/}
      </Routes>
    </BrowserRouter>

  )
}

export default App
