import mysql.connector
import logging
from dotenv import load_dotenv
import os


load_dotenv()
mysql_password = os.environ.get("MYSQL")


def get_db_connection():
    try:
        db_connection = mysql.connector.connect(
            host = "localhost",
            port = 3306,
            user = "root",
            password = mysql_password,
            database = "website"
        )
        print("---Database connection successful---")
    except mysql.connector.Error as err:
        print(f'Database connection error: {err}')
        raise
    return db_connection

def get_user_info(username):
    db_connection = get_db_connection()
    try:
        db = db_connection.cursor(dictionary = True)
        user_query = ("SELECT id, name, username FROM member WHERE username = %s")
        val = (username,)
        db.execute(user_query, val)
        return db.fetchone()
    except Exception as e:
        logging.error("Error when fetching user info: %s", e, exc_info=True)
        return {}
    finally:
        db.close()
        db_connection.close()

def update_username(new_username, username):
    db_connection = get_db_connection()
    try:
        db = db_connection.cursor(dictionary = True)
        db.execute("SELECT * FROM member WHERE username = %s", (new_username,))
        if db.fetchone():
            print("Username already exists.")
            return False
        else:
            user_update = ("UPDATE member SET username = %s WHERE username = %s")
            val = (new_username, username)
            db.execute(user_update, val)
            print("SQL executed, affected rows:", db.rowcount)
            db_connection.commit()
            print("Transaction committed")
            return True
        
    except Exception as e:
        logging.error("Error when updating user info: %s", e, exc_info=True)
        return {}
    finally:
        db.close()
        db_connection.close()

def get_all_user():
    db_connection = get_db_connection()
    try:
        db = db_connection.cursor(dictionary = True)
        user_query = ("SELECT id, name, username FROM member")
        db.execute(user_query)
        return db.fetchall()
    except Exception as e:
        logging.error("Error when fetching all user info: %s", e, exc_info=True)
        return {}
    finally:
        db.close()
        db_connection.close()