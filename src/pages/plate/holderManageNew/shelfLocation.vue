 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item label="货位编号" >
              <el-input v-model="searchBIN.locationNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="货架编号" >
              <el-input v-model="searchBIN.holderNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="货位类型" >
              <el-input v-model="searchBIN.locationTypeCode" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="区域" >
              <el-input v-model="searchBIN.warehouseArea" style="width:200px"></el-input>
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
        <el-col :span="5" >
          <el-form-item>  
              <el-button type="primary" @click="loadData">查询</el-button>
          </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
                <el-button type="primary" @click="restData">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
         <el-table :data="userInfoList" style="width: 100%" border   min-height="100">
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
             <el-table-column prop="locationNum" label="货位编号" width="200">
            </el-table-column>
             <el-table-column prop="locationTypeCode" label="货位类型" width="200">
            </el-table-column>
             <el-table-column prop="holderNum" label="货架编号" width="200">
            </el-table-column>
             <el-table-column prop="warehouseArea" label="区域" width="200">
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column label="操作"  min-width="350" fixed="right">
 
                <template slot-scope="scope">
 
                     <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button>
 
                     <el-button type="text" @click="modifyInfo(scope.row)">修改</el-button>
  
                     <!--<el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>-->
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
                   <el-form-item prop="locationNum" label="货位编号">
                    <el-input type="text" v-model="addFormData.locationNum" :disabled="true"></el-input>
                  </el-form-item>
                   <el-form-item prop="holderModelNumber" label="货位类型">
                    <el-input type="text" v-model="addFormData.locationTypeCode"  ></el-input>
                  </el-form-item>
                   <el-form-item prop="holderNum" label="货架编号">
                    <el-input type="text" v-model="addFormData.holderNum"  :disabled="true"></el-input>
                  </el-form-item>
                   <el-form-item prop="warehouseArea" label="区域">
                    <el-input type="text" v-model="addFormData.warehouseArea" :disabled="true"></el-input>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={locationId:'',locationNum:'',locationTypeCode:'',holderNum:'',warehouseArea:''}">取 消</el-button>
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
          keyDisabled:false,
          dialogVisibleStart:false,
          submitDisabled:true,
          dialogresult:false,
          tableDataDialog:[],
          isView: true,
          addFormData: {
            locationId:'',
            locationNum:'',
            locationTypeCode:'',
            holderNum:'',
            warehouseArea:''
          },
          searchBIN: {
            locationId:'',
            locationNum:'',
            locationTypeCode:'',
            holderNum:'',
            warehouseArea:'',
            currentPage:1,
            pageSize:50,
            totalRows:-1
          },
          addType:false,
          rulesAdd: {
            pi_holder_id: [{
              required: true,
              message: '货架ID不能为空',
              trigger: 'blur'
            }],
            pi_holder_num: [{
              required: true,
              message: '货架编码不能为空',
              trigger: 'blur'
            }],
            pi_orig_pos_x: [{
              required: true,
              message: '当前位置X不能为空',
              trigger: 'blur'
            }],
            pi_orig_pos_y: [{
              required: true,
              message: '当前位置Y不能为空',
              trigger: 'blur'
            }]
          }
        }
      },
  mounted: function () {
        this.loadData()
      },
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (row.isSucess === '否') {
            return 'warning-row'
          } 
          return 'success-row'
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
            locationId:'',
            locationNum:'',
            locationTypeCode:'',
            holderNum:'',
            warehouseArea:'',
            currentPage:currentPageTemp,
            pageSize:pageSizeTemp,
            totalRows:totalRowsTemp
          }
        }, 
        loadData() {
          let param = {'params': JSON.stringify(this.searchBIN)}
          axios.post('/holderManage/shelfLocation/selectShelfLocationListBySearch', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
            this.searchBIN.totalRows = res.data.totalRows
          })
        },
        add() {
          this.dialogVisibleStart = true
          // this.addFormReadOnly = false;
        }, // 获取表格选中时的数据
       selectRow (val) { 
        this.selectlistRow = val
        if(this.selectlistRow.length > 0){
            this.submitDisabled=false
        }else{
            this.submitDisabled=true
        }
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
          this.keyDisabled = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        deleteInfo(rowData) {
          this.$alert('是否删除这条记录', '信息删除', {
            confirmButtonText: '确定',
            callback: action => {
              var params = {
                holderId: rowData.holderId
              }
              axios.post('/holderManage/homePage/deleteHolderInfo', qs.stringify(params)).then((res) => {
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
                axios.post('/holderManage/shelfLocation/updateShelfLocationInfo', qs.stringify(result)).then((res) => {
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
                axios.post('/holderManage/homePage/insertHolderInfo', qs.stringify(result)).then((res) => {
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
     .el-table .warning-row {
         background: oldlace;
     }

     .el-table .success-row {
         background: #f0f9eb;
     }
 </style>