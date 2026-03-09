from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
import bcrypt
from config.conexionBD import get_conexion

router = APIRouter()

class UsuarioCreate(BaseModel):
    nombre: str
    correo: str
    contrasena: str
    rol: str
    especialidad: Optional[str] = None

class UsuarioUpdate(BaseModel):
    nombre: str
    correo: str
    contrasena: str
    rol: str
    especialidad: Optional[str] = None

class UsuarioLogin(BaseModel):
    correo: str
    contrasena: str

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

@router.post("/login")
async def login(login_data: UsuarioLogin, conn = Depends(get_conexion)):
    cursor = await conn.execute(
        "SELECT id_usuario, nombre, correo, contrasena, rol, especialidad FROM USUARIOS WHERE correo = %s",
        (login_data.correo,)
    )
    usuario = await cursor.fetchone()
    
    if not usuario:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    if not verify_password(login_data.contrasena, usuario['contrasena']):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    return {
        "id_usuario": usuario['id_usuario'],
        "nombre": usuario['nombre'],
        "correo": usuario['correo'],
        "rol": usuario['rol'],
        "especialidad": usuario['especialidad']
    }

@router.post("/")
async def crear_usuario(usuario: UsuarioCreate, conn = Depends(get_conexion)):
    cursor_check = await conn.execute("SELECT COUNT(*) as total FROM USUARIOS WHERE correo = %s", (usuario.correo,))
    resultado = await cursor_check.fetchone()
    
    if resultado['total'] > 0:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    hashed_password = hash_password(usuario.contrasena)

    cursor_insert = await conn.execute(
        """
        INSERT INTO USUARIOS (nombre, correo, contrasena, rol, especialidad)
        VALUES (%s, %s, %s, %s, %s) RETURNING id_usuario
        """,
        (usuario.nombre, usuario.correo, hashed_password, usuario.rol, usuario.especialidad)
    )
    nuevo_usuario = await cursor_insert.fetchone()
    
    return {"mensaje": "Usuario registrado exitosamente", "id_usuario": nuevo_usuario['id_usuario']}

@router.get("/")
async def get_usuarios(conn = Depends(get_conexion)):
    cursor = await conn.execute("SELECT id_usuario, nombre, correo, rol, especialidad FROM USUARIOS ORDER BY id_usuario")
    return await cursor.fetchall()

@router.get("/{id_usuario}")
async def get_usuario(id_usuario: int, conn = Depends(get_conexion)):
    cursor = await conn.execute("SELECT id_usuario, nombre, correo, rol, especialidad FROM USUARIOS WHERE id_usuario = %s", (id_usuario,))
    usuario = await cursor.fetchone()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@router.put("/{id_usuario}")
async def actualizar_usuario(id_usuario: int, usuario: UsuarioUpdate, conn = Depends(get_conexion)):
    cursor_check = await conn.execute("SELECT COUNT(*) as total FROM USUARIOS WHERE id_usuario = %s", (id_usuario,))
    res_check = await cursor_check.fetchone()
    if res_check['total'] == 0:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    cursor_correo = await conn.execute("SELECT COUNT(*) as total FROM USUARIOS WHERE correo = %s AND id_usuario != %s", (usuario.correo, id_usuario))
    res_correo = await cursor_correo.fetchone()
    if res_correo['total'] > 0:
        raise HTTPException(status_code=400, detail="El correo ya está registrado por otro usuario")

    hashed_password = hash_password(usuario.contrasena)

    await conn.execute(
        """
        UPDATE USUARIOS 
        SET nombre = %s, correo = %s, contrasena = %s, rol = %s, especialidad = %s
        WHERE id_usuario = %s
        """,
        (usuario.nombre, usuario.correo, hashed_password, usuario.rol, usuario.especialidad, id_usuario)
    )
    return {"mensaje": "Usuario actualizado exitosamente"}

@router.delete("/{id_usuario}")
async def eliminar_usuario(id_usuario: int, conn = Depends(get_conexion)):
    cursor_persona = await conn.execute("SELECT COUNT(*) as total FROM PERSONA WHERE id_usuario = %s", (id_usuario,))
    res_persona = await cursor_persona.fetchone()

    cursor_proyectos = await conn.execute("SELECT COUNT(*) as total FROM PROYECTOS WHERE id_usuario = %s", (id_usuario,))
    res_proyectos = await cursor_proyectos.fetchone()
    
    if res_persona['total'] > 0:
        await conn.execute("DELETE FROM PERSONA WHERE id_usuario = %s", (id_usuario,))
    
    if res_proyectos['total'] > 0:
        raise HTTPException(status_code=400, detail="No se puede eliminar: el usuario tiene proyectos asignados")

    cursor_delete = await conn.execute("DELETE FROM USUARIOS WHERE id_usuario = %s", (id_usuario,))
    if cursor_delete.rowcount == 0:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    return {"mensaje": "Usuario eliminado exitosamente"}