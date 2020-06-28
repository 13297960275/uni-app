<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title uni-common-mt">默认样式</view>
			<view>
				<checkbox-group>
					<label>
						<checkbox value="cb" checked="true" />选中
					</label>
					<label>
						<checkbox value="cb" />未选中
					</label>
				</checkbox-group>
			</view>
			<view class="uni-title uni-common-mt">不同颜色和尺寸的checkbox</view>
			<view>
				<checkbox-group>
					<label>
						<checkbox value="cb" checked="true" color="#FFCC33" style="transform:scale(0.7)" />选中
					</label>
					<label>
						<checkbox value="cb" color="#FFCC33" style="transform:scale(0.7)" />未选中
					</label>
					<text>{{'验证码登录'}}</text>
				</checkbox-group>
			</view>
		</view>

		<view class="uni-form-item-login uni-column">
			<view style="padding: 20px; background-color: #fff;">
			<view class="login-title"><text class="pwd-switch">用户登录</text></view>
			<view class="uni-input-box" v-if="pwdForm">
				<uni-icons class="uni-icon" :type="'person-filled'" :color="'#ccc'" size="24" />
				<input class="uni-input" placeholder="请输入用户名" v-model="username" />
			</view>
			<view class="uni-input-box" v-if="pwdForm">
				<uni-icons class="uni-icon" :type="'locked-filled'" :color="'#ccc'" size="24" />
				<input class="uni-input" placeholder="请输入密码" v-model="pwd" :password="showPassword" />
				<uni-icons class="uni-icon" :type="'eye-filled'" :color="!showPassword ? '#21caad' : '#ccc'" @click="changePassword"
				 size="24" />
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
				<button type="primary" hover-class="bover-btn-primary" style="width: 100%;" @click="login">登录</button>
			</view>
			</view>
		</view>


		<view class="uni-padding-wrap">
			<view class="uni-title uni-common-mt">
				推荐展示样式
				<text>\n使用 uni-list 布局</text>
			</view>
		</view>
		<view class="uni-list">
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
					<view>
						<checkbox :value="item.value" :checked="item.checked" />
					</view>
					<view>{{item.name}}</view>
				</label>
			</checkbox-group>
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


				title: 'checkbox 复选框',
				items: [{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					}
				]
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
			checkboxChange: function(e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.indexOf(item.value) >= 0) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			}
		}
	}
</script>

<style>
	.uni-list-cell {
		justify-content: flex-start
	}

	.pwd-switch {
		color: #21caad;
		text-align: right;
		width: 100%;
	}
	
	.login-title {
		font-size: 25px;
    background-color: #fff;
    text-align: center;
    padding: 14px;
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
