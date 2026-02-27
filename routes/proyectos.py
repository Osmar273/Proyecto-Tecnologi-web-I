from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import date
from config.conexionBD import get_conexion 

router = APIRouter()

class Proyecto(BaseModel):
    nombre_proyecto: str
    descripcion: Optional[str] = None
    fecha_inicio: Optional[date] = None
    estado: Optional[str] = None
    presupuesto_total: Optional[float] = 0.00
    fecha_presupuesto: Optional[date] = None
    estado_presupuesto: Optional[str] = None
    id_cliente: int
    id_usuario: int

@router.get("/")
async def listar_buscar(id_proyecto: Optional[int] = None, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            if id_proyecto:
                await cursor.execute("SELECT * FROM proyectos WHERE id_proyecto = %s", (id_proyecto,))
                res = await cursor.fetchone()
                return res if res else HTTPException(status_code=404, detail="No encontrado")
            else:
                await cursor.execute("SELECT * FROM proyectos")
                return await cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {e}")

@router.post("/")
async def insertar(proy: Proyecto, conn = Depends(get_conexion)):
    consulta = """INSERT INTO proyectos(nombre_proyecto, descripcion, fecha_inicio, estado, presupuesto_total, fecha_presupuesto, estado_presupuesto, id_cliente, id_usuario) 
                  VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (proy.nombre_proyecto, proy.descripcion, proy.fecha_inicio, proy.estado, proy.presupuesto_total, proy.fecha_presupuesto, proy.estado_presupuesto, proy.id_cliente, proy.id_usuario))
            await conn.commit()
            return {"mensaje": "Registrado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{id_proyecto}")
async def actualizar(id_proyecto: int, proy: Proyecto, conn = Depends(get_conexion)):
    consulta = """UPDATE proyectos SET nombre_proyecto=%s, descripcion=%s, fecha_inicio=%s, estado=%s, presupuesto_total=%s, fecha_presupuesto=%s, estado_presupuesto=%s, id_cliente=%s, id_usuario=%s 
                  WHERE id_proyecto=%s"""
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (proy.nombre_proyecto, proy.descripcion, proy.fecha_inicio, proy.estado, proy.presupuesto_total, proy.fecha_presupuesto, proy.estado_presupuesto, proy.id_cliente, proy.id_usuario, id_proyecto))
            await conn.commit()
            return {"mensaje": "Actualizado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{id_proyecto}")
async def eliminar(id_proyecto: int, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            await cursor.execute("DELETE FROM proyectos WHERE id_proyecto = %s", (id_proyecto,))
            await conn.commit()
            return {"mensaje": "Eliminado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))