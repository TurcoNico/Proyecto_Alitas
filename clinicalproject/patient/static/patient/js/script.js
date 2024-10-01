// ----------------------------------------------- //
//        Forms Control - Variables & Funcs        //
// ----------------------------------------------- //

const btnClosePatientForm = document.querySelector('.patient-post__form-header__close');
const btnAddPatient = document.querySelector('.patient-get__header-btn');
const formOverlay = document.querySelector('.patient-post');
const formPatient = document.querySelector('.patient-post__form');

function openPatientForm() {
    formOverlay.style.display = 'flex';
    formPatient.style.display = 'flex';
}

function closePatientForm() {
    formOverlay.style.display = 'none';
    formPatient.style.display = 'none';
}

btnAddPatient.addEventListener('click', openPatientForm);
btnClosePatientForm.addEventListener('click', closePatientForm);


// ---------------------------------------------------- //
//        Fetching Countries - Variables & Funcs        //
// ---------------------------------------------------- //

document.addEventListener("DOMContentLoaded", function() {
    
    const habitualCountrySelect = document.getElementById("habitual-pais");
    const habitualProvinceSelect = document.getElementById("habitual-provincia");
    const habitualCitySelect = document.getElementById("habitual-localidad");

    const actualCountrySelect = document.getElementById("actual-pais");
    const actualProvinceSelect = document.getElementById("actual-provincia");
    const actualCitySelect = document.getElementById("actual-localidad");

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

    // Cargar países para habitual y actual
    loadCountries(habitualCountrySelect);
    loadCountries(actualCountrySelect);

    // Manejar selección de país y provincias/localidades
    handleCountrySelection(habitualCountrySelect, habitualProvinceSelect, habitualCitySelect);
    handleCountrySelection(actualCountrySelect, actualProvinceSelect, actualCitySelect);
    handleProvinceSelection(habitualProvinceSelect, habitualCitySelect);
    handleProvinceSelection(actualProvinceSelect, actualCitySelect);
});


// -------------------------------------------------- //
//   Country Selection Handling - Variables & Funcs   //
// -------------------------------------------------- //

// Manejar la selección de país y cargar provincias
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
            resetProvinceAndCity(provinceSelect, departmentSelect);
        }
    });
}

// Manejar la selección de provincia y cargar localidades
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

// Resetear selects de provincia/localidad
function resetProvinceAndCity(provinceSelect, departmentSelect) {
    provinceSelect.disabled = true;
    departmentSelect.disabled = true;
    provinceSelect.innerHTML = '<option value="">Seleccione una provincia</option>';
    departmentSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
}


// -------------------------------------------------- //
//          POST Request - Variables & Funcs          //
// -------------------------------------------------- //

const csrfToken = getCSRFToken('csrftoken');

document.getElementById('paciente-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = collectPatientFormData();

    fetch('/portal/patient/api/pacientes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.ok ? response.json() : Promise.reject('Error en la creación del paciente'))
    .then(data => handlePatientCreatedSuccess())
    .catch((error) => handlePatientCreatedError(error));
});

function collectPatientFormData() {
    return {
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

        residencia_habitual: {
            pais: document.getElementById('habitual-pais').value,
            provincia: document.getElementById('habitual-provincia').value,
            localidad: document.getElementById('habitual-localidad').value,
            calle: document.getElementById('habitual-calle').value,
            nro: document.getElementById('habitual-nro').value,
            detalle: document.getElementById('habitual-detalle').value
        },

        residencia_actual: {
            pais: document.getElementById('actual-pais').value,
            provincia: document.getElementById('actual-provincia').value,
            localidad: document.getElementById('actual-localidad').value,
            calle: document.getElementById('actual-calle').value,
            nro: document.getElementById('actual-nro').value,
            detalle: document.getElementById('actual-detalle').value
        }
    };
}

// -------------------------------------------- //
//     Functions for Success/Error Handling     //
// -------------------------------------------- //

function handlePatientCreatedSuccess() {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Paciente creado con éxito",
        target: 'main',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            timerProgressBar: 'swal-success__progress-bar'
        }
    });
    fetchPatientsData(quantityPatients);
}

function handlePatientCreatedError(error) {
    console.error('Error:', error);
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Oops...',
        target: 'main',
        text: 'Ocurrió un error al crear el paciente. Intenta nuevamente.',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            timerProgressBar: 'swal-error__progress-bar'
        }
    });
}


// ------------------------------------------------ //
//      Fetch Patients Data - Variables & Funcs     //
// ------------------------------------------------ //
// Función que calcula la cantidad de pacientes basándose en el tamaño del contenedor
function calculatePatientsQuantity(container) {  
    const containerHeight = container.offsetHeight;  
    
    // Calcular cuántos pacientes caben basándose en la altura del contenedor
    let quantityPatients = Math.floor(containerHeight / 40) - 1;  // Asumiendo que 40px es la altura aproximada de cada fila de paciente
    let navigationBarHeight = (containerHeight % 40) + 40;  // Esto lo puedes ajustar según la altura de la barra de navegación
    

    return [quantityPatients, navigationBarHeight];
}

// Formato de DNI con puntos
function formatToDNI(numberString) {
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Cargar los pacientes cuando la página esté lista
let quantityPatients; //acceso global
let debounceTimeout; // para almacenar el timeout de debounce

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.patient-get__table-body');
    
    // Cálculo inicial de pacientes
    [quantityPatients] = calculatePatientsQuantity(container);
    console.log(`Cantidad de pacientes inicial: ${quantityPatients}`);
    
    fetchPatientsData(quantityPatients); // Llamada inicial para poblar la tabla

    // Añadir un listener para detectar cambios en el tamaño de la ventana
    window.addEventListener('resize', () => {
        // Ejecutar el debounce para retrasar la petición hasta que termine el resize
        debounce(handleResize, 300); // Esperar 300ms después del último resize
    });
});

// Función que maneja el evento resize
function handleResize() {
    const container = document.querySelector('.patient-get__table-body');
    
    // Recalcular el número de pacientes que caben en el contenedor
    [quantityPatients] = calculatePatientsQuantity(container);
    console.log(`Cantidad de pacientes después del resize: ${quantityPatients}`);

    // Limpiar la tabla antes de repoblarla
    tableBody.innerHTML = '';
    
    // Llamar de nuevo a la API con la nueva cantidad de pacientes
    fetchPatientsData(quantityPatients);
}

// Función de debounce para retrasar la ejecución de la función
function debounce(func, delay) {
    clearTimeout(debounceTimeout); // Limpiar el timeout anterior
    debounceTimeout = setTimeout(func, delay); // Establecer un nuevo timeout
}

// Función para calcular la cantidad de pacientes según el tamaño del contenedor
function calculatePatientsQuantity(container) {  
    tableBody.innerHTML = '';
    const containerHeight = container.offsetHeight;
    
    // Asumiendo que cada tarjeta de paciente tiene una altura fija de 40px
    const cardHeight = 40; // Ajusta este valor al tamaño real de tus tarjetas

    // Calcular cuántos pacientes caben en el contenedor basándose en su altura
    let quantityPatients = Math.floor(containerHeight / cardHeight);
    
    console.log(`Cantidad de pacientes calculada: ${quantityPatients}`);

    return [quantityPatients];
}

// Función para obtener los datos de pacientes, con soporte para GET y POST
function fetchPatientsData(page_size=null, page=1) {
    // Construir la URL según si se necesita paginación o no
    let url = '/portal/patient/api/pacientes/basico/'; // POST request
    
    if (page_size !== null) {
        url += `?page=${page}&page_size=${page_size}`; // GET request
    }
    
    // Realizar la solicitud a la API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Asegurarse de que data.results exista si hay paginación, o que data sea un array
            if (page_size !== null && Array.isArray(data.results)) {
                populateTable(data.results); 
            } else {
                console.error("La respuesta no contiene un array válido de pacientes.");
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

// Función para poblar la tabla con los datos del paciente
const tableBody = document.querySelector('.patient-get__table-body');
async function populateTable(patients) {
    tableBody.innerHTML = '';  // Limpiar contenido actual

    // Recorrer el array de pacientes (patients) que viene de data.results
    for (const patient of patients) {
        const row = document.createElement('div');
        row.classList.add('patient-get__table-body__row');
        
        const lastNameSpan = createTableCell(patient.apellido, 'col-3');
        const firstNameSpan = createTableCell(patient.nombre, 'col-3');
        const idCodeSpan = createTableCell(formatToDNI(patient.codigo_identidad), 'col-2');
        const birthDateSpan = createTableCell(new Date(patient.fecha_nacimiento).toLocaleDateString(), 'col-2');

        const actionsSpan = await createTableActions(patient); // Crear acciones para cada paciente
        row.append(lastNameSpan, firstNameSpan, idCodeSpan, birthDateSpan, actionsSpan);
        
        tableBody.appendChild(row);
    }
}

// Función auxiliar para crear una celda de tabla
function createTableCell(content, className) {
    const cell = document.createElement('span');
    cell.classList.add(className);
    cell.textContent = content;
    return cell;
}

// Función auxiliar para crear las acciones en la tabla
async function createTableActions(patient) {
    const actionsSpan = document.createElement('span');
    actionsSpan.classList.add('col-2', 'patient-get__table-body__row-actions');

    // Esperar a que se resuelvan las promesas de los botones
    const btnView = await createActionButton(srcSvgView, 'view-btn');
    const btnEdit = await createActionButton(srcSvgEdit, 'edit-btn');
    const btnDelete = await createActionButton(srcSvgDelete, 'delete-btn');

    // Agregar event listener al botón eliminar
    btnDelete.addEventListener('click', () => deletePatient(patient));

    // Añadir los botones al contenedor de acciones
    actionsSpan.append(btnView, btnEdit, btnDelete);
    return actionsSpan;
}

// Función auxiliar para crear botones de acción
async function createActionButton(iconSrc, className) {
    const button = document.createElement('button');
    button.classList.add('patient-get__table-body__row-actions__btn', className);

    // Fetch para obtener el contenido del SVG desde el src
    try {
        const response = await fetch(iconSrc);
        if (!response.ok) throw new Error('No se pudo cargar el SVG');

        const svgContent = await response.text(); // Obtener el contenido SVG como texto
        button.innerHTML = svgContent; // Insertar el SVG en el botón
    } catch (error) {
        console.error('Error al cargar el SVG:', error);
        button.innerHTML = '❌'; // Fallback en caso de error
    }

    return button;
}

// Eliminar paciente
function deletePatient(patient) {
    let patientInfo = `<strong style="color: #c20100;">${patient.apellido} ${patient.nombre} - ${formatToDNI(patient.codigo_identidad)}</strong>`;
    Swal.fire({
        title: '¿Seguro que deseas eliminar a este paciente?',
        html: patientInfo,
        icon: 'warning',
        showCancelButton: true,
        heightAuto: false,
        target: 'main',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, eliminar paciente',
        confirmButtonColor: '#c20100'
    }).then(result => {
        if (result.isConfirmed) {
            fetch(`/portal/patient/api/pacientes/${patient.id}/`, {
                method: 'DELETE',
                headers: { 'X-CSRFToken': csrfToken }
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        background: '#FFF',
                        icon: 'success',
                        title: 'Paciente Eliminado',
                        target: 'main',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        customClass: {
                            timerProgressBar: 'swal-success__progress-bar'
                        }
                    });
                    fetchPatientsData(quantityPatients);
                } else {
                    throw new Error('Error al eliminar el paciente');
                }
            })
            .catch(error => handlePatientDeleteError(error));
        }
    });
}

// Manejar error en la eliminación del paciente
function handlePatientDeleteError(error) {
    console.error('Error:', error);
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Oops...',
        target: 'main',
        text: 'Ocurrió un error al eliminar el paciente. Intenta nuevamente.',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            timerProgressBar: 'swal-error__progress-bar'
        }
    });
}


// ------------------------------------------ //
//          CSRF Token - Función              //
// ------------------------------------------ //

function getCSRFToken(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
