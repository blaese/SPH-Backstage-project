<template>
	<div>
		<div class="header">
			<slot name="title"></slot>
			<svg t="1662473235653" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
				p-id="2365" width="20" height="20">
				<path
					d="M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512S276.48 938.666667 512 938.666667 938.666667 747.52 938.666667 512 747.52 85.333333 512 85.333333z m0 796.444445c-203.662222 0-369.777778-166.115556-369.777778-369.777778S308.337778 142.222222 512 142.222222 881.777778 308.337778 881.777778 512 715.662222 881.777778 512 881.777778z"
					p-id="2366" fill="#8a8a8a"></path>
				<path
					d="M549.546667 641.706667l-29.582223 15.928889c2.275556-12.515556 14.791111-62.577778 35.271112-152.462223 2.275556-9.102222 4.551111-36.408889-15.928889-47.786666-6.826667-3.413333-14.791111-3.413333-22.755556 0-9.102222 3.413333-17.066667 7.964444-23.893333 12.515555-4.551111 3.413333-25.031111 18.204444-60.302222 44.373334-6.826667 5.688889-9.102222 14.791111-4.551112 22.755555s13.653333 10.24 20.48 5.688889l34.133334-20.48-35.271111 150.186667c-3.413333 13.653333 1.137778 22.755556 7.964444 30.72 5.688889 6.826667 14.791111 11.377778 23.893333 11.377777 4.551111 0 7.964444-1.137778 11.377778-2.275555 6.826667-3.413333 31.857778-17.066667 76.231111-43.235556 7.964444-4.551111 11.377778-14.791111 5.688889-22.755555-3.413333-5.688889-13.653333-9.102222-22.755555-4.551111z"
					p-id="2367" fill="#8a8a8a"></path>
				<path
					d="M523.377778 364.088889m-45.511111 0a45.511111 45.511111 0 1 0 91.022222 0 45.511111 45.511111 0 1 0-91.022222 0Z"
					p-id="2368" fill="#8a8a8a"></path>
			</svg>
		</div>
		<div class="count">
			<span class="num">
				<slot name="num"></slot>
			</span>
			<span class="rate">
				<slot name="rate"></slot>
			</span>
			<i class="el-icon-caret-top" style="color:red"></i>
			<i class="el-icon-caret-bottom" style="color:yellowgreen"></i>
		</div>
		<div class="charts" ref="charts"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: 'lineCharts',
	mounted () {
		let mycharts = echarts.init(this.$refs.charts)
		mycharts.setOption({
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
						color: '#5172ca'
					},
					areaStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
								offset: 0, color: '#5172ca' // 0% 处的颜色
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
.header {
	display: flex;
	align-items: center;
}

.header .icon {
	margin-left: 15px;
}

.count {
	margin: 10px 0 5px;
}

.num {
	font-size: 22px;
	margin-right: 15px;
}

.rate {
	font-size: 14px;
}

.charts {
	width: 100%;
	height: 110px;
}
</style>
