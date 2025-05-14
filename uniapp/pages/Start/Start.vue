<template>
	<view class="log">
		<view class="wave" >
			<view class="logger" style="position: absolute;top: 5%;left: 3%;">Welcome to </view>
			<view class="logger" style="position: absolute;top: 12%;left: 3%;">use my AI</view>
			<view class="logger" style="position: absolute;top: 19%; left: 3%;">toolkit</view>
		</view>
		<button type="default" class="butter" @click="jump()">一键启动</button>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			jump(){
				uni.switchTab({
				  url: '/pages/AIspeak/AIspeak'
				});
			}
		}
	}
</script>
<style scoped>
	.logger{
		width: 100%;
		height: 6%;
		font-family:Alimama FangYuanTi VF;
		font-size: 5vh;
		color: aliceblue;
		font-weight: 600;
	}
	.log{
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0%;
		overflow: hidden;
		background-color: white;
	}
	.wave {
	width: 100%;
	height: 100%;
	
	background: linear-gradient(
		to bottom,
		#1e90ff,
		#87cefa
	);
	clip-path: polygon(0 0,100% 0,100% 50%,0 100%)
	}
    .butter{
		width: 60%;
		font-size: 3vh;
		font-family:Alimama FangYuanTi VF;
		background-color: lightskyblue;
		position: absolute;
		top: 60%;
		left: 20%;
		z-index: 5;
	}
	.butter:hover{
		background-color: skyblue;
		color: azure;
	}
</style>