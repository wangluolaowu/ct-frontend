 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item prop="ruleId" label="规则编号" >
              <el-input v-model="searchBIN.ruleId" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item prop="rulePriority" label="规则优先级" >
              <el-input v-model="searchBIN.rulePriority" style="width:200px"></el-input>
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
        <el-col :span="8">
            <el-form-item label="机器人编号">
              <el-input v-model="searchBIN.kidId" style="width:200px"></el-input>
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
            <el-table-column prop="ruleId" label="规则编号" fixed="left" width="200">
            </el-table-column>
            <el-table-column prop="rulePriority" label="规则优先级" width="200">
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="200">
            </el-table-column>
             <el-table-column prop="endTime" label="结束时间" width="200">
            </el-table-column>
             <el-table-column prop="designVersionNum" label="启用时间" width="200">
            </el-table-column>
             <el-table-column prop="kidMinBatteryPower" label="最低电量(%)" width="200">
            </el-table-column>
             <el-table-column prop="kidMaxBatteryPower" label="最高电量(%)" width="200">
            </el-table-column>
             <el-table-column prop="kidId" label="机器人编号" width="200">
            </el-table-column>
             <el-table-column prop="enableFlag" label="状态" width="200">
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
             <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item prop="ruleId" label="规则编号"> 
                    <el-input type="text" v-model="addFormData.ruleId" placeholder="规则编号" :disabled="keyDisabled"></el-input>
                  </el-form-item>
                  <el-form-item prop="rulePriority" label="规则优先级"> 
                    <el-input type="text" v-model="addFormData.rulePriority" placeholder="规则优先级" :disabled="keyDisabled"></el-input>
                  </el-form-item>
                   <el-form-item prop="startTime" label="开始时间">
                      <template>
                          <el-time-picker
                            v-model="addFormData.startTime"
                            :picker-options="{
                              selectableRange: '00:00:00 - 23:59:59'
                            }"
                            placeholder="任意时间点" value-format="HH:mm:ss"   format="HH:mm:ss">
                          </el-time-picker>
                        </template>
                  </el-form-item>
                   <el-form-item prop="endTime" label="结束时间">
                     <template>
                          <el-time-picker
                            v-model="addFormData.endTime"
                            :picker-options="{
                              selectableRange: '00:00:00 - 23:59:59'
                            }"
                            placeholder="任意时间点" value-format="HH:mm:ss"   format="HH:mm:ss">
                          </el-time-picker>
                        </template>
                  </el-form-item>
                   <el-form-item prop="designVersionNum" label="启用时间">
                    <el-input type="text" v-model="addFormData.designVersionNum"  placeholder="启用时间"></el-input>
                  </el-form-item>
                   <el-form-item prop="kidMinBatteryPower" label="最低电量(%)">
                    <el-input type="text" v-model="addFormData.kidMinBatteryPower" placeholder="最低电量(%)"></el-input>
                  </el-form-item>
                   <el-form-item prop="kidMaxBatteryPower" label="最高电量(%)">
                     <el-input type="text" v-model="addFormData.kidMaxBatteryPower" placeholder="最低电量(%)"></el-input>
                  </el-form-item>
                  <el-form-item prop="kidId" label="机器人编号">
                    <el-input type="text" v-model="addFormData.kidId" placeholder="机器人编号"></el-input>
                  </el-form-item>
                  <el-form-item prop="enableFlag" label="状态">
                    <el-input type="text" v-model="addFormData.enableFlag" placeholder="状态"></el-input>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={ruleId:'',rulePriority:'', startTime:'',endTime:'',designVersionNum:'',kidMinBatteryPower:'',kidMaxBatteryPower:'',kidId:'',enableFlag:''}">取 消</el-button>
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
            var _data = res.data.result
            this.userInfoList = _data
            this.searchBIN.totalRows = res.data.totalRows
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