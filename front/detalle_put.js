const formPut = document.getElementById('formPut');

formPut.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_detalle_put').value;
    const url = `http://www.sei.bo:8000/detalle_materiales/${id}`;

    const data = {
        id_proyecto: parseInt(document.getElementById('id_proyecto_put').value),
        id_material: parseInt(document.getElementById('id_material_put').value),
        cantidad_usada: parseFloat(document.getElementById('cantidad_usada_put').value)
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
        alert("Detalle actualizado exitosamente");
        formPut.reset();
    })
    .catch(error => {
        alert("Error al actualizar el detalle");
    });
});