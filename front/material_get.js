const url = "http://www.sei.bo:8000/materiales/";
const contenedor = document.getElementById('data');

const CargaData = (datos) => {
    let resultado = "";
    for (let i = 0; i < datos.length; i++) {
        resultado += `
        <li>
            <h3>${datos[i].nombre_componente}</h3>
            <p><strong>ID Material:</strong> ${datos[i].id_material}</p>
            <p><strong>Costo Unitario:</strong> Bs. ${datos[i].costo_unitario}</p>
            <p><strong>ID Proveedor:</strong> ${datos[i].id_proveedor}</p>
        </li>
        `;
    }
    contenedor.innerHTML = resultado;
}

fetch(url)
    .then(response => response.json())
    .then(data => CargaData(data))
    .catch(error => contenedor.innerHTML = "<li>Error al conectar</li>");