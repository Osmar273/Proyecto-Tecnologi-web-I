from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import date
from config.conexionBD import get_conexion 

router = APIRouter()

class Persona(BaseModel):
    id_usuario: int
    ci: str
    ap_paterno: Optional[str] = None
    ap_materno: Optional[str] = None
    fecha_nac: Optional[date] = None
    direccion: Optional[str] = None
    telefono: Optional[str] = None

@router.get("/")
async def listar_buscar(id_persona: Optional[int] = None, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            if id_persona:
                await cursor.execute("SELECT * FROM persona WHERE id_persona = %s", (id_persona,))
                res = await cursor.fetchone()
                return res if res else HTTPException(status_code=404, detail="No encontrado")
            else:
                await cursor.execute("SELECT * FROM persona")
                return await cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {e}")

@router.post("/")
async def insertar(per: Persona, conn = Depends(get_conexion)):
    consulta = "INSERT INTO persona(id_usuario, ci, ap_paterno, ap_materno, fecha_nac, direccion, telefono) VALUES(%s, %s, %s, %s, %s, %s, %s)"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (per.id_usuario, per.ci, per.ap_paterno, per.ap_materno, per.fecha_nac, per.direccion, per.telefono))
            await conn.commit()
            return {"mensaje": "Registrado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{id_persona}")
async def actualizar(id_persona: int, per: Persona, conn = Depends(get_conexion)):
    consulta = "UPDATE persona SET id_usuario=%s, ci=%s, ap_paterno=%s, ap_materno=%s, fecha_nac=%s, direccion=%s, telefono=%s WHERE id_persona=%s"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (per.id_usuario, per.ci, per.ap_paterno, per.ap_materno, per.fecha_nac, per.direccion, per.telefono, id_persona))
            await conn.commit()
            return {"mensaje": "Actualizado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{id_persona}")
async def eliminar(id_persona: int, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            await cursor.execute("DELETE FROM persona WHERE id_persona = %s", (id_persona,))
            await conn.commit()
            return {"mensaje": "Eliminado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))