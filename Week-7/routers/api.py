from fastapi import APIRouter, Request
from starlette import status
from pydantic import BaseModel
from database import get_user_info, update_name, get_all_user


router = APIRouter(
    prefix="/api",
    tags = ["api"]
)



class NewName(BaseModel):
    name: str

# @router.get("/", status_code=status.HTTP_200_OK)
# async def get_users():
#      return get_all_user()
     

@router.get("/member", status_code=status.HTTP_200_OK)
async def get_username(request: Request, username: str):
    if not request.session:
        response = {"data": None}
        return response
    else:
        user_info = get_user_info(username)
        if user_info:
            response = {"data": user_info}
        else:
            response = {'data': None}
        return response

@router.patch("/member", status_code=status.HTTP_200_OK)
async def update_new_name(request: Request, new_name: NewName):
    if not request.session:
        response = {"error": True}
        return response
    else:
        update_name(new_name.name, request.session.get("name"), request.session.get("id"))
        request.session.update({"name": new_name.name})
        response = {'ok': True}
        return response
