 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item  :label="$t('label.label8_09')">
              <el-input v-model="searchBIN.locationNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label1_26')">
              <el-input v-model="searchBIN.holderNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item :label="$t('label.label8_10')">
              <el-input v-model="searchBIN.locationTypeCode" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label8_11')">
               <el-select  v-model="searchBIN.sideNum" style="width:200px">
                <el-option
                v-for="item in $Enum.EnumSelect().side_Num_All"
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
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label1_56')">
             <el-select  v-model="searchBIN.pageSize" style="width:200px">
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
         <el-table :data="userInfoList" style="width: 100%" border   min-height="100">
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
             <el-table-column prop="locationNum"  :label="$t('label.label8_09')" width="200">
            </el-table-column>
             <el-table-column prop="locationTypeCode"  :label="$t('label.label8_10')" width="200">
            </el-table-column>
             <el-table-column prop="holderNum"  :label="$t('label.label1_26')" width="200">
            </el-table-column>
             <el-table-column prop="sideNum" :label="$t('label.label8_11')" width="200">
               <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().side_Num,scope.row.sideNum)}}
              </template>
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column label="操作"  min-width="250">
 
                <template slot-scope="scope">
                     <el-button type="text" @click="showLocation(scope.row)">{{$t('label.label8_20')}}</el-button>
                     <el-button type="text" @click="checkDetail(scope.row)">{{$t('message.msg1_54')}}</el-button>
 
                     <el-button type="text" @click="modifyInfo(scope.row)">{{$t('message.msg1_55')}}</el-button>
  
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
         <el-dialog :title="$t('message.msg1_75')" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData"  ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                   <el-form-item prop="locationNum" :label="$t('label.label8_09')">
                    <el-input type="text" v-model="addFormData.locationNum" :disabled="true"></el-input>
                  </el-form-item>
                   <el-form-item prop="holderModelNumber"  :label="$t('label.label8_10')">
                    <el-input type="text" v-model="addFormData.locationTypeCode"  ></el-input>
                  </el-form-item>
                   <el-form-item prop="holderNum" :label="$t('label.label1_26')">
                    <el-input type="text" v-model="addFormData.holderNum"  :disabled="true"></el-input>
                  </el-form-item>
                   <el-form-item prop="sideNum"  :label="$t('label.label8_11')">
                    <el-input type="text" v-model="addFormData.sideNum" :disabled="true"></el-input>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={locationId:'',locationNum:'',locationTypeCode:'',holderNum:'',warehouseArea:''}">取 消</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">{{$t('message.msg1_28')}}</el-button>
             </span>
          </el-dialog>
             <!--展示货位立体图-->
         <el-dialog :title="$t('label.label8_20')" :visible.sync="dialogLocationVisible" width="50%" :close-on-click-modal="false">
             <div class="block" style="height:100%;width:95%;display:inline-block">
               <el-card>
                  <el-form :model="addFormDataDetail"  ref="addFormDataDetail" label-width="0" class="demo-ruleForm login-container">
                   <el-form-item >
                   <span style="margin-right:15px;">{{$t('label.label8_09')}} : {{addFormDataDetail.locationNum}}</span>
                   <span style="margin-right:15px;">{{$t('label.label8_10')}} : {{addFormDataDetail.locationTypeCode}}</span>
                   <span style="margin-right:15px;">{{$t('label.label1_26')}} : {{addFormDataDetail.holderNum}}</span>
                   <span style="margin-right:15px;">{{$t('label.label8_11')}} : {{$Enum.getEnumSelectByValue($Enum.EnumSelect().side_Num,addFormDataDetail.sideNum)}}</span>
                   <span>{{$t('label.label8_21')}} : {{'第'+levelNumUp2dow+'层'}} </span>
                  </el-form-item>
                 </el-form>
                </el-card>
                <div style="height:100%;width:95%;">
               <div style="height:100%;width:45%;float:left;margin-top:10px;" ref='myLocation'>
                <el-row type="flex" class="row-bg" justify="center" style="margin-top:1px;"><el-col :span="10"><span style="font-size:16px;height:10px;margin-bottom:5px;line-height:10px;text-algin:center;">货架轮廓图</span></el-col></el-row>
                 <el-row  v-for="(item, i) in this.locationSideNumData" :key="i" type="flex" class="row-bg" justify="center" style="margin-top:1px;">
                  <el-col :span="10"  >
                    <div>
                      <el-button  @click.native="confirmShowOkDialog(item.holderId,item.levelNumUp2down)"  class="grid-a-contentWidth location" :class="setClass(item)"     :style="getMainInfo(item)" > {{'第'+(i+1) +'层,高度：'}}{{item.levelHeight}}</el-button>
                    </div> 
                  </el-col>
                </el-row>
               </div>
               <div style="height:100%;width:45%;float:right;margin-top:10px;">
                <el-row  type="flex" class="row-bg" justify="center" style="margin-top:1px;"><el-col :span="10" ><span style="font-size:16px;height:10px;margin-bottom:5px;line-height:10px;text-algin:center;">货位轮廓图</span></el-col></el-row>
                <el-row   type="flex" class="row-bg" justify="center" style="margin-top:1px;" v-if="dialogAB">
                  <el-col :span="10"  >
                   <div class="grid-a-contentWidth1">
                         <el-row>
                           <div style="float:left;width:55%;height:100%;font-color:white;">
                            <ul class="station-info">
                               <li  v-for="(item, i) in locationLevelNumAData" :key="i" :style="getStationInfo(item)">{{item.locationNum}}</li>
                             </ul> 
                           </div>
                           <div style="float:right;width:44%;height:100%;font-color:white;border-left:1px solid black">
                             <ul  class="station-info" >
                               <li  v-for="(item, i) in locationLevelNumBData" :key="i" :style="getStationInfo(item)">{{item.locationNum}}</li>
                             </ul> 
                           </div>
                         </el-row>     
                   </div> 
                  </el-col>
                </el-row>
                <el-row   type="flex" class="row-bg" justify="center" style="margin-top:1px;" v-if="dialogAlone">
                  <el-col :span="10"  >
                   <div class="grid-a-contentWidth1">
                         <el-row>
                             <div class="station-info" style="text-align:center;height:200px;line-height:200px;"  v-for="(item, i) in locationLevelNumData" :key="i">
                               {{item.locationNum}}
                             </div> 
                         </el-row>     
                   </div> 
                  </el-col>
                </el-row>
               </div>
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
          userInfoList: [],
          addFormReadOnly: true,
          dialogVisible: false,
          keyDisabled:false,
          dialogVisibleStart:false,
          submitDisabled:true,
          dialogresult:false,
          dialogAlone:false,
          dialogAB:false,
          tableDataDialog:[],
          locationSideNumData:[],
          locationLevelNumAData:[],
          locationLevelNumBData:[],
          locationLevelNumData:[],
          dialogLocationVisible:false,
          levelNumUp2dow:'',
          isView: true,
          addFormData: {
            locationId:'',
            locationNum:'',
            locationTypeCode:'',
            holderNum:'',
            warehouseArea:''
          },
          addFormDataDetail:{
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
            sideNum:'',
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
        setClass(item){
          if(item.levelNumUp2down === this.levelNumUp2dow){
            return 'active'
          }
          return 'activeNo'
        },
        getMainInfo(item){
           if(item.levelNumUp2down === this.levelNumUp2dow){
             return "height: "+item.levelHeight/5+'px; !important'
           }
          return "height: "+item.levelHeight/5+'px !important'
        },
        getStationInfo(item){
           return "height:" +item.levelHeightTemp+'px;line-height:'+item.levelHeightTemp+'px;text-align:center;border-top:1px solid black ;!important'
        },
        confirmShowOkDialog(arg1,arg2){  
          this.locationLevelNumBData = []
          this.locationLevelNumData = []
          this.locationLevelNumAData = []
          this.dialogAlone = false
          this.dialogAB = false 
          this.getLocationInfoByLevelNum(arg1,arg2)
        },
        showLocation(row){
          this.dialogLocationVisible = true
          this.locationLevelNumBData = []
          this.locationLevelNumData = []
          this.locationLevelNumAData = []
          this.dialogAlone = false
          this.dialogAB = false
          this.levelNumUp2dow = row.levelNumUp2down
          this.addFormDataDetail = Object.assign({}, row)
          this.getLocationInfoBySideNum(row.holderId,row.sideNum)
          this.getLocationInfoByLevelNum(row.holderId,row.levelNumUp2down)
        },
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
            sideNum:'',
            currentPage:currentPageTemp,
            pageSize:pageSizeTemp,
            totalRows:totalRowsTemp
          }
        }, 
        loadData() {
          let param = {'params': JSON.stringify(this.searchBIN)}
          axios.post('/holderManage/shelfLocation/selectShelfLocationListBySearch', qs.stringify(param)).then((res) => {
            if(res.errCode === 'S'){
              var _data = res.data.result
              this.userInfoList = _data
              this.searchBIN.totalRows = res.data.totalRows
            }
          })
        }, 
        getLocationInfoBySideNum(holderId,sideNum) {
          let resultData = {}
          resultData.holderId = holderId
          resultData.sideNum = sideNum
          let param = {'params': JSON.stringify(resultData)}
          axios.post('/holderManage/shelfLocation/selectLocationBySideNum', qs.stringify(param)).then((res) => {
            if(res.errCode === 'S'){
              var _data = res.data.result
              this.locationSideNumData = _data
            }
          })
        }, 
        getLocationInfoByLevelNum(holderId,levelNum) {
          let resultData = {}
          resultData.holderId = holderId
          resultData.levelNumUp2down = levelNum
          let param = {'params': JSON.stringify(resultData)}
          axios.post('/holderManage/shelfLocation/selectLocationByLevelNum', qs.stringify(param)).then((res) => {
            if(res.errCode === 'S'){
              
              if(res.data.resultA === null){
                this.dialogAB = false
                this.dialogAlone = true
                this.locationLevelNumData = res.data.resultB
              }
              if(res.data.resultB === null){
                this.dialogAB = false
                this.dialogAlone = true
                this.locationLevelNumData = res.data.resultA
              }
              if(this.locationLevelNumData.length === 0){
                this.dialogAB = true
                this.dialogAlone = false
                this.locationLevelNumAData = res.data.resultA
                this.locationLevelNumBData = res.data.resultB
              }
              if(this.locationLevelNumAData !== 0){
                 let  sizeTemp = this.locationLevelNumAData.length 
                 let levelHeightTemp = 200/sizeTemp
                 this.locationLevelNumAData.map(item=>{
                   item.levelHeightTemp = levelHeightTemp
                   return item
                 })
              }
              if(this.locationLevelNumBData !== 0){
                 let  sizeTemp = this.locationLevelNumBData.length 
                 let levelHeightTemp = 200/sizeTemp
                 this.locationLevelNumBData.map(item=>{
                   item.levelHeightTemp = levelHeightTemp
                   return item
                 })
              }
            }
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
     .block{
        padding: 15px 12px;
        background-color:  #f0f9eb;
     }
     .grid-a-contentWidth {    
        background-color: #09c;
        border-radius: 4px;
        min-height: 100px;
        width: 200%;
     }
     .location{
        background: #09c;
     }
 
   .grid-a-contentWidth:active{
      background: #026780;
      color: #ffffff;
    }
    .location:focus, .location:hover{
      background:#026780;
      color: #ffffff;
    }
     .grid-a-contentWidth1 {    
        background-color: #026780;
        color: #ffffff;
        border-radius: 4px;
        min-height: 200px;
        width: 200%;
     }
     .active{
       background:#7a8486;
       color: #ffffff;
     }
     .activeNo{
       background:#09c;
       color: #ffffff;
     }
     .station-info {
       min-height: 200px;
     }
 </style>