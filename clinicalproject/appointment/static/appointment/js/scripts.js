// *---------Div Elements---------*
const formContainerDiv = document.querySelector('.main-content__form-container');
const formAppointmentDiv = document.querySelector('.form__appointment');
const formPatientDiv = document.querySelector('.form__patient');

// *---------Btn NavBar---------*
const createAppointmentButton = document.querySelector('.main-content__create-appointment-button');

// *---------Btn Form Appointment---------*
const closeAppointmentButton = document.querySelector('.form-appointment__exit');
const createPatientButton = document.querySelector('.form-appointment__create-patient');

// *---------Btn Form Patient---------*
const closePatientButton = document.querySelector('.form-patient__exit');


// *---------Eventos del menu de navegacion---------*

//Habilita el Contenedor de los formularios y deshabilita el boton de crear turnos
createAppointmentButton.addEventListener('click', () => {
    formContainerDiv.style.display = 'flex';
    createAppointmentButton.disabled = true;
});

// *---------Eventos del Form Appointment---------*

// Cierra el contenedor de formularios y habilita el boton de crear turnos
closeAppointmentButton.addEventListener('click', () => {
    formContainerDiv.style.display = 'none';
    createAppointmentButton.disabled = false;
});

// Muestra el formulario de pacientes y oculta el de turnos
createPatientButton.addEventListener('click', () => {
    formPatientDiv.style.display = 'flex';
    formAppointmentDiv.style.display = 'none';
});


// *---------Eventos de Patient---------*

// Muestra el formulario de turnos y oculta el de pacientes
closePatientButton.addEventListener('click', () => {
    formPatientDiv.style.display = 'none';
    formAppointmentDiv.style.display = 'flex';
    
});









document.addEventListener("DOMContentLoaded", function() {
    const provinciasSelect = document.getElementById("provincias");
    const municipiosSelect = document.getElementById("municipios");

    // Cargar provincias al cargar la página
    fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre")
        .then(response => response.json())
        .then(data => {
            data.provincias.forEach(provincia => {
                const option = document.createElement("option");
                option.value = provincia.id;
                option.textContent = provincia.nombre;
                provinciasSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error al cargar las provincias:", error));

    // Cargar municipios cuando se selecciona una provincia
    provinciasSelect.addEventListener("change", function() {
        const provinciaId = provinciasSelect.value;

        // Limpiar el select de municipios
        municipiosSelect.innerHTML = '<option value="">Seleccione un municipio</option>';

        if (provinciaId) {
            municipiosSelect.disabled = false;

            fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinciaId}&campos=id,nombre&max=100`)
                .then(response => response.json())
                .then(data => {
                    data.municipios.forEach(municipio => {
                        const option = document.createElement("option");
                        option.value = municipio.id;
                        option.textContent = municipio.nombre;
                        municipiosSelect.appendChild(option);
                    });
                })
                .catch(error => console.error("Error al cargar los municipios:", error));
        } else {
            municipiosSelect.disabled = true;
        }
    });
});