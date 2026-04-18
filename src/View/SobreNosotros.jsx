import React from 'react';
import Navbar from '../Component/Navbar';

function SobreNosotros() {
    return (
        <section className='w-full h-screen bg-[#1a1a1a] overflow-y-auto flex'>
            <Navbar variant="home" />

            <div className='flex-1 ml-25 mt-5 p-10 lg:p-16 flex flex-col justify-center items-start '>

                <div className='flex flex-col gap-6 shadow shadow-[#85d5c8] hover:shadow-[#85d5c8] hover:shadow-lg hover:scale-102 transition-all duration-300 rounded-xl p-8 mt-20 mb-5 w-[100%]'>
                    <h1 className='font-bold text-xl tracking-widest text-[#85d5c8]'>DONDE LA INGENIERÍA COBRA VIDA</h1>
                    <p className='text-[#c2cbd4]'>Wolf Motors Hub nació en la intersección entre la pasión por la ingeniería mecánica y la disciplina del alto rendimiento. No somos un centro automotriz convencional; somos un ecosistema diseñado para quienes entienden que un vehículo no es solo transporte, sino una extensión de su propia ambición.</p>
                    <p className='text-[#c2cbd4]'>Nuestra estructura se divide en tres pilares fundamentales que definen la cultura automotriz global:</p>
                    <ul className='space-y-5 ml-2'>
                        <li className='list-none flex flex-col'>
                            <strong className='text-[#85d5c8] font-extrabold text-lg tracking-wide'>WOLF RAW MUSCLE:</strong>
                            <p className='ml-1 text-[#c2cbd4]'>El culto a la fuerza bruta. Nos especializamos en el torque, el carácter indomable y la durabilidad de los motores americanos. Aquí, el hierro se transforma en potencia pura.</p>
                        </li>
                        <li className='list-none flex flex-col'>
                            <strong className='text-[#85d5c8] font-extrabold text-lg tracking-wide'>WOLF PERFORMANCE:</strong>
                            <p className='ml-1 text-[#c2cbd4]'>La cúspide de la precisión. Dedicado a la ingeniería alemana, donde cada ajuste es quirúrgico y cada componente está diseñado para dominar la Autobahn con sofisticación y velocidad.</p>
                        </li>
                        <li className='list-none flex flex-col'>
                            <strong className='text-[#85d5c8] font-extrabold text-lg tracking-wide'>WOLF REDLINE:</strong>
                            <p className='ml-1 text-[#c2cbd4]'>La mística del asfalto. Enfocado en la cultura JDM y la ingeniería japonesa, donde la agilidad y el potencial infinito de modificación llevan a las máquinas hasta su límite de revoluciones.</p>
                        </li>
                    </ul>
                </div>

                <div className='flex flex-col gap-6 shadow shadow-[#85d5c8] hover:shadow-[#85d5c8] hover:shadow-lg hover:scale-102 transition-all duration-300 rounded-xl p-8 mt-5 mb-10 w-[100%]'>
                    <h2 className='text-2xl font-bold uppercase tracking-wide text-[#85d5c8]'>El Objetivo de la Marca</h2>
                    <p className='text-[#c2cbd4]'>En Wolf Motors Hub, nuestro sistema de trabajo se rige por la mejora continua y la excelencia técnica:</p>
                    <ul className='list-decimal space-y-3 ml-6 text-[#c2cbd4]'>
                        <li><strong className='text-[#85d5c8] font-extrabold text-lg tracking-wide'>Especialización de Élite:</strong> Garantizar que cada máquina reciba un tratamiento específico según su ADN, respetando los estándares más exigentes de cada continente.</li>
                        <li><strong className='text-[#85d5c8] font-extrabold text-lg tracking-wide'>Integración Digital:</strong> Utilizar la tecnología más avanzada para que la gestión de mantenimiento y optimización de tu vehículo sea tan precisa como un código limpio y eficiente.</li>
                        <li><strong className='text-[#85d5c8] font-extrabold text-lg tracking-wide'>Comunidad de Alto Impacto:</strong> Formar un convoy de propietarios que no se conforman con lo estándar y buscan siempre romper sus propios límites.</li>
                        <li><strong className='text-[#85d5c8] font-extrabold text-lg tracking-wide'>Optimización Total:</strong> Desde el ajuste de suspensiones de alto rango hasta el tuning electrónico de precisión, nuestra meta es llevar cada vehículo a su estado óptimo de rendimiento.</li>
                    </ul>
                </div>

                <div className='w-full mb-20 max-w-4xl bg-[#c2cbd4] hover:scale-102 transition-all duration-500 rounded-xl p-8 mx-auto'>
                    <p className='text-center text-xl font-black text-[#1a1a1a] italic leading-tight'>"Fuerza Cruda, Precisión Absoluta, Límite Infinito. En Wolf Motors Hub, no solo cuidamos máquinas; potenciamos legados".</p>
                </div>

            </div>
        </section>
    );
}

export default SobreNosotros;