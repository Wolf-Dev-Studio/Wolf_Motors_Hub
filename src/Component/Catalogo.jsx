import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from './Navbar.jsx';

const Catalogo = ({ variant }) => {
    const [vehiculos, setVehiculos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [marca, setMarca] = useState('Todas');
    const [categoria, setCategoria] = useState('Todas');
    const [precioMax, setPrecioMax] = useState(200000);
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "vehiculos"));
                const datos = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setVehiculos(datos);
                setCargando(false);
            } catch (error) {
                console.error("Error al traer los motores: ", error);
                setCargando(false);
            }
        };
        obtenerDatos();
    }, []);

    const vehiculosFiltrados = useMemo(() => {
        return vehiculos.filter(carro => {
            // Usamos .includes() para que "americanos" coincida con "americano"
            // O simplemente comparamos directamente si los escribes igual
            const filtroPilar = variant.includes(carro.origen);

            const filtroMarca = marca === 'Todas' || carro.marca === marca;

            // Limpiamos el precio "$63,265" a número para comparar con el slider
            const precioNumerico = Number(carro.precio.replace(/[^0-9.-]+/g, ""));
            const filtroPrecio = precioNumerico <= precioMax;

            return filtroPilar && filtroMarca && filtroPrecio;
        });
    }, [vehiculos, variant, marca, precioMax]);

    if (cargando) return <div className="text-white p-10">Sincronizando motores...</div>;

    const stylesConfig = {
        catalogAmericano: {
            Fondo: "bg-[#121212]",
            NavBg: "bg-[#B22222]",
            texto: "text-[#121212]",

        },
        catalogEuropeo: {
            Fondo: "bg-[#0984E3]",
            NavBg: "bg-[#DFE6E9]",

        },
        catalogAsiatico: {
            Fondo: "bg-[#0984E3]",
            NavBg: "bg-[#DFE6E9]",
        }
    }

    const styles = stylesConfig[variant] || stylesConfig.catalogAmericano;

    return (

        <>
            < Navbar variant={`catalog${variant}`} />
            <div className={` min-h-screen p-8 pt-28 text-white ${styles.Fondo}`}>
                <div className={`flex flex-wrap gap-6 mb-6 p-6 ${styles.NavBg} rounded-xl border border-zinc-800`}>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-zinc-500">Marca</label>
                        <select
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            className="bg-black border border-zinc-700 p-2 rounded text-sm outline-none focus:border-[#C0C0C0] transition-colors">
                            <option value="Todas">Todas las Marcas</option>
                            <option value="Ford">Ford</option>
                            <option value="Chevrolet">Chevrolet</option>
                            <option value="Dodge">Dodge</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-zinc-500">Categoría</label>
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="bg-black border border-zinc-700 p-2 rounded text-sm outline-none focus:border-[#C0C0C0] transition-colors"
                        >
                            <option value="Todas">Todas</option>
                            <option value="Muscle">Muscle</option>
                            <option value="SUV">SUV</option>
                            <option value="Sport">Sport</option>
                        </select>
                    </div>

                    {/* Filtro Precio */}
                    <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
                        <label className="text-xs uppercase tracking-widest text-zinc-500 text-center">
                            Precio Máximo: <span className="text-emerald-500">${precioMax.toLocaleString()}</span>
                        </label>
                        <input
                            type="range"
                            min="10000"
                            max="250000"
                            step="5000"
                            value={precioMax}
                            onChange={(e) => setPrecioMax(Number(e.target.value))}
                            className="w-full accent-emerald-500"
                        />
                    </div>
                </div>

                {/* --- GRID DE RESULTADOS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {vehiculosFiltrados.map(carro => (
                        <div key={carro.id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                            <img src={carro.img} alt={carro.modelo} className="w-full h-40 object-cover rounded" />

                            <div className="mt-3">
                                <p className="text-emerald-500 text-[10px] font-bold tracking-widest">{carro.marca}</p>
                                <h3 className="text-white font-bold text-lg">{carro.modelo}</h3>

                                {/* Mostrando datos del mapa 'detail' que creaste */}
                                <div className="grid grid-cols-2 gap-2 mt-2 text-[10px] text-zinc-400">
                                    <span>⚙️ {carro.detail?.motor}</span>
                                    <span>🏎️ {carro.detail?.aceleracion}</span>
                                </div>

                                <div className="flex justify-between items-center mt-4 border-t border-zinc-800 pt-3">
                                    <span className="text-white font-mono">{carro.precio}</span>
                                    <button className="bg-white text-black text-[9px] px-3 py-1 font-bold">DETALLES</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mensaje si no hay resultados */}
                {
                    vehiculosFiltrados.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-zinc-500 tracking-widest">NO SE ENCONTRARON MÁQUINAS CON ESOS PARÁMETROS</p>
                        </div>
                    )
                }
            </div >
        </>
    );
};

export default Catalogo;