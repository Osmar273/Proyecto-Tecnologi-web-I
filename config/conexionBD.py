from fastapi import FastAPI
from psycopg_pool import AsyncConnectionPool
from psycopg.rows import dict_row
from contextlib import asynccontextmanager

DB_URL = "postgresql://postgres:1234@localhost:5432/bd_proyecto"

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.async_pool = AsyncConnectionPool(conninfo=DB_URL, open=False)
    try:
        await app.async_pool.open()
        print("Pool de conexiones abierto exitosamente")
        yield
    finally:
        await app.async_pool.close() 
        print("Pool de conexiones cerrado")

app = FastAPI(lifespan=lifespan)

async def get_conexion():
    async with app.async_pool.connection() as conn:
        conn.row_factory = dict_row
        yield conn