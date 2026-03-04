from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from config.conexionBD import get_conexion 

router = APIRouter()

class DetalleMaterial(BaseModel):
    id_proyecto: int
    id_material: int
    cantidad_usada: float

@router.get("/")
async def listar_buscar(id_detalle: Optional[int] = None, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            if id_detalle:
                await cursor.execute("SELECT * FROM detalle_materiales WHERE id_detalle = %s", (id_detalle,))
                res = await cursor.fetchone()
                return res if res else HTTPException(status_code=404, detail="No encontrado")
            else:
                await cursor.execute("SELECT * FROM detalle_materiales")
                return await cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/")
async def insertar(det: DetalleMaterial, conn = Depends(get_conexion)):
    consulta = "INSERT INTO detalle_materiales(id_proyecto, id_material, cantidad_usada) VALUES(%s, %s, %s)"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (det.id_proyecto, det.id_material, det.cantidad_usada))
            await conn.commit()
            return {"mensaje": "Registrado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

