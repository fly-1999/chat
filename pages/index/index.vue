<template>
	<view>
		<!-- 兼容安卓头部 -->
		<view class="status_bar">
			
		</view>
		<view class="header">
			<view class="header_pic">
				<image :src="`http://localhost:3000/public/img/${local.imgurl}`" mode="" @click="toPersonal"></image>
			</view>
			<view class="header_logo">
				<image src="../../static/img/logo.svg" mode=""></image>
			</view>
			<view class="header_right">
				<view class="header_query">
					<image src="../../static/img/query.svg" mode="" @click="search"></image>
				</view>
				<view class="header_add">
					<image src="../../static/img/add.svg" mode=""></image>
				</view>		
			</view>
		</view>
		<view class="body">
			<view class="friends" @click="request">
				<view class="friends_left">
					<image src="../../static/img/addfriend.svg" class='addfriend' mode=""></image>
					<!-- <view class="friends_point">
						2
					</view> -->
				</view>
				<view class="friends_right">
					<view class="friends_title">
							<view class="friends_title_name">
								好友请求
							</view>
							<view class="friends_title_time">
								<!-- 上午2：20 -->
							</view>
					</view>
					<view class="friends_content">
						好友在这里哦
					</view>
				</view>
			</view>
			<view class="friends" v-for="(item,index) in friend" :key=index @click="chat(item)">
				<view class="friends_left">
					<image :src="`http://localhost:3000/public/img/${item.imgurl}`" mode=""></image>
			<!-- 		<view class="friends_point">
						2
					</view> -->
				</view>
				<view class="friends_right">
					<view class="friends_title">
							<view class="friends_title_name">
								{{item.name}}
							</view>
							<view class="friends_title_time">
								{{item.time}}
							</view>
					</view>
					<view class="friends_content">
						{{item.explain}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				local:'',
				friend:'',
				lastmsg:[]
			}
		},
		onLoad() {
			this.localdata();
			//获取消息表
			uni.request({
				url: 'http://localhost:3000/index', 
				data:{
					uid:this.local.userID,
					state:'0'
				},
				method:'post',
				success: (res) => {
					this.friend=res.data;
					//获取最后一条消息		
					this.friend.forEach((e,i)=>{
						uni.request({
							url: 'http://localhost:3000/lastmsg', 
							data:{
								uid:this.local._id,
								fid:this.friend[i].id
							},
							method:'post',
							success: (res) => {
								this.lastmsg.push(res.data.message)
							},
						})
					})
					
				},
			})
		
			//获取未读消息
			uni.request({
				url: 'http://localhost:3000/unreadmsg', 
				data:{
					uid:this.local._id,
					fid:"603f5d24f07dec3b786cdd54"
				},
				method:'post',
				success: (res) => {
					// console.log(res)
				},
			})
			//好友请求
			uni.request({
				url: 'http://localhost:3000/index', 
				data:{
					uid:this.local.userID,
					state:'1'
				},
				method:'post',
				success: (res) => {
				},
				})
				
			this.join(this.local._id)

		},
		methods: {
			search(){
				uni.navigateTo({
				    url: '../chatsearch/chatsearch'
				});
			},
			toPersonal(){
				uni.navigateTo({
				    url: '../personal/personal'
				});
			},
			request(){
				uni.navigateTo({
						url: '../request/request'
				});
			},
			chat(e){
				let id=this.local._id;
				let imgurl=this.local.imgurl;
				setTimeout(function(){
					uni.$emit('chatpersonal',{friend:e,mine:id,imgurl:imgurl})
				},100)
				uni.navigateTo({
						url: '../chat/chat'
				});
				
			},
			localdata(){
				try {
				    this.local = uni.getStorageSync('user');
				    if (value) {
				        
				    }
				} catch (e) {
				    // error
				}
			},
			//socket.io
			join(uid){
				this.socket.emit('login',uid);
				this.socket.on('connect', () => {
				  // ws连接已建立，此时可以进行socket.io的事件监听或者数据发送操作
				  console.log('ws 已连接');
				});
			}
		}
	}
</script>

<style lang="less">
	.status_bar{
		height: var(--status-bar-height);
		width: 100%;
		background-color: grey;
	}
	.header{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 20;
		background-color: #fff;
		display: flex;
		height: 88rpx;
		align-items: center;
		border-bottom: 1rpx solid #999;
		.header_pic{
			padding-left: 32rpx;
			flex: 1;
			image{
				width: 68rpx;
				height: 68rpx;
				border-radius:10rpx;
			}
		}
		.header_logo{
			width: 128rpx;
			image{
				width: 128rpx;
				height: 72rpx;
			}
		}
		.header_right{
			display: flex;
			flex: 1;
			padding-right: 32rpx;
			justify-content:flex-end;
			.header_query{
				image{
					width: 52rpx;
					height: 52rpx;
				}
			}
			.header_add{
				margin-left: 32rpx;
				image{
					width: 48rpx;
					height: 48rpx;
				}
			}
		}	
	}
.body{
	margin-top: 88rpx;
	.friends{
		height: 96rpx;
		display: flex;
		padding: 18rpx 32rpx 14rpx;
		.friends_left{
			position: relative;
			image{
				width: 96rpx;
				height: 96rpx;
				border-radius: 20rpx;
			}	
			.friends_point{
				position: absolute;
				top: -10rpx;
				left: 66rpx;
				background: #FF5D5B;
				color: #fff;
				font-size: 30rpx;
				padding: 0 12rpx;
				border-radius: 30rpx;
				
				//#ifdef APP-PLUS
				padding: 0 16rpx;
				//#endif
			}
			.addfriend{
				width: 56rpx;
				height: 56rpx;
				padding: 20rpx;
				background: #FFE431;
			}
		}
		.friends_right{
			display: flex;
			flex-direction:column;
			padding-left: 32rpx;
			.friends_title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.friends_title_name{
					font-size: 36rpx;
				}
				.friends_title_time{
					font-size: 24rpx;
					color: rgba(39,40,50,0.40);
				}
			}
			.friends_content{
				width: 542rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 28rpx;
				color: rgba(39,40,50,0.60);
			}
		}
	}
}
</style>
