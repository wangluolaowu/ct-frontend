 <template>
     <div class="mainContainer alertMask">
          <!--工具条-->
         <el-col :span="24" class="toolbar conMarginLeft" >
             <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.role" :placeholder="$t('label.label10_18')"></el-input>
                   </el-form-item>
                   <el-form-item>
                     <el-button type="primary" v-on:click="loadData">{{$t('message.msg1_68')}}</el-button>
                  </el-form-item>
                 <el-form-item>
                     <el-button type="primary" @click="addUser">{{$t('message.msg1_52')}}</el-button>
                  </el-form-item>
            </el-form>
       </el-col>


         <el-table :data="userInfoList" style="width: 100%" border>
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
             <el-table-column prop="role"  :label="$t('label.label10_18')" min-width="150">
            </el-table-column>
             <el-table-column prop="description"  :label="$t('label.label10_19')"  min-width="150">
            </el-table-column>
            <el-table-column prop="available" :label="$t('label.label1_24')"> 
              <template slot-scope="scope">
                 {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus,scope.row.available)}}
            </template>
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column :label="$t('message.msg1_53')"  min-width="300" >
 
                <template slot-scope="scope" class='handleBtn'>
 
                     <el-button type="text" @click="checkDetail(scope.row)">{{$t('label.label10_20')}}</el-button>
                     <el-button type="text" @click="checkMenuDetail(scope.row)">{{$t('label.label10_21')}}</el-button>
                     <el-button type="text" @click="checkPermissionDetail(scope.row)">{{$t('label.label10_22')}}</el-button>
                     <el-button type="text" @click="modifyUser(scope.row)">{{$t('message.msg1_55')}}</el-button>
                     <!--<el-button type="text" @click="deleteUser(scope.row)">删除</el-button>-->
                  </template>
             </el-table-column>
             <!--编辑与增加的页面-->
         </el-table>
          <!--新增界面-->
         <el-dialog :title="$t('message.msg1_75')" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item prop="role" :label="$t('label.label10_18')">
                    <el-input type="text" v-model="addFormData.role" auto-complete="off" ></el-input>
                  </el-form-item>
                   <el-form-item prop="description" :label="$t('label.label10_19')">
                    <el-input type="text" v-model="addFormData.description" auto-complete="off" ></el-input>
                  </el-form-item>
                   <el-row> 
                   <el-col>
                   <el-form-item :label="$t('label.label1_24')"  >
                    <el-select  v-model="addFormData.available">
                        <el-option
                            v-for="item in $Enum.EnumSelect().openStatus"
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
                 <el-button @click.native="dialogVisible = false,addFormData={id:'',role:'',description:'',available:''}">{{$t('message.msg1_30')}}</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">{{$t('message.msg1_28')}}</el-button>
             </span>
          </el-dialog>
           <el-dialog :title="$t('label.label10_23')" :visible.sync="roleUserdialogVisible" width="60%" :close-on-click-modal="false"  @close="loadData" >
              <el-row>
                 <el-card style="min-height: 20px">          
                   <span>{{$t('label.label10_24')+addFormData.role}}</span>
                 </el-card>
               </el-row>
              <el-tree
              :data="data2"
              show-checkbox
              ref="userTree"
              highlight-current
              node-key="id"
              :default-expanded-keys="parentValue2"
              :default-checked-keys="value2"
              :props="defaultProps">
            </el-tree>
               <el-button  type="primary" @click="createRoleUser">{{$t('message.msg1_28')}}</el-button>
           </el-dialog> 
            <el-dialog :title="$t('label.label10_28')" :visible.sync="roleMenudialogVisible" width="60%" :close-on-click-modal="false"   @close="loadData">
              <el-row>
                 <el-card style="min-height: 20px">          
                   <span>{{$t('label.label10_24')+':'+addFormData.role}}</span>
                 </el-card>
               </el-row>
                <el-tree
              :data="treeData"
              show-checkbox
              ref="tree"
              highlight-current
              node-key="id"
              :default-expanded-keys="treeParentValue"
              :default-checked-keys="treeValue"
              :props="defaultProps">
            </el-tree>
               <el-button  type="primary" @click="createRoleMenu">{{$t('message.msg1_28')}}</el-button>
           </el-dialog>  
            <el-dialog :title="$t('label.label10_29')" :visible.sync="rolePermissiondialogVisible" width="60%" :close-on-click-modal="false"  @close="loadData" >
              <el-row>
                 <el-card style="min-height: 20px">          
                   <span>{{$t('label.label10_24')+':'+addFormData.role}}</span>
                 </el-card>
               </el-row>
               <div>
                <el-input
                  placeholder="输入关键字进行过滤"
                  v-model="filterText">
                </el-input>
              </div>
                <el-tree
                 class="filter-tree"
                 :load="getPermissionValue"
                  lazy
                  show-checkbox
                  ref="permissionTree"
                  highlight-current
                  node-key="id"
                  :default-expanded-keys="[rootNode.id]"
                  :default-checked-keys="[]"
                  :props="defaultProps"
                  :filter-node-method="filterNode">
                </el-tree>
               <el-button  type="primary" @click="createPermissionUser">{{$t('message.msg1_28')}}</el-button>
           </el-dialog> 
     </div>
  </template>
  
  <script>
    import axios from '../../../util/http'
    import EnumSelect from '../../../util/enum'
    import qs from 'qs'
    export default {
      name: 'home',
      data() {
        return {
          filterText: '',
          data2: [],
          value2: [],
          parentValue2:[],
          treeValue:[],
          treeParentValue:[],
          treeData:[],
          pinyin: [],
          permissionValue:[],
          permissionData:[],
          permissionPinyin:[],
          rootNode : {
          id : "10000",
          label : "权限"
          },
          defaultProps: {
            children: 'children',
            label: 'label',
            isLeaf: 'leaf'
          },
          isFirst:true,
          node:[],
          resolve:[],
          userInfoList: [],
          openStatus: [],
          addFormReadOnly: true,
          dialogVisible: false,
          roleUserdialogVisible: false,
          roleMenudialogVisible:false,
          rolePermissiondialogVisible:false,
          isView: true,
          currentRoleId:'',
          addFormData: {
            id: '',
            role: '',
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
            role: ''
          }
        }
      },
     mounted: function () {
        this.loadData()
      },
     watch: {
        filterText(val) {
          this.$refs.permissionTree.filter(val)
        }
      },
      methods: {
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1
        },
        getUserValue () {
          this.data2 = []
          this.value2 = []
          this.parentValue2 = []
          axios.post('custom/common/selectUserListByRoleId', qs.stringify({'ctRoleId':this.addFormData.id})).then((res) => {
            if (res.errCode === 'S') {
                 if(res.data.resultTree){
                  this.data2=res.data.resultTree.map(item => {
                  let itemTemp = {}
                  itemTemp.id = '10000'+item.id
                  itemTemp.label = item.departmentName
                  let children = item.ctUserList.map(childItem =>{
                    let childItemTemp = {}
                    childItemTemp.id = childItem.id
                    childItemTemp.label = childItem.username
                    return childItemTemp
                  })
                  itemTemp.children = children
                  return itemTemp
               })
              } 
              if(res.data.resultSelectTree){
                 res.data.resultSelectTree.map(item => {
                  this.parentValue2.push('10000'+item.id)
                  item.ctUserList.map(childItem =>{
                     this.value2.push(childItem.id)                   
                    return childItem
                  })
                  return item
               })
              }
            }
          })
        },
        getPermissionValue (node,resolve) {
          if(this.isFirst){
             this.node = node
             this.resolve = resolve
             this.isFirst = false
           }
           if(this.$refs.permissionTree!=undefined) this.checkedKeys = this.$refs.permissionTree.getCheckedKeys();
           if (node.level == 0) {
              return resolve([this.rootNode]);
           } else {
          this.permissionValue = []
          this.permissionData = []
          axios.post('custom/common/selectRolePermissionList', qs.stringify({'roleId':this.addFormData.id})).then((res) => {
            if (res.errCode === 'S') {
                let childrenTemp = []
                childrenTemp = res.data.result.map(item=>{
                  let itemTempChildren = {}
                  itemTempChildren.id = item.id
                  itemTempChildren.label = item.name+":"+item.permission
                  itemTempChildren.leaf = true 
                  return itemTempChildren       
               })
               resolve(childrenTemp)
              if(res.data.resultSelect){
                 res.data.resultSelect.map(item => { 
                   this.permissionValue.push(item.id)
                   return item
               })
               if(this.$refs.permissionTree!=undefined) this.$refs.permissionTree.setCheckedKeys(this.permissionValue);
              } 
            }
          })
          }
        },
        getTreeValueAndData () {
          this.treeValue = []
          this.treeData = []
          this.treeParentValue = []
          
          axios.post('custom/common/selectTreeCtMenuList', qs.stringify({'roleId':this.addFormData.id})).then((res) => {
            if (res.errCode === 'S') {
              if(res.data.resultTree){
              this.treeData=res.data.resultTree.map(item => {
                  let itemTemp = {}
                  itemTemp.id = item.id
                  itemTemp.label = item.name
                  let children = item.subMenuVoList.map(childItem =>{
                    let childItemTemp = {}
                    childItemTemp.id = childItem.id
                    childItemTemp.label = childItem.name
                    return childItemTemp
                  })
                  itemTemp.children = children
                  return itemTemp
               })
              } 
              if(res.data.resultSelectTree){
                 res.data.resultSelectTree.map(item => {
                  this.treeParentValue.push(item.id)
                  item.subMenuVoList.map(childItem =>{
                     this.treeValue.push(childItem.id)                   
                    return childItem
                  })
                  return item
               })
              }
            }
          })
        },
        createRoleMenu(){
          let menuData = [].concat(this.$refs.tree.getCheckedKeys(), this.$refs.tree.getHalfCheckedKeys())
          let dataResult = {}
           dataResult.roleId = this.addFormData.id
           this.$refs.tree.getCheckedKeys()
           dataResult.menuIdList = JSON.stringify(menuData)
           axios.post('custom/common/updateCtUserMenuInfo', qs.stringify(dataResult)).then((res) => {
            if (res.errCode === 'S') {
              this.$message({
                      type: 'info',
                      message: '提交成功'
                    })
            }else{
               this.$message({
                    type: 'info',
                    message: `提交失败`
                  })
            }
            this.roleMenudialogVisible = false
            this.loadData()
          })   
        },
        createPermissionUser(){
          let dataResult = {}
          let valueData = [].concat(this.$refs.permissionTree.getCheckedKeys())
           dataResult.roleId = this.addFormData.id
           dataResult.permissionIdList = JSON.stringify(valueData)
           axios.post('custom/common/updateRolePermission', qs.stringify(dataResult)).then((res) => {
            if (res.errCode === 'S') {
              this.$message({
                      type: 'info',
                      message: '提交成功'
                    })
            }else{
               this.$message({
                    type: 'info',
                    message: `提交失败`
                  })
            }
            this.rolePermissiondialogVisible = false
            this.loadData()
          })   
        },
        createRoleUser(val) {
           let dataResult = {}
           let valueData = [].concat(this.$refs.userTree.getCheckedKeys())
           dataResult.roleId = this.addFormData.id
           dataResult.userIdList = JSON.stringify(valueData)
           axios.post('custom/common/updateCtUserRoleInfo', qs.stringify(dataResult)).then((res) => {
            if (res.errCode === 'S') {
              this.$message({
                      type: 'info',
                      message: '提交成功'
                    })
            }else{
               this.$message({
                    type: 'info',
                    message: `提交失败`
                  })
            }
            this.roleUserdialogVisible = false
            this.loadData()
          })   
        },
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1
        },
        filterMethodPermission(query, item) {
          return item.pinyin.indexOf(query) > -1
        },
        loadData() {
          let param = {'role': this.filters.role}
          axios.post('custom/ctRole/selectCtRoleList', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
          })
        },
        addUser() {
          this.addFormData = {
            id: '',
            role: '',
            description: '',
            available: ''
          }
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        checkPermissionDetail(rowData){
          this.addFormData = Object.assign({}, rowData) 
          this.rolePermissiondialogVisible = true
          this.filterText = ''
          if(this.isFirst === false){
            this.node.childNodes = []
            this.getPermissionValue(this.node,this.resolve)
          }
        },
        checkMenuDetail(rowData){
          this.addFormData = Object.assign({}, rowData) 
          this.getTreeValueAndData()
          this.roleMenudialogVisible = true
        },
        checkDetail(rowData) {
          this.addFormData = Object.assign({}, rowData) 
          this.getUserValue()
          this.roleUserdialogVisible = true
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
                ctRoleId: rowData.id
              }
              axios.post('/custom/ctRole/deleteCtRole', qs.stringify(params)).then((res) => {
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
                axios.post('/custom/ctRole/updateCtRole', qs.stringify(result)).then((res) => {
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
                axios.post('/custom/ctRole/insertCtRole', qs.stringify(result)).then((res) => {
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
     .el-transfer__buttons{
       box-sizing:border-box;
       -o-box-sizing:border-box;
       padding:0;
     }
   .el-transfer__buttons  .el-transfer__button{
      width:40px!important;
      height:40px!important;
    }
    .el-transfer-panel{
        width: 300px;
        height: 500px;
    }
    .el-transfer-panel__list.is-filterable{
        height: 400px;
    }
 </style>