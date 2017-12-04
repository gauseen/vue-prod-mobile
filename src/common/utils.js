import wx from 'weixin-js-sdk'
import { Toast } from 'mint-ui'
import { get } from 'src/common/fetch'

// 开发环境
export const __DEV__ = process.env.NODE_ENV === 'development'

// 获取html的字体大小
export function getFontSize () {
	const htmlDOM = document.querySelector('html')
	const htmlFontSize = window.getComputedStyle(htmlDOM).fontSize

	return +htmlFontSize.replace(/(\d+)\w+/g, '$1') || 1
}

// 设置页面title
export function setTitle (title) {
	document.title = title
	var iframe = document.createElement('iframe')
	iframe.style.display = 'none'
	iframe.onload = () => setTimeout(() => iframe.remove(), 9)
	document.body.appendChild(iframe)
}

// 页面跳转
export function redirect (url, params = {}) {
	let fakeUrl = url
	// 是否是静态页面
	const isStaticPage = fakeUrl.indexOf('html') !== -1
	// 是否是支付页面
	const isPayPage = fakeUrl.indexOf('/pay/') !== -1
	// 考虑中英文页面问题
	if (i18n.locale === 'en') fakeUrl = fakeUrl.replace('/ch/', '/en/')
	// 本地静态HTML加third、线上加上项目目录
	let link = ''
	if (__DEV__ && isStaticPage) link = '/third' + fakeUrl
	else if (!__DEV__) link = process.env.SERVER_DIR + fakeUrl

	// 拼接参数
	if (getType(params) === 'object') link += `?${obj2Params(params)}`

	if (isStaticPage || isPayPage) window.location.href = link
	else window.vm.$router.push({path: url, query: params})
}

// 显示弹窗禁止背景滚动 注意使用时不要影响其他滚动元素
export function forbidScroll (selectors = ['body']) {
	selectors.forEach(item => {
		const domObj = Array.from(document.querySelectorAll(item))
		domObj.forEach(o => o.addEventListener('touchmove', e => e.preventDefault(), false))
	})
}
// 所有翻译
export const dictionary = getDictionary(window.localStorage.getItem('crm_i18n'))
// 获取语言翻译
export function getDictionary (lang) {
	if (lang === 'cn') {
		return require('../i18n/cn.json')
	} else {
		return require('../i18n/en.json')
	}
}
export function setLanguage (lang) {
	i18n.setLocaleMessage(lang, getDictionary(lang))
	i18n.locale = lang
	window.localStorage.setItem('crm_i18n', lang)

	const routeName = window.vm.$route.name
	const titleMap = {
		chargeIndex: i18n.tc('pageTitle.vipChargeTitle'),
		chargeDetails: i18n.tc('pageTitle.orderDetailTitle'),
		couponDetail: i18n.tc('pageTitle.couponDetailTitle'),
		couponGive: i18n.tc('pageTitle.couponGiveTitle'),
		information: i18n.tc('pageTitle.informationTitle'),
		login: i18n.tc('pageTitle.loginTitle'),
		paySettlement: i18n.tc('pageTitle.wxPayTitle'),
		wechat: i18n.tc('pageTitle.useWechatTitle'),
		vipCard: i18n.tc('pageTitle.myVipCardTitle'),
		vipCoupon: i18n.tc('pageTitle.myCouponTitle'),
	}
	setTitle(titleMap[routeName])
}

// 判断所有数据类型是否为空
export function isEmpty (value) {
	const type = getType(value)

	switch (type) {
		case 'object':
			return Object.keys(value).length === 0
		case 'array':
			return value.length === 0
		case 'number':
			return !isNaN(value)
		default:
			return !!value
	}
}

// 解析链接中的数据
export function parseUrl (url) {
	url = url || window.location.href

	const splitUrl = url.split('?')
	const [link, params] = splitUrl

	if (params) {
		const result = {url: link}
		const _params = params.split('&')
		_params.forEach(item => {
			const [name, key] = item.split('=')
			result[name] = decodeURIComponent(key)
		})
		return result
	} else return {}
}

// 对象转form数据
// 举个栗子 {name: 'woolson', msg: 'hello'} => name=woolson&msg=hello
export function obj2Params (data) {
	var dataType = getType(data)

	if (dataType !== 'object') {
		console.error('function obj2Params receive a nonsupport type parameter.')
		return
	}

	return resolveObj(data).join('&')
}

export function resolveObj (obj, parents) {
	var result = []
	var parentsStr = ''

	if (parents) parentsStr = parents.join('.') + '.'
	else parents = []

	Object.keys(obj).forEach(function (key) {
		switch (getType(obj[key])) {
			case 'object':
				var insetObj = resolveObj(obj[key], parents.concat([key]))
				result = result.concat(insetObj)
				break
			case 'array':
				result.push(parentsStr + key + '=' + obj[key].join())
				break
			default:
				result.push(parentsStr + key + '=' + obj[key])
				break
		}
	})
	return result
}

// 获取数据具体类型
// 举个栗子: 'string', 'object', 'number', 'null', 'undefined'
export function getType (value) {
	var typer = Object.prototype.toString
	var typeStr = typer.call(value)

	typeStr = typeStr.replace(/.*\s(\w+)\]/g, '$1')
	return typeStr.toLowerCase()
}

// 新建storage对象
export function getStorage (name) {
	return {
		get () {
			var value = window.localStorage.getItem(name)

			if (value) {
				try {
					return JSON.parse(value)
				} catch (e) {
					return value
				}
			} else return null
		},
		set (value) {
			if (value && getType(value) === 'object') {
				value = JSON.stringify(value)
			}
			window.localStorage.setItem(name, value)
		},
		clear () {
			window.localStorage.clear(name)
		},
	}
}

// 微信配置接口
const ALL_API_LIST = [
	'checkJsApi',
	'chooseImage',
	'previewImage',
	'uploadImage',
	'downloadImage',
	'getNetworkType',
	'openLocation',
	'getLocation',
	'hideOptionMenu',
	'showOptionMenu',
	'closeWindow',
	'hideMenuItems',
	'showMenuItems',
	'hideAllNonBaseMenuItem',
	'showAllNonBaseMenuItem',
	'scanQRCode',
	'onMenuShareAppMessage',
]

export function queryWxApi (jsApiList = ALL_API_LIST) {
	return new Promise((resolve, reject) => {
		get('/mdm2/api/getSignature.do', {
			url: encodeURIComponent(window.location.href),
		})
			.then(data => {
				wx.config({
					debug: false,
					appId: data.appId,
					timestamp: Number(data.timestamp),
					nonceStr: data.nonceStr,
					signature: data.signature,
					jsApiList,
				})

				wx.error(function (res) {
					Toast('调用微信jsapi返回的状态:' + res.errMsg)
					reject() // eslint-disable-line
				})

				wx.ready(resolve)
			})
	})
}
