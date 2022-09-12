import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, constantRoutes, anyRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
	return {
		// 获取token
		token: getToken(),
		// 存储用户名
		name: '',
		// 存储用户头像
		avatar: '',
		roles: [],
		routes: [],
		buttons: [],
		// 进行对比后项目中已有的路由
		visibleAsyncRoutes: [],
		// 合并所有可展示的路由
		allRoutes: []
	}
}

// 计算可显示的路由
const visibleAsyncRoutes = (asyncRoutes, routes) => {
	return asyncRoutes.filter(item => {
		if (routes.indexOf(item.name) != -1) {
			// 递归，看子路由的name是否存在于数组routes中
			if (item.children && item.children.length) {
				item.children = visibleAsyncRoutes(item.children, routes)
			}
			return true
		}
	})
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USERINFO: (state, userInfo) => {
		state.name = userInfo.name
		state.avatar = userInfo.avatar
		// 角色
		state.roles = userInfo.roles
		// 菜单权限
		state.routes = userInfo.routes
		// 按钮权限
		state.buttons = userInfo.buttons
	},
	SET_VISIBLEROUTES: (state, asyncRoutes) => {
		state.visibleAsyncRoutes = asyncRoutes
		// 合并路由
		state.allRoutes = constantRoutes.concat(state.visibleAsyncRoutes, anyRoutes)
		// 给原有路由添加路由
		router.addRoutes(state.allRoutes)
	}
}

const actions = {
	// 处理用户登录
	async login ({ commit }, userInfo) {
		const { username, password } = userInfo
		let result = await login({ username: username.trim(), password: password })
		// 当前使用的mock数据code是20000
		if (result.code == 20000) {
			// 登录成功vuex存储token
			commit('SET_TOKEN', result.data.token)
			// 本地持久化存储token
			setToken(result.data.token)
			return 'ok'
		} else {
			return Promise.reject(new Error('login fail'))
		}
	},

	// 获取用户信息
	getInfo ({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo(state.token).then(response => {
				// 解构返回的信息
				const { data } = response
				// 返回信息包括name、avatar、roles(用户的角色)、routes(用户可跳转的路由)、buttons(按钮权限)
				if (!data) {
					return reject('Verification failed, please Login again.')
				}
				commit('SET_USERINFO', data)
				// 存储可显示的异步路由
				commit('SET_VISIBLEROUTES', visibleAsyncRoutes(asyncRoutes, data.routes))
				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},

	// user logout
	logout ({ commit, state }) {
		return new Promise((resolve, reject) => {
			logout(state.token).then(() => {
				removeToken() // must remove  token  first
				resetRouter()
				commit('RESET_STATE')
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	// remove token
	resetToken ({ commit }) {
		return new Promise(resolve => {
			removeToken() // must remove  token  first
			commit('RESET_STATE')
			resolve()
		})
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}

