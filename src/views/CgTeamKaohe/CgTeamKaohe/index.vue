<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="队伍ID" prop="tId">
        <el-input
          v-model="queryParams.tId"
          placeholder="请输入队伍ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="队伍名称" prop="tName">
        <el-input
          v-model="queryParams.tName"
          placeholder="请输入队伍名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="月份" prop="month">
		<el-date-picker
		     v-model="queryParams.month"
		     type="month"
					    format="yyyy-MM"
					        value-format="yyyy-MM"
					  clearable
					    @keyup.enter.native="handleQuery"
		     placeholder="选择月">
		   </el-date-picker>
		
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
          v-hasPermi="['CgTeamKaohe:CgTeamKaohe:add']"
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
          v-hasPermi="['CgTeamKaohe:CgTeamKaohe:edit']"
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
          v-hasPermi="['CgTeamKaohe:CgTeamKaohe:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['CgTeamKaohe:CgTeamKaohe:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="CgTeamKaoheList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="队伍名称" align="center" prop="tName" />
      <el-table-column label="分数1" align="center" prop="fen1" />
      <el-table-column label="分数2" align="center" prop="fen2" />
      <el-table-column label="分数3" align="center" prop="fen3" />
      <el-table-column label="分数4" align="center" prop="fen4" />
      <el-table-column label="月份" align="center" prop="month" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['CgTeamKaohe:CgTeamKaohe:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['CgTeamKaohe:CgTeamKaohe:remove']"
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

    <!-- 添加或修改每月队考核对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="队伍ID" prop="tId">
          <el-input v-model="form.tId" placeholder="请输入队伍ID" />
        </el-form-item>
        <!-- <el-form-item label="队伍名称" prop="tName">
          <el-input v-model="form.tName" placeholder="请输入队伍名称" />
        </el-form-item> -->
        <el-form-item label="分数1" prop="fen1">
          <el-input v-model="form.fen1" placeholder="请输入分数1" />
        </el-form-item>
        <el-form-item label="分数2" prop="fen2">
          <el-input v-model="form.fen2" placeholder="请输入分数2" />
        </el-form-item>
        <el-form-item label="分数3" prop="fen3">
          <el-input v-model="form.fen3" placeholder="请输入分数3" />
        </el-form-item>
        <el-form-item label="分数4" prop="fen4">
          <el-input v-model="form.fen4" placeholder="请输入分数4" />
        </el-form-item>
        <el-form-item label="月份" prop="month">
          <el-input v-model="form.month" placeholder="请输入月份" />
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
import { listCgTeamKaohe, getCgTeamKaohe, delCgTeamKaohe, addCgTeamKaohe, updateCgTeamKaohe } from "@/api/CgTeamKaohe/CgTeamKaohe";

export default {
  name: "CgTeamKaohe",
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
      // 每月队考核表格数据
      CgTeamKaoheList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        tId: null,
        tName: null,
        fen1: null,
        fen2: null,
        fen3: null,
        fen4: null,
        month: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询每月队考核列表 */
    getList() {
      this.loading = true;
      listCgTeamKaohe(this.queryParams).then(response => {
        this.CgTeamKaoheList = response.rows;
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
        tId: null,
        tName: null,
        fen1: null,
        fen2: null,
        fen3: null,
        fen4: null,
        month: null,
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
      this.title = "添加每月队考核";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCgTeamKaohe(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改每月队考核";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCgTeamKaohe(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCgTeamKaohe(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除每月队考核编号为"' + ids + '"的数据项？').then(function() {
        return delCgTeamKaohe(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('CgTeamKaohe/CgTeamKaohe/export', {
        ...this.queryParams
      }, `CgTeamKaohe_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
