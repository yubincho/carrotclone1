from fastapi import Depends, FastAPI, UploadFile, Form, File, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from pydantic import BaseModel 
from fastapi.staticfiles import StaticFiles
from typing import List, Optional, Annotated
import sqlite3

con = sqlite3.connect('db.db', check_same_thread=False)
cur = con.cursor()


app = FastAPI()

# SECRET 정보 : 엑세스 토큰을 어떻게 인코딩할 지 정하는 것, 엑세스 토큰의 인코딩과 디코딩 가능
# -> 노출되면 디코딩 가능해짐(JWT 해석 가능해짐)
SECRET = "super-coding"
manager = LoginManager(SECRET, '/login')


@manager.user_loader()
def query_user(id): 
    # 컬럼명 조회 가능
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    
    user = cur.execute(f"""
                       SELECT * from users WHERE id = '{id}'
                       """).fetchone()
    print("[user]", user)
    return user

@app.post('/login')
def login(id: Annotated[str, Form()], 
           password: Annotated[str, Form()]):
    user = query_user(id)
    print(user['password'])
    
    if not user:
        raise InvalidCredentialsException
    elif password != user['password']:
        raise InvalidCredentialsException
    
    access_token = manager.create_access_token(data = {
        # 'myname' : 'hi'
        'sub' : {
            'id' : user['id'],
            'name' : user['name'],
            'email' : user['email']
        }
    })
    
    return {'access_token' : access_token}
    
    
    
@app.post("/signup")
def signup(id: Annotated[str, Form()], 
           password: Annotated[str, Form()],
           name: Annotated[str, Form()],
           email: Annotated[str, Form()]
           ):
    print(id, password)
    cur.execute(f"""
                INSERT INTO users(id, name, email, password)
                VALUES('{id}', '{name}', '{email}', '{password}')
                """)
    con.commit()
    return "200"


@app.post("/items")
async def create_item(
                image: UploadFile, 
                title: Annotated[str, Form()], 
                price: Annotated[int, Form()], 
                description: Annotated[str, Form()], 
                place: Annotated[str, Form()],
                insertAt: Annotated[int, Form()]
                ):
    print(image, title, price, description, place)
    
    image_bytes = await image.read()
    cur.execute(f""" 
                INSERT INTO items(title, image, price, description, place, insertAt)
                VALUES ('{title}', '{image_bytes.hex()}', '{price}', '{description}', '{place}', {insertAt})
                """)
    con.commit()
    return '200'



@app.get("/items")  
async def get_items(user=Depends(manager)):  # user=Depends(manager) 인증된 유저만 가능
    con.row_factory = sqlite3.Row   # 컬럼명 가져오기
    cur = con.cursor()
    
    rows = cur.execute(f"""
                       SELECT * FROM items;
                       """).fetchall()
        
        # dict(row) for row in rows : key,value 같은 딕션 타입으로 받음
        # 데이터 serialize 하기 : jsonable_encoder
    return JSONResponse(jsonable_encoder(dict(row) for row in rows))  


@app.get("/images/{item_id}")
async def get_image(item_id):
    cur = con.cursor()
    image_bytes = cur.execute(f"""
                              
                              SELECT image from items WHERE id={item_id}
                              
                              """).fetchone()[0]
    return Response(content=bytes.fromhex(image_bytes))
    
















app.mount("/", StaticFiles(directory="frontend", html=True), name="static")