const formPut = document.getElementById('formPut');

formPut.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_cliente_put').value;
    const url = `http://www.sei.bo:8000/clientes/${id}`;

    const data = {
        nombre_empresa: document.getElementById('nombre_empresa_put').value,
        nit: document.getElementById('nit_put').value,
        direccion: document.getElementById('direccion_put').value,
        telefono: document.getElementById('telefono_put').value
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
        alert("Cliente actualizado exitosamente");
        formPut.reset();
    })
    .catch(error => {
        alert("Error al actualizar el cliente");
    });
});