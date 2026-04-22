import React from 'react';

const Navbar = ({ variant = "home" }) => {

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
            <aside className="fixed  left-0 top-0 h-screen w-20 bg-[#1a1a1a] p-3 z-50 ">
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
            <div className={`w-full h-full ${currentStyle.navBg} rounded-xl flex justify-between items-center py-6 `}>
                <div className='ml-30'>
                    <a href="/" className={`${currentStyle.logoColor} text-2xl tracking-widest`}><strong className={`${currentStyle.textColor} font-extrabold`}>WOLF</strong> {currentStyle.logoPilar}</a>
                </div>
                <div className='mr-30 flex gap-15'>
                    <a href={currentStyle.Link1} className={`${currentStyle.textColor} ${currentStyle.linksHover} transition-colors duration-300 font-bold text-base tracking-widest`}>{currentStyle.textLink1}</a>
                    <a href={currentStyle.Link2} className={`${currentStyle.textColor} ${currentStyle.linksHover} transition-colors duration-300 font-bold text-base tracking-widest`}>{currentStyle.textLink2}</a>
                    <a href={currentStyle.Link3} className={`${currentStyle.textColor} ${currentStyle.linksHover} transition-colors duration-300 font-bold text-base tracking-widest`}>{currentStyle.textLink3}</a>
                </div>
            </div>
        </aside>
    );
};

export default Navbar;