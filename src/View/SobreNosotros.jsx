import React from 'react';
import NavbarHome from '../Component/Navbar-Home';

function SobreNosotros() {
    return (
        <section className='w-full h-screen bg-[#030f0f] overflow-y-auto flex'>
            <NavbarHome />

            {/* Contenedor Principal de Contenido (Flex-1) */}
            <div className='flex-1 ml-25 p-10 lg:p-16 flex flex-col justify-center items-start '>

                {/* Seccion 1: Nuestra Historia */}
                <div className='flex flex-col gap-6 shadow-lg shadow-emerald-600/70 bg-[#000000] rounded-xl p-8 mt-20 mb-5 w-[100%]'>

                    <h1 className='font-bold text-xl uppercase tracking-widest text-emerald-600'>
                        Donde todo los motores cobran vida
                    </h1>

                    <p className='text-zinc-300'>
                        Wolf Motors Hub nació en la intersección entre la pasión por la ingeniería mecánica y la disciplina del alto rendimiento. No somos un centro automotriz convencional; somos un ecosistema diseñado para quienes entienden que un vehículo no es solo transporte, sino una extensión de su propia ambición.
                    </p>

                    <p className='text-zinc-300'>
                        Nuestra estructura se divide en tres pilares fundamentales que definen la cultura automotriz global:
                    </p>

                    {/* LISTA CORREGIDA Y ESTILIZADA */}
                    <ul className='space-y-5 ml-2'>
                        <li className='list-none flex flex-col'>
                            <strong className='text-emerald-600 font-extrabold text-lg tracking-wide'>
                                Wolf Raw Muscle:
                            </strong>
                            <p className='ml-1 text-zinc-300'>
                                El culto a la fuerza bruta. Nos especializamos en el torque, el carácter indomable y la durabilidad de los motores americanos. Aquí, el hierro se transforma en potencia pura.
                            </p>
                        </li>

                        <li className='list-none flex flex-col'>
                            <strong className='text-emerald-600 font-extrabold text-lg tracking-wide'>
                                Wolf Performance:
                            </strong>
                            <p className='ml-1 text-zinc-300'>
                                La cúspide de la precisión. Dedicado a la ingeniería alemana, donde cada ajuste es quirúrgico y cada componente está diseñado para dominar la Autobahn con sofisticación y velocidad.
                            </p>
                        </li>

                        <li className='list-none flex flex-col'>
                            <strong className='text-emerald-600 font-extrabold text-lg tracking-wide'>
                                Wolf Redline:
                            </strong>
                            <p className='ml-1 text-zinc-300'>
                                La mística del asfalto. Enfocado en la cultura JDM y la ingeniería japonesa, donde la agilidad y el potencial infinito de modificación llevan a las máquinas hasta su límite de revoluciones.
                            </p>
                        </li>
                    </ul>

                </div>

                {/* Seccion 2: El Objetivo de la Marca */}
                <div className='flex flex-col gap-6 bg-[#000000] shadow-lg shadow-emerald-600/50 rounded-xl p-8 mt-5 mb-10 w-[100%]'>

                    <h2 className='text-2xl font-bold uppercase tracking-wide text-emerald-600'>
                        El Objetivo de la Marca
                    </h2>

                    <p className='text-zinc-300'>
                        En Wolf Motors Hub, nuestro sistema de trabajo se rige por la mejora continua y la excelencia técnica:
                    </p>

                    <ul className='list-decimal space-y-3 ml-6 text-zinc-300'>
                        <li>
                            <strong className='text-emerald-600 font-extrabold text-lg tracking-wide'>Especialización de Élite:</strong> Garantizar que cada máquina reciba un tratamiento específico según su ADN, respetando los estándares más exigentes de cada continente.
                        </li>
                        <li>
                            <strong className='text-emerald-600 font-extrabold text-lg tracking-wide'>Integración Digital:</strong> Utilizar la tecnología más avanzada para que la gestión de mantenimiento y optimización de tu vehículo sea tan precisa como un código limpio y eficiente.
                        </li>
                        <li>
                            <strong className='text-emerald-600 font-extrabold text-lg tracking-wide'>Comunidad de Alto Impacto:</strong> Formar un convoy de propietarios que no se conforman con lo estándar y buscan siempre romper sus propios límites.
                        </li>
                        <li>
                            <strong className='text-emerald-600 font-extrabold text-lg tracking-wide'>Optimización Total:</strong> Desde el ajuste de suspensiones de alto rango hasta el tuning electrónico de precisión, nuestra meta es llevar cada vehículo a su estado óptimo de rendimiento.
                        </li>
                    </ul>

                </div>

                {/* Cita de Cierre - El "Commit" final */}
                <div className='w-full mt-5 mb-20 max-w-4xl mx-auto'>
                    <p className='text-center text-xl font-black text-zinc-400 italic leading-tight'>
                        "Fuerza Cruda, Precisión Absoluta, Límite Infinito. En Wolf Motors Hub, no solo cuidamos máquinas; potenciamos legados".
                    </p>
                </div>

            </div>
        </section>
    );
}

export default SobreNosotros;