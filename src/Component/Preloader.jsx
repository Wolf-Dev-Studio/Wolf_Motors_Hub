import React, { useState, useEffect } from 'react';
import ImgAmericanos from "../assets/USA/Hub-USA.webp";
import ImgEuropeos from "../assets/EURO/Hub-Europe.webp";
import ImgAsiaticos from "../assets/JDM/Hub-ASIA.webp";
import ImgServicios from "../assets/Home/Service.webp";


export default function Preloader(props) {

    const { variant } = props;

    const stylesConfig = {
        americanos: {
            Text: "Welcome to United States",
            Img: ImgAmericanos,
        },
        europeos: {
            Text: "Welcome to Europe",
            Img: ImgEuropeos,
        },
        asiaticos: {
            Text: "Welcome to Japan",
            Img: ImgAsiaticos,
        },
        servicios: {
            Text: "Welcome To The Garage",
            Img: ImgServicios,
        }
    };


    const currentStyle = stylesConfig[variant];

    const [isLoading, setIsLoading] = useState(true);
    // Estado para controlar la desaparición (Fade-out)
    const [isFadingOut, setIsFadingOut] = useState(false);
    // Estado para controlar la aparición inicial (Fade-in)
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // 1. Activar el Fade-In de los elementos internos nada más cargar
        const mountTimer = setTimeout(() => {
            setIsMounted(true);
        }, 100); // Pequeño retraso para que la transición se note

        // 2. Iniciar el Fade-Out (desvanecimiento total) a los 2.5 segundos
        const fadeTimer = setTimeout(() => {
            setIsFadingOut(true);
        }, 2500);

        // 3. Destruir el componente por completo a los 3.2 segundos
        const removeTimer = setTimeout(() => {
            setIsLoading(false);
        }, 3200);

        return () => {
            clearTimeout(mountTimer);
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    // Si ya terminó de cargar, desaparece del DOM para no estorbar
    if (!isLoading) return null;

    return (
        <div className={`fixed inset-0 z-[9999] bg-[#1a1a1a] transition-opacity duration-700 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-black transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <img src={currentStyle.Img} alt="Engine Loading" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a] opacity-80"></div>
                <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-black text-[#85d5c8] uppercase tracking-[0.3em] drop-shadow-lg">
                        {currentStyle.Text}
                    </h1>
                </div>
            </div>
        </div>
    );
}