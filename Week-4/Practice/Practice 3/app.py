from fastapi import FastAPI, Request, Form, Body
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette import status
from pydantic import BaseModel
from starlette.middleware.sessions import SessionMiddleware
from fastapi.security import APIKeyCookie
from typing import Annotated


app = FastAPI()

class User(BaseModel):
    username: str 
    password: str


@app.post("/username")
async def route_index(username: str=Body(str)):
    return {"username": username}



@app.post("/user")
async def route_index(user: User):
    return {"user": user}