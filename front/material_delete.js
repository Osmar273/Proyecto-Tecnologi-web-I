const formDelete = document.getElementById('formDelete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_material_delete').value;
    const url = `http://www.sei.bo:8000/materiales/${id}`;

    fetch(urlDelete, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Material eliminado exitosamente");
            formDelete.reset();
        } else {
            alert("Error: Verifica que este material no esté asignado a un proyecto.");
        }
    })
    .catch(error => {
        alert("Error de conexión");
    });
});