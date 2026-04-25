import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const CarDetails = ({ variant }) => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const navigate = useNavigate();
    const [car, setCar] = useState(null);

    const [selectedCarId, setSelectedCarId] = useState(null);


    // SI HAY UN CARRO SELECCIONADO, MUESTRA EL COMPONENTE DETAIL
    if (selectedCarId) {
        return <CarInvoice carId={selectedCarId} onBack={() => setSelectedCarId(null)} />;
    }

    console.log(searchParams)
    console.log(id)

    useEffect(() => {
        console.log("hola")
        const fetchCarData = async () => {
            if (!id) return;
            try {

                const docRef = doc(db, "vehiculos", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCar({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error("No se encontró el documento:", id);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchCarData();
    }, [id]);


    if (!car) return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6">
            <p className="text-xl mb-4">No se pudo cargar la información.</p>
            <button onClick={() => navigate(-1)} className="bg-emerald-600 px-6 py-2 rounded-lg font-bold">Volver</button>
        </div>
    );


    return (
        <div className="h-screen bg-[#121212]  p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Botón Volver usando navigate(-1) */}
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#85d5c8] hover:text-white mb-6 transition-colors">
                    <span>← Volver al Catálogo</span>
                </button>

                <div className={` rounded-2xl overflow-hidden border border-[#85d5c8] bg-[#1a1a1a]`}>
                    <div className="relative h-[300px] md:h-[400px]">
                        <img
                            src={car.img || car.detail?.imagen}
                            alt={car.marca}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Datos mapeados según tu captura de Firebase */}
                        <div className="space-y-4">
                            <h3 className="text-[#85d5c8] font-bold text-xs tracking-widest uppercase border-b border-[#85d5c8] pb-2">RENDIMIENTO</h3>
                            <p className="flex flex-col"><span className="text-zinc-500 text-xs">Aceleración</span><span className="text-white font-bold">{car.detail?.aceleracion || 'N/A'}</span></p>
                            <p className="flex flex-col"><span className="text-zinc-500 text-xs">Frenos</span><span className="text-white font-bold">{car.detail?.frenos || 'N/A'}</span></p>
                            <p className="flex flex-col"><span className="text-zinc-500 text-xs">Consumo</span><span className="text-white font-bold">{car.detail?.consumo || 'N/A'}</span></p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[#85d5c8] font-bold text-xs tracking-widest uppercase border-b border-[#85d5c8] pb-2">MOTOR</h3>
                            <p className="flex flex-col"><span className="text-zinc-500 text-xs">Tipo</span><span className="text-white font-bold">{car.detail?.motor || 'N/A'}</span></p>
                            <p className="flex flex-col"><span className="text-zinc-500 text-xs">Transmisión</span><span className="text-white font-bold">{car.detail?.transmision || 'N/A'}</span></p>
                            <p className="flex flex-col"><span className="text-zinc-500 text-xs">Torque</span><span className="text-white font-bold">{car.detail?.torque || 'N/A'}</span></p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[#85d5c8] font-bold text-xs tracking-widest uppercase border-b border-[#85d5c8] pb-2">ESPECIFICACIONES</h3>
                            <p className="flex flex-col"><span className="text-zinc-500 text-xs">Categoría</span><span className="text-white font-bold">{car.categoria || 'N/A'}</span></p>
                            <p className="flex flex-col"><span className="text-zinc-500 text-xs">Medidas</span><span className="text-white font-bold">{car.detail?.medidas || 'N/A'}</span></p>
                            <p className="flex flex-col"><span className="text-zinc-500 text-xs">Seguridad</span><span className="text-white font-bold">{car.detail?.seguridad || 'N/A'}</span></p>
                        </div>
                    </div>
                    <div>
                        <Link to={`/Compra?id=${car.origen + '_' + car.id}`} className="bg-[#85d5c8] text-[#1a1a1a] font-bold px-6 py-3 rounded-lg w-full flex items-center justify-center">Comprar Vehiculo</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;