const urlPost = "http://127.0.0.1:8000/reportes_tecnicos";
const formPost = document.getElementById('formPost');

formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        fecha_visita: document.getElementById('fecha_visita').value,
        detalle_trabajo: document.getElementById('detalle_trabajo').value,
        archivo_adjunto: document.getElementById('archivo_adjunto').value,
        id_proyecto: parseInt(document.getElementById('id_proyecto').value)
    };

    fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert("Reporte registrado exitosamente");
        formPost.reset();
    })
    .catch(error => {
        alert("Error al registrar el reporte");
    });
});