const formDelete = document.getElementById('formDelete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_persona_delete').value;
    const urlDelete = `http://127.0.0.1:8000/persona/${id}`;

    fetch(urlDelete, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Datos eliminados exitosamente");
            formDelete.reset();
        } else {
            alert("Error al intentar eliminar el registro.");
        }
    })
    .catch(error => {
        alert("Error de conexión");
    });
});