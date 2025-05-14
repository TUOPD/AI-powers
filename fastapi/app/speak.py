from fastapi import APIRouter
from  fastapi.responses import StreamingResponse
from  pojo.Result import Result
import os
from openai import OpenAI
def AI(data:str):
    client = OpenAI(
        # 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx",
        api_key="",
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    )
    completion = client.chat.completions.create(
        model="qwen-plus",
        # 此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
        messages=[{'role': 'user', 'content': data}],
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
speak = APIRouter()
@speak.post("/speak")
def AIspeak (result:Result):
    print(result)
    return  AI(result.data)