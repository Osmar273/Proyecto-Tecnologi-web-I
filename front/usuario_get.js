const url = "http://www.sei.bo:8000/usuarios/";
const contenedor = document.getElementById('data');

const CargaData = (datos) => {
    let resultado = "";
    for (let i = 0; i < datos.length; i++) {
        resultado += `
        <li>
            <h3>${datos[i].nombre}</h3>
            <p><strong>ID Usuario:</strong> ${datos[i].id_usuario}</p>
            <p><strong>Correo:</strong> ${datos[i].correo}</p>
            <p><strong>Rol:</strong> ${datos[i].rol}</p>
            <p><strong>Especialidad:</strong> ${datos[i].especialidad}</p>
        </li>
        `;
    }
    contenedor.innerHTML = resultado;
}

fetch(url)
    .then(response => response.json())
    .then(data => CargaData(data))
    .catch(error => contenedor.innerHTML = "<li>Error al conectar</li>");