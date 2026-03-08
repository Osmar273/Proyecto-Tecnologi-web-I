const formDelete = document.getElementById('formDelete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('id_proyecto_delete').value;
    const urlDelete = `http://127.0.0.1:8000/proyectos/${id}`;

    fetch(urlDelete, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Proyecto eliminado exitosamente");
            formDelete.reset();
        } else {
            alert("Error al eliminar. Revisa si hay reportes vinculados a este ID.");
        }
    })
    .catch(error => {
        alert("Error de conexión");
    });
});