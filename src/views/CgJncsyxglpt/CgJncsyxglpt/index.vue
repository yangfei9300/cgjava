<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="时限" prop="shixian">
        <el-input
          v-model="queryParams.shixian"
          placeholder="请输入时限"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="剩余时间" prop="shengyushijian">
        <el-input
          v-model="queryParams.shengyushijian"
          placeholder="请输入剩余时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="案件号" prop="anjianhao">
        <el-input
          v-model="queryParams.anjianhao"
          placeholder="请输入案件号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域" prop="quyu">
        <el-input
          v-model="queryParams.quyu"
          placeholder="请输入区域"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="zhuangtai">
        <el-input
          v-model="queryParams.zhuangtai"
          placeholder="请输入状态"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="当前环节" prop="dangqianhuanjie">
        <el-input
          v-model="queryParams.dangqianhuanjie"
          placeholder="请输入当前环节"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="案件来源" prop="anjianlaiyuan">
        <el-input
          v-model="queryParams.anjianlaiyuan"
          placeholder="请输入案件来源"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="来件时间" prop="laijianshijian">
        <el-date-picker clearable
          v-model="queryParams.laijianshijian"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择来件时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="类别" prop="leibie">
        <el-input
          v-model="queryParams.leibie"
          placeholder="请输入类别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="事发位置" prop="shifaweizhi">
        <el-input
          v-model="queryParams.shifaweizhi"
          placeholder="请输入事发位置"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="问题描述" prop="wentimiaoshu">
        <el-input
          v-model="queryParams.wentimiaoshu"
          placeholder="请输入问题描述"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="事发时间" prop="shifashijian">
        <el-input
          v-model="queryParams.shifashijian"
          placeholder="请输入事发时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="到期时间" prop="daoqishijian">
        <el-input
          v-model="queryParams.daoqishijian"
          placeholder="请输入到期时间"
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
          v-hasPermi="['CgJncsyxglpt:CgJncsyxglpt:add']"
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
          v-hasPermi="['CgJncsyxglpt:CgJncsyxglpt:edit']"
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
          v-hasPermi="['CgJncsyxglpt:CgJncsyxglpt:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['CgJncsyxglpt:CgJncsyxglpt:export']"
        >导出</el-button>
		
		
		
      </el-col>
	  
	  
	   <el-col :span="1.5">
	  		<el-button
	  		  type="info"
	  		  icon="el-icon-upload2"
	  		  size="mini"
	  		  @click="handleImport"
	  		>导入</el-button>
	  	  </el-col>
	  
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="CgJncsyxglptList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="时限" align="center" prop="shixian" />
      <el-table-column label="剩余时间" align="center" prop="shengyushijian" />
      <el-table-column label="案件号" align="center" prop="anjianhao" />
      <el-table-column label="区域" align="center" prop="quyu" />
      <el-table-column label="状态" align="center" prop="zhuangtai" />
      <el-table-column label="当前环节" align="center" prop="dangqianhuanjie" />
      <el-table-column label="案件来源" align="center" prop="anjianlaiyuan" />
      <el-table-column label="来件时间" align="center" prop="laijianshijian" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.laijianshijian, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别" align="center" prop="leibie" />
      <el-table-column label="事发位置" align="center" prop="shifaweizhi" />
      <el-table-column label="问题描述" align="center" prop="wentimiaoshu" />
      <el-table-column label="事发时间" align="center" prop="shifashijian" />
      <el-table-column label="到期时间" align="center" prop="daoqishijian" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['CgJncsyxglpt:CgJncsyxglpt:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['CgJncsyxglpt:CgJncsyxglpt:remove']"
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

    <!-- 添加或修改济南市城市服务运行管理平台对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="时限" prop="shixian">
          <el-input v-model="form.shixian" placeholder="请输入时限" />
        </el-form-item>
        <el-form-item label="剩余时间" prop="shengyushijian">
          <el-input v-model="form.shengyushijian" placeholder="请输入剩余时间" />
        </el-form-item>
        <el-form-item label="案件号" prop="anjianhao">
          <el-input v-model="form.anjianhao" placeholder="请输入案件号" />
        </el-form-item>
        <el-form-item label="区域" prop="quyu">
          <el-input v-model="form.quyu" placeholder="请输入区域" />
        </el-form-item>
        <el-form-item label="状态" prop="zhuangtai">
          <el-input v-model="form.zhuangtai" placeholder="请输入状态" />
        </el-form-item>
        <el-form-item label="当前环节" prop="dangqianhuanjie">
          <el-input v-model="form.dangqianhuanjie" placeholder="请输入当前环节" />
        </el-form-item>
        <el-form-item label="案件来源" prop="anjianlaiyuan">
          <el-input v-model="form.anjianlaiyuan" placeholder="请输入案件来源" />
        </el-form-item>
        <el-form-item label="来件时间" prop="laijianshijian">
          <el-date-picker clearable
            v-model="form.laijianshijian"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择来件时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类别" prop="leibie">
          <el-input v-model="form.leibie" placeholder="请输入类别" />
        </el-form-item>
        <el-form-item label="事发位置" prop="shifaweizhi">
          <el-input v-model="form.shifaweizhi" placeholder="请输入事发位置" />
        </el-form-item>
        <el-form-item label="问题描述" prop="wentimiaoshu">
          <el-input v-model="form.wentimiaoshu" placeholder="请输入问题描述" />
        </el-form-item>
        <el-form-item label="事发时间" prop="shifashijian">
          <el-input v-model="form.shifashijian" placeholder="请输入事发时间" />
        </el-form-item>
        <el-form-item label="到期时间" prop="daoqishijian">
          <el-input v-model="form.daoqishijian" placeholder="请输入到期时间" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
	
	
	
	
		<!-- 用户导入对话框 -->
		<el-dialog :title="upload.title" :visible.sync="upload.open" width="400px">
		  <el-upload
			ref="upload"
			:limit="1"
			accept=".xlsx, .xls"
			:headers="upload.headers"
			:action="upload.url + '?updateSupport=' + upload.updateSupport"
			:disabled="upload.isUploading"
			:on-progress="handleFileUploadProgress"
			:on-success="handleFileSuccess"
			:auto-upload="false"
			drag
		  >
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">
			  将文件拖到此处，或
			  <em>点击上传</em>
			</div>
			<div class="el-upload__tip" slot="tip">
			  <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
			  <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
			</div>
			<div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
		  </el-upload>
		  <div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submitFileForm">确 定</el-button>
			<el-button @click="upload.open = false">取 消</el-button>
		  </div>
		</el-dialog>
	
	
	
  </div>
</template>

<script>
import { listCgJncsyxglpt, getCgJncsyxglpt, delCgJncsyxglpt, addCgJncsyxglpt, updateCgJncsyxglpt } from "@/api/CgJncsyxglpt/CgJncsyxglpt";
import { getToken } from "@/utils/auth";

export default {
  name: "CgJncsyxglpt",
  data() {
    return {
		
		
		// 用户导入参数
			upload: {
			  // 是否显示弹出层（用户导入）
			  open: false,
			  // 弹出层标题（用户导入）
			  title: "",
			  // 是否禁用上传
			  isUploading: false,
			  // 是否更新已经存在的用户数据
			  updateSupport: 0,
			  // 设置上传的请求头部
			  headers: { Authorization: "Bearer " + getToken() },
			  // 上传的地址
			  url: process.env.VUE_APP_BASE_API + "/CgJncsyxglpt/CgJncsyxglpt/importData"
			},//用户导入参数

		
		
		
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
      // 济南市城市服务运行管理平台表格数据
      CgJncsyxglptList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        shixian: null,
        shengyushijian: null,
        anjianhao: null,
        quyu: null,
        zhuangtai: null,
        dangqianhuanjie: null,
        anjianlaiyuan: null,
        laijianshijian: null,
        leibie: null,
        shifaweizhi: null,
        wentimiaoshu: null,
        shifashijian: null,
        daoqishijian: null,
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
    /** 查询济南市城市服务运行管理平台列表 */
    getList() {
      this.loading = true;
      listCgJncsyxglpt(this.queryParams).then(response => {
        this.CgJncsyxglptList = response.rows;
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
        shixian: null,
        shengyushijian: null,
        anjianhao: null,
        quyu: null,
        zhuangtai: null,
        dangqianhuanjie: null,
        anjianlaiyuan: null,
        laijianshijian: null,
        leibie: null,
        shifaweizhi: null,
        wentimiaoshu: null,
        shifashijian: null,
        daoqishijian: null,
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
      this.title = "添加济南市城市服务运行管理平台";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCgJncsyxglpt(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改济南市城市服务运行管理平台";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCgJncsyxglpt(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCgJncsyxglpt(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除济南市城市服务运行管理平台编号为"' + ids + '"的数据项？').then(function() {
        return delCgJncsyxglpt(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('CgJncsyxglpt/CgJncsyxglpt/export', {
        ...this.queryParams
      }, `CgJncsyxglpt_${new Date().getTime()}.xlsx`)
    },
	
	
	
	
	
		// -----------------------------导入-------------------------
		/** 导入按钮操作 */
		handleImport() {
		  this.upload.title = "用户导入";
		  this.upload.open = true;
		},
		
		/** 下载模板操作 */
		importTemplate() {
		  importTemplate().then(response => {
			this.download(response.msg);
		  });
		},
		
		// 文件上传中处理
		handleFileUploadProgress(event, file, fileList) {
		  this.upload.isUploading = true;
		},
		// 文件上传成功处理
		handleFileSuccess(response, file, fileList) {
			this.$modal.closeLoading();
		  this.upload.open = false;
		  this.upload.isUploading = false;
		  this.$refs.upload.clearFiles();
		  console.log("---",response.msg);
		  this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
		  
		  this.getList();
		},
		// 提交上传文件
		submitFileForm() {
			this.$modal.loading("正在导入数据，请稍后...");
		  this.$refs.upload.submit();
		},
		// -----------------------------导入-------------------------
		
	
	
  }
};
</script>
