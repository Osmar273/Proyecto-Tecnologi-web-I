const url = "http://127.0.0.1:8000/proveedores";
const contenedor = document.getElementById('data');

const CargaData = (datos) => {
    let resultado = "";
    for (let i = 0; i < datos.length; i++) {
        resultado += `
        <li>
            <h3>${datos[i].nombre_proveedor}</h3>
            <p><strong>ID Proveedor:</strong> ${datos[i].id_proveedor}</p>
            <p><strong>Rubro:</strong> ${datos[i].rubro}</p>
            <p><strong>Contacto:</strong> ${datos[i].contacto}</p>
        </li>
        `;
    }
    contenedor.innerHTML = resultado;
}

fetch(url)
    .then(response => response.json())
    .then(data => CargaData(data))
    .catch(error => contenedor.innerHTML = "<li>Error al conectar</li>");