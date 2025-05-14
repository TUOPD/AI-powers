<template>
	<view class="Picreate">
		<view style="width: 100%;height: 21%;display: flex;align-items: center;">
			<uni-section title="输入正向提示词" type="line" style="width: 90%;">
				<textarea style="width:100%;;border: 1.5px solid gainsboro;border-radius: 5px;margin-left: 3%;height: 15vh;" placeholder="请输入" v-model="truetext"></textarea>
			</uni-section>
		</view>
		<view style="width: 100%;height: 23%;display: flex;align-items: center;">
			<uni-section title="输入逆向提示词" type="line" style="width: 90%;">
				<textarea style="width:100%;;border: 1.5px solid gainsboro;border-radius: 5px;margin-left: 3%;height: 15vh;" placeholder="请输入" v-model="falsetext"></textarea>
			</uni-section>
		</view>
		<view style="width: 100%;height: 17%;display: flex;align-items: center;">
			<uni-section title="选择样式" type="line" style="width: 90%;display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;align-items: center;justify-content: 3%; padding-bottom: 2%;">
				<button type="default" class="butter" v-for="(item,index) in stylelist1" :key="index" @click="selectstyle1(index)"
				:style="{
					width: '28%',
					backgroundColor: activestyle1 === index ? 'skyblue' : 'white',
						color: activestyle1 === index ? 'white' : 'black'}">{{item}}</button>
			</view>
				<view style="width: 100%;display: flex;align-items: center;justify-content: 3%;margin-top: 3%;padding-bottom: 2%;">
					<button  type="default" class="butter"  v-for="(item,index) in stylelist2" :key="index" @click="selectstyle2(index)"
					:style="{
						width: '28%',
						backgroundColor: activestyle2 === index ? 'skyblue' : 'white',
							color: activestyle2 === index ? 'white' : 'black'}">{{item}}</button>
				</view>
			</uni-section>
		</view>
		<view style="width: 100%;height: 17%;display: flex;align-items: center;">
			<uni-section title="选择大小" type="line" style="width: 90%;">
				<view style="width: 100%;display: flex;align-items: center;justify-content: 3%;margin-top: 1%;padding-bottom: 2%;">
					<button type="default" class="butter" :style="{
						width: '28%',
						backgroundColor: activesize === index ? 'skyblue' : 'white',
							color: activesize === index ? 'white' : 'black'}" v-for="(item,index) in sizelist" :key="index" @click="selectsize(index)">{{item}}</button>
				</view>
			</uni-section>
		</view>
		<view style="width: 100%;height: 9%;display: flex;align-items: center;">
			<uni-section title="选择数量" type="line" style="width: 90%;">
				<view style="width: 100%;display: flex;align-items: center;justify-content: 3%;margin-top: 1%;padding-bottom: 2%;">
					<button type="default" class="butter" :style="{
						width: '28%',
						backgroundColor: activenum === index ? 'skyblue' : 'white',
							color: activenum === index ? 'white' : 'black'}"  v-for="(item,index) in numlist" :key="index" @click="selectnum(index)"> {{item}}</button>
				</view>
			</uni-section>
		</view>
		<button class="buttonsend" @click="send()">发送</button>
	</view>
</template>

<script>
	import { userstore } from '@/Store/store.js'
	const counter = userstore()
	export default {
		data() {
			return {
				truetext:"",
				falsetext:"",
				stylelist1:["默认","动画","油画"],
				stylelist2:["水彩","素描","3D"],
				sizelist:["1024*1024","720*1280","1280*720"],
				numlist:["1张","2张","3张"],
				activestyle1:null,
				activestyle2:null,
				activesize:null,
				activenum:null,
				activestylesend:null,
				activesizesend:null,
				activenumsend:null
			}
		},
		methods: {
			selectstyle1(e){
				this.activestyle2=null
				this.activestyle1=e
				if(this.stylelist1[this.activestyle1] === "默认"){
					this.activestylesend="<auto>"
				}else if(this.stylelist1[this.activestyle1]==="动画"){
					this.activestylesend="<anime>"
				}else if(this.stylelist1[this.activestyle1]==="油画"){
					this.activestylesend="<oil painting>"
				}
			},
			selectstyle2(e){
				this.activestyle1=null
				this.activestyle2=e
				if(this.stylelist1[this.activestyle1] === "水彩"){
					this.activestylesend="<watercolor>"
				}else if(this.stylelist1[this.activestyle1]==="素描"){
					this.activestylesend="<sketch>"
				}else if(this.stylelist1[this.activestyle1]==="3D"){
					this.activestylesend="<3d cartoon>"
				}
			},
			selectsize(e){
				this.activesize=e
				this.activesizesend = this.sizelist[this.activesize]
			},
			selectnum(e){
				this.activenum = e
				this.activenumsend = this.activenum
			},
			send(){
				counter.input1 = this.truetext
				counter.input2 = this.falsetext
				counter.style = this.activestylesend
				counter.size = this.activesizesend
				counter.num = this.activenum
				console.log(counter.input1)
			    uni.navigateTo({
			      url: '/pages/Picreateshow/Picreateshow'
			    });
			}
		}
	}
</script>

<style>
	.butter{
		width: 25%;
		height:6vh;
		color: white;
		font-family:Alimama FangYuanTi VF;
		
		
		
	}
     .Picreate{
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
	 	margin-top: 5%;
	 }
</style>
