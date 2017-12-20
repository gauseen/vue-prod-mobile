import axios from 'axios'
const api = '/mdm2/api/'
export const get = (url, data, options) => {
	return common('GET', url, data, options)
}

export const post = (url, data, options) => {
	return common('POST', url, data, options)
}

export const common = (type, url, data, options = {}) => {
	const config = {
		method: type,
		url: `${api}${url}`,
		data: data,
		dataType: 'json',
		headers: {
			'content-type': 'application/json;charset=utf-8',
		},
	}
	return axios(config).then((res) => {
		if (res.success) {
			return res.data
		} else {
			return res.errMessage
		}
	})
}
const install = function (Vue) {
	Vue.prototype.$get = get
	Vue.prototype.$post = post
}

export default install
