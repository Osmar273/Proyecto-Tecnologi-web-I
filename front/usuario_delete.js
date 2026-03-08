const formDelete = document.getElementById('formDelete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_usuario_delete').value;
    const urlDelete = `http://127.0.0.1:8000/usuarios/${id}`;

    fetch(urlDelete, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Usuario eliminado exitosamente");
            formDelete.reset();
        } else {
            alert("Error: Este usuario podría estar vinculado a proyectos o tener datos personales.");
        }
    })
    .catch(error => {
        alert("Error de conexión");
    });
});