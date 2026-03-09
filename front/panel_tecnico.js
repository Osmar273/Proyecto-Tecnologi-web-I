window.addEventListener('load', () => {
    const datosGuardados = localStorage.getItem('usuario');

    if (!datosGuardados) {
        window.location.href = 'login.html';
        return;
    }
    
    const usuario = JSON.parse(datosGuardados);
    const rolDetectado = usuario.rol ? String(usuario.rol).toLowerCase().trim() : "";

    if (rolDetectado === 'administrador') {
        window.location.href = 'index.html';
        return;
    }

    if(document.getElementById('nombreTecnico')) {
        document.getElementById('nombreTecnico').textContent = usuario.nombre;
    }

    if(document.getElementById('especialidad')) {
        document.getElementById('especialidad').textContent = usuario.especialidad || 'Técnico';
    }
});

const btnSalir = document.getElementById('btnCerrarSesion');
if (btnSalir) {
    btnSalir.addEventListener('click', () => {
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
    });
}