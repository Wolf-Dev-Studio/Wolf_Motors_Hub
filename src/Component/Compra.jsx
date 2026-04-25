import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useNavigate } from 'react-router-dom';

const CarInvoice = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarData = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const docRef = doc(db, "vehiculos", car.origen, car.id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCar({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error("No se encontró el documento:", id);
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCarData();
    }, [id]); // Agregamos [id] como dependencia

    // --- LÓGICA DE PRECIOS ---
    // Buscamos el precio en car.precio o en car.detail.precio
    const rawPrice = car?.precio || car?.detail?.precio || 0;
    const basePrice = typeof rawPrice === 'string'
        ? parseFloat(rawPrice.replace(/[^0-9.]/g, ''))
        : parseFloat(rawPrice);

    const taxes = basePrice * 0.15;
    const shipping = 500;
    const total = basePrice + taxes + shipping;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Si está cargando, mostramos un mensaje para no mostrar valores en 0
    if (loading) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <p className="text-[#85d5c8] animate-pulse font-bold">CARGANDO FACTURA...</p>
            </div>
        );
    }

    // Si no hay carro tras cargar
    if (!car) {
        return (
            <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-white">
                <p className="mb-4">No se encontró la información del vehículo.</p>
                <button onClick={() => navigate(-1)} className="bg-[#85d5c8] text-black px-4 py-2 rounded">Volver</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121212] p-4 md:p-8 font-sans text-white">
            <div className="max-w-2xl mx-auto">
                {/* Encabezado */}
                <div className="flex justify-between items-end mb-8 border-b border-[#85d5c8] pb-4">
                    <div>
                        <h1 className="text-[#85d5c8] text-3xl font-bold tracking-tighter uppercase">Factura de Compra</h1>
                        <p className="text-zinc-500 text-sm">Resumen de transacción</p>
                    </div>
                    <div className="text-right">
                        <p className="text-zinc-500 text-xs uppercase tracking-widest">ID Vehículo</p>
                        <p className="font-mono text-[#85d5c8] text-xs">{car.id}</p>
                    </div>
                </div>

                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-6 md:p-8">
                        {/* Preview del Vehículo */}
                        <div className="flex items-center gap-6 mb-8 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                            <img
                                src={car.img || car.detail?.imagen}
                                alt={car.marca}
                                className="w-24 h-24 object-cover rounded-lg border border-zinc-700"
                            />
                            <div>
                                <h2 className="text-xl font-bold">{car.marca}</h2>
                                <p className="text-zinc-400 text-sm">{car.categoria}</p>
                                <p className="text-[#85d5c8] text-xs mt-1 font-mono uppercase">{car.detail?.motor}</p>
                            </div>
                        </div>

                        {/* Desglose */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-zinc-400">
                                <span>Precio del Vehículo</span>
                                <span className="text-white font-medium">{formatCurrency(basePrice)}</span>
                            </div>
                            <div className="flex justify-between items-center text-zinc-400">
                                <span>Impuestos (15%)</span>
                                <span className="text-white font-medium">{formatCurrency(taxes)}</span>
                            </div>
                            <div className="flex justify-between items-center text-zinc-400">
                                <span>Gastos de Envío</span>
                                <span className="text-white font-medium">{formatCurrency(shipping)}</span>
                            </div>

                            <hr className="border-zinc-800 my-6" />

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-[#85d5c8] tracking-widest uppercase text-xs">Total a Pagar</span>
                                <span className="text-3xl font-black text-white">
                                    {formatCurrency(total)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-zinc-900/30 border-t border-zinc-800">
                        <button
                            className="w-full bg-[#85d5c8] hover:bg-[#6ebfb2] text-[#121212] font-black py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 uppercase tracking-widest"
                            onClick={() => alert('¡Gracias por su compra!')}
                        >
                            Confirmar y Comprar
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full mt-4 text-zinc-500 hover:text-white text-xs transition-colors uppercase tracking-widest"
                        >
                            Cancelar Operación
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarInvoice;