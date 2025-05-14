from http import HTTPStatus
from urllib.parse import urlparse, unquote
from pathlib import PurePosixPath
import requests
from dashscope import ImageSynthesis
from  pojo.Result import Result
from fastapi import APIRouter
import os
from fastapi.responses import JSONResponse

PicCreate = APIRouter()
def createpic(data1:str,data2:str,data3:str,data4:str,data5:str):
    print(data1+" "+data2+" "+data3+data5)
    print(data4)
    rsp = ImageSynthesis.call(api_key="",
                              model=ImageSynthesis.Models.wanx_v1,
                              prompt=data1,
                              negative_prompt=data2,
                              n=int(data4),
                              style=data3,
                              size=data5)
    print('response: %s' % rsp)
    if rsp.status_code == HTTPStatus.OK:
        # 在当前目录下保存图片
        results = []
        for result in rsp.output.results:
            print(result)
            results.append(result.url)
        return  results
    else:
        print('sync_call Failed, status_code: %s, code: %s, message: %s' %(rsp.status_code, rsp.code, rsp.message))
@PicCreate.post("/pic")
def piccreate(result:Result):
    input1=result.data["input1"]
    input2 = result.data["input2"]
    style=result.data["style"]
    num = result.data["num"]
    size = result.data["size"]
    return  createpic(input1,input2,style,num,size)