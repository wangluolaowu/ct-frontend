 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item prop="ruleId" :label="$t('label.label9_03')" >
              <el-input v-model="searchBIN.ruleId" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item prop="rulePriority" :label="$t('label.label9_04')">
              <el-input v-model="searchBIN.rulePriority" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>  
        <el-col :span="8">
            <el-form-item  :label="$t('label.label5_01')">
              <el-input v-model="searchBIN.kidId" style="width:200px"></el-input>
            </el-form-item>
        </el-col> 
        </el-row>
        <el-row>
        <el-col :span="5" >
          <el-form-item >  
              <el-button type="primary" @click="loadData">{{$t('message.msg1_68')}}</el-button>
          </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
                  <el-button type="primary" @click="restData">{{$t('message.msg1_30')}}</el-button>
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
            <el-table-column prop="ruleId"  :label="$t('label.label9_03')" min-width="200">
            </el-table-column>
            <el-table-column prop="rulePriority"  :label="$t('label.label9_04')" min-width="200">
            </el-table-column>
            <el-table-column prop="startTime"  :label="$t('label.label9_05')" min-width="200">
            </el-table-column>
             <el-table-column prop="endTime"  :label="$t('label.label9_06')" min-width="200">
            </el-table-column>
             <el-table-column prop="designVersionNum"  :label="$t('label.label9_07')" min-width="200">
            </el-table-column>
             <el-table-column prop="kidMinBatteryPower"  :label="$t('label.label9_08')" min-width="200">
            </el-table-column>
             <el-table-column prop="kidMaxBatteryPower"  :label="$t('label.label9_09')" min-width="200">
            </el-table-column>
             <el-table-column prop="kidId"  :label="$t('label.label1_20')" min-width="200">
            </el-table-column>
             <el-table-column prop="enableFlag" :label="$t('label.label1_24')" min-width="200">
               <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus3,scope.row.enableFlag)}}
              </template>
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column :label="$t('message.msg1_53')" min-width="350" fixed="right">
 
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
                  <el-form-item prop="ruleId" :label="$t('label.label9_03')"> 
                    <el-input type="text" v-model="addFormData.ruleId"  :disabled="keyDisabled"></el-input>
                  </el-form-item>
                  <el-form-item prop="rulePriority"  :label="$t('label.label9_04')"> 
                    <el-input type="text" v-model="addFormData.rulePriority"  ></el-input>
                  </el-form-item>
                   <el-form-item prop="startTime"  :label="$t('label.label9_05')">
                      <template>
                          <el-time-picker
                            v-model="addFormData.startTime"
                            :picker-options="{
                              selectableRange: '00:00:00 - 23:59:59'
                            }"
                             value-format="HH:mm:ss"   format="HH:mm:ss">
                          </el-time-picker>
                        </template>
                  </el-form-item>
                   <el-form-item prop="endTime" :label="$t('label.label9_06')">
                     <template>
                          <el-time-picker
                            v-model="addFormData.endTime"
                            :picker-options="{
                              selectableRange: '00:00:00 - 23:59:59'
                            }"
                             value-format="HH:mm:ss"   format="HH:mm:ss">
                          </el-time-picker>
                        </template>
                  </el-form-item>
                   <el-form-item prop="designVersionNum"  :label="$t('label.label9_07')">
                    <el-input type="text" v-model="addFormData.designVersionNum" ></el-input>
                  </el-form-item>
                   <el-form-item prop="kidMinBatteryPower"  :label="$t('label.label9_08')">
                    <el-input type="text" v-model="addFormData.kidMinBatteryPower" ></el-input>
                  </el-form-item>
                   <el-form-item prop="kidMaxBatteryPower"  :label="$t('label.label9_09')">
                     <el-input type="text" v-model="addFormData.kidMaxBatteryPower" ></el-input>
                  </el-form-item>
                  <el-form-item prop="kidId"  :label="$t('label.label1_20')">
                    <el-input type="text" v-model="addFormData.kidId" ></el-input>
                  </el-form-item>
                  <el-form-item prop="enableFlag"  :label="$t('label.label1_24')">
                    <el-select  v-model="addFormData.enableFlag" style="width:200px" >
                      <el-option
                      v-for="item in $Enum.EnumSelect().openStatus3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" 
                      > 
                  </el-option>
                  </el-select>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={ruleId:'',rulePriority:'', startTime:'',endTime:'',designVersionNum:'',kidMinBatteryPower:'',kidMaxBatteryPower:'',kidId:'',enableFlag:''}">{{$t('message.msg1_30')}}</el-button>
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
             ruleId:'',
             rulePriority:'',
             startTime:'',
             endTime:'',
             designVersionNum:'',
             kidMinBatteryPower:'',
             kidMaxBatteryPower:'',
             kidId:'',
             enableFlag:''
          },
          searchBIN: {
             ruleId:'',
             rulePriority:'',
             startTime:'',
             endTime:'',
             designVersionNum:'',
             kidMinBatteryPower:'',
             kidMaxBatteryPower:'',
             kidId:'',
             enableFlag:'',
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
          let currentPageTemp = this.searchBIN.currentPage
          let pageSizeTemp = this.searchBIN.pageSize
          let totalRowsTemp = this.searchBIN.totalRows
          this.searchBIN = {
             ruleId:'',
             rulePriority:'',
             startTime:'',
             endTime:'',
             designVersionNum:'',
             kidMinBatteryPower:'',
             kidMaxBatteryPower:'',
             kidId:'',
             enableFlag:'',
             currentPage:currentPageTemp,
             pageSize:pageSizeTemp,
             totalRows:totalRowsTemp
          }
        }, 
        loadData() {
          let param = {'params': JSON.stringify(this.searchBIN)}
          axios.post('/charageManage/rules/selectCharageRulesListBySearch', qs.stringify(param)).then((res) => {
           if(res.errCode === 'S') {
              var _data = res.data.result
              this.userInfoList = _data
             //this.searchBIN.totalRows = res.data.totalRows
           }
          })
        },
        add() {
          this.addFormData = {
             ruleId:'',
             rulePriority:'',
             startTime:'',
             endTime:'',
             designVersionNum:'',
             kidMinBatteryPower:'',
             kidMaxBatteryPower:'',
             kidId:'',
             enableFlag:''
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
                ruleId: rowData.ruleId
              }
              axios.post('/charageManage/rules/deleteCharageRulesInfo', qs.stringify(params)).then((res) => {
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
                axios.post('/charageManage/rules/updateCharageRulesInfo', qs.stringify(result)).then((res) => {
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
                axios.post('/charageManage/rules/insertCharageRulesInfo', qs.stringify(result)).then((res) => {
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