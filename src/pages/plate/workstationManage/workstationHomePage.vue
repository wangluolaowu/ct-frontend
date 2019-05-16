 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item :label="$t('label.label1_09')">
              <el-input v-model="searchBIN.entityWorkstationNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label7_01')" >
              <el-input v-model="searchBIN.softwareVersionNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>
        <el-col :span="8">
            <el-form-item :label="$t('label.label7_02')">
              <el-input v-model="searchBIN.entityWorkstationId" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item :label="$t('label.label7_03')" >
              <el-input v-model="searchBIN.mfgLotNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item  :label="$t('label.label7_04')">
              <el-input v-model="searchBIN.designVersionNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
           <el-form-item  :label="$t('label.label7_05')">
              <el-input v-model="searchBIN.scanningGunModelNumber" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        </el-row>
       <el-row>
        <el-col :span="8">
           <el-form-item :label="$t('label.label7_06')">
              <el-input v-model="searchBIN.totalServiceMileage" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label7_06')">
              <el-input v-model="searchBIN.macAddress" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item  :label="$t('label.label7_08')">
              <el-input v-model="searchBIN.ipAddress" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label7_09')">
              <el-input v-model="searchBIN.electronicTagsCount" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>  
        <el-col :span="8">
           <el-form-item :label="$t('label.label7_10')">
              <el-input v-model="searchBIN.projectorModelNumber" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label1_56')">
             <el-select  v-model="searchBIN.pageSize" style="width:200px">
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
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item :label="$t('label.label7_11')">
               <el-date-picker
                v-model="searchBIN.startTimeStartServiceDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label7_12')">
               <el-date-picker
                v-model="searchBIN.endTimeStartServiceDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item  :label="$t('label.label5_10')">
               <el-date-picker
                v-model="searchBIN.startTimeLatestRepairDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label5_11')">
               <el-date-picker
                v-model="searchBIN.endTimeLatestRepairDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item  :label="$t('label.label5_12')">
               <el-date-picker
                v-model="searchBIN.startTimeLatestMaintainDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label5_13')">
               <el-date-picker
                v-model="searchBIN.endTimeLatestMaintainDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="8" >
          <el-form-item >  
              <el-button type="primary" @click="loadData">{{$t('message.msg1_76')}}</el-button>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item >
                   <el-button type="primary" @click="restData">{{$t('message.msg1_29')}}</el-button>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">
            <el-form-item>
                <el-button type="primary" @click="add">{{$t('message.msg1_52')}}</el-button>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
         <el-table :data="userInfoList" style="width: 100%" border  height="500">
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
            <el-table-column prop="entityWorkstationId" :label="$t('label.label7_02')" width="200">
            </el-table-column>
            <el-table-column prop="entityWorkstationNum" :label="$t('label.label1_09')" width="200">
            </el-table-column>
             <el-table-column prop="softwareVersionNum" :label="$t('label.label7_01')" width="200">
            </el-table-column>
             <el-table-column prop="designVersionNum" :label="$t('label.label7_04')" width="200">
            </el-table-column>
             <el-table-column prop="mfgLotNum" :label="$t('label.label7_03')" width="200">
            </el-table-column>
             <el-table-column prop="startServiceDate" :label="$t('label.label7_06')" width="200">
                  <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.startServiceDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="totalServiceMileage" :label="$t('label.label7_13')" width="200">
            </el-table-column>
             <el-table-column prop="macAddress" :label="$t('label.label7_07')" width="200">
            </el-table-column>
             <el-table-column prop="kidIpAddress" :label="$t('label.label7_08')" width="200">
            </el-table-column>
             <el-table-column prop="latestMaintainDate" :label="$t('label.label5_15')" width="200">
                  <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.latestMaintainDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="latestRepairDate" :label="$t('label.label5_16')" width="200">
                  <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.latestRepairDate,true)}}
                      </template>
            </el-table-column>
              <el-table-column prop="electronicTagsCount " :label="$t('label.label7_09')" width="200"> 
            </el-table-column>
              <el-table-column prop="projectorModelNumber " :label="$t('label.label7_10')" width="200"> 
            </el-table-column>
              <el-table-column prop="scanningGunModelNumber " :label="$t('label.label7_05')" width="200"> 
            </el-table-column>
             <el-table-column prop="descriptions " :label="$t('label.label5_17')"  width="200"> 
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column label="操作"  min-width="350" fixed="right">
 
                <template slot-scope="scope">
 
                     <el-button type="text" @click="checkDetail(scope.row)">{{$t('message.msg1_54')}}</el-button>
 
                     <el-button type="text" @click="modifyInfo(scope.row)">{{$t('message.msg1_55')}}</el-button>
  
                     <!--<el-button type="text" @click="deleteInfo(scope.row)">{{$t('message.msg1_56')}}</el-button>-->
                  </template>
             </el-table-column>
             <!--编辑与增加的页面-->
         </el-table>
           <el-pagination v-if="searchBIN.totalRows>0" class="pagination" background @current-change="handleCurrentChangeBIN"
                        :current-page.sync="searchBIN.currentPage" :page-size="searchBIN.pageSize" :page-sizes="[searchBIN.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="searchBIN.totalRows">
          </el-pagination>
          <!--新增界面-->
         <el-dialog :title="$t('message.msg1_75')" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item prop="entityWorkstationId" :label="$t('label.label7_02')">
                    <el-input type="text" v-model="addFormData.entityWorkstationId" :disabled="keyDisabled"></el-input>
                  </el-form-item>
                   <el-form-item prop="entityWorkstationNum"  :label="$t('label.label1_09')">
                    <el-input type="text" v-model="addFormData.entityWorkstationNum"  ></el-input>
                  </el-form-item>
                   <el-form-item prop="softwareVersionNum"  :label="$t('label.label7_01')">
                    <el-input type="text" v-model="addFormData.softwareVersionNum"  ></el-input>
                  </el-form-item>
                   <el-form-item prop="designVersionNum"  :label="$t('label.label7_04')">
                    <el-input type="text" v-model="addFormData.designVersionNum" ></el-input>
                  </el-form-item>
                   <el-form-item prop="mfgLotNum"  :label="$t('label.label7_03')" >
                    <el-input type="text" v-model="addFormData.mfgLotNum" ></el-input>
                  </el-form-item>
                   <el-form-item prop="startServiceDate"  :label="$t('label.label7_06')">
                    <el-date-picker
                        v-model="addFormData.startServiceDate"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        style="width:200px"
                        @change="handleChangeTime"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="totalServiceMileage"  :label="$t('label.label7_13')">
                    <el-input type="text" v-model="addFormData.totalServiceMileage" ></el-input>
                  </el-form-item>
                  <el-form-item prop="macAddress"  :label="$t('label.label7_07')">
                    <el-input type="text" v-model="addFormData.macAddress" ></el-input>
                  </el-form-item>
                  <el-form-item prop="kidIpAddress"  :label="$t('label.label7_08')">
                    <el-input type="text" v-model="addFormData.kidIpAddress" ></el-input>
                  </el-form-item>
                 <el-form-item prop="latestMaintainDate"  :label="$t('label.label5_15')">
                     <el-date-picker
                        v-model="addFormData.latestMaintainDate"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        style="width:200px"
                        @change="handleChangeTime"
                    ></el-date-picker>
                  </el-form-item>
                    <el-form-item prop="latestRepairDate"  :label="$t('label.label5_16')">
                        <el-date-picker
                        v-model="addFormData.latestRepairDate"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        style="width:200px"
                        @change="handleChangeTime"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="electronicTagsCount "  :label="$t('label.label7_09')">
                    <el-input type="text" v-model="addFormData.electronicTagsCount" ></el-input>
                  </el-form-item>
                  <el-form-item prop="projectorModelNumber "  :label="$t('label.label7_10')">
                    <el-input type="text" v-model="addFormData.projectorModelNumber"></el-input>
                  </el-form-item>
                  <el-form-item prop="scanningGunModelNumber "  :label="$t('label.label7_05')">
                    <el-input type="text" v-model="addFormData.scanningGunModelNumber" ></el-input>
                  </el-form-item>
                    <el-form-item prop="descriptions " :label="$t('label.label5_17')">
                    <el-input type="text" v-model="addFormData.descriptions" ></el-input>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={entityWorkstationId:'',entityWorkstationNum:'',softwareVersionNum:'',designVersionNum:'',mfgLotNum:'',startServiceDate:'',totalServiceMileage:'',macAddress:'',kidIpAddress:'',latestMaintainDate:'',latestRepairDate:'',electronicTagsCount:'',projectorModelNumber:'',scanningGunModelNumber:'',descriptions:''}">取 消</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">{{$t('message.msg1_28')}}</el-button>
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
          keyDisabled:false,
          isView: true,
          addFormData: {
            entityWorkstationId:'',
            entityWorkstationNum:'',
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
            descriptions:''
          },
          searchBIN: {
            entityWorkstationId:'',
            entityWorkstationNum:'',
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
            entityWorkstationId:'',
            entityWorkstationNum:'',
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
          axios.post('/workstationManage/homePage/selectWorkstationListBySearch', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
            this.searchBIN.totalRows = res.data.totalRows
          })
        },
        add() {
          this.addFormData = {
             entityWorkstationId:'',
            entityWorkstationNum:'',
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
            descriptions:''
          }
          this.isView = true
          this.addType = true
          this.keyDisabled=false
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
          this.keyDisabled=true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        deleteInfo(rowData) {
          this.$alert('是否删除这条记录', '信息删除', {
            confirmButtonText: '确定',
            callback: action => {
              var params = {
                entityWorkstationId: rowData.entityWorkstationId
              }
              axios.post('/workstationManage/homePage/deleteWorkstationInfo', qs.stringify(params)).then((res) => {
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
                axios.post('/workstationManage/homePage/updateWorkstationInfo', qs.stringify(result)).then((res) => {
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
                axios.post('/workstationManage/homePage/insertWorkstationInfo', qs.stringify(result)).then((res) => {
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