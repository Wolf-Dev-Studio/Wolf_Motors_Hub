import { title } from 'framer-motion/client';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const News = (props) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);


    const { variant } = props;

    const stylesConfig = {
        americanos: {
            Fondo: "bg-[#121212]",
            textColor: "text-white",
            shadow: "#B22222",
            titleColor: "text-[#B22222]",

        },
        europeos: {
            Fondo: "bg-gradient-to-t from-[#1E272E] to-[#F5F6FA]",
            titleColor: "text-[#00CEC9]",
            shadow: "#00CEC9",
            textColor: "text-[#1E272E]",
        },
        asiaticos: {
            Fondo: "bg-[#DFE6E9]",
            textColor: "text-[#2D3436]",
            shadow: "#D3B037",
            titleColor: "text-[#D3B037]",
        }
    };


    const currentStyle = stylesConfig[variant];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // 🛡️ SEGURIDAD: En React (si usas Vite), las variables de entorno se llaman así.
                // Crea un archivo .env en la raíz de tu proyecto y pon: VITE_NEWS_API_KEY=tu_llave
                const API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'TU_API_KEY_AQUI';
                const NEWS_URL = `https://newsapi.org/v2/everything?q=autos OR automotive OR motor&language=es&sortBy=publishedAt&pageSize=3&apiKey=${API_KEY}`;

                const response = await fetch(NEWS_URL);

                if (!response.ok) throw new Error('Error al conectar con la API');

                const data = await response.json();
                setNews(data.articles);
            } catch (error) {
                console.error('Error:', error);
                // Alerta elegante de error
                Swal.fire({
                    icon: 'error',
                    title: 'Falla de Conexión',
                    text: 'No pudimos obtener las noticias del motor. Verifica tu internet.',
                    background: '#1a1a1a',
                    color: '#ffffff',
                    confirmButtonColor: '#e63946' // Rojo Wolf
                });
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []); // El array vacío asegura que esto solo corra una vez al cargar la página

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 w-full">
                <p className="text-gray-400 animate-pulse text-lg tracking-widest uppercase">
                    Cargando últimas noticias...
                </p>
            </div>
        );
    }

    return (
        <section className={`${currentStyle.Fondo} py-16 px-4`}>
            <h2 className={`${currentStyle.textColor} text-3xl font-bold mb-10 text-center uppercase tracking-wider`}>
                Noticias Del <span className={`${currentStyle.titleColor}`}>Dia</span>
            </h2>

            {/* Grid Responsive: 1 columna en móvil, 3 en escritorio */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((article, index) => {
                    // Fallbacks por si la API no trae algún dato
                    const imageUrl = article.urlToImage || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800';
                    const authorName = article.author || article.source.name || 'Redacción Wolf';
                    const sourceName = article.source.name || 'Automotive';
                    const readTime = Math.ceil((article.description?.length || 800) / 200) + ' min read';

                    // Formateo de fecha
                    const formattedDate = new Date(article.publishedAt).toLocaleDateString('es-ES', {
                        month: 'short', day: 'numeric', year: 'numeric'
                    });

                    return (
                        <div key={index} className={`bg-[#111111] rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:-translate-y-2 hover:border-gray-700 flex flex-col`}>
                            <img src={imageUrl} alt={article.title} className="w-full h-52 object-cover" loading="lazy" />

                            <div className="p-6 flex flex-col flex-grow">
                                <span className={`text-xs font-bold ${currentStyle.titleColor} uppercase tracking-wider mb-3`}>
                                    {sourceName}
                                </span>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="group">
                                    <h3 className={`text-xl font-bold text-white mb-3 line-clamp-2`}>
                                        {article.title}
                                    </h3>
                                </a>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                                    {article.description || 'Haz clic para leer la noticia completa en la fuente original.'}
                                </p>
                                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-800">
                                    <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-sm">
                                        {authorName.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white text-sm font-medium">{authorName}</span>
                                        <span className="text-gray-500 text-xs">{formattedDate} · {readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default News;