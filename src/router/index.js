import Router from 'vue-router'
const serverDir = process.env.SERVER_DIR

const config = [
	{ path: '/helloWorld', name: 'helloWorld' },
	{ path: '/login', name: 'login' },
	{ path: '/goods', name: 'goods' },
	{ path: '/modal', name: 'modal' },
]

const routes = [
	...parseRouter(config),
	{
		path: '*',
		name: '404',
		component: resolve => require(['../pages/not-found/index.vue'], resolve),
	},
]

// 路由解析（包括多层路由）
function parseRouter (items) {
	return items.map((item) => {
		const result = {
			path: item.path,
			name: item.name,
			component: resolve => require([`../pages${item.path}/index.vue`], resolve),
			children: item.children,
		}
		if (result.children) result.children = parseRouter(result.children)
		return result
	})
}

export default new Router({
	mode: 'history',
	base: process.env.NODE_ENV === 'development' ? '' : `${serverDir}/`,
	routes,
})
