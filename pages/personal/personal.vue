<template>
	<view>
		<Header>  
				<view class="back" slot="left">  
						<image src="../../static/img/back.svg" mode="" @click="back"></image>
				</view>  
				<view class="content" slot="middle">  
						详情 
				</view> 
		</Header>  
		<view class="main">
			<view class="row">
				<view class="row_left">
					头像
				</view>
				<view class="row_img" >
					<image-cropper :src="tempFilePath" @confirm="confirm"  @cancel="cancel"></image-cropper>
					
					<image :src="cropFilePath" class="meslist_img" @tap="upload"></image>
					<!-- <image src="../../static/img/pic.jpg" mode=""></image> -->
				</view>
				<view class="row_right">
					<i class='iconfont'>&#xe630;</i>
				</view>
			</view>
			<view class="row" @click="animate('签名')">
				<view class="row_left">
					签名
				</view>
				<view class="row_middle" >
					{{user.explain}}
				</view>
				<view class="row_right">
					<i class='iconfont'>&#xe630;</i>
				</view>
			</view>
			<view class="row line">
				<view class="row_left">
					注册
				</view>
				<view class="row_middle">
					{{user.time}}
				</view>
				<view class="row_right">
					<i class='iconfont'>&#xe630;</i>
				</view>
			</view>
			<view class="row">
				<view class="row_left">
					昵称
				</view>
				<view class="row_middle" @click="animate('昵称')">
					{{user.name}}
				</view>
				<view class="row_right">
					<i class='iconfont'>&#xe630;</i>
				</view>
			</view>
			<view class="row">
				<view class="row_left">
					性别
				</view>
				<view class="row_middle">
					<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
				<view class="row_right">
					<i class='iconfont'>&#xe630;</i>
				</view>
			</view>
			<view class="row">
				<view class="row_left">
					生日
				</view>
				<view class="row_middle">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
					</picker>
				</view>
				<view class="row_right">
					<i class='iconfont'>&#xe630;</i>
				</view>
			</view>
			<view class="row"  @click="animate('电话')">
				<view class="row_left">
					电话
				</view>
				<view class="row_middle">
					{{user.phone}}
				</view>
				<view class="row_right">
					<i class='iconfont'>&#xe630;</i>
				</view>
			</view>
			<view class="row line">
				<view class="row_left">
					邮箱
				</view>
				<view class="row_middle" @click="animate('邮箱')">
					{{user.email}}
				</view>
				<view class="row_right">
					<i class='iconfont'>&#xe630;</i>
				</view>
			</view>
			<view class="row line">
				<view class="row_left">
					密码
				</view>
				<view class="row_middle" @click="animate('密码')">
					******
				</view>
				<view class="row_right">
					<i class='iconfont'>&#xe630;</i>
				</view>
			</view>
			<view class="bt">
				<button type="default" @click="out">退出应用</button>
			</view>
		</view>
		<view class="details" :animation="animationData">
			<view class="d_header">
				<view class="cancel"  @click="animate">
						取消
				</view>  
				<view class="cont" >
					{{name}}
				</view>
				<view class="sure" @click="surechange(name)">  
						确定 
				</view> 
			</view>
			<view class="d_main">
				<!-- <view class="passw" v-if="name=='密码'">
					<input type="text" v-model="pass" placeholder="请输入原密码"/>
				</view> -->
				<view class="textarea">
					<textarea value="" v-model="content" placeholder="" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '../../components/header/header.vue';
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	export default {
		components:{
			ImageCropper,
			Header
		},
		data() {
			const currentDate = this.getDate({
					format: true
			})
			return {
				 array: ['男', '女', '未知'],
				 index: 0,
				 date: currentDate,
				 // 照片裁剪
				 tempFilePath: "",
				 cropFilePath: "http://localhost:3000/public/img/",
				 //动画
				  animationData: {},
					isclicked:'true',
					name:'',
					user:'',
					//修改的名称
					change:'',
					//修改内容
					content:'',
					// 原来密码
					pass:''
			}
		},
		onLoad() {
			try {
			    this.user = uni.getStorageSync('user');
					this.date=this.user.brith;
					this.cropFilePath=this.cropFilePath+this.user.imgurl;
					if(this.user.sex=='asexual'){
						this.index=2;
					}else if(this.user.sex=='male'){
						this.index=0;
					}else{
						this.index=1;
					}
			} catch (e) {
			    // error
			}
		},
		computed:{
			startDate() {
					return this.getDate('start');
			},
			endDate() {
					return this.getDate('end');
			}
		},
		methods: {
			//返回
			back(){
				uni.navigateBack({
				    delta: 1
				});
			},
				//动画
				animate(e){				
					this.isclicked=!this.isclicked;
					 const animation = uni.createAnimation({
									duration: 500,
					        timingFunction: 'ease',
					  })
							if(this.isclicked){
								this.name='';
								animation.left(1000).step()
							}else{
								this.name=e;
								animation.left(0).step()
								this.content='';
								this.pass='';
							}					
					  this.animationData = animation.export()
				},
			  //性别
			  bindPickerChange: function(e) {
						this.index = e.target.value;
						this.change='sex';
						if(this.index=='2'){
							this.content='asexual'
						}else if(this.index=='1'){
							this.content='female'							
						}else{
						this.content='male'
						}
						uni.request({
							url: 'http://localhost:3000/personchange', 
							data:{
									_id:this.user._id,
								  change:this.change,
									content:this.content,
							},
							method:'post',
							success: (res) => {
								if(res.statusCode=='200'){
									try {
									    uni.setStorageSync('user', res.data);
									} catch (e) {
									    // error
									}
									this.user=res.data;
								}else{
									alert('修改错误')
								}
								
								
							},
						}) 
				},
				//日期
				 bindDateChange: function(e) {
						this.date = e.target.value
						uni.request({
							url: 'http://localhost:3000/personchange', 
							data:{
									_id:this.user._id,
								  change:'brith',
									content:this.date,
							},
							method:'post',
							success: (res) => {
								if(res.statusCode=='200'){
									try {
									    uni.setStorageSync('user', res.data);
									} catch (e) {
									    // error
									}
									this.date=res.data.brith;
								}else{
									alert('修改错误')
								}
								
								
							},
						}) 
				},
				getDate(type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
        },
				//照片裁剪
				  upload() {
				      uni.chooseImage({
				        count: 1, //默认9
				        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
				        sourceType: ["album"], //从相册选择
				        success: (res) => {
				          this.tempFilePath = res.tempFilePaths.shift();
				        },
				      });
				    },
				    confirm(e) {
				      this.tempFilePath = "";
				      this.cropFilePath = e.detail.tempFilePath;
				      // * #ifdef * APP-PLUS||MP
				      //除了H5端返回base64数据外，其他端都是返回临时地址，所以你要判断base64还是临时文件名，（用条件编译APP-PLUS||MP执行编译。）
				      //按我这里是先上传裁剪得来的临时文件地址然后得到临时文件名，
				      //待活你要判断是H5还是其他端传给后端类型参数让后端判断执行何种情况代码就OK了
							
						uni.uploadFile({
							url: "http://localhost:3000/personimg",
							filePath: this.cropFilePath,
							name: "file",
							fileType: "image",
							method:'post',
							//传递参数
							formData:{
								_id:this.user._id,
								change:'imgurl',
								content:this.cropFilePath,
							},
					
							success: (uploadFileRes) => {
								var backstr = uploadFileRes.data;
								//自定义操作
								try {
								    uni.setStorageSync('user', JSON.parse(uploadFileRes.data));
								} catch (e) {
								    // error
								}
								this.user=JSON.parse(uploadFileRes.data)
							},
				
						fail(e) {
							console.log("this is errormes " + e.message);
						},
					});
			
						// #endif
					},
					cancel() {
						console.log("canceled");
						this.tempFilePath = "";
					},
				//修改
				surechange(e){
					if(e=='签名'){
						this.change='explain';
					}else if(e=='昵称'){
						this.change='name';
					}else if(e=='性别'){
						this.change='sex';						
					}else if(e=='生日'){
						this.change='birth';
					}else if(e=='电话'){
						this.change='phone';
					}else if(e=='邮箱'){
						this.change='email';
					}else if(e=='密码'){
						this.change='psw';
					}
					uni.request({
						url: 'http://localhost:3000/personchange', 
						data:{
								_id:this.user._id,
							  change:this.change,
								content:this.content,
								// psw:this.pass
						},
						method:'post',
						success: (res) => {
							if(res.statusCode=='200'){
								try {
								    uni.setStorageSync('user', res.data);
								} catch (e) {
								    // error
								}
								this.user=res.data;
								this.animate();
							}else{
								alert('修改错误')
							}
							
							
						},
					}) 
				},
				//退出
				out(){
					uni.navigateTo({
					    url: '../login/login'
					});
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
	.main{
		margin-top: 50rpx;
		.line{
			border-bottom: 1rpx solid #eee;
		}
		.row{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 32rpx;
			height: 124rpx;
			.row_left{
				padding-right: 20rpx;
			}
			.row_img{
				width: 558rpx;
				image{
					width: 104rpx;
					height: 104rpx;
					border-radius: 20rpx;
				}
			}
			.row_middle{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 558rpx;
				// height: 44rpx;
				// line-height: 44rpx;
				color: rgba(39,40,50,0.60);
			}
		}
		.bt{
			margin-top: 160rpx;
			padding: 0 34rpx 20rpx;
			button{
				background-color: #fff;
				color: #FF5D5B ;
			}
			
		}
	}
	.details{
		position: fixed;
		bottom: 0;
		left: 1000px;
		height: 100%;
		width: 100%;
		background-color: #fff;
		box-sizing: border-box;
		z-index: 23;
		.d_header{
			display: flex;
			justify-content: space-between;
			padding: 0 24rpx;
			align-items: center;
			height: 88rpx;
			border-bottom: 1rpx solid #eee;
			width: 100%;
			background-color:#fff;
			box-sizing: border-box;
		}
		.d_main{
			margin-top: 88rpx;
			.passw{
				width: 686rpx;
				background: #F3F4F6;
				margin: 34rpx auto 0;
				input{
					height: 80rpx;
					line-height: 80rpx;
					text-indent: 1rem;
				}
			}
			.textarea{
				width: 686rpx;
				height: 386rpx;
				background: #F3F4F6;
				margin: 34rpx auto 0;			
				textarea{
					padding: 16rpx 32rpx;
				}
		}
		
	}
	}
</style>
