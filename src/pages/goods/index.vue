<template>
	<div class="test__content">

	</div>
</template>

<script>
export default {
	name: 'goods'

}
</script>

<style lang="stylus" scoped>
.test__content
	width auto
	height 370px
	border 1px solid red
	// assets文件夹会经过webpack处理，static 文件夹 webpack不会处理
	background url("../../assets/img/card_skin_1.jpg") no-repeat center
	background-size convert
</style>



