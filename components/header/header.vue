<template>
	<view>
		<!-- 兼容安卓头部 -->
		<view class="status_bar">
			
		</view>
		<view class="header">
			<view class="left">  
					<slot name="left"></slot>  
				</view>  
				<view class="middle">
					<slot name="middle"></slot> 
				</view> 
				<view class="right">
					<slot name="right"></slot>  
				</view>  
		</view>
		<!-- 填补空白 -->
		<view class="content">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
	justify-content: space-between;
	padding: 0 24rpx;
	align-items: center;
	height: 88rpx;
	border-bottom: 1rpx solid #eee;
	width: 100%;
	background-color: #fff;
	box-sizing: border-box;
	z-index: 20;
	position: fixed;
	top: 0;
	left: 0;
}
.content{
	height: 88rpx;
}
</style>
