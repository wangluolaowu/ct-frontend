 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item label="充电桩ID" >
              <el-input v-model="searchBIN.chargePointId" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="充电桩编号" >
              <el-input v-model="searchBIN.chargePointNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="8">
            <el-form-item label="充电桩设计版本号" >
              <el-input v-model="searchBIN.designVersionNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="充电桩生产批次" >
              <el-input v-model="searchBIN.mfgLotNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
       <el-row>
        <el-col :span="8">
           <el-form-item label="充电桩服役时长" >
              <el-input v-model="searchBIN.totalServiceMileage" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="充电桩电脑MAC地址" >
              <el-input v-model="searchBIN.macAddress" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item label="充电桩IP地址" >
              <el-input v-model="searchBIN.ipAddress" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="额定电压范围" >
              <el-input v-model="searchBIN.ratedVoltageRange" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item label="额定电流范围" >
              <el-input v-model="searchBIN.ratedCurrentRange" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="当前电流范围" >
              <el-input v-model="searchBIN.curtCurrentRange" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>  
        <el-col :span="8">
           <el-form-item label="当前电压范围" >
              <el-input v-model="searchBIN.curtVoltageRange" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
           <el-form-item label="当前最大电流" >
              <el-input v-model="searchBIN.curtMaximumCurrent" style="width:200px"></el-input>
            </el-form-item>
        </el-col> 
        </el-row>
         <el-row>  
            <el-col :span="8">  
            <el-form-item label="页面大小" >
             <el-select placeholder="页面大小" v-model="searchBIN.pageSize" style="width:200px">
                <el-option
                v-for="item in $Enum.EnumSelect().page_size"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
                > 
              </el-option>
           </el-select>
            </el-form-item>
        </el-col> 
        <el-col :span="8">
            <el-form-item label="充电桩软件版本号" >
              <el-input v-model="searchBIN.softwareVersionNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col> 
         </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item label="充电桩服役开始时间起始日期" >
               <el-date-picker
                v-model="searchBIN.startTimeStartServiceDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="充电桩服役开始截止时间" >
               <el-date-picker
                v-model="searchBIN.endTimeStartServiceDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="最近一次维修时间开始日期" >
               <el-date-picker
                v-model="searchBIN.startTimeLatestRepairDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="最近一次维修时间截止日期" >
               <el-date-picker
                v-model="searchBIN.endTimeLatestRepairDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="最近一次保养时间开始日期" >
               <el-date-picker
                v-model="searchBIN.startTimeLatestMaintainDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="最近一次保养时间截止日期" >
               <el-date-picker
                v-model="searchBIN.endTimeLatestMaintainDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="8" >
          <el-form-item class='buttonGroups'>  
              <el-button type="primary" @click="loadData">查询</el-button>
              <el-button type="primary" @click="restData">清空</el-button>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
                <el-button type="primary" @click="add">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
         <el-table :data="userInfoList" style="width: 100%" border  height="500">
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
            <el-table-column prop="chargePointId" label="充电桩ID" fixed="left" >
            </el-table-column>
            <el-table-column prop="chargePointNum" label="充电桩编号" fixed="left" >
            </el-table-column>
             <el-table-column prop="softwareVersionNum" label="充电桩软件版本号" width="200">
            </el-table-column>
             <el-table-column prop="designVersionNum" label="充电桩设计版本号" width="200">
            </el-table-column>
             <el-table-column prop="mfgLotNum" label="充电桩生产批次" width="200">
            </el-table-column>
             <el-table-column prop="startServiceDate" label="充电桩服役开始时间" width="200">
                  <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.startServiceDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="totalServiceMileage" label="充电桩服役时长" width="200">
            </el-table-column>
             <el-table-column prop="macAddress" label="充电桩电脑MAC地址" width="200">
            </el-table-column>
             <el-table-column prop="kidIpAddress" label="充电桩电脑IP地址" width="200">
            </el-table-column>
             <el-table-column prop="latestMaintainDate" label="最近一次保养时间" width="200">
                  <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.latestMaintainDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="latestRepairDate" label="最近一次维修时间" width="200">
                  <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.latestRepairDate,true)}}
                      </template>
            </el-table-column>
              <el-table-column prop="ratedVoltageRange " label="额定电压范围" width="200"> 
            </el-table-column>
              <el-table-column prop="curtVoltageRange " label="当前电压范围" width="200"> 
            </el-table-column>
              <el-table-column prop="ratedCurrentRange " label="额定电流范围" width="200"> 
            </el-table-column>
             <el-table-column prop="curtCurrentRange " label="当前电流范围" width="200"> 
            </el-table-column>
             <el-table-column prop="curtMaximumCurrent " label="当前最大电流" width="200"> 
            </el-table-column>
             <el-table-column prop="descriptions " label="注释" width="200"> 
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column label="操作"  min-width="350" fixed="right">
 
                <template slot-scope="scope">
 
                     <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button>
 
                     <el-button type="text" @click="modifyInfo(scope.row)">修改</el-button>
  
                     <el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>
                  </template>
             </el-table-column>
             <!--编辑与增加的页面-->
         </el-table>
           <el-pagination v-if="searchBIN.totalRows>0" class="pagination" background @current-change="handleCurrentChangeBIN"
                        :current-page.sync="searchBIN.currentPage" :page-size="searchBIN.pageSize" :page-sizes="[searchBIN.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="searchBIN.totalRows">
          </el-pagination>
          <!--新增界面-->
         <el-dialog title="记录" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item prop="chargePointId" label="充电桩ID"> 
                    <el-input type="text" v-model="addFormData.chargePointId" placeholder="充电桩ID"></el-input>
                  </el-form-item>
                   <el-form-item prop="chargePointNum" label="充电桩编号">
                    <el-input type="text" v-model="addFormData.chargePointNum"  placeholder="充电桩编号"></el-input>
                  </el-form-item>
                   <el-form-item prop="softwareVersionNum" label="充电桩软件版本号">
                    <el-input type="text" v-model="addFormData.softwareVersionNum"  placeholder="充电桩软件版本号"></el-input>
                  </el-form-item>
                   <el-form-item prop="designVersionNum" label="充电桩设计版本号">
                    <el-input type="text" v-model="addFormData.designVersionNum"  placeholder="充电桩设计版本号"></el-input>
                  </el-form-item>
                   <el-form-item prop="mfgLotNum" label="充电桩生产批次" >
                    <el-input type="text" v-model="addFormData.mfgLotNum" placeholder="充电桩生产批次"></el-input>
                  </el-form-item>
                   <el-form-item prop="startServiceDate" label="充电桩服役开始时间">
                    <el-date-picker
                        v-model="addFormData.startServiceDate"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="请选择日期"
                        style="width:200px"
                        @change="handleChangeTime"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="totalServiceMileage" label="充电桩服役时长">
                    <el-input type="text" v-model="addFormData.totalServiceMileage" placeholder="充电桩服役时长"></el-input>
                  </el-form-item>
                  <el-form-item prop="macAddress" label="充电桩电脑MAC地址">
                    <el-input type="text" v-model="addFormData.macAddress" placeholder="充电桩电脑MAC地址"></el-input>
                  </el-form-item>
                  <el-form-item prop="kidIpAddress" label="充电桩电脑IP地址">
                    <el-input type="text" v-model="addFormData.kidIpAddress" placeholder="充电桩电脑IP地址"></el-input>
                  </el-form-item>
                 <el-form-item prop="latestMaintainDate" label="最近一次保养时间">
                     <el-date-picker
                        v-model="addFormData.latestMaintainDate"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="请选择日期"
                        style="width:200px"
                        @change="handleChangeTime"
                    ></el-date-picker>
                  </el-form-item>
                    <el-form-item prop="latestRepairDate" label="最近一次维修时间">
                        <el-date-picker
                        v-model="addFormData.latestRepairDate"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="请选择日期"
                        style="width:200px"
                        @change="handleChangeTime"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="ratedVoltageRange " label="额定电压范围"> 
                    <el-input type="text" v-model="addFormData.ratedVoltageRange" placeholder="额定电压范围"></el-input>
                  </el-form-item>
                  <el-form-item prop="curtVoltageRange " label="当前电压范围">
                    <el-input type="text" v-model="addFormData.curtVoltageRange" placeholder="当前电压范围"></el-input>
                  </el-form-item>
                  <el-form-item prop="ratedCurrentRange " label="额定电流范围">
                    <el-input type="text" v-model="addFormData.ratedCurrentRange" placeholder="额定电流范围"></el-input>
                  </el-form-item>
                  <el-form-item prop="curtCurrentRange " label="当前电流范围">
                    <el-input type="text" v-model="addFormData.curtCurrentRange" placeholder="扫描当前电流范围枪型号"></el-input>
                  </el-form-item>
                  <el-form-item prop="curtMaximumCurrent " label="当前最大电流">
                    <el-input type="text" v-model="addFormData.curtMaximumCurrent" placeholder="当前最大电流"></el-input>
                  </el-form-item>
                    <el-form-item prop="descriptions " label="注释">
                    <el-input type="text" v-model="addFormData.descriptions" placeholder="注释"></el-input>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={chargePointId:'', chargePointNum:'',softwareVersionNum:'',designVersionNum:'',mfgLotNum:'',startServiceDate:'',totalServiceMileage:'',macAddress:'',kidIpAddress:'',latestMaintainDate:'',latestRepairDate:'',electronicTagsCount:'',projectorModelNumber:'',scanningGunModelNumber:'',ratedVoltageRange:'', curtVoltageRange:'', ratedCurrentRange:'', curtCurrentRange:'',  curtMaximumCurrent:'',descriptions:''}">取 消</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">确 定</el-button>
             </span>
          </el-dialog>
     </div>
  </template>
  
  <script>
    import axios from '../../../util/http'
    import qs from 'qs'
    export default {
      name: 'home',
      data() {
        return {
          userInfoList: [],
          addFormReadOnly: true,
          dialogVisible: false,
          isView: true,
          addFormData: {
             chargePointId:'', 
             chargePointNum:'',
             softwareVersionNum:'',
             designVersionNum:'',
             mfgLotNum:'',
             startServiceDate:'',
             totalServiceMileage:'',
             macAddress:'',
             kidIpAddress:'',
             latestMaintainDate:'',
             latestRepairDate:'',
             electronicTagsCount:'',
             projectorModelNumber:'',
             scanningGunModelNumber:'',
             ratedVoltageRange:'',
              curtVoltageRange:'',
               ratedCurrentRange:'',
                curtCurrentRange:'', 
                 curtMaximumCurrent,
                 descriptions:''
          },
          searchBIN: {
            chargePointId:'', 
             chargePointNum:'',
             softwareVersionNum:'',
             designVersionNum:'',
             mfgLotNum:'',
             totalServiceMileage:'',
             macAddress:'',
             kidIpAddress:'',
             electronicTagsCount:'',
             projectorModelNumber:'',
             scanningGunModelNumber:'',
             ratedVoltageRange:'',
              curtVoltageRange:'',
               ratedCurrentRange:'',
                curtCurrentRange:'', 
                 curtMaximumCurrent:'',
            startTimeStartServiceDate:'',
            endTimeStartServiceDate:'',
            startTimeLatestRepairDate:'',
            endTimeLatestRepairDate:'',
            startTimeLatestMaintainDate:'',
            endTimeLatestMaintainDate:'',
            currentPage:1,
            pageSize:50,
            totalRows:-1
          },
          addType:false,
          rules2: {
            username: [{
              required: true,
              message: '用户名不能为空',
              trigger: 'blur'
            }],
            password: [{
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            }]
          }
        }
      },
  mounted: function () {
        this.loadData()
      },
      methods: {
        handleChangeTime(){

        },
        handleCurrentChangeBIN(val){
            this.searchBIN.currentPage = val;
            this.loadData()
        },
        restData(){
            this.searchBIN = {
            chargePointId:'', 
             chargePointNum:'',
             softwareVersionNum:'',
             designVersionNum:'',
             mfgLotNum:'',
             totalServiceMileage:'',
             macAddress:'',
             kidIpAddress:'',
             electronicTagsCount:'',
             projectorModelNumber:'',
             scanningGunModelNumber:'',
             ratedVoltageRange:'',
              curtVoltageRange:'',
               ratedCurrentRange:'',
                curtCurrentRange:'', 
                 curtMaximumCurrent:'',
            startTimeStartServiceDate:'',
            endTimeStartServiceDate:'',
            startTimeLatestRepairDate:'',
            endTimeLatestRepairDate:'',
            startTimeLatestMaintainDate:'',
            endTimeLatestMaintainDate:''
          }
        }, 
        loadData() {
          let param = {'params': JSON.stringify(this.searchBIN)}
          axios.post('/charageManage/homePage/selectCharageListBySearch', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
            this.searchBIN.totalRows = res.data.totalRows
          })
        },
        add() {
          this.addFormData = {
             chargePointId:'', 
             chargePointNum:'',
             softwareVersionNum:'',
             designVersionNum:'',
             mfgLotNum:'',
             startServiceDate:'',
             totalServiceMileage:'',
             macAddress:'',
             kidIpAddress:'',
             latestMaintainDate:'',
             latestRepairDate:'',
             electronicTagsCount:'',
             projectorModelNumber:'',
             scanningGunModelNumber:'',
             ratedVoltageRange:'',
              curtVoltageRange:'',
               ratedCurrentRange:'',
                curtCurrentRange:'', 
                 curtMaximumCurrent:'',
                 descriptions:''
          }
          this.isView = true
          this.addType = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        checkDetail(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = false
          this.dialogVisible = true
          //  this.addFormReadOnly = true;
        },
        modifyInfo(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        deleteInfo(rowData) {
          this.$alert('是否删除这条记录', '信息删除', {
            confirmButtonText: '确定',
            callback: action => {
              var params = {
                chargePointId: rowData.chargePointId
              }
              axios.post('/charageManage/homePage/deleteCharageInfo', qs.stringify(params)).then((res) => {
                console.info(res)
                if (res.errCode === 'S') {
                  this.$message({
                    type: 'info',
                    message: `已删除`
                  })
                } else {
                  this.$message({
                    type: 'info',
                    message: `删除失败`
                  })
                }
                this.loadData()
              })
            }
          })
        }, // 增加一条记录
        addSubmit() {
        // 先判断表单是否通过了判断
          this.$refs.addFormData.validate((valid) => {
            // 代表通过验证 ,将参数传回后台
            if (valid) {
              let param = Object.assign({}, this.addFormData)
              let result = {}
              result.params = JSON.stringify(param)   
              if (!this.addType) {
                axios.post('/workstationManage/homePage/updateCharageInfo', qs.stringify(result)).then((res) => {
                  if (res.errCode === 'S') {
                    this.$message({
                      type: 'info',
                      message: '修改成功'
                    })
                    this.loadData()
                  } else {
                    this.$message({
                      type: 'info',
                      message: '修改失败'
                    })
                  }
                  this.dialogVisible = false
                })
              } else {
                axios.post('/workstationManage/homePage/insertCharageInfo', qs.stringify(result)).then((res) => {
                  if (res.errCode === 'S') {
                    this.$message({
                      type: 'info',
                      message: '添加成功'
                    })
                    this.loadData()
                  } else {
                    this.$message({
                      type: 'info',
                      message: '添加失败'
                    })
                  }
                  this.dialogVisible = false
                })
              }
               this.addType = false
               this.loadData()
            }
          })
        }
      }
    }
 </script>
 
 <style>
     body {
         background: #DFE9FB;
     }
 </style>