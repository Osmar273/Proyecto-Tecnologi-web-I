const url = "http://www.sei.bo:8000/persona/";
const contenedor = document.getElementById('data');

const CargaData = (datos) => {
    let resultado = "";
    for (let i = 0; i < datos.length; i++) {
        resultado += `
        <li>
            <h3>${datos[i].ap_paterno} ${datos[i].ap_materno}</h3>
            <p><strong>ID Persona:</strong> ${datos[i].id_persona}</p>
            <p><strong>ID Usuario Asignado:</strong> ${datos[i].id_usuario}</p>
            <p><strong>Carnet de Identidad:</strong> ${datos[i].ci}</p>
            <p><strong>Fecha de Nacimiento:</strong> ${datos[i].fecha_nac}</p>
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