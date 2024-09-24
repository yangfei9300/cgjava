<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="地理围栏名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入地理围栏名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择类型" clearable>
          <el-option
            v-for="dict in dict.type.cg_dizhiweilan_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
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
          v-hasPermi="['CgGeographicFence:CgGeographicFence:add']"
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
          v-hasPermi="['CgGeographicFence:CgGeographicFence:edit']"
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
          v-hasPermi="['CgGeographicFence:CgGeographicFence:remove']"
        >删除</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['CgGeographicFence:CgGeographicFence:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="CgGeographicFenceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="地理围栏名称" align="center" prop="name" />
	  <el-table-column label="类型" align="center" prop="type">
	    <template slot-scope="scope">
	      <dict-tag :options="dict.type.cg_dizhiweilan_type" :value="scope.row.type"/>
	    </template>
	  </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
     
      <el-table-column label="地理围栏信息" align="center" prop="info" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['CgGeographicFence:CgGeographicFence:edit']"
          >修改</el-button>
         <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['CgGeographicFence:CgGeographicFence:remove']"
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

    <!-- 添加或修改地址围栏对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="70%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
       
        <el-form-item label="地理围栏名称" label-width="100px" prop="name">
          <el-input v-model="form.name" placeholder="请输入地理围栏名称" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select disabled v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="dict in dict.type.cg_dizhiweilan_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地理围栏信息" prop="info">
          <div class="roww">
			  <el-input class="allline" type="textarea" 
			  v-model="form.info"  placeholder="请输入内容" />
			  <div style="width: 20px;"></div>
			  <div style="color: blue;" 
			  @click="cancelMap">
				  {{form.id?'重新画围栏':'打开地图'}}
			  </div>
		  </div>
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
	
	
	<el-dialog title="画围栏" :visible.sync="openAlert"
	width="90%" fullscreen append-to-body>
	  <Amap v-if="openAlert" 
	  :amapPath="amapPath" 
	  :mapType='mapType'
	  :yuanPath="yuanPath"
	  @submitWeilan="submitWeilan" ref="Amap"></Amap>
	  <!-- <div slot="footer" class="dialog-footer">
	    <el-button type="primary" @click="submitFormMap">确 定</el-button>
	    <el-button @click="cancelMap">取 消</el-button>
	  </div> -->
	</el-dialog>
	
	
  </div>
</template>

<script>
import { listCgGeographicFence,
 getCgGeographicFence, delCgGeographicFence, 
 addCgGeographicFence, updateCgGeographicFence } from "@/api/CgGeographicFence/CgGeographicFence";
import Amap from '@/components/Amap'
export default {
	components: {
	  Amap
	},
  name: "CgGeographicFence",
  dicts: ['cg_dizhiweilan_type'],
  data() {
    return {
		amapPath:[],
		mapType:null,
		yuanPath:null,
		
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
      // 地址围栏表格数据
      CgGeographicFenceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        type: null,
        info: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
	  
	  
	  openAlert:false,//对话框
    };
  },
  created() {
    this.getList();
  },
  methods: {
	  // 围栏提交的回调
	  submitWeilan(item){
		  console.log("围栏信息ii叫的",item);
		  this.openAlert=false;
		  this.form.type=item.type;
		  if(item.type==1){
			  var list=item.info.path;
			  var listn=[];
			  for(var a=0;a<list.length;a++){
				  if(list.length>0){
					  var obg=[list[a].lng,list[a].lat];
					  listn.push(obg);
				  }
			  }
			  item.info.path=listn;
			  var str="";
			  for(var a=0;a<listn.length;a++){
				  if(a==(listn.length-1)){
					  str=str+JSON.stringify(listn[a]);
				  }else{
					  str=str+JSON.stringify(listn[a])+";";
				  }
			  }
			  this.form.info="["+str+"]";
		  }else{
			  console.log("原型围栏",item)
			  var obg={
				  areaName:item.info.areaName,
				  radius: item.info.radius,
				  lat:item.info.center[1],
				  lon:item.info.center[0],
				  center:item.info.center[0]+","+item.info.center[1]
			  }
			   this.form.info=JSON.stringify(obg);
		  }
		  this.$forceUpdate()
		 
	  },
	  // 地图弹窗确认
	  submitFormMap(){
		  
	  },
	  // 取消地图
	  cancelMap(){
		  
		  if(this.form.id&&this.form.type==1){
		  	var amapPath=this.form.info;
			amapPath=amapPath.replaceAll(";",",");
			amapPath=JSON.parse(amapPath)
			this.amapPath=amapPath;
			this.mapType=this.form.type;
		  }else if(this.form.id&&this.form.type==2){
		  	var amapPath=this.form.info;
			amapPath=JSON.parse(amapPath)
			this.yuanPath=amapPath;
			this.mapType=this.form.type;
		  }
		  
		  
		  
		  this.openAlert=!this.openAlert;
		  
	  },
	  
	  
	  
    /** 查询地址围栏列表 */
    getList() {
      this.loading = true;
      listCgGeographicFence(this.queryParams).then(response => {
        this.CgGeographicFenceList = response.rows;
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
        remark: null,
        type: null,
        info: null,
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
      this.title = "添加地址围栏";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCgGeographicFence(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改地址围栏";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCgGeographicFence(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCgGeographicFence(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除地址围栏编号为"' + ids + '"的数据项？').then(function() {
        return delCgGeographicFence(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('CgGeographicFence/CgGeographicFence/export', {
        ...this.queryParams
      }, `CgGeographicFence_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
