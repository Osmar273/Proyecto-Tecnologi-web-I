from fastapi import FastAPI
from routes import clientes
from routes import proveedores
from routes import usuarios
from routes import persona
from routes import proyectos
from routes import equipos
from routes import materiales
from routes import detalle_materiales
from routes import reportes_tecnicos
#holaaa
from config.conexionBD import app

app.include_router(clientes.router, prefix="/clientes", tags=["CLIENTES"])
app.include_router(proveedores.router, prefix="/proveedores",tags=["PROVEEDORES"])
app.include_router(usuarios.router, prefix="/usuarios",tags=["USUARIOS"])
app.include_router(persona.router, prefix="/persona",tags=["PERSONA"])
app.include_router(proyectos.router, prefix="/proyectos",tags=["PROYECTOS"])
app.include_router(equipos.router, prefix="/equipos",tags=["EQUIPOS"])
app.include_router(materiales.router, prefix="/materiales",tags=["MATERIALES"])
app.include_router(detalle_materiales.router, prefix="/detalle_materiales",tags=["DETALLE MATERIALES"])
app.include_router(reportes_tecnicos.router, prefix="/reportes_tecnicos",tags=["REPOSRTES TECNICOS"])
