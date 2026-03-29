import AbrirUSA from "./Main-USA.js";
import AbrirJDM from "./Main-JDM.js";
import AbrirEURO from "./Main-EURO.js";
import Swal from 'sweetalert2';

/* --- Modal Bienvenida --- */
const modalBienvenida = document.querySelector(".Modal-Bienvenida");
const btnAceptarBienvenida = document.getElementById("btn-aceptar");

if (btnAceptarBienvenida) {
    btnAceptarBienvenida.addEventListener("click", () => {
        modalBienvenida.style.display = "none";
    });
}

/* --- Modal Login (Exportada para usar en JDM/USA/EURO) --- */
export function AbrirLogin() {
    const modal = document.getElementById("Modal-Login");
    if (modal) modal.style.display = "block";
}

export function CerrarLogin() {
    const modal = document.getElementById("Modal-Login");
    if (modal) modal.style.display = "none";
}

const btnHomeLogin = document.getElementById("btn-home-login");
if (btnHomeLogin) {
    btnHomeLogin.addEventListener("click", AbrirLogin);
}

const btnCerrarLogin = document.getElementById("btn-cerrar-login");
if (btnCerrarLogin) {
    btnCerrarLogin.addEventListener("click", CerrarLogin);
}

export function AbrirRegistro() {
    const modal = document.getElementById("Modal-Registro");
    if (modal) modal.style.display = "block";
    CerrarLogin();
}

export function CerrarRegistro() {
    const modal = document.getElementById("Modal-Registro");
    if (modal) modal.style.display = "none";
}

const btnHomeRegistro = document.getElementById("btn-ir-registro");
if (btnHomeRegistro) {
    btnHomeRegistro.addEventListener("click", AbrirRegistro);
}

const btnCerrarRegistro = document.getElementById("btn-cerrar-registro");
if (btnCerrarRegistro) {
    btnCerrarRegistro.addEventListener("click", CerrarRegistro);
}


/* --- Firebase --- */

// 1. Un solo import para la configuración y las funciones de Firebase
import { auth } from '../src/firebase-config.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";

// --- Lógica de Login ---
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
                    ? "Acceso denegado"
                    : "Error: " + error.message;
                Swal.fire({
                    title: 'Acceso denegado: Las credenciales proporcionadas no coinciden con nuestros registros de seguridad.',
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

// --- Lógica de Registro ---
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
                title: '¡Error de Validación!',
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
                // En lugar de alert("¡Cuenta creada!");
                Swal.fire({
                    title: '¡Bienvenido al Club!',
                    text: 'Tu cuenta en Wolf Motors ha sido creada.',
                    icon: 'success',
                    confirmButtonColor: '#28a745', // Un verde que combine con tu terminal
                    background: '#1e1e1e', // Fondo oscuro para que combine con tu ricing
                    color: '#fff',
                    target: modalRegistro,
                });
                CerrarRegistro();
            })
            .catch((error) => {
                Swal.fire({
                    title: '¡Error de Registro!',
                    text: 'Hubo un problema: ' + error.code,
                    icon: 'error',
                    confirmButtonColor: '#d33',
                    background: '#1e1e1e',
                    color: '#fff',
                    target: modalRegistro,
                });
            });
    });
}

/* --- Navegación SPA (Cambio de Secciones) --- */

const btnJDM = document.getElementById("jdm");
if (btnJDM) {
    btnJDM.addEventListener("click", () => {
        document.getElementById("Page-Home").style.display = "none";
        AbrirJDM();
    });
}

export function VolverAlHome() {
    document.getElementById("Page-JDM").style.display = "none";
    document.getElementById("Page-USA").style.display = "none";
    document.getElementById("Page-EURO").style.display = "none";
    const home = document.getElementById("Page-Home");
    home.style.display = "flex";

    const headerJDM = document.querySelector('.Header-JDM');
    if (headerJDM) {
        headerJDM.classList.remove('subir');
    }

    const mainJDM = document.querySelector('.Main-JDM');
    if (mainJDM) {
        mainJDM.classList.remove('visible');
    }
}

window.onclick = function (event) {
    const modal = document.getElementById("Modal-Login");
    if (event.target == modal) {
        CerrarLogin();
    }
}

window.onclick = function (event) {
    const modal = document.getElementById("Modal-Registro");
    if (event.target == modal) {
        CerrarRegistro();
    }
}

onAuthStateChanged(auth, (user) => {
    const btnLoginNavbar = document.getElementById("btn-nav-login"); // El botón de tu menú

    if (user) {
        // Si el usuario está conectado
        console.log("Usuario activo:", user.email);
        if (btnLoginNavbar) btnLoginNavbar.textContent = "Perfil";
    } else {
        // Si no hay nadie
        console.log("No hay sesión activa.");
        if (btnLoginNavbar) btnLoginNavbar.textContent = "Iniciar Sesión";
    }
});
