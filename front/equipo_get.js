const url = "http://www.sei.bo:8000/equipos/";
const contenedor = document.getElementById('data');

const CargaData = (datos) => {
    let resultado = "";
    for (let i = 0; i < datos.length; i++) {
        resultado += `
        <li>
            <h3>${datos[i].nombre_maquina}</h3>
            <p><strong>ID Equipo:</strong> ${datos[i].id_equipo}</p>
            <p><strong>Marca:</strong> ${datos[i].marca}</p>
            <p><strong>Modelo:</strong> ${datos[i].modelo}</p>
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