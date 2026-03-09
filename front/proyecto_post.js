const url = "http://www.sei.bo:8000/proyectos/";
const formPost = document.getElementById('formPost');

formPost.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        nombre_proyecto: document.getElementById('nombre_proyecto').value,
        descripcion: document.getElementById('descripcion').value,
        fecha_inicio: document.getElementById('fecha_inicio').value,
        estado: document.getElementById('estado').value,
        presupuesto_total: parseFloat(document.getElementById('presupuesto_total').value),
        fecha_presupuesto: document.getElementById('fecha_presupuesto').value,
        estado_presupuesto: document.getElementById('estado_presupuesto').value,
        id_cliente: parseInt(document.getElementById('id_cliente').value),
        id_usuario: parseInt(document.getElementById('id_usuario').value)
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
        alert("Proyecto registrado exitosamente");
        formPost.reset();
    })
    .catch(error => {
        alert("Error al registrar el proyecto");
    });
});
