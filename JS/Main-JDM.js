/* --- Importaciones --- */
import MostrarAutos from "./Filters.js";
import { autos } from "./Data.js";
import { AbrirLogin, CerrarLogin, VolverAlHome } from "./Main.js";
import Swal from "sweetalert2";
import { auth } from '../src/firebase-config.js';
import { ActualizarInterfaz } from './Main.js';

/* --- Estado de la vista actual (Filtros activos) --- */
let filtrosActivosJDM = { brand: "*", category: "*" };

/* --- Lógica de negocio (EL "CORE") --- */
function ActualizarCatalogoJDM() {
    const resultados = MostrarAutos("japoneses", filtrosActivosJDM.brand, filtrosActivosJDM.category);
    PintarTarjetasJDM(resultados);
}

/* --- Interfaz de usuario (RENDERIZADO Y DOM) --- */
export default function AbrirJDM() {
    const content = document.getElementById("Page-JDM");
    const PageHome = document.getElementById("Page-Home");

    if (PageHome) PageHome.style.display = "none";
    if (!content) return; // Validación de seguridad: aborta si no existe el contenedor

    content.style.display = "block";

    // Inyección del layout base optimizado
    content.innerHTML = `
        <section class="Header-JDM" id="Header-JDM">
            <div class="Container-Header-JDM">
                <button class="Button-Nav1-JDM btn-jdm-home">Home</button>
                <button class="Button-Nav2-JDM btn-jdm-login">Login</button>
                <button class="Button-Start-JDM" id="btn-start-jdm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                        <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
                    </svg>
                </button>
            </div>
            <div class="Container-Text-JDM">
                <h1><em>Welcome To JAPAN</em></h1>
            </div>
            <img class="IMG-Container-JDM" src="./Assent/JDM/Hub.jpg" alt="JDM Hub">
        </section>
        
        <section class="Main-JDM" id="Main-JDM">
             <div class="Container-Nav-JDM">
                <button class="Button-Nav-JDM btn-jdm-home">Home</button>
                <h1>Wolf Motors Japon</h1>
                <button class="Button-Nav-JDM btn-jdm-login">Login</button>
             </div>
             <div class="Container-Main-JDM">
                <div class="Container-Title-JDM">
                    <h1><em>DE KATANAS A MOTORES</em></h1>
                    <p class="Container-Parrafo-JDM">Japón no solo fabrica máquinas; forja leyendas. Lo que comenzó en talleres humildes tras la posguerra, se convirtió en una revolución de precisión y disciplina. Desde las rutas nocturnas de la Wangan hasta el dominio en los circuitos del mundo, la filosofía JDM es la búsqueda incansable de la perfección. Aquí, el coche no es un objeto, es una extensión del alma de quien lo conduce. Bienvenidos a la tierra donde la ingeniería se encuentra con el honor</p>
                </div>
                <div class="Container-IMG-JDM">
                    <img src="./Assent/JDM/JDM-Bienvenida.jpg" alt="Historia JDM">
                </div>
             </div>
             <div class="Container-Text-Tarjetas-JDM">
                <h2>Conoce a las leyendas</h2>
             </div>
             
             <section class="Container-Cards-JDM">
                ${generarBotonFiltro("Nissan")}
                ${generarBotonFiltro("Toyota")}
                ${generarBotonFiltro("Honda")}
                ${generarBotonFiltro("Mazda")}
                ${generarBotonFiltro("Subaru")}
                ${generarBotonFiltro("Mitsubishi")}
                ${generarBotonFiltro("Lexus")}
                ${generarBotonFiltro("Acura")}
                ${generarBotonFiltro("Suzuki")}
             </section>
             
             <section class="Container-Footer-JDM">
                <div class="Container-Footer-JDM-1">
                    <div class="Container-Footer-JDM-1-1">
                        <h1>Wolf Motors Hub</h1>
                        <p>El mundo del motor en un solo lugar</p>
                    </div>
                    <div class="Container-Footer-JDM-1-2">
                        <ul>
                            <li>Inicio</li>
                            <li>Wolf Motor Japan</li>
                            <li>Wolf Automobile</li>
                            <li>Wolf Dealer</li>
                        </ul>
                    </div>
                    <div class="Container-Footer-JDM-1-3">
                        <h3>Contacto</h3>
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                        </svg>Instagram</a>
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                        </svg>Linkedin</a>
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                        </svg>GitHub</a>
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                        </svg>Correo</a>
                    </div>
                 </div>
                 <div class="Container-Footer-JDM-2">
                    <p>© 2026 Wolf Motor Hub. Desarrollado por Yorbis Lobo.</p>
                 </div>
             </section>
        </section>
        <section class="ContainerCar-JDM" id="contenedor-cards-jdm" style="display: none;"></section>
    `;

    // Inicialización de eventos
    SetupFiltrosJDM();
    SetupEventosLocalesJDM();
    SearchButton();
    ActualizarInterfaz(auth.currentUser);
}

// Helper para limpiar el HTML de los botones de filtro
function generarBotonFiltro(marca) {
    return `
        <div class="Container-Tarjetas-JDM">
            <img class="img-tarjeta-JDM" src="./Assent/JDM/${marca}.jpg" alt="${marca}">
            <div class="Container-Tarjetas-JDM-Hover">
                <span>${marca}</span>
                <button class="btn-filter-brand-JDM" data-value="${marca}">Ver</button>
            </div>
        </div>
    `;
}

// 1. Función para pintar la rejilla de coches
function PintarTarjetasJDM(lista) {
    const contenedor = document.getElementById("contenedor-cards-jdm");
    if (!contenedor) return;

    contenedor.style.display = "grid";
    contenedor.innerHTML = ""; // Limpieza total antes de repintar

    // Creación del botón para cerrar el catálogo
    const btnCerrarCatalogo = document.createElement('button');
    btnCerrarCatalogo.classList.add('btn-cerrar-catalogo-JDM');
    btnCerrarCatalogo.innerHTML = "&times;";

    btnCerrarCatalogo.addEventListener('click', () => {
        contenedor.style.display = "none";
        document.body.style.overflow = 'auto';
        contenedor.innerHTML = "";
    });

    contenedor.appendChild(btnCerrarCatalogo);

    // Renderizado individual de tarjetas
    lista.forEach(auto => {
        const card = document.createElement('div');
        card.classList.add('card-auto-JDM');

        card.innerHTML = `
            <img class="img-card-auto-JDM" src="${auto.img}" alt="${auto.modelo}">
            <div class="info-car-JDM">
                <h3>${auto.marca} ${auto.modelo}</h3>
                <p class="precio-JDM">${auto.precio}</p>
                <div class="card-auto-btn-JDM">
                    <button class="btn-ver-detalles-JDM">Ver Detalles</button>
                    <button class="btn-comprar-JDM">Comprar</button>
                </div>
            </div>
        `;

        // Asignación de eventos localizados para cada botón
        const btnDetalles = card.querySelector('.btn-ver-detalles-JDM');
        const btnComprar = card.querySelector('.btn-comprar-JDM');

        btnDetalles.addEventListener('click', () => abrirDetallesWolfJDM(auto));
        btnComprar.addEventListener('click', () => AbrirCompraJDM(auto)); // Pasa el auto específico

        contenedor.appendChild(card);
    });

    document.body.style.overflow = 'hidden';
}

// 2. Función para renderizar el Modal de Detalles (Corregido y blindado)
function abrirDetallesWolfJDM(coche) {
    const modalPrevio = document.getElementById('wolf-modal-container-jdm');
    if (modalPrevio) modalPrevio.remove();

    const modalContainer = document.createElement('div');
    modalContainer.id = 'wolf-modal-container-jdm';
    document.body.appendChild(modalContainer);

    modalContainer.innerHTML = `
        <div id="wolf-modal-jdm" class="modal-overlay-JDM">
            <div class="modal-content-JDM">
                <button id="close-modal-jdm" class="close-btn-JDM">&times;</button>
                <div class="modal-grid-JDM">
                    <div class="modal-image-container-JDM">
                        <img src="${coche.img}" alt="${coche.marca} ${coche.modelo}">
                        <div class="info-car-JDM">
                            <h2 class="wolf-title-JDM">${coche.marca} ${coche.modelo}</h2>
                            <p class="wolf-price-JDM">${coche.precio}</p>
                        </div>
                    </div>
                    <div class="modal-specs-JDM">
                        <div class="specs-list-JDM">
                            ${generarSpecItem("Motor", coche.specs)}
                            ${generarSpecItem("Tipo de motor", coche.detail?.tipo_motor)}
                            ${generarSpecItem("Aceleración", coche.detail?.aceleracion)}
                            ${generarSpecItem("Torque", coche.detail?.torque)}
                            ${generarSpecItem("Transmisión", coche.detail?.transmision)}
                            ${generarSpecItem("Tipo de transmisión", coche.detail?.tipo_transmision)}
                            ${generarSpecItem("Frenos", coche.detail?.frenos)}
                            ${generarSpecItem("Consumo", coche.detail?.consumo)}
                            ${generarSpecItem("Medidas", coche.detail?.medidas)}
                            ${generarSpecItem("Seguridad", coche.detail?.seguridad)}
                            ${generarSpecItem("Airbags", coche.detail?.airbags)}
                            ${generarSpecItem("Extra", coche.detail?.extra)}
                            ${generarSpecItem("Categoría", coche.categoria)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Uso de querySelector local para evitar choques de IDs globales
    const btnCerrar = modalContainer.querySelector('#close-modal-jdm');
    const fondoModal = modalContainer.querySelector('#wolf-modal-jdm');

    const cerrarModal = () => modalContainer.remove();

    btnCerrar.addEventListener('click', cerrarModal);

    fondoModal.addEventListener('click', (e) => {
        // Cierra solo si hace click exactamente en el fondo oscuro
        if (e.target === fondoModal) cerrarModal();
    });
}

// 3. Modal de Compra (Optimizado para recibir los datos del auto)
function AbrirCompraJDM(auto) {
    let modalExistente = document.getElementById("Container-compra-JDM");
    if (modalExistente) {
        modalExistente.remove(); // Es mejor removerlo y recrearlo para que cargue el auto correcto cada vez
    }

    // --- LÓGICA MATEMÁTICA ---

    // 1. Limpiamos el precio: quitamos $, comas y espacios. 
    // Si auto.precio es "$30,000", esto lo deja en "30000"
    const numeroLimpio = auto.precio.replace(/[^0-9.-]+/g, "");
    const precioBase = parseFloat(numeroLimpio);

    // 2. Calculamos el total con el 30%
    const precioConImpuestos = precioBase * 1.30;

    // 3. Formateamos el resultado para que vuelva a verse como dinero ($39,000.00)
    const formatoMoneda = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const precioFinalFormateado = formatoMoneda.format(precioConImpuestos);

    // --- RENDERIZADO DEL MODAL ---
    const modalContainer = document.createElement('div');
    modalContainer.id = 'Container-compra-JDM';
    modalContainer.className = 'modal-Compra-JDM';
    document.body.appendChild(modalContainer);

    modalContainer.innerHTML = `
        <div class="Modal-Compra-JDM-content">
            <button id="btn-cerrar-jdm-x" class="close-btn-JDM">&times;</button>
            <div class="Modal-Compra-JDM-image">
                <img src="${auto.img}" alt="${auto.marca} ${auto.modelo}">
                <div class="Modal-Compra-JDM-image-info">
                    <h2 class="Modal-Compra-JDM-title">${auto.marca} ${auto.modelo}</h2>
                    <p class="Modal-Compra-JDM-price-base">Precio FOB: ${auto.precio}</p>
                    <p class="Modal-Compra-JDM-tax">+ 30% Impuestos y Envíos</p>
                    <p class="Modal-Compra-JDM-total">Total: ${precioFinalFormateado}</p>
                </div>
            </div>
            <div class="Modal-Compra-JDM-header">
                <h2 class="Modal-Compra-JDM-title">Confirmar Compra JDM</h2>
            </div>
            <div class="Modal-Compra-JDM-body">
                <p>¿Confirma que desea procesar la adquisición del <strong>${auto.marca} ${auto.modelo}</strong>?</p>
                <p class="text-small">Al proceder, aceptas las políticas de importación de Wolf Motors.</p>
            </div>
            <div class="Modal-Compra-JDM-footer">
                <button id="btn-confirmar-jdm" class="btn-comprar-JDM">Procesar Compra</button>
            </div>
        </div>
    `;

    // --- EVENTOS ---
    const btnCerrarX = modalContainer.querySelector('#btn-cerrar-jdm-x');
    const btnConfirmar = modalContainer.querySelector('#btn-confirmar-jdm');

    const cerrarModal = () => modalContainer.remove();

    btnCerrarX.addEventListener('click', cerrarModal);

    btnConfirmar.addEventListener('click', () => {
        // Aquí podrías enviar precioFinalFormateado a tu base de datos
        cerrarModal();
        Swal.fire({
            title: '¡Compra procesada!',
            text: 'Su compra ha sido exitosa.',
            icon: 'success',
            confirmButtonColor: '#28a745', // Un verde que combine con tu terminal
            background: '#1e1e1e', // Fondo oscuro para que combine con tu ricing
            color: '#fff',
        });
    });

    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) cerrarModal();
    });
}
// Helper para generar los items de las especificaciones de forma segura
function generarSpecItem(label, value) {
    if (!value || value === "undefined") return "";
    return `
        <div class="spec-item-JDM">
            <span class="spec-label-JDM">${label}:</span>
            <span class="spec-value-JDM">${value}</span>
        </div>
    `;
}

/* --- Controladores de eventos (LISTENERS) --- */

function SetupFiltrosJDM() {
    const contenedor = document.getElementById("Page-JDM");
    if (!contenedor) return;

    const botonesMarca = contenedor.querySelectorAll(".btn-filter-brand-JDM");
    botonesMarca.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivosJDM.brand = e.target.dataset.value;
            ActualizarCatalogoJDM();
        });
    });

    const botonesCat = contenedor.querySelectorAll(".btn-filter-category-JDM");
    botonesCat.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivosJDM.category = e.target.dataset.value;
            ActualizarCatalogoJDM();
        });
    });
}

export function SetupEventosLocalesJDM() {
    const botonesHome = document.querySelectorAll(".btn-jdm-home");
    botonesHome.forEach(btn => {
        btn.addEventListener('click', () => {
            VolverAlHome();
            const catalogo = document.getElementById("contenedor-cards-jdm");
            if (catalogo) {
                catalogo.style.display = "none";
                catalogo.innerHTML = "";
            }
            document.body.style.overflow = 'auto';
        });
    });

    const botonesLogin = document.querySelectorAll(".btn-jdm-login");
    botonesLogin.forEach(btn => {
        btn.addEventListener('click', AbrirLogin); // Invocación simplificada
    });
}

function SearchButton() {
    const btnStart = document.querySelector('.Button-Start-JDM');
    const heroSection = document.querySelector('.Header-JDM');
    const historiaSection = document.querySelector('.Main-JDM');

    if (btnStart && heroSection) {
        btnStart.addEventListener('click', () => {
            heroSection.classList.add('subir');
            if (historiaSection) historiaSection.classList.add('visible');
        });
    }
}

/* --- Disparador principal (Navegación Home -> JDM) --- */
const btnJDM = document.getElementById("jdm");
if (btnJDM) {
    btnJDM.addEventListener('click', AbrirJDM);
}

