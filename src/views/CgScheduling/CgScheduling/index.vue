<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label-width="150" label="上班时间名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入上班时间名称"
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
          v-hasPermi="['CgScheduling:CgScheduling:add']"
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
          v-hasPermi="['CgScheduling:CgScheduling:edit']"
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
          v-hasPermi="['CgScheduling:CgScheduling:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['CgScheduling:CgScheduling:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="CgSchedulingList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="上班时间名称" align="center" prop="name" />
	  
	  <el-table-column label="上班时间" align="center" prop="startTime" width="180">
	  </el-table-column>
	 <el-table-column label="下班时间" align="center" prop="endTime" width="180">
	 </el-table-column>
      <!-- <el-table-column label="分类ID" align="center" prop="typeId" /> -->
    <!--  
      <el-table-column label="中午下班时间" align="center" prop="startEndTime" width="180">
       
      </el-table-column>
      <el-table-column label="下午上班上班时间" align="center" prop="endStartTime" width="180">
       
      </el-table-column>
       -->
	  
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['CgScheduling:CgScheduling:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['CgScheduling:CgScheduling:remove']"
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

    <!-- 添加或修改上班时刻对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="上班时间名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入上班时间名称" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
		  
		  <el-time-picker
		      v-model="form.startTime"
		      placeholder="任意时间点"
			   value-format="HH:mm:ss"
			  >
		    </el-time-picker>
		  
        </el-form-item>
        <!-- <el-form-item label="中午下班时间" prop="startEndTime">
		  <el-time-picker
		      v-model="form.startEndTime"
			   value-format="HH:mm:ss"
		      placeholder="任意时间点">
		    </el-time-picker>
        </el-form-item>
        <el-form-item label="下午上班上班时间" prop="endStartTime">
		  <el-time-picker
		      v-model="form.endStartTime"
			   value-format="HH:mm:ss"
		      placeholder="任意时间点">
		    </el-time-picker>
        </el-form-item> -->
        <el-form-item label="结束时间" prop="endTime">
		  <el-time-picker
		      v-model="form.endTime"
			   value-format="HH:mm:ss"
		      placeholder="任意时间点">
		    </el-time-picker>
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
import { listCgScheduling, getCgScheduling, delCgScheduling, addCgScheduling, updateCgScheduling } from "@/api/CgScheduling/CgScheduling";

export default {
  name: "CgScheduling",
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
      // 上班时刻表格数据
      CgSchedulingList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        typeId: null,
        startTime: null,
        startEndTime: null,
        endStartTime: null,
        endTime: null,
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
    
	/** 查询上班时刻列表 */
    getList() {
      this.loading = true;
      listCgScheduling(this.queryParams).then(response => {
        this.CgSchedulingList = response.rows;
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
        name: null,
        typeId: null,
        startTime: null,
        startEndTime: null,
        endStartTime: null,
        endTime: null,
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
      this.title = "添加上班时刻";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCgScheduling(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改上班时刻";
      });
    },
    /** 提交按钮 */
    submitForm() {
		
		
		console.log("A",this.form)
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCgScheduling(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCgScheduling(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除上班时刻编号为"' + ids + '"的数据项？').then(function() {
        return delCgScheduling(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('CgScheduling/CgScheduling/export', {
        ...this.queryParams
      }, `CgScheduling_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
