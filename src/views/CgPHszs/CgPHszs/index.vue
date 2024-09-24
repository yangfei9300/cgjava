<template>
  <div class="app-container">
   
    

    <el-table v-loading="loading" :data="CgPHszsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="还乡店中队" align="center" prop="dui1" />
      <el-table-column label="环宇城中队" align="center" prop="dui2" />
      <el-table-column label="珑城中队" align="center" prop="dui3" />
      <el-table-column label="卧牛中队" align="center" prop="dui4" />
      <el-table-column label="御山中队" align="center" prop="dui5" />
      <el-table-column label="将军中队" align="center" prop="dui6" />
      <!-- <el-table-column label="指数" align="center" prop="zhishu" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['CgPHszs:CgPHszs:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['CgPHszs:CgPHszs:remove']"
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

    <!-- 添加或修改华山指数对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="还乡店中队" prop="dui1">
          <el-input v-model="form.dui1" type="number" placeholder="请输入指数" />
        </el-form-item>
        <el-form-item label="环宇城中队" prop="dui2">
          <el-input v-model="form.dui2" type="number"  placeholder="请输入指数" />
        </el-form-item>
        <el-form-item label="珑城中队" prop="dui3">
          <el-input v-model="form.dui3" type="number"  placeholder="请输入指数" />
        </el-form-item>
        <el-form-item label="卧牛中队" prop="dui4">
          <el-input v-model="form.dui4" type="number"  placeholder="请输入指数" />
        </el-form-item>
        <el-form-item label="御山中队" prop="dui5">
          <el-input v-model="form.dui5" type="number"  placeholder="请输入指数" />
        </el-form-item>
        <el-form-item label="将军中队" prop="dui6">
          <el-input v-model="form.dui6" type="number"  placeholder="请输入指数" />
        </el-form-item>
        <!-- <el-form-item label="指数" prop="zhishu">
          <el-input v-model="form.zhishu"  type="number"  placeholder="请输入指数" />
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
import { listCgPHszs, getCgPHszs, delCgPHszs, addCgPHszs, updateCgPHszs } from "@/api/CgPHszs/CgPHszs";

export default {
  name: "CgPHszs",
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
      // 华山指数表格数据
      CgPHszsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dui1: null,
        dui2: null,
        dui3: null,
        dui4: null,
        dui5: null,
        dui6: null,
        zhishu: null
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
    /** 查询华山指数列表 */
    getList() {
      this.loading = true;
      listCgPHszs(this.queryParams).then(response => {
        this.CgPHszsList = response.rows;
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
        dui1: null,
        dui2: null,
        dui3: null,
        dui4: null,
        dui5: null,
        dui6: null,
        zhishu: null
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
      this.title = "添加华山指数";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCgPHszs(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改华山指数";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCgPHszs(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCgPHszs(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除华山指数编号为"' + ids + '"的数据项？').then(function() {
        return delCgPHszs(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('CgPHszs/CgPHszs/export', {
        ...this.queryParams
      }, `CgPHszs_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
