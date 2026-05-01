import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CarInvoice = () => {
    const Alert = () => {
        Swal.fire({
            title: "¡Gracias por tu compra!",
            text: "En breve nuestro equipo se pondra en contacto contigo para agendar el envio",
            icon: "success",
            confirmButtonText: "Entendido",
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            background: "#1a1a1a",
            color: "#fff",
            confirmButtonColor: "#85d5c8",
        })
    }
    const searchParams = new URLSearchParams(window.location.search);
    const idParam = searchParams.get('id');
    const origenParam = searchParams.get('origen');

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarData = async () => {
            // Verificación de seguridad: si no hay parámetros, abortamos
            if (!idParam || !origenParam) {
                console.error("Faltan parámetros en la URL");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                // 1. Referencia a la colección principal
                const vehiculosRef = collection(db, "vehiculos");

                // 2. Query buscando por los campos internos que definimos en el Catálogo
                const q = query(
                    vehiculosRef,
                    where("id", "==", parseInt(idParam, 10)), // Convertimos a número
                    where("origen", "==", origenParam)
                );

                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0];
                    setCar({ firebase_id: docData.id, ...docData.data() });
                } else {
                    console.error("Vehículo no encontrado en la base de datos.");
                }
            } catch (error) {
                console.error("Error en la telemetría de base de datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCarData();
    }, [idParam, origenParam]);

    // --- LÓGICA DE PRECIOS OPTIMIZADA ---
    // Usamos useMemo o simples constantes protegidas por el encadenamiento opcional (?.)
    const rawPrice = car?.precio || car?.detail?.precio || "0";
    const basePrice = typeof rawPrice === 'string'
        ? parseFloat(rawPrice.replace(/[^0-9.]/g, ''))
        : parseFloat(rawPrice);

    const taxes = basePrice * 0.15;
    const shipping = 500;
    const total = basePrice + taxes + shipping;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { // Usamos en-US para formato $1,000.00
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center font-black tracking-[0.2em]">
                <p className="text-[#85d5c8] animate-pulse text-xl">SINCRONIZANDO FACTURA...</p>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-white p-6 text-center">
                <div className="w-20 h-20 border-2 border-red-600 rounded-full flex items-center justify-center mb-6">
                    <span className="text-red-600 text-4xl font-bold">!</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 uppercase">Error de Localización</h2>
                <p className="text-zinc-500 mb-8 max-w-xs">No pudimos encontrar la máquina en los registros de Wolf Motor Hub.</p>
                <button onClick={() => navigate(-1)} className="border border-white/20 hover:bg-white hover:text-black transition-all px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest">
                    Regresar al Taller
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121212] p-4 md:p-8 font-sans text-white selection:bg-[#85d5c8] selection:text-black">
            <div className="max-w-2xl mx-auto">
                {/* Encabezado */}
                <div className="flex justify-between items-end mb-8 border-b border-[#85d5c8]/30 pb-6">
                    <div>
                        <h1 className="text-[#85d5c8] text-4xl font-black tracking-tighter uppercase leading-none">Compra</h1>
                        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mt-2">Wolf Motor Hub</p>
                    </div>
                    <div className="text-right">
                        <p className="text-zinc-500 text-[9px] uppercase tracking-widest">V-Unit Code</p>
                        <p className="font-mono text-[#85d5c8] text-sm">#{car.id}-{car.origen?.substring(0, 3).toUpperCase()}</p>
                    </div>
                </div>

                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="p-6 md:p-10">
                        {/* Preview del Vehículo */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 p-5 bg-zinc-900/80 rounded-2xl border border-zinc-800">
                            <img src={car.img || car.detail?.imagen} alt={car.marca} className="w-full sm:w-32 h-32 object-cover rounded-xl border border-zinc-700 shadow-lg" />
                            <div className="text-center sm:text-left">
                                <span className="text-[10px] bg-[#85d5c8] text-black px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
                                    {car.origen}
                                </span>
                                <h2 className="text-2xl font-black mt-2 tracking-tight">{car.marca} {car.modelo}</h2>
                                <p className="text-zinc-500 text-xs font-mono mt-1">{car.detail?.motor} // {car.categoria}</p>
                            </div>
                        </div>

                        {/* Desglose de Costos */}
                        <div className="space-y-5 px-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-500 uppercase tracking-widest text-[11px]">Precio Neto</span>
                                <span className="text-white font-mono">{formatCurrency(basePrice)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-500 uppercase tracking-widest text-[11px]">IVA / Impuesto (15%)</span>
                                <span className="text-white font-mono">{formatCurrency(taxes)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-500 uppercase tracking-widest text-[11px]">Tarifa de Envío Wolf</span>
                                <span className="text-white font-mono">{formatCurrency(shipping)}</span>
                            </div>

                            <div className="pt-6 mt-6 border-t border-zinc-800 flex justify-between items-center">
                                <span className="text-[#85d5c8] font-black uppercase text-xs tracking-[0.2em]">Monto Total</span>
                                <span className="text-4xl font-black text-white tracking-tighter">
                                    {formatCurrency(total)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="p-8 bg-zinc-900/50 border-t border-zinc-800">
                        <button
                            className="w-full bg-[#85d5c8] hover:bg-white text-[#121212] font-black py-5 rounded-2xl transition-all duration-500 shadow-lg shadow-[#85d5c8]/10 uppercase tracking-[0.2em] text-sm"
                            onClick={Alert} >
                            Finalizar Orden
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full mt-6 text-zinc-600 hover:text-red-500 text-[10px] transition-colors uppercase tracking-[0.3em] font-bold" >
                            Abortar Transacción
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarInvoice;