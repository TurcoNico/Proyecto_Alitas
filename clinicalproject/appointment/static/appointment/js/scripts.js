// Seleccionar el botón
const createAppointmentButton = document.querySelector('.main-content__create-appointment-button');

// Seleccionar el div
const formAppointmentDiv = document.querySelector('.main-content__form-appointment');

// Ejemplo de uso
createAppointmentButton.addEventListener('click', () => {
    formAppointmentDiv.style.display = 'block'; // Mostrar el formulario al hacer clic en el botón
});