<template>
	<div>
		<el-button type="primary" icon="el-icon-plus" style="margin: 10px 0 20px;" @click="showDialog">添加</el-button>
		<!-- 
         表格组件 
         data:表格组件将来需要展示的数据------数组类型
         border：是给表格添加边框
         column属性
         label：显示标题
         width：对应列的宽度
         align：标题的对齐方式
         prop:对应列内容的字段名
				 type:对应列的类型 index显示该行的索引（从 1 开始计算）
         注意1：elmentUI当中的table组件，展示的数据是以一列一列进行展示数据
       -->
		<el-table :data="list" style="width: 100%;" border>
			<el-table-column type="index" label="序号" width="80px" align="center">
			</el-table-column>
			<el-table-column prop="tmName" label="品牌名称" width="width">
			</el-table-column>
			<el-table-column prop="logoUrl" label="品牌LOGO" width="width">
				<!-- 作用域插槽，slot-scope对回传对象进行解构，row指的是传递的数据对象，$index是索引值 -->
				<template slot-scope="{row,$index}">
					<img :src="row.logoUrl" alt="" style="width: 80px;height: 80px;">
				</template>
			</el-table-column>
			<el-table-column prop="prop" label="操作" width="width">
				<template slot-scope="{row,$index}">
					<el-button type="warning" size="mini" icon="el-icon-edit" @click="updateTrademark(row)">修改</el-button>
					<el-button type="danger" size="mini" icon="el-icon-delete" @click="delateTrademark(row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 
      分页器 
      当前第几页、数据总条数、每一页展示条数、连续页码数
      @size-change="handleSizeChange" 每页条数改变时会触发
      @current-change="handleCurrentChange" 当前页改变时会触发
      current-page:代表的是当前第几页
      total：代表分页器一共需要展示数据条数
      page-size：代表的是每一页需要展示多少条数据
      page-sizes：代表可以设置每一页展示多少条数据
      layout：可以实现分页器布局
      pager-count:按钮的数量  如果7  连续页码是5
    -->
		<el-pagination style="margin-top: 20px;text-align: center;" :current-page="page" :page-sizes="[3, 5, 10]"
			:page-size="limit" :total="total" :pager-count="7" layout="prev, pager, next, jumper,->,sizes, total"
			@current-change="handleCurrentChange" @size-change="handleSizeChange">
		</el-pagination>
		<!-- 对话框嵌套表单元素
		:visible.sync="dialogFormVisible 控制对话框显示与隐藏-->
		<el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
			<!-- form表单 model属性用来将表单数据收集到model所绑定的对象上，并进行表单验证 -->
			<!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。 -->
			<el-form style="width: 80%;" :model="tmForm" :rules="rules" ref="ruleForm">
				<el-form-item label="品牌名称" label-width="100px" prop="tmName">
					<el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
				</el-form-item>
				<el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
					<!--这里收集数据：不能使用v-model，因为不是表单元素
            action:设置图片上传的地址
            :on-success:可以检测到图片上传成功，当图片上传成功，会执行一次
            :before-upload：可以在上传图片之前，会执行一次-->
					<el-upload class="avatar-uploader" action="/admin/product/fileUpload" :show-file-list="false"
						:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						<div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过2MB</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'tradeMark',
	data () {
		// 自定义校验规则
		var validateTmName = (rule, value, callback) => {
			if (value.length < 2 || value.length > 10) {
				callback(new Error('长度在 2 到 10 个字符'));
			} else {
				callback();
			}
		};
		return {
			page: 1,
			limit: 3,
			total: 0,
			list: [],
			dialogFormVisible: false,
			// 收集品牌信息，其中的key要与提交服务器的参数一致
			tmForm: {
				tmName: '',
				logoUrl: ''
			},
			// 表单验证规则
			rules: {
				tmName: [
					{ required: true, message: '请输入品牌名称', trigger: 'blur' },
					// 自定义校验规则
					{ validator: validateTmName, trigger: 'change' }
					// { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
				],
				logoUrl: [
					{ required: true, message: '请选择品牌的图片' }
				],
			}
		}
	},
	mounted () {
		this.getPageList()
	},
	methods: {
		async getPageList () {
			const { page, limit } = this
			let result = await this.$API.trademark.reqTradeMarkList(page, limit)
			if (result.code == 200) {
				this.total = result.data.total
				this.list = result.data.records
			}
		},
		handleCurrentChange (page) {
			this.page = page
			this.getPageList()
		},
		handleSizeChange (limit) {
			this.limit = limit
			this.getPageList()
		},
		showDialog () {
			// 清除上次输入的数据
			this.tmForm = { tmName: '', logoUrl: '' }
			this.dialogFormVisible = true
		},
		// 修改品牌信息
		updateTrademark (row) {
			// row 当前选中品牌的信息对象
			this.dialogFormVisible = true
			// 将选中信息复制给当前对话框
			// this.tmForm = row 不能这样直接复制，这是直接将复制的对象和服务器给的对象指向同一个地址，应该进行浅拷贝
			this.tmForm = { ...row }
		},
		// 图片上传成功：需要收集图片数据，需要将来上传至服务器
		handleAvatarSuccess (res, file) {
			// res是图片上传成功后返回的前端数据 {code: 200, message: '成功', data: 'http://139.198.127.41:9000/sph/20220828/1.jpg', ok: true}
			// file 是图片上传成功后服务器返回给前端的数据
			this.tmForm.logoUrl = res.data
		},
		// 图片上传之前
		beforeAvatarUpload (file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		},
		// 添加或修改品牌点击确定按钮
		addOrUpdateTradeMark () {
			this.$refs.ruleForm.validate(async (success) => {
				if (success) {
					this.dialogFormVisible = false
					// 向服务器派发添加或修改品牌的请求
					let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
					if (result.code == 200) {
						// 弹出信息，利用elementui
						this.$message({
							type: 'success',
							message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功'
						})
						// 再次获取列表进行展示
						this.getPageList()
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			})
		},
		// 删除品牌操作
		delateTrademark (row) {
			this.$confirm(`此操作将删除${row.tmName}，是否继续？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				let result = await this.$API.trademark.reqDeleteTradeMark(row.id)
				console.log(result);
				if (result.code == 200) {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.getPageList()
				}
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		}
	}
}
</script>

<style scoped>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}

.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
