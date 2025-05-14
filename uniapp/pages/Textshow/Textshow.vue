<template>
	<view class="Textshow">
		<view style="width: 100%;height: 25%;">
		<uni-section title="选择一张图片" type="line" style="width: 90%;">
			<view style="margin-left: 3%;">
				<uni-file-picker limit="1" @select="select"></uni-file-picker>
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
		<view style="width: 100%;display: flex;flex-direction: row; height: 50%;">
			<uni-section title="取词说明" type="line" style="width: 90%;height: 100%;">
			<textarea style="border: 1.5px solid gainsboro;width: 100%;border-radius: 5px;margin-left: 3%;font-family:Alimama FangYuanTi VF; ;" placeholder="输入" maxlength="300" v-model="inputtext"></textarea>
			<button type="default" style="color: gainsboro;width: 100%;font-weight: 400;margin-left: 3%;margin-top: 3%;font-family:Alimama FangYuanTi VF;" @click="getfile()">
				发送
			</button>
			</uni-section>
		</view>
	</view>
</template>

<script>
	
	export default {
	
		data() {
			return {
				inputtext:"",
				Image:"",
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
				uni.uploadFile({
					url: "http://127.0.0.1:8080/app/upload/readpic", // 后端提供的上传接口
					filePath: this.Image,
					name: 'file',
					header: {
						'Content-Type': 'multipart/form-data', // 设置请求头
					},
					success: (res) => {
						this.ImageUrl=JSON.parse(res.data).url
					
						 uni.navigateTo({
						   url: `/pages/AITextshowRead/AITextshowRead?imgurl=${this.ImageUrl}&text=${this.inputtext}`,
						 });
					},
					fail: (err) => {
						console.log('文件上传失败:', err);
					}
				});
			},
			
		}
	}
</script>

<style>
	.text{
			
	}
	.Textshow{
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0%;
		overflow: hidden;
		background-color: white;
	}

</style>
