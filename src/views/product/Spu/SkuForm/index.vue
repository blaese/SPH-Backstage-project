<template>
	<div>
		<el-form ref="form" label-width="80px" :inline="false">
			<el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
			<el-form-item label="SKU名称">
				<el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
			</el-form-item>
			<el-form-item label="价格(元)">
				<el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
			</el-form-item>
			<el-form-item label="重量(千克)">
				<el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
			</el-form-item>
			<el-form-item label="规格描述">
				<el-input placeholder="规格描述" type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
			</el-form-item>
			<el-form-item label="平台属性">
				<el-form label-width="80px" :inline="true" size="normal">
					<el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
						<!-- 此处收集到平台属性身上 v-model="attr.attrAndValueId" 因为每个item要收集一个数据 -->
						<el-select placeholder="请选择" v-model="attr.attrAndValueId">
							<el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`"
								v-for="attrValue in attr.attrValueList" :key="attrValue.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</el-form-item>
			<el-form-item label="销售属性">
				<el-form label-width="80px" :inline="true" size="normal">
					<el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
						<el-select placeholder="请选择" v-model="saleAttr.attrAndValueId">
							<el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`"
								v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</el-form-item>
			<el-form-item label="图片列表">
				<!-- @selection-change  当选择项发生变化时会触发该事件 -->
				<el-table :data="spuImageList" style="width: 100%;" border @selection-change="handleSelectionChange">
					<el-table-column type="selection" prop="prop" width="80px"></el-table-column>
					<el-table-column label="图片" prop="prop" width="width">
						<template slot-scope="{row,$index}">
							<img :src="row.imgUrl" style="width: 100px;height: 100px;">
						</template>
					</el-table-column>
					<el-table-column label="名称" prop="imgName" width="width"></el-table-column>
					<el-table-column label="操作" prop="prop" width="width">
						<template slot-scope="{row,$index}">
							<el-button type="primary" v-if="row.isDefault == 0" @click="changeDefault(row)">设为默认</el-button>
							<el-button v-else>默认</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="save">保存</el-button>
				<el-button @click="cancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: 'SkuForm',
	data () {
		return {
			spuImageList: [],
			spuSaleAttrList: [],
			// 平台基础属性
			attrInfoList: [],
			// 收集sku信息
			skuInfo: {
				//第一类收集的数据：父组件给的数据
				category3Id: 0,
				spuId: 0,
				tmId: 0,
				//第二类：需要通过数据双向绑定v-model收集
				skuName: "",
				price: 0,
				weight: "",
				skuDesc: "",
				//第三类：需要自己书写代码
				//默认图片
				skuDefaultImg: "",
				//收集图片的字段
				skuImageList: [
					// {
					//   id: 0,
					//   imgName: "string",
					//   imgUrl: "string",
					//   isDefault: "string",
					//   skuId: 0,
					//   spuImgId: 0,
					// },
				],
				//平台属性
				skuAttrValueList: [
					// {
					//   attrId: 0,
					//   valueId:0,
					// },
				],
				//销售属性
				skuSaleAttrValueList: [
					// {
					//   id: 0,
					//   saleAttrId: 0,
					//   saleAttrName: "string",
					//   saleAttrValueId: 0,
					//   saleAttrValueName: "string",
					//   skuId: 0,
					//   spuId: 0,
					// },
				],
			},
			// 存储父组件传来的spu
			spu: {},
			imgList: []
		}
	},
	methods: {
		async getData (category1Id, category2Id, spu) {
			// 存储父组件的数据
			this.skuInfo.category3Id = spu.category3Id
			this.skuInfo.spuId = spu.id
			this.skuInfo.tmId = spu.tmId
			this.spu = spu
			// 派发请求，获取3个数据
			let result1 = await this.$API.spu.reqSkuImageList(spu.id)
			if (result1.code == 200) {
				let list = result1.data
				list.forEach(item => {
					item.isDefault = 0
				})
				this.spuImageList = list
			}

			let result2 = await this.$API.spu.reqSkuSaleAttrList(spu.id)
			if (result2.code == 200) {
				this.spuSaleAttrList = result2.data
			}

			let result3 = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
			if (result3.code == 200) {
				this.attrInfoList = result3.data
			}
		},
		handleSelectionChange (selection) {
			// 获取选中图片的信息
			this.imgList = selection
		},
		changeDefault (row) {
			this.spuImageList.forEach(item => {
				item.isDefault = 0
			})
			row.isDefault = 1
			this.skuInfo.skuDefaultImg = row.imgUrl
		},
		cancel () {
			this.$emit('changeScene', 0)
			Object.assign(this._data, this.$options.data())
		},
		async save () {
			// 1.整理参数
			const { attrInfoList, skuInfo, spuSaleAttrList, imgList } = this
			// 1.1 整理平台属性
			skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
				if (item.attrAndValueId) {
					const [attrId, valueId] = item.attrAndValueId.split(':')
					prev.push({ attrId, valueId })
				}
				return prev
			}, [])
			// 1.2 整理销售属性
			skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
				if (item.attrAndValueId) {
					const [saleAttrId, saleAttrValueId] = item.attrAndValueId.split(':')
					prev.push({ saleAttrId, saleAttrValueId })
				}
				return prev
			}, [])
			// 1.3 整理图片数据
			skuInfo.skuImageList = imgList.map((item) => {
				return {
					imgName: item.imgName,
					imgUrl: item.imgUrl,
					isDefault: item.isDefault,
					spuImgId: item.id
				}
			})

			// 2.派发请求
			let result = await this.$API.spu.reqSaveSku(skuInfo)
			if (result.code == 200) {
				this.$message({ type: 'success', message: 'SKU保存成功' })
				this.$emit('changeScene', 0)
			}
		}
	},
}
</script>

<style scoped>
</style>