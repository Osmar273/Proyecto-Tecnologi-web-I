const formDelete = document.getElementById('formDelete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_proveedor_delete').value;
    const urlDelete = `http://127.0.0.1:8000/proveedores/${id}`;

    fetch(urlDelete, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Proveedor eliminado exitosamente");
            formDelete.reset();
        } else {
            alert("Error: Este proveedor tiene materiales asignados.");
        }
    })
    .catch(error => {
        alert("Error de conexión");
    });
});