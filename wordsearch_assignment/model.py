from sqlalchemy import create_engine, Column, Integer, String, Table, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

Base = declarative_base()


# 사용자 모델
class Member(Base):
    __tablename__ = 'member'
    
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False) 
    # puzzles = relationship('Puzzle', back_populates='member')
    answers = relationship('UserPuzzleAnswer', back_populates='member')  # 관계 수정

# 퍼즐 모델
class Puzzle(Base):
    __tablename__ = 'puzzle'
    
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    word_list = Column(String, nullable=False) 
    answers = Column(String, nullable=False)
    board = Column(String, nullable=False) 
    answer_records = relationship('UserPuzzleAnswer', back_populates='puzzle')  # 관계 수정

    
Base = declarative_base()

class UserPuzzleAnswer(Base):  # 엔티티 연결 테이블
    __tablename__ = 'user_puzzle_answers'
    
    id = Column(Integer, primary_key=True)
    member_id = Column(Integer, ForeignKey('member.id'))  
    puzzle_id = Column(Integer, ForeignKey('puzzle.id'))
    correct = Column(Integer, nullable=False, default=0)  # 0은 틀린 답, 1은 맞는 답
    timestamp = Column(DateTime, server_default=func.now())  # 레코드 생성 시간 자동 기록


# 데이터베이스 생성 및 연결
engine = create_engine('sqlite:///db.db')
Base.metadata.create_all(engine)

# 세션 생성
SessionLocal = sessionmaker(bind=engine)
