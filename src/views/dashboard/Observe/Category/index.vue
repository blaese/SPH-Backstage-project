<template>
	<el-card>
		<div slot="header">
			<div class="header">
				<span>
					销售额类别占比
				</span>
				<div class="radio">
					<el-radio-group v-model="item">
						<el-radio-button label="全部渠道"></el-radio-button>
						<el-radio-button label="线上"></el-radio-button>
						<el-radio-button label="门店"></el-radio-button>
					</el-radio-group>
				</div>
			</div>
		</div>
		<!-- card body -->
		<div class="charts" ref="charts"></div>
	</el-card>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: 'Category',
	data () {
		return {
			item: '全部渠道'
		}
	},
	mounted () {
		let mycharts = echarts.init(this.$refs.charts)
		mycharts.setOption({
			title: {
				text: '视频广告',
				subtext: 300,
				left: 'center',
				top: 'center'
			},
			tooltip: {
				trigger: 'item'
			},
			series: [
				{
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderColor: "#fff",
						borderWidth: 2,
					},
					label: {
						show: true,
						position: 'outside'
					},
					emphasis: {
						label: {
							show: true,
							fontSize: '40',
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: true
					},
					data: [
						{ value: 300, name: '视频广告' },
						{ value: 1048, name: '搜索引擎' },
						{ value: 735, name: '直接访问' },
						{ value: 580, name: '邮件营销' },
						{ value: 484, name: '联盟广告' }
					]
				}
			]
		})

		// 监听绑定事件
		mycharts.on('mouseover', (params) => {
			const { name, value } = params.data
			mycharts.setOption({
				title: {
					text: name,
					subtext: value
				}
			})
		})
	},
}
</script>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.radio {
	height: 20px;
	margin: -20px 0 0;
}

.charts {
	width: 100%;
	height: 320px;
}
</style>
