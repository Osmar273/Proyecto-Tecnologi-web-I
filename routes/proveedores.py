from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from config.conexionBD import get_conexion 

router = APIRouter()

class Proveedor(BaseModel):
    nombre_proveedor: str
    rubro: Optional[str] = None
    contacto: Optional[str] = None

@router.get("/")
async def listar_buscar(id_proveedor: Optional[int] = None, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            if id_proveedor:
                await cursor.execute("SELECT * FROM proveedores WHERE id_proveedor = %s", (id_proveedor,))
                res = await cursor.fetchone()
                return res if res else HTTPException(status_code=404, detail="No encontrado")
            else:
                await cursor.execute("SELECT * FROM proveedores")
                return await cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {e}")

@router.post("/")
async def insertar(prov: Proveedor, conn = Depends(get_conexion)):
    consulta = "INSERT INTO proveedores(nombre_proveedor, rubro, contacto) VALUES(%s, %s, %s)"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (prov.nombre_proveedor, prov.rubro, prov.contacto))
            await conn.commit()
            return {"mensaje": "Registrado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{id_proveedor}")
async def actualizar(id_proveedor: int, prov: Proveedor, conn = Depends(get_conexion)):
    consulta = "UPDATE proveedores SET nombre_proveedor=%s, rubro=%s, contacto=%s WHERE id_proveedor=%s"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (prov.nombre_proveedor, prov.rubro, prov.contacto, id_proveedor))
            await conn.commit()
            return {"mensaje": "Actualizado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{id_proveedor}")
async def eliminar(id_proveedor: int, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            await cursor.execute("DELETE FROM proveedores WHERE id_proveedor = %s", (id_proveedor,))
            await conn.commit()
            return {"mensaje": "Eliminado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))