 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item :label="$t('label.label8_01')">
              <el-input v-model="searchBIN.holderId" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item :label="$t('label.label6_04')">
              <el-input v-model="searchBIN.holderNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item  :label="$t('label.label8_03')">
              <el-input v-model="searchBIN.posX" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label8_04')">
              <el-input v-model="searchBIN.posY" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
       <el-row>
        <el-col :span="8">
           <el-form-item :label="$t('label.label8_05')" >
              <el-select  v-model="searchBIN.grossWeight" style="width:200px">
                        <el-option
                        v-for="item in OBJECT_GROSS_WEIGHT"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" 
                        > 
                      </el-option>
                    </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label8_06')">
              <el-input v-model="searchBIN.totalWeight" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item :label="$t('label.label8_07')">
              <el-input v-model="searchBIN.holderModelNumber" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
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
          <el-col :span="5">
            <el-form-item>
                <el-button type="primary" @click="add">{{$t('message.msg1_52')}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
         <el-table :data="userInfoList" style="width: 100%" border  min-height="100">
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
            <el-table-column prop="holderId"  :label="$t('label.label8_01')" min-width="200">
            </el-table-column>
             <el-table-column prop="holderNum"  :label="$t('label.label8_02')" min-width="200">
            </el-table-column>
             <el-table-column prop="holderModelNumber"  :label="$t('label.label8_07')" min-width="200">
            </el-table-column>
            <el-table-column prop="activeFlag"  :label="$t('label.label8_08')" min-width="200">
               <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus3,scope.row.activeFlag)}}
              </template>
            </el-table-column>
             <el-table-column prop="posX"  :label="$t('label.label8_03')"  min-width="200">
            </el-table-column>
             <el-table-column prop="posY"  :label="$t('label.label8_04')" min-width="200">
            </el-table-column>
             <el-table-column prop="grossWeight"  :label="$t('label.label8_05')"  min-width="200">
            </el-table-column>
             <el-table-column prop="totalWeight" :label="$t('label.label8_06')" min-width="200">
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column :label="$t('message.msg1_53')" min-width="350" fixed="right">
 
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
                  <el-form-item prop="holderId"  :label="$t('label.label8_01')">
                    <el-input type="text" v-model="addFormData.holderId"  :disabled="keyDisabled"></el-input>
                  </el-form-item>
                   <el-form-item prop="holderNum"  :label="$t('label.label8_02')">
                    <el-input type="text" v-model="addFormData.holderNum"  ></el-input>
                  </el-form-item>
                   <el-form-item prop="holderModelNumber"  :label="$t('label.label8_07')">
                    <el-input type="text" v-model="addFormData.holderModelNumber" ></el-input>
                  </el-form-item>
                   <el-form-item prop="activeFlag"  :label="$t('label.label8_08')">
                    <el-select  v-model="addFormData.activeFlag" style="width:200px">
                        <el-option
                        v-for="item in $Enum.EnumSelect().openStatus3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" 
                        > 
                      </el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item prop="posX" :label="$t('label.label8_03')">
                    <el-input type="text" v-model="addFormData.posX"  :disabled="true"></el-input>
                  </el-form-item>
                   <el-form-item prop="posY" :label="$t('label.label8_04')">
                    <el-input type="text" v-model="addFormData.posY"  :disabled="true"></el-input>
                  </el-form-item>
                   <el-form-item prop="grossWeight"  :label="$t('label.label8_05')">
                    <el-select  v-model="addFormData.grossWeight" style="width:200px">
                        <el-option
                        v-for="item in OBJECT_GROSS_WEIGHT"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" 
                        > 
                      </el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item prop="totalWeight" :label="$t('label.label8_06')">
                    <el-input type="text" v-model="addFormData.totalWeight"  :disabled="true"></el-input>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={holderId:'',holderNum:'',holderModelNumber:'',posX:'',posY:'',grossWeight:'',totalWeight:'',activeFlag:''}">取 消</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">{{$t('message.msg1_28')}}</el-button>
             </span>
          </el-dialog>
         <el-dialog
          :title="$t('message.msg1_75')"
          :visible.sync="dialogVisibleStart"
          width="90%" @close="loadData">
         <div class="tableDate mainContainer">
          <div class="table">
          <div class="button" style="width:8.5%;float:right;margin-top:60px;">
            <P><el-button class="el-icon-plus" @click.prevent="addRow()" ></el-button></P>
            <!--<p><el-button class="el-icon-minus" @click.prevent="delData()"></el-button></p>-->
            <p><el-button type="el-icon-minus" :disabled="submitDisabled" @click.prevent="submit">{{$t('message.msg1_34')}}</el-button></p>
          </div>
         <el-table
          :data="tableData"
          ref="table"
          tooltip-effect="dark"
          border
          stripe
          style="width: 90%"
          @selection-change='selectRow' :rules="rulesAdd">
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column  :label="$t('label.label1_86')" type="index" width="40" align="center"></el-table-column>
         <el-table-column prop="pi_holder_id"  :label="$t('label.label8_01')" width="180">
            <template slot-scope="scope">
            <el-input v-model="scope.row.pi_holder_id"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="pi_holder_num"  :label="$t('label.label8_02')">
           <template slot-scope="scope">
            <el-input v-model="scope.row.pi_holder_num"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="pi_orig_pos_x"  :label="$t('label.label8_03')">
          <template slot-scope="scope">
            <el-input v-model="scope.row.pi_orig_pos_x"></el-input>
          </template>
        </el-table-column>
       <el-table-column prop="pi_orig_pos_y"  :label="$t('label.label8_04')">
          <template slot-scope="scope">
            <el-input v-model="scope.row.pi_orig_pos_y"></el-input>
          </template>
        </el-table-column>
       </el-table>
      </div>
     </div>
    </el-dialog>
     <el-dialog
      :title="$t('message.msg1_41')"
      :visible.sync="dialogresult"
      width="40%" @close="confirm">
       <el-table
        :data="tableDataDialog"
        border
        :row-class-name="tableRowClassName"
        style="width: 95%" @close='confirm'>
         <el-table-column prop="pi_holder_id"  :label="$t('label.label8_01')" align="center">
        </el-table-column>
         <el-table-column prop="pi_holder_num"  :label="$t('label.label8_02')" align="center">
        </el-table-column>
        <el-table-column prop="isSucess" :label="$t('label.label5_20')" align="center">
        </el-table-column>
        <el-table-column prop="po_retmsg"  :label="$t('label.label5_21')" align="center">
        </el-table-column>
       </el-table>
       <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">{{$t('message.msg1_28')}}</el-button>
         </span>
    </el-dialog>
           <!--展示货位立体图-->
   <el-dialog :title="$t('label.label8_20')" :visible.sync="dialogLocationVisible" width="50%" :close-on-click-modal="false">
             <div class="block" style="height:100%;width:95%;display:inline-block">
               <el-card>
                  <el-form :model="addFormDataDetail"  ref="addFormDataDetail" label-width="0" class="demo-ruleForm login-container">
                   <el-form-item >
                   <span style="margin-right:15px;">{{$t('label.label8_01')}} : {{addFormDataDetail.holderId}}</span>
                   <span style="margin-right:15px;">{{$t('label.label8_10')}} : {{addFormDataDetail.holderNum}}</span>
                  </el-form-item>
                 </el-form>
                </el-card>
                <div style="height:100%;width:95%;">
               <div style="height:100%;width:45%;float:left;margin-top:10px;" ref='myLocation'>
                <div>
                <el-row type="flex" class="row-bg" justify="center" style="margin-top:1px;"><el-col :span="10" style="font-size:16px;height:10px;margin-bottom:5px;line-height:10px;text-align:center;" >货架A面轮廓图</el-col></el-row>
                 <el-row  v-for="(item, i) in this.locationSideNumAData" :key="i" type="flex" class="row-bg" justify="center" style="margin-top:1px;">
                  <el-col :span="10"  >
                    <div>
                      <el-button  @click.native="confirmShowOkDialog(item.holderId,item.levelNumUp2down)"  class="grid-a-contentWidth location"      :style="getMainInfo(item)" > {{'第'+(i+1) +'层,高度：'}}{{item.levelHeight}}</el-button>
                    </div> 
                  </el-col>
                </el-row>
                </div>
                <div>
                 <el-row type="flex" class="row-bg" justify="center" style="margin-top:1px;"><el-col :span="10" style="font-size:16px;height:10px;margin-bottom:5px;line-height:10px;text-align:center;" >货架B面轮廓图</el-col></el-row>
                 <el-row  v-for="(itemj, j) in this.locationSideNumBData" :key="j" type="flex" class="row-bg" justify="center" style="margin-top:1px;">
                  <el-col :span="10"  >
                    <div>
                      <el-button  @click.native="confirmShowOkDialog(itemj.holderId,itemj.levelNumUp2down)"  class="grid-a-contentWidth location"    :style="getMainInfo(itemj)" > {{'第'+(j+1) +'层,高度：'}}{{itemj.levelHeight}}</el-button>
                    </div> 
                  </el-col>
                </el-row>
                </div>
               </div>
               <div style="height:100%;width:45%;float:right;margin-top:10px;">
                <el-row  type="flex" class="row-bg" justify="center" style="margin-top:1px;"><el-col :span="10" style="font-size:16px;margin-left:80px;height:10px;margin-bottom:5px;line-height:10px;text-align:center;" >货位轮廓图</el-col></el-row>
                <el-row   type="flex" class="row-bg" justify="center" style="margin-top:1px;" v-if="dialogAB">
                  <el-col :span="10"  >
                   <div class="grid-a-contentWidth1">
                         <el-row>
                           <div style="float:left;width:55%;height:100%;font-color:white;">
                            <ul class="station-info">
                               <li  v-for="(item, ii) in locationLevelNumAData" :key="ii" :style="getStationInfo(item)">{{item.locationNum}}</li>
                             </ul> 
                           </div>
                           <div style="float:right;width:44%;height:100%;font-color:white;border-left:1px solid black">
                             <ul  class="station-info" >
                               <li  v-for="(item, iii) in locationLevelNumBData" :key="iii" :style="getStationInfo(item)">{{item.locationNum}}</li>
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
          OBJECT_GROSS_WEIGHT:[],
          addFormReadOnly: true,
          dialogVisible: false,
          keyDisabled:false,
          dialogVisibleStart:false,
          submitDisabled:true,
          dialogresult:false,
          tableDataDialog:[],
          locationSideNumAData:[],
          locationSideNumBData:[],
          locationLevelNumAData:[],
          locationLevelNumBData:[],
          locationLevelNumData:[],
          dialogLocationVisible:false,
          dialogAlone:false,
          dialogAB:false,
          isView: true,
          addFormData: {
            holderId:'',
            holderNum:'',
            holderModelNumber:'',
            posX:'',
            posY:'',
            grossWeight:'',
            totalWeight:'',
            activeFlag:''
          },
          searchBIN: {
            holderId:'',
            holderNum:'',
            holderModelNumber:'',
            posX:'',
            posY:'',
            grossWeight:'',
            totalWeight:'',
            activeFlag:'',
            currentPage:1,
            pageSize:50,
            totalRows:-1
          },
          tableData: [{
          rowNum: 1,
          pi_holder_id:'',
          pi_holder_num: '',
          pi_orig_pos_x: '',
          pi_orig_pos_y: ''
        }],
        addFormDataDetail:{
            holderId:'',
            holderNum:''
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
        this. getSelectValues()
      },
      methods: {
        confirmShowOkDialog(arg1,arg2){  
          this.locationLevelNumBData = []
          this.locationLevelNumData = []
          this.locationLevelNumAData = []
          this.dialogAlone = false
          this.dialogAB = false 
          this.getLocationInfoByLevelNum(arg1,arg2)
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
         showLocation(row){
          this.dialogLocationVisible = true
          this.locationLevelNumBData = []
          this.locationLevelNumData = []
          this.locationLevelNumAData = []
          this.dialogAlone = false
          this.dialogAB = false
          this.addFormDataDetail = Object.assign({}, row)
          this.getLocationInfoBySideNum(row.holderId,row.sideNum)
          this.getLocationInfoByLevelNum(row.holderId,row.levelNumUp2down)
        },
        getLocationInfoBySideNum(holderId) {
          let resultData = {}
          resultData.holderId = holderId
          let param = {'params': JSON.stringify(resultData)}
          axios.post('/holderManage/shelfLocation/selectLocationByHolderId', qs.stringify(param)).then((res) => {
            if(res.errCode === 'S'){
              this.locationSideNumAData = res.data.resultA
              this.locationSideNumBData = res.data.resultB
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
       getSelectValues() {
        axios.get('common/enum/selectEnumList', {
          params: 'test'
        }).then((res) => {
          if (res.errCode === 'S') {
            res.data.result.map(item => {
              if (item.lookupType === 'OBJECT_GROSS_WEIGHT') {
                item.value = item.lookupValueNum
                item.label = item.meaning||item.lookupValueNum
                this.OBJECT_GROSS_WEIGHT.push(item)
              }
              return item
            })
          }
         this.loadData()
        })
      },
        tableRowClassName({row, rowIndex}) {
          if (row.isSucess === '否') {
            return 'warning-row'
          } 
          return 'success-row'
        },
        confirm(){
           this.tableData=[]
           this.dialogresult = false
           this.dialogVisibleStart = false
           this.loadData()
           this.addRow()
           
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
            holderId:'',
            holderNum:'',
            holderModelNumber:'',
            posX:'',
            posY:'',
            grossWeight:'',
            totalWeight:'',
            activeFlag:'',
            currentPage:currentPageTemp,
            pageSize:pageSizeTemp,
            totalRows:totalRowsTemp
          }
        }, 
        loadData() {
          let param = {'params': JSON.stringify(this.searchBIN)}
          axios.post('/holderManage/homePage/selectHolderListBySearch', qs.stringify(param)).then((res) => {
            if(res.errCode === 'S'){
              var _data = res.data.result
              this.userInfoList = _data
              this.searchBIN.totalRows = res.data.totalRows
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
       submit(){
        let resultData = {}
        resultData.result=JSON.stringify(this.selectlistRow)
        axios.post('holderManage/homePage/insertHolderInfo', qs.stringify(resultData)).then(res => {
         if (res.errCode === 'S') {
            if (res.errCode === 'S') {
            this.tableDataDialog = res.data.result
            this.dialogresult=true
           }else{
            this.dialogresult=true
          }
         }
       })
      },  
      // 增加行
      addRow () {
        var list = {
          rowNum: '',
          pi_holder_id:  this.pi_holder_id,
          pi_holder_num: this.pi_holder_num,
          pi_orig_pos_x: this.pi_orig_pos_x,
          pi_orig_pos_y: this.pi_orig_pos_y
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
                axios.post('/holderManage/homePage/updateHolderInfo', qs.stringify(result)).then((res) => {
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
        background-color: #0099cc;
        border-radius: 4px;
        min-height: 100px;
        width: 200%;
     }
     .location{
        background: #0099cc;
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
       background:#0099cc;
       color: #ffffff;
     }
     .station-info {
       min-height: 200px;
     }
 </style>