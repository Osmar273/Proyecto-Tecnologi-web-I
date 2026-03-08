const formPut = document.getElementById('formPut');

formPut.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_reporte_put').value;
    const urlPut = `http://127.0.0.1:8000/reportes_tecnicos/${id}`;

    const data = {
        fecha_visita: document.getElementById('fecha_visita_put').value,
        detalle_trabajo: document.getElementById('detalle_trabajo_put').value,
        archivo_adjunto: document.getElementById('archivo_adjunto_put').value,
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
        alert("Reporte actualizado exitosamente");
        formPut.reset();
    })
    .catch(error => {
        alert("Error al actualizar el reporte");
    });
});