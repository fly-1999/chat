<template>
	<view>
		<Header>
				<view class="back" slot="left">  
						<image src="../../static/img/back.svg" mode="" @click="back"></image>
				</view>  
				<view class="content" slot="middle">  
					聊天
				</view>
				 <view class="rightimg" slot="right">
				 	<image :src="`http://localhost:3000/public/img/${imgurl}`"mode=""></image>
				 </view> 
		</Header>
				<scroll-view class="scroll" scroll-y='true' :scroll-into-view="scrollView" :style="{height:oldHeight}" scroll-with-animation='true'>
					<view class="main" v-for="(item,index) in allmsg" :id='`name${index}`'>
						<view class="left" v-if="item.type=='1'">
							<view class="top">
										{{allmsg[index].date}}
							</view>
							<view class="bot">
								<view class="bot_img">
									<image :src="`http://localhost:3000/public/img/${fimgurl}`" mode=""></image>
								</view>
								<view class="substance">
									{{allmsg[index].msg}}
								</view>
							</view>
						</view>
						<view class="right" v-if="item.type=='0'">
							<view class="top">
									{{allmsg[index].date}}
							</view>
							<view class="bot">
								<view class="bot_img">
									<image :src="`http://localhost:3000/public/img/${imgurl}`" mode=""></image>
								</view>
								<view class="substance">
									{{allmsg[index].msg}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
		 <view class="foot">
		 	<view class="foot_top">
		 		<view class="foot_sound">
		 			<i class='iconfont'>&#xe606;</i>
		 		</view>
		 		<view class="foot_text">
		 			<textarea  type="text" value="" v-model="msg"  @keyup.enter="sendSocket"/>
		 		</view>
		 		<view class="foot_emoj" @click="explain">
		 			<i class='iconfont'>&#xe63f;</i>
		 		</view>
		 		<view class="foot_document">
		 			<i class='iconfont'>&#xe60c;</i>
		 		</view>
		 	</view>
			<view class="foot_cont" v-if="contentshow">
				<view class="allcontent">
					
				</view>
			</view>
		 </view>
	</view>
</template>

<script>
	import Header from '../../components/header/header.vue';
	export default {
		components:{
			Header
		},
		data() {
			return {
				contentshow:false,
				oldHeight:'calc(100vh - 88rpx - 100rpx)',
				scrollView:'name5',
				msg:'',
				allmsg:[],
				uid:'',
				fid:'',
				imgurl:'',
				fimgurl:''
				
			}
		},
		onLoad(){
			// this.getHeight()
			this.receiveSocketMsg();
			let data=[
			// 	{
			// 	msg:'开发的，都看见。',
			// 	type:'0',
			// 	date:new Date()
			// },{
			// 	msg:'开发的，上课地方叫来。',
			// 	type:'1',
			// 	date:new Date()
			// },{
			// 	msg:'开发的，上课地方叫来，都看见。',
			// 	type:'1',
			// 	date:new Date()
			// },{
			// 	msg:'开发的，上方叫来，都看见。',
			// 	type:'0',
			// 	date:new Date()
			// },{
			// 	msg:'开方叫来，都看见。',
			// 	type:'0',
			// 	date:new Date()
			// },
			]
			
			this.allmsg=data;
				uni.$on('chatpersonal', (res) => {
				this.fid=res.friend.id;
				this.uid=res.mine;
				this.imgurl=res.imgurl;
				this.fimgurl=res.friend.imgurl;
				
				})

			
		},
		onUnload() {
		    // 移除监听事件  
		    uni.$off('chatpersonal');  
						
		},
		methods: {
			//返回
			back(){
				uni.navigateBack({
				    delta: 1
				});
			},
			explain(){
				this.contentshow=!this.contentshow
				if(this.contentshow){
					this.oldHeight='calc(100vh - 88rpx - 500rpx)'
				}else{
					this.oldHeight='calc(100vh - 88rpx - 100rpx)'
				}
				this.scrollView='name5'
				
			},
			//获取屏幕高度
			getHeight(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.scroll').boundingClientRect(data => {
				  this.oldHeight=data.height;
					// this.Height=data.height-200;
				}).exec();
			},
			//发送消息
			sendSocket(){
				let msg={
					msg:this.msg,
					type:0
				}
				this.socket.emit('msg',msg,this.uid,this.fid);
				
				this.allmsg.push(msg)
				this.msg=''
			},
			//收到消息
			receiveSocketMsg(){
				this.socket.on('msg',(msg,fromid)=>{
					//判断一对一
					if(fromid==this.fid){
						let data={
							msg:msg.msg,
							type:1,
							date:new Date()
						}
						this.allmsg.push(data)
					}
					
				})
			}
		}
	}
</script>

<style lang="less">
		.back{
			image{
				width: 48rpx;
				height: 48rpx;
			}	
		}
		.rightimg{
				image{
					width: 68rpx;
					height: 68rpx;
					border-radius: 20rpx;
				}
			}
 
	.scroll{
		background-color: #F4F4F4;
		// height: calc(100vh - 88rpx - 100rpx);
		.main{
			padding: 0 32rpx;
			.left,.right{
				padding-bottom: 40rpx;
				.top{
					text-align: center;
					font-size: 24rpx;
					color: rgba(39,40,50,0.30);
					height: 80rpx;
					line-height: 80rpx;
				}
				.bot{
					display: flex;
					.bot_img{
						margin-right: 16rpx;
						image{
							width: 80rpx;
							height: 80rpx;
							border-radius: 20rpx;
						}
					}
					.substance{
						max-width: 480rpx;
						background-color: #fff;
						padding: 16rpx 24rpx;
						font-size: 32rpx;
						border-radius: 0 20rpx 20rpx 20rpx;
					}
				}
			}
			.right{
				.bot{
					flex-direction: row-reverse;
					.bot_img{
						margin-left: 16rpx;			
					}
				}
				
			}
		}
	}
	.foot{
		background: #F4F4F4;
		border-top: 2rpx solid rgba(0,0,0,0.1);
		.foot_top{
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 98rpx;
				padding: 0 32rpx;
				.foot_text{	
					textarea{
						width: 454rpx;
						height: 62rpx;
						border-radius: 10rpx;
						background-color: #fff;
						padding: 10rpx 10rpx 0;
						font-size: 36rpx;
					}
				}
				i{
					font-size: 56rpx;
				}
		}
		.foot_cont{
			.allcontent{
				height: 400rpx;
				// background-color: red;
			}
		}
	}
</style>
