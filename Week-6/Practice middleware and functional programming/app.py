from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette import status
from starlette.middleware.sessions import SessionMiddleware
import mysql.connector
from dotenv import load_dotenv
import os
from pydantic import BaseModel
from starlette.middleware.base import BaseHTTPMiddleware

app = FastAPI()

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request:Request, call_next):
        if request.url.path.startswith("/static"):
            return await call_next(request)
        elif request.url.path == "/member":
            if not request.session:
                return RedirectResponse(url="/")
        elif request.url.path == "/createMessage":
            if not request.session:
                return RedirectResponse(url="/")
        elif request.url.path == "/deleteMessage":
            if not request.session:
                return RedirectResponse(url="/")
        elif request.url.path not in ["/", "/member", "/error", "/signout", "/signup", "/signin", "/createMessage", '/deleteMessage']:
            return RedirectResponse(url='/')
        return await call_next(request)

app.add_middleware(AuthMiddleware)
app.add_middleware(SessionMiddleware, secret_key="some-random-string", session_cookie="session_id", max_age=300)

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

load_dotenv()
mysql_password = os.environ.get("MYSQL")

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password=mysql_password,
  database="website"
)

class DeleteMessageRequest(BaseModel):
    messageId: int


@app.get("/", response_class=HTMLResponse, name="home")
async def route_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
  
    
@app.get("/member", name="member")
async def success(request: Request):    
    mycursor = mydb.cursor()
    message_query = ("SELECT message.id, name, message.content, message.time FROM member INNER JOIN message ON member.id = message.member_id ORDER BY message.time DESC" )
    mycursor.execute(message_query)
    mymessage_result = mycursor.fetchall()
    # print(mymessage_result)
    mycursor.close()
    return templates.TemplateResponse("loginstatus.html", {"request": request, "success_message": f"{request.session.get('name')}，歡迎登入系統", "messages": mymessage_result, "user": db_name})


@app.get("/error")
async def route_error(request: Request, message: str | None = None):
    return templates.TemplateResponse("loginstatus.html", {"request": request, "failed_text": message})


@app.get("/signout")
async def signout(request: Request):
    request.session.clear()
    return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)


@app.post("/signup", response_class=HTMLResponse, name="signup")
async def create_user(request: Request, signup_name: str = Form(), signup_username: str = Form(), signup_password: str = Form()):
    print(f"name: {signup_name} username: {signup_username}, password: {signup_password}")
    # check if there is any repeating username
    mycursor = mydb.cursor()
    query = ("SELECT username FROM member WHERE username = %s")
    val = (signup_username,)
    mycursor.execute(query, val)
    existing_user = mycursor.fetchall()
    print(existing_user)
    if existing_user != []:
        return RedirectResponse(url="/error?message=此帳號已被註冊", status_code=status.HTTP_303_SEE_OTHER)
    # insert new user
    sql = "INSERT INTO member (name, username, password) VALUES (%s, %s, %s)"
    val = (signup_name, signup_username, signup_password)
    mycursor.execute(sql, val)
    mydb.commit()
    mycursor.close()
    return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)


@app.post("/signin")
async def login(request: Request, username: str = Form(), password: str = Form()):
    mycursor = mydb.cursor()
    query = ("SELECT id, name, username, password FROM member WHERE username = %s and password = %s")
    val=(username, password)
    mycursor.execute(query, val)
    user = mycursor.fetchone()
    # print(myresult)
    if user == []:
        return RedirectResponse(url="/error?message=帳號、密碼輸入錯誤", status_code=status.HTTP_303_SEE_OTHER)
    db_id, db_name, db_username, db_password = myresult[0]
    request.session.update({"id": db_id, "name": db_name, "username": username})
    mycursor.close()
    return RedirectResponse(url="/member", status_code=status.HTTP_303_SEE_OTHER)


@app.post("/createMessage")
async def create_message(request: Request, message: str = Form()):
    mycursor = mydb.cursor()
    sql = "INSERT INTO message (member_id, content) VALUES (%s, %s)"
    val = (request.session.get("id"), message)
    mycursor.execute(sql, val)
    
    mydb.commit()
    mycursor.close()
    return RedirectResponse(url="/member", status_code=status.HTTP_303_SEE_OTHER)


@app.post("/deleteMessage")
async def delete_message(request: Request, message: DeleteMessageRequest):
    mycursor = mydb.cursor()
    query = ("DELETE FROM message WHERE id = %s")
    val=(message.messageId, )
    mycursor.execute(query, val)
    mycursor.close()
    return RedirectResponse(url="/member", status_code=status.HTTP_303_SEE_OTHER)