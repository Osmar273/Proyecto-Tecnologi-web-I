const formDelete = document.getElementById('formDelete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_cliente_delete').value;
    const urlDelete = `http://127.0.0.1:8000/clientes/${id}`;

    fetch(urlDelete, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Cliente eliminado exitosamente");
            formDelete.reset();
        } else {
            alert("Error: Este cliente tiene proyectos asignados.");
        }
    })
    .catch(error => {
        alert("Error de conexión");
    });
});