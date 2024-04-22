from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette import status
from pydantic import BaseModel
from starlette.middleware.sessions import SessionMiddleware
from fastapi.security import APIKeyCookie
from typing import Annotated



app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key="some-random-string", session_cookie="session", max_age=300)
security = APIKeyCookie(name="session")

class User(BaseModel):
    username: str | None = None
    password: str | None = None


app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse, name="home")
async def route_index(request: Request):
    return templates.TemplateResponse("app.html", {"request": request})

@app.get("/error")
async def route_error(request: Request, message: str | None = None):
    if message == "請輸入帳號、密碼":
        return templates.TemplateResponse("Fail.html", {"request": request, "failed_text": message})
    if message == "帳號、密碼輸入錯誤":
        return templates.TemplateResponse("Fail.html", {"request": request, "failed_text": message})

@app.get("/member", name="member")
async def success(request: Request):
    if not request.session:
        return RedirectResponse(url="/")
    print(request.session)
    return templates.TemplateResponse("Success.html", {"request": request})



@app.post("/signin", name="signin")
# https://github.com/tiangolo/fastapi/issues/854
async def login(request: Request, username: str = Form(None), password: str = Form(None)):
    print(request.session)
    user_data = User(username=username, password=password)
    if not user_data.username or not user_data.password:
        return RedirectResponse(url="/error?message=請輸入帳號、密碼", status_code=status.HTTP_303_SEE_OTHER)
    
    if user_data.username != "test" or user_data.password != "test":
        return RedirectResponse(url="/error?message=帳號、密碼輸入錯誤", status_code=status.HTTP_303_SEE_OTHER)
    
    if user_data.username == "test" or user_data.password == "test":
        request.session.update({"username": username})
        return RedirectResponse(url="/member", status_code=status.HTTP_303_SEE_OTHER)

@app.post("/signout", name="signout")
async def signout(request: Request):
    print(request.session)
    # https://lctoan.medium.com/fastapi-by-a-python-beginner-5-5e0f0972d653
    request.session.clear()
    print(request.session)
    return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)

# @app.post("/signin", name="signin")
# async def login(username: Annotated[str | None, Form()], password: Annotated[str | None, Form()]):
#     user_data = User(username = username, password = password)
#     print(user_data)
#     if not username or not password:
#         return RedirectResponse(url="/error?message=請輸入帳號、密碼", status_code=status.HTTP_303_SEE_OTHER)
#     if user_data.username != "test" or user_data.password != "test":
#         return RedirectResponse(url="/error?message=帳號、密碼輸入錯誤", status_code=status.HTTP_303_SEE_OTHER)
#     return RedirectResponse(url="/member", status_code=status.HTTP_303_SEE_OTHER)


# calculator
@app.get("/square/{num}", name="square_calculator")
async def square_calculator(request: Request, num: int):
    result = num ** 2
    return templates.TemplateResponse("Calculator.html", {"request": request, "result": result})


@app.post("/handle_square_form", name="handle_calculator")
async def handle_square_form(squareInput: Annotated[int, Form()]):
    num = int(squareInput)
    return RedirectResponse(url=f"/square/{num}", status_code=status.HTTP_303_SEE_OTHER)
