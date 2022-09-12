<template>
	<div class="linechart" ref="linechart"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: 'lineChart',
	mounted () {
		let lineChart = echarts.init(this.$refs.linechart)
		lineChart.setOption({
			xAxis: {
				show: false,
				type: 'category'
			},
			yAxis: {
				show: false
			},
			series: [
				{
					type: 'line',
					data: [10, 4, 32, 49, 25, 13, 56],
					// 拐点设置
					itemStyle: {
						opacity: 0
					},
					// 线条设置
					lineStyle: {
						color: 'purple'
					},
					areaStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
								offset: 0, color: 'purple' // 0% 处的颜色
							}, {
								offset: 1, color: '#fff' // 100% 处的颜色
							}],
							global: false // 缺省为 false
						}
					},
					smooth: true
				}
			],
			grid: {
				left: 0,
				top: 0,
				bottom: 0,
				right: 0
			},
		})
	},
}
</script>

<style scoped>
.linechart {
	width: 100%;
	height: 100%;
}
</style>
