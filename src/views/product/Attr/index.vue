<template>
	<div>
		<el-card style="margin: 20px 0;">
			<category-list @getCategoryId="getCategoryId" :show="!isShowTable"></category-list>
		</el-card>

		<el-card>
			<div v-show="isShowTable">
				<el-button type="primary" icon="el-icon-plus" style="margin-bottom: 10px;" :disabled="!category3Id"
					@click="addAttr">添加属性
				</el-button>
				<el-table :data="attrList" style="width:100%" border>
					<el-table-column type="index" label="序号" width="80px" align="center">
					</el-table-column>
					<el-table-column prop="attrName" label="属性名称" width="150px" align="center">
					</el-table-column>
					<el-table-column prop="prop" label="属性值列表" width="width">
						<template slot-scope="{row,$index}">
							<el-tag type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id" style="margin:0 10px;">
								{{ attrValue.valueName }}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="prop" label="操作" width="200px" align="center">
						<template slot-scope="{row,$index}">
							<el-button type="warning" size="mini" icon="el-icon-edit" @click="updateAttr(row)">修改</el-button>
							<el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<!-- 添加/修改属性 -->
			<div v-show="!isShowTable">
				<el-form ref="form" label-width="80px" :inline="true" :model="attrInfo">
					<el-form-item label="属性名">
						<el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
					</el-form-item>
				</el-form>
				<el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值
				</el-button>
				<el-button>取消</el-button>
				<el-table :data="attrInfo.attrValueList" style="width: 100%;margin: 20px 0;" border>
					<el-table-column align="center" type="index" label="序号" width="80px">
					</el-table-column>
					<el-table-column prop="prop" label="属性值名称" width="width">
						<template slot-scope="{row, $index}">
							<!-- input和span切换，利用每个row的flag -->
							<el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" @blur="toLook(row)"
								@keyup.native.enter="toLook(row)" :ref="$index"></el-input>
							<!-- 使用ref用来区分是那个输入框 -->
							<span v-else @click="toEdit(row, $index)" style="display:block">{{ row.valueName }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="prop" label="操作" width="width" align="center">
						<template slot-scope="{row, $index}">
							<!-- 最新版本气泡确认框的确定按钮的事件监听是confirm，这里用的是旧版本onConfirm -->
							<el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
								<el-button slot="reference" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
				<el-button type="primary" @click="saveAttr" :disabled="attrInfo.attrValueList.length < 1">保存</el-button>
				<el-button @click="isShowTable = true">取消</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
// 引入深拷贝
import cloneDeep from 'lodash/cloneDeep'

export default {
	name: 'Attr',
	data () {
		return {
			category1Id: '',
			category2Id: '',
			category3Id: '',
			// 接收平台属性的数据
			attrList: [],
			isShowTable: true,
			// 收集新增/修改属性
			attrInfo: {
				attrName: "",
				attrValueList: [],
				categoryId: 0,
				categoryLevel: 3
			}
		}
	},
	methods: {
		getCategoryId ({ category1Id, category2Id, category3Id }) {
			this.category1Id = category1Id
			this.category2Id = category2Id
			this.category3Id = category3Id
			this.getAttrList()
		},
		async getAttrList () {
			const { category1Id, category2Id, category3Id } = this
			let result = await this.$API.attr.reqGetAttrList(category1Id, category2Id, category3Id)
			if (result.code == 200) {
				this.attrList = result.data
			}
		},
		addAttr () {
			this.isShowTable = false
			// 清除数据
			this.attrInfo = {
				attrName: "",
				attrValueList: [],
				// 收集选中的三级分类的id
				categoryId: this.category3Id,
				categoryLevel: 3
			}
		},
		addAttrValue () {
			this.attrInfo.attrValueList.push({
				// 添加属性操作时还没有相应的id，因此带给服务器的是undefined
				// 修改属性，是在已有属性的基础上新增属性值，因此要将已有属性id带上
				attrId: this.attrInfo.id,
				valueName: '',
				flag: true
			})
			// 新增属性值，给最新input添加自动聚焦
			this.$nextTick(() => {
				this.$refs[this.attrInfo.attrValueList.length - 1].focus()
			})
		},
		updateAttr (row) {
			this.isShowTable = false
			// 因为数据结构中对象里套数组，数组里面是对象，因此需要使用深拷贝
			this.attrInfo = cloneDeep(row)
			// 将已有属性值添加上flag，且是响应式的
			this.attrInfo.attrValueList.forEach(item => {
				this.$set(item, 'flag', false)
			});
		},
		toLook (row) {
			// 1.新增属性不能为空
			if (row.valueName.trim() == '') {
				this.$message('新增属性值不能为空！')
				return;
			}
			// 2.新增属性不能与已有属性重复 
			// some() 用于测试数组中是不是至少有一个元素通过了被提供的函数测试，返回值为布尔值
			let isRepeat = this.attrInfo.attrValueList.some(item => {
				if (row !== item) {
					// 判断时排除最后一项row
					return row.valueName == item.valueName
				}
			})
			if (isRepeat) {
				this.$message('不得重复输入属性值')
				return
			}
			// 3.切换到查看模式
			row.flag = false
		},
		toEdit (row, index) {
			row.flag = true
			// 对input节点实现自动聚焦
			// input和span是if和else的关系，而页面重绘需要时间，因此无法在点击span的同时就立刻获取到input，因此需要用$nextTick()等节点渲染完毕再获取
			this.$nextTick(() => {
				this.$refs[index].focus()
			})
		},
		// 气泡确认框确定按钮的回调
		deleteAttrValue (index) {
			this.attrInfo.attrValueList.splice(index, 1)
		},
		async saveAttr () {
			// 1.整理参数：提交属性值不能为空；提交数据中不包括flag
			this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
				if (item.valueName !== '') {
					delete item.flag
					// filter会将返回值为true的元素重组为一个数组，这里手动设置return
					return true
				}
			})
			try {
				await this.$API.attr.reqAddorUpdateAttr(this.attrInfo)
				this.$message({ type: 'success', message: '保存成功' })
				this.getAttrList()
				this.isShowTable = true
			} catch (error) {
				alert(error.message)
			}
		}
	}
}
</script>

<style scoped>
</style>
