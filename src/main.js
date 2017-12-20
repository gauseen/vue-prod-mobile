// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import router from './router'
import iView from 'iview'
import Fetch from 'src/common/fetch'

// 全局 css
import 'iview/dist/styles/iview.css'

Vue.use(Router)
Vue.use(iView)
Vue.use(Fetch)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App },
})
