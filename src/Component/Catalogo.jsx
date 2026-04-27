import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase.js'; // Ajusta la ruta según tu proyecto
import { collection, getDocs } from 'firebase/firestore';
import Navbar from './Navbar.jsx';
import { Link } from 'react-router-dom';

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
                    firebase_id: doc.id, // Guardamos el ID de Firebase por si acaso
                    ...doc.data() // Mantenemos tu id numérico intacto
                }));
                setVehiculos(datos);
                setCargando(false);
            } catch (error) {
                console.error("Error al traer las máquinas: ", error);
                setCargando(false);
            }
        };
        obtenerDatos();
    }, []);

    const vehiculosFiltrados = useMemo(() => {
        return vehiculos.filter(carro => {
            // Aseguramos que variant y carro.origen existan antes de comparar
            const filtroPilar = variant && carro.origen ? variant.includes(carro.origen) : false;
            const filtroMarca = marca === 'Todas' || carro.marca === marca;
            const precioNumerico = Number(carro.precio?.toString().replace(/[^0-9.-]+/g, "") || 0);
            const filtroPrecio = precioNumerico <= precioMax;

            return filtroPilar && filtroMarca && filtroPrecio;
        });
    }, [vehiculos, variant, marca, precioMax]);

    if (cargando) return <div className="min-h-screen bg-[#121212] text-white flex justify-center items-center font-bold tracking-widest">SINCRONIZANDO MOTORES...</div>;

    // 🔥 OPTIMIZACIÓN TAILWIND: Las clases deben estar completas para que no se rompan
    const stylesConfig = {
        americanos: {
            Fondo: "bg-[#121212]",
            NavBg: "bg-[#B22222]",
            texto: "text-white",
            textAccent: "text-[#121212]",
            accentColor: "accent-[#F5F5F5]",
            tarjetColor: "bg-[#C0C0C0]",
            BorderTarjeta: "border-[#B22222]", // Clase completa
            Titletarget: "text-[#B22222]",
            Texttarget: "text-[#121212]",
            HoverButton: "hover:bg-[#121212] hover:text-[#B22222] hover:scale-105 transition-all duration-300",
            borderOutline: "focus:border-[#C0C0C0]", // Clase completa
        },
        europeos: {
            Fondo: "bg-[#121212]",
            NavBg: "bg-[#0984E3]",
            texto: "text-white",
            textAccent: "text-[#121212]",
            accentColor: "accent-[#F5F5F5]",
            tarjetColor: "bg-[#C0C0C0]",
            BorderTarjeta: "border-[#0984E3]",
            Titletarget: "text-[#0984E3]",
            Texttarget: "text-[#121212]",
            HoverButton: "hover:bg-[#121212] hover:text-[#00CEC9] hover:scale-105 transition-all duration-300",
            borderOutline: "focus:border-[#C0C0C0]",
        },
        asiaticos: {
            Fondo: "bg-[#121212]",
            NavBg: "bg-[#D3B037]",
            texto: "text-white",
            textAccent: "text-[#121212]",
            accentColor: "accent-[#F5F5F5]",
            tarjetColor: "bg-[#C0C0C0]",
            BorderTarjeta: "border-[#D3B037]",
            Titletarget: "text-[#2D3436]",
            Texttarget: "text-[#121212]",
            HoverButton: "hover:bg-[#121212] hover:text-[#D3B037] hover:scale-105 transition-all duration-300",
            borderOutline: "focus:border-[#C0C0C0]",
        }
    }

    const styles = stylesConfig[variant] || stylesConfig['americanos'];

    return (
        <>
            <Navbar variant={`catalog${variant}`} />
            <div className={`min-h-screen p-8 pt-28 ${styles.texto} ${styles.Fondo}`}>
                {/* Panel de Filtros */}
                <div className={`flex flex-wrap gap-6 mb-6 p-6 ${styles.NavBg} rounded-xl border border-zinc-800 shadow-lg`}>
                    <div className="flex flex-col gap-2">
                        <label className={`text-xs uppercase tracking-widest ${styles.texto}`}>Marca</label>
                        <select
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            className={`bg-black border border-zinc-700 p-2 rounded text-sm outline-none ${styles.borderOutline} transition-colors`}>
                            <option value="Todas">Todas las Marcas</option>
                            <option value="Ford">Ford</option>
                            <option value="Chevrolet">Chevrolet</option>
                            <option value="Dodge">Dodge</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={`text-xs uppercase tracking-widest ${styles.texto}`}>Categoría</label>
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className={`bg-black border border-zinc-700 p-2 rounded text-sm outline-none ${styles.borderOutline} transition-colors`}
                        >
                            <option value="Todas">Todas</option>
                            <option value="Muscle">Muscle</option>
                            <option value="SUV">SUV</option>
                            <option value="Sport">Sport</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
                        <label className={`text-xs uppercase tracking-widest ${styles.texto} text-center`}>
                            Precio Máximo: <span className={`${styles.textAccent} font-bold`}>${precioMax.toLocaleString()}</span>
                        </label>
                        <input type="range" min="5000" max="20000000" step="5000" value={precioMax} onChange={(e) => setPrecioMax(Number(e.target.value))}
                            className={`w-full ${styles.accentColor} cursor-pointer`}
                        />
                    </div>
                </div>

                {/* Grid de Vehículos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {vehiculosFiltrados.map(carro => (
                        <div key={carro.id} className={`${styles.tarjetColor} p-4 rounded-lg border-2 ${styles.BorderTarjeta} shadow-md hover:shadow-xl transition-shadow`}>
                            <img src={carro.img} alt={carro.modelo} className="w-full h-40 object-cover rounded border border-zinc-400" />

                            <div className="mt-3">
                                <p className={`text-[10px] font-black tracking-widest uppercase ${styles.Titletarget}`}>{carro.marca}</p>
                                <h3 className={`font-bold text-lg leading-tight mt-1 ${styles.Texttarget}`}>{carro.modelo}</h3>

                                <div className={`grid grid-cols-2 gap-2 mt-3 text-[11px] font-medium ${styles.Texttarget}`}>
                                    <span className="flex items-center gap-1">⚙️ {carro.detail?.motor || 'N/A'}</span>
                                    <span className="flex items-center gap-1">🏎️ {carro.detail?.aceleracion || 'N/A'}</span>
                                </div>

                                <div className="flex justify-between items-center mt-5 border-t border-zinc-500/30 pt-4">
                                    <span className={`font-mono font-bold text-lg ${styles.Titletarget}`}>{carro.precio}</span>

                                    {/* 🔥 LA REPARACIÓN PRINCIPAL: Usamos 'carro' y pasamos los parámetros correctos */}
                                    <Link
                                        to={`/Detalle?id=${carro.id}&origen=${carro.origen}`}
                                        className={`bg-white text-black text-[10px] rounded-full px-4 cursor-pointer py-2 font-black tracking-wider shadow-sm ${styles.HoverButton}`}
                                    >
                                        DETALLES
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {vehiculosFiltrados.length === 0 && (
                    <div className="text-center py-20 bg-zinc-900/50 rounded-xl mt-10 border border-zinc-800">
                        <p className="text-zinc-400 tracking-widest font-bold">NO SE ENCONTRARON MÁQUINAS CON ESTOS PARÁMETROS</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Catalogo;