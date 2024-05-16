from fastapi import FastAPI
from pydantic import BaseModel 
from fastapi.staticfiles import StaticFiles
from typing import List, Optional

app = FastAPI()


class Memo(BaseModel):
    id: int
    content: str
    
memos = []


@app.post("/memos")
def create_memo(memo: Memo):
    memos.append(memo)
    return '메모 추가에 성공했습니다'


@app.get("/memos")
def read_memos(sorted: Optional[str] = None):
    return memos


# edit 
@app.post("/memos/{id}")
def put_memo(req_memo: Memo):
    for memo in memos:
        if memo.id == req_memo.id:
            memo.content = req_memo.content
            return '성공했습니다'
    return '그런 메모는 없습니다'   
        

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id: int):
    for index, memo in enumerate(memos):
        if memo.id == memo_id:
            memos.pop(index)
            return '성공했습니다'
    return '그런 메모는 없습니다'


app.mount("/", StaticFiles(directory="static", html=True), name="static")


