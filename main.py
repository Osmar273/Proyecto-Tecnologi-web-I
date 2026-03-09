import asyncio
import sys
import os

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes import clientes, proveedores, usuarios, persona, proyectos, equipos, materiales, detalle_materiales, reportes_tecnicos
from config.conexionBD import app

# AQUÍ ESTÁ LA CORRECCIÓN: Agregamos tu dominio www.sei.bo a la lista
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500", 
        "http://localhost:5500", 
        "http://www.sei.bo:5500"  # <- Este es el permiso clave
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if not os.path.exists("uploads"):
    os.makedirs("uploads")

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(clientes.router, prefix="/clientes", tags=["CLIENTES"])
app.include_router(proveedores.router, prefix="/proveedores", tags=["PROVEEDORES"])
app.include_router(usuarios.router, prefix="/usuarios", tags=["USUARIOS"])
app.include_router(persona.router, prefix="/persona", tags=["PERSONA"])
app.include_router(proyectos.router, prefix="/proyectos", tags=["PROYECTOS"])
app.include_router(equipos.router, prefix="/equipos", tags=["EQUIPOS"])
app.include_router(materiales.router, prefix="/materiales", tags=["MATERIALES"])
app.include_router(detalle_materiales.router, prefix="/detalle_materiales", tags=["DETALLE MATERIALES"])
app.include_router(reportes_tecnicos.router, prefix="/reportes_tecnicos", tags=["REPORTES TECNICOS"])

@app.get("/")
async def root():
    return {"mensaje": "API SEI - Sistema Eléctrico Industrial"}