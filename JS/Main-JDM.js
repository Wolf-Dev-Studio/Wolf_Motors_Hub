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
                        <a href="#">Instagram</a>
                        <a href="#">Linkedin</a>
                        <a href="#">GitHub</a>
                        <a href="#">Correo</a>
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
    ObservadorUsuario();
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

