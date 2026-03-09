const formDelete = document.getElementById('formDelete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_equipo_delete').value;
    const url = `http://www.sei.bo:8000/equipos/${id}`;

    fetch(urlDelete, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Equipo eliminado exitosamente");
            formDelete.reset();
        } else {
            alert("Error al intentar eliminar el equipo.");
        }
    })
    .catch(error => {
        alert("Error de conexión");
    });
});