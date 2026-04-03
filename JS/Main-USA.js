/* --- Importaciones --- */
import MostrarAutos from "./Filters.js";
import { autos } from "./Data.js";
import { AbrirLogin, CerrarLogin, VolverAlHome } from "./Main.js";
//import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"
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

