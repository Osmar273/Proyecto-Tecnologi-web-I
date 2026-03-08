const formDelete = document.getElementById('formDelete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_reporte_delete').value;
    const urlDelete = `http://127.0.0.1:8000/reportes_tecnicos/${id}`;

    fetch(urlDelete, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Reporte eliminado exitosamente");
            formDelete.reset();
        } else {
            alert("Error al intentar eliminar el reporte.");
        }
    })
    .catch(error => {
        alert("Error de conexión");
    });
});