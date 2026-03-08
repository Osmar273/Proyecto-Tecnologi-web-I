const urlPost = "http://127.0.0.1:8000/equipos";
const formPost = document.getElementById('formPost');

formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        nombre_maquina: document.getElementById('nombre_maquina').value,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
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
        alert("Equipo registrado exitosamente");
        formPost.reset();
    })
    .catch(error => {
        alert("Error al registrar el equipo");
    });
});