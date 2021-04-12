<template>
	<view>
		<!-- 兼容安卓头部 -->
		<view class="status_bar">
			
		</view>
		<view class="header">
			<view class="header_cancel">
				<image src="../../static/img/cancel.svg" mode=""></image>
			</view>
			<view class="register" @click="toregister">
				注册
			</view>
		</view>
		<view class="logo">
			<image src="../../static/img/logo.svg" mode=""></image>
		</view>
		<view class="body">
			<view class="body_title1">
				登录
			</view>
			<view class="body_title2">
				您好，欢迎来到 大灰机！
			</view>
		</view>
		<view class="content">
			<input type="text" placeholder="用户名/邮箱" v-model="message" />
			<input type="password" placeholder="密码"  v-model="psw"  />
			<view class="errornotice" v-show="error">
				输入邮箱或密码错误
			</view>
		</view>
		<view class="login">
			<button type="default" @click="login">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message:'',
				psw:'',
				error:false
			}
		},
		methods: {
			toregister(){
				uni.navigateTo({
				    url: '../register/register'
				});
			},
			login(){	
				if(this.message.length>0&&this.psw.length>0){
					uni.request({
						url: 'http://localhost:3000/login', 
						data:{
							message:this.message,
							psw:this.psw
						},
						method:'post',
						success: (res) => {
							this.message='';
							this.psw='';
							if(res.data.msg=='登录成功'){						
								alert('登录成功');
								this.error=false;
								try {
								    uni.setStorageSync('user', res.data.data);
								} catch (e) {
								    // error
								}
								uni.navigateTo({
								    url: '../index/index'
								});
							}else{
								this.error=true;
							}
						}
					})
				}else{
					this.message='';
					this.psw='';
					this.error=true;
				}
				
				
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
	height: 88rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 32rpx 0 24rpx;
	.header_cancel{
		image{
			width: 34rpx;
			height: 34rpx;
		}
	}
	.register{
		font-size: 36rpx;
		font-weight: bold;
	}
}

.logo{
	height: 226rpx;
	padding-bottom: 54rpx;
	image{
		margin: 0 auto;
		height: 226rpx;
	}
}

.body{
	padding-left: 62rpx;
	.body_title1{
		font-size: 56rpx;
		color: #272832;
		margin-bottom: 14rpx;
	}
	.body_title2{
		font-size: 40rpx;
		color: #272832;
		opacity: 0.5;
	}
}

.content{
	padding:52rpx 62rpx 140rpx;
	position: relative;
	input{
		height: 84rpx;
		border-bottom: 1rpx solid  rgba(39,40,50,0.08);
	}
	.errornotice{
		position: absolute;
		color: red;
	}
}

.login{
	button{
		width: 520rpx;
		height: 96rpx;
		line-height: 96rpx;
		background-color: #FFE431;
		border-radius: 48rpx;
		font-size: 32rpx;
	}
}
</style>
