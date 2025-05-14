<template>
	<scroll-view scroll-y="true" class="Picreateshow">
		<view style="width: 100%;display: flex;flex-direction: column;">
			<uni-section title="生成图片" type="line" style="width: 100%;height: 3vh;">
			</uni-section>
			<uni-load-more iconType="circle" status="loading" v-show="isupload" style="width: 100%;"/>
		</view>
		<view style="width: 100%;display: flex;align-items: center;flex-direction: column;margin-top: 3vh;">
			 <image v-for="(item,index) in imglist" :src="item" style="width: 50%;aspect-ratio:1 / 1 ;border-radius: 5px;margin-top: 1.5vh;"  mode="aspectFill"></image>
		</view>
	</scroll-view>
</template>

<script>
	import { userstore } from '@/Store/store.js'
	const counter = userstore()
	export default {
		data() {
			return {
				isupload:true,
				imglist:[]
			}
		},
		methods: {
			
		},
		onLoad() {
			uni.request({
				method:'POST',
				url:"http://127.0.0.1:8080/app/pic",
					data:{
						data:{
							input1:counter.input1,
							input2: counter.input2,
							style: counter.style,
							size:counter.size,
							num:counter.num+1
							},
						message:"发送数据",
						code:201
						},
					    header:{
							"content-type":"application/json"
							},
						success:(res)=>{
							console.log(res)
							this.isupload = false
							this.imglist = res.data
							console.log(this.imglist[0])
						},
						fail: (res) => {
						},
						timeout:180000
			})
		}
	}
</script>

<style>
	
	.Picreateshow{
		width: 100vw;
		padding-bottom: 3vh;
	}

</style>
