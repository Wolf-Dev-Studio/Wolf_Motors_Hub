/* --- IMPORTACIONES --- */
import AbrirUSA from "./Main-USA.js";
import AbrirJDM from "./Main-JDM.js";
import AbrirEURO from "./Main-EURO.js";
import Swal from 'sweetalert2';

// Importación única de Firebase (Evita el SyntaxError)
import { auth } from '../src/firebase-config.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

/* --- 1. GESTIÓN DE MODALES (LOGIN / REGISTRO / BIENVENIDA) --- */

const modalBienvenida = document.querySelector(".Modal-Bienvenida");
const btnAceptarBienvenida = document.getElementById("btn-aceptar");

if (btnAceptarBienvenida) {
    btnAceptarBienvenida.addEventListener("click", () => {
        modalBienvenida.style.display = "none";
    });
}

export function AbrirLogin() {
    const modal = document.getElementById("Modal-Login");
    if (modal) modal.style.display = "block";
}

export function CerrarLogin() {
    const modal = document.getElementById("Modal-Login");
    if (modal) modal.style.display = "none";
}

export function AbrirRegistro() {
    const modal = document.getElementById("Modal-Registro");
    if (modal) {
        modal.style.display = "block";
        CerrarLogin(); // Cerramos login si abrimos registro
    }
}

export function CerrarRegistro() {
    const modal = document.getElementById("Modal-Registro");
    if (modal) modal.style.display = "none";
}

// Listeners de botones de interfaz (Home)
document.getElementById("btn-home-login")?.addEventListener("click", AbrirLogin);
document.getElementById("btn-cerrar-login")?.addEventListener("click", CerrarLogin);
document.getElementById("btn-ir-registro")?.addEventListener("click", AbrirRegistro);
document.getElementById("btn-cerrar-registro")?.addEventListener("click", CerrarRegistro);

/* --- 2. LÓGICA DE AUTENTICACIÓN (FIREBASE) --- */

// --- LOGIN ---
const formLogin = document.getElementById("form-login");
if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-user").value;
        const pass = document.getElementById("login-pass").value;
        const miModal = document.getElementById("Modal-Login");

        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                Swal.fire({
                    title: '¡Bienvenido de vuelta!',
                    text: `Hola, ${userCredential.user.email}`,
                    icon: 'success',
                    confirmButtonColor: '#28a745',
                    background: '#1e1e1e',
                    color: '#fff',
                    target: miModal,
                });
                CerrarLogin();
                console.log("Sesión iniciada correctamente.");
            })
            .catch((error) => {
                const mensaje = error.code === 'auth/invalid-credential'
                    ? "Acceso denegado: Credenciales incorrectas."
                    : "Error: " + error.message;
                Swal.fire({
                    title: 'Error de Seguridad',
                    text: mensaje,
                    icon: 'error',
                    confirmButtonColor: '#d33',
                    background: '#1e1e1e',
                    color: '#fff',
                    target: miModal,
                });
            });
    });
}

// --- REGISTRO ---
const formRegistro = document.getElementById("form-registro");
if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("registro-email").value;
        const pass = document.getElementById("registro-pass").value;
        const passConfirm = document.getElementById("registro-pass-confirm").value;
        const modalRegistro = document.getElementById("Modal-Registro");

        if (pass !== passConfirm) {
            Swal.fire({
                title: '¡Error!',
                text: 'Las contraseñas no coinciden.',
                icon: 'error',
                confirmButtonColor: '#d33',
                background: '#1e1e1e',
                color: '#fff',
                target: modalRegistro,
            });
            return;
        }

        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                Swal.fire({
                    title: '¡Cuenta creada!',
                    text: 'Bienvenido a Wolf Motors.',
                    icon: 'success',
                    confirmButtonColor: '#28a745',
                    background: '#1e1e1e',
                    color: '#fff',
                    target: modalRegistro,
                });
                CerrarRegistro();
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error de Registro',
                    text: 'Problema: ' + error.code,
                    icon: 'error',
                    confirmButtonColor: '#d33',
                    background: '#1e1e1e',
                    color: '#fff',
                    target: modalRegistro,
                });
            });
    });
}

// --- LOGOUT ---
export function EjecutarLogout() {
    signOut(auth).then(() => {
        Swal.fire({
            title: 'Sesión Cerrada',
            text: 'Has salido de Wolf Motors. ¡Vuelve pronto!',
            icon: 'info',
            background: '#1e1e1e',
            color: '#fff',
            confirmButtonColor: '#d33'
        });
    }).catch((error) => console.error("Error al salir:", error));
}

/* --- 3. EL OBSERVADOR (UI DINÁMICA) --- */

let usuarioLogueado = null;

/* --- 1. EL VIGILANTE (ObservadorUsuario) --- */
// Esta función se ejecuta una sola vez al cargar la app
export function ObservadorUsuario() {
    onAuthStateChanged(auth, (user) => {
        usuarioLogueado = user; // Guardamos el estado globalmente
        console.log("Estado de autenticación cambiado:", user ? user.email : "Sin sesión");
        ActualizarInterfaz(user);
    });
}

/* --- 2. EL MOTOR VISUAL (ActualizarInterfaz) --- */
// Esta función la puedes llamar manualmente desde Main-JDM.js cada vez que inyectes HTML
export function ActualizarInterfaz(user) {
    const botonesLoginJDM = document.querySelectorAll(".btn-jdm-login");
    const btnLoginNavbar = document.getElementById("btn-nav-login");

    if (user) {
        // --- ESTADO: SESIÓN INICIADA ---
        const nombreUsuario = user.email.split('@')[0];

        botonesLoginJDM.forEach(btn => {
            btn.innerHTML = `Salir (${nombreUsuario})`;
            btn.style.color = "#28a745"; // Verde "Wolf Motors"
            btn.classList.add("btn-logout");

            // Usamos una función limpia para el click
            btn.onclick = (e) => {
                e.preventDefault();
                EjecutarLogout();
            };
        });

        if (btnLoginNavbar) btnLoginNavbar.textContent = "Perfil";

    } else {
        // --- ESTADO: SIN SESIÓN ---
        botonesLoginJDM.forEach(btn => {
            btn.innerHTML = "Login";
            btn.style.color = "";
            btn.classList.remove("btn-logout");

            btn.onclick = (e) => {
                e.preventDefault();
                AbrirLogin();
            };
        });

        if (btnLoginNavbar) btnLoginNavbar.textContent = "Iniciar Sesión";
    }
}
// Iniciamos el vigilante inmediatamente
ObservadorUsuario();

/* --- 4. NAVEGACIÓN SPA (CAMBIO DE SECCIONES) --- */

const btnJDM = document.getElementById("jdm");
if (btnJDM) {
    btnJDM.addEventListener("click", () => {
        document.getElementById("Page-Home").style.display = "none";
        AbrirJDM();
    });
}

// Puedes añadir aquí los listeners de USA y EURO siguiendo el mismo patrón
document.getElementById("usa")?.addEventListener("click", () => {
    document.getElementById("Page-Home").style.display = "none";
    AbrirUSA();
});

document.getElementById("euro")?.addEventListener("click", () => {
    document.getElementById("Page-Home").style.display = "none";
    AbrirEURO();
});

export function VolverAlHome() {
    // Ocultamos todas las páginas de marcas
    document.getElementById("Page-JDM").style.display = "none";
    document.getElementById("Page-USA").style.display = "none";
    document.getElementById("Page-EURO").style.display = "none";

    // Mostramos el Home
    const home = document.getElementById("Page-Home");
    if (home) home.style.display = "flex";

    // Reseteamos estados visuales de JDM (si existen)
    document.querySelector('.Header-JDM')?.classList.remove('subir');
    document.querySelector('.Main-JDM')?.classList.remove('visible');
}

/* --- 5. EVENTOS GLOBALES (CIERRE DE MODALES) --- */

window.addEventListener('click', (event) => {
    const modalLogin = document.getElementById("Modal-Login");
    const modalRegistro = document.getElementById("Modal-Registro");

    if (event.target === modalLogin) CerrarLogin();
    if (event.target === modalRegistro) CerrarRegistro();
});
