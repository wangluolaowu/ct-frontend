 <template>
     <div class="mainContainer alertMask">
          <!--工具条-->
         <el-col :span="24" class="toolbar conMarginLeft" >
             <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" :placeholder="$t('label.label10_08')" ></el-input>
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
             <el-table-column prop="name" :label="$t('label.label10_08')"  min-width="200">
            </el-table-column>
             <el-table-column prop="permission"  :label="$t('label.label10_09')"  min-width="200">
            </el-table-column>
            <el-table-column prop="available"  :label="$t('label.label1_24')"> 
              <template slot-scope="scope">
                 {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus,scope.row.available)}}
            </template>
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column :label="$t('message.msg1_53')" align="center" min-width="250" >
 
                <template slot-scope="scope" class='handleBtn'>
 
                     <el-button type="text" @click="checkDetail(scope.row)">{{$t('message.msg1_77')}}</el-button>
                     <el-button type="text" @click="modifyUser(scope.row)">{{$t('message.msg1_55')}}</el-button>
                     <!--<el-button type="text" @click="deleteUser(scope.row)">删除</el-button>-->
                  </template>
             </el-table-column>
             <!--编辑与增加的页面-->
         </el-table>
          <!--新增界面-->
         <el-dialog :title="$t('message.msg1_75')" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item prop="name"  :label="$t('label.label10_08')">
                    <el-input type="text" v-model="addFormData.name" auto-complete="off" ></el-input>
                  </el-form-item>
                   <el-form-item prop="permission"  :label="$t('label.label10_09')">
                    <el-input type="text" v-model="addFormData.permission" auto-complete="off" ></el-input>
                  </el-form-item>
                   <el-row> 
                   <el-col>
                   <el-form-item :label="$t('label.label1_24')">
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
                 <el-button @click.native="dialogVisible = false,addFormData={id:'',name:'',permission:'',available:''}">{{$t('message.msg1_30')}}</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">{{$t('message.msg1_28')}}</el-button>
             </span>
          </el-dialog>
          <el-dialog  :title="$t('label.label10_10')" :visible.sync="roleUserdialogVisible" width="90%" :close-on-click-modal="false"  @close="loadData" >
              <el-row>
                 <el-card style="min-height: 20px">          
                   <span>{{$t('label.label10_11')+addFormData.name + '   ' + addFormData.permission}}</span>
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
                :load="handleLoad"
                lazy
                node-key="id"
                ref="menuListTree"
                show-checkbox
                :default-expanded-keys="[rootNode.id]"
                :default-checked-keys="[]"
                :props="defaultProps"
                :filter-node-method="filterNode">
                
              </el-tree>
               <el-button  type="primary" @click="createRoleUser" >{{$t('message.msg1_28')}}</el-button>
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
          pinyin: [],
          treeData:[],
          treeValue:[],
          treeParentValue:[],
          rootNode : {
          id : "10000",
          label : "资源"
          },
          defaultProps: {
            children: 'children',
            label: 'label',
            isLeaf: 'leaf'
          },
          userInfoList: [],
          openStatus: [],
          addFormReadOnly: true,
          dialogVisible: false,
          roleUserdialogVisible: false,
          roleMenudialogVisible:false,
          isView: true,
          currentRoleId:'',
          isFirst:true,
          node:[],
          resolve:[],
          addFormData: {
            id: '',
            name: '',
            permission: '',
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
          },

        }
      },
      mounted: function () {
        this.loadData()
      },
      watch: {
        filterText(val) {
          this.$refs.menuListTree.filter(val)
        }
      },
      methods: {
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1
        },
        handleLoad(node,resolve){
           if(this.isFirst){
             this.node = node
             this.resolve = resolve
             this.isFirst = false
           }
           if(this.$refs.menuListTree!=undefined) this.checkedKeys = this.$refs.menuListTree.getCheckedKeys();
           if (node.level == 0) {
              return resolve([this.rootNode]);
           } else {
             this.treeData = []
             this.treeValue = []
             let children = []
              axios.post('custom/common/selectResourcePermissionList', qs.stringify({'permissionId':this.addFormData.id})).then((res) => {
              if (res.errCode === 'S') {
              children = res.data.result.map(item => {
                  let itemTemp = {}
                  itemTemp.id = item.id
                  itemTemp.label = item.description + "--" + item.url 
                  itemTemp.leaf = true     
                  return itemTemp    
              }) 
              resolve(children)
             if(res.data.resultSelect){
                res.data.resultSelect.map(item => { 
                   this.treeValue.push(item.id)
                  return item
               })
              }
              //console.log('333=======' +  JSON.stringify(this.treeValue))
              if(this.$refs.menuListTree!=undefined) this.$refs.menuListTree.setCheckedKeys(this.treeValue);
            }
            })
            
          }
        },
        createRoleUser(val) {
           let dataResult = {}
           let valueData = [].concat(this.$refs.menuListTree.getCheckedKeys())
           dataResult.permissionId = this.addFormData.id
           dataResult.resourceIdList = JSON.stringify(valueData)
           axios.post('custom/common/updateResourcePermission', qs.stringify(dataResult)).then((res) => {
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
        loadData() {
          let param = {'name': this.filters.name}
          axios.post('custom/permission/selectCtPermissionList', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
          })
        },
        addUser() {
          this.addFormData = {
            id: '',
            available: '',
            name: '',
            permission: ''
          }
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        checkDetail(rowData) {
          this.addFormData = Object.assign({}, rowData)   
          this.roleUserdialogVisible = true
          this.filterText = ''
          if(this.isFirst === false){
            this.node.childNodes = []
            this.handleLoad(this.node,this.resolve)
          }
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
                axios.post('/custom/permission/updateCtPermission', qs.stringify(result)).then((res) => {
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
                axios.post('/custom/permission/insertCtPermission', qs.stringify(result)).then((res) => {
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
        width: 600px;
        height: 600px;
    }
    .el-transfer-panel__list.is-filterable{
        height: 600px;
    }
 </style>