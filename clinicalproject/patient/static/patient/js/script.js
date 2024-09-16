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