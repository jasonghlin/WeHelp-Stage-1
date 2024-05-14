from fastapi import APIRouter, Request
from starlette import status
from pydantic import BaseModel
from database import get_user_info, update_username, get_all_user


router = APIRouter(
    prefix="/api",
    tags = ["api"]
)



class NewUserName(BaseModel):
    name: str

@router.get("/", status_code=status.HTTP_200_OK)
async def get_users():
     return get_all_user()
     

@router.get("/member", status_code=status.HTTP_200_OK)
async def get_username(request: Request, username: str):
    if not request.session:
        response = {"Invalid": True}
        return response
    else:
        user_info = get_user_info(username)
        if user_info:
            response = {"data": user_info}
        else:
            response = {'data': None}
        return response

@router.patch("/member", status_code=status.HTTP_200_OK)
async def update_new_username(request: Request, new_username: NewUserName):
    if not request.session:
        response = {"Error": True}
        return response
    else:
        update_result = update_username(new_username.name, request.session.get("username"))
        if not update_result:
            response = {"Error": True}
            return response
        else:
            request.session.update({"username": new_username.name})
            response = {'OK': True}
            return response
