<template>
	<view>
		<image :src="`http://localhost:3000/public/img/${friendmsg.imgurl}`" mode="" class="background"></image>
		<!-- 兼容安卓头部 -->
		<view class="status_bar">
			
		</view>
		<view class="header">
			<image src="../../static/img/back.svg" mode="" @click="back"></image>
		</view>
		<view class="friend_img" :animation="animationData3">
			<image :src="`http://localhost:3000/public/img/${friendmsg.imgurl}`" mode=""></image>
			<i class='iconfont' v-show='friendmsg.sex=="asexual"&&isadd'>&#xe62d;</i>
		<!-- 	<i class='iconfont' v-show='friendmsg.sex=="male"'>&#xe694;</i>
			<i class='iconfont' v-show='friendmsg.sex=="female"'>&#xe66f;</i> -->
		</view>
		<view class="friend_content">
			<view class="name" @click="test">
				{{friendmsg.name}}
			</view>
			<view class="nickname">
				昵称：	{{friendmsg.name}}
			</view>
			<view class="instroduce">
				{{friendmsg.explain}}
			</view>
		</view>
		<view class="addfriend">
			<button type="default" @click="close">加为好友</button>
		</view>
		<view class="message" :style="{height:Height+'px'}" :animation="animationData1">
			<view class="message_name">
				{{friendmsg.name}}
			</view>
			<view class="message_content">
				<textarea value="" placeholder="亲爱的，快点来到我这里～" v-model="friendask"/>
			</view>
		</view>
		<view class="message_bt" :animation="animationData2">
			<button type="default" class="close" @click="close">取消</button>
			<button type="default" class="send" @click="send">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Height:'',
				animationData1: {},
				animationData2: {},
				animationData3: {},
				isadd:true,
				//好友信息
				friendmsg:'',
				user:'',
				//发送的好友消息
				friendask:'',
				
			}
		},	
		onLoad() {
				// uni.$on('friendmsg',(data)=>{	
				// 	this.friendmsg=data;
				// 	console.log(this.friendmsg)
				// })
				try {
				    this.friendmsg = uni.getStorageSync('friend');
				    if (value) {
				    
				    }
				} catch (e) {
				    // error
				}
				try {
				   this.user=uni.getStorageSync('user');		 
				    if (value) {
				        
				    }
				} catch (e) {
				    // error
				}
				
				
				// console.log(this.friendmsg)
				
		},
		
		onReady(){
			this.getHeight();
			
		},	 
		onUnload() {  
		    // 移除监听事件  
		    // uni.$off('friendmsg');  
						
		},
		methods: {
			test(){
			this.friendmsg='data'
			},
			//返回上一页
			back(){
				uni.navigateBack({
				    delta: 1
				});
			},
			//获取屏幕高度
			getHeight(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.background').boundingClientRect(data => {
				  this.Height=data.height-186;
				}).exec();
			},
			//取消加好友
			close(){
				this.isadd=!this.isadd;
				const animation1 = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})		
				const animation2 = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})				
				const animation3 = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})				
				if(this.isadd){
					animation1.bottom(-this.Height).step();
					animation2.bottom(-100).step();
					animation3.width(200).height(200).top(0).step();
					
				}else{
					animation1.bottom(0).step();
					animation2.bottom(4).step();
					animation3.width(120).height(120).top(40).step();
				}
					
				this.animationData1 = animation1.export();
				this.animationData2 = animation2.export();
				this.animationData3 = animation3.export();
			},
			//发送好友请求
			send(){
				uni.request({
					url: 'http://localhost:3000/friendask', 
					data:{
						userID:this.user._id,
						friendID:this.friendmsg._id,
						message:this.friendask
					},
					method:'post',
					success: (res) => {
						if(res.data=='success'){
							alert('发送成功')
							uni.navigateTo({
							     url: '../index/index'
							 });
						}else{
							alert('发送失败')
						}
						
						
					}
					})
				
				}
		}
	}
</script>

<style lang="less">
	.background{
		position: fixed;
		left: -10rpx;
		top: -10rpx;
		height: 100%;
		width: 100%;
		filter: blur(16px);
		opacity: 0.4;
	}
  .status_bar{
		height: var(--status-bar-height);
		width: 100%;
		background-color: grey;
	}
	.header{
		display: flex;
		height: 88rpx;
		align-items: center;
		padding-left: 35rpx;
		image{
			width: 48rpx;
			height: 48rpx;
		}
	}
	.friend_img{
			position: relative;
			width: 400rpx;
			height: 400rpx;
			margin: 60rpx auto 0;
			z-index: 11;
			image{
				width: 100%;
				height: 100%;	
				border-radius: 48rpx;		
			}
			i{
				position: absolute;
				right: 30rpx;
				bottom: 26rpx;
				font-size: 50rpx;
				background-color: #FF5D5B;
				color: #fff;
				border-radius: 50%;
				padding: 10rpx;
			}
	}
	.friend_content{
		padding: 48rpx 100rpx 0;
	
		.name{
			font-size: 52rpx;
			color: #272832;
			text-align: center;
		}
		.nickname{
			font-size: 28rpx;
			color: #272832;
			text-align: center;
		}
		.instroduce{
			font-size: 28rpx;
			margin-top: 20rpx;
		}
	}
	.addfriend{
		padding: 0 34rpx;
		position: fixed;
		bottom: 30rpx;
		button{
			width: 684rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #FFE431;
			border-radius: 10rpx;
		}
	}
	.message{
		width: 100%;
		background-color: #fff;
		z-index: 10;
		position: fixed;
		bottom: -1252rpx;
		border-radius: 40rpx 40rpx 0 0;
		box-sizing: border-box;
		padding: 0 58rpx;
		.message_name{
			margin-top: 168rpx;
			font-size: 52rpx;
			color: #272832;
		}
		.message_content{
			margin-top: 42rpx;
			textarea{
				box-sizing: border-box;
				width: 100%;
				height: 520rpx;
				padding:18rpx 22rpx;
				background-color: #F3F4F6;
				font-size: 32rpx;
			}
		}
	}
	.message_bt{
		display: flex;
		position: fixed;
		bottom: -200rpx;
		width: 100%;
		z-index: 11;
		justify-content: center;
		
		.close{
			width: 172rpx;
			background: rgba(39,40,50,0.10);
			border-radius: 10px;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
		}
		.send{
			width: 480rpx;
			background: #FFE431;
			border-radius: 10px;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
		}
	}
</style>
