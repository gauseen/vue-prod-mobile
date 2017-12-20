<template>
	<div class="modal__content">
		<div class="modal__content__btn" @click="submit">show modal</div>

		<div class="modal__content__dialog" :class="{modal__active: showDialog}">dialog ... </div>
	</div>
</template>

<script>
export default {
	name: 'modal',
	data () {
		return {
			showDialog: false,
		}
	},

	mounted () {

	},

	methods: {
		submit () {
			this.showDialog = !this.showDialog
		},
	},

}
</script>

<style lang="stylus" scoped>
.modal__content
	height 100vh
	width 100vw
	border 1px solid green
.modal__content__btn
	cursor pointer
	border 1px solid red
	width 200px
	font-size 20px
	line-height 1.6em
	transform translate3d(100%, 0, 0)
.modal__content__dialog
	position fixed
	bottom 0
	width 100%
	height 200px
	background #999
	transform translate3d(0, 100%, 0)
	transition transform .3s ease
.modal__active
		transform translate3d(0, 0, 0)
</style>



