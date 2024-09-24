<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="编号" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
	  
      <el-form-item label="次数" prop="frequency">
        <el-input
          v-model="queryParams.frequency"
          placeholder="请输入次数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
	  
      <el-form-item label="上次案件编号" prop="upCode">
        <el-input
          v-model="queryParams.upCode"
          placeholder="请输入上次案件编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
	  
      <el-form-item label="所属街办" prop="ssjb">
        <el-input
          v-model="queryParams.ssjb"
          placeholder="请输入所属街办"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
	  
      <el-form-item label="测评类型" prop="cplx">
        <el-input
          v-model="queryParams.cplx"
          placeholder="请输入测评类型"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="测评内容" prop="cpnr">
        <el-input
          v-model="queryParams.cpnr"
          placeholder="请输入测评内容"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="应扣分值" prop="ykfz">
        <el-input
          v-model="queryParams.ykfz"
          placeholder="请输入应扣分值"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="位置" prop="wz">
        <el-input
          v-model="queryParams.wz"
          placeholder="请输入位置"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="zt">
        <el-input
          v-model="queryParams.zt"
          placeholder="请输入状态"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="转办时间" prop="zbsj">
        <el-input
          v-model="queryParams.zbsj"
          placeholder="请输入转办时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="整改情况" prop="zgqk">
        <el-input
          v-model="queryParams.zgqk"
          placeholder="请输入整改情况"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="整改时间" prop="zgsj">
        <el-input
          v-model="queryParams.zgsj"
          placeholder="请输入整改时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="复核时间" prop="fhsj">
        <el-input
          v-model="queryParams.fhsj"
          placeholder="请输入复核时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结案时间" prop="jasj">
        <el-input
          v-model="queryParams.jasj"
          placeholder="请输入结案时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="整改期限" prop="zgqx">
        <el-input
          v-model="queryParams.zgqx"
          placeholder="请输入整改期限"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="案件待处理图片" prop="cgDImgs">
        <el-input
          v-model="queryParams.cgDImgs"
          placeholder="请输入案件待处理图片"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="案件已处理图片" prop="cdYImgs">
        <el-input
          v-model="queryParams.cdYImgs"
          placeholder="请输入案件已处理图片"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="案件处理结果" prop="cdYTxt">
        <el-input
          v-model="queryParams.cdYTxt"
          placeholder="请输入案件处理结果"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="案件结算结果" prop="cdJTxt">
        <el-input
          v-model="queryParams.cdJTxt"
          placeholder="请输入案件结算结果"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="案件结算时间" prop="cdJTime">
        <el-date-picker clearable
          v-model="queryParams.cdJTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择案件结算时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="处理队ID" prop="cgCld">
        <el-input
          v-model="queryParams.cgCld"
          placeholder="请输入处理队ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理人ID" prop="cgClr">
        <el-input
          v-model="queryParams.cgClr"
          placeholder="请输入处理人ID"
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
          v-hasPermi="['CgDsfcpptxt:CgDsfcpptxt:add']"
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
          v-hasPermi="['CgDsfcpptxt:CgDsfcpptxt:edit']"
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
          v-hasPermi="['CgDsfcpptxt:CgDsfcpptxt:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['CgDsfcpptxt:CgDsfcpptxt:export']"
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

    <el-table v-loading="loading" :data="CgDsfcpptxtList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="编号" align="center" prop="code" />
      <el-table-column label="次数" align="center" prop="frequency" />
      <el-table-column label="上次案件编号" align="center" prop="upCode" />
      <el-table-column label="所属街办" align="center" prop="ssjb" />
      <el-table-column label="测评类型" align="center" prop="cplx" />
      <el-table-column label="测评内容" align="center" prop="cpnr" />
      <el-table-column label="应扣分值" align="center" prop="ykfz" />
      <el-table-column label="位置" align="center" prop="wz" />
      <el-table-column label="状态" align="center" prop="zt" />
      <el-table-column label="转办时间" align="center" prop="zbsj" />
      <el-table-column label="整改情况" align="center" prop="zgqk" />
      <el-table-column label="整改时间" align="center" prop="zgsj" />
      <el-table-column label="复核时间" align="center" prop="fhsj" />
      <el-table-column label="结案时间" align="center" prop="jasj" />
      <el-table-column label="整改期限" align="center" prop="zgqx" />
	  
	  
	  
	  <el-table-column label="案件待处理图片" align="center" prop="cgDImgs" width="100">
	  	<template slot-scope="scope">
	  		<image-preview :src="scope.row.cgDImgs" :width="50" :height="50" />
	  	</template>
	  </el-table-column>
	  
	  
      <el-table-column label="案件已处理图片" align="center" prop="cdYImgs" />
      <el-table-column label="案件处理结果" align="center" prop="cdYTxt" />
      <el-table-column label="案件结算结果" align="center" prop="cdJTxt" />
      <el-table-column label="案件结算时间" align="center" prop="cdJTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.cdJTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理队ID" align="center" prop="cgCld" />
      <el-table-column label="处理人ID" align="center" prop="cgClr" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['CgDsfcpptxt:CgDsfcpptxt:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['CgDsfcpptxt:CgDsfcpptxt:remove']"
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

    <!-- 添加或修改第三方测评平台系统对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="编号" prop="code">
          <el-input v-model="form.code" placeholder="请输入编号" />
        </el-form-item>
        <el-form-item label="次数" prop="frequency">
          <el-input v-model="form.frequency" placeholder="请输入次数" />
        </el-form-item>
        <el-form-item label="上次案件编号" prop="upCode">
          <el-input v-model="form.upCode" placeholder="请输入上次案件编号" />
        </el-form-item>
        <el-form-item label="所属街办" prop="ssjb">
          <el-input v-model="form.ssjb" placeholder="请输入所属街办" />
        </el-form-item>
        <el-form-item label="测评类型" prop="cplx">
          <el-input v-model="form.cplx" placeholder="请输入测评类型" />
        </el-form-item>
        <el-form-item label="测评内容" prop="cpnr">
          <el-input v-model="form.cpnr" placeholder="请输入测评内容" />
        </el-form-item>
        <el-form-item label="应扣分值" prop="ykfz">
          <el-input v-model="form.ykfz" placeholder="请输入应扣分值" />
        </el-form-item>
        <el-form-item label="位置" prop="wz">
          <el-input v-model="form.wz" placeholder="请输入位置" />
        </el-form-item>
        <el-form-item label="状态" prop="zt">
          <el-input v-model="form.zt" placeholder="请输入状态" />
        </el-form-item>
        <el-form-item label="转办时间" prop="zbsj">
          <el-input v-model="form.zbsj" placeholder="请输入转办时间" />
        </el-form-item>
        <el-form-item label="整改情况" prop="zgqk">
          <el-input v-model="form.zgqk" placeholder="请输入整改情况" />
        </el-form-item>
        <el-form-item label="整改时间" prop="zgsj">
          <el-input v-model="form.zgsj" placeholder="请输入整改时间" />
        </el-form-item>
        <el-form-item label="复核时间" prop="fhsj">
          <el-input v-model="form.fhsj" placeholder="请输入复核时间" />
        </el-form-item>
        <el-form-item label="结案时间" prop="jasj">
          <el-input v-model="form.jasj" placeholder="请输入结案时间" />
        </el-form-item>
        <el-form-item label="整改期限" prop="zgqx">
          <el-input v-model="form.zgqx" placeholder="请输入整改期限" />
        </el-form-item>
        <el-form-item label="案件待处理图片" prop="cgDImgs">
          <el-input v-model="form.cgDImgs" placeholder="请输入案件待处理图片" />
        </el-form-item>
        <el-form-item label="案件已处理图片" prop="cdYImgs">
          <el-input v-model="form.cdYImgs" placeholder="请输入案件已处理图片" />
        </el-form-item>
        <el-form-item label="案件处理结果" prop="cdYTxt">
          <el-input v-model="form.cdYTxt" placeholder="请输入案件处理结果" />
        </el-form-item>
        <el-form-item label="案件结算结果" prop="cdJTxt">
          <el-input v-model="form.cdJTxt" placeholder="请输入案件结算结果" />
        </el-form-item>
        <el-form-item label="案件结算时间" prop="cdJTime">
          <el-date-picker clearable
            v-model="form.cdJTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择案件结算时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理队ID" prop="cgCld">
          <el-input v-model="form.cgCld" placeholder="请输入处理队ID" />
        </el-form-item>
        <el-form-item label="处理人ID" prop="cgClr">
          <el-input v-model="form.cgClr" placeholder="请输入处理人ID" />
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
import { listCgDsfcpptxt, getCgDsfcpptxt, 
delCgDsfcpptxt, addCgDsfcpptxt, updateCgDsfcpptxt,importTemplate } from "@/api/CgDsfcpptxt/CgDsfcpptxt";

import { getToken } from "@/utils/auth";


export default {
  name: "CgDsfcpptxt",
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
	  url: process.env.VUE_APP_BASE_API + "/CgDsfcpptxt/CgDsfcpptxt/importData"
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
      // 第三方测评平台系统表格数据
      CgDsfcpptxtList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        code: null,
        frequency: null,
        upCode: null,
        ssjb: null,
        cplx: null,
        cpnr: null,
        // ykfz: null,
        wz: null,
        zt: null,
        zbsj: null,
        zgqk: null,
        zgsj: null,
        fhsj: null,
        jasj: null,
        zgqx: null,
        cgDImgs: null,
        cdYImgs: null,
        cdYTxt: null,
        cdJTxt: null,
        cdJTime: null,
        cgCld: null,
        cgClr: null,
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
    /** 查询第三方测评平台系统列表 */
    getList() {
      this.loading = true;
      listCgDsfcpptxt(this.queryParams).then(response => {
        this.CgDsfcpptxtList = response.rows;
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
        code: null,
        frequency: null,
        upCode: null,
        ssjb: null,
        cplx: null,
        cpnr: null,
        ykfz: null,
        wz: null,
        zt: null,
        zbsj: null,
        zgqk: null,
        zgsj: null,
        fhsj: null,
        jasj: null,
        zgqx: null,
        cgDImgs: null,
        cdYImgs: null,
        cdYTxt: null,
        cdJTxt: null,
        cdJTime: null,
        cgCld: null,
        cgClr: null,
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
      this.title = "添加第三方测评平台系统";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCgDsfcpptxt(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改第三方测评平台系统";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCgDsfcpptxt(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCgDsfcpptxt(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除第三方测评平台系统编号为"' + ids + '"的数据项？').then(function() {
        return delCgDsfcpptxt(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('CgDsfcpptxt/CgDsfcpptxt/export', {
        ...this.queryParams
      }, `CgDsfcpptxt_${new Date().getTime()}.xlsx`)
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
