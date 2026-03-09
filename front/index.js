window.addEventListener('load', () => {
    const datosGuardados = localStorage.getItem('usuario');
    
    if (!datosGuardados) {
        window.location.href = 'login.html';
        return;
    }
    
    const usuario = JSON.parse(datosGuardados);
    const rolDetectado = usuario.rol ? String(usuario.rol).toLowerCase().trim() : "";

    if (rolDetectado !== 'administrador') {
        window.location.href = 'panel_tecnico.html';
        return;
    }

    // Actualizamos tu HTML con tus datos reales
    if(document.getElementById('nombreUsuario')) {
        document.getElementById('nombreUsuario').textContent = usuario.nombre;
    }
    if(document.getElementById('rolUsuario')) {
        document.getElementById('rolUsuario').textContent = usuario.rol;
    }
});

const btnSalir = document.getElementById('btnCerrarSesion');
if (btnSalir) {
    btnSalir.addEventListener('click', () => {
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
    });
}