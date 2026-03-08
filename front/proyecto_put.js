const formPut = document.getElementById('formPut');

formPut.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('id_proyecto_put').value;
    const urlPut = `http://127.0.0.1:8000/proyectos/${id}`;

    const data = {
        nombre_proyecto: document.getElementById('nombre_proyecto_put').value,
        descripcion: document.getElementById('descripcion_put').value,
        fecha_inicio: document.getElementById('fecha_inicio_put').value,
        estado: document.getElementById('estado_put').value,
        presupuesto_total: parseFloat(document.getElementById('presupuesto_total_put').value),
        fecha_presupuesto: document.getElementById('fecha_presupuesto_put').value,
        estado_presupuesto: document.getElementById('estado_presupuesto_put').value,
        id_cliente: parseInt(document.getElementById('id_cliente_put').value),
        id_usuario: parseInt(document.getElementById('id_usuario_put').value)
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
        alert("Proyecto actualizado exitosamente");
        formPut.reset();
    })
    .catch(error => {
        alert("Error al actualizar el proyecto");
    });
});