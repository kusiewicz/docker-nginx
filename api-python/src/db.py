import psycopg2
from psycopg2 import pool
import os

DATABASE_URL = os.getenv(
    "DATABASE_URL"
)

connection_pool = psycopg2.pool.SimpleConnectionPool(
    1, 10, dsn='postgresql://admin:wasdwasd@localhost:7432/admin'
)

def get_date_time():
    connection = None
    try:
        connection = connection_pool.getconn()
        with connection.cursor() as cursor:
            cursor.execute("SELECT NOW() as now;")
            result = cursor.fetchone()
        return {"now": result[0]}
    except Exception as error:
        print(f"Database error: {error}")
        return None
    finally:
        if connection:
            connection_pool.putconn(connection)
