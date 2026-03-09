const formPut = document.getElementById('formPut');

formPut.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id_persona_put').value;
    const url = `http://www.sei.bo:8000/persona/${id}`;

    const data = {
        id_usuario: parseInt(document.getElementById('id_usuario_put').value),
        ci: document.getElementById('ci_put').value,
        ap_paterno: document.getElementById('ap_paterno_put').value,
        ap_materno: document.getElementById('ap_materno_put').value,
        fecha_nac: document.getElementById('fecha_nac_put').value,
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
        alert("Datos actualizados exitosamente");
        formPut.reset();
    })
    .catch(error => {
        alert("Error al actualizar los datos");
    });
});