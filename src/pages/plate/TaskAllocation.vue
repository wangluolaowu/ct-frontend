 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item label="订单类型" >
              <el-select placeholder="订单类型" v-model="searchBIN.orderType" style="width:200px">
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
            <el-form-item label="工作站模式" >
               <el-select placeholder="工作站模式" v-model="searchBIN.wsWallSchema" style="width:200px">
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
              <el-select placeholder="ISP Dealer" v-model="searchBIN.ispDealer" style="width:200px">
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
              <el-select placeholder="ISP Dealer" v-model="searchBIN.ictDealer" style="width:200px">
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
           <el-form-item label="算法" >
              <el-input v-model="searchBIN.algorithm" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="状态" >
               <el-select placeholder="状态" v-model="searchBIN.enableFlag" style="width:200px">
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
             <el-table-column type="index" label="规则ID" width="200">
            </el-table-column>
             <el-table-column prop="ruleDesc" label="规则描述" width="200">
            </el-table-column>
             <el-table-column prop="orderType" label="订单类型" width="200">
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
             <el-table-column prop="wsWallSchema" label="工作站模式" width="200">
                <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().workstation_status,scope.row.wsWallSchema)}}
              </template>
            </el-table-column>
             <el-table-column prop="algorithm" label="算法" width="200">
            </el-table-column>
            <el-table-column prop="enableFlag" label="状态" width="200">
               <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus2,scope.row.enableFlag)}}
              </template>
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
             <el-form :model="addFormData"  ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item  prop="ruleDesc" label="规则描述">
                    <el-input type="text" v-model="addFormData.ruleDesc" placeholder="规则描述" ></el-input>
                  </el-form-item>
                   <el-form-item prop="orderType" label="订单类型">
                     <el-select placeholder="订单类型" v-model="addFormData.orderType" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().order_type"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                          > 
                       </el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item prop="ispDealer" label="ISP Dealer">
                     <el-select placeholder="ISP Dealer" v-model="addFormData.ispDealer" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().Y_N_STATUS"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                          > 
                       </el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item prop="ictDealer" label="ICT Dealer">
                     <el-select placeholder="ISP Dealer" v-model="addFormData.ictDealer" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().Y_N_STATUS"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                          > 
                       </el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item  prop="wsWallSchema" label="工作站模式">
                     <el-select placeholder="工作站模式" v-model="addFormData.wsWallSchema" style="width:200px">
                        <el-option
                          v-for="item in $Enum.EnumSelect().workstation_status"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                          > 
                       </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item  prop="algorithm" label="算法">
                       <el-input type="text" v-model="addFormData.algorithm" placeholder="算法" ></el-input>
                  </el-form-item>
                  <el-form-item  prop="enableFlag" label="状态">
                    <el-select placeholder="状态" v-model="addFormData.enableFlag" style="width:200px">
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
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">确 定</el-button>
             </span>
          </el-dialog>
      </div>
     </template>
  <script>
    import axios from '../../util/http'
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