const url = "http://www.sei.bo:8000/detalle_materiales/";
const formPost = document.getElementById('formPost');

formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        id_proyecto: parseInt(document.getElementById('id_proyecto').value),
        id_material: parseInt(document.getElementById('id_material').value),
        cantidad_usada: parseFloat(document.getElementById('cantidad_usada').value)
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
        alert("Material asignado exitosamente al proyecto");
        formPost.reset();
    })
    .catch(error => {
        alert("Error al registrar el detalle");
    });
});