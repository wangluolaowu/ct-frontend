 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item  :label="$t('label.label5_01')">
              <el-input v-model="searchBIN.kidId" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item :label="$t('label.label5_02')" >
              <el-input v-model="searchBIN.totalServiceMileage" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item  :label="$t('label.label5_03')" >
              <el-input v-model="searchBIN.softwareVersionNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label5_04')" >
              <el-input v-model="searchBIN.macAddress" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
       <el-row>
        <el-col :span="8">
           <el-form-item  :label="$t('label.label5_05')">
              <el-input v-model="searchBIN.designVersionNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label5_06')">
              <el-input v-model="searchBIN.kidIpAddress" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item :label="$t('label.label5_07')">
              <el-input v-model="searchBIN.mfgLotNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item :label="$t('label.label1_56')">
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
           <el-form-item  :label="$t('label.label5_08')">
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
            <el-form-item :label="$t('label.label5_09')">
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
           <el-form-item :label="$t('label.label5_10')">
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
           <el-form-item :label="$t('label.label5_12')">
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
        <el-col :span="5" >
          <el-form-item >  
              <el-button type="primary" @click="loadData">{{$t('message.msg1_28')}}</el-button>
          </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
                <el-button type="primary" @click="restData">{{$t('message.msg1_29')}}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
                <el-button type="primary" @click="add">{{$t('message.msg1_52')}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
         <el-table :data="userInfoList" style="width: 100%" border  min-height="100">
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
            <el-table-column prop="kidId"  :label="$t('label.label5_01')" width="200" >
            </el-table-column>
             <el-table-column prop="chargePointType"  :label="$t('label.label5_18')" width="200">
                <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue(CS_CHARGE_POINT_TYPE,scope.row.chargePointType)}}
              </template>
            </el-table-column>
             <el-table-column prop="softwareVersionNum"  :label="$t('label.label5_03')" width="200">
            </el-table-column>
             <el-table-column prop="designVersionNum"  :label="$t('label.label5_05')" width="200">
            </el-table-column>
             <el-table-column prop="mfgLotNum"  :label="$t('label.label5_07')" width="200">
            </el-table-column>
             <el-table-column prop="startServiceDate" :label="$t('label.label5_14')" width="200">
                  <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.startServiceDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="totalServiceMileage"  :label="$t('label.label5_02')" width="200">
            </el-table-column>
             <el-table-column prop="macAddress"  :label="$t('label.label5_04')" width="200">
            </el-table-column>
             <el-table-column prop="kidIpAddress"  :label="$t('label.label5_06')" width="200">
            </el-table-column>
             <el-table-column prop="latestMaintainDate"  :label="$t('label.label5_15')" width="200">
                  <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.latestMaintainDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="latestRepairDate"  :label="$t('label.label5_16')" width="200">
                  <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.latestRepairDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="descriptions " :label="$t('label.label5_17')" width="200"> 
                    <template slot-scope="scope">
                        {{scope.row.descriptions}}
                      </template>
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column label="$t('message.msg1_53')"  min-width="350" fixed="right">
 
                <template slot-scope="scope">
 
                     <el-button type="text" @click="checkDetail(scope.row)">{{$t('message.msg1_54')}}</el-button>
 
                     <el-button type="text" @click="modifyInfo(scope.row)">{{$t('message.msg1_55')}}</el-button>
  
                     <el-button type="text" @click="deleteInfo(scope.row)">{{$t('message.msg1_56')}}</el-button>
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
             <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="200px" class="demo-ruleForm login-container">
                  <el-form-item prop="kidId"  :label="$t('label.label5_01')">
                    <el-input type="text" v-model="addFormData.kidId"  :label="$t('label.label5_01')" :disabled="keyDisabled"></el-input>
                  </el-form-item>
                  <el-form-item prop="chargePointType" :label="$t('label.label5_18')">
                     <el-select  v-model="addFormData.chargePointType" style="width:200px" >
                            <el-option
                            v-for="item in CS_CHARGE_POINT_TYPE"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                            > 
                        </el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="softwareVersionNum"  :label="$t('label.label5_03')">
                    <el-input type="text" v-model="addFormData.softwareVersionNum" ></el-input>
                  </el-form-item>
                   <el-form-item prop="designVersionNum"  :label="$t('label.label5_05')">
                    <el-input type="text" v-model="addFormData.designVersionNum" ></el-input>
                  </el-form-item>
                   <el-form-item prop="mfgLotNum"  :label="$t('label.label5_07')">
                    <el-input type="text" v-model="addFormData.mfgLotNum"  :label="$t('label.label5_01')"></el-input>
                  </el-form-item>
                   <el-form-item prop="startServiceDate" :label="$t('label.label5_14')">
                    <el-date-picker
                        v-model="addFormData.startServiceDate"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        style="width:200px"
                        @change="handleChangeTime"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="totalServiceMileage"  :label="$t('label.label5_02')">
                    <el-input type="text" v-model="addFormData.totalServiceMileage" ></el-input>
                  </el-form-item>
                  <el-form-item prop="macAddress"  :label="$t('label.label5_04')">
                    <el-input type="text" v-model="addFormData.macAddress" ></el-input>
                  </el-form-item>
                  <el-form-item prop="kidIpAddress" :label="$t('label.label5_06')">
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
                    <el-form-item prop="latestRepairDate" :label="$t('label.label5_16')">
                       <el-date-picker
                        v-model="addFormData.latestRepairDate"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        style="width:200px"
                        @change="handleChangeTime"
                    ></el-date-picker>
                  </el-form-item>
                    <el-form-item prop="descriptions "  :label="$t('label.label5_17')">
                    <el-input type="textarea" v-model="addFormData.descriptions"></el-input>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={kidId:'',softwareVersionNum:'',chargePointType:'',designVersionNum:'',mfgLotNum:'',startServiceDate:'',totalServiceMileage:'',macAddress:'',kidIpAddress:'',latestMaintainDate:'',latestRepairDate:'',descriptions:''}">取 消</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">{{$t('message.msg1_68')}}</el-button>
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
          CS_CHARGE_POINT_TYPE:[],
          addFormReadOnly: true,
          dialogVisible: false,
          keyDisabled:false,
          isView: true,
          addFormData: {
            kidId:'',
            softwareVersionNum:'',
            designVersionNum:'',
            mfgLotNum:'',
            startServiceDate:'',
            totalServiceMileage:'',
            macAddress:'',
            kidIpAddress:'',
            chargePointType:'',
            latestMaintainDate:'',
            latestRepairDate:'',
            descriptions:''
          },
          searchBIN: {
            kidId:'',
            softwareVersionNum:'',
            designVersionNum:'',
            mfgLotNum:'',
            startServiceDate:'',
            totalServiceMileage:'',
            macAddress:'',
            kidIpAddress:'',
            chargePointType:'',
            latestMaintainDate:'',
            latestRepairDate:'',
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
            kidId: [
              {required: true,message: '机器人编号不能为空',trigger: 'blur'},
              {validator:this.$validate.isIntegerAlone, trigger: 'blur'}
            ],
            totalServiceMileage: [
               {validator:this.$validate.isIntegerAlone, trigger: 'blur'}
            ],
            ipAddress: [
               {validator:this.$validate.validateIP, trigger: 'blur'}
            ]
          }
        }
      },
  mounted: function () {
        this.getEnumSelectValues()
      },
      methods: {
        getEnumSelectValues() {
          axios.get('common/enum/selectEnumList', {
            params: 'test'
          }).then((res) => {
            if (res.errCode === 'S') {
              res.data.result.map(item => {
                if (item.lookupType === 'CS_CHARGE_POINT_TYPE') {
                  item.value = item.lookupValueNum
                  item.label = item.meaning||item.lookupValueNum
                  this.CS_CHARGE_POINT_TYPE.push(item)
                }
                return item
              })
            }
            this.loadData()
          })
        },
        handleChangeTime(){

        },
        handleCurrentChangeBIN(val){
            this.searchBIN.currentPage = val;
            this.loadData()
        },
        restData(){
          let currentPageTemp = this.searchBIN.currentPage
          let pageSizeTemp = this.searchBIN.pageSize
          let totalRowsTemp = this.searchBIN.totalRows
            this.searchBIN = {
            kidId:'',
            softwareVersionNum:'',
            designVersionNum:'',
            mfgLotNum:'',
            startServiceDate:'',
            totalServiceMileage:'',
            macAddress:'',
            kidIpAddress:'',
            chargePointType:'',
            latestMaintainDate:'',
            latestRepairDate:'',
            startTimeStartServiceDate:'',
            endTimeStartServiceDate:'',
            startTimeLatestRepairDate:'',
            endTimeLatestRepairDate:'',
            startTimeLatestMaintainDate:'',
            endTimeLatestMaintainDate:'',
             currentPage:currentPageTemp,
             pageSize:pageSizeTemp,
             totalRows:totalRowsTemp
          }
        }, 
        loadData() {
          let param = {'params': JSON.stringify(this.searchBIN)}
          axios.post('/robotManage/kidHomeData/selectKidsInfoBySearch', qs.stringify(param)).then((res) => {
            if(res.errCode === 'S'){
              var _data = res.data.result
              this.userInfoList = _data
              this.searchBIN.totalRows = res.data.totalRows
            }
          })
        },
        add() {
          this.addFormData = {
             kidId:'',
            softwareVersionNum:'',
            designVersionNum:'',
            mfgLotNum:'',
            chargePointType:'',
            startServiceDate:'',
            totalServiceMileage:'',
            macAddress:'',
            kidIpAddress:'',
            latestMaintainDate:'',
            latestRepairDate:'',
            descriptions:''
          }
          this.isView = true
          this.addType = true
          this.keyDisabled = false
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        checkDetail(rowData) {
          this.addFormData = Object.assign({}, rowData)
          let startServiceDateTemp = this.addFormData.startServiceDate
          let latestMaintainDateTemp = this.addFormData.latestMaintainDate
          let latestRepairDateTemp = this.addFormData.latestRepairDate
          this.addFormData.startServiceDate = new Date(this.$DateFormat.dateFormat(startServiceDateTemp,true))
          this.addFormData.latestMaintainDate = new Date(this.$DateFormat.dateFormat(latestMaintainDateTemp,true))
          this.addFormData.latestRepairDate = new Date(this.$DateFormat.dateFormat(latestRepairDateTemp,true))
          this.isView = false
          this.dialogVisible = true
          //  this.addFormReadOnly = true;
        },
        modifyInfo(rowData) {
          this.addFormData = Object.assign({}, rowData)
          let startServiceDateTemp = this.addFormData.startServiceDate
          let latestMaintainDateTemp = this.addFormData.latestMaintainDate
          let latestRepairDateTemp = this.addFormData.latestRepairDate
          this.addFormData.startServiceDate = new Date(this.$DateFormat.dateFormat(startServiceDateTemp,true))
          this.addFormData.latestMaintainDate = new Date(this.$DateFormat.dateFormat(latestMaintainDateTemp,true))
          this.addFormData.latestRepairDate = new Date(this.$DateFormat.dateFormat(latestRepairDateTemp,true))
          this.isView = true
          this.keyDisabled = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        deleteInfo(rowData) {
          this.$alert('是否删除这条记录', '信息删除', {
            confirmButtonText: '确定',
            callback: action => {
              var params = {
                kidId: rowData.kidId
              }
              axios.post('/robotManage/kidHomeData/deleteKidsInfo', qs.stringify(params)).then((res) => {
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
              result.result = JSON.stringify(param)   
              if (!this.addType) {
                axios.post('/robotManage/kidHomeData/updateKidsInfo', qs.stringify(result)).then((res) => {
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
                axios.post('/robotManage/kidHomeData/insertKidsInfo', qs.stringify(result)).then((res) => {
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