<template>
	<el-card>
		<div slot="header">
			<div class="header">
				<span>线上热门搜索</span>
				<el-dropdown>
					<span class="el-dropdown-link">
						<i class="el-icon-more"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>黄金糕</el-dropdown-item>
						<el-dropdown-item>狮子头</el-dropdown-item>
						<el-dropdown-item>螺蛳粉</el-dropdown-item>
						<el-dropdown-item>双皮奶</el-dropdown-item>
						<el-dropdown-item>蚵仔煎</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<!-- card body -->
		<div>
			<el-row :gutter="10">
				<el-col :span="12">
					<line-charts>
						<template slot="title">
							<span>搜索用户数</span>
						</template>
						<template slot="num">12321</template>
						<template slot="rate">17.1</template>
					</line-charts>
				</el-col>
				<el-col :span="12">
					<line-charts>
						<template slot="title">
							<span>人均搜索次数</span>
						</template>
						<template slot="num">2.7</template>
						<template slot="rate">26.2</template>
					</line-charts>
				</el-col>
			</el-row>
			<el-table border style="margin: 10px 0;">
				<el-table-column type="index" label="排名" width="80">
				</el-table-column>
				<el-table-column prop="col.id" label="搜索关键字" width="width">
				</el-table-column>
				<el-table-column prop="col.id" label="用户数" width="width">
				</el-table-column>
				<el-table-column prop="col.id" label="周涨幅" width="width">
				</el-table-column>
			</el-table>
			<el-pagination layout="prev, pager, next" :total="1000" class="pagination"> </el-pagination>
		</div>
	</el-card>
</template>

<script>
import lineCharts from './lineCharts'

export default {
	name: 'Search',
	components: {
		lineCharts
	}
}
</script>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.el-dropdown-link {
	cursor: pointer;
}

.pagination {
	float: right;
	margin-bottom: 10px;
}
</style>
