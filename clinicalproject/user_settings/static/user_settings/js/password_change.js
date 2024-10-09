document.getElementById('password-change-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const oldPassword = document.getElementById('old_password').value;
    const newPassword = document.getElementById('new_password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    const data = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
    };

    fetch('api/password/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('message');
        if (data.error) {
            messageDiv.innerHTML = `<p style="color: red;">${data.error}</p>`;
        } else {
            messageDiv.innerHTML = `<p style="color: green;">${data.message}</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function getCookie(name) {
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