import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';

const CarDetails = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlId = searchParams.get('id');
    const urlOrigen = searchParams.get('origen');

    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCarData = async () => {
            if (!urlId || !urlOrigen) return;
            try {
                setLoading(true);
                const numericId = parseInt(urlId, 10);
                const vehiculosRef = collection(db, "vehiculos");
                const q = query(
                    vehiculosRef,
                    where("id", "==", numericId),
                    where("origen", "==", urlOrigen)
                );

                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0];
                    setCar({ firebase_id: docData.id, ...docData.data() });
                }
            } catch (error) {
                console.error("Error en la telemetría:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCarData();
    }, [urlId, urlOrigen]);

    if (loading) return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center">
            <p className="text-[#85d5c8] animate-pulse font-bold tracking-widest">ESCANEANDO VEHÍCULO...</p>
        </div>
    );

    if (!car) return (
        <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-6">
            <p className="text-xl mb-4 font-bold uppercase tracking-tighter">Máquina no encontrada</p>
            <button onClick={() => navigate(-1)} className="border border-[#85d5c8] text-[#85d5c8] px-6 py-2 rounded-full font-bold hover:bg-[#85d5c8] hover:text-black transition-all">
                VOLVER AL TALLER
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#121212] p-4 md:p-8 font-sans text-white">
            <div className="max-w-6xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#85d5c8] hover:text-white mb-8 transition-colors font-bold text-xs tracking-widest">
                    <span>← VOLVER AL CATÁLOGO</span>
                </button>

                <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-[#1a1a1a] shadow-2xl">
                    {/* Imagen Principal */}
                    <div className="relative h-[300px] md:h-[500px]">
                        <img
                            src={car.img || car.detail?.imagen}
                            alt={car.marca}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#1a1a1a] to-transparent">
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">{car.marca} {car.modelo}</h1>
                        </div>
                    </div>

                    {/* Especificaciones Técnicas */}
                    <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-zinc-800">
                        <div className="space-y-4">
                            <h3 className="text-[#85d5c8] font-black text-[10px] tracking-[0.3em] uppercase border-b border-zinc-800 pb-2">RENDIMIENTO</h3>
                            <p className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase font-bold">Aceleración</span><span className="text-white font-mono text-lg">{car.detail?.aceleracion || 'N/A'}</span></p>
                            <p className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase font-bold">Frenos</span><span className="text-white font-mono text-lg">{car.detail?.frenos || 'N/A'}</span></p>
                            <p className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase font-bold">Consumo</span><span className="text-white font-mono text-lg">{car.detail?.consumo || 'N/A'}</span></p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[#85d5c8] font-black text-[10px] tracking-[0.3em] uppercase border-b border-zinc-800 pb-2">MOTORIZACIÓN</h3>
                            <p className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase font-bold">Configuración</span><span className="text-white font-mono text-lg">{car.detail?.motor || 'N/A'}</span></p>
                            <p className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase font-bold">Transmisión</span><span className="text-white font-mono text-lg">{car.detail?.transmision || 'N/A'}</span></p>
                            <p className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase font-bold">Torque Max</span><span className="text-white font-mono text-lg">{car.detail?.torque || 'N/A'}</span></p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[#85d5c8] font-black text-[10px] tracking-[0.3em] uppercase border-b border-zinc-800 pb-2">DIMENSIONES</h3>
                            <p className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase font-bold">Chasis</span><span className="text-white font-mono text-lg">{car.categoria || 'N/A'}</span></p>
                            <p className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase font-bold">Medidas</span><span className="text-white font-mono text-lg">{car.detail?.medidas || 'N/A'}</span></p>
                            <p className="flex flex-col"><span className="text-zinc-500 text-[10px] uppercase font-bold">Seguridad</span><span className="text-white font-mono text-lg">{car.detail?.seguridad || 'N/A'}</span></p>
                        </div>
                    </div>

                    {/* Footer de Acción de Compra */}
                    <div className="p-8 bg-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Precio Final Wolf Motor</p>
                            <p className="text-4xl font-black text-[#85d5c8]">{car.precio}</p>
                        </div>

                        {/* 🔥 CORRECCIÓN DEL LINK: Usamos car.id y car.origen apuntando a la Factura */}
                        <Link
                            to={`/Compra?id=${car.id}&origen=${car.origen}`}
                            className="bg-[#85d5c8] text-black font-black px-12 py-5 rounded-2xl w-full md:w-auto flex items-center justify-center uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-lg shadow-[#85d5c8]/20 active:scale-95"
                        >
                            Comprar Vehículo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;