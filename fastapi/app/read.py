import oss2
from fastapi import APIRouter, File,UploadFile
from fastapi.responses import JSONResponse
from  fastapi.responses import StreamingResponse
from  pojo.Result import Result
from openai import OpenAI
from  pojo.Oss import Oss
import uuid
import os
def AIread(data:str):
    client = OpenAI(
        # 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx",
        api_key="",
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    )
    print(data)
    completion = client.chat.completions.create(
        model="qwen-vl-max-latest",
        messages=[
            {
                "role": "system",
                "content": [{"type": "text", "text": "You are a helpful assistant."}],
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": data
                        },
                    },
                    {"type": "text", "text": "图片是什么"},
                ],
            },
        ],
        stream=True
    )
    def streamsend():
        full_content = ""
        print("流式输出内容为：")
        for chunk in completion:

            if chunk.choices:
                full_content += chunk.choices[0].delta.content
                yield chunk.choices[0].delta.content
    return StreamingResponse(streamsend(),media_type="text/plain")
def OSS(file:UploadFile):
    auth = oss2.Auth(Oss.OSS_ACCESS_KEY_ID,Oss.OSS_ACCESS_KEY_SECRET)
    bucket= oss2.Bucket(auth,Oss.OSS_ENDPOINT,Oss.OSS_BUCKET_NAME)
    file_name = f"{uuid.uuid4()}{os.path.splitext(file.filename)[1]}"
    # 上传文件到 OSS
    bucket.put_object(file_name, file.file)
    # 生成可访问的 URL
    file_url = f"http://{Oss.OSS_BUCKET_NAME}.{Oss.OSS_ENDPOINT}/{file_name}"
    print(JSONResponse(content={"url": file_url}))
    return JSONResponse(content={"url": file_url})
read = APIRouter()
@read.post("/read")
def AIspeak (result:Result):
    print(result)
    return AIread(result.data)
@read.post("/upload")
def upload(file:UploadFile):
    return OSS(file)
