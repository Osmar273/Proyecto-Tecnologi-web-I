const formDelete = document.getElementById('formDelete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_persona_delete').value;
    const url = `http://www.sei.bo:8000/persona/${id}`;

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