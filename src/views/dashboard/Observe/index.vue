<template>
	<el-row :gutter="10">
		<el-col :span="12">
			<search></search>
		</el-col>
		<el-col :span="12">
			<category></category>
		</el-col>
	</el-row>
</template>

<script>
import Search from './Search'
import Category from './Category'

export default {
	name: 'Observe',
	components: {
		Search,
		Category
	}
}
</script>

<style scoped>
</style>
