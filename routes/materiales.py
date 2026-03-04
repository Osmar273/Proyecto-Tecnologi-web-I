from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from config.conexionBD import get_conexion 

router = APIRouter()

class Material(BaseModel):
    nombre_componente: str
    costo_unitario: Optional[float] = 0.00
    id_proveedor: int

@router.get("/")
async def listar_buscar(id_material: Optional[int] = None, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            if id_material:
  
                await cursor.execute("SELECT * FROM materiales WHERE id_material = %s", (id_material,))
                res = await cursor.fetchone()
                return res if res else HTTPException(status_code=404, detail="No encontrado")
            else:
  
                await cursor.execute("SELECT * FROM materiales")
                return await cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/")
async def insertar(mat: Material, conn = Depends(get_conexion)):
    consulta = "INSERT INTO materiales(nombre_componente, costo_unitario, id_proveedor) VALUES(%s, %s, %s)"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (mat.nombre_componente, mat.costo_unitario, mat.id_proveedor))
            await conn.commit()
            return {"mensaje": "Material Registrado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{id_material}")
async def actualizar(id_material: int, mat: Material, conn = Depends(get_conexion)):
    consulta = "UPDATE materiales SET nombre_componente=%s, costo_unitario=%s, id_proveedor=%s WHERE id_material=%s"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (mat.nombre_componente, mat.costo_unitario, mat.id_proveedor, id_material))
            await conn.commit()
            return {"mensaje": "Material Actualizado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{id_material}")
async def eliminar(id_material: int, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            await cursor.execute("DELETE FROM materiales WHERE id_material = %s", (id_material,))
            await conn.commit()
            return {"mensaje": "Material Eliminado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))