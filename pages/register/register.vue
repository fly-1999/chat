<template>
	<view>
		<!-- 兼容安卓头部 -->
		<view class="status_bar">
			
		</view>
		<view class="header">
			<view class="header_back">
				<image src="../../static/img/back.svg" mode="" @click="back"></image>
			</view>
			<view class="header_cancel">
				<image src="../../static/img/cancel.svg" mode=""></image>
			</view>			
		</view>
		<view class="logo">
			<image src="../../static/img/logo.svg" mode=""></image>
		</view>
		<view class="body">
			<view class="body_title1">
				注册
			</view>
		</view>
		<view class="content">
			<view class="input">
				<input type="text" placeholder="请输入名字" v-model="name" @blur="namecheck" />
				<i class='iconfont' v-if='isname'>&#xe687;</i>
				<i class='error' v-if='errorname'>用户名已有</i>
			</view>
			<view class="input">
				<input type="text" placeholder="请输入邮箱" v-model="email" @blur="emailcheck"/>
				<i class='iconfont' v-if='isemail'>&#xe687;</i>
				<i class='error' v-if='erroremail'>邮箱错误</i>
			</view>
			<view class="input">
				<input :type="passwordtype" :value='password' placeholder="请输入密码" @blur="passwordsee"/>
				<i class='iconfont' @click='seepassord' v-if='ispassword'>&#xe61a;</i>
				<i class='iconfont' @click='seepassord' v-else>&#xe6a0;</i>				
			</view>
		</view>
		<view class="register">
			<button type="default" @click="register">注册</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				email:'',
				password:'',
				isname:'',
				isemail:'',
				erroremail:'',
				errorname:'',
				ispassword:'true',
				passwordtype:'password'
			}
		},
		methods: {
			//用户名检查
			namecheck(e){
				if(this.name.length>0){
					this.isname=true;
					this.errorname=false;
				}else{
					this.isname=false;
					this.errorname=true;
				}
			},
			//邮箱验证
			emailcheck(){
				let reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if(reg.test(this.email)){
					this.isemail=true;
					this.erroremail=false;
				}else{
					this.isemail=false;
					this.erroremail=true;
				}
			},
			//密码
			passwordsee(e){
				this.password=e.detail.value;
			},
			//显示密码
			seepassord(){
				this.ispassword=!this.ispassword;
				if(this.ispassword){
					this.passwordtype='password';
				}else{
					this.passwordtype='text';
				}
			},
			//返回上一级
			back(){
				uni.navigateBack({
				    delta: 1
				});
			},
			register(){
				if(this.isemail&&this.isname&&this.ispassword){
					uni.request({
						url: 'http://localhost:3000/register', 
						data: {
								name: this.name,
								email:this.email,
								psw:this.password
						},
						method:'post',
						success: (res) => {
							this.name='';
							this.email='';
							this.password='';
							this.isemail='';
							this.isname='';
							this.ispassword=true;
						   if(res.data=='注册成功'){
								alert('注册成功');
								uni.navigateTo({
								    url: '../login/login'
								});
							 }
							 else if(res.data=='邮箱不存在'){
								alert('邮箱不存在');
							}
							else if(res.data=='注册失败'){
								alert('注册失败');
							}
							else if(res.data=='已存在'){
								alert('已存在');
							}
							
						}
					})
				}else{
					alert('输入错误')
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
	.header_back{
		image{
			width: 34rpx;
			height: 34rpx;
		}
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
}

.content{
	padding:52rpx 62rpx 120rpx;
	.input{
		position: relative;
		border-bottom: 1rpx solid  rgba(39,40,50,0.08);
		height: 84rpx;	
		margin-bottom: 30rpx;
		input{
			width: 480rpx;
			font-size: 32rpx;			
		}
		i{
			position: absolute;
			right: 0;
			top: 20rpx;
			font-size: 40rpx
		}
		.error{
			color: #FF5D5B;
			font-size: 28rpx;
			font-style: normal;
		}
	}
}

.register{
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
