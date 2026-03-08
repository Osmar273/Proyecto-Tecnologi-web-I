
const url = "http://127.0.0.1:8000/proyectos"; 
const contenedor = document.getElementById('data');

const CargaData = (datos) => {
    let resultado = "";

    for (let i = 0; i < datos.length; i++) {

        resultado += `
        <li>
            <h3>${datos[i].nombre_proyecto}</h3>
            <p><strong>ID Proyecto:</strong> ${datos[i].id_proyecto}</p>
            <p><strong>Descripción:</strong> ${datos[i].descripcion}</p>
            <p><strong>Fecha Inicio:</strong> ${datos[i].fecha_inicio}</p>
            <p><strong>Estado General:</strong> <span class="estado-naranja">${datos[i].estado}</span></p>
            <p><strong>Presupuesto Total:</strong> Bs. ${datos[i].presupuesto_total}</p>
            <p><strong>Fecha de Presupuesto:</strong> ${datos[i].fecha_presupuesto}</p>
            <p><strong>Estado Presupuesto:</strong> ${datos[i].estado_presupuesto}</p>
            <p><strong>ID Cliente (Empresa):</strong> ${datos[i].id_cliente}</p>
            <p><strong>ID Usuario (Ingeniero):</strong> ${datos[i].id_usuario}</p>
            <hr>
        </li>
        `;
    }

    contenedor.innerHTML = resultado;
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        CargaData(data);
    })
    .catch(error => {
        console.log("Error al obtener los datos:", error);
        contenedor.innerHTML = "<li>Error al conectar con el servidor. Revisa si FastAPI está corriendo.</li>";
    });