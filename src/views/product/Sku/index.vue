<template>
	<div>
		<el-table :data="records" style="width: 100%;" border>
			<el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
			<el-table-column prop="skuName" label="名称" width="width"></el-table-column>
			<el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
			<el-table-column prop="prop" label="默认图片" width="110">
				<template slot-scope="{row,$index}">
					<img :src="row.skuDefaultImg" alt="" style="width: 80px;height: 80px;">
				</template>
			</el-table-column>
			<el-table-column prop="weight" label="重量" width="80" align="center"></el-table-column>
			<el-table-column prop="price" label="价格" width="80" align="center"></el-table-column>
			<el-table-column prop="prop" label="操作" width="width" align="center">
				<template slot-scope="{row,$index}">
					<el-button type="success" size="mini" icon="el-icon-bottom" v-if="row.isSale == 0" @click="sale(row)">
					</el-button>
					<el-button type="warning" size="mini" icon="el-icon-top" v-else @click="cancel(row)"></el-button>
					<el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(row)"></el-button>
					<el-button type="info" size="mini" icon="el-icon-info" @click="getSkuInfo(row)"></el-button>
					<el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page"
			:page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes, total" :total="total"
			:pager-count="7" style="text-align: center;margin-top: 20px;">
		</el-pagination>

		<!-- 抽屉效果 -->
		<el-drawer :visible.sync="show" :show-close="false" size="50%">
			<el-row>
				<el-col :span="5">名称</el-col>
				<el-col :span="16">{{ skuInfo.skuName }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="5">描述</el-col>
				<el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="5">价格</el-col>
				<el-col :span="16">{{ skuInfo.price }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="5">平台属性</el-col>
				<el-col :span="16">
					<el-tag type="success" v-for="attr in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right: 10px;">
						{{ attr.attrId }}-{{ attr.valueId }}
					</el-tag>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="5">商品图片</el-col>
				<el-col :span="16">
					<el-carousel style="height: 400px;width: 400px;">
						<el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id" style="height: 400px;width: 400px;">
							<img :src="item.imgUrl" alt="">
						</el-carousel-item>
					</el-carousel>
				</el-col>
			</el-row>
		</el-drawer>
	</div>
</template>

<script>
export default {
	name: 'Sku',
	data () {
		return {
			page: 1,
			limit: 10,
			records: [],
			total: 0,
			skuInfo: {},
			show: false
		}
	},
	mounted () {
		this.getSkuList()
	},
	methods: {
		async getSkuList () {
			let result = await this.$API.sku.reqSkuList(this.page, this.limit)
			if (result.code == 200) {
				this.records = result.data.records
				this.total = result.data.total
			}
		},
		sizeChange (limit) {
			this.limit = limit
			this.getSkuList()
		},
		currentChange (page) {
			this.page = page
			this.getSkuList()
		},
		async sale (row) {
			let result = await this.$API.sku.reqSale(row.id)
			if (result.code == 200) {
				row.isSale = 1
				this.$message({ type: 'success', message: '上架成功' })
			}
		},
		async cancel (row) {
			let result = await this.$API.sku.reqCancel(row.id)
			if (result.code == 200) {
				row.isSale = 0
				this.$message({ type: 'success', message: '下架成功' })
			}
		},
		edit (row) {
			this.$message({ type: 'info', message: '正在开发中' })
		},
		async getSkuInfo (row) {
			this.show = true
			let result = await this.$API.sku.reqGetSkuById(row.id)
			if (result.code == 200) {
				this.skuInfo = result.data
			}
		}
	}
}
</script>

<style>
.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 150px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
	background-color: #d3dce6;
}

.el-carousel__item img {
	display: block;
	height: 400px;
	margin: auto;
}
</style>

<style scoped>
.el-col {
	margin: 10px 10px;
}

.el-col-5 {
	font-size: 18px;
	text-align: right;
}

>>>.el-carousel__button {
	width: 10px;
	height: 10px;
	background-color: skyblue;
	border-radius: 50%;
}
</style>
