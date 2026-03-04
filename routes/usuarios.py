from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from config.conexionBD import get_conexion 

router = APIRouter()

class Usuario(BaseModel):
    nombre: str
    correo: str
    contrasena: str
    rol: Optional[str] = None
    especialidad: Optional[str] = None

@router.get("/")
async def listar_buscar(id_usuario: Optional[int] = None, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            if id_usuario:
                await cursor.execute("SELECT * FROM usuarios WHERE id_usuario = %s", (id_usuario,))
                res = await cursor.fetchone()
                return res if res else HTTPException(status_code=404, detail="No encontrado")
            else:
                await cursor.execute("SELECT * FROM usuarios")
                return await cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {e}")

@router.post("/")
async def insertar(usr: Usuario, conn = Depends(get_conexion)):
    consulta = "INSERT INTO usuarios(nombre, correo, contrasena, rol, especialidad) VALUES(%s, %s, %s, %s, %s)"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (usr.nombre, usr.correo, usr.contrasena, usr.rol, usr.especialidad))
            await conn.commit()
            return {"mensaje": "Registrado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

