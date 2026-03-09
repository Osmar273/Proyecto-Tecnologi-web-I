const formPut = document.getElementById('formPut');

formPut.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_usuario_put').value;
    const url = `http://www.sei.bo:8000/usuarios/${id}`;

    const data = {
        nombre: document.getElementById('nombre_put').value,
        correo: document.getElementById('correo_put').value,
        contrasena: document.getElementById('contrasena_put').value,
        rol: document.getElementById('rol_put').value,
        especialidad: document.getElementById('especialidad_put').value
    };

    fetch(urlPut, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert("Usuario actualizado exitosamente");
        formPut.reset();
    })
    .catch(error => {
        alert("Error al actualizar el usuario");
    });
});