<template>
  <div class="login__content">
		login page ...
		<img :src="skinImg" alt="">
	</div>
	
</template>

<script>

export default {
	name: 'login',
	data () {
		return {
			skinImg: require('Image/card_skin_2.jpg')
		}
	}
}

</script>

<style lang="stylus" scoped>
	div
		font-size 28px
		color skyblue
		img
			width 100%
			height auto
</style>
