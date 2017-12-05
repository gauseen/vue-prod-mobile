<template>
	<div class="test__content">
		<div class="child__one"></div>
		<div class="child__two"></div>
	</div>
</template>

<script>
export default {
	name: 'goods'

}
</script>

<style lang="stylus" scoped>
.test__content
	> div
		width auto
		height 370px
		border 1px solid red
		background-size convert
	.child__one
		// assets文件夹会经过webpack处理，static 文件夹 webpack不会处理
		background url("../../assets/img/card_skin_1.jpg") no-repeat center
	.child__two
		background url("../../assets/images/card_skin.jpg") no-repeat center
</style>



