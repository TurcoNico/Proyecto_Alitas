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