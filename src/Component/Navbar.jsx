import React from 'react';

const Navbar = ({ variant = "home" }) => {

    // 1. DICCIONARIO DE ESTILOS (El ADN de cada Navbar)
    const stylesConfig = {
        americanos: {
            navBg: "bg-[#F5F5F5]",
            Fondo: "bg-[#B22222]",
            border: "border-b-4 border-red-600",
            textColor: "text-[#121212]",
            fontFamily: "font-sans",
            logoPilar: "RAW MUSCLE",
            logoColor: "text-[#B22222]",
            linksHover: "hover:text-[#B22222]"
        },
        europeos: {
            navBg: "bg-zinc-900",
            border: "border-b-4 border-blue-600",
            textColor: "text-white",
            fontFamily: "font-serif", // O la fuente premium que uses
            logoPilar: "PERFORMANCE",
            logoColor: "text-blue-500",
            linksHover: "hover:text-blue-500"
        },
        asiaticos: {
            navBg: "bg-black",
            border: "border-b-4 border-white",
            textColor: "text-white",
            fontFamily: "font-mono", // O una fuente más tecnológica
            logoPilar: "REDLINE",
            logoColor: "text-red-500",
            linksHover: "hover:text-red-500"
        }
    };

    // 2. CASO ESPECIAL: Si es el Home (porque tu Home tiene un navbar lateral distinto)
    if (variant === "home") {
        return (
            <aside className="fixed left-0 top-0 h-screen w-20 bg-[#1a1a1a] p-3 z-50 ">
                <div className="w-full h-full bg-[#c2cbd4] rounded-xl flex flex-col justify-between items-center py-6 ">
                    <div className="flex-1 flex items-start justify-center">
                        <a href="/">
                            <h1 className="text-[#1a1a1a] font-black text-xl uppercase tracking-tighter text-vertical">
                                Wolf Motors Hub
                            </h1>
                        </a>
                    </div>
                    <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                </div>
            </aside>
        );
    }

    // 3. RENDERIZADO DINÁMICO PARA LOS 3 PILARES
    const currentStyle = stylesConfig[variant];

    // Si le pasan una variante que no existe, por seguridad cargamos 'americanos' por defecto
    if (!currentStyle) return null;

    return (

        <aside className={`fixed left-0 top-0 h-20 w-full ${currentStyle.Fondo} p-3 z-50 `}>
            <div className={`w-full h-full ${currentStyle.navBg}  rounded-xl flex justify-between items-center py-6 `}>
                <div className='ml-30'>
                    <a href="/" className={`${currentStyle.logoColor} text-2xl tracking-widest`}><strong className={`${currentStyle.textColor} font-extrabold`}>WOLF</strong> RAW MUSCLE</a>
                </div>
                <div className='mr-30 flex gap-15'>
                    <a href="/" className={`${currentStyle.textColor} ${currentStyle.linksHover} transition-colors duration-300 font-bold text-base tracking-widest`}>Vehiculos</a>
                    <a href="/" className={`${currentStyle.textColor} ${currentStyle.linksHover} transition-colors duration-300 font-bold text-base tracking-widest`}>Servicios</a>
                    <a href="/sobre-nosotros" className={`${currentStyle.textColor} ${currentStyle.linksHover} transition-colors duration-300 font-bold text-base tracking-widest`}>Sobre Nosotros</a>
                </div>
            </div>
        </aside>
    );
};

export default Navbar;