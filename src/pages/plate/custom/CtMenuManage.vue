 <template>
     <div class="mainContainer">
          <!--工具条-->
         <el-col :span="24" class="toolbar conMarginLeft" >
             <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                   </el-form-item>
                   <el-form-item>
                     <el-button type="primary" v-on:click="getUsers">查询</el-button>
                  </el-form-item>
                 <el-form-item>
                     <el-button type="info" @click="addUser">新增</el-button>
                  </el-form-item>
            </el-form>
       </el-col>


         <el-table :data="userInfoList" style="width: 100%" border>
            <el-table-column prop="name" label="节点名称" width="180">
            </el-table-column>
             <el-table-column prop="description" label="节点描述">
            </el-table-column>
             <el-table-column prop="available" label="节点状态" >
               <template slot-scope="scope">
                 {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus2,scope.row.available)}}
            </template>
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column label="操作" align="center" min-width="350">
 
                <template slot-scope="scope">
 
                     <el-button type="text" @click="checkDetail(scope.row)">子菜单管理</el-button>
 
                     <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
  
                     <!--<el-button type="text" @click="deleteUser(scope.row)">删除</el-button>-->
                  </template>
             </el-table-column>
             <!--编辑与增加的页面-->
         </el-table>
          <!--新增界面-->
         <el-dialog title="编辑" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item prop="name" label="节点名称">
                    <el-input type="text" v-model="addFormData.name"  placeholder="节点名称"></el-input>
                  </el-form-item>
                   <el-form-item prop="description" label="节点描述">
                    <el-input type="text" v-model="addFormData.description"  placeholder="节点描述"></el-input>
                  </el-form-item>
                   <el-form-item prop="available" label="节点状态">
                     <el-select placeholder="节点状态" v-model="addFormData.available">
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
                 <el-button @click.native="dialogVisible = false,addFormData={id:'',name:'',description:'',available:''}">取 消</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">确 定</el-button>
             </span>
          </el-dialog>
           <el-dialog
      title="编辑"
      :visible.sync="dialogVisibleStart"
      width="90%" @close="loadData">
 <div class="tableDate mainContainer">
    
    <div class="table">
       <el-row>
            <el-card style="min-height: 20px">          
              <span>{{'当前菜单节点名称:'+addFormData.name}}</span>
            </el-card>
          </el-row>
          <div class="button" style="width:8.5%;float:right;margin-top:60px;">
            <P><el-button class="el-icon-plus" @click.prevent="addRow()" ></el-button></P>
            <!--<p><el-button class="el-icon-minus" @click.prevent="delData()"></el-button></p>-->
            <p><el-button type="el-icon-minus" :disabled="submitDisabled" @click.prevent="submit">提交</el-button></p>
          </div>
       <el-table
        :data="tableData"
        ref="table"
        tooltip-effect="dark"
        border
        stripe
        style="width: 90%"
        @selection-change='selectRow'>
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column label="序号"  type="index" width="40" align="center"></el-table-column>
         <el-table-column prop="name" label="节点名称" width="180">
            <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="节点描述">
           <template slot-scope="scope">
            <el-input v-model="scope.row.description"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="节点URL" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.url"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="available" label="节点状态" >
          <template slot-scope="scope">
            <el-select placeholder="节点状态" v-model="scope.row.available">
                        <el-option
                            v-for="item in $Enum.EnumSelect().openStatus2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    </div>
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
          qs,
          axios,
          userInfoList: [],
          addFormReadOnly: true,
          dialogVisible: false,
          dialogVisibleStart:false,
          submitDisabled:true,
          isView: true,
          tableData: [{
          rowNum: 1,
          id:0,
          name: '',
          description: '',
          url: '',
          available:1
        }],
        selectlistRow: [],
          addFormData: {
            id: '',
            name: '',
            description: '',
            available: ''
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
            name: ''
          }
        }
      },
  mounted: function () {
        this.loadData()
      },
      methods: {
        loadData() {
          let param = {filter: this.filters.name}
          axios.post('/custom/ctMenu/selectCtMenuList', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
          })
        },
        getUsers() {
          this.loadData()
        },
        addUser() {
          this.addFormData = {
            id: '',
            name: '',
            description: '',
            available: ''
          }
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        checkDetail(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = false
          this.getChildMenuList(rowData.id)
          this.dialogVisibleStart = true
          //  this.addFormReadOnly = true;
        },
        getChildMenuList(arg){
          let param = {'parentId': arg}
          axios.post('/custom/ctMenu/selectChildCtMenuListByParentId', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.tableData = _data
          })
        },
        modifyUser(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
              // 获取表格选中时的数据
      selectRow (val) { 
        this.selectlistRow = val
        if(this.selectlistRow.length > 0){
            this.submitDisabled=false
        }else{
            this.submitDisabled=true
        }
      },
       submit(){
        let resultData = {}
        resultData.result=JSON.stringify(this.selectlistRow)
        resultData.parentId = this.addFormData.id
        this.axios.post('/custom/ctMenu/insertChildCtMenu', qs.stringify(resultData)).then(res => {
         if (res.errCode === 'S') {
            this.dialogVisibleStart=false
            this.loadData()
         }
       })
      },  
      // 增加行
      addRow () {
        var list = {
          rowNum: '',
          name: this.name,
          description: this.description,
          url: this.url,
          available:1
          }
          this.tableData.unshift(list)
      },
      // 删除方法
      // 删除选中行
      delData () {
        for (let i = 0; i < this.selectlistRow.length; i++) {
          let val = this.selectlistRow
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
          // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          val.forEach((val, index) => {
            this.tableData.forEach((v, i) => {
              if (val.rowNum === v.rowNum) {
                // i 为选中的索引
                this.tableData.splice(i, 1)
              }
            })
          })
        }
        // 删除完数据之后清除勾选框
        this.$refs.tableData.clearSelection()
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
                axios.post('/custom/ctMenu/updateCtMenu', qs.stringify(result)).then((res) => {
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
                axios.post('/custom/ctMenu/insertCtMenu', qs.stringify(result)).then((res) => {
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