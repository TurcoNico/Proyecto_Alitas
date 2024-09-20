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



// Peticiones GET APi
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