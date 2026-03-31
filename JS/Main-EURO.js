/* --- Importaciones --- */
import MostrarAutos from "./Filters.js";
import { autos } from "./Data.js";
import { AbrirLogin, CerrarLogin, VolverAlHome } from "./Main.js";
import Swal from "sweetalert2";
import { auth } from '../src/firebase-config.js';
import { ActualizarInterfaz } from './Main.js';

/* --- Estado de la vista actual (Filtros activos) --- */
let filtrosActivosEURO = { brand: "*", category: "*" };

/* --- Lógica de negocio (EL "CORE") --- */
function ActualizarCatalogoEURO() {
    const resultados = MostrarAutos("europeos", filtrosActivosEURO.brand, filtrosActivosEURO.category);
    PintarTarjetasEURO(resultados);
}

/* --- Interfaz de usuario (RENDERIZADO Y DOM) --- */
export default function AbrirEURO() {
    const content = document.getElementById("Page-EURO");
    const PageHome = document.getElementById("Page-Home");

    if (PageHome) PageHome.style.display = "none";
    if (!content) return;

    content.style.display = "block";

    content.innerHTML = `
        <section class="Header-EURO" id="Header-EURO">
            <div class="Container-Header-EURO">
                <button class="Button-Nav1-EURO btn-euro-home">Home</button>
                <button class="Button-Nav2-EURO btn-euro-login">Login</button>
                <button class="Button-Start-EURO" id="btn-start-euro">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                        <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
                    </svg>
                </button>
            </div>
            <div class="Container-Text-EURO">
                <h1><em>Welcome To EUROPE</em></h1>
            </div>
            <img class="IMG-Container-EURO" src="./Assent/EURO/Hub.jpg" alt="EURO Hub">
        </section>
        
        <section class="Main-EURO" id="Main-EURO">
             <div class="Container-Nav-EURO">
                <button class="Button-Nav-EURO btn-euro-home">Home</button>
                <h1>Wolf Dealer</h1>
                <button class="Button-Nav-EURO btn-euro-login">Login</button>
             </div>
             <div class="Container-Main-EURO">
                <div class="Container-Title-EURO">
                    <h1><em>PRECISIÓN, LUJO Y VELOCIDAD</em></h1>
                    <p class="Container-Parrafo-EURO">Europa es la cuna del automovilismo deportivo y de lujo. Desde la ingeniería milimétrica alemana en la Autobahn, hasta la pasión desbordante del diseño italiano. En Wolf Dealer, cada vehículo representa el pináculo de la aerodinámica y el estatus. Prepárate para conducir obras de arte diseñadas para desafiar los límites de la física.</p>
                </div>
                <div class="Container-IMG-EURO">
                    <img src="./Assent/EURO/EURO-Bienvenida.jpg" alt="Historia EURO">
                </div>
             </div>
             <div class="Container-Text-Tarjetas-EURO">
                <h2>Conoce a las leyendas</h2>
             </div>
             
             <section class="Container-Cards-EURO">
                ${generarBotonFiltro("BMW")}
                ${generarBotonFiltro("Mercedes-Benz")}
                ${generarBotonFiltro("Audi")}
                ${generarBotonFiltro("Porsche")}
                ${generarBotonFiltro("Volkswagen")}
                ${generarBotonFiltro("Ferrari")}
                ${generarBotonFiltro("Lamborghini")}
                ${generarBotonFiltro("Aston Martin")}
             </section>
             
             <section class="Container-Footer-EURO">
                <div class="Container-Footer-EURO-1">
                    <div class="Container-Footer-EURO-1-1">
                        <h1>Wolf Motors Hub</h1>
                        <p>El mundo del motor en un solo lugar</p>
                    </div>
                    <div class="Container-Footer-EURO-1-2">
                        <ul>
                            <li>Inicio</li>
                            <li>Wolf Motor Japan</li>
                            <li>Wolf Automobile</li>
                            <li>Wolf Dealer</li>
                        </ul>
                    </div>
                    <div class="Container-Footer-EURO-1-3">
                        <h3>Contacto</h3>
                        <a href="#">Instagram</a>
                        <a href="#">Linkedin</a>
                        <a href="#">GitHub</a>
                        <a href="#">Correo</a>
                    </div>
                 </div>
                 <div class="Container-Footer-EURO-2">
                    <p>© 2026 Wolf Motor Hub. Desarrollado por Yorbis Lobo.</p>
                 </div>
             </section>
        </section>
        <section class="ContainerCar-EURO" id="contenedor-cards-euro" style="display: none;"></section>
    `;

    SetupFiltrosEURO();
    SetupEventosLocalesEURO();
    SearchButton();
    ObservadorUsuario();
    ActualizarInterfaz(auth.currentUser);
}

function generarBotonFiltro(marca) {
    return `
        <div class="Container-Tarjetas-EURO">
            <img class="img-tarjeta-EURO" src="./Assent/EURO/${marca}.jpg" alt="${marca}">
            <div class="Container-Tarjetas-EURO-Hover">
                <span>${marca}</span>
                <button class="btn-filter-brand-EURO" data-value="${marca}">Ver</button>
            </div>
        </div>
    `;
}

function PintarTarjetasEURO(lista) {
    const contenedor = document.getElementById("contenedor-cards-euro");
    if (!contenedor) return;

    contenedor.style.display = "grid";
    contenedor.innerHTML = "";

    const btnCerrarCatalogo = document.createElement('button');
    btnCerrarCatalogo.classList.add('btn-cerrar-catalogo-EURO');
    btnCerrarCatalogo.innerHTML = "&times;";

    btnCerrarCatalogo.addEventListener('click', () => {
        contenedor.style.display = "none";
        document.body.style.overflow = 'auto';
        contenedor.innerHTML = "";
    });

    contenedor.appendChild(btnCerrarCatalogo);

    lista.forEach(auto => {
        const card = document.createElement('div');
        card.classList.add('card-auto-EURO');

        card.innerHTML = `
            <img class="img-card-auto-EURO" src="${auto.img}" alt="${auto.modelo}">
            <div class="info-car-EURO">
                <h3>${auto.marca} ${auto.modelo}</h3>
                <p class="precio-EURO">${auto.precio}</p>
                <div class="card-auto-btn-EURO">
                    <button class="btn-ver-detalles-EURO">Ver Detalles</button>
                    <button class="btn-comprar-EURO">Comprar</button>
                </div>
            </div>
        `;

        const btnDetalles = card.querySelector('.btn-ver-detalles-EURO');
        const btnComprar = card.querySelector('.btn-comprar-EURO');

        btnDetalles.addEventListener('click', () => abrirDetallesWolfEURO(auto));
        btnComprar.addEventListener('click', () => AbrirCompraEURO(auto));

        contenedor.appendChild(card);
    });

    document.body.style.overflow = 'hidden';
}

function abrirDetallesWolfEURO(coche) {
    const modalPrevio = document.getElementById('wolf-modal-container-euro');
    if (modalPrevio) modalPrevio.remove();

    const modalContainer = document.createElement('div');
    modalContainer.id = 'wolf-modal-container-euro';
    document.body.appendChild(modalContainer);

    modalContainer.innerHTML = `
        <div id="wolf-modal-euro" class="modal-overlay-EURO">
            <div class="modal-content-EURO">
                <button id="close-modal-euro" class="close-btn-EURO">&times;</button>
                <div class="modal-grid-EURO">
                    <div class="modal-image-container-EURO">
                        <img src="${coche.img}" alt="${coche.marca} ${coche.modelo}">
                        <div class="info-car-EURO">
                            <h2 class="wolf-title-EURO">${coche.marca} ${coche.modelo}</h2>
                            <p class="wolf-price-EURO">${coche.precio}</p>
                        </div>
                    </div>
                    <div class="modal-specs-EURO">
                        <div class="specs-list-EURO">
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

    const btnCerrar = modalContainer.querySelector('#close-modal-euro');
    const fondoModal = modalContainer.querySelector('#wolf-modal-euro');
    const cerrarModal = () => modalContainer.remove();

    btnCerrar.addEventListener('click', cerrarModal);
    fondoModal.addEventListener('click', (e) => {
        if (e.target === fondoModal) cerrarModal();
    });
}

function AbrirCompraEURO(auto) {
    let modalExistente = document.getElementById("Container-compra-EURO");
    if (modalExistente) modalExistente.remove();

    const numeroLimpio = auto.precio.replace(/[^0-9.-]+/g, "");
    const precioBase = parseFloat(numeroLimpio);
    const precioConImpuestos = precioBase * 1.30;
    const formatoMoneda = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const precioFinalFormateado = formatoMoneda.format(precioConImpuestos);

    const modalContainer = document.createElement('div');
    modalContainer.id = 'Container-compra-EURO';
    modalContainer.className = 'modal-Compra-EURO';
    document.body.appendChild(modalContainer);

    modalContainer.innerHTML = `
        <div class="Modal-Compra-EURO-content">
            <button id="btn-cerrar-euro-x" class="close-btn-EURO">&times;</button>
            <div class="Modal-Compra-EURO-image">
                <img src="${auto.img}" alt="${auto.marca} ${auto.modelo}">
                <div class="Modal-Compra-EURO-image-info">
                    <h2 class="Modal-Compra-EURO-title">${auto.marca} ${auto.modelo}</h2>
                    <p class="Modal-Compra-EURO-price-base">Precio FOB: ${auto.precio}</p>
                    <p class="Modal-Compra-EURO-tax">+ 30% Impuestos y Envíos</p>
                    <p class="Modal-Compra-EURO-total">Total: ${precioFinalFormateado}</p>
                </div>
            </div>
            <div class="Modal-Compra-EURO-header">
                <h2 class="Modal-Compra-EURO-title">Confirmar Compra EURO</h2>
            </div>
            <div class="Modal-Compra-EURO-body">
                <p>¿Confirma que desea procesar la adquisición del <strong>${auto.marca} ${auto.modelo}</strong>?</p>
                <p class="text-small">Al proceder, aceptas las políticas de importación de Wolf Dealer.</p>
            </div>
            <div class="Modal-Compra-EURO-footer">
                <button id="btn-confirmar-euro" class="btn-comprar-EURO">Procesar Compra</button>
            </div>
        </div>
    `;

    const btnCerrarX = modalContainer.querySelector('#btn-cerrar-euro-x');
    const btnConfirmar = modalContainer.querySelector('#btn-confirmar-euro');
    const cerrarModal = () => modalContainer.remove();

    btnCerrarX.addEventListener('click', cerrarModal);
    btnConfirmar.addEventListener('click', () => {
        cerrarModal();
        Swal.fire({
            title: '¡Compra procesada!',
            text: 'Su compra ha sido exitosa.',
            icon: 'success',
            confirmButtonColor: '#28a745',
            background: '#1e1e1e',
            color: '#fff',
        });
    });

    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) cerrarModal();
    });
}

function generarSpecItem(label, value) {
    if (!value || value === "undefined") return "";
    return `
        <div class="spec-item-EURO">
            <span class="spec-label-EURO">${label}:</span>
            <span class="spec-value-EURO">${value}</span>
        </div>
    `;
}

function SetupFiltrosEURO() {
    const contenedor = document.getElementById("Page-EURO");
    if (!contenedor) return;

    const botonesMarca = contenedor.querySelectorAll(".btn-filter-brand-EURO");
    botonesMarca.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivosEURO.brand = e.target.dataset.value;
            ActualizarCatalogoEURO();
        });
    });

    const botonesCat = contenedor.querySelectorAll(".btn-filter-category-EURO");
    botonesCat.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivosEURO.category = e.target.dataset.value;
            ActualizarCatalogoEURO();
        });
    });
}

export function SetupEventosLocalesEURO() {
    const botonesHome = document.querySelectorAll(".btn-euro-home");
    botonesHome.forEach(btn => {
        btn.addEventListener('click', () => {
            VolverAlHome();
            const catalogo = document.getElementById("contenedor-cards-euro");
            if (catalogo) {
                catalogo.style.display = "none";
                catalogo.innerHTML = "";
            }
            document.body.style.overflow = 'auto';
        });
    });

    const botonesLogin = document.querySelectorAll(".btn-euro-login");
    botonesLogin.forEach(btn => btn.addEventListener('click', AbrirLogin));
}

function SearchButton() {
    const btnStart = document.querySelector('.Button-Start-EURO');
    const heroSection = document.querySelector('.Header-EURO');
    const historiaSection = document.querySelector('.Main-EURO');

    if (btnStart && heroSection) {
        btnStart.addEventListener('click', () => {
            heroSection.classList.add('subir');
            if (historiaSection) historiaSection.classList.add('visible');
        });
    }
}

const btnEURO = document.getElementById("euro");
if (btnEURO) btnEURO.addEventListener('click', AbrirEURO);