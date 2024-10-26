import json
import time
import mysql.connector


# Retry connection to the database
def connect_to_db(retries=5, delay=5):
    for i in range(retries):
        try:
            conn = mysql.connector.connect(
                host="gomingo-mysql", user="user", password="password"
            )
            return conn
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            print(f"Retrying in {delay} seconds...")
            time.sleep(delay)
    raise Exception("Failed to connect to the database after several retries")


conn = connect_to_db()

cursor = conn.cursor()


def init_db():
    cursor.execute("CREATE DATABASE IF NOT EXISTS GOMINGO")
    cursor.execute("USE GOMINGO")

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS garbage_cans (
            garbage_can_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            latitude FLOAT NOT NULL,
            longitude FLOAT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL,
            note TEXT
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS characters (
            character_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            character_no INT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            user_name VARCHAR(255) NOT NULL,
            user_email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS garbages (
            garbage_id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            latitude FLOAT NOT NULL,
            longitude FLOAT NOT NULL,
            is_discarded BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        )
        """
    )


init_db()


def insert_garbage_can(longitude: float, latitude: float, note: str = "") -> bool:
    cursor.execute(
        """
        INSERT INTO garbage_cans (longitude, latitude, note)
        VALUES (%s, %s, %s)
        """,
        (longitude, latitude, note),
    )
    conn.commit()


def delete_garbage_can(garbage_can_id: int):
    cursor.execute(
        """
        DELETE FROM garbage_cans
        WHERE garbage_can_id = %s
        """,
        (garbage_can_id,),
    )
    conn.commit()


def get_garbage_cans():
    cursor.execute(
        """
        SELECT * FROM garbage_cans
        """
    )
    garbage_cans = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    result = [dict(zip(columns, row)) for row in garbage_cans]
    return json.dumps(result, default=str)


def insert_character(user_id: int, character_no: int):
    cursor.execute(
        """
        INSERT INTO characters (user_id, character_no)
        VALUES (%s, %s)
        """,
        (user_id, character_no),
    )
    conn.commit()


def delete_character(character_id: int):
    cursor.execute(
        """
        DELETE FROM characters
        WHERE character_id = %s
        """,
        (character_id,),
    )
    conn.commit()


def get_characters():
    cursor.execute(
        """
        SELECT * FROM characters
        """
    )
    characters = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    result = [dict(zip(columns, row)) for row in characters]
    return json.dumps(result, default=str)


def insert_user(user_name: str, user_email: str, password: str):
    cursor.execute(
        """
        INSERT INTO users (user_name, user_email, password)
        VALUES (%s, %s, %s)
        """,
        (user_name, user_email, password),
    )
    conn.commit()


def delete_user(user_id: int):
    cursor.execute(
        """
        DELETE FROM users
        WHERE user_id = %s
        """,
        (user_id,),
    )
    conn.commit()


def insert_garbage(user_id: int, latitude: float, longitude: float):
    cursor.execute(
        """
        INSERT INTO garbages (user_id, latitude, longitude)
        VALUES (%s, %s, %s)
        """,
        (user_id, latitude, longitude),
    )
    conn.commit()


def delete_garbage(garbage_id: int):
    cursor.execute(
        """
        DELETE FROM garbages
        WHERE garbage_id = %s
        """,
        (garbage_id,),
    )
    conn.commit()


def get_garbages():
    cursor.execute(
        "SELECT * FROM garbages"
    )
    garbages = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    result = [dict(zip(columns, row)) for row in garbages]
    return json.dumps(result, default=str)

def delete_table(table_name: str):
    cursor.execute(f"DROP TABLE {table_name}")
    conn.commit()
