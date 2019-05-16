 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item :label="$t('label.label1_42')">
              <el-input v-model="searchBIN.chargePointNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item  :label="$t('label.label9_01')">
               <el-select  v-model="searchBIN.chargeStatus" style="width:200px">
                <el-option
                v-for="item in $Enum.EnumSelect().CHARGE_STATUS"
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
            <el-form-item  :label="$t('label.label9_02')">
              <el-select  v-model="searchBIN.activeFlag" style="width:200px">
                <el-option
                v-for="item in $Enum.EnumSelect().openStatus3"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
                > 
              </el-option>
           </el-select>
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
        <el-col :span="5" >
          <el-form-item>  
              <el-button type="primary" @click="loadData">{{$t('message.msg1_68')}}</el-button>
          </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
                 <el-button type="primary" @click="restData">{{$t('message.msg1_30')}}</el-button>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">
            <el-form-item>
                <el-button type="primary" @click="add">新增</el-button>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
         <el-table :data="userInfoList" style="width: 100%" border >
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
            <el-table-column prop="chargePointNum"  :label="$t('label.label1_42')" min-width="200">
            </el-table-column>
             <el-table-column prop="chargeStatus"  :label="$t('label.label9_01')" min-width="200">
                 <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().CHARGE_STATUS,scope.row.chargeStatus)}}
              </template>
            </el-table-column>
             <el-table-column prop="activeFlag"  :label="$t('label.label9_02')" min-width="200">
                <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus3,scope.row.activeFlag)}}
              </template>
            </el-table-column>
            
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column :label="$t('message.msg1_53')"  min-width="250" fixed="right">
 
                <template slot-scope="scope">
 
                     <el-button type="text" @click="modifyInfo(scope.row)">{{$t('message.msg1_55')}}</el-button>
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
                   <el-form-item prop="chargePointNum"  :label="$t('label.label1_42')">
                    <el-input type="text" v-model="addFormData.chargePointNum"   :disabled="keyDisabled"></el-input>
                  </el-form-item>
                   <el-form-item prop="chargeStatus"  :label="$t('label.label9_01')">
                      <el-select  v-model="addFormData.chargeStatus" style="width:200px" :disabled="keyDisabled">
                            <el-option
                            v-for="item in $Enum.EnumSelect().CHARGE_STATUS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                            > 
                        </el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="activeFlag" :label="$t('label.label9_02')">
                        <el-select  v-model="addFormData.activeFlag" style="width:200px">
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
                 <el-button @click.native="dialogVisible = false,addFormData={chargePointNum:'',chargeStatus:'',activeFlag:''}">{{$t('message.msg1_30')}}</el-button>
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
          isView: true,
          keyDisabled:false,
          addFormData: {
            chargePointNum:'',
            chargeStatus:'',
            activeFlag:''
          },
          searchBIN: {
             chargePointNum:'',
            chargeStatus:'',
            activeFlag:'',
            currentPage:1,
            pageSize:50,
            totalRows:-1
          },
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
             chargePointNum:'',
             chargeStatus:'',
             activeFlag:'',
             currentPage:currentPageTemp,
             pageSize:pageSizeTemp,
             totalRows:totalRowsTemp
          }
        }, 
        loadData() {
          let param = {'params': JSON.stringify(this.searchBIN)}
          axios.post('/charageManage/switchStatus/selectCharageListBySearch', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
            this.searchBIN.totalRows = res.data.totalRows
          })
        },
        add() {
          this.addFormData = {
            chargePointNum:'',
            chargeStatus:'',
            activeFlag:''
          }
          this.isView = true
          this.keyDisabled= false
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
   
        modifyInfo(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = true
          this.keyDisabled= true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        addSubmit() {
        // 先判断表单是否通过了判断
          this.$refs.addFormData.validate((valid) => {
            // 代表通过验证 ,将参数传回后台
            if (valid) {
              let param = Object.assign({}, this.addFormData)
              let result = {}
              result.params = JSON.stringify(param)   
              axios.post('/charageManage/switchStatus/updateCsChargePointInfoVByActiveFlag', qs.stringify(result)).then((res) => {
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