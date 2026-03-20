// =========================================================
// 1. IMPORTACIONES Y ESTADO GLOBAL (CONFIGURACIÓN DE MOTOR)
// =========================================================
import MostrarAutos from "./Filters.js";
import { autos } from "./Data.js";

// Estado de la vista actual (Filtros activos)
let filtrosActivosJDM = { brand: "*", category: "*" };

// =========================================================
// 2. LÓGICA DE NEGOCIO (EL "CORE")
// =========================================================
function ActualizarCatalogoJDM() {
    const resultados = MostrarAutos("japoneses", filtrosActivosJDM.brand, filtrosActivosJDM.category);
    PintarTarjetasJDM(resultados);
}

// =========================================================
// 3. INTERFAZ DE USUARIO (RENDERIZADO Y DOM)
// =========================================================

// Función principal para cargar la página JDM
function AbrirJDM() {
    const content = document.getElementById("Page-JDM");
    const PageHome = document.getElementById("Page-Home");

    if (PageHome) PageHome.style.display = "none";
    if (content) content.style.display = "block";

    // Inyección de la UI Premium exacta que diseñaste
    content.innerHTML = `
        <section class="Header-JDM" id="Header-JDM">
            <div class="Container-Header-JDM">
                <button class="Button-Nav1" id="btn-back-home-jdm">Home</button>
                <button class="Button-Start-JDM" id="btn-start-jdm"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                    <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/></svg></button>
                <button class="Button-Nav2" id="btn-login-jdm">Login<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg></button>
            </div>
            <div class="Container-Text-JDM">
                <h1><em>Welcome To JAPAN</em></h1>
            </div>
            <img class="IMG-Container-JDM" src="./Assent/JDM/Hub.jpg" alt="">
        </section>
        <section class="Main-JDM" id="Main-JDM">
             <div class="Container-Nav-JDM">
                <button class="Button-Nav1" id="btn-back-home-jdm">Home</button>
                <button class="Button-Nav2" id="btn-login-jdm">Login<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg></button>
             </div>
             <div class="Container-Main-JDM">
                <div class="Container-Title-JDM">
                    <h1><em>DE KATANAS A MOTORES</em></h1>
                </div>
                <div class="Container-Parrafo-JDM">
                    <p>Japón no solo fabrica máquinas; forja leyendas. Lo que comenzó en talleres humildes tras la posguerra, se convirtió en una revolución de precisión y disciplina. Desde las rutas nocturnas de la Wangan hasta el dominio en los circuitos del mundo, la filosofía JDM es la búsqueda incansable de la perfección. Aquí, el coche no es un objeto, es una extensión del alma de quien lo conduce. Bienvenidos a la tierra donde la ingeniería se encuentra con el honor</p>
                </div>
             </div>
        </section>
    `;

    // Inicialización de eventos y renderizado
    SetupFiltrosJDM();
    PintarTarjetasJDM(autos.japoneses);
    SetupEventosLocalesJDM();
    SearchButton()
}

// Función para pintar las tarjetas en el DOM
export function PintarTarjetasJDM(lista) {
    const contenedor = document.getElementById("contenedor-cards-jdm");

    if (!contenedor) {
        console.error("No encontré el contenedor 'contenedor-cards-jdm'");
        return;
    }

    contenedor.innerHTML = "";

    lista.forEach(auto => {
        const card = document.createElement('div');
        card.classList.add('card-auto');

        card.innerHTML = `
            <img class="img-card-auto" src="${auto.img}" alt="${auto.modelo}">
            <div class="info-car">
                <h3>${auto.marca} ${auto.modelo}</h3>
                <p class="precio">${auto.precio}</p>
                <button class="btn-ver-detalles">Ver Detalles</button>
            </div>
        `;

        const btnDetalles = card.querySelector('.btn-ver-detalles');
        btnDetalles.addEventListener('click', () => {
            abrirDetallesWolfJDM(auto);
        });

        contenedor.appendChild(card);
    });
}

// Función para renderizar el Modal Completo
function abrirDetallesWolfJDM(coche) {
    let modalContainer = document.getElementById('wolf-modal-container-jdm');

    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'wolf-modal-container-jdm';
        document.body.appendChild(modalContainer);
    }

    modalContainer.innerHTML = `
        <div id="wolf-modal-jdm" class="modal-overlay">
            <div class="modal-content">
                <button id="close-modal-jdm" class="close-btn">&times;</button>
                
                <div class="modal-grid">
                    <div class="modal-image-container">
                        <img src="${coche.img}" alt="${coche.marca} ${coche.modelo}">
                        <div class="info-car">
                            <h2 class="wolf-title">${coche.marca} ${coche.modelo}</h2>
                            <p class="wolf-price">${coche.precio}</p>
                        </div>
                    </div>
                    
                    <div class="modal-specs">
                        <div class="specs-list">
                            <div class="spec-item">
                                <span class="spec-label">Motor:</span>
                                <span class="spec-value">${coche.specs}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Tipo de motor:</span>
                                <span class="spec-value">${coche.detail.tipo_motor}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Aceleración:</span>
                                <span class="spec-value">${coche.detail.aceleracion}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Torque:</span>
                                <span class="spec-value">${coche.detail.torque}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Transmisión:</span>
                                <span class="spec-value">${coche.detail.transmision}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Tipo de transmisión:</span>
                                <span class="spec-value">${coche.detail.tipo_transmision}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Frenos:</span>
                                <span class="spec-value">${coche.detail.frenos}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Consumo:</span>
                                <span class="spec-value">${coche.detail.consumo}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Medidas:</span>
                                <span class="spec-value">${coche.detail.medidas}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Seguridad:</span>
                                <span class="spec-value">${coche.detail.seguridad}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Airbags:</span>
                                <span class="spec-value">${coche.detail.airbags}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Extra:</span>
                                <span class="spec-value">${coche.detail.extra}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Categoría:</span>
                                <span class="spec-value">${coche.categoria}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const btnCerrar = document.getElementById('close-modal-jdm');
    const fondoModal = document.getElementById('wolf-modal-jdm');

    btnCerrar.onclick = () => modalContainer.innerHTML = '';
    fondoModal.onclick = (e) => {
        if (e.target.id === 'wolf-modal-jdm') modalContainer.innerHTML = '';
    };
}

// =========================================================
// 4. CONTROLADORES DE EVENTOS (LISTENERS)
// =========================================================

function SetupFiltrosJDM() {
    const botonesMarca = document.querySelectorAll("#Page-JDM .btn-filter-brand");
    botonesMarca.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivosJDM.brand = e.target.dataset.value;
            ActualizarCatalogoJDM();
        });
    });

    const botonesCat = document.querySelectorAll("#Page-JDM .btn-filter-category");
    botonesCat.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivosJDM.category = e.target.dataset.value;
            ActualizarCatalogoJDM();
        });
    });
}

function SetupEventosLocalesJDM() {
    // Usamos querySelectorAll por si hay múltiples botones "Home" con el mismo ID en el HTML inyectado
    const botonesBack = document.querySelectorAll("#btn-back-home-jdm");
    botonesBack.forEach(btn => {
        btn.addEventListener('click', () => window.location.reload());
    });
}

// Disparador principal (Navegación Home -> JDM)
const btnJDM = document.getElementById("jdm");
if (btnJDM) {
    btnJDM.addEventListener('click', () => {
        AbrirJDM();
    });
}

function SearchButton() {
    let btnStart = document.getElementById('btn-start-jdm');

    if (!btnStart) {
        btnStart = document.querySelector('.Button-Start-JDM');
    }

    const heroSection = document.querySelector('.Header-JDM');
    const historiaSection = document.querySelector('.Main-JDM');

    if (btnStart && heroSection) {
        console.log("✅ Sistema de transición Wolf detectado y listo.");

        btnStart.addEventListener('click', () => {
            console.log("🚀 Iniciando despegue JDM...");

            heroSection.classList.add('subir');
            if (historiaSection) {
                historiaSection.classList.add('visible');
            }
        });
    } else {
        // Esto solo saldrá si realmente no hay rastro del botón en el HTML
        console.warn("⚠️ Wolf Info: El botón de inicio no está presente en esta página.");
    }
}

// =========================================================
// 5. EXPORTACIONES (APIs PÚBLICAS DEL MÓDULO)
// =========================================================
export default AbrirJDM;
