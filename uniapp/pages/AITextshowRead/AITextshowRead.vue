<template>
	<scroll-view class="AIreadPage" scroll-y="true">
		<view class="imgeshow">
			<image :src="ImageUrl" style="width: 90%; aspect-ratio: 1 / 1;margin-left: 5%"></image>
		</view>
		<view style="width: 100%;">
			<uni-section title="文字提取" type="line" style="width:90%;"></uni-section>
			<view style="width: 90%;margin-left: 5%;margin-right: 5%;border-left: 1.5px solid skyblue; border-right: 1.5px solid skyblue;font-family:Alimama FangYuanTi VF;">
				{{streamdata}}
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				streamdata:"",
				ImageUrl:"",
				text:""
			}
		},
		onLoad(data) {
			this.ImageUrl = data.imgurl
			console.log(data)
			console.log(999+this.ImageUrl)
			this.text = data.text
			this.showfile()
		},
		methods: {
			showfile(){
				const that= this
				that.streamdata=""
				const request= wx.request({  
					method:'POST',
					url:"http://127.0.0.1:8080/app/readpic",
					data:{
						data:that.ImageUrl+"?"+that.text,
						message:"发送数据",
						code:201
					},
					header:{
						"content-type":"application/json"
					 },
					enableChunked:true,     //记得加上这一条开启流式传输
					success:(res)=>{
						console.log(res+"9999")
						},
					fail: (res) => {
						console.log(res)
					 } ,
					complete:(res)=>{
						 }
					 })
					 request.onChunkReceived(function(res){                  //开启监听
						 const decoder = new TextDecoder('utf-8');
						const chunkString = decoder.decode(new Uint8Array(res.data));
						console.log(chunkString)
						 that.streamdata+=chunkString
					 })
			}
		}
	}
</script>

<style>
	.AIreadPage{
		width: 100vw;
	}
	.imgeshow{
		width: 100%;
		background-color: azure;
	}
</style>
