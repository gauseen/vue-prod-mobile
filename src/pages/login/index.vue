<template>
  <div class="login__content">
		<h3>login page ...</h3>
		<h4>test ...</h4>
		<!-- <img :src="skinImg" alt=""> -->
		<Input v-model="phone" placeholder="phone..." style="width: 350px"></Input>
		<p></p>
		<Input v-model="code" placeholder="code..." style="width: 350px"></Input>
		<p></p>
		<Button @click="fetchCode" type="success"  style="width: 175px">get code</Button>
		<Button @click="submitLogin" type="success"  style="width: 175px">login</Button>
	</div>
</template>

<script>

export default {
	name: 'login',
	data () {
		return {
			skinImg: require('Image/card_skin_2.jpg'),
			phone: '',
			code: '',
		}
	},
	mounted () {
	
	},

	methods: {
		submitLogin () {
			const params = {
				phone: this.phone,
				code: this.code,
				langType: 'cn',
			}
			this.$post('doAddMember.do', params)
			.then((res) => {
				console.log('res: ', res)
			})
		},

		fetchCode () {
			const params = {
				phone: this.phone,
			}
			this.$post(`toFindSmsCode.do`, params)
			.then((res) => {
				console.log('res: ', res)
			})
		},
	}
}

</script>

<style lang="stylus" scoped>
	@import 'src/stylus/test'
	div
		font-size 28px
		color $color-main
		img
			width 100%
			height auto
		h4
			color $test
</style>
