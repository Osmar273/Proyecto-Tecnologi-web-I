const formDelete = document.getElementById('formDelete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_cliente_delete').value;
    const url = `http://www.sei.bo:8000/clientes/${id}`;

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