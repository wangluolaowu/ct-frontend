 <template>
     <div class="mainContainer">
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
                  <el-form-item  :label="$t('label.label8_19')">
                    <el-select v-model="filters.processFlag" style="width:200px">
                      <el-option
                      v-for="item in $Enum.EnumSelect().modify_enable_flag_all"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" 
                      > 
                    </el-option>
                </el-select>
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
            <el-table-column prop="changeId" label="changeId" min-width='100' >
            </el-table-column>
            <el-table-column prop="taskId" label="taskId"  min-width='100'>
            </el-table-column>
             <el-table-column prop="taskType" label="taskType" min-width='90'>
                <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().pi_task_type,scope.row.taskType)}}
                </template>
            </el-table-column>
             <el-table-column prop="srcPosX" label="srcPosX" >
            </el-table-column>
            <el-table-column prop="srcPosY" label="srcPosY">
            </el-table-column>
             <el-table-column prop="destPosX" label="destPosX" min-width='100'>
            </el-table-column>
             <el-table-column prop="destPosY" label="destPosY" min-width='100'>
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
                {{$Enum.getEnumSelectByValue(MD_MAP_DIRECTION_LIMIT,scope.row.destObjectDirection)}}
                </template>
            </el-table-column>
             <el-form-item prop="processFlag"  label="processFlag"  min-width='150' >
                <template slot-scope="scope">
                  {{$Enum.getEnumSelectByValue($Enum.EnumSelect().modify_enable_flag,scope.row.processFlag)}}
                </template>
              </el-form-item>
            <el-table-column prop="objectGrossWeight" label="objectGrossWeight" min-width='200'>
            </el-table-column>
            <el-table-column prop="objectId" label="objectId" min-width='100'>
            </el-table-column>
             <el-table-column prop="releaseLoadFlag" label="releaseLoadFlag" min-width='150'>
                  <template slot-scope="scope">
                {{$Enum.getEnumSelectByValue(TM_MOVE_TASK_RELEASE_LOAD,scope.row.releaseLoadFlag)}}
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
          
             <!--第二步  开始进行修改和查询操作-->
        
             <!--编辑与增加的页面-->
         </el-table>
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
            processFlag: '',
            objectId:'',
            kidIncharge:'',
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
            this.filters.objectId = ''
            this.filters.kidIncharge = '' 
            this.filters.processFlag = '' 
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
          axios.post('/adminpage/createTask/selectItfKidTaskChange', qs.stringify(param)).then((res) => {
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
              axios.post('/adminpage/createTask/createKidTaskChange', qs.stringify(result)).then((res) => {
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