 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item :label="$t('label.label1_51')">
              <el-select v-model="searchBIN.orderType" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().order_type"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                          > 
                       </el-option>
                    </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item :label="$t('label.label2_22')">
               <el-select v-model="searchBIN.wsWallSchema" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().workstation_status"
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
           <el-form-item label="ISP Dealer" >
              <el-select v-model="searchBIN.ispDealer" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().Y_N_STATUS"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                          > 
                       </el-option>
                    </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="ICT Dealer" >
              <el-select v-model="searchBIN.ictDealer" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().Y_N_STATUS"
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
           <el-form-item :label="$t('label.label2_23')">
              <el-input v-model="searchBIN.algorithm" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item :label="$t('label.label1_24')">
               <el-select v-model="searchBIN.enableFlag" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().openStatus2"
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
            <el-form-item :label="$t('label.label1_56')" >
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
        <el-col :span="4">
          <el-form-item >  
              <el-button type="primary" @click="loadData">{{$t('message.msg1_28')}}</el-button>   
          </el-form-item>
          </el-col>
          <el-col :span="4">
          <el-form-item >  
              <el-button type="primary" @click="restData">{{$t('message.msg1_29')}}</el-button>    
          </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item >
              <el-button type="primary" @click="add">{{$t('message.msg1_52')}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
         <el-table :data="userInfoList" style="width: 100%" border  min-height="200">
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
             <el-table-column type="index" :label="$t('label.label2_24')" width="200">
            </el-table-column>
             <el-table-column prop="ruleDesc"  :label="$t('label.label2_25')" width="200">
            </el-table-column>
             <el-table-column prop="orderType" :label="$t('label.label1_51')" width="200">
                <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().order_type,scope.row.orderType)}}
              </template>
            </el-table-column>
             <el-table-column prop="ispDealer" label="ISP Dealer" width="200">
                <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().Y_N_STATUS,scope.row.ispDealer)}}
              </template>
            </el-table-column>
             <el-table-column prop="ictDealer" label="ICT Dealer" width="200">
                <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().Y_N_STATUS,scope.row.ictDealer)}}
              </template>
            </el-table-column>
             <el-table-column prop="wsWallSchema"  :label="$t('label.label2_22')" width="200">
                <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().workstation_status,scope.row.wsWallSchema)}}
              </template>
            </el-table-column>
             <el-table-column prop="algorithm" :label="$t('label.label2_23')"  width="200">
            </el-table-column>
            <el-table-column prop="enableFlag" :label="$t('label.label1_24')" width="200">
               <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus2,scope.row.enableFlag)}}
              </template>
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column :label="$t('label.msg1_53')"  min-width="350" fixed="right">
 
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
         <el-dialog title="记录" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData"  ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item  prop="ruleDesc" :label="$t('label.label2_25')">
                    <el-input type="text" v-model="addFormData.ruleDesc" ></el-input>
                  </el-form-item>
                   <el-form-item prop="orderType" :label="$t('label.label1_51')">
                     <el-select  v-model="addFormData.orderType" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().order_type2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                          > 
                       </el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item prop="ispDealer" label="ISP Dealer">
                     <el-select v-model="addFormData.ispDealer" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().Y_N_STATUS2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                          > 
                       </el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item prop="ictDealer" label="ICT Dealer">
                     <el-select  v-model="addFormData.ictDealer" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().Y_N_STATUS2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                          > 
                       </el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item  prop="wsWallSchema" :label="$t('label.label2_22')">
                     <el-select  v-model="addFormData.wsWallSchema" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().workstation_status2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                          > 
                       </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item  prop="algorithm" :label="$t('label.label2_23')">
                       <el-input type="text" v-model="addFormData.algorithm" ></el-input>
                  </el-form-item>
                  <el-form-item  prop="enableFlag" :label="$t('label.label1_24')">
                    <el-select v-model="addFormData.enableFlag" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().openStatus2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                          > 
                       </el-option>
                    </el-select>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={ruleId:'',ruleDesc:'',orderType:'',ispDealer:'',ictDealer:'',wsWallSchema:'',algorithm:'',enableFlag:''}">取 消</el-button>
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
          addFormReadOnly: true,
          dialogVisible: false,
          dialogVisibleStart:false,
          submitDisabled:true,
          dialogresult:false,
          tableDataDialog:[],
          isView: true,
          addType:false,
          addFormData: {
            ruleId:'',
            ruleDesc:'',
            orderType:'',
            ispDealer:'',
            ictDealer:'',
            wsWallSchema:'',
            algorithm:'',
            enableFlag:''
          },
          searchBIN: {
             ruleId:'',
            ruleDesc:'',
            orderType:'',
            ispDealer:'',
            ictDealer:'',
            wsWallSchema:'',
            algorithm:'',
            enableFlag:'',
            currentPage:1,
            pageSize:50,
            totalRows:-1
          }
        }
      },
  mounted: function () {
        this.loadData()
      },
      methods: {
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
            ruleDesc:'',
            orderType:'',
            ispDealer:'',
            ictDealer:'',
            wsWallSchema:'',
            algorithm:'',
            enableFlag:'',
            currentPage:currentPageTemp,
            pageSize:pageSizeTemp,
            totalRows:totalRowsTemp
          }
        }, 
        loadData() {
          let param = {'params': JSON.stringify(this.searchBIN)}
          axios.post('/pickManage/rules/selectWorkRulesBySearch', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
            this.searchBIN.totalRows = res.data.totalRows
          })
        },
        add() {
          this.addFormData = {
            ruleId:'',
            ruleDesc:'',
            orderType:'',
            ispDealer:'',
            ictDealer:'',
            wsWallSchema:'',
            algorithm:'',
            enableFlag:''
          }
          this.isView = true
          this.dialogVisible = true
          this.addType = true
          // this.addFormReadOnly = false;
        }, // 获取表格选中时的数据 
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
                ruleId: rowData.ruleId
              }
              axios.post('/pickManage/rules/deleteWorkRulesInfo', qs.stringify(params)).then((res) => {
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
                axios.post('/pickManage/rules/updateWorkRulesInfo', qs.stringify(result)).then((res) => {
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
                axios.post('/pickManage/rules/insertWorkRulesInfo', qs.stringify(result)).then((res) => {
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