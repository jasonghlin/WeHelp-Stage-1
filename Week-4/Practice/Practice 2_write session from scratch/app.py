from fastapi import FastAPI, Request, Form, Depends, HTTPException, Response
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette import status
from pydantic import BaseModel
from starlette.middleware.sessions import SessionMiddleware
from fastapi.security import APIKeyCookie, HTTPBasicCredentials, HTTPBasic
from typing import Annotated, Optional
import random

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class LoginForm:
    def __init__(self, request: Request):
        self.request: Request = request
        self.username:  Optional[str] = None
        self.password:  Optional[str] = None
        self.accept: str
    async def create_oauth_form(self):
        form = await self.request.form()
        self.username = form.get("username")
        self.password = form.get("password")
        self.accept = form.get("accept")
# -------------------------------------------
users = {
    "user1":{
        "username": "user1",
        "password": "user1",
        "user_id": 1
    },
    "user2":{
        "username": "user2",
        "password": "user2",
        "user_id": 2
    },
    "test":{
        "username": "test",
        "password": "test",
        "user_id": 3
    }
}
# In-memory session storage (for demonstration purposes)
sessions = {}

def create_session(user_id: str):
    session_id = len(sessions) + random.randint(0, 1000000)
    sessions[session_id] = user_id
    return session_id

security = HTTPBasic()

def authenticate_user(credentials: HTTPBasicCredentials = Depends(security)):
    user = users.get(credentials.username)
    if user is None or user["password"] != credentials.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return user

def get_user_from_session_id(request: Request) -> str:
        # 假設 session_id 存儲在名為 'session_id' 的 cookie 中
        session_id = request.cookies.get('session_id')
        if not session_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session ID missing from cookies")
        
        return users.get(session_id)
# -------------------------------------------

@app.get("/", response_class=HTMLResponse, name="home")
async def route_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/member", response_class=HTMLResponse)
async def success_login(request: Request):
    return templates.TemplateResponse("loginstatus.html", {"request": request, "success_message": "恭喜您，成功登入系統"})

@app.get("/error")
async def error_login(request: Request, message: str | None = None):
    if message == "請輸入帳號、密碼":
        return templates.TemplateResponse("loginstatus.html", {"request": request, "failed_text": message})
    if message == "帳號、密碼輸入錯誤":
        return templates.TemplateResponse("loginstatus.html", {"request": request, "failed_text": message})


@app.get("/getusers/me")
def read_current_user(user: dict = Depends(get_user_from_session_id)):
    print(users)
    return user


@app.post("/signin", response_class=HTMLResponse)
async def login(request: Request, response: Response):
    form = LoginForm(request)
    await form.create_oauth_form()
    # print(request.query_params)
    # print(request.headers)
    # async with request.form() as form:
    #     print(form)
    # print(form.username)
    if form.username == "test" and form.password == "test":
        credentials = HTTPBasicCredentials(username=form.username, password=form.password)
        user = authenticate_user(credentials)
        session_id = create_session(user["user_id"])
        response = RedirectResponse(url="/member", status_code=status.HTTP_302_FOUND)
        response.set_cookie(key="session_id", value=session_id, httponly=False, max_age=300)
        return response
    elif form.username == None and form.password == None:
        return RedirectResponse(url="/error?message=請輸入帳號、密碼", status_code=status.HTTP_302_FOUND)
    else:
        return RedirectResponse(url="/error?message=帳號、密碼輸入錯誤", status_code=status.HTTP_302_FOUND)