const formDelete = document.getElementById('formDelete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_detalle_delete').value;
    const url = `http://www.sei.bo:8000/detalle_materiales/${id}`;

    fetch(urlDelete, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Detalle eliminado exitosamente");
            formDelete.reset();
        } else {
            alert("Error al intentar eliminar el detalle.");
        }
    })
    .catch(error => {
        alert("Error de conexión");
    });
});