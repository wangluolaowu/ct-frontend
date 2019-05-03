 <template>
     <div class="mainContainer">
          <!--工具条-->
         <el-col :span="24" class="toolbar conMarginLeft" >
             <el-form :inline="true" :model="filters">
                <el-form-item  label="ipAddress">
                    <el-input v-model="filters.ipAddress"></el-input>
                   </el-form-item>
                   <el-form-item>
                     <el-button type="primary" v-on:click="loadData">{{$t("message.search")}}</el-button>
                  </el-form-item>
                 <el-form-item>
                     <el-button type="info" @click="addUser">{{$t("message.add")}}</el-button>
                  </el-form-item>
            </el-form>
       </el-col>


         <el-table :data="userInfoList" style="width: 100%" border>
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
             <el-table-column prop="ipAddress" label="ipAddress">
            </el-table-column>
             <el-table-column prop="activeFlag" label="activeFlag" >
                <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus3,scope.row.activeFlag)}}
                </template>
            </el-table-column>
            <el-table-column prop="adminFlag" label="adminFlag">
                <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus3,scope.row.adminFlag)}}
                </template>
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column label="操作" align="center" min-width="350">
 
                <template slot-scope="scope">
 
                     <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button>
 
                     <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
  
                     <!--<el-button type="text" @click="deleteUser(scope.row)">删除</el-button>-->
                  </template>
             </el-table-column>
             <!--编辑与增加的页面-->
         </el-table>
          <!--新增界面-->
         <el-dialog title="记录" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item prop="ipAddress" label="ipAddress">
                    <el-input type="text" v-model="addFormData.ipAddress"></el-input>
                  </el-form-item>
                   <el-form-item prop="activeFlag" label="activeFlag">
                      <el-select  v-model="addFormData.activeFlag">
                        <el-option
                            v-for="item in $Enum.EnumSelect().openStatus3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select>
                  </el-form-item>
                   <el-form-item prop="connPassword" label="密码">
                    <el-input type="password" v-model="addFormData.connPassword"></el-input>
                  </el-form-item>
                   <el-form-item prop="adminFlag" label="adminFlag" style="width:400px">
                    <el-select  v-model="addFormData.adminFlag">
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
                 <el-button @click.native="dialogVisible = false,addFormData={clientId:'',ipAddress:'',activeFlag:'',connPassword:'',adminFlag:''}">取 消</el-button>
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
           clientId:'',
           ipAddress:'',
           activeFlag:'',
           connPassword:'',
           adminFlag:''
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
            ipAddress: ''
          }
        }
      },
  mounted: function () {
        this.loadData()
      },
      methods: {
        loadData() {
          let param = {'ipAddress': this.filters.ipAddress}
          axios.post('/custom/mcClients/selectMcClients', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
          })
        },
        addUser() {
          this.addFormData = {
           clientId:'',
           ipAddress:'',
           activeFlag:'',
           connPassword:'',
           adminFlag:''
          }
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
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
        },
        deleteUser(rowData) {
          this.$alert('是否删除这条记录', '信息删除', {
            confirmButtonText: '确定',
            callback: action => {
              var params = {
                ctUserId: rowData.id
              }
              axios.post('/custom/mcClients/deleteCtUser', qs.stringify(params)).then((res) => {
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
              if (param.clientId) {
                axios.post('/custom/mcClients/updateMcClients', qs.stringify(result)).then((res) => {
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
                axios.post('/custom/mcClients/insertMcClients', qs.stringify(result)).then((res) => {
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