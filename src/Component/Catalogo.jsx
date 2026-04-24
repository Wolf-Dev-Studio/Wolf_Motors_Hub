import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from './Navbar.jsx';
import CarDetails from './Detail.jsx'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';


const Catalogo = ({ variant }) => {
    const [vehiculos, setVehiculos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // NUEVO ESTADO: Guarda el ID del carro seleccionado para ver sus detalles
    const [selectedCarId, setSelectedCarId] = useState(null);

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
            const filtroPilar = variant.includes(carro.origen);
            const filtroMarca = marca === 'Todas' || carro.marca === marca;
            const precioNumerico = Number(carro.precio?.replace(/[^0-9.-]+/g, "") || 0);
            const filtroPrecio = precioNumerico <= precioMax;

            return filtroPilar && filtroMarca && filtroPrecio;
        });
    }, [vehiculos, variant, marca, precioMax]);

    // SI HAY UN CARRO SELECCIONADO, MUESTRA EL COMPONENTE DETAIL
    if (selectedCarId) {
        return <CarDetails carId={selectedCarId} onBack={() => setSelectedCarId(null)} />;
    }

    if (cargando) return <div className="text-white p-10">Sincronizando motores...</div>;

    const stylesConfig = {
        americanos: {
            Fondo: "bg-[#121212]",
            NavBg: "bg-[#B22222]",
            texto: "text-[#FFFFFF]",
            textAccent: "text-[#121212]",
            accentColor: "accent-[#F5F5F5]",
            tarjetColor: "bg-[#C0C0C0]",
            Bordetarjet: "#B22222",
            Titletarget: "text-[#B22222]",
            Texttarget: "text-[#121212]",
            HoverButton: "hover:bg-[#121212] hover:text-[#B22222] hover:scale-105 transition-all duration-300",
            border: "border-[#C0C0C0]",
        },
        europeos: {
            Fondo: "bg-[#121212]",
            NavBg: "bg-[#0984E3]",
            texto: "text-[#FFFFFF]",
            textAccent: "text-[#121212]",
            accentColor: "accent-[#F5F5F5]",
            tarjetColor: "bg-[#C0C0C0]",
            Bordetarjet: "#0984E3",
            Titletarget: "text-[#0984E3]",
            Texttarget: "text-[#121212]",
            HoverButton: "hover:bg-[#121212] hover:text-[#00CEC9] hover:scale-105 transition-all duration-300",
            border: "border-[#C0C0C0]",
        },
        asiaticos: {
            Fondo: "bg-[#121212]",
            NavBg: "bg-[#D3B037]",
            texto: "text-[#FFFFFF]",
            textAccent: "text-[#121212]",
            accentColor: "accent-[#F5F5F5]",
            tarjetColor: "bg-[#C0C0C0]",
            Bordetarjet: "#D3B037",
            Titletarget: "text-[#2D3436]",
            Texttarget: "text-[#121212]",
            HoverButton: "hover:bg-[#121212] hover:text-[#D3B037] hover:scale-105 transition-all duration-300",
            border: "border-[#C0C0C0]",
        }
    }

    const styles = stylesConfig[variant] || stylesConfig['americanos']; // Fallback de seguridad

    return (
        <>
            <Navbar variant={`catalog${variant}`} />
            <div className={`min-h-screen p-8 pt-28 text-white ${styles.Fondo}`}>
                <div className={`flex flex-wrap gap-6 mb-6 p-6 ${styles.NavBg} rounded-xl border border-zinc-800`}>
                    <div className="flex flex-col gap-2">
                        <label className={`text-xs uppercase tracking-widest ${styles.texto}`}>Marca</label>
                        <select
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            className={`bg-black border border-[${styles.border}] p-2 rounded text-sm outline-none focus:${styles.border} transition-colors`}>
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
                            className={`bg-black border border-[${styles.border}] p-2 rounded text-sm outline-none focus:${styles.border} transition-colors`}
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
                        <input type="range" min="5000" max="2000000" step="5000" value={precioMax} onChange={(e) => setPrecioMax(Number(e.target.value))}
                            className={`w-full ${styles.accentColor}`}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {vehiculosFiltrados.map(carro => (
                        <div key={carro.id} className={`${styles.tarjetColor} p-4 rounded-lg border-[2px] border-[${styles.Bordetarjet}]`}>
                            <img src={carro.img} alt={carro.modelo} className="w-full h-40 object-cover rounded" />

                            <div className="mt-3">
                                <p className={`text-[10px] font-bold tracking-widest ${styles.Titletarget}`}>{carro.marca}</p>
                                <h3 className={`font-bold text-lg ${styles.Texttarget}`}>{carro.modelo}</h3>

                                <div className={`grid grid-cols-2 gap-2 mt-2 text-[10px] ${styles.Texttarget}`}>
                                    <span>⚙️ {carro.detail?.motor}</span>
                                    <span>🏎️ {carro.detail?.aceleracion}</span>
                                </div>

                                <div className="flex justify-between items-center mt-4 border-t border-zinc-800 pt-3">
                                    <span className={`font-mono ${styles.Titletarget}`}>{carro.precio}</span>
                                    <Link
                                        to={`/Detalle?id=${carro.origen + '_' + carro.id}`}
                                        className={`bg-white text-black text-[9px] rounded-full px-3 cursor-pointer py-1 font-bold ${styles.HoverButton}`}
                                    >
                                        DETALLES
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {vehiculosFiltrados.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-zinc-500 tracking-widest">NO SE ENCONTRARON MÁQUINAS CON ESOS PARÁMETROS</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Catalogo;