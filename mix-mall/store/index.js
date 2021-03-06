import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		msg: '',
		cartList: []
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: provider
			})
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		},
		clg(state, msg) {
			state.msg = msg;
			console.log(state.msg)
		},
		handleCartList(state, cartList) {
			state.cartList = state.hasLogin ? cartList : [];
		}
	},
	actions: {

	}
})

export default store