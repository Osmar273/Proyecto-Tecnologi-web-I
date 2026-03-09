const urlLogin = "http://www.sei.bo:8000/usuarios/login";

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        correo: document.getElementById('correo').value.trim(),
        contrasena: document.getElementById('contrasena').value.trim()
    };

    fetch(urlLogin, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error('Credenciales incorrectas');
        return response.json();
    })
    .then(usuario => {

        localStorage.setItem('usuario', JSON.stringify(usuario));

        const rol = usuario.rol.toLowerCase();
        if (rol === 'administrador') {
            window.location.href = 'index.html';
        } else {
            window.location.href = 'panel_tecnico.html';
        }
    })
    .catch(error => alert("Error: " + error.message));
});