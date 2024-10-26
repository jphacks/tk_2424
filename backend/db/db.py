import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

conn = mysql.connector.connect(
    host="localhost", user="root", password=os.environ.get("MYSQL_ROOT_PASSWORD")
)

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
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        )
        """
    )


init_db()


def insert_garbage_can(longitude: float, latitude: float, note: str = ""):
    cursor.execute(
        """
        INSERT INTO garbage_cans (longitude, latitude, note)
        VALUES (%s, %s, %s)
        """,
        (longitude, latitude, note),
    )
    conn.commit()


