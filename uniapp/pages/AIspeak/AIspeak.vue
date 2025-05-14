<template>
	<view class="AIspeak">
			<scroll-view class="speakview" scroll-y="true">
				<view class="speaktext" v-for="(item,index) in listtext" :key="index">
					<view style="width: 10%;padding: 1%; display: flex;" v-if="(index % 2) === 0">
						<image src="/static/robot-2-line.svg"  mode="aspectFit" style="width: 90%; height: 6vh;align-items: center;border-radius: 3px;"></image>
					</view>
					<view style="width: 10%;padding: 1%; display: flex;" v-else>
						<image src="/static/人头像-copy.svg"  mode="aspectFit" style="width: 90%; height: 6vh;align-items: center;border-radius: 3px;"></image>
					</view>
					<view style="width: 70%;background-color: antiquewhite; overflow-wrap: break-word;white-space: pre-wrap;padding: 8px; font-size: 3vh;border: 1.5px solid skyblue;font-family: Alimama FangYuanTi VF;">{{item}}</view>
				</view>
			</scroll-view>
			<view class="speakinput">
				<textarea placeholder="请输入文本" maxlength="500" confirm-type="send" v-model="inputtext"  adjust-position="false" :disabled="isinput"></textarea>
				<button type="default" @click="handleSend()" style="background-color:deepskyblue;font-family: Alimama FangYuanTi VF;position: absolute;bottom: 0%;right: 0%;color: white;height: 20%;display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<span>发</span>
					<span>送</span>
				</button>
			</view>
	</view>
</template>
<script>
export default {
  data() {
    return {
      inputtext: "",
	  listtext:["你好，有什么可以帮助你的"],
	  isinput:false,
	  streamdata:""
    }
  },
  methods:{
	  handleSend(){
		  console.log("98986")
		  this.listtext.push(this.inputtext)
		  var text = this.inputtext
		  this.inputtext=""
		  this.isinput=true
		 //  uni.request({
		 //  	method:'POST',
			// url:"http://127.0.0.1:8080/app/speak",
			// data:{
			// 	data:text,
			// 	message:"发送数据",
			// 	code:201
			// },
			// header:{
			// 	"content-type":"application/json"
			// },
			// success:(res)=>{
			// 	this.inputtext=""
			// 	this.listtext.push(res.data.data)
			// 	this.isinput=false
			// },
			// fail: (res) => {
			// 	console.log(res)
			// }
		 //  })
		  const that= this
		 const request= wx.request({
			 method:'POST',
			 url:"http://127.0.0.1:8080/app/speak",
			 data:{
				data:text,
				message:"发送数据",
				code:201
			 },
			 header:{
				 "content-type":"application/json"
			 },
			 enableChunked:true,
			 success:(res)=>{
			 console.log(res+"9999")
			 },
			 fail: (res) => {
			 	console.log(res)
			 } ,
			 complete:(res)=>{
				 that.isinput = false
				 that.streamdata=""
			 }
		 })
		 request.onChunkReceived(function(res){
			 const decoder = new TextDecoder('utf-8');
			const chunkString = decoder.decode(new Uint8Array(res.data));
			console.log(chunkString)
			 if(that.streamdata===""){
				 that.streamdata+=chunkString
				 that.listtext.push(that.streamdata)
			 }
			 else{
				 that.listtext.pop()
				 that.streamdata+=chunkString
				 that.listtext.push(that.streamdata)
			 }
			 
		 })
	  }
  }
}
</script>

<style>
	.AIspeak{
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0%;
		overflow: hidden;
		background-color: white;
	}
	.speakview{
		width: 100%;
		height: 80%;
	}
	.speakinput{
		width: 100%;
		height: 20%;
		border-top: 1.5px solid skyblue;
		display: flex;
		
	}
	.speaktext{
		width: 100%;
		height: auto;
		display: flex;
		margin-top: 6%;
	}
</style>