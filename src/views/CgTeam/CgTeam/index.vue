<template>
	<div class="app-container">
		<el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
			<el-form-item label="队伍名称" prop="tName">
				<el-input v-model="queryParams.tName" placeholder="请输入队伍名称" clearable @keyup.enter.native="handleQuery" />
			</el-form-item>
			<el-form-item label="队伍类型" prop="type">
				<el-select v-model="queryParams.type" placeholder="请选择队伍类型" clearable>
					<el-option v-for="dict in dict.type.cg_dwlx" :key="dict.value" :label="dict.label" :value="dict.value" />
				</el-select>
			</el-form-item>
			<!-- <el-form-item label="早上上班时间" prop="workTimeZS">
        <el-date-picker clearable
          v-model="queryParams.workTimeZS"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择早上上班时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="早上下班时间" prop="workTimeZX">
        <el-date-picker clearable
          v-model="queryParams.workTimeZX"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择早上下班时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下午上班时间" prop="workTimeXS">
        <el-date-picker clearable
          v-model="queryParams.workTimeXS"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择下午上班时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下午下班时间" prop="workTimeXX">
        <el-date-picker clearable
          v-model="queryParams.workTimeXX"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择下午下班时间">
        </el-date-picker>
      </el-form-item> -->
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
				<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
			</el-form-item>
		</el-form>

		<el-row :gutter="10" class="mb8">
			<el-col :span="1.5">
				<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['CgTeam:CgTeam:add']">新增</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate" v-hasPermi="['CgTeam:CgTeam:edit']">修改</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete" v-hasPermi="['CgTeam:CgTeam:remove']">删除</el-button>
			</el-col>
	<!-- 		<el-col :span="1.5">
				<el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" v-hasPermi="['CgTeam:CgTeam:export']">导出</el-button>
			</el-col> -->
			<right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
		</el-row>

		<el-table v-loading="loading" :data="CgTeamList" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="ID" align="center" prop="id" />
			<el-table-column label="队伍名称" align="center" prop="tName" />
			<el-table-column label="队伍类型" align="center" prop="type">
				<template slot-scope="scope">
					<dict-tag :options="dict.type.cg_dwlx" :value="scope.row.type" />
				</template>
			</el-table-column>
			<!-- <el-table-column label="早上上班时间" align="center" prop="workTimeZS" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workTimeZS, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="早上下班时间" align="center" prop="workTimeZX" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workTimeZX, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下午上班时间" align="center" prop="workTimeXS" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workTimeXS, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下午下班时间" align="center" prop="workTimeXX" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workTimeXX, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
			<el-table-column label="地理围栏" align="center" prop="params.cgGeographicFence.name" />

			<el-table-column label="上班时间表" align="center" prop="params.cgScheduling.name" />

			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button size="mini" type="text" @click="updateWd(scope.row, 1)" v-hasPermi="['CgTeam:CgTeam:edit']">同步工作区域</el-button>

					<el-button size="mini" type="text" 
					@click="updateWd(scope.row, 2)"
					 v-hasPermi="['CgTeam:CgTeam:edit']">同步上班时间</el-button>

					<el-button size="mini" type="text" icon="el-icon-edit" 
					@click="handleUpdate(scope.row)" v-hasPermi="['CgTeam:CgTeam:edit']">修改</el-button>
					<!--  <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['CgTeam:CgTeam:remove']"
          >删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />

		<!-- 添加或修改队伍列对话框 -->
		<el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item label="队伍名称" prop="tName">
					<el-input v-model="form.tName" placeholder="请输入队伍名称" />
				</el-form-item>

				<el-form-item label="队伍类型" prop="type">
					<el-select v-model="form.type" placeholder="请选择队伍类型" clearable>
						<el-option v-for="dict in dict.type.cg_dwlx" :key="dict.value" :label="dict.label" :value="dict.value" />
					</el-select>
				</el-form-item>

				<el-form-item label="工作范围" prop="dlwlId">
					<el-select v-model="form.dlwlId" placeholder="请选择工作范围">
						<el-option v-for="dict in CgGeographicFenceList" :key="dict.id" :label="dict.name" :value="parseInt(dict.id)"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上班时间" prop="workTimeId">
					<el-select v-model="form.workTimeId" placeholder="请选择上班时间">
						<el-option v-for="dict in CgSchedulingList" :key="dict.id" :label="dict.name" :value="parseInt(dict.id)"></el-option>
					</el-select>
				</el-form-item>

				<!-- <el-form-item label="早上上班时间" prop="workTimeZS">
          <el-date-picker clearable
            v-model="form.workTimeZS"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择早上上班时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="早上下班时间" prop="workTimeZX">
          <el-date-picker clearable
            v-model="form.workTimeZX"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择早上下班时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下午上班时间" prop="workTimeXS">
          <el-date-picker clearable
            v-model="form.workTimeXS"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择下午上班时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下午下班时间" prop="workTimeXX">
          <el-date-picker clearable
            v-model="form.workTimeXX"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择下午下班时间">
          </el-date-picker>
        </el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm">确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { listCgTeam, getCgTeam, updataWd, delCgTeam, addCgTeam, updateCgTeam } from '@/api/CgTeam/CgTeam';
import { listCgGeographicFence } from '@/api/CgGeographicFence/CgGeographicFence';
import { listCgScheduling } from '@/api/CgScheduling/CgScheduling';

export default {
	name: 'CgTeam',
	dicts: ['cg_dwlx'],
	data() {
		return {
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
			// 队伍列表格数据
			CgTeamList: [],
			// 弹出层标题
			title: '',
			// 是否显示弹出层
			open: false,
			// 查询参数
			queryParams: {
				pageNum: 1,
				pageSize: 10,
				tName: null,
				type: null,
				workTimeZS: null,
				workTimeZX: null,
				workTimeXS: null,
				workTimeXX: null,
				dlwlId: null,
				workTimeId: null
			},
			// 表单参数
			form: {},
			// 表单校验
			rules: {},
			CgGeographicFenceList: [],
			CgSchedulingList: []
		};
	},
	created() {
		this.getList();
		this.listCgGeographicFenceTo();
		this.getshike();
	},
	methods: {
		// 修改地理围栏或者时间
		updateWd(res, type) {
			var strr=JSON.stringify(res);
			strr=JSON.parse(strr)
			var data = strr;
			data.type = type;
			if (!res.dlwlId&&type==1) {
				this.$modal.msgError('请先绑定地理围栏');
				return false;
			}
			if (!res.workTimeId&&type==2) {
				this.$modal.msgError('请先绑定上班时刻表');
				return false;
			}
			updataWd(data).then((response) => {
				this.$modal.msgSuccess('同步完成');
			});
		},
		getshike() {
			var data = {
				pageNum: 1,
				pageSize: 1000
			};
			listCgScheduling(data).then((response) => {
				this.CgSchedulingList = response.rows;
			});
		},

		//获取地理围栏列表 listCgGeographicFence
		listCgGeographicFenceTo() {
			var data = {
				pageNum: 1,
				pageSize: 1000
			};
			listCgGeographicFence(data).then((response) => {
				this.CgGeographicFenceList = response.rows;
			});
		},

		/** 查询队伍列列表 */
		getList() {
			this.loading = true;
			listCgTeam(this.queryParams).then((response) => {
				this.CgTeamList = response.rows;
				this.total = response.total;
				this.loading = false;
			});
		},
		// 取消按钮
		cancel() {
			this.open = false;
			this.reset();
		},
		// 表单重置
		reset() {
			this.form = {
				id: null,
				tName: null,
				type: null,
				workTimeZS: null,
				workTimeZX: null,
				workTimeId: null,
				workTimeXS: null,
				workTimeXX: null,
				dlwlId: null,
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
			this.title = '添加队伍列';
		},
		/** 修改按钮操作 */
		handleUpdate(row) {
			this.reset();
			const id = row.id || this.ids;
			getCgTeam(id).then((response) => {
				this.form = response.data;
				this.open = true;
				this.title = '修改队伍列';
			});
		},
		/** 提交按钮 */
		submitForm() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					if (this.form.id != null) {
						updateCgTeam(this.form).then((response) => {
							this.$modal.msgSuccess('修改成功');
							this.open = false;
							this.getList();
						});
					} else {
						addCgTeam(this.form).then((response) => {
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
				.confirm('是否确认删除队伍列编号为"' + ids + '"的数据项？')
				.then(function () {
					return delCgTeam(ids);
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
				'CgTeam/CgTeam/export',
				{
					...this.queryParams
				},
				`CgTeam_${new Date().getTime()}.xlsx`
			);
		}
	}
};
</script>
