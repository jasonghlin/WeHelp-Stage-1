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
# -------------------------------------------
## Session 版本二
from itsdangerous import TimestampSigner, SignatureExpired, BadSignature
from base64 import b64encode, b64decode
import json
from starlette.responses import JSONResponse

class SimpleSessionHandler:
    def __init__(self, secret_key, session_cookie='session', max_age=1209600):  # max_age default to 14 days
        self.signer = TimestampSigner(secret_key)
        self.session_cookie = session_cookie
        self.max_age = max_age

    def create_session_cookie(self, session_data):
        """Encrypt and sign session data, returning a Set-Cookie header string."""
        # Serialize and encode the session data
        json_data = json.dumps(session_data)
        encoded_data = b64encode(json_data.encode('utf-8'))
        signed_data = self.signer.sign(encoded_data)

        # Prepare the cookie header
        cookie_header = (
            f"{self.session_cookie}={signed_data.decode('utf-8')}; "
            f"Max-Age={self.max_age}; Path=/; HttpOnly;"
        )
        return cookie_header

    def read_session_from_cookie(self, request):
        """Extract and decrypt session data from the request cookie."""
        cookie_value = request.cookies.get(self.session_cookie)
        if cookie_value:
            try:
                verified_data = self.signer.unsign(cookie_value, max_age=self.max_age)
                decoded_data = b64decode(verified_data)
                session_data = json.loads(decoded_data.decode('utf-8'))
                return session_data
            except BadSignature:
                return {'error': 'Invalid session cookie'}
        return {}


# Example usage
secret_key = 'your-secret-key'
session_handler = SimpleSessionHandler(secret_key)
# -------------------------------------------

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


@app.get("/", response_class=HTMLResponse, name="home")
async def route_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/member", response_class=HTMLResponse)
async def success_login(request: Request):
    # print(request.cookies)
    return templates.TemplateResponse("loginstatus.html", {"request": request, "success_message": "恭喜您，成功登入系統"})

@app.get("/error")
async def error_login(request: Request, message: str | None = None):
    if message == "請輸入帳號、密碼":
        return templates.TemplateResponse("loginstatus.html", {"request": request, "failed_text": message})
    if message == "帳號、密碼輸入錯誤":
        return templates.TemplateResponse("loginstatus.html", {"request": request, "failed_text": message})




@app.post("/signin", response_class=HTMLResponse)
async def login(request: Request, response: Response):
    # print(request.headers)
    session_data = session_handler.read_session_from_cookie(request)
    print(session_data)
    # print(f"cookie from browser: {session_data}")
    form = LoginForm(request)
    await form.create_oauth_form()
    if form.username == "test" and form.password == "test":
        if session_data == {}:
            session_data = {'username': form.username, 'password': form.password}
            cookie = session_handler.create_session_cookie(session_data)
        # print(f"cookie: {cookie}")
        # response = JSONResponse({'message': 'New session created', 'session_data': session_data})
            response = RedirectResponse(url="/member", status_code=status.HTTP_302_FOUND)
            response.headers.append('Set-Cookie', cookie)
            print("Session created")
        # print(f"response: {response.headers}")
            return response
        else:
            print("Redirect")
            return RedirectResponse(url="/member", status_code=status.HTTP_302_FOUND)
    elif form.username == None and form.password == None:
        return RedirectResponse(url="/error?message=請輸入帳號、密碼", status_code=status.HTTP_302_FOUND)
    else:
        return RedirectResponse(url="/error?message=帳號、密碼輸入錯誤", status_code=status.HTTP_302_FOUND)