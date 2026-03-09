const url = "http://www.sei.bo:8000/persona/";
const formPost = document.getElementById('formPost');

formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        id_usuario: parseInt(document.getElementById('id_usuario').value),
        ci: document.getElementById('ci').value,
        ap_paterno: document.getElementById('ap_paterno').value,
        ap_materno: document.getElementById('ap_materno').value,
        fecha_nac: document.getElementById('fecha_nac').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value
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
        alert("Datos personales registrados exitosamente");
        formPost.reset();
    })
    .catch(error => {
        alert("Error al registrar los datos personales");
    });
});