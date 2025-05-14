from pydantic import BaseModel

class Result(BaseModel):
    data:object
    code: int
    message: str

    def __init__(self, data: object, code: int, message: str):
        super().__init__(data=data, code=code, message=message)
    def set_object(self,object:object):
        self.data=object
    def set_code(self,code:int):
        self.code = code
    def set_message(self,message:str):
        self.message = message
    def getmessage(self):
        return self.message
    def getcode(self):
        return self.code
    def getdata(self):
        return self.data
