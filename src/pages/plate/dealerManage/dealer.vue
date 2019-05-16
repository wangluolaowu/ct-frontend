
  <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item   :label="$t('label.label6_01')" >
              <el-input v-model="searchBIN.dealerCode" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item :label="$t('label.label6_02')">
              <el-input v-model="searchBIN.dealerName" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>
        <el-col :span="8">
            <el-form-item  :label="$t('label.label6_03')" >
              <el-select  v-model="searchBIN.route" style="width:200px">
                <el-option
                v-for="item in routeData"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
                > 
              </el-option>
           </el-select>
         </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item :label="$t('label.label6_04')" >
              <el-select v-model="searchBIN.subRoute" style="width:200px">
                <el-option
                v-for="item in subRouteData"
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
             <el-select v-model="searchBIN.pageSize" style="width:200px">
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
             <el-table-column prop="dealerCode" :label="$t('label.label6_01')" min-width="200">
            </el-table-column>
             <el-table-column prop="dealerName"  :label="$t('label.label6_02')" min-width="200">
            </el-table-column>
             <el-table-column prop="route"  :label="$t('label.label6_03')" min-width="200">
            </el-table-column>
             <el-table-column prop="subRoute"  :label="$t('label.label6_04')" min-width="200">
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column  :label="$t('message.msg1_53')" min-width="350" fixed="right">
 
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
             <el-form :model="addFormData"  ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                   <el-form-item   prop="dealerCode"  :label="$t('label.label6_01')">
                    <el-input type="text" v-model="addFormData.dealerCode" :disabled="keyDisabled"></el-input>
                  </el-form-item>
                   <el-form-item prop="dealerName" :label="$t('label.label6_02')">
                    <el-input type="text" v-model="addFormData.dealerName" ></el-input>
                  </el-form-item>
                  <el-form-item  prop="route" :label="$t('label.label6_03')">
                    <el-select  v-model="addFormData.route" style="width:200px">
                        <el-option
                        v-for="item in routeData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" 
                        > 
                      </el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item prop="subRoute"  :label="$t('label.label6_04')">
                    <el-select  v-model="addFormData.subRoute" style="width:200px">
                        <el-option
                        v-for="item in subRouteData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" 
                        > 
                      </el-option>
                    </el-select>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={dealerCode:'',dealerName:'',route:'',subRoute:''}">{{$t('message.msg1_30')}}</el-button>
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
          dialogVisibleStart:false,
          submitDisabled:true,
          dialogresult:false,
          tableDataDialog:[],
          routeData:[],
          subRouteData:[],
          isView: true,
          addType:false,
          addFormData: {
           dealerCode:'',
           dealerName:'',
           route:'',
           subRoute:''
          },
          searchBIN: {
            dealerCode:'',
            dealerName:'',
            route:'',
            subRoute:'',
            currentPage:1,
            pageSize:50,
            totalRows:-1
          }
        }
      },
  mounted: function () {
        this.loadData()
        this.getRouteList()
      },
      methods: {
        getRouteList(){
          let param = {'params': 'test'}
          axios.post('/dealerManage/dealer/selectSelectRouteList', qs.stringify(param)).then((res) => {
             if (res.errCode === 'S') {
                 this.routeData = res.data.resultRoute
                 this.subRouteData = res.data.resultSubRoute
              }
          })
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
            dealerCode:'',
            dealerName:'',
            route:'',
            subRoute:'',
            currentPage:currentPageTemp,
            pageSize:pageSizeTemp,
            totalRows:totalRowsTemp
          }
        }, 
        loadData() {
          let param = {'params': JSON.stringify(this.searchBIN)}
          axios.post('/dealerManage/dealer/selectDealerListBySearch', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
            this.searchBIN.totalRows = res.data.totalRows
          })
        },
        add() {
          this.addFormData = {
             dealerCode:'',
             dealerName:'',
             route:'',
             subRoute:''
          }
          this.isView = true
          this.dialogVisible = true
          this.addType = true
          this.keyDisabled = false
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
          this.keyDisabled = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        deleteInfo(rowData) {
          this.$alert('是否删除这条记录', '信息删除', {
            confirmButtonText: '确定',
            callback: action => {
              var params = {
                dealerCode: rowData.dealerCode
              }
              axios.post('/dealerManage/dealer/deleteDealerInfo', qs.stringify(params)).then((res) => {
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
                axios.post('/dealerManage/dealer/updateDealerInfo', qs.stringify(result)).then((res) => {
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
                axios.post('/dealerManage/dealer/insertDealerInfo', qs.stringify(result)).then((res) => {
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