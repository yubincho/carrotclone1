from fastapi import FastAPI, UploadFile, Form, File, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel 
from fastapi.staticfiles import StaticFiles
from typing import List, Optional, Annotated
import sqlite3

con = sqlite3.connect('db.db', check_same_thread=False)
cur = con.cursor()


app = FastAPI()


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
async def get_items():
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