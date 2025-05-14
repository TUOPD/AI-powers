<template>
	<view class="AIreadPage">
		<view style="width: 100%;height: 25%;">
			<uni-section title="选择一张图片" type="line" style="width: 90%;">
				<view style="margin-left: 3%;">
					<uni-file-picker limit="1"  @select="select"></uni-file-picker>
				</view>
			</uni-section>
		</view>
		<view style="width: 100%;height: 25%;">
			<uni-section title="点击拍照" type="line" style="width: 90%;">
			</uni-section>
			<view style="width: 30%; aspect-ratio: 1 / 1;border: 1.5px solid gainsboro;margin-left: 3%;display: flex;align-items: center;justify-content: center;">
				<image src="/static/照相机 (1).svg" style="width: 60%;height: 50%"></image>
			</view>
		</view>
		<button class="buttonsend" @click="getfile()">发送</button>
		<!-- <view style="width: 100%;height: 50%;">
			<uni-section title="识图介绍" type="line" style="width: 90%;"></uni-section>
			<scroll-view style="width: 95%;" scroll-y="true">
				{{streamdata}}
			</scroll-view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Image:"",
				streamdata:"",
				ImageUrl:""
			}
		},
		methods: {
			select(e){
				this.Image=e.tempFilePaths[0]
			},
			getfile(){
				this.uploadfile()
			},
			uploadfile(){
				this.streamdata=""
				uni.uploadFile({
					url: "http://127.0.0.1:8080/app/upload", // 后端提供的上传接口
					filePath: this.Image,
					name: 'file',
					header: {
						'Content-Type': 'multipart/form-data', // 设置请求头
					},
					success: (res) => {
						this.ImageUrl=JSON.parse(res.data).url
					
						 uni.navigateTo({
						   url: `/pages/AIReadShow/AIReadShow?imgurl=${this.ImageUrl}`,
						 });
					},
					fail: (err) => {
						console.log('文件上传失败:', err);
					}
				});
			},
			showfile(){
				const that= this
				const request= wx.request({  
					method:'POST',
					url:"http://127.0.0.1:8080/app/read",
					data:{
						data:that.ImageUrl,
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
				       //当监听结束后的执行操作
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
		height: 100vh;
		position: absolute;
		top: 0%;
		overflow: hidden;

			
	}
	.buttonsend{
		width: 95%;
		font-family: Alimama FangYuanTi VF;
		color: white;
		background-color: deepskyblue;
		margin-top: 3%;
	}
</style>
