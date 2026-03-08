const formPut = document.getElementById('formPut');

formPut.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_material_put').value;
    const urlPut = `http://127.0.0.1:8000/materiales/${id}`;

    const data = {
        nombre_componente: document.getElementById('nombre_componente_put').value,
        costo_unitario: parseFloat(document.getElementById('costo_unitario_put').value),
        id_proveedor: parseInt(document.getElementById('id_proveedor_put').value)
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
        alert("Material actualizado exitosamente");
        formPut.reset();
    })
    .catch(error => {
        alert("Error al actualizar el material");
    });
});