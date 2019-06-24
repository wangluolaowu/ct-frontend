 <template>
     <div class="mainContainer">
          <!--工具条-->
         <el-col :span="24" class="toolbar conMarginLeft" >
             <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.username" placeholder="username"></el-input>
                   </el-form-item>
                   <el-form-item>
                     <el-button type="primary" v-on:click="loadData">{{$t('message.msg1_68')}}</el-button>
                  </el-form-item>
                 <el-form-item>
                     <el-button type="primary" @click="addUser">{{$t('message.msg1_52')}}</el-button>
                  </el-form-item>
                <el-form-item class='sublimtInfo'>
                   <el-button  type="primary"  @click="SetDownloadFunc">{{$t('message.msg1_27')}}</el-button>
              </el-form-item>
            </el-form>
       </el-col>


         <el-table :data="userInfoList" style="width: 100%" border>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="firstName" label="FirstName" >
            </el-table-column>
             <el-table-column prop="lastName" label="LastName">
            </el-table-column>
             <el-table-column prop="username" :label="$t('label.label10_15')" >
            </el-table-column>
            <el-table-column prop="departmentId" :label="$t('label.label12_01')" min-width="100">
              <template  slot-scope="scope">
                 {{$Enum.getEnumSelectByValue(departmentList,scope.row.departmentId)}}
              </template>
            </el-table-column>
             <el-table-column prop="email" label="Email" >
            </el-table-column>
            <el-table-column prop="state" :label="$t('label.label1_24')">
                <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus3,scope.row.state)}}
                </template>
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column label="操作" align="center" min-width="350">
 
                <template slot-scope="scope">
 
                     <el-button type="text" @click="checkDetail(scope.row)">{{$t('message.msg1_54')}}</el-button>
 
                     <el-button type="text" @click="modifyUser(scope.row)">{{$t('message.msg1_55')}}</el-button>
  
                     <el-button type="text" @click="deleteUser(scope.row)">{{$t('message.msg1_56')}}</el-button>
                     <el-button type="text" @click="updatePassword(scope.row)">{{$t('message.msg1_78')}}</el-button>
                  </template>
             </el-table-column>
             <!--编辑与增加的页面-->
         </el-table>
           <!--新增界面-->
         <el-dialog :title="$t('message.msg1_75')" :visible.sync="dialogVisibleAgain" width="50%" :close-on-click-modal="false" @close="clearValidate('addFormDataAgain')">
             <el-form :model="addFormDataAgain" :rules="rules" ref="addFormDataAgain" label-width="150px" class="demo-ruleForm login-container">
                   <el-form-item prop="password" :label="$t('label.label10_33')" v-if="!(addFormData.id > 0)">
                    <el-input type="password" v-model="addFormDataAgain.password" ></el-input>
                  </el-form-item>
             </el-form>   
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormDataAgain={id:'',password:''}">{{$t('message.msg1_30')}}</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmitAgain">{{$t('message.msg1_28')}}</el-button>
             </span>
          </el-dialog>
          <!--新增界面-->
         <el-dialog :title="$t('message.msg1_75')" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" @close="clearValidate('addFormData')">
             <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item prop="firstName" label="FirstName" >
                    <el-input type="text" v-model="addFormData.firstName" placeholder="FirstName" :maxlength="20"></el-input>
                  </el-form-item>
                   <el-form-item prop="lastName" label="LastName" >
                    <el-input type="text" v-model="addFormData.lastName"  placeholder="LastName" :maxlength="20"></el-input>
                  </el-form-item>
                   <el-form-item prop="username" :label="$t('label.label10_15')" >
                    <el-input type="text" v-model="addFormData.username"  :maxlength="20"></el-input>
                  </el-form-item>
                   <el-form-item prop="password" :label="$t('label.label10_01')" v-if="!(addFormData.id > 0)">
                    <el-input type="password" v-model="addFormData.password" ></el-input>
                  </el-form-item>
                   <el-form-item prop="email" label="Email">
                    <el-input type="text" v-model="addFormData.email" placeholder="Email" ></el-input>
                  </el-form-item>
                 <el-row> 
                 <el-col>
                   <el-form-item prop="departmentId" :label="$t('label.label12_01')" style="width:400px">
                    <el-select  v-model="addFormData.departmentId">
                        <el-option
                            v-for="item in departmentList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select>
                  </el-form-item>
                   </el-col>
                <el-col>
                <el-form-item prop="state" :label="$t('label.label1_24')"  style="width:400px">
                    <el-select  v-model="addFormData.state">
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
                 </el-row>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={id:'',firstName:'',departmentId,lastName:'',username:'',password:'',email:'',state:''}">{{$t('message.msg1_30')}}</el-button>
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
          departmentList:[],
          isView: true,
          dialogVisibleAgain:false,
          addFormData: {
            id: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            departmentId:'',
            state: ''
          },
          addFormDataAgain: {
            id: '',
            password: ''
          },
          rules:{
            password: [{
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            },{ validator:this.$validate.isPassword, trigger: 'blur' }],
          },
          rules2: {
            firstName: [{
              required: true,
              message: 'FirstName不能为空',
              trigger: 'blur'
            }],
            lastName: [{
              required: true,
              message: 'LastName不能为空',
              trigger: 'blur'
            }],
             username: [{
              required: true,
              message: '用户名不能为空',
              trigger: 'blur'
            }], 
            password: [{
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            },{ validator:this.$validate.isPassword, trigger: 'blur' }],
             email: [{
              required: true,
              message: '邮箱不能为空',
              trigger: 'blur'
            },{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }], 
            state: [{
              required: true,
              message: '状态不能为空',
              trigger: 'blur'
            }]
          },
          filters: {
            username: ''
          }
        }
      },
    mounted: function () {
      this.getCtDepartmentList()
      this.loadData()
      },
      methods: {
        clearValidate(formName) {
          this.$refs[formName].clearValidate();
        }, 
        getCtDepartmentList(){
          let param = {'departmentName': ''}
          axios.post('/custom/ctDepartment/selectCtDepartmentList', qs.stringify(param)).then((res) => {
            if(res.errCode === 'S'){
               this.departmentList = res.data.result
               if(this.departmentList){
               this.departmentList.map(item=>{
                  item.value=item.id
                  item.label = item.departmentName 
               })
               }
            }
          })
        },
        loadData() {
          let param = {'username': this.filters.username}
          axios.post('/custom/ctUser/selectCtUserList', qs.stringify(param)).then((res) => {
            if(res.errCode === 'S'){
               var _data = res.data.result
               this.userInfoList = _data
            }
          })
        },
        addUser() {
          this.addFormData = {
            id: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            departmentId:'',
            state: 1
          }
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        updatePassword(rowData){
          this.addFormDataAgain = Object.assign({}, rowData)
          this.addFormDataAgain.password = ''
          this.dialogVisibleAgain = true
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
              axios.post('/custom/ctUser/deleteCtUser', qs.stringify(params)).then((res) => {
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
              if (param.id) {
                axios.post('/custom/ctUser/updateCtUser', qs.stringify(result)).then((res) => {
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
                axios.post('/custom/ctUser/insertCtUser', qs.stringify(result)).then((res) => {
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
        }, 
        addSubmitAgain() {
        // 先判断表单是否通过了判断
          this.$refs.addFormDataAgain.validate((valid) => {
            // 代表通过验证 ,将参数传回后台
            if (valid) {
              let param = Object.assign({}, this.addFormDataAgain)
              let result = {}
              result.result = JSON.stringify(param)
              axios.post('/custom/ctUser/updateCtUser', qs.stringify(result)).then((res) => {
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
                  this.dialogVisibleAgain = false
                })
               this.loadData()
            }
          })
        }, 
        SetDownloadFunc (arg1) {
        let fileName = 'Daimler BIXI 用户数据'
        axios.postD('custom/ctUser/exportCtUserList', {}).then(res => {
        const content = res
        const blob = new Blob([content], {type: 'application/vnd.ms-excel'})
        const exportFileName = this.$DateFormat.dateFormat(new Date(),true)+'_'+fileName+'.xlsx'
        if ('download' in document.createElement('a')) { // 非IE下载
          this.$message.warning('文件下载中。。。')
          const elink = document.createElement('a')
          elink.download = exportFileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          this.$message.warning('文件下载中。。。')
          navigator.msSaveBlob(blob, exportFileName)
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