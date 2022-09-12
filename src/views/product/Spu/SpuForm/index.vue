<template>
	<div>
		<el-form ref="form" label-width="80px" :model="spu">
			<el-form-item label="SPU名称">
				<el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
			</el-form-item>
			<el-form-item label="品牌">
				<el-select placeholder="请选择品牌" v-model="spu.tmId">
					<el-option :label="tm.tmName" :value="tm.id" v-for="tm in tradeMarkList" :key="tm.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="SPU描述">
				<el-input placeholder="描述" type="textarea" rows="4" v-model="spu.description"></el-input>
			</el-form-item>
			<el-form-item label="SPU图片">
				<!-- list-type:文件列表的类型 on-preview:图片预览时触发 on-remove:删除图片时触发 file-list:上传的文件列表，为数组形式 -->
				<el-upload action="/admin/product/fileUpload" list-type="picture-card" :on-preview="handlePictureCardPreview"
					:on-remove="handleRemove" :file-list="spuImageList" :on-success="handleSuccess">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>
			<el-form-item label="销售属性">
				<el-select :placeholder="`还有${unSelectSaleAttr.length}个未选择`" v-model="attrIdAndName">
					<!-- :value="`${sale.id}:${sale.name}`" 收集属性id和name -->
					<el-option :label="sale.name" :value="`${sale.id}:${sale.name}`" v-for="sale in unSelectSaleAttr"
						:key="sale.id">
					</el-option>
				</el-select>
				<el-button type="primary" icon="el-icon-plus" style="margin-left: 10px;" :disabled="!attrIdAndName"
					@click="addSaleAttr">添加销售属性
				</el-button>
				<!-- 展示的是当前spu已有的销售属性 -->
				<el-table :data="spu.spuSaleAttrList" style="width: 100%;margin-top: 10px;" border>
					<el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
					<el-table-column prop="saleAttrName" label="属性名" width="150px"></el-table-column>
					<el-table-column prop="prop" label="属性值名称列表" width="width">
						<template slot-scope="{row,$index}">
							<el-tag :key="tag.id" v-for="(tag, index) in row.spuSaleAttrValueList" closable
								:disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index, 1)">
								{{ tag.saleAttrValueName }}
							</el-tag>
							<!-- @keyup.enter.native="handleInputConfirm"   -->
							<el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput"
								size="small" @blur="handleInputConfirm(row)">
							</el-input>
							<el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="prop" label="操作" width="200px" align="center">
						<template slot-scope="{row,$index}">
							<el-button type="danger" size="mini" icon="el-icon-delete" @click="spu.spuSaleAttrList.splice($index, 1)">
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
				<el-button @click="cancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: 'SpuForm',
	data () {
		return {
			dialogImageUrl: '',
			dialogVisible: false,
			// 存储SPU信息
			spu: {
				category3Id: 0,
				description: "",
				spuName: "",
				// 品牌id
				tmId: "",
				spuImageList: [],
				//平台属性与属性值收集
				spuSaleAttrList: [],
			},
			tradeMarkList: [], // 存储品牌信息
			spuImageList: [], // 存储SPU图片
			saleAttrList: [], // 存储销售属性
			attrIdAndName: '', // 未选择的销售属性id和name
		};
	},
	computed: {
		// 计算出还未选择的销售属性
		unSelectSaleAttr () {
			// filter() 方法创建数组，其中填充了所有通过测试的数组元素（作为函数提供）。
			let result = this.saleAttrList.filter(item => {
				// every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）。有一个不满足则返回false，全部满足返回true
				return this.spu.spuSaleAttrList.every(item1 => {
					return item.name != item1.saleAttrName
				})
			})
			return result
		}
	},
	methods: {
		// 照片墙删除的回调
		handleRemove (file, fileList) {
			// file：被删除的图片；fileList：删除后剩余的图片
			// 收集照片墙图片的数据(其中有name url字段)
			this.spuImageList = fileList
		},
		// 照片墙预览的回调
		handlePictureCardPreview (file) {
			// 获取对话框中图片的url，并显示对话框
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleSuccess (response, file, fileList) {
			// response：服务器返回的数据；file：上传的图片；fileList：上传成功后剩余的图片
			this.spuImageList = fileList
		},
		async initSpuData (spu) {
			// 1.获取SPU信息
			let spuResult = await this.$API.spu.reqSpu(spu.id)
			if (spuResult.code == 200) {
				this.spu = spuResult.data
			}
			// 2.获取品牌信息
			let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
			if (tradeMarkResult.code == 200) {
				this.tradeMarkList = tradeMarkResult.data
			}
			// 3.获取SPU图片
			let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
			if (spuImageResult.code == 200) {
				let listArr = spuImageResult.data
				// 照片墙要显示图片需要数组，数组中的对象要有name和url字段
				listArr.forEach(item => {
					item.name = item.imgName
					item.url = item.imgUrl
				});
				this.spuImageList = listArr
			}
			// 4.获取销售属性
			let saleResult = await this.$API.spu.reqSaleAttrList()
			if (saleResult.code == 200) {
				this.saleAttrList = saleResult.data
			}
		},
		addSaleAttr () {
			const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':')
			let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
			this.spu.spuSaleAttrList.push(newSaleAttr)
			// 清空数据
			this.attrIdAndName = ''
		},
		// 添加属性值的回调
		addSaleAttrValue (row) {
			this.$set(row, 'inputVisible', true)
			this.$set(row, 'inputValue', '')
		},
		// input失去焦点
		handleInputConfirm (row) {
			// 属性值不能为空
			if (row.inputValue.trim() == '') {
				this.$message('属性值不能为空')
				return
			}
			// 属性值不能重复
			let isRepeat = row.spuSaleAttrValueList.some(item => item.saleAttrValueName == row.inputValue)
			if (isRepeat) {
				this.$message('属性值不能重复')
				return
			}
			const { baseSaleAttrId, inputValue } = row
			// 新增属性值，根据要提交给服务器的spu.spuSaleAttrList.spuSaleAttrValueList整理参数
			let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
			row.spuSaleAttrValueList.push(newSaleAttrValue)
			row.inputVisible = false
		},
		// 保存
		async addOrUpdateSpu () {
			// 将照片墙参数整理到spu中，注意需要携带imgName和imgUrl字段，而新增照片没有这两个字段
			this.spu.spuImageList = this.spuImageList.map((item) => {
				return {
					imgName: item.name,
					// 新增照片的url是本地地址，要在response中找最终地址
					imgUrl: (item.response && item.response.data) || item.url
				}
			})
			let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
			if (result.code == 200) {
				this.$message({ type: 'success', message: '保存成功' })
				this.$emit('changeScene', 0)
			}
			Object.assign(this._data, this.$options.data())
		},
		// 点击添加spu的回调
		async addSpuData (category3Id) {
			// 从父组件中传递category3Id
			this.spu.category3Id = category3Id
			// 1.获取品牌信息
			let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
			if (tradeMarkResult.code == 200) {
				this.tradeMarkList = tradeMarkResult.data
			}
			// 2.获取销售属性
			let saleResult = await this.$API.spu.reqSaleAttrList()
			if (saleResult.code == 200) {
				this.saleAttrList = saleResult.data
			}
		},
		// 点击取消的回调
		cancel () {
			this.$emit('changeScene', 0)
			// 清理数据:用Object.assign()合并对象
			// this._data可以操作data中响应式数据
			// this.$options可以获取配置对象，配置对象中的data()函数执行，返回的响应式数据为空
			Object.assign(this._data, this.$options.data())
		}
	}
}
</script>

<style scoped>
.el-tag+.el-tag {
	margin-left: 10px;
}

.button-new-tag {
	margin-left: 10px;
	height: 32px;
	line-height: 30px;
	padding-top: 0;
	padding-bottom: 0;
}

.input-new-tag {
	width: 90px;
	margin-left: 10px;
	vertical-align: bottom;
}
</style>
