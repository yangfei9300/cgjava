<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="队名" prop="teamName">
        <el-select v-model="queryParams.teamName" placeholder="请选择队名" clearable>
          <el-option
            v-for="dict in CgTeamList"
            :key="dict.tName"
            :label="dict.tName"
            :value="dict.tName"
          />
        </el-select>
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
          v-hasPermi="['CgPDuiKaohe:CgPDuiKaohe:add']"
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
          v-hasPermi="['CgPDuiKaohe:CgPDuiKaohe:edit']"
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
          v-hasPermi="['CgPDuiKaohe:CgPDuiKaohe:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['CgPDuiKaohe:CgPDuiKaohe:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="CgPDuiKaoheList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="队名" align="center" prop="teamName">
        <template slot-scope="scope">
          <div>{{scope.row.teamName}}</div>
        </template>
      </el-table-column>
      <el-table-column label="分数" align="center" prop="fen" />
      <el-table-column label="时间" align="center" prop="fTime" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['CgPDuiKaohe:CgPDuiKaohe:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['CgPDuiKaohe:CgPDuiKaohe:remove']"
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

    <!-- 添加或修改队考核对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        
		<el-form-item label="考核时间" prop="fTime">
		  <el-date-picker 
		  v-model="form.fTime" 
		  type="month" 
		  placeholder="选择月"
		    value-format="yyyy-MM"
		  ></el-date-picker>
		</el-form-item>
		
        <el-form-item label="队名" prop="teamName">
          <el-select v-model="form.teamName" placeholder="请选择队名" clearable>
            <el-option
              v-for="dict in CgTeamList"
              :key="dict.tName"
              :label="dict.tName"
              :value="dict.tName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分数" prop="fen">
          <el-input v-model="form.fen" placeholder="请输入分数" />
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
import { listCgPDuiKaohe, getCgPDuiKaohe, delCgPDuiKaohe, addCgPDuiKaohe, updateCgPDuiKaohe } from "@/api/CgPDuiKaohe/CgPDuiKaohe";
import { listCgTeam } from '@/api/CgTeam/CgTeam';



export default {
  name: "CgPDuiKaohe",
  dicts: ['cg_gongzuozhan'],
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
      // 队考核表格数据
      CgPDuiKaoheList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        teamName: null,
        fTime: null,
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
	this.getTeams();
  },
  methods: {
	  
	getTeams(){
		  listCgTeam(this.queryParams).then((response) => {
		  	this.CgTeamList = response.rows;
		  });
	},
    /** 查询队考核列表 */
    getList() {
      this.loading = true;
      listCgPDuiKaohe(this.queryParams).then(response => {
        this.CgPDuiKaoheList = response.rows;
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
        teamName: null,
        fen: null,
        fTime: null,
        createTime: null
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
      this.title = "添加队考核";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCgPDuiKaohe(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改队考核";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCgPDuiKaohe(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCgPDuiKaohe(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除队考核编号为"' + ids + '"的数据项？').then(function() {
        return delCgPDuiKaohe(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('CgPDuiKaohe/CgPDuiKaohe/export', {
        ...this.queryParams
      }, `CgPDuiKaohe_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
