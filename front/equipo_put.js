const formPut = document.getElementById('formPut');

formPut.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_equipo_put').value;
    const url = `http://www.sei.bo:8000/equipos/${id}`;

    const data = {
        nombre_maquina: document.getElementById('nombre_maquina_put').value,
        marca: document.getElementById('marca_put').value,
        modelo: document.getElementById('modelo_put').value,
        id_proyecto: parseInt(document.getElementById('id_proyecto_put').value)
    };

    fetch(urlPut, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert("Equipo actualizado exitosamente");
        formPut.reset();
    })
    .catch(error => {
        alert("Error al actualizar el equipo");
    });
});