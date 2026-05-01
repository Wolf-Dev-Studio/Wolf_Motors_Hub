import React from 'react';
import Hub from '../assets/Home/Hub.webp';
import { useState } from 'react';
import MuscleCar from '../assets/USA/Dodge-Home.webp';
import EuropeCar from '../assets/EURO/Hub-EURO.webp';
import AsiaCar from '../assets/JDM/Hub-JDM.webp';
import { motion } from 'framer-motion';

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
            image: EuropeCar
        },
        asiaticos: {
            Liner: "from-[#2D3436] via-[#2D3436] to-[#DFE6E9]",
            textColor: "text-[#FFFFFF]",
            textfont: "font-bold",
            title: "PRECISIÓN SIN LÍMITES",
            description: "Descubre el balance perfecto entre eficiencia y potencia. Los fabricantes líderes de Asia han dominado la tecnología moderna, creando vehículos que desafían el tiempo. En esta sección, el enfoque es la durabilidad legendaria combinada con una estética vanguardista que domina las calles del mundo.",
            image: AsiaCar
        }
    };


    if (variant === "home") {
        return (
            <section className='w-full h-full bg-[#1a1a1a]'>
                {showBanner && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }} // Empieza invisible y 50px más arriba
                        animate={{ opacity: 1, y: 0 }}   // Termina visible y en su posición original
                        transition={{ duration: 1.5 }} // Dura 0.6 segundos
                        className="fixed top-5 right-20 left-20 rounded-xl z-50 flex items-center gap-x-6 bg-[#c2cbd4] px-6 py-2.5 sm:px-3.5 sm:before:flex-1 ">
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
                    </motion.div>
                )}
                <div className='w-[97%] h-screen flex flex-row-reverse'>
                    <motion.div
                        className='mt-25 ml-5'
                        initial={{ opacity: 0, x: 100, }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        <img src={Hub} alt="" className='w-300 h-200 mr-10 rounded-xl object-cover shadow-lg shadow-[#85d5c8]' />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }} // Empieza invisible y 50px más arriba
                        animate={{ opacity: 1, y: 0 }}   // Termina visible y en su posición original
                        transition={{ duration: 1.5 }} // Dura 0.6 segundos
                        className='flex flex-col gap-10 items-center justify-center flex-[2] ml-25'>
                        <h1 className='text-[#85d5c8] font-bold text-4xl tracking-widest'>DEFINING THE ROAD</h1>
                        <p className='text-[#f7f4eb] font-bold text-lg tracking-widest'>Bienvenido | SELECCIONA TU MÁQUINA</p>
                        <div className='flex flex-row gap-5'>
                            <a href="/americanos" className='flex flex-row items-center gap-2  text-[#f7f4eb]  font-bold text-base uppercase tracking-widest hover:text-[#85d5c8] hover:rounded-full p-2 cursor-pointer transition-colors'>Americanos<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 640 480"><path fill="#bd3d44" d="M0 0h640v480H0" /><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640" /><path fill="#192f5d" d="M0 0h364.8v258.5H0" /><marker id="SVGEq3dreKJ" markerHeight="30" markerWidth="30"><path fill="#fff" d="m14 0l9 27L0 10h28L5 27z" /></marker><path fill="none" marker-mid="url(#SVGEq3dreKJ)" d="m0 0l16 11h61h61h61h61h60L47 37h61h61h60h61L16 63h61h61h61h61h60L47 89h61h61h60h61L16 115h61h61h61h61h60L47 141h61h61h60h61L16 166h61h61h61h61h60L47 192h61h61h60h61L16 218h61h61h61h61h60z" /></svg></a>
                            <a href="/europeos" className='flex flex-row items-center gap-2  text-[#f7f4eb]  font-bold text-base uppercase tracking-widest hover:text-[#85d5c8] hover:rounded-full p-2 cursor-pointer transition-colors'>Europeos<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 640 480"><defs><g id="SVGEMZ5HduN"><g id="SVGGTty7bMH"><path id="SVGwkBBpcNU" d="m0-1l-.3 1l.5.1z" /><use href="#SVGwkBBpcNU" transform="scale(-1 1)" /></g><g id="SVGlgVBh Blu"><use href="#SVGGTty7bMH" transform="rotate(72)" /><use href="#SVGGTty7bMH" transform="rotate(144)" /></g><use href="#SVGlgVBh Blu" transform="scale(-1 1)" /></g></defs><path fill="#039" d="M0 0h640v480H0z" /><g fill="#fc0" transform="translate(320 242.3)scale(23.7037)"><use width="100%" height="100%" y="-6" href="#SVGEMZ5HduN" /><use width="100%" height="100%" y="6" href="#SVGEMZ5HduN" /><g id="SVGCH9N7c3I"><use width="100%" height="100%" x="-6" href="#SVGEMZ5HduN" /><use width="100%" height="100%" href="#SVGEMZ5HduN" transform="rotate(-144 -2.3 -2.1)" /><use width="100%" height="100%" href="#SVGEMZ5HduN" transform="rotate(144 -2.1 -2.3)" /><use width="100%" height="100%" href="#SVGEMZ5HduN" transform="rotate(72 -4.7 -2)" /><use width="100%" height="100%" href="#SVGEMZ5HduN" transform="rotate(72 -5 .5)" /></g><use width="100%" height="100%" href="#SVGCH9N7c3I" transform="scale(-1 1)" /></g></svg></a>
                            <a href="/asiaticos" className='flex flex-row items-center gap-2  text-[#f7f4eb]  font-bold text-base uppercase tracking-widest hover:text-[#85d5c8] hover:rounded-full p-2 cursor-pointer transition-colors'>Asiaticos<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 640 480"><defs><clipPath id="SVGSZhguefA"><path fill-opacity="0.7" d="M-88 32h640v480H-88z" /></clipPath></defs><g fill-rule="evenodd" stroke-width="1" clip-path="url(#SVGSZhguefA)" transform="translate(88 -32)"><path fill="#fff" d="M-128 32h720v480h-720z" /><circle cx="523.1" cy="344.1" r="194.9" fill="#bc002d" transform="translate(-168.4 8.6)scale(.76554)" /></g></svg></a>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <a href="/servicios" className='flex flex-row items-center gap-2  text-[#f7f4eb] font-bold text-xs tracking-widest hover:text-[#85d5c8] hover:rounded-full p-2 cursor-pointer transition-colors'>Servicios<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="42" d="M11 9h6v10h-6.5l-2 -2h-2.5v-6.5l1.5 -1.5Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="42;0" /></path><path d="M17 13h4v-3h1v8h-1v-3h-4Z" opacity="0"><set fill="freeze" attributeName="opacity" begin="0.6s" to="1" /><animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M17 13h0v-3h0v8h0v-3h0Z;M17 13h4v-3h1v8h-1v-3h-4Z" /></path><path d="M6 14h-4M2 11v6" opacity="0"><set fill="freeze" attributeName="opacity" begin="0.8s" to="1" /><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M6 14h0M6 11v6;M6 14h-4M2 11v6" /></path><path d="M11 9v-4M8 5h6" opacity="0"><set fill="freeze" attributeName="opacity" begin="1s" to="1" /><animate fill="freeze" attributeName="d" begin="1s" dur="0.2s" values="M11 9v0M8 9h6;M11 9v-4M8 5h6" /></path></g></svg></a>
                            <a href="/sobre-nosotros" className='flex flex-row items-center gap-2  text-[#f7f4eb] font-bold text-xs tracking-widest hover:text-[#85d5c8] hover:rounded-full p-2 cursor-pointer transition-colors'>Sobre Nosotros<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-dasharray="22" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 19v-1c0 -2.21 1.79 -4 4 -4h4c2.21 0 4 1.79 4 4v1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="22;0" /></path><path stroke-dashoffset="22" d="M12 11c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.3s" to="0" /></path></g></svg></a>
                        </div>
                    </motion.div>
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
                    <img className='rounded-xl' src={currentStyle.image} alt="" />
                </div>
            </div>
        </section>
    );
}

export default Page;
