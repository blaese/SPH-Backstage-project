<template>
	<div>
		<el-row :gutter="10">
			<el-col :span="6">
				<el-card>
					<detail title="总销售额" count="￥126560">
						<template slot="charts">
							<span v-html="'周同比&nbsp;56.67%&nbsp;'"></span>
							<svg t="1662477540150" class="icon" viewBox="0 0 1024 1024" version="1.1"
								xmlns="http://www.w3.org/2000/svg" p-id="4844" width="16" height="16">
								<path d="M511.744 319.999l-383.744 383.744h767.488l-383.744-383.744z" fill="#d81e06" p-id="4845">
								</path>
							</svg>
							<span v-html="'&nbsp;&nbsp;&nbsp;日同比&nbsp;19.96%&nbsp;'"></span>
							<svg t="1662477615856" class="icon" viewBox="0 0 1024 1024" version="1.1"
								xmlns="http://www.w3.org/2000/svg" p-id="5287" width="16" height="16">
								<path
									d="M524.096 753.088l342.912-395.584a16 16 0 0 0-12.032-26.496H169.024a16 16 0 0 0-12.032 26.496l343.04 395.52a16 16 0 0 0 24.064 0z"
									p-id="5288" fill="#1afa29"></path>
							</svg>
						</template>
						<template slot="footer">
							<span>日销售额￥ 12423</span>
						</template>
					</detail>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card>
					<detail title="访问量" count="88460">
						<template slot="charts">
							<line-chart></line-chart>
						</template>
						<template slot="footer">
							<span>日访问量</span>
						</template>
					</detail>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card>
					<detail title="支付笔数" count="88460">
						<template slot="charts">
							<bar-chart></bar-chart>
						</template>
						<template slot="footer">
							<span>转换率 64%</span>
						</template>
					</detail>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card>
					<detail title="运营活动效果" count="78%">
						<template slot="charts">
							<progress-chart></progress-chart>
						</template>
						<template slot="footer">
							<span v-html="'周同比&nbsp;56.67%&nbsp;'"></span>
							<svg t="1662477540150" class="icon" viewBox="0 0 1024 1024" version="1.1"
								xmlns="http://www.w3.org/2000/svg" p-id="4844" width="16" height="16">
								<path d="M511.744 319.999l-383.744 383.744h767.488l-383.744-383.744z" fill="#d81e06" p-id="4845">
								</path>
							</svg>
							<span v-html="'&nbsp;&nbsp;&nbsp;日同比&nbsp;19.96%&nbsp;'"></span>
							<svg t="1662477615856" class="icon" viewBox="0 0 1024 1024" version="1.1"
								xmlns="http://www.w3.org/2000/svg" p-id="5287" width="16" height="16">
								<path
									d="M524.096 753.088l342.912-395.584a16 16 0 0 0-12.032-26.496H169.024a16 16 0 0 0-12.032 26.496l343.04 395.52a16 16 0 0 0 24.064 0z"
									p-id="5288" fill="#1afa29"></path>
							</svg>
						</template>
					</detail>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Detail from './Detail'
import lineChart from './lineChart'
import barChart from './barChart'
import progressChart from './progressChart'

export default {
	name: 'Card',
	components: {
		Detail,
		lineChart,
		barChart,
		progressChart
	}
}
</script>

<style scoped>
</style>
