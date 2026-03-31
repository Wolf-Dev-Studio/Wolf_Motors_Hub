/* --- Importaciones --- */
import MostrarAutos from "./Filters.js";
import { autos } from "./Data.js";
import { AbrirLogin, CerrarLogin, VolverAlHome } from "./Main.js";
import Swal from "sweetalert2";
import { auth } from '../src/firebase-config.js';
import { ActualizarInterfaz } from './Main.js';

/* --- Estado de la vista actual (Filtros activos) --- */
let filtrosActivosUSA = { brand: "*", category: "*" };

/* --- Lógica de negocio (EL "CORE") --- */
function ActualizarCatalogoUSA() {
    const resultados = MostrarAutos("americanos", filtrosActivosUSA.brand, filtrosActivosUSA.category);
    PintarTarjetasUSA(resultados);
}

/* --- Interfaz de usuario (RENDERIZADO Y DOM) --- */
export default function AbrirUSA() {
    const content = document.getElementById("Page-USA");
    const PageHome = document.getElementById("Page-Home");

    if (PageHome) PageHome.style.display = "none";
    if (!content) return;

    content.style.display = "block";

    content.innerHTML = `
        <section class="Header-USA" id="Header-USA">
            <div class="Container-Header-USA">
                <button class="Button-Nav1-USA btn-usa-home">Home</button>
                <button class="Button-Nav2-USA btn-usa-login">Login</button>
                <button class="Button-Start-USA" id="btn-start-usa">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                        <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
                    </svg>
                </button>
            </div>
            <div class="Container-Text-USA">
                <h1><em>Welcome To THE USA</em></h1>
            </div>
            <img class="IMG-Container-USA" src="./Assent/USA/" alt="USA Hub">
        </section>
        
        <section class="Main-USA" id="Main-USA">
             <div class="Container-Nav-USA">
                <button class="Button-Nav-USA btn-usa-home">Home</button>
                <h1>Wolf Automobile</h1>
                <button class="Button-Nav-USA btn-usa-login">Login</button>
             </div>
             <div class="Container-Main-USA">
                <div class="Container-Title-USA">
                    <h1><em>MÚSCULO Y POTENCIA PURA</em></h1>
                    <p class="Container-Parrafo-USA">Estados Unidos no solo ensambla autos; forja carácter sobre ruedas. Desde los V8 rugiendo en las rectas de Detroit hasta los clásicos que definieron una era de rebeldía y libertad. Aquí no hay sutilezas, solo caballos de fuerza brutos, tracción trasera y el sonido inconfundible del poder americano. Bienvenidos a la cuna del Muscle Car.</p>
                </div>
                <div class="Container-IMG-USA">
                    <img src="./Assent/USA/Dodge-Home.jpg" alt="Historia USA">
                </div>
             </div>
             <div class="Container-Text-Tarjetas-USA">
                <h2>Conoce a las leyendas</h2>
             </div>
             
             <section class="Container-Cards-USA">
                ${generarBotonFiltro("Ford")}
                ${generarBotonFiltro("Chevrolet")}
                ${generarBotonFiltro("Dodge")}
                ${generarBotonFiltro("Jeep")}
                ${generarBotonFiltro("Cadillac")}
                ${generarBotonFiltro("Pontiac")}
                ${generarBotonFiltro("GMC")}
                ${generarBotonFiltro("Chrysler")}
             </section>
             
             <section class="Container-Footer-USA">
                <div class="Container-Footer-USA-1">
                    <div class="Container-Footer-USA-1-1">
                        <h1>Wolf Motors Hub</h1>
                        <p>El mundo del motor en un solo lugar</p>
                    </div>
                    <div class="Container-Footer-USA-1-2">
                        <ul>
                            <li>Inicio</li>
                            <li>Wolf Motor Japan</li>
                            <li>Wolf Automobile</li>
                            <li>Wolf Dealer</li>
                        </ul>
                    </div>
                    <div class="Container-Footer-USA-1-3">
                        <h3>Contacto</h3>
                        <a href="#">Instagram</a>
                        <a href="#">Linkedin</a>
                        <a href="#">GitHub</a>
                        <a href="#">Correo</a>
                    </div>
                 </div>
                 <div class="Container-Footer-USA-2">
                    <p>© 2026 Wolf Motor Hub. Desarrollado por Yorbis Lobo.</p>
                 </div>
             </section>
        </section>
        <section class="ContainerCar-USA" id="contenedor-cards-usa" style="display: none;"></section>
    `;

    SetupFiltrosUSA();
    SetupEventosLocalesUSA();
    SearchButton();
    ObservadorUsuario();
    ActualizarInterfaz(auth.currentUser);
}

function generarBotonFiltro(marca) {
    return `
        <div class="Container-Tarjetas-USA">
            <img class="img-tarjeta-USA" src="./Assent/USA/${marca}.jpg" alt="${marca}">
            <div class="Container-Tarjetas-USA-Hover">
                <span>${marca}</span>
                <button class="btn-filter-brand-USA" data-value="${marca}">Ver</button>
            </div>
        </div>
    `;
}

function PintarTarjetasUSA(lista) {
    const contenedor = document.getElementById("contenedor-cards-usa");
    if (!contenedor) return;

    contenedor.style.display = "grid";
    contenedor.innerHTML = "";

    const btnCerrarCatalogo = document.createElement('button');
    btnCerrarCatalogo.classList.add('btn-cerrar-catalogo-USA');
    btnCerrarCatalogo.innerHTML = "&times;";

    btnCerrarCatalogo.addEventListener('click', () => {
        contenedor.style.display = "none";
        document.body.style.overflow = 'auto';
        contenedor.innerHTML = "";
    });

    contenedor.appendChild(btnCerrarCatalogo);

    lista.forEach(auto => {
        const card = document.createElement('div');
        card.classList.add('card-auto-USA');

        card.innerHTML = `
            <img class="img-card-auto-USA" src="${auto.img}" alt="${auto.modelo}">
            <div class="info-car-USA">
                <h3>${auto.marca} ${auto.modelo}</h3>
                <p class="precio-USA">${auto.precio}</p>
                <div class="card-auto-btn-USA">
                    <button class="btn-ver-detalles-USA">Ver Detalles</button>
                    <button class="btn-comprar-USA">Comprar</button>
                </div>
            </div>
        `;

        const btnDetalles = card.querySelector('.btn-ver-detalles-USA');
        const btnComprar = card.querySelector('.btn-comprar-USA');

        btnDetalles.addEventListener('click', () => abrirDetallesWolfUSA(auto));
        btnComprar.addEventListener('click', () => AbrirCompraUSA(auto));

        contenedor.appendChild(card);
    });

    document.body.style.overflow = 'hidden';
}

function abrirDetallesWolfUSA(coche) {
    const modalPrevio = document.getElementById('wolf-modal-container-usa');
    if (modalPrevio) modalPrevio.remove();

    const modalContainer = document.createElement('div');
    modalContainer.id = 'wolf-modal-container-usa';
    document.body.appendChild(modalContainer);

    modalContainer.innerHTML = `
        <div id="wolf-modal-usa" class="modal-overlay-USA">
            <div class="modal-content-USA">
                <button id="close-modal-usa" class="close-btn-USA">&times;</button>
                <div class="modal-grid-USA">
                    <div class="modal-image-container-USA">
                        <img src="${coche.img}" alt="${coche.marca} ${coche.modelo}">
                        <div class="info-car-USA">
                            <h2 class="wolf-title-USA">${coche.marca} ${coche.modelo}</h2>
                            <p class="wolf-price-USA">${coche.precio}</p>
                        </div>
                    </div>
                    <div class="modal-specs-USA">
                        <div class="specs-list-USA">
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

    const btnCerrar = modalContainer.querySelector('#close-modal-usa');
    const fondoModal = modalContainer.querySelector('#wolf-modal-usa');
    const cerrarModal = () => modalContainer.remove();

    btnCerrar.addEventListener('click', cerrarModal);
    fondoModal.addEventListener('click', (e) => {
        if (e.target === fondoModal) cerrarModal();
    });
}

function AbrirCompraUSA(auto) {
    let modalExistente = document.getElementById("Container-compra-USA");
    if (modalExistente) modalExistente.remove();

    const numeroLimpio = auto.precio.replace(/[^0-9.-]+/g, "");
    const precioBase = parseFloat(numeroLimpio);
    const precioConImpuestos = precioBase * 1.30;
    const formatoMoneda = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const precioFinalFormateado = formatoMoneda.format(precioConImpuestos);

    const modalContainer = document.createElement('div');
    modalContainer.id = 'Container-compra-USA';
    modalContainer.className = 'modal-Compra-USA';
    document.body.appendChild(modalContainer);

    modalContainer.innerHTML = `
        <div class="Modal-Compra-USA-content">
            <button id="btn-cerrar-usa-x" class="close-btn-USA">&times;</button>
            <div class="Modal-Compra-USA-image">
                <img src="${auto.img}" alt="${auto.marca} ${auto.modelo}">
                <div class="Modal-Compra-USA-image-info">
                    <h2 class="Modal-Compra-USA-title">${auto.marca} ${auto.modelo}</h2>
                    <p class="Modal-Compra-USA-price-base">Precio FOB: ${auto.precio}</p>
                    <p class="Modal-Compra-USA-tax">+ 30% Impuestos y Envíos</p>
                    <p class="Modal-Compra-USA-total">Total: ${precioFinalFormateado}</p>
                </div>
            </div>
            <div class="Modal-Compra-USA-header">
                <h2 class="Modal-Compra-USA-title">Confirmar Compra USA</h2>
            </div>
            <div class="Modal-Compra-USA-body">
                <p>¿Confirma que desea procesar la adquisición del <strong>${auto.marca} ${auto.modelo}</strong>?</p>
                <p class="text-small">Al proceder, aceptas las políticas de importación de Wolf Automobile.</p>
            </div>
            <div class="Modal-Compra-USA-footer">
                <button id="btn-confirmar-usa" class="btn-comprar-USA">Procesar Compra</button>
            </div>
        </div>
    `;

    const btnCerrarX = modalContainer.querySelector('#btn-cerrar-usa-x');
    const btnConfirmar = modalContainer.querySelector('#btn-confirmar-usa');
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
        <div class="spec-item-USA">
            <span class="spec-label-USA">${label}:</span>
            <span class="spec-value-USA">${value}</span>
        </div>
    `;
}

function SetupFiltrosUSA() {
    const contenedor = document.getElementById("Page-USA");
    if (!contenedor) return;

    const botonesMarca = contenedor.querySelectorAll(".btn-filter-brand-USA");
    botonesMarca.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivosUSA.brand = e.target.dataset.value;
            ActualizarCatalogoUSA();
        });
    });

    const botonesCat = contenedor.querySelectorAll(".btn-filter-category-USA");
    botonesCat.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivosUSA.category = e.target.dataset.value;
            ActualizarCatalogoUSA();
        });
    });
}

export function SetupEventosLocalesUSA() {
    const botonesHome = document.querySelectorAll(".btn-usa-home");
    botonesHome.forEach(btn => {
        btn.addEventListener('click', () => {
            VolverAlHome();
            const catalogo = document.getElementById("contenedor-cards-usa");
            if (catalogo) {
                catalogo.style.display = "none";
                catalogo.innerHTML = "";
            }
            document.body.style.overflow = 'auto';
        });
    });

    const botonesLogin = document.querySelectorAll(".btn-usa-login");
    botonesLogin.forEach(btn => btn.addEventListener('click', AbrirLogin));
}

function SearchButton() {
    const btnStart = document.querySelector('.Button-Start-USA');
    const heroSection = document.querySelector('.Header-USA');
    const historiaSection = document.querySelector('.Main-USA');

    if (btnStart && heroSection) {
        btnStart.addEventListener('click', () => {
            heroSection.classList.add('subir');
            if (historiaSection) historiaSection.classList.add('visible');
        });
    }
}

const btnUSA = document.getElementById("usa");
if (btnUSA) btnUSA.addEventListener('click', AbrirUSA);

