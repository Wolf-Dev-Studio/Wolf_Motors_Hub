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
                <button class="Button-Nav" id="btn-back-home-jdm">Home</button>
                <h1>Wolf Motors Japon</h1>
                <button class="Button-Nav" id="btn-login-jdm">Login<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg></button>
             </div>
             <div class="Container-Main-JDM">
                <div class="Container-Title-JDM">
                    <h1><em>DE KATANAS A MOTORES</em></h1>
                    <p class="Container-Parrafo-JDM">Japón no solo fabrica máquinas; forja leyendas. Lo que comenzó en talleres humildes tras la posguerra, se convirtió en una revolución de precisión y disciplina. Desde las rutas nocturnas de la Wangan hasta el dominio en los circuitos del mundo, la filosofía JDM es la búsqueda incansable de la perfección. Aquí, el coche no es un objeto, es una extensión del alma de quien lo conduce. Bienvenidos a la tierra donde la ingeniería se encuentra con el honor</p>
                </div>
                <div class="Container-IMG-JDM">
                    <img src="./Assent/JDM/JDM-Bienvenida.jpg" alt="">
                </div>
             </div>
             <div class="Container-Text-Tarjetas-JDM">
                <h2>Conoce a las leyendas</h2>
             </div>
             <section class="Container-Cards-JDM">
                <div class="Container-Tarjetas-JDM">
                    <img class="img-tarjeta" src="./Assent/JDM/Nissan.jpg" alt="">
                    <div class="Container-Tarjetas-JDM-Hover">
                        <span>Nissan</span>
                        <button class="btn-filter-brand" data-value="Nissan">Ver</button>
                    </div>                    
                </div>
                <div class="Container-Tarjetas-JDM">
                    <img class="img-tarjeta" src="./Assent/JDM/Toyota.jpg" alt="">
                    <div class="Container-Tarjetas-JDM-Hover">
                        <span>Toyota</span>
                        <button class="btn-filter-brand" data-value="Toyota">Ver</button>
                    </div>                    
                </div>
                <div class="Container-Tarjetas-JDM">
                    <img class="img-tarjeta" src="./Assent/JDM/Honda.jpg" alt="">
                    <div class="Container-Tarjetas-JDM-Hover">
                        <span>Honda</span>
                        <button class="btn-filter-brand" data-value="Honda">Ver</button>
                    </div>                    
                </div>
                <div class="Container-Tarjetas-JDM">
                    <img class="img-tarjeta" src="./Assent/JDM/Mazda.jpg" alt="">
                    <div class="Container-Tarjetas-JDM-Hover">
                        <span>Mazda</span>
                        <button class="btn-filter-brand" data-value="Mazda">Ver</button>
                    </div>                    
                </div>
                <div class="Container-Tarjetas-JDM">
                    <img class="img-tarjeta" src="./Assent/JDM/Subaru.jpg" alt="">
                    <div class="Container-Tarjetas-JDM-Hover">
                        <span>Subaru</span>
                        <button class="btn-filter-brand" data-value="Subaru">Ver</button>
                    </div>                    
                </div>
                <div class="Container-Tarjetas-JDM">
                    <img class="img-tarjeta" src="./Assent/JDM/Mitsubishi.jpg" alt="">
                    <div class="Container-Tarjetas-JDM-Hover">
                        <span>Mitsubishi</span>
                        <button class="btn-filter-brand" data-value="Mitsubishi">Ver</button>
                    </div>                    
                </div>
                <div class="Container-Tarjetas-JDM">
                    <img class="img-tarjeta" src="./Assent/JDM/lexus.jpg" alt="">
                    <div class="Container-Tarjetas-JDM-Hover">
                        <span>Lexus</span>
                        <button class="btn-filter-brand" data-value="Lexus">Ver</button>
                    </div>                    
                </div>
                <div class="Container-Tarjetas-JDM">
                    <img class="img-tarjeta" src="./Assent/JDM/Acura.jpg" alt="">
                    <div class="Container-Tarjetas-JDM-Hover">
                        <span>Acura</span>
                        <button class="btn-filter-brand" data-value="Acura">Ver</button>
                    </div>                    
                </div>
                <div class="Container-Tarjetas-JDM">
                    <img class="img-tarjeta" src="./Assent/JDM/Suzuki.jpg" alt="">
                    <div class="Container-Tarjetas-JDM-Hover">
                        <span>Suzuki</span>
                        <button class="btn-filter-brand" data-value="Suzuki">Ver</button>
                    </div>                    
                </div>
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
        <section class="ContainerCar" id="contenedor-cards-jdm">
        </section>
    `;

    // Inicialización de eventos y renderizado
    SetupFiltrosJDM();
    SetupEventosLocalesJDM();
    SearchButton()
}

// Función para pintar las tarjetas en el DOM
// 1. Función para pintar la rejilla de coches (El Catálogo)
function PintarTarjetasJDM(lista) {
    const contenedor = document.getElementById("contenedor-cards-jdm");

    if (!contenedor) {
        console.error("No encontré el contenedor 'contenedor-cards-jdm'");
        return;
    }

    // Limpiar y mostrar el catálogo
    contenedor.style.display = "grid";
    contenedor.innerHTML = "";

    // CREAR BOTÓN DE CIERRE (X) DEL CATÁLOGO
    const btnCerrarCatalogo = document.createElement('button');
    btnCerrarCatalogo.classList.add('btn-cerrar-catalogo');
    btnCerrarCatalogo.innerHTML = "&times;";

    btnCerrarCatalogo.addEventListener('click', () => {
        contenedor.style.display = "none";
        document.body.style.overflow = 'auto'; // Devuelve el scroll
        contenedor.innerHTML = "";
    });

    contenedor.appendChild(btnCerrarCatalogo);

    // Renderizar cada tarjeta de coche
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

    // Bloquear scroll mientras el catálogo esté abierto
    document.body.style.overflow = 'hidden';
}

// 2. Función para renderizar el Modal de Detalles (La Ficha Técnica)
function abrirDetallesWolfJDM(coche) {
    // Si ya existe un modal previo, lo eliminamos para evitar duplicados
    const modalPrevio = document.getElementById('wolf-modal-container-jdm');
    if (modalPrevio) modalPrevio.remove();

    const modalContainer = document.createElement('div');
    modalContainer.id = 'wolf-modal-container-jdm';
    document.body.appendChild(modalContainer);

    // Inyectamos el HTML del detalle
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

    // LÓGICA DE CIERRE DEL MODAL
    const btnCerrar = document.getElementById('close-modal-jdm');
    const fondoModal = document.getElementById('wolf-modal-jdm');

    // Al cerrar, eliminamos el nodo del DOM (más limpio que ocultarlo)
    btnCerrar.onclick = () => modalContainer.remove();

    fondoModal.onclick = (e) => {
        if (e.target.id === 'wolf-modal-jdm') {
            modalContainer.remove();
        }
    };
}

// Función auxiliar para evitar errores si falta algún dato en el JSON
function generarSpecItem(label, value) {
    if (!value || value === "undefined") return ""; // Si no hay dato, no imprime la fila
    return `
        <div class="spec-item">
            <span class="spec-label">${label}:</span>
            <span class="spec-value">${value}</span>
        </div>
    `;
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
