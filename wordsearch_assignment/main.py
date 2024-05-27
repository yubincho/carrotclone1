print("hi")

from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from wordsearch_assignment.database import SessionLocal, engine
from wordsearch_assignment.model import Member, Puzzle, UserPuzzleAnswer 
import random


app = FastAPI()

# 데이터베이스 세션 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def hhello():
    return "hello"

# ---------------------------------------------------


# 배열 초기화
rows = 14
cols = 12
board = [['' for _ in range(cols)] for _ in range(rows)]

# 정답 리스트
answers = ['love', 'python', 'javascript']

# 알파벳 리스트
alphabet = 'abcdefghijklmnopqrstuvwxyz'

# 단어를 보드에 배치하는 함수
def place_word(board, word):
    direction = random.choice(['horizontal', 'vertical', 'diagonal'])
    word_len = len(word)
    placed = False
    
    while not placed:
        if direction == 'horizontal':
            row = random.randint(0, rows - 1)
            col = random.randint(0, cols - word_len)
            if all(board[row][col + i] in ['', word[i]] for i in range(word_len)):
                for i in range(word_len):
                    board[row][col + i] = word[i]
                placed = True
        elif direction == 'vertical':
            row = random.randint(0, rows - word_len)
            col = random.randint(0, cols - 1)
            if all(board[row + i][col] in ['', word[i]] for i in range(word_len)):
                for i in range(word_len):
                    board[row + i][col] = word[i]
                placed = True
        elif direction == 'diagonal':
            row = random.randint(0, rows - word_len)
            col = random.randint(0, cols - word_len)
            if all(board[row + i][col + i] in ['', word[i]] for i in range(word_len)):
                for i in range(word_len):
                    board[row + i][col + i] = word[i]
                placed = True

# 정답 리스트의 단어들을 보드에 배치
for word in answers:
    place_word(board, word)

# 나머지 공간을 무작위 알파벳으로 채우기
for i in range(rows):
    for j in range(cols):
        if board[i][j] == '':
            board[i][j] = random.choice(alphabet)

# 보드 출력
for row in board:
    print(' '.join(row))
    

   
#------------------------------------------------
# 유저가 title, description, 단어 10개 이상 등록했다고 가정하고 
# 1. board 보여주기 
@app.get("/display-board")
def display():
    return board

# 2. 유저가 단어 클릭시 액션 구현
# 없거나 없는 단어 클릭시 틀렸다는 표시
# 단어 맞히면 맞았다는 표시 -> 전광판 단어 리스트에 맞춘 단어 표시 

class AnswerSubmission(BaseModel):
    member_id: int  # user_id 대신 member_id 사용
    puzzle_id: int
    answer: str
    
@app.post("/submit-answer")
def getUserAnswer(submitted : AnswerSubmission,  db: Session = Depends(get_db)):
    # 유저가 맞힌 정답 받기 -> 모델
    # DB 에 저장
    # 전광판에 다시 보여주기
    
    return None

