from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette import status
from starlette.middleware.sessions import SessionMiddleware



app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key="some-random-string", session_cookie="session_id", max_age=300)



app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse, name="home")
async def route_index(request: Request):
    return templates.TemplateResponse("app.html", {"request": request})


@app.get("/error")
async def route_error(request: Request, message: str | None = None):
    if message == "請輸入帳號、密碼":
        return templates.TemplateResponse("fail.html", {"request": request, "failed_text": message})
    if message == "帳號、密碼輸入錯誤":
        return templates.TemplateResponse("fail.html", {"request": request, "failed_text": message})


@app.get("/member", name="member")
async def success(request: Request):
    # print(f"Session: {request.session}")
    if not request.session:
        return RedirectResponse(url="/")
    print(request.session)
    return templates.TemplateResponse("success.html", {"request": request})


@app.post("/signin", name="signin")
async def login(request: Request, username: str = Form(None), password: str = Form(None)):
    print(request.session)    
    if username == "test" and password == "test":
        request.session.update({"username": username})
        return RedirectResponse(url="/member", status_code=status.HTTP_303_SEE_OTHER)
    elif not username or not password:
        return RedirectResponse(url="/error?message=請輸入帳號、密碼", status_code=status.HTTP_303_SEE_OTHER)
    else:
        return RedirectResponse(url="/error?message=帳號、密碼輸入錯誤", status_code=status.HTTP_303_SEE_OTHER)
    

@app.post("/signout", name="signout")
async def signout(request: Request):
    print(request.session)
    
    request.session.clear()
    print(request.session)
    return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)


# calculator
@app.get("/square/{num}", name="square_calculator")
async def square_calculator(request: Request, num: int):
    result = num ** 2
    return templates.TemplateResponse("calculator.html", {"request": request, "result": result})

