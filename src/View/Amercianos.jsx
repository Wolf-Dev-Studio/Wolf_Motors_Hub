import React from 'react';
import Navbar from '../Component/Navbar';

function Americanos() {
    return (
        <>
            <Navbar variant="americanos" />
            <section className='w-full h-screen'>
                <div className='w-full h-full flex bg-linear-to-b from-[#b22222] to-[#121212]'>
                    <div className='flex flex-col gap-10 items-center justify-center flex-[2] ml-25'>
                        <h2 className='text-[#F5F5F5] text-2xl tracking-widest'>MÚSCULO Y POTENCIA PURA</h2>
                        <p className='text-[#F5F5F5] text-lg tracking-widest'>Estados Unidos no solo ensambla autos; forja carácter sobre ruedas. Desde los V8 rugiendo en las rectas de Detroit hasta los clásicos que definieron una era de rebeldía y libertad. Aquí no hay sutilezas, solo caballos de fuerza brutos, tracción trasera y el sonido inconfundible del poder americano. Bienvenidos a la cuna del Muscle Car.</p>
                    </div>
                    <div className='flex flex-col gap-10 items-center justify-center flex-[2] ml-25'>
                        <img src="" alt="" />
                    </div>
                </div>
                <div>
                    <div>
                        <h2></h2>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Americanos;
