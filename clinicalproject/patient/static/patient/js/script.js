// -------------------------Function to open and close the forms-------------------------
const btnClosePatientForm = document.querySelector('.patient-post__form-header__close');
const btnAddPatient = document.querySelector('.patient-get__header-btn');
const formOverlay = document.querySelector('.patient-post');
const formPatient = document.querySelector('.patient-post__form');

// Function to open and close the form
function closePatientForm() {
    formOverlay.style.display = 'none';
    formPatient.style.display = 'none';
};

function openPatientForm() {
    formOverlay.style.display = 'flex';
    formPatient.style.display = 'flex';
};

// Event listeners
btnAddPatient.addEventListener('click', () => {
    openPatientForm()
});

btnClosePatientForm.addEventListener('click', () => {
    closePatientForm();
});
// ---------------------------------------------------------------------------------------------


// ------------------------GET Requests Countries/Provinces/Cities-------------------------
document.addEventListener("DOMContentLoaded", function() {

    // Función para cargar países en un select específico
    function loadCountries(countrySelect) {
        fetch('/portal/patient/api/paises/')
            .then(response => response.json())
            .then(data => {
                data.forEach(country => {
                    const option = document.createElement("option");
                    option.value = country.id;
                    option.textContent = country.nombre;
                    countrySelect.appendChild(option);
                });
            });
    }

    // “handle”, generalmente significa que esta función se encarga de procesar o responder
    // a un evento específico,en este caso, la selección de un país.
    
    // Función para manejar la selección de país y cargar provincias
    function handleCountrySelection(countrySelect, provinceSelect, departmentSelect) {
        countrySelect.addEventListener("change", function() {
            const countryId = this.value;

            if (countryId) {
                provinceSelect.disabled = false;
                provinceSelect.innerHTML = '<option value="">Seleccione una provincia</option>';

                fetch(`/portal/patient/api/provincias/?pais_id=${countryId}`)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(province => {
                            const option = document.createElement("option");
                            option.value = province.id;
                            option.textContent = province.nombre;
                            provinceSelect.appendChild(option);
                        });
                    });
            } else {
                provinceSelect.disabled = true;
                departmentSelect.disabled = true;
                provinceSelect.innerHTML = '<option value="">Seleccione una provincia</option>';
                departmentSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
            }
        });
    }

    // Función para manejar la selección de provincia y cargar localidades
    function handleProvinceSelection(provinceSelect, departmentSelect) {
        provinceSelect.addEventListener("change", function() {
            const provinceId = this.value;

            if (provinceId) {
                departmentSelect.disabled = false;
                departmentSelect.innerHTML = '<option value="">Seleccione una localidad</option>';

                fetch(`/portal/patient/api/localidades/?provincia_id=${provinceId}`)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(city => {
                            const option = document.createElement("option");
                            option.value = city.id;
                            option.textContent = city.nombre;
                            departmentSelect.appendChild(option);
                        });
                    });
            } else {
                departmentSelect.disabled = true;
                departmentSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
            }
        });
    }

    // Seleccionar los elementos del DOM para habitual
    const habitualCountrySelect = document.getElementById("habitual-pais");
    const habitualProvinceSelect = document.getElementById("habitual-provincia");
    const habitualCitySelect = document.getElementById("habitual-localidad");

    // Seleccionar los elementos del DOM para actual
    const actualCountrySelect = document.getElementById("actual-pais");
    const actualProvinceSelect = document.getElementById("actual-provincia");
    const actualCitySelect = document.getElementById("actual-localidad");

    // Cargar países para habitual y actual
    loadCountries(habitualCountrySelect);
    loadCountries(actualCountrySelect);

    // Manejar selección de país y cargar provincias/localidades para habitual
    handleCountrySelection(habitualCountrySelect, habitualProvinceSelect, habitualCitySelect);
    handleProvinceSelection(habitualProvinceSelect, habitualCitySelect);

    // Manejar selección de país y cargar provincias/localidades para actual
    handleCountrySelection(actualCountrySelect, actualProvinceSelect, actualCitySelect);
    handleProvinceSelection(actualProvinceSelect, actualCitySelect);
});
// ---------------------------------------------------------------------------------------------


// ----------------------------POST Requests Patients/Addresses-----------------------------
function getCSRFToken(name) {
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
const csrfToken = getCSRFToken('csrftoken');

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
            'X-CSRFToken': csrfToken  // Añadir el token CSRF en el encabezado
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Paciente creado:', data);

        // 1. Reiniciar el formulario
        document.getElementById('paciente-form').reset();

        // 2. Cerrar el formulario
        closePatientForm();

        // 3. Actualizar la tabla con los datos del paciente
        fetchPatientsData();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
// ---------------------------------------------------------------------------------------------


// ----------------------------GET Patients Data for Table-------------------------------------
// Función para poblar la tabla con los datos del paciente
function populateTable(data) {
    const tableBody = document.querySelector('.patient-get__table-body');
    
    // Limpia el contenido actual del cuerpo de la tabla antes de agregar nuevas filas
    tableBody.innerHTML = '';

    data.forEach(patient => {
        const row = document.createElement('div');
        row.classList.add('patient-get__table-body__row');

        const lastNameSpan = document.createElement('span');
        lastNameSpan.classList.add('col-3');
        lastNameSpan.textContent = patient.apellido;

        const firstNameSpan = document.createElement('span');
        firstNameSpan.classList.add('col-3');
        firstNameSpan.textContent = patient.nombre;

        const idCodeSpan = document.createElement('span');
        idCodeSpan.classList.add('col-2');
        idCodeSpan.textContent = patient.codigo_identidad;

        const birthDateSpan = document.createElement('span');
        birthDateSpan.classList.add('col-2');
        const birthDate = new Date(patient.fecha_nacimiento);
        birthDateSpan.textContent = birthDate.toLocaleDateString();

        const actionsSpan = document.createElement('span');
        actionsSpan.classList.add('col-2', 'patient-get__table-body__row-actions');

        const btnView = document.createElement('button');
        btnView.innerHTML = `<img src="${srcSvgView}" alt="View" width="16" height="16">`;
        btnView.classList.add('patient-get__table-body__row-actions__btn', 'view-btn');

        const btnEdit = document.createElement('button');
        btnEdit.innerHTML = `<img src="${srcSvgEdit}" alt="Edit" width="16" height="16">`;
        btnEdit.classList.add('patient-get__table-body__row-actions__btn', 'edit-btn');

        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = `<img src="${srcSvgDelete}" alt="Delete" width="16" height="16">`;
        btnDelete.classList.add('patient-get__table-body__row-actions__btn', 'delete-btn');

        actionsSpan.appendChild(btnView);
        actionsSpan.appendChild(btnEdit);
        actionsSpan.appendChild(btnDelete);

        row.appendChild(lastNameSpan);
        row.appendChild(firstNameSpan);
        row.appendChild(idCodeSpan);
        row.appendChild(birthDateSpan);
        row.appendChild(actionsSpan);

        tableBody.appendChild(row);
    });
}

// Función para obtener los datos de la API
function fetchPatientsData() {
    fetch('/portal/patient/api/pacientes/basico/')
        .then(response => response.json())
        .then(data => {
            populateTable(data); // Llama a la función para poblar la tabla
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

// Ejecuta el código al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    fetchPatientsData(); // Llamada inicial para poblar la tabla
});

// Ejemplo de cómo podrías ejecutar la función en otro lugar del código
// fetchPatientsData(); // Llamada cuando se necesite actualizar los datos o invocar en otro evento
