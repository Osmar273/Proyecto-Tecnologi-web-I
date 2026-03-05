from fastapi import FastAPI
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

async def get_conexion():
    async with app.async_pool.connection() as conn:
        conn.row_factory = dict_row
        yield conn