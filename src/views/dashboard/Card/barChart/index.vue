<template>
	<div class="barchart" ref="barchart"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: 'barChart',
	mounted () {
		let barchart = echarts.init(this.$refs.barchart)
		barchart.setOption({
			xAxis: {
				show: false,
				type: 'category'
			},
			yAxis: {
				show: false
			},
			series: [
				{
					type: 'bar',
					data: [10, 4, 32, 49, 25, 13, 56, 24, 12],
					color: '#5072ca'
				}
			],
			grid: {
				left: 0,
				top: 0,
				bottom: 0,
				right: 0
			},
			tooltip: {}
		})
	}
}
</script>

<style scoped>
.barchart {
	width: 100%;
	height: 100%;
}
</style>
