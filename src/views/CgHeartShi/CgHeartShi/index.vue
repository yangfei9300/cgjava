<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      
	  <el-form-item label="选择队伍" prop="dId">
	    <el-select v-model="queryParams.dId" 
	  		placeholder="请选择队伍" clearable>
	      <el-option
	        v-for="dict in CgTeamList"
	        :key="dict.id"
	        :label="dict.tName"
	        :value="dict.id"
	      />
	    </el-select>
	  </el-form-item>
	  
	  
	  
      <el-form-item label="用户姓名" prop="params.uName">
        <el-input
          v-model="queryParams.params.uName"
          placeholder="请输入用户姓名"
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
     <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['CgHeartShi:CgHeartShi:add']"
        >新增</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['CgHeartShi:CgHeartShi:edit']"
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
          v-hasPermi="['CgHeartShi:CgHeartShi:remove']"
        >删除</el-button>
      </el-col>
       -->
	   <el-col :span="1.5">
	     <el-button
	       type="warning"
	       plain
	       icon="el-icon-download"
	       size="mini"
	       @click="handleExport"
	       v-hasPermi="['CgHeartShi:CgHeartShi:export']"
	     >导出</el-button>
	   </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="CgHeartShiList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="内容" align="center" prop="content" />
      <el-table-column label="图片" align="center" prop="imgs" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.imgs" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="纬度" align="center" prop="lat" />
      <el-table-column label="经度" align="center" prop="lng" />
      <el-table-column label="队名称" align="center" prop="params.tName" />
      <el-table-column label="用户姓名" align="center" prop="params.uName" />
      <el-table-column label="打分" align="center" prop="fen" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="打分时间" align="center" prop="fenTime" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.fenTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['CgHeartShi:CgHeartShi:edit']"
          >进行打分</el-button>
		  <!--    <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['CgHeartShi:CgHeartShi:remove']"
          >删除</el-button> -->
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

    <!-- 添加或修改热心服务事项对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="图片" prop="imgs">
          <image-upload v-model="form.imgs"/>
        </el-form-item>
    <!--    <el-form-item label="纬度" prop="lat">
          <el-input v-model="form.lat" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="经度" prop="lng">
          <el-input v-model="form.lng" placeholder="请输入经度" />
        </el-form-item> -->
       <!-- <el-form-item label="队ID" prop="dId">
          <el-input v-model="form.dId" placeholder="请输入队ID" />
        </el-form-item>
        <el-form-item label="用户ID" prop="uId">
          <el-input v-model="form.uId" placeholder="请输入用户ID" />
        </el-form-item> -->
        <el-form-item label="打分" prop="fen">
          <el-input type="number" v-model="form.fen" placeholder="请输入打分" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <!-- <el-form-item label="打分时间" prop="fenTime">
          <el-date-picker clearable
            v-model="form.fenTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择打分时间">
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
import { listCgHeartShi, getCgHeartShi, delCgHeartShi, addCgHeartShi, updateCgHeartShi } from "@/api/CgHeartShi/CgHeartShi";
import { listCgTeam } from '@/api/CgTeam/CgTeam';
export default {
  name: "CgHeartShi",
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
      // 热心服务事项表格数据
      CgHeartShiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        content: null,
        imgs: null,
        lat: null,
        lng: null,
        dId: null,
        uId: null,
        fen: null,
        fenTime: null,
		params:{
			'uName':null,
		}
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
	  this.getTeamList()
    this.getList();
  },
  methods: {
	  getTeamList() {
	  	listCgTeam({ pageNum: 1, pageSize: 1000 }).then((response) => {
	  		this.CgTeamList = response.rows;
	  	});
	  },
    /** 查询热心服务事项列表 */
    getList() {
      this.loading = true;
      listCgHeartShi(this.queryParams).then(response => {
        this.CgHeartShiList = response.rows;
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
        title: null,
        content: null,
        imgs: null,
        lat: null,
        lng: null,
        dId: null,
        uId: null,
        fen: null,
        remark: null,
        fenTime: null,
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
      this.title = "添加热心服务事项";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCgHeartShi(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改热心服务事项";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCgHeartShi(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCgHeartShi(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除热心服务事项编号为"' + ids + '"的数据项？').then(function() {
        return delCgHeartShi(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('CgHeartShi/CgHeartShi/export', {
        ...this.queryParams
      }, `CgHeartShi_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
