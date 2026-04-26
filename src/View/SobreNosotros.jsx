import React from 'react';
import Navbar from '../Component/Navbar';
import { useNavigate } from 'react-router-dom';

function SobreNosotros() {
    const navigate = useNavigate();
    return (
        <section className='w-full min-h-screen bg-[#1a1a1a] overflow-x-hidden'>
            <Navbar variant="home" />

            {/* CONTENEDOR PRINCIPAL - Ajustado el margen por la Navbar lateral si existe */}
            <div className='flex flex-col gap-20 p-6 lg:p-20 max-w-7xl mx-auto'>
                <div>
                    <button onClick={() => navigate(-1)} className="flex flex-row items-center gap-3  text-[#85d5c8] hover:text-white transition-all duration-300 px-8 py-3 font-bold uppercase text-xs tracking-widest">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="20" d="M21 12h-17.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.9s" values="20;0" /></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M3 12l7 7M3 12l7 -7"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.6s" to="0" /></path></g></svg> Volver
                    </button>
                </div>
                <h1 className='text-4xl font-bold uppercase tracking-widest text-center text-[#85d5c8]'>El origen de Wolf Motors Hub</h1>

                {/* --- SECCIÓN 1: INGENIERÍA & RAW MUSCLE (IMAGEN IZQUIERDA) --- */}
                <div className='flex flex-col md:flex-row items-center gap-10 group'>
                    <div className='w-full md:w-1/2 overflow-hidden rounded-xl shadow-lg shadow-[#85d5c8]/20'>
                        <img
                            src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800"
                            alt="American Muscle"
                            className='w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700'
                        />
                    </div>
                    <div className='w-full md:w-1/2 space-y-6'>
                        <h1 className='font-bold text-3xl tracking-widest text-[#85d5c8] uppercase'>Donde la ingeniería cobra vida</h1>
                        <p className='text-[#c2cbd4] leading-relaxed'>Wolf Motors Hub nació en la intersección entre la pasión por la ingeniería mecánica y la disciplina del alto rendimiento.</p>
                        <div className='p-6 border-l-2 border-[#85d5c8] bg-black/20'>
                            <strong className='text-[#85d5c8] font-extrabold text-xl tracking-wide uppercase'>WOLF RAW MUSCLE</strong>
                            <p className='mt-2 text-[#c2cbd4] italic'>El culto a la fuerza bruta. Aquí el hierro se transforma en potencia pura, especializándonos en el torque y carácter americano.</p>
                        </div>
                    </div>
                </div>

                {/* --- SECCIÓN 2: PERFORMANCE (IMAGEN DERECHA) --- */}
                <div className='flex flex-col md:flex-row-reverse items-center gap-10 group'>
                    <div className='w-full md:w-1/2 overflow-hidden rounded-xl shadow-lg shadow-[#85d5c8]/20'>
                        <img
                            src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800"
                            alt="European Performance"
                            className='w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700'
                        />
                    </div>
                    <div className='w-full md:w-1/2 space-y-6'>
                        <div className='p-6 border-r-2 border-[#85d5c8] bg-black/20 text-right'>
                            <strong className='text-[#85d5c8] font-extrabold text-xl tracking-wide uppercase'>WOLF PERFORMANCE</strong>
                            <p className='mt-2 text-[#c2cbd4] italic'>La cúspide de la precisión quirúrgica alemana. Componentes diseñados para dominar la Autobahn con sofisticación.</p>
                        </div>
                        <p className='text-[#c2cbd4] leading-relaxed text-right'>Entendemos que un vehículo no es solo transporte, sino una extensión de tu propia ambición y precisión técnica.</p>
                    </div>
                </div>

                {/* --- SECCIÓN 3: REDLINE (IMAGEN ARRIBA) --- */}
                <div className='flex flex-col gap-8 group'>
                    <div className='w-full h-[300px] md:h-[500px] overflow-hidden rounded-xl shadow-lg shadow-[#85d5c8]/20'>
                        <img
                            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200"
                            alt="JDM Redline"
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000'
                        />
                    </div>
                    <div className='max-w-3xl mx-auto text-center space-y-4'>
                        <strong className='text-[#85d5c8] font-extrabold text-2xl tracking-widest uppercase'>WOLF REDLINE</strong>
                        <p className='text-[#c2cbd4] text-lg'>La mística del asfalto y cultura JDM. Ingeniería japonesa donde la agilidad y el potencial infinito de modificación llevan a las máquinas hasta su límite.</p>
                    </div>
                </div>

                {/* --- SECCIÓN 4: OBJETIVOS & QUOTE (SIN IMAGEN) --- */}
                <div className='grid md:grid-cols-2 gap-10 py-20 border-t border-[#85d5c8]/20'>
                    <div className='space-y-8'>
                        <h2 className='text-3xl font-bold uppercase tracking-widest text-[#85d5c8]'>Objetivos de la Marca</h2>
                        <ul className='space-y-6 text-[#c2cbd4]'>
                            <li className='flex gap-4'>
                                <span className='text-[#85d5c8] font-black'>01</span>
                                <p><strong className='text-white uppercase'>Especialización de Élite:</strong> Tratamiento específico según el ADN de cada máquina.</p>
                            </li>
                            <li className='flex gap-4'>
                                <span className='text-[#85d5c8] font-black'>02</span>
                                <p><strong className='text-white uppercase'>Integración Digital:</strong> Gestión de mantenimiento mediante tecnología de vanguardia.</p>
                            </li>
                            <li className='flex gap-4'>
                                <span className='text-[#85d5c8] font-black'>03</span>
                                <p><strong className='text-white uppercase'>Comunidad:</strong> Un convoy de propietarios que rompen sus propios límites.</p>
                            </li>
                        </ul>
                    </div>

                    <div className='flex items-center justify-center'>
                        <div className='bg-[#c2cbd4] p-10 rounded-xl rotate-1 group hover:rotate-0 transition-transform duration-500'>
                            <p className='text-center text-2xl font-black text-[#1a1a1a] italic leading-tight uppercase'>
                                "Fuerza Cruda, Precisión Absoluta, Límite Infinito. <br />
                                <span className='text-sm font-bold opacity-75'>Potenciamos legados.</span>"
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default SobreNosotros;