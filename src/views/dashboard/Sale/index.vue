<template>
	<el-card class="box-card" style="margin: 10px 0;">
		<div slot="header" class="clearfix">
			<!--  @tab-click="handleClick" -->
			<el-tabs class="tab" v-model="activeName">
				<el-tab-pane label="销售额" name="sale"></el-tab-pane>
				<el-tab-pane label="访问量" name="visit"></el-tab-pane>
			</el-tabs>
			<div class="date">
				<span @click="setDay">今日</span>
				<span @click="setWeek">本周</span>
				<span @click="setMonth">本月</span>
				<span @click="setYear">本年</span>
				<el-date-picker class="datepicker" v-model="date" type="daterange" range-separator="-" start-placeholder="开始日期"
					end-placeholder="结束日期" value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
		</div>
		<div>
			<el-row :gutter="10">
				<el-col :span="16">
					<div class="barcharts" ref="barcharts"></div>
				</el-col>
				<el-col :span="8" class="rank">
					<h3>门店{{ title }}排名</h3>
					<ul>
						<li>
							<span class="index">1</span>
							<span>肯德基</span>
							<span class="value">123456</span>
						</li>
						<li>
							<span class="index">2</span>
							<span>肯德基</span>
							<span class="value">123456</span>
						</li>
						<li>
							<span class="index">3</span>
							<span>肯德基</span>
							<span class="value">123456</span>
						</li>
						<li>
							<span class="index nindex">4</span>
							<span>肯德基</span>
							<span class="value">123456</span>
						</li>
						<li>
							<span class="index nindex">5</span>
							<span>肯德基</span>
							<span class="value">123456</span>
						</li>
						<li>
							<span class="index nindex">6</span>
							<span>肯德基</span>
							<span class="value">123456</span>
						</li>
						<li>
							<span class="index nindex">7</span>
							<span>肯德基</span>
							<span class="value">123456</span>
						</li>
					</ul>
				</el-col>
			</el-row>
		</div>
	</el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
	name: 'Sale',
	data () {
		return {
			activeName: 'sale',
			mycharts: null,
			// 绑定日历数据
			date: []
		}
	},
	computed: {
		title () {
			return this.activeName == 'sale' ? '销售额' : '访问量'
		},
		...mapState({
			list (state) {
				return state.home.list
			}
		})
	},
	mounted () {
		this.mycharts = echarts.init(this.$refs.barcharts)
		this.mycharts.setOption({
			title: {
				text: this.title + '趋势'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: [],
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: 'Direct',
					type: 'bar',
					barWidth: '60%',
					data: []
				}
			]
		})
	},
	watch: {
		// 监听标题的变化
		title () {
			this.mycharts.setOption({
				title: {
					text: this.title + '趋势'
				},
				xAxis: [{
					data: this.title == '销售额' ? this.list.orderFullYearAxis : this.list.userFullYearAxis
				}],
				series: [
					{
						data: this.title == '销售额' ? this.list.orderFullYear : this.list.userFullYear
					}
				]
			})
		},
		// 首次加载监听请求数据的变化
		list () {
			this.mycharts.setOption({
				xAxis: [{
					data: this.list.orderFullYearAxis
				}],
				series: [
					{
						data: this.list.orderFullYear
					}
				]
			})
		}
	},
	methods: {
		setDay () {
			const day = dayjs().format('YYYY-MM-DD')
			this.date = [day, day]
		},
		setWeek () {
			const start = dayjs().day(1).format('YYYY-MM-DD')
			const end = dayjs().day(7).format('YYYY-MM-DD')
			this.date = [start, end]
		},
		setMonth () {
			const start = dayjs().startOf('month').format('YYYY-MM-DD')
			const end = dayjs().endOf('month').format('YYYY-MM-DD')
			this.date = [start, end]
		},
		setYear () {
			const start = dayjs().startOf('year').format('YYYY-MM-DD')
			const end = dayjs().endOf('year').format('YYYY-MM-DD')
			this.date = [start, end]
		}
	}
}
</script>

<style scoped>
.clearfix {
	display: flex;
	justify-content: space-between;
	position: relative;
}

.tab {
	width: 100%;
}

>>>.el-tabs__item {
	font-size: 18px;
}

>>>.el-card__header {
	border-bottom: none;
}


.date {
	position: absolute;
	right: 0;
}

.date span {
	font-size: 14px;
	margin: 0 10px;
	cursor: pointer;
}

.datepicker {
	width: 250px;
	height: 36px;
	margin: 0px 20px;
}

.barcharts {
	width: 100%;
	height: 300px;
}

.rank h3 {
	margin: 0;
}

.rank ul {
	list-style: none;
	width: 100%;
	height: 300px;
	margin: 16px -22px;
}

.rank ul li {
	height: 13%;
	display: flex;
	justify-content: space-between;
}

.index {
	background-color: black;
	color: #fff;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	text-align: center;
	vertical-align: middle;
}

.nindex {
	background-color: #fff;
	color: black;
}
</style>
