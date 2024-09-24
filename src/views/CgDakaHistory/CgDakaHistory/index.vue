<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
     <!-- <el-form-item label="用户ID" prop="uId">
        <el-input
          v-model="queryParams.uId"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="打卡类型 " prop="kaType">
        <el-select v-model="queryParams.kaType" placeholder="请选择打卡类型 " clearable>
          <el-option
            v-for="dict in dict.type.cg_daka_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="打卡时间" prop="kaTime">
        <el-date-picker clearable
          v-model="queryParams.kaTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择打卡时间">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="地址信息" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入地址信息"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="状态 " prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态 " clearable>
          <el-option
            v-for="dict in dict.type.cg_daka_zhuabngtai"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="renark">
        <el-input
          v-model="queryParams.renark"
          placeholder="请输入备注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="打卡时间表" prop="timeId">
        <el-input
          v-model="queryParams.timeId"
          placeholder="请输入打卡时间表"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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
          v-hasPermi="['CgDakaHistory:CgDakaHistory:add']"
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
          v-hasPermi="['CgDakaHistory:CgDakaHistory:edit']"
        >修改</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['CgDakaHistory:CgDakaHistory:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['CgDakaHistory:CgDakaHistory:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="CgDakaHistoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="用户" align="center" prop="params.cgUser.name" />
      <el-table-column label="打卡类型" align="center" prop="kaType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.cg_daka_type" :value="scope.row.kaType"/>
        </template>
      </el-table-column>
      <el-table-column label="打卡时间" 
	  align="center" prop="kaTime" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.kaTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="纬度" align="center" prop="lat" />
      <el-table-column label="经度" align="center" prop="lon" />
      <el-table-column label="地址信息" align="center" prop="address" />
      <el-table-column label="状态 " align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.cg_daka_zhuabngtai" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="renark" />
      <!-- <el-table-column label="打卡时间表" align="center" prop="timeId" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['CgDakaHistory:CgDakaHistory:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['CgDakaHistory:CgDakaHistory:remove']"
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

    <!-- 添加或修改打卡记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="uId">
          <el-input v-model="form.uId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="打卡类型 " prop="kaType">
          <el-select v-model="form.kaType" placeholder="请选择打卡类型 ">
            <el-option
              v-for="dict in dict.type.cg_daka_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打卡时间" prop="kaTime">
          <el-date-picker clearable
            v-model="form.kaTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择打卡时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="纬度" prop="lat">
          <el-input v-model="form.lat" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="经度" prop="lon">
          <el-input v-model="form.lon" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="地址信息" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址信息" />
        </el-form-item>
        <el-form-item label="状态 " prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option
              v-for="dict in dict.type.cg_daka_zhuabngtai"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="renark">
          <el-input v-model="form.renark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="打卡时间表" prop="timeId">
          <el-input v-model="form.timeId" placeholder="请输入打卡时间表" />
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
import { listCgDakaHistory, getCgDakaHistory, delCgDakaHistory, addCgDakaHistory, updateCgDakaHistory } from "@/api/CgDakaHistory/CgDakaHistory";

export default {
  name: "CgDakaHistory",
  dicts: ['cg_daka_type', 'cg_daka_zhuabngtai'],
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
      // 打卡记录表格数据
      CgDakaHistoryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        uId: null,
        kaType: null,
        kaTime: null,
        lat: null,
        lon: null,
        address: null,
        status: null,
        renark: null,
        timeId: null,
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
	  
	  getTeamList() {
	  	listCgTeam({ pageNum: 1, pageSize: 1000 }).then((response) => {
	  		this.CgTeamList = response.rows;
	  	});
	  },
	  
    /** 查询打卡记录列表 */
    getList() {
      this.loading = true;
      listCgDakaHistory(this.queryParams).then(response => {
        this.CgDakaHistoryList = response.rows;
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
        kaType: null,
        kaTime: null,
        lat: null,
        lon: null,
        address: null,
        status: null,
        renark: null,
        timeId: null,
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
      this.title = "添加打卡记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCgDakaHistory(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改打卡记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCgDakaHistory(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCgDakaHistory(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除打卡记录编号为"' + ids + '"的数据项？').then(function() {
        return delCgDakaHistory(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('CgDakaHistory/CgDakaHistory/export', {
        ...this.queryParams
      }, `CgDakaHistory_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
