<template>
	<div class="progresschart" ref="progresschart"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: 'progressChart',
	mounted () {
		let progresschart = echarts.init(this.$refs.progresschart)
		progresschart.setOption({
			xAxis: {
				show: false,
				// x轴最小最大值
				min: 0,
				max: 100
			},
			yAxis: {
				show: false,
				type: 'category'
			},
			series: [
				{
					type: 'bar',
					data: [78],
					color: 'yellowgreen',
					barWidth: 10,
					// 背景颜色设置
					showBackground: true,
					backgroundStyle: {
						color: '#eee'
					},
					// 文本标签
					label: {
						show: true,
						// 改变文本内容，默认是文字
						formatter: '|',
						// 文本标签位置
						position: 'right'
					}
				}
			],
			grid: {
				left: 0,
				top: 0,
				bottom: 0,
				right: 0
			},
		})
	}
}
</script>

<style scoped>
.progresschart {
	width: 100%;
	height: 100%;
}
</style>
