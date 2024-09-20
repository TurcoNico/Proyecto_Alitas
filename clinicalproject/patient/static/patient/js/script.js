const btnAddPatient = document.querySelector('.patient-container__header-add-patient');
const displayShadowFormPatient = document.querySelector('.patient-container__form-container');
const displayFormPatient = document.querySelector('.form-container');


btnAddPatient.addEventListener('click', () => {
    console.log('click');
    displayShadowFormPatient.style.display = 'flex';
    displayFormPatient.style.display = 'flex';
});



const btnCloseFormPatient = document.querySelector('.form-container__header-close');

btnCloseFormPatient.addEventListener('click', () => {
    displayShadowFormPatient.style.display = 'none';
    displayFormPatient.style.display = 'none';
});

$(document).ready(function() {
    function initSmartSelect() {
        // Inicializar django-smart-select aquí
        $('.chained-select').each(function() {
            // Asume que tus selectores están marcados con 'chained-select'
            $(this).chainedSelect();
        });
    }
    
    // Inicializar en el primer cargado
    initSmartSelect();

    // Manejar la adición de formularios en el formset
    $(document).on('formset:added', function(event, $form) {
        initSmartSelect();  // Re-inicializar para nuevos formularios
    });
});