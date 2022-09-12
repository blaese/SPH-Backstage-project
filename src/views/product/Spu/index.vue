<template>
	<div>
		<el-card style="margin: 20px 0;">
			<category-list @getCategoryId="getCategoryId" :show="scene != 0"></category-list>
		</el-card>

		<el-card>
			<!-- 三种结构进行切换 -->
			<!-- 结构1：展示spu列表 -->
			<div v-show="scene == 0">
				<el-button type="primary" icon="el-icon-plus" style="margin-bottom: 10px;" :disabled="!category3Id"
					@click="addSpu">添加SPU
				</el-button>
				<el-table :data="records" style="width:100%" border>
					<el-table-column type="index" label="序号" width="80px" align="center">
					</el-table-column>
					<el-table-column prop="spuName" label="spu名称" width="width">
					</el-table-column>
					<el-table-column prop="description" label="spu描述" width="width">
					</el-table-column>
					<el-table-column prop="prop" label="操作" width="width" align="center">
						<template slot-scope="{row,$index}">
							<el-button type="success" size="mini" icon="el-icon-plus" title="添加sku" @click="addSku(row)"></el-button>
							<el-button type="warning" size="mini" icon="el-icon-edit" title="修改spu" @click="updateSpu(row)">
							</el-button>
							<el-button type="info" size="mini" icon="el-icon-info" title="查看当前spu全部sku列表" @click="handleDialog(row)">
							</el-button>
							<el-button type="danger" size="mini" icon="el-icon-delete" title="删除spu" @click="deleteSpu(row)">
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination style="margin-top: 20px;text-align: center;" :current-page="page" :page-sizes="[3, 5, 10]"
					:page-size="limit" layout="prev, pager, next, jumper,->,sizes, total" :total="total" :pager-count="7"
					@size-change="sizeChange" @current-change="currentChange">
				</el-pagination>

			</div>
			<!-- 结构2：添加SPU|修改SPU -->
			<spu-form v-show="scene == 1" @changeScene="changeScene" ref="spu"></spu-form>
			<!-- 结构3：编辑spu对应的sku -->
			<sku-form v-show="scene == 2" @changeScene="changeScene" ref="sku"></sku-form>
		</el-card>
		<!-- sku列表的对话框 -->
		<el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" v-loading="loading"
			:before-close="beforeClose">
			<el-table :data="skuList" style="width: 100%;" border>
				<el-table-column prop="skuName" label="名称" width="width"></el-table-column>
				<el-table-column prop="price" label="价格" width="width"></el-table-column>
				<el-table-column prop="weight" label="重量" width="width"></el-table-column>
				<el-table-column prop="prop" label="默认图片" width="width">
					<template slot-scope="{row,$index}">
						<img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'

export default {
	name: 'Spu',
	data () {
		return {
			category1Id: '',
			category2Id: '',
			category3Id: '',
			page: 1,
			limit: 3,
			total: 0,
			records: [],
			scene: 0,
			dialogTableVisible: false,
			spu: {},
			skuList: [],
			loading: true
		}
	},
	components: {
		SpuForm,
		SkuForm
	},
	methods: {
		getCategoryId ({ category1Id, category2Id, category3Id }) {
			this.category1Id = category1Id
			this.category2Id = category2Id
			this.category3Id = category3Id
			this.getPageList()
		},
		async getPageList () {
			const { page, limit, category3Id } = this
			let result = await this.$API.spu.reqSpuList(page, limit, category3Id)
			if (result.code == 200) {
				this.total = result.data.total
				this.records = result.data.records
			}
		},
		currentChange (page) {
			this.page = page
			this.getPageList()
		},
		sizeChange (limit) {
			this.limit = limit
			this.getPageList()
		},
		addSpu () {
			this.scene = 1
			this.$refs.spu.addSpuData(this.category3Id)
		},
		updateSpu (row) {
			this.scene = 1
			// 使用$refs获取子组件并调用子组件发请求的函数
			this.$refs.spu.initSpuData(row)
		},
		changeScene (scene) {
			this.scene = scene
			if (scene == 1) {
				this.getPageList()
			}
		},
		async deleteSpu (row) {
			let result = await this.$API.spu.reqDeleteSpu(row.id)
			if (result.code == 200) {
				this.$message({ type: 'success', message: '删除成功' })
				this.getPageList()
			}
		},
		addSku (row) {
			this.scene = 2
			this.$refs.sku.getData(this.category1Id, this.category2Id, row)
		},
		async handleDialog (row) {
			this.spu = row
			this.dialogTableVisible = true
			let result = await this.$API.spu.reqSkuList(row.id)
			if (result.code == 200) {
				this.skuList = result.data
				this.loading = false
			}
		},
		beforeClose (done) {
			this.loading = true
			this.skuList = []
			done()
		}
	},
}
</script>

<style scoped>
</style>
