 <template>
     <div class=" mainContainer">
          <!--工具条-->
         <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
             <el-form :inline="true" :model="filters">
                <el-form-item label="posX">
                    <el-input v-model="filters.posX"></el-input>
                   </el-form-item>
                   <el-form-item label="posY ">
                    <el-input v-model="filters.posY "></el-input>
                   </el-form-item>
                   <el-form-item>
                     <el-button type="primary" v-on:click="getUsers">查询</el-button>
                     <el-button type="info" v-on:click="reset">清空</el-button>
                  </el-form-item>
            </el-form>
       </el-col>


         <el-table :data="userInfoList" style="width: 100%"   border min-height="100px">
            <el-table-column label="操作" align="center" min-width="100" fixed="left" >
                <template slot-scope="scope" >
                     <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button>
                     <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
                  </template>
             </el-table-column>
            <el-table-column prop="posId" label="posId">
            </el-table-column>
             <el-table-column prop="posX" label="posX" min-width='90'>
            </el-table-column>
             <el-table-column prop="posY" label="posY" min-width='150'>
            </el-table-column>
             <el-table-column prop="functionalArea" label="functionalArea" min-width='150' >
                 <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue(MAP_FUNCTION_AREA,scope.row.functionalArea)}}
                </template>
            </el-table-column>
             <el-table-column prop="directionLimit" label="directionLimit" min-width='150'>
                  <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue(MD_MAP_DIRECTION_LIMIT,scope.row.directionLimit)}}
                </template>
            </el-table-column>
            <el-table-column prop="noloadForbidden" label="noloadForbidden" min-width='150'>
            </el-table-column>
             <el-table-column prop="enableFlag" label="enableFlag" min-width='100'>
                  <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().enable_flag,scope.row.enableFlag)}}
                </template>
            </el-table-column>
             <el-table-column prop="distanceY1" label="distanceY1" min-width='100'>
            </el-table-column>
             <el-table-column prop="distanceY2" label="distanceY2" min-width='100'>
            </el-table-column>
             <el-table-column prop="distanceX4" label="distanceX4" min-width='100'>
            </el-table-column>
             <el-table-column prop="distanceX8" label="distanceX8" min-width='120'>
            </el-table-column>
             <el-table-column prop="distArea1" label="distArea1" min-width='130'>
            </el-table-column>
             <el-table-column prop="distArea2" label="distArea2" min-width='110'>
            </el-table-column>
             <el-table-column prop="distArea3" label="distArea3" min-width='150'>
            </el-table-column>
             <el-table-column prop="distArea4" label="distArea4" min-width='90'>
            </el-table-column>
         </el-table>
          <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange" :current-page.sync="filters.currentPage" :page-size="filters.pageSize" :page-sizes="[filters.pageSize]" layout="total, sizes, prev, pager, next, jumper" :total="totalRows">
                </el-pagination>
          <!--新增界面-->
         <el-dialog title="Form on MD_WH_MAP_DETAILS_V" :visible.sync="dialogVisible" width="80%" :close-on-click-modal="false">
             <el-form :label-position="labelPosition" label-width="150px"  :model="addFormData" :rules="rules2"  ref="addFormData" class="demo-ruleForm login-container">
                  <el-form-item label="PosId">
                    <span>{{addFormData.posId}}</span>
                   </el-form-item>
                   <el-form-item label="PosX">
                     <span>{{addFormData.posX}}</span>
                    </el-form-item>
                    <el-form-item label="PosY">
                      <span>{{addFormData.posY}}</span>
                    </el-form-item>
                     <el-form-item label="Functional Area">
                    <el-select v-model="addFormData.functionalArea">
                        <el-option
                            v-for="item in MAP_FUNCTION_AREA"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="Direction Limit"> 
                   <el-select v-model="addFormData.directionLimit">
                    <el-option
                            v-for="item in MD_MAP_DIRECTION_LIMIT"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                    </el-select>
                    </el-form-item>
                     <el-form-item label="Noload Forbidden">
                    <el-input v-model="addFormData.noloadForbidden"  style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="Enable Flag">
                     <el-select v-model="addFormData.enableFlag">
                        <el-option
                            v-for="item in $Enum.EnumSelect().enable_flag"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="Distance Y1"> 
                          <el-input v-model="addFormData.distanceY1"  style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="Distance Y2"> 
                         <el-input v-model="addFormData.distanceY2"  style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="Distance X4"> 
                         <el-input v-model="addFormData.distanceX4"  style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="Distance X8"> 
                         <el-input v-model="addFormData.distanceX8"  style="width:400px"></el-input>
                    </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,initParams">取 消</el-button>
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
          axios,
          labelPosition:'right',
          userInfoList: [],
          addFormReadOnly: true,
          dialogVisible: false,
          isView: true,
          addFormData: {
            posId:'',
            posX:'',
            posY:'',
            functionalArea:'',
            directionLimit:'',
            noloadForbidden:'',
            enableFlag:'',
            distanceY1:'',
            distanceY2:'',
            distanceX4:'',
            distanceX8:''
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
          },
          filters: {
            posX: '',
            posY:'',
            currentPage: 1,
            pageSize:50
          },
          totalRows:-1,
          MAP_FUNCTION_AREA:[],
          MD_MAP_DIRECTION_LIMIT:[]
        }
      },
  mounted: function () {
        this.getEnumSelectValues()
      },
      methods: {
        getEnumSelectValues() {
            this.axios.get('common/enum/selectEnumList', {
                params: 'test'
            }).then((res) => {
                if (res.errCode === 'S') {
                    res.data.result.map(item => {
                    if (item.lookupType === 'MAP_FUNCTION_AREA') {
                    item.value = item.lookupValueNum
                    item.label = item.meaning||item.lookupValueNum
                    this.MAP_FUNCTION_AREA.push(item)
                    }
                    if (item.lookupType === 'MD_MAP_DIRECTION_LIMIT') {
                    item.value = item.lookupValueNum
                    item.label = item.meaning||item.lookupValueNum
                    this.MD_MAP_DIRECTION_LIMIT.push(item)
                    }
                    return item
                })
                }
                this.loadData()
            })
       },
        reset(){
            this.filters.posX = ''
            this.filters.posY = '' 
        },  
        initParams(){
           this.addFormData = {
            posId:'',
            posX:'',
            posY:'',
            functionalArea:'',
            directionLimit:'',
            noloadForbidden:'',
            enableFlag:'',
            distanceY1:'',
            distanceY2:'',
            distanceX4:'',
            distanceX8:''
          }
        },  
        loadData() {
          let param = {'params': JSON.stringify(this.filters)}
          axios.post('/adminPageManage/createTask/selectMdWhMapDetails', qs.stringify(param)).then((res) => {
              if(res.errCode === "S"){
                 this.userInfoList = res.data.result
                 this.totalRows = res.data.totalRows
               }
          })
        },
       handleCurrentChange (val) {
         this.filters.currentPage = val
         this.loadData()
       },
        getUsers() {
          this.loadData()
        },
        checkDetail(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = false
          this.dialogVisible = true
          //  this.addFormReadOnly = true;
        },
        modifyUser(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        }, // 增加一条记录
        addSubmit() {
        // 先判断表单是否通过了判断
          this.$refs.addFormData.validate((valid) => {
            // 代表通过验证 ,将参数传回后台
            if (valid) {
              let result = {}
              result.params = JSON.stringify(this.addFormData)
              axios.post('/adminPageManage/createTask/updateMdWhMapDetails', qs.stringify(result)).then((res) => {
                  if (res.errCode === 'S') {
                    this.addFormData = res.data
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
                  this.dialogVisible=false
                })
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
    .creatCon .el-table__body-wrapper{
        height:60px!important;
     }
     .creatCon  .el-table thead{
      color:#fff;
     }
 </style>