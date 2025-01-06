let boxTemplate = null;
let cajaPaises = null;

function listarPaises(data) {
    data.forEach(element => {
        // Clonar el template
        const pais = boxTemplate.content.cloneNode(true);

        // Seleccionar elementos del clon
        const bandera = pais.querySelector('#pais-bandera');
        const titulo = pais.querySelector('#pais-titulo');
        const poblacion = pais.querySelector('#pais-poblacion');
        const capital = pais.querySelector('#pais-capital');
        const lenguaje = pais.querySelector('#pais-lenguaje');
        const moneda = pais.querySelector('#pais-moneda');
        const ubicacion = pais.querySelector('#pais-ubicacion');

        // Rellenar datos en el clon
        bandera.src = element.flags.svg;
        titulo.textContent = element.translations.spa.common || "N/A";
        poblacion.textContent = element.population.toLocaleString();
        capital.textContent = element.capital ? element.capital.join(', ') : "N/A";
        lenguaje.textContent = Object.values(element.languages || {}).join(', ') || "N/A";

        const values = Object.values(element.currencies || {});
        moneda.textContent = values.length > 0 ? values[0].name : "N/A";

        ubicacion.href = element.maps.googleMaps;

        // Añadir el clon a la caja
        cajaPaises.appendChild(pais);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Configurar referencias
    boxTemplate = document.getElementById("box-template");
    cajaPaises = document.getElementById('paises');

    // Eliminar el template original del DOM (si es necesario)
    boxTemplate.remove();

    // Obtener datos de los países
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => listarPaises(data))
        .catch(error => console.error('Error', error));
});
