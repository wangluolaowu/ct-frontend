 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item  :label="$t('label.label1_26')">
              <el-input v-model="searchBIN.holderId" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item  :label="$t('label.label1_43')">
              <el-select v-model="searchBIN.processFlag" style="width:200px">
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
            <el-form-item :label="$t('label.label1_56')" >
             <el-select v-model="searchBIN.pageSize" style="width:200px">
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
          <el-form-item >  
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
                <el-button type="primary" @click="modifyInfo">{{$t('label.label8_18')}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
         <el-table :data="userInfoList" style="width: 100%" border  min-height="100">
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
             <el-table-column prop="changeId"  :label="$t('label.label8_15')" width="200">
            </el-table-column>
             <el-table-column prop="holderId"  :label="$t('label.label1_26')" width="200">
            </el-table-column>
             <el-table-column prop="posId" :label="$t('label.label8_16')" width="200">
            </el-table-column>
             <el-table-column prop="posX" :label="$t('label.label8_03')" width="200">
            </el-table-column>
             <el-table-column prop="posY" :label="$t('label.label8_04')" width="200">
            </el-table-column>
             <el-table-column prop="processFlag" :label="$t('label.label1_43')" width="200">
               <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus3,scope.row.processFlag)}}
              </template>
            </el-table-column>
             <el-table-column prop="creationDate" :label="$t('label.label8_17')" width="200">
                <template slot-scope="scope">
                {{$DateFormat.dateFormat(scope.row.creationDate,true)}}
                </template>
            </el-table-column>
            <el-table-column prop="lastUpdateDate" :label="$t('label.label1_28')" width="200">
              <template slot-scope="scope">
                {{$DateFormat.dateFormat(scope.row.lastUpdateDate,true)}}
                </template>
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column label="操作"  min-width="350" fixed="right">
 
                <template slot-scope="scope">
                     <el-button type="text" @click="checkDetail(scope.row)">{{$t('message.msg1_54')}}</el-button>
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
                  <el-form-item prop="changeId"  :label="$t('label.label8_15')">
                    <el-input type="text" v-model="addFormData.changeId" ></el-input>
                  </el-form-item>
                   <el-form-item prop="holderId"  :label="$t('label.label1_26')">
                    <el-input type="text" v-model="addFormData.holderId" ></el-input>
                  </el-form-item>
                   <el-form-item prop="posId"  :label="$t('label.label8_16')">
                    <el-input type="text" v-model="addFormData.posId" ></el-input>
                  </el-form-item>
                   <el-form-item prop="posX"  :label="$t('label.label8_03')">
                    <el-input type="text" v-model="addFormData.posX" ></el-input>
                  </el-form-item>
                    <el-form-item prop="posY"  :label="$t('label.label8_04')">
                    <el-input type="text" v-model="addFormData.posY" ></el-input>
                  </el-form-item>
                   <el-form-item prop="processFlag"  :label="$t('label.label1_43')">
                     <el-select  v-model="addFormData.processFlag">
                        <el-option
                            v-for="item in $Enum.EnumSelect().openStatus3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select>
                  </el-form-item>
                  <el-form-item prop="creationDate"  :label="$t('label.label8_17')">
                     <el-date-picker
                        v-model="addFormData.creationDate"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                         @change="handleChangeTime"
                        style="width:200px"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="lastUpdateDate"  :label="$t('label.label1_28')">
                     <el-date-picker
                        v-model="addFormData.lastUpdateDate"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                         @change="handleChangeTime"
                        style="width:200px"
                    ></el-date-picker>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={changeId:'',holderId:'',posId:'',posX:'',posY:'',processFlag:'',creationDate:'',lastUpdateDate:''}">{{$t('message.msg1_30')}}</el-button>
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
          @selection-change='selectRow' >
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column  :label="$t('label.label1_86')" type="index" min-width="40" align="center"></el-table-column>
         <el-table-column prop="pi_holder_id"  :label="$t('label.label8_01')" width="180">
            <template slot-scope="scope">
            <el-input v-model="scope.row.pi_holder_id"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="pi_pos_x"  :label="$t('label.label1_35')">
          <template slot-scope="scope">
            <el-input v-model="scope.row.pi_pos_x"></el-input>
          </template>
        </el-table-column>
       <el-table-column prop="pi_pos_y"  :label="$t('label.label1_36')">
          <template slot-scope="scope">
            <el-input v-model="scope.row.pi_pos_y"></el-input>
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
        <el-table-column prop="isSucess" :label="$t('label.label5_20')" align="center">
        </el-table-column>
        <el-table-column prop="po_retmsg"  :label="$t('label.label5_21')" align="center">
        </el-table-column>
       </el-table>
       <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">{{$t('message.msg1_28')}}</el-button>
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
          dialogVisibleStart:false,
          submitDisabled:true,
          dialogresult:false,
          tableDataDialog:[],
          isView: true,
          addType:false,
          addFormData: {
            changeId:'',
            holderId:'',
            posId:'',
            posX:'',
            posY:'',
            processFlag:'',
            creationDate:'',
            lastUpdateDate:''
          },
          searchBIN: {
             holderId:'',
             processFlag:'',
             posX:'',
             posY:'',
            currentPage:1,
            pageSize:50,
            totalRows:-1
          },
          tableData: [{
          rowNum: 1,
          pi_holder_id:'',
          pi_pos_x: '',
          pi_pos_y: ''
        }],
        }
      },
  mounted: function () {
        this.loadData()
      },
      methods: {
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
             processFlag:'',
             posX:'',
             posY:'',
            currentPage:currentPageTemp,
            pageSize:pageSizeTemp,
            totalRows:totalRowsTemp
          }
        }, 
        loadData() {
          let param = {'params': JSON.stringify(this.searchBIN)}
          axios.post('/holderManage/shelfModify/selectShelfListBySearch', qs.stringify(param)).then((res) => {
            if(res.errCode === 'S'){
              var _data = res.data.result
              this.userInfoList = _data
              this.searchBIN.totalRows = res.data.totalRows
            }
          })
        },
        handleChangeTime(){

        },
        checkDetail(rowData) {
          this.addFormData = Object.assign({}, rowData)
          let creationDateTemp = this.addFormData.creationDate
          let lastUpdateDateTemp = this.addFormData.lastUpdateDate
          this.addFormData.creationDate = new Date(this.$DateFormat.dateFormat(creationDateTemp,true))
          this.addFormData.lastUpdateDate = new Date(this.$DateFormat.dateFormat(lastUpdateDateTemp,true))
          this.isView = false
          this.dialogVisible = true
          //  this.addFormReadOnly = true;
        },
        modifyInfo() {
          this.dialogVisibleStart = true
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
        axios.post('holderManage/shelfModify/updateShelfInfo', qs.stringify(resultData)).then(res => {
         if (res.errCode === 'S') {
            if (res.errCode === 'S') {
            this.tableDataDialog = res.data.result
            this.dialogresult=true
           }else{
            this.dialogresult=true
          }
         }
       })
      },   // 增加一条记录// 增加行
      addRow () {
        var list = {
          rowNum: '',
          pi_holder_id:  this.pi_holder_id,
          pi_pos_x: this.pi_pos_x,
          pi_pos_y: this.pi_pos_y
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
 </style>