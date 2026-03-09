const url = "http://www.sei.bo:8000/materiales/";
const formPost = document.getElementById('formPost');

formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        nombre_componente: document.getElementById('nombre_componente').value,
        costo_unitario: parseFloat(document.getElementById('costo_unitario').value),
        id_proveedor: parseInt(document.getElementById('id_proveedor').value)
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
        alert("Material registrado exitosamente");
        formPost.reset();
    })
    .catch(error => {
        alert("Error al registrar el material");
    });
});