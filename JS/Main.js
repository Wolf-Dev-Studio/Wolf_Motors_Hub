import AbrirUSA from "./Main-USA.js";
import AbrirJDM from "./Main-JDM.js";
import AbrirEURO from "./Main-EURO.js";

// =========================================================
// 1. GESTIÓN DEL MODAL DE BIENVENIDA
// =========================================================
const modalBienvenida = document.querySelector(".Modal-Bienvenida");
const btnAceptarBienvenida = document.getElementById("btn-aceptar");

if (btnAceptarBienvenida) {
    btnAceptarBienvenida.addEventListener("click", () => {
        modalBienvenida.style.display = "none";
        // Opcional: Guardar en localStorage para que no salga siempre
        // localStorage.setItem('bienvenidaVista', 'true');
    });
}

// =========================================================
// 2. LÓGICA DEL LOGIN (Exportada para usar en JDM/USA/EURO)
// =========================================================
export function AbrirLogin() {
    const modal = document.getElementById("Modal-Login");
    if (modal) modal.style.display = "block";
}

export function CerrarLogin() {
    const modal = document.getElementById("Modal-Login");
    if (modal) modal.style.display = "none";
}

// Asignar evento al botón de Login del HOME (el del ID nuevo que sugerimos)
const btnHomeLogin = document.getElementById("btn-home-login");
if (btnHomeLogin) {
    btnHomeLogin.addEventListener("click", AbrirLogin);
}

// Asignar evento al botón de cerrar del Modal Login
const btnCerrarLogin = document.getElementById("btn-cerrar-login");
if (btnCerrarLogin) {
    btnCerrarLogin.addEventListener("click", CerrarLogin);
}

// =========================================================
// 3. NAVEGACIÓN SPA (Cambio de Secciones)
// =========================================================

// --- Navegación SPA en Main.js ---

const btnJDM = document.getElementById("jdm");
if (btnJDM) {
    btnJDM.addEventListener("click", () => {
        // Ocultamos Home y abrimos JDM
        document.getElementById("Page-Home").style.display = "none";
        AbrirJDM();
    });
}

// Función para VOLVER AL HOME (Agrégala o actualiza la que tienes)
export function VolverAlHome() {
    // 1. Ocultar todas las páginas secundarias
    document.getElementById("Page-JDM").style.display = "none";
    document.getElementById("Page-USA").style.display = "none";
    document.getElementById("Page-EURO").style.display = "none";

    // 2. Mostrar el Home
    const home = document.getElementById("Page-Home");
    home.style.display = "flex";

    // 3. LIMPIEZA TÉCNICA: Quitamos las clases de animación de JDM
    // Esto evita que el layout se rompa como en tu captura
    const headerJDM = document.querySelector('.Header-JDM');
    if (headerJDM) {
        headerJDM.classList.remove('subir');
    }

    const mainJDM = document.querySelector('.Main-JDM');
    if (mainJDM) {
        mainJDM.classList.remove('visible');
    }

    console.log("🏠 Home restaurado correctamente.");
}

// Cerrar modal de login si se hace clic fuera del contenido
window.onclick = function (event) {
    const modal = document.getElementById("Modal-Login");
    if (event.target == modal) {
        CerrarLogin();
    }
}