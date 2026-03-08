import asyncio
import sys

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # 1. NUEVO IMPORT PARA CORS
from psycopg_pool import AsyncConnectionPool
from psycopg.rows import dict_row
from config.configuracion import config
from contextlib import asynccontextmanager

DB_URL = f"postgresql://{config.db_user}:{config.db_pass}@{config.db_host}:{config.db_port}/{config.db_name}"

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.async_pool = AsyncConnectionPool(conninfo=DB_URL, open=False)
    try:
        await app.async_pool.open()
        print(f"Conectado a la base de datos: {config.db_name} (Pool abierto)")
        yield
    finally:
        await app.async_pool.close()
        print("Pool de conexiones cerrado correctamente")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

async def get_conexion():
    if not hasattr(app, 'async_pool'):
        raise Exception("El pool de conexiones no ha sido inicializado.")
    
    async with app.async_pool.connection() as conn:
        conn.row_factory = dict_row
        yield conn