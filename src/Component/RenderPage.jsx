import React from 'react';
import Hub from '../assets/Home/Hub.jpg';
import { useState } from 'react';
import MuscleCar from '../assets/USA/Dodge-Home.jpg';

const Page = ({ variant = "home" }) => {
    const [showBanner, setShowBanner] = useState(true);
    const stylesConfig = {
        americanos: {
            Liner: "from-[#b22222] to-[#121212]",
            textColor: "text-[#F5F5F5]",
            textfont: "font-bold",
            title: "MÚSCULO Y POTENCIA PURA",
            description: "Estados Unidos no solo ensambla autos; forja carácter sobre ruedas. Desde los V8 rugiendo en las rectas de Detroit hasta los clásicos que definieron una era de rebeldía y libertad. Aquí no hay sutilezas, solo caballos de fuerza brutos, tracción trasera y el sonido inconfundible del poder americano. Bienvenidos a la cuna del Muscle Car.",
            image: MuscleCar
        },
        europeos: {
            Liner: "from-[#0984E3] via-[#0984E3] to-[#F5F6FA]",
            textColor: "text-[#121212]",
            textfont: "font-bold",
            title: "PRECISIÓN, LUJO Y VELOCIDAD",
            description: "Europa es la cuna del automovilismo deportivo y de lujo. Desde la ingeniería milimétrica alemana en la Autobahn, hasta la pasión desbordante del diseño italiano. En Wolf Performance, cada vehículo representa el pináculo de la aerodinámica y el estatus. Prepárate para conducir obras de arte diseñadas para desafiar los límites de la física.",
            image: ""
        },
        asiaticos: {
            Liner: "from-[#2D3436] via-[#2D3436] to-[#DFE6E9]",
            textColor: "text-[#FFFFFF]",
            textfont: "font-bold",
            title: "PRECISIÓN, LUJO Y VELOCIDAD",
            description: "Europa es la cuna del automovilismo deportivo y de lujo. Desde la ingeniería milimétrica alemana en la Autobahn, hasta la pasión desbordante del diseño italiano. En Wolf Performance, cada vehículo representa el pináculo de la aerodinámica y el estatus. Prepárate para conducir obras de arte diseñadas para desafiar los límites de la física.",
            image: ""
        }
    };


    if (variant === "home") {
        return (
            <section className='w-full h-full bg-[#1a1a1a]'>
                {/* --- BLOQUE 1: BANNER DINÁMICO --- */}
                {showBanner && (
                    <div className="relative flex items-center gap-x-6 bg-[#c2cbd4] px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <p className="text-sm leading-6 text-[#1a1a1a]">
                                Las funciones de compra y transacciones son simuladas; no se realizan ventas reales a través de este dominio técnico.
                            </p>
                        </div>
                        <div className="flex flex-1 justify-end">
                            <button onClick={() => setShowBanner(false)} className="-m-3 p-3 hover:bg-white/10 rounded-full transition-colors">
                                <span className="sr-only">Cerrar</span>
                                <svg className="h-5 w-5 text-[#1a1a1a]" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
                <div className='w-[97%] h-screen flex flex-row-reverse'>
                    <div className='mt-25 ml-5'>
                        <img src={Hub} alt="" className='w-300 h-200 mr-10 rounded-xl object-cover' />
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

    const currentStyle = stylesConfig[variant];

    if (!currentStyle) return null;

    return (
        <section className='w-full h-screen'>
            <div className={`w-full h-full flex bg-linear-to-b ${currentStyle.Liner}`}>
                <div className='flex flex-col gap-10 items-center justify-center flex-[2] ml-25'>
                    <h2 className={`${currentStyle.textColor} ${currentStyle.textfont} text-2xl tracking-widest`}>{currentStyle.title}</h2>
                    <p className={`${currentStyle.textColor} ${currentStyle.textfont} text-lg tracking-widest`}>{currentStyle.description}</p>
                </div>
                <div className='flex flex-col gap-10 items-center justify-center flex-[2] mr-10 ml-25'>
                    <img src={currentStyle.image} alt="" />
                </div>
            </div>
        </section>
    );
}

export default Page;
