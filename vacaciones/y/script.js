// Funcionalidad del Carrusel
const carruselInterior = document.querySelector('.carrusel-interior');
const carruselElementos = document.querySelectorAll('.carrusel-elemento');
const botonAnterior = document.querySelector('.carrusel-control.anterior');
const botonSiguiente = document.querySelector('.carrusel-control.siguiente');
let indiceActual = 0;

function mostrarDiapositiva(indice) {
    carruselInterior.style.transform = `translateX(-${indice * 100}%)`;
}

botonAnterior.addEventListener('click', () => {
    indiceActual = (indiceActual === 0) ? carruselElementos.length - 1 : indiceActual - 1;
    mostrarDiapositiva(indiceActual);
});

botonSiguiente.addEventListener('click', () => {
    indiceActual = (indiceActual === carruselElementos.length - 1) ? 0 : indiceActual + 1;
    mostrarDiapositiva(indiceActual);
});

// Cambio automático de diapositiva cada 5 segundos
setInterval(() => {
    indiceActual = (indiceActual === carruselElementos.length - 1) ? 0 : indiceActual + 1;
    mostrarDiapositiva(indiceActual);
}, 5000);

// Inicialización del Mapa
function iniciarMapa() {
    const mapa = new google.maps.Map(document.getElementById('mapa'), {
        center: { lat: 8.9824, lng: -79.5199 }, // Coordenadas de Ciudad de Panamá
        zoom: 12
    });

    // Marcadores de ejemplo para atracciones turísticas
    const lugares = [
        { nombre: 'Canal de Panamá', ubicacion: { lat: 9.0800, lng: -79.6800 } },
        { nombre: 'Casco Antiguo', ubicacion: { lat: 8.9500, lng: -79.5350 } },
        { nombre: 'Biomuseo', ubicacion: { lat: 8.9300, lng: -79.5500 } }
    ];

    lugares.forEach(lugar => {
        new google.maps.Marker({
            position: lugar.ubicacion,
            map: mapa,
            title: lugar.nombre
        });
    });
}

// Cargar mapa al iniciar la ventana
window.onload = iniciarMapa;

// Funcionalidad del Carrito de Compras
const carritoElementos = document.getElementById('carrito-elementos');
const carritoTotal = document.getElementById('carrito-total');
const botonProcederPago = document.getElementById('proceder-pago');
let carrito = [];

document.querySelectorAll('.anadir-al-carrito').forEach(boton => {
    boton.addEventListener('click', () => {
        const nombre = boton.dataset.nombre;
        const precio = parseFloat(boton.dataset.precio);
        carrito.push({ nombre, precio });
        actualizarCarrito();
    });
});

function actualizarCarrito() {
    carritoElementos.innerHTML = '';
    let total = 0;
    carrito.forEach(elemento => {
        const li = document.createElement('li');
        li.textContent = `${elemento.nombre} - $${elemento.precio}`;
        carritoElementos.appendChild(li);
        total += elemento.precio;
    });
    carritoTotal.textContent = total.toFixed(2);
}

botonProcederPago.addEventListener('click', () => {
    alert('Procediendo al pago. Integra una pasarela de pago como Stripe aquí.');
    // TODO: Implementar Firebase Cloud Functions para procesar pagos
});

// Envío del Formulario de Contacto
document.getElementById('formulario-contacto').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensaje enviado. Integra Firebase Cloud Functions para enviar correos.');
    e.target.reset();
});

// Inicialización de Firebase (Descomentar y añadir tu configuración)
// const configuracionFirebase = {
//     apiKey: "TU_CLAVE_API",
//     authDomain: "TU_DOMINIO_AUTH",
//     projectId: "TU_ID_PROYECTO",
//     storageBucket: "TU_BUCKET_ALMACENAMIENTO",
//     messagingSenderId: "TU_ID_ENVIO_MENSAJES",
//     appId: "TU_ID_APLICACION"
// };
// firebase.initializeApp(configuracionFirebase);
// const db = firebase.firestore();
// const auth = firebase.auth();

// TODO: Implementar autenticación de Firebase para registro/inicio de sesión de usuarios
// TODO: Usar Firestore para almacenar y recuperar destinos, tours y datos de usuarios
// TODO: Usar Firebase Storage para imágenes y videos