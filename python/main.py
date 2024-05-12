from fastapi import FastAPI
from pydantic import BaseModel 
from fastapi.staticfiles import StaticFiles


app = FastAPI()

answer = 'train'

@app.get('/answer')
def get_answer():
    return {'answer' : answer}

app.mount("/", StaticFiles(directory="static", html=True), name="static")

class Item(BaseModel):
    id: int
    content: str

items = ['맥북', '앵플워치', '아이폰', '에어팟']

# @app.get("/items")
# async def read_items():
#     return items

# path 방식
@app.get("/items/{id}")
def read_id_item(id):
    return items[int(id)]


# 쿼리 방식
# skip:int=0 => 아무것도 안들어오면 0
# limit:int=0 => 최대 뽑이 내는 데이터 수 
# @app.get("/items")
# async def read_item(skip:int=0, limit:int=10): 
#     return items[skip:skip+limit]   # ["앵플워치","아이폰"]  출력


# @app.post("/items")
# async def post_item(item:Item):
#     items.append(item.content)
#     return '성공했습니다'







