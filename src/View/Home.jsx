import React from 'react';
import Navbar from '../Component/Navbar';
import Hub from '../assets/Home/Hub.jpg';

function Home() {
    return (
        <section className='w-full h-screen bg-[#1a1a1a]'>
            <Navbar variant="home" />
            <div className='w-[95%] h-full flex flex-row-reverse'>
                <div className='mt-25 ml-5'>
                    <img src={Hub} alt="" className='w-300 h-200 rounded-xl object-cover' />
                </div>
                <div className='flex flex-col gap-10 items-center justify-center flex-[2] ml-25'>
                    <h1 className='text-[#85d5c8] font-bold text-4xl tracking-widest'>DEFINING THE ROAD</h1>
                    <p className='text-[#f7f4eb] font-bold text-lg tracking-widest'>Bienvenido | SELECCIONA TU MÁQUINA</p>
                    <div className='flex flex-row gap-10'>
                        <a href="/americanos" className='text-[#f7f4eb] font-bold text-base uppercase tracking-widest hover:text-[#85d5c8] hover:bg-[#000000] hover:rounded-full p-2 cursor-pointer transition-colors'>Americanos</a>
                        <a href="/europeos" className='text-[#f7f4eb] font-bold text-base uppercase tracking-widest hover:text-[#85d5c8] hover:bg-[#000000] hover:rounded-full p-2 cursor-pointer transition-colors'>Europeos</a>
                        <a href="/asiaticos" className='text-[#f7f4eb] font-bold text-base uppercase tracking-widest hover:text-[#85d5c8] hover:bg-[#000000] hover:rounded-full p-2 cursor-pointer transition-colors'>Asiaticos</a>
                    </div>
                    <div className='flex flex-row gap-10'>
                        <a href="/sobre-nosotros" className='text-[#f7f4eb] font-bold text-xs tracking-widest hover:text-[#85d5c8] hover:rounded-full p-2 cursor-pointer transition-colors'>Sobre Nosotros</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;