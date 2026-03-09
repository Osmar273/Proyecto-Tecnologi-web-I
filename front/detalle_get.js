const url = "http://www.sei.bo:8000/detalle_materiales/";
const contenedor = document.getElementById('data');

const CargaData = (datos) => {
    let resultado = "";
    for (let i = 0; i < datos.length; i++) {
        resultado += `
        <li>
            <h3>Detalle #${datos[i].id_detalle}</h3>
            <p><strong>ID Proyecto:</strong> ${datos[i].id_proyecto}</p>
            <p><strong>ID Material:</strong> ${datos[i].id_material}</p>
            <p><strong>Cantidad Usada:</strong> ${datos[i].cantidad_usada}</p>
        </li>
        `;
    }
    contenedor.innerHTML = resultado;
}

fetch(url)
    .then(response => response.json())
    .then(data => CargaData(data))
    .catch(error => contenedor.innerHTML = "<li>Error al conectar</li>");