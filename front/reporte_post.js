const url = "http://www.sei.bo:8000/reportes_tecnicos/";
const formPost = document.getElementById('formPost');

formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const archivoInput = document.getElementById('archivo_adjunto');
    let nombreArchivo = "";
    
    if (archivoInput.files.length > 0) {
        nombreArchivo = archivoInput.files[0].name;
    }

    const data = {
        fecha_visita: document.getElementById('fecha_visita').value,
        detalle_trabajo: document.getElementById('detalle_trabajo').value,
        archivo_adjunto: nombreArchivo,
        id_proyecto: parseInt(document.getElementById('id_proyecto').value)
    };

    fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(result => {
        alert("Reporte registrado exitosamente");
        formPost.reset();
    })
    .catch(error => {
        alert("Error al registrar el reporte");
    });
});