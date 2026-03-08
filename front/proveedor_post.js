const urlPost = "http://127.0.0.1:8000/proveedores";
const formPost = document.getElementById('formPost');

formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        nombre_proveedor: document.getElementById('nombre_proveedor').value,
        rubro: document.getElementById('rubro').value,
        contacto: document.getElementById('contacto').value
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
        alert("Proveedor registrado exitosamente");
        formPost.reset();
    })
    .catch(error => {
        alert("Error al registrar el proveedor");
    });
});