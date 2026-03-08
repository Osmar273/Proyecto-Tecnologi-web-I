const urlPost = "http://127.0.0.1:8000/usuarios";
const formPost = document.getElementById('formPost');

formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        contrasena: document.getElementById('contrasena').value,
        rol: document.getElementById('rol').value,
        especialidad: document.getElementById('especialidad').value
    };

    fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert("Usuario registrado exitosamente");
        formPost.reset();
    })
    .catch(error => {
        alert("Error al registrar el usuario");
    });
});