 <template>
     <div class="mainContainer">
          <!--工具条-->
             <el-form class="demo-form-inline selectedCont clears" label-width="200px">
                <el-row>
                <el-col :span="8">
                    <el-form-item label="objectId">
                      <el-input v-model="filters.objectId" style="width:200px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">  
                    <el-form-item label="kidIncharge">
                      <el-input v-model="filters.kidIncharge" style="width:200px"></el-input>
                    </el-form-item>
                </el-col>   
                </el-row>
                 <el-row>
                <el-col :span="8">
                    <el-form-item label="taskId">
                      <el-input v-model="filters.taskId" style="width:200px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">  
                    <el-form-item label="referenceTaskId">
                      <el-input v-model="filters.referenceTaskId" style="width:200px"></el-input>
                    </el-form-item>
                </el-col>   
                </el-row>
                  <el-row>
                <el-col :span="8">
                    <el-form-item label="taskStatus">
                     <template> 
                    <el-select  v-model="filters.taskStatus" multiple filterable style="width:200px">
                    <el-option
                    v-for="item in $Enum.EnumSelect().task_status_all"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" 
                    > 
                  </el-option>
                </el-select>
                </template>
                </el-form-item>
                </el-col>
                <el-col :span="8">  
                 <el-form-item  :label="$t('label.label1_56')">
                 <el-select  v-model="filters.pageSize" style="width:200px">
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
                        <el-button type="primary" @click="loadData">{{$t('message.msg1_68')}}</el-button> 
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item>
                          <el-button type="primary" @click="restData">{{$t('message.msg1_30')}}</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
            </el-form>

         <el-table :data="userInfoList" style="width: 100%"   border>
            <el-table-column :label="$t('message.msg1_53')" align="center" min-width="100" fixed="left"  style='color:#fff;'>
                <template slot-scope="scope" >
                     <el-button type="text" @click="checkDetail(scope.row)">{{$t('message.msg1_54')}}</el-button>
                     <el-button type="text" v-show="scope.row.taskStatus === 98" @click="modifyUser(scope.row)">{{$t('message.msg1_55')}}</el-button>
                  </template>
             </el-table-column>
            <el-table-column prop="taskId" label="taskId" fixed  style='color:#fff!important;'>
            </el-table-column>
             <el-table-column prop="taskType" label="taskType" min-width='90'>
                <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().pi_task_type,scope.row.taskType)}}
                </template>
            </el-table-column>
             <el-table-column prop="referenceTaskId" label="referenceTaskId" min-width='150'>
            </el-table-column>
             <el-table-column prop="srcPosId" label="srcPosId"  >
            </el-table-column>
             <el-table-column prop="srcPosX" label="srcPosX" >
            </el-table-column>
            <el-table-column prop="srcPosY" label="srcPosY">
            </el-table-column>
             <el-table-column prop="destArea" label="destArea" min-width='90'>
            </el-table-column>
             <el-table-column prop="destPosId" label="destPosId" min-width='100'>
            </el-table-column>
             <el-table-column prop="destPosX" label="destPosX" min-width='100'>
            </el-table-column>
             <el-table-column prop="destPosY" label="destPosY" min-width='100'>
            </el-table-column>
             <el-table-column prop="taskStatus" label="taskStatus" min-width='120'>
               <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().task_status_all,scope.row.taskType)}}
                </template>
            </el-table-column>
             <el-table-column prop="creationDate" label="creationDate" min-width='120'>
                 <template slot-scope="scope">
                {{$DateFormat.dateFormat(scope.row.creationDate,true)}}
                </template>
            </el-table-column>
             <el-table-column prop="lastUpdateDate" label="lastUpdateDate" min-width='130'>
                 <template slot-scope="scope">
                {{$DateFormat.dateFormat(scope.row.lastUpdateDate,true)}}
               </template>
            </el-table-column>
             <el-table-column prop="reference01" label="reference01" min-width='130'>
            </el-table-column>
             <el-table-column prop="kidIncharge" label="kidIncharge" min-width='110'>
            </el-table-column>
             <el-table-column prop="destObjectSide" label="destObjectSide" min-width='150'>
                <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().pi_dest_object_side,scope.row.destObjectSide)}}
                </template>
            </el-table-column>
             <el-table-column prop="destObjectDirection" label="destObjectDirection" min-width='200'>
                  <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue(MD_MAP_DIRECTION_LIMIT,scope.row.destObjectSide)}}
                </template>
            </el-table-column>
             <el-table-column prop="objectGrossWeight" label="objectGrossWeight" min-width='200'>
            </el-table-column>
             <el-table-column prop="objectId" label="objectId" min-width='100'>
            </el-table-column>
             <el-table-column prop="priorityNum" label="priorityNum" min-width='150'>
            </el-table-column>
             <el-table-column prop="releaseLoadFlag" label="releaseLoadFlag" min-width='150'>
                  <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue(TM_MOVE_TASK_RELEASE_LOAD,scope.row.destObjectSide)}}
                </template>
            </el-table-column>
             <el-table-column prop="chargePointId" label="chargePointId" min-width='150'>
            </el-table-column>
             <el-table-column prop="wsId" label="wsId">
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
        
             <!--编辑与增加的页面-->
         </el-table>
          <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange" :current-page.sync="filters.currentPage" :page-size="filters.pageSize" :page-sizes="[filters.pageSize]" layout="total, sizes, prev, pager, next, jumper" :total="totalRows">
                </el-pagination>
          <!--新增界面-->
         <el-dialog :title="$t('message.msg1_75')" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData" :rules="rules2" label-width="200px" ref="addFormData" class="demo-ruleForm login-container">
                   <el-form-item label="Retcode">
                    <span>{{addFormData.po_retcode}}</span>
                   </el-form-item>
                   <el-form-item label="Retmsg">
                     <span>{{addFormData.po_retmsg}}</span>
                    </el-form-item>
                    <el-form-item label="Change Id">
                      <span>{{addFormData.po_change_id}}</span>
                    </el-form-item>
                     <el-form-item label="Task Id">
                    <el-input v-model="addFormData.taskId" placeholder="Task Id" min-width='410' :disabled="true"></el-input>
                    </el-form-item>
                     <el-form-item label="Task Type">
                          <el-select placeholder="Task Type" v-model="addFormData.taskType">
                        <el-option
                            v-for="item in $Enum.EnumSelect().pi_task_type"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="Src PosX">
                          <el-input v-model="addFormData.srcPosX" placeholder="Src PosX" min-width='410'></el-input>
                    </el-form-item>
                     <el-form-item label="Src PosY"> 
                         <el-input v-model="addFormData.srcPosY" placeholder="Src PosY" min-width='410'></el-input>
                    </el-form-item>
                     <el-form-item label="Dest PosX">
                    <el-input v-model="addFormData.destPosX" placeholder="Dest PosX" min-width='410'></el-input>
                    </el-form-item>
                     <el-form-item label="Dest PosY">
                    <el-input v-model="addFormData.destPosY" placeholder="Dest PosY" min-width='410'></el-input>
                    </el-form-item>
                     <el-form-item label="Dest Area"> 
                    <el-input v-model="addFormData.destArea" placeholder="Dest Area" min-width='410'></el-input>
                    </el-form-item>
                     <el-form-item label="Kid Incharge"> 
                    <el-input v-model="addFormData.kidIncharge" placeholder="Kid Incharge" min-width='410'></el-input>
                    </el-form-item>
                    <el-form-item label="Dest Object Side"> 
                        <el-select placeholder="Dest Object Side" v-model="addFormData.destObjectSide">
                        <el-option
                            v-for="item in $Enum.EnumSelect().pi_dest_object_side"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Dest Object Direction">
                        <el-select placeholder="Dest Object Direction" v-model="addFormData.destObjectDirection">
                        <el-option
                            v-for="item in MD_MAP_DIRECTION_LIMIT"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select> 
                    </el-form-item>
                     <el-form-item label="Object Gross Weight"> 
                    <el-input v-model="addFormData.objectGrossWeight" placeholder="Object Gross Weight" min-width='410'></el-input>
                    </el-form-item>
                     <el-form-item label="Object Id"> 
                    <el-input v-model="addFormData.objectId" placeholder="Object Id" min-width='410'></el-input>
                    </el-form-item>
                    <el-form-item label="Release Load Flag"> 
                         <el-select placeholder="Release Load Flag" v-model="addFormData.releaseLoadFlag">
                          <el-option
                            v-for="item in TM_MOVE_TASK_RELEASE_LOAD"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                          > 
                        </el-option>
                        </el-select>
                    </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,initParams">{{$t('message.msg1_30')}}</el-button>
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
          axios,
          userInfoList: [],
          addFormReadOnly: true,
          dialogVisible: false,
          isView: true,
          addFormData: {
            po_retcode: '',
            po_retmsg: '',
            po_change_id: '',
            taskId: '',
            taskType: '',
            srcPosX: '',
            srcPosY: '',
            destPosX:'',
            destPosY:'',
            destArea:'',
            kidIncharge:'',
            destObjectSide:'',
            destObjectDirection:'',
            objectGrossWeight:'',
            objectId:'',
            releaseLoadFlag:''
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
            taskId: '',
            referenceTaskId:'',
            objectId:'',
            kidIncharge:'',
            taskStatus:'',
            currentPage: 1,
            pageSize:50
          },
          totalRows:-1,
          MD_MAP_DIRECTION_LIMIT:[],
          TM_MOVE_TASK_RELEASE_LOAD:[]
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
                    if (item.lookupType === 'MD_MAP_DIRECTION_LIMIT') {
                    item.value = item.lookupValueNum
                    item.label = item.meaning||item.lookupValueNum
                    this.MD_MAP_DIRECTION_LIMIT.push(item)
                    }
                    if (item.lookupType === 'TM_MOVE_TASK_RELEASE_LOAD') {
                    item.value = item.lookupValueNum
                    item.label = item.meaning||item.lookupValueNum
                    this.TM_MOVE_TASK_RELEASE_LOAD.push(item)
                    }
                    return item
                })
                }
                this.loadData()
            })
       },
        restData(){
            this.filters.taskId = ''
            this.filters.referenceTaskId = '' 
            this.filters.objectId = ''
            this.filters.kidIncharge = '' 
            this.filters.taskStatus = '' 
        },  
        initParams(){
            this.addFormData.po_retcode=''
            this.addFormData.po_retmsg=''
            this.addFormData.po_change_id=''
            this.addFormData.taskId=''
            this.addFormData.taskType=''
            this.addFormData.srcPosX=''
            this.addFormData.srcPosY= ''
            this.addFormData.destPosX=''
            this.addFormData.destPosY=''
            this.addFormData.destArea=''
            this.addFormData.kidIncharge=''
            this.addFormData.destObjectSide=''
            this.addFormData.destObjectDirection=''
            this.addFormData.objectGrossWeight=''
            this.addFormData.objectId=''
            this.addFormData.releaseLoadFlag=''
        },  
        loadData() {
          let param = {'params': JSON.stringify(this.filters)}
          axios.post('/adminPageManage/createTask/selectCreateKidTaskChange', qs.stringify(param)).then((res) => {
            if(res.errCode === 'S'){
              this.userInfoList = res.data.result
              this.totalRows = res.data.totalRows
            }
          })
        },
       handleCurrentChange (val) {
         this.filters.currentPage = val
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
              axios.post('/adminPageManage/createTask/createKidTaskChange', qs.stringify(result)).then((res) => {
                  if (res.errCode === 'S') {
                    this.addFormData = res.data
                    this.$message({
                      type: 'info',
                      message: '修改成功'
                    })
                   
                  } else {
                    this.$message({
                      type: 'info',
                      message: '修改失败'
                    })
                  }
                  this.dialogVisible = false
                  this.loadData()
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