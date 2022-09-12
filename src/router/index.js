import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 常量路由：任何用户都可以看到的路由——登录、404、首页
export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},

	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	},

	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [{
			path: 'dashboard',
			name: 'Dashboard',
			component: () => import('@/views/dashboard/index'),
			meta: { title: '首页', icon: 'dashboard' }
		}]
	}
]

// 异步路由：不同角色需要过滤筛选出的路由
export const asyncRoutes = [
	{
		name: 'Acl',
		path: '/acl',
		component: Layout,
		redirect: '/acl/user/list',
		meta: {
			title: '权限管理',
			icon: 'el-icon-lock'
		},
		children: [
			{
				name: 'User',
				path: 'user/list',
				component: () => import('@/views/acl/user/list'),
				meta: {
					title: '用户管理',
				},
			},
			{
				name: 'Role',
				path: 'role/list',
				component: () => import('@/views/acl/role/list'),
				meta: {
					title: '角色管理',
				},
			},
			{
				name: 'RoleAuth',
				path: 'role/auth/:id',
				component: () => import('@/views/acl/role/roleAuth'),
				meta: {
					activeMenu: '/acl/role/list',
					title: '角色授权',
				},
				hidden: true,
			},
			{
				name: 'Permission',
				path: 'permission/list',
				component: () => import('@/views/acl/permission/list'),
				meta: {
					title: '菜单管理',
				},
			},
		]
	},

	{
		path: '/product',
		component: Layout,
		name: 'Product',
		meta: { title: '商品管理', icon: 'el-icon-goods' },
		children: [
			{
				path: 'trademark',
				name: 'TradeMark',
				component: () => import('@/views/product/tradeMark'),
				meta: { title: '品牌管理' }
			},
			{
				path: 'attr',
				name: 'Attr',
				component: () => import('@/views/product/Attr'),
				meta: { title: '平台属性管理' }
			},
			{
				path: 'spu',
				name: 'Spu',
				component: () => import('@/views/product/Spu'),
				meta: { title: 'Spu管理' }
			},
			{
				path: 'sku',
				name: 'Sku',
				component: () => import('@/views/product/Sku'),
				meta: { title: 'Sku管理' }
			},
		]
	},
]

// 任意路由：当路径出现错误时重定向404
export const anyRoutes = [{ path: '*', redirect: '/404', hidden: true }]


const createRouter = () => new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

// 在添加路由前删除路由信息，避免路由重复
router.$addRoutes = function (params) {
	router.matcher = new Router({ mode: 'history' }).matcher;
	router.addRoutes(params)
}

export default router
