import asyncio
import sys

# 1. EL PARCHE DEBE IR AQUÍ, ANTES DE IMPORTAR FASTAPI O PSYCOPG
if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# 2. AHORA SÍ, IMPORTAMOS EL RESTO DE LIBRERÍAS
from fastapi import FastAPI
from psycopg_pool import AsyncConnectionPool
from psycopg.rows import dict_row
from config.configuracion import config
from contextlib import asynccontextmanager

# 3. CONFIGURACIÓN DE LA BASE DE DATOS
DB_URL = f"postgresql://{config.db_user}:{config.db_pass}@{config.db_host}:{config.db_port}/{config.db_name}"

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Definimos el pool AQUÍ ADENTRO para asegurar que use el loop correcto
    app.async_pool = AsyncConnectionPool(conninfo=DB_URL, open=False)
    try:
        await app.async_pool.open()
        print(f"Conectado a la base de datos: {config.db_name} (Pool abierto)")
        yield
    finally:
        await app.async_pool.close()
        print("Pool de conexiones cerrado correctamente")

app = FastAPI(lifespan=lifespan)

async def get_conexion():
    # Pequeña validación por si el pool no ha abierto
    if not hasattr(app, 'async_pool'):
        raise Exception("El pool de conexiones no ha sido inicializado.")
    
    async with app.async_pool.connection() as conn:
        conn.row_factory = dict_row
        yield conn