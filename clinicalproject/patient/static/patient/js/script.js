// -------------------------Funcion para abrir y cerrar los formularios-------------------------
const btnAddPatient = document.querySelector('.patient-get__header-btn');
const displayShadowFormPatient = document.querySelector('.patient-post');
const displayFormPatient = document.querySelector('.patient-post__form');


btnAddPatient.addEventListener('click', () => {
    console.log('click');
    displayShadowFormPatient.style.display = 'flex';
    displayFormPatient.style.display = 'flex';
});



const btnCloseFormPatient = document.querySelector('.patient-post__form-header__close');

btnCloseFormPatient.addEventListener('click', () => {
    displayShadowFormPatient.style.display = 'none';
    displayFormPatient.style.display = 'none';
});
// ---------------------------------------------------------------------------------------------


// ------------------------Peticiones GET Paises/Provincias/Localidades-------------------------
document.addEventListener("DOMContentLoaded", function() {

    // Función para cargar países en un select específico
    function cargarPaises(paisSelect) {
        fetch('/portal/patient/api/paises/')
            .then(response => response.json())
            .then(data => {
                data.forEach(pais => {
                    const option = document.createElement("option");
                    option.value = pais.id;
                    option.textContent = pais.nombre;
                    paisSelect.appendChild(option);
                });
            });
    }

    // Función para manejar la selección de país y cargar provincias
    function manejarSeleccionPais(paisSelect, provinciaSelect, localidadSelect) {
        paisSelect.addEventListener("change", function() {
            const paisId = this.value;

            if (paisId) {
                provinciaSelect.disabled = false;
                provinciaSelect.innerHTML = '<option value="">Seleccione una provincia</option>';

                fetch(`/portal/patient/api/provincias/?pais_id=${paisId}`)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(provincia => {
                            const option = document.createElement("option");
                            option.value = provincia.id;
                            option.textContent = provincia.nombre;
                            provinciaSelect.appendChild(option);
                        });
                    });
            } else {
                provinciaSelect.disabled = true;
                localidadSelect.disabled = true;
                provinciaSelect.innerHTML = '<option value="">Seleccione una provincia</option>';
                localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
            }
        });
    }

    // Función para manejar la selección de provincia y cargar localidades
    function manejarSeleccionProvincia(provinciaSelect, localidadSelect) {
        provinciaSelect.addEventListener("change", function() {
            const provinciaId = this.value;

            if (provinciaId) {
                localidadSelect.disabled = false;
                localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>';

                fetch(`/portal/patient/api/localidades/?provincia_id=${provinciaId}`)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(localidad => {
                            const option = document.createElement("option");
                            option.value = localidad.id;
                            option.textContent = localidad.nombre;
                            localidadSelect.appendChild(option);
                        });
                    });
            } else {
                localidadSelect.disabled = true;
                localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
            }
        });
    }

    // Seleccionar los elementos del DOM para habitual
    const habitualPaisSelect = document.getElementById("habitual-pais");
    const habitualProvinciaSelect = document.getElementById("habitual-provincia");
    const habitualLocalidadSelect = document.getElementById("habitual-localidad");

    // Seleccionar los elementos del DOM para actual
    const actualPaisSelect = document.getElementById("actual-pais");
    const actualProvinciaSelect = document.getElementById("actual-provincia");
    const actualLocalidadSelect = document.getElementById("actual-localidad");

    // Cargar países para habitual y actual
    cargarPaises(habitualPaisSelect);
    cargarPaises(actualPaisSelect);

    // Manejar selección de país y cargar provincias/localidades para habitual
    manejarSeleccionPais(habitualPaisSelect, habitualProvinciaSelect, habitualLocalidadSelect);
    manejarSeleccionProvincia(habitualProvinciaSelect, habitualLocalidadSelect);

    // Manejar selección de país y cargar provincias/localidades para actual
    manejarSeleccionPais(actualPaisSelect, actualProvinciaSelect, actualLocalidadSelect);
    manejarSeleccionProvincia(actualProvinciaSelect, actualLocalidadSelect);
});

// ---------------------------------------------------------------------------------------------


// ----------------------------Peticiones POST Pacientes/Domicilios-----------------------------
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // El nombre del cookie debe estar al inicio seguido de un '='
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

document.getElementById('paciente-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevenir envío tradicional

    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        sexo: document.getElementById('sexo').value,
        nacionalidad: document.getElementById('nacionalidad').value,
        codigo_identidad: document.getElementById('codigo_identidad').value,
        celular: document.getElementById('celular').value,
        ocupacion: document.getElementById('ocupacion').value,
        estado_civil: document.getElementById('estado_civil').value,
        escolaridad: document.getElementById('escolaridad').value,
        servicio_militar: document.getElementById('servicio_militar').value,
        fecha_nacimiento: document.getElementById('fecha_nacimiento').value,

        // Domicilio habitual
        residencia_habitual: {
            pais: document.getElementById('habitual-pais').value,
            provincia: document.getElementById('habitual-provincia').value,
            localidad: document.getElementById('habitual-localidad').value,
            calle: document.getElementById('habitual-calle').value,
            nro: document.getElementById('habitual-nro').value,
            detalle: document.getElementById('habitual-detalle').value
        },

        // Domicilio actual
        residencia_actual: {
            pais: document.getElementById('actual-pais').value,
            provincia: document.getElementById('actual-provincia').value,
            localidad: document.getElementById('actual-localidad').value,
            calle: document.getElementById('actual-calle').value,
            nro: document.getElementById('actual-nro').value,
            detalle: document.getElementById('actual-detalle').value
        }
    };

    // Hacer la petición POST a la API
    fetch('/portal/patient/api/pacientes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken  // Añadir el token CSRF en el encabezado
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Paciente creado:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// ---------------------------------------------------------------------------------------------