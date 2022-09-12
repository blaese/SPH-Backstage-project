// 引入二次封装的axios
import request from '@/utils/request'

// 暴露登录接口函数
export function login (data) {
	return request({
		url: '/acl/index/login',
		method: 'post',
		data
	})
}

// 暴露获取用户信息函数
export function getInfo (token) {
	return request({
		url: '/acl/index/info',
		method: 'get',
		params: { token }
	})
}

// 暴露退出登录函数
export function logout () {
	return request({
		url: '/acl/index/logout',
		method: 'post'
	})
}
