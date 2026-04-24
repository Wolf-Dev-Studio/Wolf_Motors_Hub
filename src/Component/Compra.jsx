import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useNavigate, useLocation } from 'react-router-dom';


const CarInvoice = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const [car, setCar] = useState(null);
    const navigate = useNavigate();

    // Cálculos ficticios basados en el precio del coche
    // Asumiendo que car.precio es un número o string numérico
    const basePrice = parseFloat(car?.precio) || 0;
    const taxes = basePrice * 0.15; // 15% de impuestos
    const shipping = 500; // Costo fijo de envío
    const total = basePrice + taxes + shipping;

    // Función para formatear moneda
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };


    useEffect(() => {
        console.log("hola")
        const fetchCarData = async () => {
            if (!id) return;
            try {
                //setLoading(true);
                // Buscamos directamente el documento "americanos_1"
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
    }, []);

    return (
        <div className="min-h-screen bg-[#121212] p-4 md:p-8 font-sans text-white">
            <div className="max-w-2xl mx-auto">
                {/* Encabezado */}
                <div className="flex justify-between items-end mb-8 border-b border-[#85d5c8] pb-4">
                    <div>
                        <h1 className="text-[#85d5c8] text-3xl font-bold tracking-tighter">FACTURA DE COMPRA</h1>
                        <p className="text-zinc-500 text-sm">Resumen de transacción</p>
                    </div>
                    <div className="text-right">
                        <p className="text-zinc-500 text-xs">ID Vehículo</p>
                        <p className="font-mono text-[#85d5c8]">{car?.id || 'N/A'}</p>
                    </div>
                </div>

                {/* Contenedor Principal */}
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-6 md:p-8">
                        {/* Detalles del Vehículo */}
                        <div className="flex items-center gap-6 mb-8 p-4 bg-zinc-900/50 rounded-xl">
                            <img
                                src={car?.img || car?.detail?.imagen}
                                alt={car?.marca}
                                className="w-24 h-24 object-cover rounded-lg border border-zinc-700"
                            />
                            <div>
                                <h2 className="text-xl font-bold">{car?.marca}</h2>
                                <p className="text-zinc-400">{car?.categoria}</p>
                                <p className="text-[#85d5c8] text-sm">{car?.detail?.motor}</p>
                            </div>
                        </div>

                        {/* Desglose de Precios */}
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
                                <span className="text-lg font-bold text-[#85d5c8]">TOTAL A PAGAR</span>
                                <span className="text-3xl font-black text-white">
                                    {formatCurrency(total)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Botón de Acción */}
                    <div className="p-6 bg-zinc-900/30 border-t border-zinc-800">
                        <button
                            className="w-full bg-[#85d5c8] hover:bg-[#6ebfb2] text-[#121212] font-black py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 uppercase tracking-widest"
                            onClick={() => alert('Procesando pago...')}
                        >
                            Confirmar y Comprar
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full mt-4 text-zinc-500 hover:text-white text-sm transition-colors"
                        >
                            Cancelar Operación
                        </button>
                    </div>
                </div>

                {/* Footer de la factura */}
                <p className="mt-8 text-center text-zinc-600 text-xs px-10">
                    Al hacer clic en "Confirmar y Comprar", aceptas los términos de servicio y las políticas de importación de vehículos vigentes.
                </p>
            </div>
        </div>
    );
};

export default CarInvoice;