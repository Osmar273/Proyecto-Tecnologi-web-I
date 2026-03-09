const url = "http://www.sei.bo:8000/usuarios/";
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
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al registrar');
        }
        return response.json();
    })
    .then(result => {
        alert("Usuario registrado exitosamente");
        formPost.reset();
    })
    .catch(error => {
        alert("Error al registrar el usuario");
    });
});