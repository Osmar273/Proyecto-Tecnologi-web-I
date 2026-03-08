const url = "http://127.0.0.1:8000/clientes";
const contenedor = document.getElementById('data');

const CargaData = (datos) => {
    let resultado = "";
    for (let i = 0; i < datos.length; i++) {
        resultado += `
        <li>
            <h3>${datos[i].nombre_empresa}</h3>
            <p><strong>ID Cliente:</strong> ${datos[i].id_cliente}</p>
            <p><strong>NIT:</strong> ${datos[i].nit}</p>
            <p><strong>Dirección:</strong> ${datos[i].direccion}</p>
            <p><strong>Teléfono:</strong> ${datos[i].telefono}</p>
        </li>
        `;
    }
    contenedor.innerHTML = resultado;
}

fetch(url)
    .then(response => response.json())
    .then(data => CargaData(data))
    .catch(error => contenedor.innerHTML = "<li>Error al conectar</li>");