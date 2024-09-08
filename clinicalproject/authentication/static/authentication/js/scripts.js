document.addEventListener('DOMContentLoaded', function() {
    var inputElement = document.querySelector('.auth-form__input-user');

    inputElement.addEventListener('focus', function() {
        this.setAttribute('placeholder', '');
    });

    inputElement.addEventListener('blur', function() {
        if (this.value === '') {
            this.setAttribute('placeholder', 'Usuario');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var inputElement = document.querySelector('.auth-form__input-pass');

    inputElement.addEventListener('focus', function() {
        this.setAttribute('placeholder', '');
    });

    inputElement.addEventListener('blur', function() {
        if (this.value === '') {
            this.setAttribute('placeholder', 'Contraseña');
        }
    });
});