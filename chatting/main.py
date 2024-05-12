from fastapi import FastAPI, HTTPException
from pydantic import BaseModel 
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

app = FastAPI()


class Message(BaseModel):
    id: str
    text: str
    
msgs = []


@app.post("/create")
def create_chat(msg: Message):
    if msg != None:
        msgs.append(msg)
        return RedirectResponse(url="/show", status_code=303)
    else:
        raise HTTPException(status_code=400, detail="No message provided")

@app.get("/show")
def get_all():
    return msgs




app.mount("/", StaticFiles(directory="static", html=True), name="static")