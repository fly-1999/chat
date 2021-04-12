<template>
	<view>
		<Header class='hc'>
			<view class="back" slot="left">
					<image src="../../static/img/back.svg" mode="" @click="back"></image>
			</view>  
			<view class="cont" slot="middle">
				好友请求
			</view>
		</Header>
		<view class="body">
			<view class="main" v-for="item in 0">
			<view class="head">
				<view class="reject">
					<button type="default">拒绝</button>
				</view>
				<view class="img">
					<image src="../../static/img/pic.jpg" mode=""></image>
				</view>
				<view class="agree">
					<button type="default">同意</button>
				</view>
			</view>
			<view class="body">
				<view class="title">
					神说要有mei
				</view>
				<view class="time">
					2019-2-12
				</view>
			</view>
			<view class="foot">
				留言：您好，相加你为好友，谢谢你的通过，快来和我聊天！
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
				
			}
		},
		methods: {
			//返回
			back(){
				uni.navigateBack({
				    delta: 1
				});
			},
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

	
.body{
	.main{
		height: 600rpx;
		margin: 40rpx 40rpx 0;
		box-shadow: 0 24px 64px -8px rgba(0,0,0,0.1);
		border-radius: 20rpx;
		.head{
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding: 20rpx 30rpx 0;
			.reject{
				button{
					background-color: pink;
					border-radius: 30rpx;
					height: 64rpx;
					width: 160rpx;
					line-height: 64rpx;
					color: #FF5D5B;
					font-size: 32rpx;
				}
			}
			.img{
				image{
					height: 200rpx;
					width: 200rpx;
					border-radius: 50%;
				}
			}
			.agree{
				button{
					background-color: #FFE431;
					border-radius: 30rpx;
					height: 64rpx;
					width: 160rpx;
					line-height: 64rpx;
					font-size: 32rpx;
				}
			}
		}
		.body{
			margin-top: 40rpx;
			.title{
				text-align: center;
				font-size: 42rpx;
				font-weight: bold;
			}
			.time{
				text-align: center;
			}
		}
		.foot{
			background: #F3F4F6;
			padding: 20rpx 20rpx;
			margin: 40rpx 20rpx 0;
			border-radius: 20rpx;
			font-size: 32rpx;
		}
	}
}
</style>
