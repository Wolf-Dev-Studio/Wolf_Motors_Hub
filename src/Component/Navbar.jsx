import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ variant = "home" }) => {

    const [isOpen, setIsOpen] = useState(false);

    // 1. DICCIONARIO DE ESTILOS (El ADN de cada Navbar)
    const stylesConfig = {
        americanos: {
            navBg: "bg-[#F5F5F5]",
            Fondo: "bg-[#B22222]",
            textColor: "text-[#121212]",
            fontFamily: "font-sans",
            logoPilar: "RAW MUSCLE",
            logoColor: "text-[#B22222]",
            linksHover: "hover:text-[#B22222]",
            Link1: "/catalogo/americanos",
            Link2: "/servicios",
            Link3: "/sobre-nosotros",
            textLink1: "Vehiculos",
            textLink2: "Servicios",
            textLink3: "Sobre Nosotros",
        },
        europeos: {
            navBg: "bg-[#1E272E]",
            Fondo: "bg-[#0984E3]",
            textColor: "text-[#00CEC9]",
            fontFamily: "font-sans",
            logoPilar: "PERFORMANCE",
            logoColor: "text-[#F5F6FA]",
            linksHover: "hover:text-[#F5F6FA]",
            Link1: "/catalogo/europeo",
            Link2: "/servicios",
            Link3: "/sobre-nosotros",
            textLink1: "Vehiculos",
            textLink2: "Servicios",
            textLink3: "Sobre Nosotros",
        },
        asiaticos: {
            navBg: "bg-[#D3B037]",
            Fondo: "bg-[#2D3436]",
            textColor: "text-[#2D3436]",
            fontFamily: "font-sans",
            logoPilar: "REDLINE",
            logoColor: "text-[#FFFFFF]",
            linksHover: "hover:text-[#FFFFFF]",
            Link1: "/catalogo/asiatico",
            Link2: "/servicios",
            Link3: "/sobre-nosotros",
            textLink1: "Vehiculos",
            textLink2: "Servicios",
            textLink3: "Sobre Nosotros",
        },

        catalogamericanos: {
            navBg: "bg-[#F5F5F5]",
            Fondo: "bg-[#B22222]",
            textColor: "text-[#121212]",
            fontFamily: "font-sans",
            logoPilar: "RAW MUSCLE",
            logoColor: "text-[#B22222]",
            linksHover: "hover:text-[#B22222]",
            Link1: "/americanos",
            Link2: "/servicios",
            Link3: "/sobre-nosotros",
            textLink1: "Inicio",
            textLink2: "Servicios",
            textLink3: "Sobre Nosotros",
        },
        catalogeuropeos: {
            navBg: "bg-[#1E272E]",
            Fondo: "bg-[#0984E3]",
            textColor: "text-[#00CEC9]",
            fontFamily: "font-sans",
            logoPilar: "PERFORMANCE",
            logoColor: "text-[#F5F6FA]",
            linksHover: "hover:text-[#F5F6FA]",
            Link1: "/europeos",
            Link2: "/servicios",
            Link3: "/sobre-nosotros",
            textLink1: "Inicio",
            textLink2: "Servicios",
            textLink3: "Sobre Nosotros",
        },
        catalogasiaticos: {
            navBg: "bg-[#D3B037]",
            Fondo: "bg-[#2D3436]",
            textColor: "text-[#2D3436]",
            fontFamily: "font-sans",
            logoPilar: "REDLINE",
            logoColor: "text-[#FFFFFF]",
            linksHover: "hover:text-[#FFFFFF]",
            Link1: "/asiaticos",
            Link2: "/servicios",
            Link3: "/sobre-nosotros",
            textLink1: "Inicio",
            textLink2: "Servicios",
            textLink3: "Sobre Nosotros",
        }
    };

    // 2. CASO ESPECIAL: Si es el Home (porque tu Home tiene un navbar lateral distinto)
    if (variant === "home") {
        return (
            <motion.nav
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1.5 }}
                // Mobile: Arriba, ancho completo, altura fija. | PC: Izquierda, ancho fijo, altura completa.
                className="fixed top-0 left-0 z-50 p-3 bg-[#1a1a1a] w-full h-20 md:w-20 md:h-screen"
            >
                <div className="w-full h-full bg-[#c2cbd4] rounded-xl flex flex-row md:flex-col justify-between items-center px-6 py-0 md:px-0 md:py-6">

                    {/* Contenedor del Título */}
                    <div className="flex items-center justify-center md:flex-1 md:items-start">
                        <a href="/">
                            <h1 className="text-[#1a1a1a] font-black text-lg md:text-xl uppercase tracking-tighter md:rotate-180 md:[writing-mode:vertical-rl] transition-all lg:text-vertical lg:text-vertical-lg">
                                Wolf Motors Hub
                            </h1>
                        </a>
                    </div>

                    {/* Logo / Botón inferior o derecho */}
                    <div className="w-8 h-8 shrink-0 border-2 border-[#1a1a1a] rotate-45 flex items-center justify-center text-[#1a1a1a] hover:text-[#85d5c8] hover:bg-[#1a1a1a] hover:border-[#85d5c8] hover:scale-105 transition-all duration-300 cursor-pointer">
                        <span className="font-black -rotate-45 text-xs">W</span>
                    </div>

                </div>
            </motion.nav>
        );
    }

    // 3. RENDERIZADO DINÁMICO PARA LOS 3 PILARES
    const currentStyle = stylesConfig[variant];

    // Si le pasan una variante que no existe, por seguridad cargamos 'americanos' por defecto
    if (!currentStyle) return null;

    return (

        <aside className={`fixed left-0 top-0 w-full ${currentStyle.Fondo} p-2 md:p-3 z-50`}>
            <div className={`w-full h-16 md:h-20 ${currentStyle.navBg} rounded-xl flex justify-between items-center px-6 md:px-16 lg:px-30 relative`}>

                {/* LOGO */}
                <div className="z-50">
                    <a href="/" className={`${currentStyle.logoColor} text-lg md:text-2xl tracking-widest whitespace-nowrap`}>
                        <strong className={`${currentStyle.textColor} font-extrabold`}>WOLF</strong> {currentStyle.logoPilar}
                    </a>
                </div>

                {/* BOTÓN HAMBURGUESA (Solo Celular) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex flex-col gap-1.5 md:hidden z-50 focus:outline-none"
                >
                    <span className={`w-6 h-0.5 ${currentStyle.textColor} bg-current transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 ${currentStyle.textColor} bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 ${currentStyle.textColor} bg-current transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* ENLACES (Desktop + Menú Móvil) */}
                <nav className={`
                    flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-15
                    fixed md:static top-0 left-0 w-full h-screen md:h-auto
                    ${currentStyle.navBg} md:bg-transparent
                    transition-all duration-500 ease-in-out
                    ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full md:translate-y-0 opacity-0 md:opacity-100'}
                    justify-center md:justify-end z-40
                `}>
                    <a href={currentStyle.Link1} onClick={() => setIsOpen(false)} className={`${currentStyle.textColor} ${currentStyle.linksHover} transition-colors font-bold text-lg md:text-base tracking-widest`}>
                        {currentStyle.textLink1}
                    </a>
                    <a href={currentStyle.Link2} onClick={() => setIsOpen(false)} className={`${currentStyle.textColor} ${currentStyle.linksHover} transition-colors font-bold text-lg md:text-base tracking-widest`}>
                        {currentStyle.textLink2}
                    </a>
                    <a href={currentStyle.Link3} onClick={() => setIsOpen(false)} className={`${currentStyle.textColor} ${currentStyle.linksHover} transition-colors font-bold text-lg md:text-base tracking-widest`}>
                        {currentStyle.textLink3}
                    </a>
                </nav>

            </div>
        </aside>
    );
};

export default Navbar;