from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import date
from config.conexionBD import get_conexion 

router = APIRouter()

class ReporteTecnico(BaseModel):
    fecha_visita: date
    detalle_trabajo: Optional[str] = None
    archivo_adjunto: Optional[str] = None
    id_proyecto: int

@router.get("/")
async def listar_buscar(id_reporte: Optional[int] = None, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            if id_reporte:
                await cursor.execute("SELECT * FROM reportes_tecnicos WHERE id_reporte = %s", (id_reporte,))
                res = await cursor.fetchone()
                return res if res else HTTPException(status_code=404, detail="No encontrado")
            else:
                await cursor.execute("SELECT * FROM reportes_tecnicos")
                return await cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/")
async def insertar(rep: ReporteTecnico, conn = Depends(get_conexion)):
    consulta = "INSERT INTO reportes_tecnicos(fecha_visita, detalle_trabajo, archivo_adjunto, id_proyecto) VALUES(%s, %s, %s, %s)"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (rep.fecha_visita, rep.detalle_trabajo, rep.archivo_adjunto, rep.id_proyecto))
            await conn.commit()
            return {"mensaje": "Registrado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{id_reporte}")
async def actualizar(id_reporte: int, rep: ReporteTecnico, conn = Depends(get_conexion)):
    consulta = "UPDATE reportes_tecnicos SET fecha_visita=%s, detalle_trabajo=%s, archivo_adjunto=%s, id_proyecto=%s WHERE id_reporte=%s"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (rep.fecha_visita, rep.detalle_trabajo, rep.archivo_adjunto, rep.id_proyecto, id_reporte))
            await conn.commit()
            return {"mensaje": "Actualizado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{id_reporte}")
async def eliminar(id_reporte: int, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            await cursor.execute("DELETE FROM reportes_tecnicos WHERE id_reporte = %s", (id_reporte,))
            await conn.commit()
            return {"mensaje": "Eliminado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))