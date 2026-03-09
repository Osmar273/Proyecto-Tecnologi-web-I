const formPut = document.getElementById('formPut');

formPut.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_proveedor_put').value;
    const url = `http://www.sei.bo:8000/proveedores/${id}`;

    const data = {
        nombre_proveedor: document.getElementById('nombre_proveedor_put').value,
        rubro: document.getElementById('rubro_put').value,
        contacto: document.getElementById('contacto_put').value
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
        alert("Proveedor actualizado exitosamente");
        formPut.reset();
    })
    .catch(error => {
        alert("Error al actualizar el proveedor");
    });
});