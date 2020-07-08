<template>
	<view class="login-page">
		<view class="login-head"></view>
		<!-- <page-head> -->
			<!-- <cover-image class="login-head-img" src="../../static/imgs/LOGO.png"></cover-image> -->
		<!-- </page-head> -->
		<view class="uni-form-item-login uni-column">
			<view class="login-form">
				<view class="login-title"><text>用户登录</text></view>
				<view class="uni-input-box" v-if="pwdForm">
					<uni-icons class="uni-icon" :type="'person-filled'" :color="'#ccc'" size="24" />
					<input class="uni-input" placeholder="请输入用户名" v-model="username" />
				</view>
				<view class="uni-input-box" v-if="pwdForm">
					<uni-icons class="uni-icon" :type="'locked-filled'" :color="'#ccc'" size="24" />
					<input class="uni-input" placeholder="请输入密码" v-model="pwd" :password="showPassword" />
					<uni-icons class="uni-icon" :type="'eye-filled'" :color="!showPassword ? '#21caad' : '#ccc'" @click="changePassword" size="24" />
				</view>
				<view class="uni-input-box" v-if="!pwdForm">
					<uni-icons class="uni-icon" :type="'person-filled'" :color="'#ccc'" size="24" />
					<input class="uni-input" placeholder="请输入手机号" type="number" v-model="phone" />
				</view>
				<view class="uni-input-box" v-if="!pwdForm">
					<uni-icons class="uni-icon" :type="'locked-filled'" :color="'#ccc'" size="24" />
					<input class="uni-input" placeholder="请输入验证码" v-model="code" type="number" />
					<button type="primary" plain="true" size="mini" @click="sendCode">发送验证码</button>
				</view>
				<view class="uni-input-box" style="justify-content: space-between;">
					<checkbox-group @change="pwdChange" v-if="pwdForm">
						<label>
							<checkbox value="jzPwd" color="#21caad" :checked="jzPwd" style="transform:scale(0.8)" />记住密码
						</label>
					</checkbox-group>
					<text class="pwd-switch" @click="pwdForm = !pwdForm">{{pwdForm ? '验证码登录' : '密码登录'}}</text>
				</view>
				<view class="uni-input-box" style="justify-content: space-between;">
					<button type="primary" style="width: 100%;" @click="login">登录</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				showPassword: true,
				username: '',
				pwd: '',
				jzPwd: true,
				pwdForm: true,
				phone: '',
				code: '',
			}
		},
		methods: {
			sendCode() {
				console.log('sendCode')
			},
			inputChange(el, key) {
				console.log(el, key)
			},
			login() {
				console.log(
					this.username,
					this.pwd,
					this.jzPwd,
					this.pwdForm,
					this.phone,
					this.code,
				)
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			pwdChange(e) {
				// console.log(e)
				this.jzPwd = !!e.detail.value.join('')
			},
		}
	}
</script>

<style scoped>
	.uni-title-item {
		justify-content: flex-start
	}

	.login-head {
		height: 46px;
		line-height: 46px;
		width: calc(100% - 80px);
		margin: 40px;
		overflow: hidden;
		margin-top: 60px;

		background: url(../../static/imgs/LOGO.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.login-page {
		min-height: 100%;
		width: 100%;
		overflow: hidden;

		background: url(../../static/imgs/login-bg.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.login-form {
		padding: 20px;
		background-color: #fff;
		border-radius: 5px;
	}

	.pwd-switch {
		color: #21caad;
		text-align: right;
		width: 100%;
	}

	.login-title {
		font-size: 25px;
		color: #21caad;
		background-color: #fff;
		text-align: center;
		padding: 8px 14px 16px 14px;
	}

	.uni-form-item-login {
		padding: 30px;
	}

	.uni-form-item__title {
		font-size: 16px;
		line-height: 24px;
	}

	.uni-input-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding: 8px 13px;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #FFFFFF;
	}

	.uni-input {
		height: 28px;
		line-height: 28px;
		font-size: 15px;
		padding: 0px;
		flex: 1;
		background-color: #FFFFFF;
	}
</style>
