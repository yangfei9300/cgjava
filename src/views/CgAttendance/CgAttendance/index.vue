<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户ID" prop="uId">
        <el-input
          v-model="queryParams.uId"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
	  
	  
	 
	  
	  
	  
	  
      <el-form-item label="考勤日期" prop="attendDate">
        <el-date-picker clearable
          v-model="queryParams.attendDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择考勤日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上班打卡时间" prop="checkIn">
        <el-input
          v-model="queryParams.checkIn"
          placeholder="请输入上班打卡时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="下班打卡时间" prop="checkOut">
        <el-input
          v-model="queryParams.checkOut"
          placeholder="请输入下班打卡时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="考勤状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择考勤状态" clearable>
          <el-option
            v-for="dict in dict.type.cg_kq_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="加班时间/小时" prop="overtimeHours">
        <el-date-picker clearable
          v-model="queryParams.overtimeHours"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择加班时间/小时">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="周几" prop="weekNum">
        <el-input
          v-model="queryParams.weekNum"
          placeholder="请输入周几"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['CgAttendance:CgAttendance:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['CgAttendance:CgAttendance:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['CgAttendance:CgAttendance:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['CgAttendance:CgAttendance:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="CgAttendanceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="用户ID" align="center" prop="uId" />
      <el-table-column label="考勤日期" align="center" prop="attendDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.attendDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上班打卡时间" align="center" prop="checkIn" />
      <el-table-column label="下班打卡时间" align="center" prop="checkOut" />
      <!-- <el-table-column label="考勤状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.cg_kq_status" :value="scope.row.status"/>
        </template>
      </el-table-column> -->
    <!--  <el-table-column label="加班时间/小时" align="center" prop="overtimeHours" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.overtimeHours, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="周几" align="center" prop="weekNum" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['CgAttendance:CgAttendance:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['CgAttendance:CgAttendance:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改考勤（每天00点更新）对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="uId">
          <el-input v-model="form.uId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="考勤日期" prop="attendDate">
          <el-date-picker clearable
            v-model="form.attendDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择考勤日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上班打卡时间" prop="checkIn">
          <el-input v-model="form.checkIn" placeholder="请输入上班打卡时间" />
        </el-form-item>
        <el-form-item label="下班打卡时间" prop="checkOut">
          <el-input v-model="form.checkOut" placeholder="请输入下班打卡时间" />
        </el-form-item>
        <el-form-item label="考勤状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择考勤状态">
            <el-option
              v-for="dict in dict.type.cg_kq_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加班时间/小时" prop="overtimeHours">
          <el-date-picker clearable
            v-model="form.overtimeHours"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择加班时间/小时">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="周几" prop="weekNum">
          <el-input v-model="form.weekNum" placeholder="请输入周几" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCgAttendance, getCgAttendance, delCgAttendance, addCgAttendance, updateCgAttendance } from "@/api/CgAttendance/CgAttendance";
import { listCgTeam} from "@/api/CgTeam/CgTeam";

export default {
  name: "CgAttendance",
  dicts: ['cg_kq_status'],
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
      // 考勤（每天00点更新）表格数据
      CgAttendanceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        uId: null,
        attendDate: null,
        checkIn: null,
        checkOut: null,
        status: null,
        overtimeHours: null,
        weekNum: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
	  CgTeamList:[]
    };
  },
  created() {
    this.getList();
  },
  methods: {
	 
    /** 查询考勤（每天00点更新）列表 */
    getList() {
      this.loading = true;
      listCgAttendance(this.queryParams).then(response => {
        this.CgAttendanceList = response.rows;
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
        uId: null,
        attendDate: null,
        checkIn: null,
        checkOut: null,
        status: null,
        overtimeHours: null,
        weekNum: null,
        remark: null,
        createTime: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加考勤（每天00点更新）";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCgAttendance(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改考勤（每天00点更新）";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCgAttendance(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCgAttendance(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
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
      this.$modal.confirm('是否确认删除考勤（每天00点更新）编号为"' + ids + '"的数据项？').then(function() {
        return delCgAttendance(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('CgAttendance/CgAttendance/export', {
        ...this.queryParams
      }, `CgAttendance_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
