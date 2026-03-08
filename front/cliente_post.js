const urlPost = "http://127.0.0.1:8000/clientes";
const formPost = document.getElementById('formPost');

formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        nombre_empresa: document.getElementById('nombre_empresa').value,
        nit: document.getElementById('nit').value,
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
        alert("Cliente registrado exitosamente");
        formPost.reset();
    })
    .catch(error => {
        alert("Error al registrar el cliente");
    });
});