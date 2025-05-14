from fastapi import  FastAPI
from app.speak import speak
from  app.read import read
from app.Readpic import  readpic
from app.Piccreate import PicCreate
app = FastAPI() # 全局配置
app.include_router(speak,prefix="/app")
app.include_router(read,prefix="/app")
app.include_router(readpic,prefix="/app")
app.include_router(PicCreate,prefix="/app")
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app,host="127.0.0.1",port=8080)
