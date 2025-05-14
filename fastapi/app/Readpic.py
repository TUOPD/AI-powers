import oss2
from fastapi import APIRouter, File,UploadFile
from fastapi.responses import JSONResponse
from  fastapi.responses import StreamingResponse
from  pojo.Result import Result
from openai import OpenAI
from  pojo.Oss import Oss
import uuid
import os
readpic = APIRouter()
def Repic(data:str,data2:str):
    client = OpenAI(
        # 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx",
        api_key="",
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    )
    completion = client.chat.completions.create(
        model=
        "qwen-vl-ocr-latest",
        messages=[
            {
                "role": "user"
                ,
                "content"
                : [
                    {
                        "type": "image_url"
                        ,
                        "image_url": data
                        ,
                        # 输入图像的最小像素阈值，小于该值图像会按原比例放大，直到总像素大于min_pixels
                        "min_pixels": 28 * 28 * 4
                        ,
                        # 输入图像的最大像素阈值，超过该值图像会按原比例缩小，直到总像素低于max_pixels
                        "max_pixels": 28 * 28 * 8192
                    },
                    # qwen-vl-ocr-latest支持在以下text字段中传入Prompt，若未传入，则会使用默认的Prompt：Please output only the text content from the image without any additional descriptions or formatting.
                    # 如调用qwen-vl-ocr-1028，模型会使用固定Prompt：Read all the text in the image.不支持用户在text中传入自定义Prompt
                    {
                        "type": "text"
                        ,
                        "text": data2
                    },
                ]
            }
        ],
        stream=True,
        stream_options={
            "include_usage": True
        }
    )
    def streamsend():
        full_content = ""
        print("流式输出内容为：")
        for chunk in completion:

            if chunk.choices:
                full_content += chunk.choices[0].delta.content
                yield chunk.choices[0].delta.content

    return StreamingResponse(streamsend(), media_type="text/plain")
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
@readpic.post("/upload/readpic")
def upload(file:UploadFile):
    return OSS(file)
@readpic.post("/readpic")
def readpics(result:Result):
    splice = "?"
    part1, part2 = result.data.split(splice, 1) if splice in result.data else (result.data, "")
    print(part1+"   "+part2)
    return Repic(part1,part2)


