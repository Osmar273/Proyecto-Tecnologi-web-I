from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from config.conexionBD import get_conexion 

router = APIRouter()

class Cliente(BaseModel):
    nombre_empresa: str
    nit: Optional[str] = None
    direccion: Optional[str] = None
    telefono: Optional[str] = None

@router.get("/")
async def listar_buscar(id_cliente: Optional[int] = None, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            if id_cliente:
                await cursor.execute("SELECT * FROM clientes WHERE id_cliente = %s", (id_cliente,))
                res = await cursor.fetchone()
                return res if res else HTTPException(status_code=404, detail="No encontrado")
            else:
                await cursor.execute("SELECT * FROM clientes")
                return await cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {e}")

@router.post("/")
async def insertar(cli: Cliente, conn = Depends(get_conexion)):
    consulta = "INSERT INTO clientes(nombre_empresa, nit, direccion, telefono) VALUES(%s, %s, %s, %s)"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (cli.nombre_empresa, cli.nit, cli.direccion, cli.telefono))
            await conn.commit()
            return {"mensaje": "Registrado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{id_cliente}")
async def actualizar(id_cliente: int, cli: Cliente, conn = Depends(get_conexion)):
    consulta = "UPDATE clientes SET nombre_empresa=%s, nit=%s, direccion=%s, telefono=%s WHERE id_cliente=%s"
    try:
        async with conn.cursor() as cursor:
            await cursor.execute(consulta, (cli.nombre_empresa, cli.nit, cli.direccion, cli.telefono, id_cliente))
            await conn.commit()
            return {"mensaje": "Actualizado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{id_cliente}")
async def eliminar(id_cliente: int, conn = Depends(get_conexion)):
    try:
        async with conn.cursor() as cursor:
            await cursor.execute("DELETE FROM clientes WHERE id_cliente = %s", (id_cliente,))
            await conn.commit()
            return {"mensaje": "Eliminado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))