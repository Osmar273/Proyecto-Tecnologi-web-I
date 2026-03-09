const formDelete = document.getElementById('formDelete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_usuario_delete').value;
    const url = `http://www.sei.bo:8000/usuarios/${id}`;

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