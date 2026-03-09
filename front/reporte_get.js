const url = "http://www.sei.bo:8000/reportes_tecnicos/";
const contenedor = document.getElementById('data');

const CargaData = (datos) => {
    let resultado = "";
    for (let i = 0; i < datos.length; i++) {
        resultado += `
        <li>
            <h3>Reporte #${datos[i].id_reporte}</h3>
            <p><strong>Fecha de Visita:</strong> ${datos[i].fecha_visita}</p>
            <p><strong>Detalle del Trabajo:</strong> ${datos[i].detalle_trabajo}</p>
            <p><strong>Archivo Adjunto:</strong> ${datos[i].archivo_adjunto}</p>
            <p><strong>ID Proyecto:</strong> ${datos[i].id_proyecto}</p>
        </li>
        `;
    }
    contenedor.innerHTML = resultado;
}

fetch(url)
    .then(response => response.json())
    .then(data => CargaData(data))
    .catch(error => contenedor.innerHTML = "<li>Error al conectar</li>");