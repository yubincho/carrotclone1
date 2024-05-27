from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLite 데이터베이스 파일 경로 설정
DATABASE_URL = "sqlite:///./db.db"  # 현재 디렉토리의 db.db 파일을 사용

# SQLAlchemy 엔진 인스턴스 생성
# echo=True는 SQL 문을 로그로 출력하게 해줌 (개발 단계에서 유용)
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False}, echo=True)

# 세션 클래스 생성
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base 클래스 생성
Base = declarative_base()
