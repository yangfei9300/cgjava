<template>
	<div class="app-container">
		<el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
			label-width="68px">
			<el-form-item label="待办事件标题" label-width="120px" prop="title">
				<el-input v-model="queryParams.title" placeholder="请输入待办事件标题" clearable
					@keyup.enter.native="handleQuery" />
			</el-form-item>

			<el-form-item label="提交的队伍" label-width="120px" prop="tTId">
				<el-select v-model="queryParams.tTId" placeholder="请选择提交的队伍" clearable>
					<el-option v-for="dict in CgTeamList" :key="dict.id" :label="dict.tName" :value="dict.id" />
				</el-select>
			</el-form-item>


			<el-form-item label="提交的用户姓名" label-width="120px" prop="params.tName">
				<el-input v-model="queryParams.params.tName" placeholder="请输入提交的用户姓名" clearable
					@keyup.enter.native="handleQuery" />
			</el-form-item>



			<el-form-item label="提交的队伍" label-width="120px" prop="cTId">
				<el-select v-model="queryParams.cTId" placeholder="请选择提交的队伍" clearable>
					<el-option v-for="dict in CgTeamList" :key="dict.id" :label="dict.tName" :value="dict.id" />
				</el-select>
			</el-form-item>




			<!-- <el-form-item label="处理的用户ID" prop="cUId">
				<el-input v-model="queryParams.cUId" placeholder="请输入处理的用户ID" clearable @keyup.enter.native="handleQuery" />
			</el-form-item> -->

			<el-form-item label="处理的用户姓名" label-width="120px" prop="params.cName">
				<el-input v-model="queryParams.params.cName" placeholder="请输入处理的用户姓名" clearable
					@keyup.enter.native="handleQuery" />
			</el-form-item>

			<el-form-item label="打分备注" label-width="120px" prop="fenRemark">
				<el-input v-model="queryParams.fenRemark" placeholder="请输入打分备注" clearable
					@keyup.enter.native="handleQuery" />
			</el-form-item>
			<el-form-item label="状态" label-width="120px" prop="status">
				<el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
					<el-option v-for="dict in dict.type.cg_status_sj" :key="dict.value" :label="dict.label"
						:value="dict.value" />
				</el-select>
			</el-form-item>

			<el-form-item label="编号" prop="pCode">
				<el-input v-model="queryParams.pCode" placeholder="请输入编号" clearable @keyup.enter.native="handleQuery" />
			</el-form-item>

			<el-form-item>
				<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
				<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
			</el-form-item>
		</el-form>

		<el-row :gutter="10" class="mb8">
			<!-- <el-col :span="1.5">
				<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['CgTreatDoMat:CgTreatDoMat:add']">新增</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate" v-hasPermi="['CgTreatDoMat:CgTreatDoMat:edit']">
					修改
				</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete" v-hasPermi="['CgTreatDoMat:CgTreatDoMat:remove']">
					删除
				</el-button>
			</el-col> -->

			<!--  -->
			<el-col :span="1.5">
				<el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
					v-hasPermi="['CgTreatDoMat:CgTreatDoMat:export']">导出</el-button>
			</el-col>

			<el-col :span="1.5">
				<el-button type="warning" plain icon="el-icon-download" size="mini" @click="exportImgs"
					v-hasPermi="['CgTreatDoMat:CgTreatDoMat:export']">导出图片</el-button>
			</el-col>

			<el-col :span="1.5">
				<el-button type="warning" plain icon="el-icon-download" size="mini" @click="clickUIrl"
					v-hasPermi="['CgTreatDoMat:CgTreatDoMat:export']">测试跳转</el-button>
			</el-col>





			<right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
		</el-row>

		<el-table v-loading="loading" :data="CgTreatDoMatList" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="ID" align="center" prop="id" />
			<el-table-column label="编号" align="center" prop="pCode" />
			<el-table-column label="待办事件类型" align="center" prop="params.type_name" />
			<el-table-column label="待办事件标题" align="center" prop="title" />
			<el-table-column label="内容" align="center" prop="content" />
			<el-table-column label="相关照片" align="center" prop="imgs" width="100">
				<template slot-scope="scope">
					<image-preview :src="scope.row.imgs" :width="50" :height="50" />
				</template>
			</el-table-column>
			<el-table-column label="最晚改善时间" align="center" prop="endTime" />
			<el-table-column label="备注" align="center" prop="remark" />
			<!-- <el-table-column label="经度" align="center" prop="lng" />
			<el-table-column label="纬度" align="center" prop="lat" /> -->
			<!-- <el-table-column label="提交队伍" align="center" prop="params.ttname" />
			<el-table-column label="提交用户" align="center" prop="params.tuname" />
			<el-table-column label="处理队伍" align="center" prop="params.ctname" />
			<el-table-column label="处理用户" align="center" prop="params.cuname" />
			<el-table-column label="处理结果" align="center" prop="resultContent" />
			<el-table-column label="处理结果图片" align="center" prop="resultImgs" width="100">
				<template slot-scope="scope">
					<image-preview :src="scope.row.resultImgs" :width="50" :height="50" />
				</template>
			</el-table-column>
			<el-table-column label="处理开始时间" 
			align="center" prop="resultStartTime"
			 width="180">
				<template slot-scope="scope">
					<span>{{scope.row.resultStartTime}}</span>
				</template>
			</el-table-column>
			<el-table-column label="处理完成时间" align="center" prop="resultEndTime" /> -->
			<el-table-column label="打分" align="center" prop="fenNum" />
			<!-- <el-table-column label="打分时间" align="center" prop="fenTime" width="180">
				<template slot-scope="scope">
					<span>{{scope.row.fenTime}}</span>
				</template>
			</el-table-column> -->
			<!-- <el-table-column label="晚了多久/分钟" align="center" prop="wanTime" /> -->
			<el-table-column label="打分备注" align="center" prop="fenRemark" />
			<el-table-column label="状态" align="center" prop="status">
				<template slot-scope="scope">
					<dict-tag :options="dict.type.cg_status_sj" :value="scope.row.status" />
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<!-- <el-button size="mini" type="text" 
					icon="el-icon-edit" 
					@click="handleUpdate(scope.row)" 
					v-hasPermi="['CgTreatDoMat:CgTreatDoMat:edit']">修改</el-button> -->
					<!-- <el-button size="mini" type="text" 
					icon="el-icon-delete" 
					@click="handleDelete(scope.row)" 
					v-hasPermi="['CgTreatDoMat:CgTreatDoMat:remove']">删除</el-button> -->



					<el-button size="mini" type="text" @click="openDafenClick(scope.row,1)"
						v-hasPermi="['CgTreatDoMat:CgTreatDoMat:remove']">查看详情</el-button>

					<el-button size="mini" type="text" v-if="!scope.row.fenNum" @click="openDafenClick(scope.row,2)"
						v-hasPermi="['CgTreatDoMat:CgTreatDoMat:remove']">打分</el-button>
				</template>
			</el-table-column>
		</el-table>

		<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
			:limit.sync="queryParams.pageSize" @pagination="getList" />

		<!-- 添加或修改待办事件对话框 -->
		<el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item label="待办事件标题" prop="title">
					<el-input v-model="form.title" placeholder="请输入待办事件标题" />
				</el-form-item>
				<el-form-item label="内容">
					<editor v-model="form.content" :min-height="192" />
				</el-form-item>
				<el-form-item label="相关照片" prop="imgs">
					<image-upload v-model="form.imgs" />
				</el-form-item>
				<el-form-item label="最晚改善时间" prop="endTime">
					<el-input v-model="form.endTime" placeholder="请输入最晚改善时间" />
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="form.remark" placeholder="请输入备注" />
				</el-form-item>
				<el-form-item label="经度" prop="lng">
					<el-input v-model="form.lng" placeholder="请输入经度" />
				</el-form-item>
				<el-form-item label="纬度" prop="lat">
					<el-input v-model="form.lat" placeholder="请输入纬度" />
				</el-form-item>
				<el-form-item label="提交的队伍ID" prop="tTId">
					<el-input v-model="form.tTId" placeholder="请输入提交的队伍ID" />
				</el-form-item>
				<el-form-item label="提交的用户ID" prop="uTId">
					<el-input v-model="form.uTId" placeholder="请输入提交的用户ID" />
				</el-form-item>
				<el-form-item label="处理的队伍ID" prop="cTId">
					<el-input v-model="form.cTId" placeholder="请输入处理的队伍ID" />
				</el-form-item>
				<el-form-item label="处理的用户ID" prop="cUId">
					<el-input v-model="form.cUId" placeholder="请输入处理的用户ID" />
				</el-form-item>
				<el-form-item label="处理结果">
					<editor v-model="form.resultContent" :min-height="192" />
				</el-form-item>
				<el-form-item label="处理结果图片" prop="resultImgs">
					<image-upload v-model="form.resultImgs" />
				</el-form-item>
				<el-form-item label="处理开始时间" prop="resultStartTime">
					<el-date-picker clearable v-model="form.resultStartTime" type="date" value-format="yyyy-MM-dd"
						placeholder="请选择处理开始时间"></el-date-picker>
				</el-form-item>
				<el-form-item label="处理完成时间" prop="resultEndTime">
					<el-input v-model="form.resultEndTime" placeholder="请输入处理完成时间" />
				</el-form-item>
				<el-form-item label="打分" prop="fenNum">
					<el-input v-model="form.fenNum" placeholder="请输入打分" />
				</el-form-item>
				<el-form-item label="打分时间" prop="fenTime">
					<el-date-picker clearable v-model="form.fenTime" type="date" value-format="yyyy-MM-dd"
						placeholder="请选择打分时间"></el-date-picker>
				</el-form-item>
				<el-form-item label="晚了多久/分钟" prop="wanTime">
					<el-input v-model="form.wanTime" placeholder="请输入晚了多久/分钟" />
				</el-form-item>
				<el-form-item label="打分备注" prop="fenRemark">
					<el-input v-model="form.fenRemark" placeholder="请输入打分备注" />
				</el-form-item>

				<el-form-item label="状态" prop="status">
					<el-select v-model="form.status" placeholder="请选择状态">
						<el-option v-for="dict in dict.type.cg_status_sj" :key="dict.value" :label="dict.label"
							:value="parseInt(dict.value)"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm">确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
		</el-dialog>

		<el-dialog title="打分" :visible.sync="openDafen" width="80%" append-to-body>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px"></el-form>

			<el-row v-if="form.params">
				<el-col :span="12">
					<div class="grid-content bg-purple" style="font-size: 20px">
						<div class="roww" style="padding: 20px">
							<div>类型：</div>
							<div>{{form.params.type_name}}</div>
						</div>
						<div class="roww" style="padding: 20px">
							<div>标题：</div>
							<div>{{form.title}}</div>
						</div>
						<div class="roww" style="padding: 20px">
							<div>内容：</div>
							<div>{{form.content}}</div>
						</div>
						<div class="roww" style="padding: 20px">
							<div>最晚修改时间：</div>
							<div>{{form.endTime}}</div>
						</div>
						<div class="roww" style="padding: 20px">
							<div>备注：</div>
							<div>{{form.remark}}</div>
						</div>

						<div class="roww" style="padding: 20px">
							<div>相关图片：</div>
						</div>
						<div class="huanhang" style="padding: 20px" v-if="form.imgs">

							<!-- <img :src="'http://192.168.0.107:9013'+item"
							 v-for="(item, index) in form.imgs" 
							 style="width: 100px; height: 100px; margin-right: 10px; margin-bottom: 10px" />
							 
							 -->
							<el-image style="width: 100px; height: 100px" :src="item"
								v-for="(item, index) in showimgs[0]" :preview-src-list="showimgs[0]">
							</el-image>

							<!-- <image-preview :src="form.imgs" 
							 :width="50" :height="50" /> -->

						</div>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content bg-purple-light" style="font-size: 20px">
						<div class="roww" style="padding: 20px">
							<div>上传队伍名：</div>
							<div>{{form.params.ttname}}</div>
						</div>
						<div class="roww" style="padding: 20px">
							<div>上传人姓名：</div>
							<div>{{form.params.tuname}}</div>
						</div>
						<div class="roww" style="padding: 20px">
							<div>处理队伍名：</div>
							<div>{{form.params.ctname}}</div>
						</div>
						<div class="roww" style="padding: 20px">
							<div>处理人姓名：</div>
							<div>{{form.params.cuname}}</div>
						</div>
						<div class="roww" style="padding: 20px">
							<div>处理结果：</div>
							<div>{{form.resultContent}}</div>
						</div>


						<div class="roww" style="padding: 20px">
							<div>相关图片：</div>
						</div>
						<div class="huanhang" style="padding: 20px" v-if="form.resultImgs">

							<!-- <image-preview :src="form.resultImgs" :width="50" :height="50" /> -->

							<!-- <img :src="'http://192.168.0.107:9013'+item"
							v-for="(item, index) in form.resultImgs" 
							style="width: 100px; height: 100px; margin-right: 10px; margin-bottom: 10px" />
						 -->

							<el-image style="width: 100px; height: 100px" :src="item"
								v-for="(item, index) in showimgs[1]" :preview-src-list="showimgs[1]">
							</el-image>

						</div>
					</div>
				</el-col>
			</el-row>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">

				<el-row v-if="infoFlase==2">
					<el-col :span="12">
						<div class="grid-content bg-purple">
							<el-form-item label="打分" prop="fenNum">
								<el-input v-model="form.fenNum" placeholder="请输入打分" />
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple-light">
							<el-form-item label="打分备注" prop="fenRemark">
								<el-input v-model="form.fenRemark" placeholder="请输入打分备注" />
							</el-form-item>
						</div>
					</el-col>
				</el-row>

				<el-row v-if="infoFlase==1" class="grid-content bg-purple-light" style="font-size: 20px">
					<el-col :span="12">
						<div class="grid-content bg-purple roww">
							<div>打分：</div>
							<div>{{form.fenNum}}</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple-light roww">
							<div>打分备注：</div>
							<div>{{form.fenRemark}}</div>
						</div>
					</el-col>
				</el-row>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" v-if="infoFlase==2" @click="submitDafen">确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		listCgTreatDoMat,
		getCgTreatDoMat,
		delCgTreatDoMat,
		addCgTreatDoMat,
		updateCgTreatDoMat,
		exportImgsCgTreatDoMat
	} from '@/api/CgTreatDoMat/CgTreatDoMat';
	import {
		listCgTeam
	} from '@/api/CgTeam/CgTeam';
	export default {
		name: 'CgTreatDoMat',
		dicts: ['cg_status_sj'],
		data() {
			return {
				// 打分
				openDafen: false,

				infoFlase: 0, //是否是查看

				// 遮罩层
				loading: true,
				// 选中数组
				ids: [],
				// 非单个禁用
				single: true,
				// 非多个禁用
				multiple: true,
				// 显示搜索条件
				showSearch: true,
				// 总条数
				total: 0,
				// 待办事件表格数据
				CgTreatDoMatList: [],
				// 弹出层标题
				title: '',
				// 是否显示弹出层
				open: false,
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					type: null,
					title: null,
					content: null,
					imgs: null,
					endTime: null,
					lng: null,
					lat: null,
					tTId: null,
					uTId: null,
					cTId: null,
					cUId: null,
					resultContent: null,
					resultImgs: null,
					resultStartTime: null,
					resultEndTime: null,
					fenNum: null,
					fenTime: null,
					wanTime: null,
					fenRemark: null,
					status: null,
					pCode: "",
					params: {
						'tName': '',
						'cName': ''
					}
				},
				// 表单参数
				form: {},
				// 表单校验
				rules: {},
				CgTeamList: [],

				showimgs: [],
			};
		},
		created() {
			this.getList();
			this.getTeamList()
		},
		methods: {


			clickUIrl() {
				window.location.href = "https://cgjava.zsyflive.com/profile/压缩包（2024-08-29 17:34:31）.zip"
			},

			exportImgs() {
				this.$modal.loading("正在导出数据，请稍后...");
				exportImgsCgTreatDoMat(this.queryParams).then((response) => {
					console.log("压缩包结果111", response);
					this.$modal.closeLoading();
					this.$tab.openPage("文件", "/cg/CgFileZip").then(() => {
						// 执行结束的逻辑
					})
				});
			},

			getTeamList() {
				listCgTeam({
					pageNum: 1,
					pageSize: 1000
				}).then((response) => {
					this.CgTeamList = response.rows;
				});
			},



			submitDafen() {
				var form1 = JSON.stringify(this.form);
				form1 = JSON.parse(form1)
				if (form1.fenNum == null) {
					this.$modal.msgError("请输入分数");
					return false;
				}
				
				form1.fenTime = this.getDateTimePlusTwoDays();
				form1.status = 4;

				if (form1.imgs&&form1.imgs.length > 0) {
					var img1 = form1.imgs.join(",");
					form1.imgs = img1;
				}
				if (form1.resultImgs&&form1.resultImgs.length > 0) {
					var img2 = form1.resultImgs.join(",");
					form1.resultImgs = img2;
				}
				
				
				
				
				updateCgTreatDoMat(form1).then((response) => {
					this.$modal.msgSuccess('修改成功');
					this.getList();
					this.openDafen = false;
				});
			},

			getDateTimePlusTwoDays() {
				// 获取当前时间
				const now = new Date();
				// 设置时间为当前时间加上两天（2 * 24 * 60 * 60 * 1000 毫秒）
				now.setTime(now.getTime() + 2 * 24 * 60 * 60 * 1000);
				// 提取年月日时分秒
				const year = now.getFullYear();
				const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以要加1
				const date = String(now.getDate()).padStart(2, '0');
				const hours = String(now.getHours()).padStart(2, '0');
				const minutes = String(now.getMinutes()).padStart(2, '0');
				const seconds = String(now.getSeconds()).padStart(2, '0');
				// 拼接成字符串
				const dateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
				return dateTime;
			},
			// 打分弹窗弹出
			openDafenClick(row, type) {
				this.infoFlase = type;
				this.reset();
				getCgTreatDoMat(row.id).then((response) => {
					this.form = response.data;

					// showimgs



					if (this.form.imgs) {
						this.form.imgs = this.form.imgs.split(",");
					}
					if (this.form.resultImgs) {
						this.form.resultImgs = this.form.resultImgs.split(",");
					}
					var showimgs = [];
					if (this.form.imgs) {
						showimgs = [this.form.imgs]
					}
					if (this.form.imgs && this.form.resultImgs) {
						showimgs = [this.form.imgs, this.form.resultImgs];
					}


					for (var a = 0; a < showimgs.length; a++) {
						for (var b = 0; b < showimgs[a].length; b++) {
							showimgs[a][b] = 'http://192.168.0.107:9013' + showimgs[a][b];
						}
					}
					this.showimgs = showimgs;
					this.openDafen = true;
					this.title = '修改待办事件';
				});
			},

			/** 查询待办事件列表 */
			getList() {
				this.loading = true;
				listCgTreatDoMat(this.queryParams).then((response) => {
					this.CgTreatDoMatList = response.rows;
					this.total = response.total;
					this.loading = false;
				});
			},
			// 取消按钮
			cancel() {
				this.open = false;
				this.openDafen = false;
				this.reset();
			},
			// 表单重置
			reset() {
				this.form = {
					id: null,
					type: null,
					title: null,
					content: null,
					imgs: null,
					endTime: null,
					remark: null,
					lng: null,
					lat: null,
					tTId: null,
					uTId: null,
					cTId: null,
					cUId: null,
					resultContent: null,
					resultImgs: null,
					resultStartTime: null,
					resultEndTime: null,
					fenNum: null,
					fenTime: null,
					wanTime: null,
					fenRemark: null,
					status: null,
					createTime: null,
					updateTime: null
				};
				this.resetForm('form');
			},
			/** 搜索按钮操作 */
			handleQuery() {
				this.queryParams.pageNum = 1;
				this.getList();
			},
			/** 重置按钮操作 */
			resetQuery() {
				this.resetForm('queryForm');
				this.handleQuery();
			},
			// 多选框选中数据
			handleSelectionChange(selection) {
				this.ids = selection.map((item) => item.id);
				this.single = selection.length !== 1;
				this.multiple = !selection.length;
			},
			/** 新增按钮操作 */
			handleAdd() {
				this.reset();
				this.open = true;
				this.title = '添加待办事件';
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids;
				getCgTreatDoMat(id).then((response) => {
					this.form = response.data;
					this.open = true;
					this.title = '修改待办事件';
				});
			},
			/** 提交按钮 */
			submitForm() {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						if (this.form.id != null) {
							updateCgTreatDoMat(this.form).then((response) => {
								this.$modal.msgSuccess('修改成功');
								this.open = false;
								this.getList();
							});
						} else {
							addCgTreatDoMat(this.form).then((response) => {
								this.$modal.msgSuccess('新增成功');
								this.open = false;
								this.getList();
							});
						}
					}
				});
			},
			/** 删除按钮操作 */
			handleDelete(row) {
				const ids = row.id || this.ids;
				this.$modal
					.confirm('是否确认删除待办事件编号为"' + ids + '"的数据项？')
					.then(function() {
						return delCgTreatDoMat(ids);
					})
					.then(() => {
						this.getList();
						this.$modal.msgSuccess('删除成功');
					})
					.catch(() => {});
			},
			/** 导出按钮操作 */
			handleExport() {
				this.download(
					'CgTreatDoMat/CgTreatDoMat/export', {
						...this.queryParams
					},
					`CgTreatDoMat_${new Date().getTime()}.xlsx`
				);
			}
		}
	};
</script>