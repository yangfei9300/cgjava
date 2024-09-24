<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      
	  <el-form-item label="身份类型" prop="isDz">
	  	<el-select v-model="queryParams.isDz" placeholder="请选择身份类型" clearable>
	  		<el-option v-for="dict in dict.type.cg_sflx" :key="dict.value" :label="dict.label" :value="dict.value" />
	  	</el-select>
	  </el-form-item>
	  
	  
	  
	  <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     <!-- <el-form-item label="密码" prop="password">
        <el-input
          v-model="queryParams.password"
          placeholder="请输入密码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="queryParams.email"
          placeholder="请输入邮箱"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
	  
	  <el-form-item label="选择队伍" prop="teamId">
	    <el-select v-model="queryParams.teamId" 
	  		placeholder="请选择队伍" clearable>
	      <el-option
	        v-for="dict in CgTeamList"
	        :key="dict.id"
	        :label="dict.tName"
	        :value="dict.id"
	      />
	    </el-select>
	  </el-form-item>
	  
	    <el-form-item label="社区ID" prop="shequId">
	          <el-input
	            v-model="queryParams.shequId"
	            placeholder="请输入社区ID"
	            clearable
	            @keyup.enter.native="handleQuery"
	          />
	        </el-form-item>
	        <el-form-item label="街道ID" prop="jiedaoId">
	          <el-input
	            v-model="queryParams.jiedaoId"
	            placeholder="请输入街道ID"
	            clearable
	            @keyup.enter.native="handleQuery"
	          />
	        </el-form-item>
	  
	  
     <!-- <el-form-item label="分" prop="fen">
        <el-input
          v-model="queryParams.fen"
          placeholder="请输入分"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
     <!-- <el-form-item label="早上上班时间" prop="workTimeZaoS">
        <el-input
          v-model="queryParams.workTimeZaoS"
          placeholder="请输入早上上班时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="早上下班时间" prop="workTimeZaoX">
        <el-input
          v-model="queryParams.workTimeZaoX"
          placeholder="请输入早上下班时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="下午上班时间" prop="workTimeXiaS">
        <el-date-picker clearable
          v-model="queryParams.workTimeXiaS"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择下午上班时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下午下班时间" prop="workTimeXiaX">
        <el-date-picker clearable
          v-model="queryParams.workTimeXiaX"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择下午下班时间">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="备注" prop="renark">
        <el-input
          v-model="queryParams.renark"
          placeholder="请输入备注"
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
          v-hasPermi="['CgUser:CgUser:add']"
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
          v-hasPermi="['CgUser:CgUser:edit']"
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
          v-hasPermi="['CgUser:CgUser:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['CgUser:CgUser:export']"
        >导出</el-button> -->
      </el-col>
	 <!-- <el-col :span="1.5">
	    <el-button
	      type="warning"
	      plain
	      icon="el-icon-download"
	      size="mini"
	      @click="tonewUserKaoqin"
	      v-hasPermi="['CgUser:CgUser:export']"
	    >生成考勤表</el-button>
	  </el-col> -->
	
	  
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="CgUserList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
	   
	   <el-table-column label="身份" align="center" prop="isDz">
	   	<template slot-scope="scope">
	   		<dict-tag :options="dict.type.cg_sflx" :value="scope.row.isDz" />
	   	</template>
	   </el-table-column>
	   
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="头像" align="center" prop="avatar" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.avatar" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" prop="phone" />
      <el-table-column label="密码" align="center" prop="password" />
      <el-table-column label="邮箱" align="center" prop="email" />
      <!-- <el-table-column label="分" align="center" prop="fen" /> -->
      <!-- <el-table-column label="类型" align="center" prop="uType" /> -->
      <el-table-column label="队" align="center" prop="params.ct_name" />
      <!-- <el-table-column label="是否" align="center" prop="isDz" /> -->
      <el-table-column label="上班区域ID" align="center" prop="params.area_name" />
      <el-table-column label="上班时刻" align="center" prop="params.work_name" />
      <!-- <el-table-column label="是否被禁用" align="center" prop="isJin" /> -->
     <!-- <el-table-column label="早上上班时间" align="center" prop="workTimeZaoS" />
      <el-table-column label="早上下班时间" align="center" prop="workTimeZaoX" />
      <el-table-column label="下午上班时间" align="center" prop="workTimeXiaS" width="180"> 
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workTimeXiaS, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下午下班时间" align="center" prop="workTimeXiaX" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workTimeXiaX, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>-->
      <!-- <el-table-column label="休息类型" align="center" prop="restType" /> -->
      <el-table-column label="备注" align="center" prop="renark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['CgUser:CgUser:edit']"
          >修改</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['CgUser:CgUser:remove']"
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

    <!-- 添加或修改用户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label-width="120px" label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label-width="120px"  label="头像" prop="avatar">
          <image-upload v-model="form.avatar"/>
        </el-form-item>
        <el-form-item label-width="120px"  label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label-width="120px"  label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label-width="120px"  label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
		
		<el-form-item label-width="120px"  label="选择队伍" prop="teamId">
		  <el-select style="width: 100%;" v-model="form.teamId" 
				placeholder="请选择队伍" clearable>
		    <el-option
		      v-for="dict in CgTeamList"
		      :key="dict.id"
		      :label="dict.tName"
		      :value="dict.id"
		    />
		  </el-select>
		</el-form-item>
		
		<el-form-item   label-width="120px"  label="身份类型" prop="isDz">
			<el-select style="width: 100%;" v-model="form.isDz" placeholder="请选择身份类型" clearable>
				<el-option v-for="dict in dict.type.cg_sflx" 
				:key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
			</el-select>
		</el-form-item>
		
		<el-form-item   label-width="120px"  label="选择上班区域" prop="areaId">
		  <el-select style="width: 100%;"  v-model="form.areaId" placeholder="选择上班区域">
		    <el-option
		      v-for="dict in CgGeographicFenceList"
		      :key="dict.id"
		      :label="dict.name"
		      :value="parseInt(dict.id)"
		    ></el-option>
		  </el-select>
		</el-form-item>
		
		 <el-form-item   label-width="120px"   label="街道" prop="jiedaoId">
		    <el-select style="width: 100%;"  v-model="form.jiedaoId" placeholder="请选择街道">
		        <el-option
		              v-for="dict in CgStreetList"
		              :key="dict.id"
		              :label="dict.name"
		              :value="parseInt(dict.id)"
		        ></el-option>
		    </el-select>
		</el-form-item>
		
		
		
       <!-- <el-form-item label="分" prop="fen">
          <el-input v-model="form.fen" placeholder="请输入分" />
        </el-form-item> -->
		
		<el-form-item label-width="120px"  label="选择上班时刻" prop="areaId">
		  <el-select style="width: 100%;" v-model="form.workTimeId" placeholder="选择上班时刻">
		    <el-option
		      v-for="dict in CgSchedulingList"
		      :key="dict.id"
		      :label="dict.name"
		      :value="parseInt(dict.id)"
		    ></el-option>
		  </el-select>
		</el-form-item>
		
		
        <!-- <el-form-item label="早上上班时间" prop="workTimeZaoS">
          <el-input v-model="form.workTimeZaoS" placeholder="请输入早上上班时间" />
        </el-form-item> -->
        <!-- <el-form-item label="早上下班时间" prop="workTimeZaoX">
          <el-input v-model="form.workTimeZaoX" placeholder="请输入早上下班时间" />
        </el-form-item>
        <el-form-item label="下午上班时间" prop="workTimeXiaS">
          <el-date-picker clearable
            v-model="form.workTimeXiaS"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择下午上班时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下午下班时间" prop="workTimeXiaX">
          <el-date-picker clearable
            v-model="form.workTimeXiaX"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择下午下班时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="renark">
          <el-input v-model="form.renark" placeholder="请输入备注" />
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
import { listCgUser,
 getCgUser, delCgUser, 
 addCgUser, 
 updateCgUser,
  tonewUserKaoqin
  } from "@/api/CgUser/CgUser";

import { listCgGeographicFence } from "@/api/CgGeographicFence/CgGeographicFence";
import { listCgScheduling} from "@/api/CgScheduling/CgScheduling";
import { listCgTeam } from "@/api/CgTeam/CgTeam";
import { listCgStreet} from "@/api/CgStreet/CgStreet";



// tonewUserKaoqin
export default {
  name: "CgUser",
	dicts: ['cg_sflx'],
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
      // 用户信息表格数据
      CgUserList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        avatar: null,
        phone: null,
        password: null,
        email: null,
        fen: null,
        uType: null,
        teamId: null,
        isDz: null,
		      shequId: null,
		        jiedaoId: null,
        areaId: null,
        isJin: null,
        workTimeZaoS: null,
        workTimeZaoX: null,
        workTimeXiaS: null,
        workTimeXiaX: null,
        restType: null,
        renark: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
		   name: [
		            { required: true, message: "姓名不能为空", trigger: "blur" }
		          ],
		          avatar: [
		            { required: true, message: "头像不能为空", trigger: "blur" }
		          ],
		          phone: [
		            { required: true, message: "手机号不能为空", trigger: "blur" }
		          ],
		          password: [
		            { required: true, message: "密码不能为空", trigger: "blur" }
		          ],
		          email: [
		            { required: true, message: "邮箱不能为空", trigger: "blur" }
		          ],
		          uType: [
		            { required: true, message: "类型：1.城管中队2.洒水车中队不能为空", trigger: "change" }
		          ],
		          teamId: [
		            { required: true, message: "队：属于哪个队伍(队伍ID)不能为空", trigger: "change" }
		          ],
		          areaId: [
		            { required: true, message: "上班区域ID不能为空", trigger: "change" }
		          ],
		          workTimeId: [
		            { required: true, message: "上班时间ID不能为空", trigger: "blur" }
		          ],
		          isDz: [
		            { required: true, message: "身份类型不能为空", trigger: "blur" }
		          ],
      },
	  
	  CgGeographicFenceList:[],//区域列表
	  CgSchedulingList:[],//上班时刻表
	  CgTeamList:[],//队名
	  CgStreetList:[],//街道列表
    };
  },
  created() {
    this.getList();
	this.getQuyuList();
	this.getshikebiao();
	this.getTeamList()
	this.getListCgStreet();
  },
  methods: {
	  // 获取街道列表 
	  getListCgStreet(){
		  var data={
			  pageNum: 1,
			  pageSize: 1000,
		  }
		  listCgStreet(data).then(response => {
		    this.CgStreetList = response.rows;
		  });
	  },
	  getTeamList(){
		  var data={
			  pageNum: 1,
			  pageSize: 10000,
		  };
		  listCgTeam(data).then(response => {
		    this.CgTeamList = response.rows;
		  });
	  },
	  
	  
	  tonewUserKaoqin(){
		  // 
		  tonewUserKaoqin({'uId':2}).then(response => {
			console.log("申城考勤")
		  });
	  },
	  // 获取上班时间列表
	  getshikebiao(){
		  var data={
		  	pageNum: 1,
		  	pageSize: 1000,
		  }
		  listCgScheduling(data).then(response => {
		    this.CgSchedulingList = response.rows;
		  });
	  },
	  // 获取上班区域
	  getQuyuList(){
		  var data={
			  pageNum: 1,
			  pageSize: 1000,
		  }
		  listCgGeographicFence(data).then(response => {
		    this.CgGeographicFenceList = response.rows;
		  });
	  },
	  
    /** 查询用户信息列表 */
    getList() {
      this.loading = true;
      listCgUser(this.queryParams).then(response => {
        this.CgUserList = response.rows;
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
        avatar: null,
        phone: null,
        password: null,
        email: null,
        fen: null,
        uType: null,
        teamId: null,
        isDz: null,
		shequId: null,
		jiedaoId: null,
        areaId: null,
        isJin: null,
        workTimeZaoS: null,
        workTimeZaoX: null,
        workTimeXiaS: null,
        workTimeXiaX: null,
        restType: null,
        renark: null,
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
      this.title = "添加用户信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCgUser(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCgUser(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCgUser(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除用户信息编号为"' + ids + '"的数据项？').then(function() {
        return delCgUser(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('CgUser/CgUser/export', {
        ...this.queryParams
      }, `CgUser_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
