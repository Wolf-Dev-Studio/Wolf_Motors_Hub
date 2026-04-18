import React from 'react';
import NavbarHome from '../Component/Navbar-Home';
import Hub from '../assets/Home/Hub.jpg';

function Home() {
    return (
        <section className='w-full h-screen bg-[#030f0f]'>
            <NavbarHome />
            <div className='w-[95%] h-full flex flex-row-reverse'>
                <div className='mt-25 ml-5'>
                    <img src={Hub} alt="" className='w-300 h-200 rounded-xl object-cover' />
                </div>
                <div className='flex flex-col gap-10 items-center justify-center flex-[2] ml-25'>
                    <h1 className='text-[#f7f4eb] font-bold text-4xl uppercase tracking-widest'>Bienvenido a Wolf Motors Hub</h1>
                    <p className='text-[#f7f4eb] font-bold text-lg uppercase tracking-widest'>Encuentra los mejores vehiculos segun su estilo</p>
                    <a href="#" className='text-[#f7f4eb] font-bold text-xs uppercase tracking-widest hover:text-[#00df82] hover:bg-[#000000] hover:rounded-full p-2 cursor-pointer transition-colors'>Americanos</a>
                    <a href="#" className='text-[#f7f4eb] font-bold text-xs uppercase tracking-widest hover:text-[#00df82] hover:bg-[#000000] hover:rounded-full p-2 cursor-pointer transition-colors'>Europeos</a>
                    <a href="#" className='text-[#f7f4eb] font-bold text-xs uppercase tracking-widest hover:text-[#00df82] hover:bg-[#000000] hover:rounded-full p-2 cursor-pointer transition-colors'>Asiaticos</a>
                </div>

            </div>
        </section>
    );
}

export default Home;