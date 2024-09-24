<!-- 这是地图组件 -->
<template>
	<div class="content">
		<div class="amap-wrapper">
			<div class="roww allline center_center">
				<div class="roww" style="width: 50%; margin-bottom: 20px">
					<el-select class="allline"
						@change="selChange"
						v-model="inputValue"
						filterable
						remote
						reserve-keyword
						placeholder="请输入关键词"
						:remote-method="getAddressList1"
						:loading="loading"
					>
						<el-option v-for="item in addressList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>

					<div style="width: 20px"></div>
					<el-button type="primary" v-if="polygons.length>0" 
					@click.stop="tijiaoInput(polygons[0],1)">提交围栏</el-button>
					
					
					<el-button type="primary" v-if="circles.length>0"
					@click.stop="tijiaoInput(circles[0],2)"
					>提交围栏</el-button>
				</div>
			</div>
			<!--
      amap-manager： 地图管理对象
      vid：地图容器节点的ID
      zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默
              认范围[3-19]，取值范围[3-19]
      center： 地图中心点坐标值
      plugin：地图使用的插件
      events： 事件
      -->
			<el-amap ref="map" vid="amapDemo" class="amap-box" :zoom="zoom" :center="center" :events="events" :plugin="plugin">
				<!--  :map-style="mapStyle" -->
				<!-- 多边形 -->
				<el-amap-polygon
					v-for="(polygon, index) in polygons"
					:key="'polygons' + index"
					:ref="`polygon_${index}`"
					:vid="index"
					:path="polygon.path"
					:draggable="polygon.draggable"
					stroke-style="dashed"
					stroke-color="#FF0000"
					stroke-weight="1"
					fill-opacity="0.5"
					fill-color="#FF0000"
					:events="polygon.events"
				/>

				<!-- 圆形 -->
				<el-amap-circle
					v-for="(circle, index) in circles"
					:key="'circles' + index"
					:ref="`circle_${index}`"
					editable="true"
					:vid="index"
					:center="circle.center"
					:radius="circle.radius"
					fill-opacity="0.5"
					fill-color="#FF0000"
					stroke-style="dashed"
					stroke-color="#FF0000"
					stroke-weight="1"
					:events="circle.events"
				/>
				<!-- <el-amap-polyline :editable="polyline.editable" :path="polyline.path" :events="polyline.events" /> -->

				<!-- 点标记在地图上显示的位置，默认为地图中心点， -->
				<el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :label="marker.label" :icon="marker.icon" />
			</el-amap>
		</div>

		
		
		
		
		
		<div style="width: 290px;position: absolute; top: 20px;left:20px">
		  <el-card class="box-card">
		    <el-table :data="circles" border  style="width: 100%" height="150px">
		      <el-table-column align="center" label="圆形围栏">
		        <template slot-scope="scope">
		          <div v-if="scope.row.isEdit">{{ scope.row.areaName }}</div>
		          <div v-else>
		            <el-input v-model="scope.row.areaName " />
		          </div>
		        </template>
		      </el-table-column>
		      <el-table-column align="center" label="操作" width="85">
		        <template slot-scope="scope">
		          <el-button type="text" size="small" 
				  @click="editCircle(scope.$index)">{{ scope.row.isEdit?'编辑':"结束" }}</el-button>
		          <!-- <el-button type="text" size="small" @click="finishCircle(scope.$index)">结束</el-button> -->
		          <el-button type="text" size="small"
				   @click="delCircle(scope.$index)">删除</el-button>
		        </template>
		      </el-table-column>
		    </el-table>
		  </el-card>
		</div>
		<div style="width: 290px;position: absolute; top: 260px;left:20px">
		  <el-card class="box-card">
		    <el-table :data="polygons" border size="mini" style="width: 100%" height="150px">
		      <el-table-column align="center" label="多边形围栏">
		        <template slot-scope="scope">
		          <div v-if="scope.row.isEdit">{{ scope.row.areaName }}</div>
		          <div v-else>
		            <el-input v-model="scope.row.areaName " />
		          </div>
		        </template>
		      </el-table-column>
		      <el-table-column align="center" label="操作" width="85">
		        <template slot-scope="scope">
		          <el-button type="text" size="small" @click="editPolygon(scope.$index)">{{ scope.row.isEdit?'编辑':"结束" }}</el-button>
		          <el-button type="text" size="small" @click="delPolygon(scope.$index)">删除</el-button>
		        </template>
		      </el-table-column>
		    </el-table>
		  </el-card>
		</div>


	
	

		<div 
		class="imgBg" style="margin-top: 10px; position: absolute; top: 10px; right: 20px; z-index: 999999999"
		v-if="circles.length<=0&&polygons.length<=0"
		>
			<div>
				<!-- 多边形 -->
				<img src="@/assets/map/ploybg.png"
				 style="width: 30px; height: 30px; cursor: pointer" 
				@click="addArea" />
			</div>
			<div>
				<!-- 圆形 -->
				<img src="@/assets/map/circlebg.png" style="width: 30px; height: 30px; cursor: pointer" 
				@click="addCirle" />
			</div>
			
		</div>
		
		
		
		
		
		
		
		<!-- <div style="height: 130px;"></div>
		<el-table :data="circles" border size="mini" style="width: 100%" >
			<el-table-column align="center" label="圆形围栏">
				<template slot-scope="scope">
					<div v-if="scope.row.isEdit">{{ scope.row.areaName }}</div>
					<div v-else>
						<el-input v-model="scope.row.areaName" />
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="85">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="editCircle(scope.$index)">{{ scope.row.isEdit ? '编辑' : '结束' }}</el-button>
					<el-button type="text" size="small" @click="delCircle(scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-table :data="polygons" border size="mini" style="width: 100%" >
			<el-table-column align="center" label="多边形围栏">
				<template slot-scope="scope">
					<div v-if="scope.row.isEdit">{{ scope.row.areaName }}</div>
					<div v-else>
						<el-input v-model="scope.row.areaName" />
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="85">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="editPolygon(scope.$index)">{{ scope.row.isEdit ? '编辑' : '结束' }}</el-button>
					<el-button type="text" size="small" @click="delPolygon(scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table> -->
		
		<!-- <el-table
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column
		        prop="shiyongrenqun"
		        label="使用人群"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="type"
		        label="类型"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="address"
		        label="地址">
		      </el-table-column>
			  
			  <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
			    <template slot-scope="scope">
			      <el-button
			        size="mini"
			        type="text"
			        icon="el-icon-edit"
			        @click="xuanranditu(scope.row)"
			      >上地图</el-button>
			    </template>
			  </el-table-column>
			  
			  
		    </el-table> -->
		
		
	</div>
</template>
<script>
import { AMapManager } from 'vue-amap';

import { getAddressList } from '@/api/utils/utils';

import axao from '@/utils/axao';
export default {
	props: {
		path: {
			type: Array,
			default: () => {
				return [];
			}
		},
		yuanPath:{
			type: Object,
			default: () => {
				return null;
			}
		},
		mapType:{
			type: Number,
			default: () => {
				return null;
			}
		},
		amapPath: {
			type: Array,
			default: () => {
				return [];
			}
		},
		name: {
			type: String,
			default: () => {
				return '';
			}
		}
	},
	data() {
		return {
			center: [117.106061,36.748924], // 地图中心点坐标
			marker: {
				// 标点的图标
				icon: require('@/assets/map/position.png'),
				draggable: true,
				//   position: [118.054927, 36.813487], //坐标
				position: [117.106061, 36.748924], // 坐标
				label: { content: '', offset: [-15, -40] },
				events: {
					click: (e) => {
						console.log('点击maker', e);
						// this.marker.position = [e.lnglat.lng,e.lnglat.lat];
						// this.$forceUpdate()
					},
					// 点标记拖拽移动结束触发事件
					dragend: (e) => {
						console.log('---event---: dragend', e);
						this.marker.position = [e.lnglat.lng, e.lnglat.lat];
					}
				}
			},
			// mapStyle: 'amap://styles/8b6be8ec497009e17a708205348b899a', // 设置地图样式
			isEdit: false,
			pIdx: 0,
			zoom: 17,
			events: {
				init: (o) => {
					console.log('此u撒', o);
				},
				click: (e) => {
					console.log('此u撒', e);
					this.marker.position = [e.lnglat.lng,e.lnglat.lat];
					// const { lng, lat } = e.lnglat
					// if (_this.isDraw) {
					//   const arr = [e.lnglat.lng, e.lnglat.lat]
					//   _this.polygons[_this.pIdx].path.push(arr)
					// }
				}
			},
			// 多边形
			polygons: [],
			// 圆形
			circles: [],
			polygonEditor: [],
			circleEditor: [],
			isDraw: false,
			plugin: [
				// 'ToolBar',
				// 'Scale',
				// 'PlaceSearch',
				// 'OverView',
				// 'MapType',
				// 'DistrictSearch',
				// 'CitySearch',
				// 'Autocomplete',
				// 'PolyEditor',
				{
					pName: 'Geolocation',
					enableHighAccuracy: true, // 是否使用高精度定位，默认:true
					//   timeout: 100, // 超过10秒后停止定位，默认：无穷大
					maximumAge: 0, // 定位结果缓存0毫秒，默认：0
					convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
					showButton: true, // 显示定位按钮，默认：true
					buttonPosition: 'RB', // 定位按钮停靠位置，默认：'LB'，左下角
					showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
					showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
					extensions: 'all'
				}
			],

			addressList: [],
			loading: false,
			// 十九入库昂
			inputValue: '',
			
			
			
			  tableData: [{
					path: [
						{ Q: 39.92072, R: 116.407715, lng: 116.407715, lat: 39.92072 },
						{ Q: 39.92072, R: 116.40671500000002, lng: 116.406715, lat: 39.92072 },
						{ Q: 39.91972, R: 116.40671500000002, lng: 116.406715, lat: 39.91972 },
						{ Q: 39.91972, R: 116.407715, lng: 116.407715, lat: 39.91972 }
					],
					draggable: true,
					areaName: '默认围栏',
					'shiyongrenqun':'队长',
					isEdit: false,
					type:'多边形',
					events: {}
				},
				{
					path: [
						{ Q: 39.920173, R: 116.41250000000002, lng: 116.4125, lat: 39.920173 },
						{ Q: 39.920173, R: 116.41149999999999, lng: 116.4115, lat: 39.920173 },
						{ Q: 39.919173, R: 116.41149999999999, lng: 116.4115, lat: 39.919173 },
						{ Q: 39.919173, R: 116.41250000000002, lng: 116.4125, lat: 39.919173 }
					],
					draggable: true,
					areaName: '默认围栏',
					'shiyongrenqun':'队员',
					isEdit: false,
					type:'多边形',
					events: {}
				},
				{
					path: [
						{ Q: 39.919523, R: 116.40872300000001, lng: 116.408723, lat: 39.919523 },
						{ Q: 39.919523, R: 116.40772300000003, lng: 116.407723, lat: 39.919523 },
						{ Q: 39.918523, R: 116.40772300000003, lng: 116.407723, lat: 39.918523 },
						{ Q: 39.918523, R: 116.40872300000001, lng: 116.408723, lat: 39.918523 }
					],
					draggable: true,
					areaName: '默认围栏',
					'shiyongrenqun':'环卫工人1',
					type:'多边形',
					isEdit: false,
					events: {}
				},
				{
					path: [
						[116.411003, 39.919445],
						[116.410003, 39.919445],
						[116.410003, 39.918445],
						[116.411003, 39.918445]
					],
					draggable: false,
					areaName: '默认围栏',
					'shiyongrenqun':'环卫工人2',
					isEdit: false,
					type:'多边形',
					events: {}
				}]
		};
	},
	mounted() {
		if(this.amapPath.length>0){
			this.center=this.amapPath[0];
			this.marker.position=this.amapPath[0];
			if(this.mapType==1){
				this.initaddArea();
			}
		}
		if(this.yuanPath&&this.mapType==2 ){
			this.center=this.yuanPath.center.split(",");
			this.initaddCirle()
		}
	},
	methods: {
		

		//提交【丕
		tijiaoInput(item,type){
			if(!item.isEdit){
				this.$modal.msgError("请先完成编辑");
				return false;
			}
				this.$emit("submitWeilan",{'info':item,'type':type} );
			
		},
		
		selChange(res) {
			for (var a = 0; a < this.addressList.length; a++) {
				if (res == this.addressList[a].id) {
					this.setBiaojidian(this.addressList[a]);
				}
			}
		},
		setBiaojidian(item) {
			this.center = [item.location.lng, item.location.lat];
			this.marker = {
				// 标点的图标
				icon: require('@/assets/map/position.png'),
				draggable: true,
				//   position: [118.054927, 36.813487], //坐标
				position: [item.location.lng, item.location.lat], // 坐标
				label: { content: item.name, offset: [-15, -40] },
				events: {
					click: (e) => {
						console.log('点击maker', e);
						this.marker = null;
					},
					dragend: (e) => {
						console.log('---event---: dragend', e);
						this.marker.position = [e.lnglat.lng, e.lnglat.lat];
					}
				}
			};
		},
		// 通过经纬度获取地理位置
		getAddressList1(res) {
			this.loading = true;
			var keywords = res;
			AMap.plugin('AMap.PlaceSearch', () => {
				var autoOptions = {
					city: '济南'
				};
				var placeSearch = new AMap.PlaceSearch(autoOptions);
				placeSearch.search(keywords, (status, result) => {
					console.log('---', status, '---', result);
					if (result.poiList) {
						this.addressList = result.poiList.pois;
						this.loading = false;
					}
				});
			});
		},

		// 清除数据
		clearAllMap() {
			this.polygons = [];
			// 圆形
			this.circles = [];
			this.polygonEditor = [];
			this.circleEditor = [];
			if (this.$refs.map.$$getInstance()) {
				// 移除覆盖物
				this.$refs.map.$$getInstance().remove(['circle', 'polygon']);
			}
			this.center = [116.41, 39.92]; // 地图中心点坐标
			this.marker.position = [116.41, 39.92]; // 标点坐标
		},
		// 用于外部调用，改变标点的
		changeLocation(location, formattedAddress) {
			this.center = [location.split(',')[0], location.split(',')[1]];
			this.marker.position = [location.split(',')[0], location.split(',')[1]];
			// this.marker.label = {
			//   content: formattedAddress,
			//   offset: [-50, -40]
			// }
			console.log(this.marker);
		},
		//  编辑多边形
		editPolygon(index) {
			if (this.polygons[index].isEdit) {
				setTimeout(() => {
					this.polygons[index].draggable = true;
					const vm = this;
					const map = vm.$refs.map.$$getInstance();
					const polygon = vm.$refs['polygon_' + index][0].$$getInstance();
					// 缩放地图到合适的视野级别
					map.setFitView([polygon]);
					// 构造圆形编辑对象，并开启圆形的编辑状态
					const polygonEditor = new AMap.PolyEditor(map, polygon);

					const res = this.polygonEditor.filter((item) => item.num === index);
					// 说明没有，那就添加
					if (res.length === 0) {
						this.polygonEditor.push({
							num: index,
							obj: polygonEditor
						});
					} else {
						// 替换
						this.polygonEditor[index] = {
							num: index,
							obj: polygonEditor
						};
					}
					// console.log(this.polygonEditor)

					polygonEditor.open();
					this.polygons[index].isEdit = false;
				}, 200);
			} else {
				this.finishPolygon(index);
				this.polygons[index].isEdit = true;
			}
		},
		// 结束编辑多边形
		finishPolygon(index) {
			this.polygons[index].draggable = false;
			// 结束编辑多边形的时候赋值
			console.log(this.$refs['polygon_' + index][0].$$getPath());
			this.polygons[index].path = this.$refs['polygon_' + index][0].$$getPath();
			console.log('便捷式', JSON.stringify(this.polygons));
			this.polygonEditor.map((o) => {
				if (o.num === index) {
					o.obj.close();
				}
			});
		},
		// 删除多边形
		delPolygon(index) {
			this.$confirm('此操作将删除该围栏, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				// 结束编辑
				this.finishPolygon(index);
				// 删除
				this.polygons.splice(index, 1);
				this.polygonEditor.map((item, index1) => {
					if (item.num === index) {
						this.polygonEditor.splice(index1, 1);
					}
				});
			});
		},

		// 编辑圆形
		editCircle(index) {
			if (this.circles[index].isEdit) {
				// 去除样式
				const vm = this;
				const map = vm.$refs.map.$$getInstance();
				// 编辑选中的圆形
				setTimeout(() => {
					const circle = vm.$refs['circle_' + index][0].$$getInstance();
					// 缩放地图到合适的视野级别
					map.setFitView([circle]);
					// 构造圆形编辑对象，并开启圆形的编辑状态
					const circleEditor = new AMap.CircleEditor(map, circle);
					if (this.circleEditor.length === 0) {
						this.circleEditor.push({
							num: index,
							obj: circleEditor
						});
					}
					const res = this.circleEditor.filter((item) => item.num === index);
					// 说明没有，那就添加
					if (res.length === 0) {
						this.circleEditor.push({
							num: index,
							obj: circleEditor
						});
					} else {
						// 替换
						this.circleEditor[index] = {
							num: index,
							obj: circleEditor
						};
					}
					console.log(this.circleEditor);

					circleEditor.on('move', (event) => {
						// 实时修改圆的中心坐标
						this.circles[index].center = [event.lnglat.lng, event.lnglat.lat];
						console.log('触发事件：move');
					});

					circleEditor.on('adjust', (event) => {
						// 实时修改圆的半径
						this.circles[index].radius = event.radius;
						console.log('触发事件：adjust');
					});

					circleEditor.on('end', (event) => {
						console.log('触发事件： end',this.circles);
					});
					this.circles[index].isEdit = false;
					circleEditor.open();
				}, 200);
			} else {
				this.finishCircle(index);
				this.circles[index].isEdit = true;
			}
		},
		// 结束编辑圆形
		finishCircle(index) {
			this.circleEditor.map((o) => {
				if (o.num === index) {
					o.obj.close();
				}
			});
		},
		// 删除圆形
		delCircle(index) {
			this.$confirm('此操作将删除该围栏, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				// 结束编辑
				this.finishCircle(index);
				// 删除
				this.circles.splice(index, 1);
				this.circleEditor.map((item, index1) => {
					if (item.num === index) {
						this.circleEditor.splice(index1, 1);
					}
				});
			});
		},
		// 添加圆形
		addCirle() {
			// 默认添加一个圆形的电子围栏

			const obj = {
				center: this.marker.position,
				radius: 100,
				isEdit: true,
				areaName: '默认围栏',
				events: {
					click: () => {
						console.log('圆形');
					}
				}
			};

			console.log('添加圆形', obj, this.marker.position);
			this.circles.push(obj);
		},
		// 添加多边形区域
		addArea() {
			// 默认添加一个多边形的电子围栏
			const initDate = this.marker.position;
			console.log('添加多边形', initDate);
			const obj = {
				path: [
					[initDate[0], initDate[1]],
					[initDate[0] - 0.001, initDate[1]],
					[initDate[0] - 0.001, initDate[1] - 0.001],
					[initDate[0], initDate[1] - 0.001]
				],
				draggable: false,
				areaName: '默认围栏',
				isEdit: true,
				events: {
					click(e) {
					}
				}
			};
			console.log('moren', obj);
			this.polygons.push(obj);
		},
		
		initaddArea() {
			// 默认添加一个多边形的电子围栏
			
			const initDate = this.marker.position;
			console.log('添加多边形', initDate);
			const obj = {
				path:this.amapPath,
				draggable: false,
				areaName: '默认围栏',
				isEdit: true,
				events: {
					click(e) {
						//  _this.clickEdit(_this, this)
					}
				}
			};
			console.log('moren', obj);
			this.polygons.push(obj);
		},
		initaddCirle() {
			// 默认添加一个圆形的电子围栏
			const obj = {
				center: this.yuanPath.center.split(","),
				radius: this.yuanPath.radius,
				isEdit: true,
				areaName: '默认围栏',
				events: {
					click: () => {
						console.log('圆形');
					}
				}
			};
		
			console.log('添加圆形', obj, this.marker.position);
			this.circles.push(obj);
		},
		
		// 获取地图上的覆盖物
		// getAllOverlays() {
		//   const vm = this
		//   const map = vm.$refs.map.$$getInstance()
		//   console.log(map.getAllOverlays('circle'))
		//   console.log(map.getAllOverlays('polygon'))
		// }
	}
};
</script>
<style scoped lang="scss">
.search-box {
	position: absolute;
	top: 25px;
	left: 20px;
}
.amap-wrapper {
	width: 100%;
	height: 700px;  
	position: relative;
}

/* 图标大小修改 */
.amap-wrapper ::v-deep .amap-icon img {
	max-width: 2rem !important;
	max-height: 2rem !important;
}

// .amap-wrapper ::v-deep .amap-marker-label {
//   width: 65px !important;
//   text-align: center !important;
//   overflow: hidden !important;
//   text-overflow: ellipsis !important;
//   white-space: nowrap !important;
// }

.amap-wrapper ::v-deep .amap-marker-label {
	position: absolute;
	z-index: 2;
	border: 1px solid #1890ff;
	background-color: white;
	white-space: nowrap;
	cursor: default;
	padding: 8px;
	font-size: 10px;
	line-height: 12px;
	border-radius: 16px;
}

.box-card ::v-deep .el-card__body {
	padding: 10px;
}

.box-card ::v-deep .el-table .el-table__header-wrapper th,
.el-table .el-table__fixed-header-wrapper th {
	line-height: 8px !important;
}
</style>