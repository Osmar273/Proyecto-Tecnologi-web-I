from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from config.conexionBD import get_conexion 

router = APIRouter()

class Equipo(BaseModel):
    nombre_maquina: str
    marca: Optional[str] = None
    modelo: Optional[str] = None
    id_proyecto: int

@router.get("/")
async def listar_buscar(id_equipo: Optional[int] = None, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            if id_equipo:
                await cursor.execute("SELECT * FROM equipos WHERE id_equipo = %s", (id_equipo,))
                res = await cursor.fetchone()
                return res if res else HTTPException(status_code=404, detail="No encontrado")
            else:
                await cursor.execute("SELECT * FROM equipos")
                return await cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/")
async def insertar(eq: Equipo, conn = Depends(get_conexion)):
    consulta = "INSERT INTO equipos(nombre_maquina, marca, modelo, id_proyecto) VALUES(%s, %s, %s, %s)"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (eq.nombre_maquina, eq.marca, eq.modelo, eq.id_proyecto))
            await conn.commit()
            return {"mensaje": "Registrado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{id_equipo}")
async def actualizar(id_equipo: int, eq: Equipo, conn = Depends(get_conexion)):
    consulta = "UPDATE equipos SET nombre_maquina=%s, marca=%s, modelo=%s, id_proyecto=%s WHERE id_equipo=%s"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (eq.nombre_maquina, eq.marca, eq.modelo, eq.id_proyecto, id_equipo))
            await conn.commit()
            return {"mensaje": "Actualizado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{id_equipo}")
async def eliminar(id_equipo: int, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            await cursor.execute("DELETE FROM equipos WHERE id_equipo = %s", (id_equipo,))
            await conn.commit()
            return {"mensaje": "Eliminado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))