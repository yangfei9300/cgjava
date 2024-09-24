<template>
	<div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="date" label="日期" width="180"></el-table-column>
			<el-table-column prop="name" label="姓名" width="180"></el-table-column>
			<el-table-column prop="address" label="地址"></el-table-column>

			<el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button size="mini" type="text" icon="el-icon-edit" 
					@click="openAlertClick(scope.row)" v-hasPermi="['system:user:edit']">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<el-dialog title="画围栏" :visible.sync="openAlert" 
		width="90%" append-to-body>
		  <Amap ref="Amap"></Amap>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="submitForm">确 定</el-button>
		    <el-button @click="cancel">取 消</el-button>
		  </div>
		</el-dialog>
		
		
	</div>
</template>

<script>
import Amap from '@/components/Amap'
export default {
	components: {
	  Amap
	},
	data() {
		return {
			openAlert:true,
			form:{
				'uId':1
			},
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
			]
		};
	},
	methods: {
		openAlertClick(){
			this.openAlert=!this.openAlert;
		},
		submitForm() {
			
		},
		cancel:{
			
		},
	},
};
</script>

<style></style>
