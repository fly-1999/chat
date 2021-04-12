<template>
	<view>
		<!-- 兼容安卓头部 -->
		<view class="status_bar">
			
		</view>
		<view class="header">
			<view class="header_search">
				<input type="text" v-model="chatsearch" @confirm="search" />
				<i class='iconfont'>&#xe6e4;</i>
			</view>
			<view class="cancel" @click="back">
				取消
			</view>
		</view>
		<view class="content_friend">
			<view v-show="friend">
				<view class="friend_title" v-if="isName">
					查无
				</view>
				<view class="friend_title" v-else>
					用户
				</view>
			</view>
			<view class="friend" v-for="(item,index) in content">
				<view class="friend_img">
					<image :src="`http://localhost:3000/public/img/${item.imgurl}`" mode=""></image>
				</view>
				<view class="friend_name">
					{{item.name}}
				</view>
				<view class="friend_button">
					<button type="default" class='send' v-if="isfriend[index]==1">发消息</button>
					<button type="default" class="add" @click="addfriends(index)" v-else>加好友</button>
				</view>
			</view>
			<!-- <view class="friend">
				<view class="friend_img">
					<image src="../../static/img/pic.jpg" mode=""></image>
				</view>
				<view class="friend_name">
					神说要有mei
				</view>
				<view class="friend_button">
					<button type="default" class='send'>发消息</button>
				</view>
			</view> -->
		</view>
		<!-- <view class="content_friend">
			<view class="friend_title">
				群组
			</view>
			<view class="friend" v-for="item in 2">
				<view class="friend_img">
					<image src="../../static/img/pic.jpg" mode=""></image>
				</view>
				<view class="friend_name">
					神说要有mei
				</view>
				<view class="friend_button">
					<button type="default" class="add">加好友</button>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatsearch:'',
				friend:false,
				content:'',
				//没有查询到
				isName:false,
				isfriend:[],
				local:''
			}
		},
		onLoad() {
			this.localdata();
		},
		methods: {
			localdata(){
				try {
				    this.local = uni.getStorageSync('user');
				} catch (e) {
				    // error
				}
			}
			,
			back(){
				uni.navigateBack({
				    delta: 1
				});
			},
			addfriends(e){  
				let data=this.content[e]
				// setTimeout(function(){
				// uni.$emit('friendmsg',data)
				// },100)
				try {
				    uni.setStorageSync('friend', data);
				} catch (e) {
				    // error
				}
				uni.navigateTo({
				    url: '../userhome/userhome'
				});
			},
			search(){
				uni.request({
					url: 'http://localhost:3000/search', 
					data: {
							name: this.chatsearch,
							id:this.local._id
					},
					method:'post',
					success: (res) => {
						this.content=res.data.docs;
						this.isfriend=res.data.array;
						this.friend=true;
						this.isName=false;
						if(res.data=='查无'){
							this.content='';
							this.isName=true;
						}
					},
				})
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
		display: flex;
		height: 88rpx;
		align-items: center;
		padding: 0 32rpx;
		justify-content: space-between;
		border-bottom: 1rpx solid #eee;
		.header_search{
			width: 600rpx;
			height: 60rpx;
			background: #F3F4F6;
			border-radius: 5px;
			position: relative;
			input{
				width: 530rpx;
				height: 60rpx;
				text-indent: 1rem;
			}
			i{
				position: absolute;
				right: 10rpx;
				top: 8rpx;
			}
		}
		.cancel{
			font-size: 28rpx;
		}
	}
	.content_friend{
		padding: 0 32rpx;
		.friend_title{
			width: 96rpx;
			height: 60rpx;
			color: #272832;
			font-size: 44rpx;
			margin-top: 34rpx;
			font-weight: bold;
		}
		.friend{
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.friend_img{
				image{
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
				}
			}
			.friend_name{
				margin-left: -220rpx;
			}
			.friend_button{
				.send,.add{
					height: 48rpx;
					line-height: 48rpx;
					border-radius: 24px;
					font-size: 24rpx;
				}
				.send{
					background: #FFE431;
				}
				.add{
					color: #4AAAFF;
					background: rgba(74,170,255,0.10);
				}
			}
		}
	}

</style>
