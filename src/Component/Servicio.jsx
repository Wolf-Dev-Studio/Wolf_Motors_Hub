import React from 'react';
import Navbar from './Navbar.jsx';
import Preloader from './Preloader.jsx';

const Servicios = () => {
    const services = [
        {
            id: "01",
            title: "Mantenimiento Preventivo",
            description: "Cambio de aceite, filtros y revisión de 25 puntos para mantener tu motor rugiendo."
        },
        {
            id: "02",
            title: "Diagnóstico Computarizado",
            description: "Escaneo profundo de módulos electrónicos para detectar cualquier anomalía en el sistema."
        },
        {
            id: "03",
            title: "Estética & Detailing",
            description: "Corrección de pintura, sellado cerámico y limpieza profunda de interiores nivel exhibición."
        },
        {
            id: "04",
            title: "Modificaciones Off-Road",
            description: "Instalación de suspensiones, cauchos y accesorios especializados para Vehiculos Off-Road."
        },
        {
            id: "05",
            title: "Gestión de Venta Premium",
            description: "Nos encargamos de vender tu vehículo bajo los estándares de calidad de la red Wolf."
        },
        {
            id: "06",
            title: "Auxilio Vial VIP",
            description: "Asistencia técnica especializada donde sea que te encuentres, disponible 24/7."
        }
    ];

    return (
        <>
            <Navbar variant={"home"} />
            <Preloader variant={"servicios"} />
            <section className="bg-[#1a1a1a] py-20 px-6 font-sans border-t border-zinc-900">
                <div className="max-w-7xl mx-auto">
                    {/* Encabezado */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
                            Servicios <span className="text-[#85d5c8]">Wolf</span>
                        </h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                            Ingeniería de precisión y atención al detalle. Tu vehículo merece el estándar de la manada.
                        </p>
                    </div>

                    {/* Grid de Servicios con Numeración Premium */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:border-[#85d5c8]/50 hover:bg-zinc-900/80 transition-all duration-300 relative overflow-hidden group"
                            >
                                {/* Número de fondo tipo "Watermark" */}
                                <span className="absolute -top-6 -right-4 text-8xl font-black text-zinc-800/30 group-hover:text-[#85d5c8]/10 transition-colors duration-500 select-none">
                                    {service.id}
                                </span>

                                <div className="relative z-10">
                                    <span className="text-[#85d5c8] font-black text-xl mb-4 block">
                  // {service.id}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sección de Agendamiento */}
                    <div className="bg-[#85d5c8] rounded-3xl overflow-hidden relative shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                        <div className="flex flex-col lg:flex-row items-center">
                            <div className="p-10 lg:p-16 lg:w-1/2">
                                <h3 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-6 uppercase tracking-tighter leading-tight">
                                    Agenda tu cita <br />hoy mismo
                                </h3>
                                <p className="text-[#1a1a1a] font-medium mb-8 text-lg">
                                    No dejes para mañana el mantenimiento que tu máquina necesita hoy. Selecciona el servicio y reserva tu cupo en el taller.
                                </p>

                                <div className="space-y-5 mb-10 text-[#1a1a1a] font-bold">
                                    {/* SVG Nativo: Ubicación */}
                                    <div className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        <span className="text-lg">Sede Principal - Wolf Motors Hub</span>
                                    </div>
                                    {/* SVG Nativo: Calendario */}
                                    <div className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                        </svg>
                                        <span className="text-lg">Lunes a Sábado | 8:00 AM - 5:00 PM</span>
                                    </div>
                                </div>

                                <button className="bg-zinc-950 text-white px-10 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-zinc-800 hover:scale-105 transition-all duration-300 shadow-2xl">
                                    Reservar Cupo
                                </button>
                            </div>

                            {/* Imagen del Taller */}
                            <div className="lg:w-1/2 h-72 lg:h-[600px] w-full bg-zinc-900 border-l border-[#85d5c8]">
                                <img
                                    src="/assets/taller-premium.jpg"
                                    alt="Wolf Workshop"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Servicios;