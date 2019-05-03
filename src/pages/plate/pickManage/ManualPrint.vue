
<template>
 <div class="mainContainer">
  <el-form :inline="true" class="demo-form-inline" label-width="130px">
         <el-row>
          <el-col :span="8">
            <el-form-item  :label="$t('label.label1_49')">
                <el-select  v-model="search.dmlOrderStatus" style="width:200px">
                    <el-option :label="$t('label.label2_04')"  value=""></el-option>
                    <el-option :label="$t('label.label2_15')"  value="2"></el-option>
                    <el-option :label="$t('label.label2_16')"  value="3"></el-option>
                    <el-option :label="$t('label.label2_17')"  value="5"></el-option>   
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('label.label1_50')">
              <el-input v-model="search.attribute10" style="width:200px"></el-input>
            </el-form-item>
          </el-col>
         </el-row>
         <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.label1_51')" >
                <el-select v-model="search.attribute09" style="width:200px">
                    <el-option :label="$t('label.label2_04')" value=""></el-option>
                    <el-option label="S" value="S"></el-option>
                    <el-option label="V" value="V"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            
             <el-col :span="8">
              <el-form-item  :label="$t('label.label1_52')">
                 <el-input v-model="search.attribute03" style="width:200px"></el-input>
            </el-form-item>
             </el-col>
         </el-row>
         <el-row>
              <el-col :span="8">
             <el-form-item :label="$t('label.label1_53')">
               <el-input v-model="search.attribute07" style="width:200px"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="8">
            <el-form-item :label="$t('label.label1_54')">
                 <el-input v-model="search.attribute04" style="width:200px"></el-input>
            </el-form-item>
             </el-col>
         </el-row>
         <el-row>
            <el-col :span="8">
            <el-form-item  :label="$t('label.label1_55')">
                <el-input v-model="search.locNum" style="width:200px"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="8">  
            <el-form-item :label="$t('label.label1_56')">
              <el-select  v-model="search.pageSize" style="width:200px">
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
         <el-col :span="8">
            <el-form-item  :label="$t('label.label1_57')">
                <el-select v-model="search.attribute19" style="width:200px">
                <el-option
                v-for="item in Y_N_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
                > 
              </el-option>
          </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item :label="$t('label.label1_58')">
                 <el-select  v-model="search.attribute18" style="width:200px">
                <el-option
                v-for="item in Y_N_STATUS"
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
           <el-form-item :label="$t('label.label1_59')">
              <el-date-picker
                v-model="search.startTimeCreateDt"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item :label="$t('label.label1_60')">
              <el-date-picker
                v-model="search.endTimeCreateDt"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
            </el-col>
         </el-row>
         <el-row>
          <el-col :span="8">
           <el-form-item :label="$t('label.label1_61')" >
              <el-date-picker
                v-model="search.startTimeWaveCreateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item  :label="$t('label.label1_62')">
              <el-date-picker
                v-model="search.endTimeWaveCreateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
            </el-col>
         </el-row>
         <el-row>
         <el-col :span="8">
           <el-form-item :label="$t('label.label2_18')" >
              <el-date-picker
                v-model="search.startTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item  :label="$t('label.label2_19')" >
              <el-date-picker
                v-model="search.endTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
            </el-col>
         </el-row>
         <el-row>
          <el-col :span="8">
           <el-form-item :label="$t('label.label1_65')">
              <el-date-picker
                v-model="search.startTimeOrderInDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item  :label="$t('label.label1_66')">
              <el-date-picker
                v-model="search.endTimeOrderInDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span='20' style="margin-left:200px">
                <el-form-item>
                    <el-button type="primary" @click="confirm">{{$t('message.msg1_28')}}</el-button>
                     <el-button type="info" @click="reset">{{$t('message.msg1_29')}}</el-button>
                     <el-button type="info" :disabled="cancelDisabled" @click="cancel">{{$t('message.msg1_30')}}</el-button>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span='20' style="margin-left:300px">
               <el-form-item>
                  <el-checkbox v-model="search.printAll" @change="handleCheckAllChange">{{$t('message.msg1_47')}}</el-checkbox>
                </el-form-item>
                <el-form-item :label="$t('label.label2_20')" >
                  <el-select v-model="search.wsId" >
                    <el-option
                    v-for="item in WS_ENTITY_WORKSTATION"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value" 
                    > 
                  </el-option>
                 </el-select>
                 </el-form-item>
                <el-form-item >
                  <el-button type="primary" :disabled="submitIsDisabled" @click="toDoPrint">{{$t('message.msg1_48')}}</el-button>
                </el-form-item>
              </el-col>
          </el-row>
        </el-form>

        <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border v-loading="tableLoading">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="attribute07"  :label="$t('label.label1_67')" width="100">
            </el-table-column>
            <el-table-column prop="attribute08"  :label="$t('label.label1_68')"  width="100">
            </el-table-column>
            <el-table-column prop="attribute03"  :label="$t('label.label1_52')"  width="100">
            </el-table-column>
            <el-table-column prop="attribute04"  :label="$t('label.label1_54')"  width="100">
            </el-table-column>
            <el-table-column prop="attribute01"  :label="$t('label.label2_21')"  width="100">
            </el-table-column>
            <el-table-column prop="attribute10"  :label="$t('label.label1_50')" width="100">
            </el-table-column>
            <el-table-column prop="attribute09" :label="$t('label.label1_51')"  width="100">
            </el-table-column>
            <el-table-column prop="locNum" :label="$t('label.label1_55')" width="100">
            </el-table-column>
            <el-table-column prop="skuNum" :label="$t('label.label1_70')" width="100">
            </el-table-column>
            <el-table-column prop="createDtVar"  :label="$t('label.label1_71')" width="150">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.createDtVar,true)}}
                      </template>
            </el-table-column>
            <el-table-column prop="attribute19" :label="$t('label.label1_57')" width="200"> 
              <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue(Y_N_STATUS,scope.row.attribute19)}}
              </template>
            </el-table-column>
            <el-table-column prop="attribute18"  :label="$t('label.label1_58')" width="200">
               <template slot-scope="scope" width="100%">
                  {{$Enum.getEnumSelectByValue(Y_N_STATUS,scope.row.attribute18)}}
              </template>
            </el-table-column>
            <el-table-column prop="dmlOrderStatus" :label="$t('label.label1_49')" width="200">
              <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue(DML_PICK_ORDER_STATUS,scope.row.dmlOrderStatus)}}
              </template>
            </el-table-column>
            <el-table-column prop="orderInDate" :label="$t('label.label1_72')" width="150">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.orderInDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="waveCreateDate" :label="$t('label.label1_73')" width="200">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.waveCreateDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="lastUpdateDate" :label="$t('label.label1_28')"  width="200">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.lastUpdateDate,true)}}
                      </template>
            </el-table-column>
        </el-table>
         <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange"
                        :current-page.sync="search.currentPage" :page-size="search.pageSize" :page-sizes="[search.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="totalRows">
          </el-pagination>
           <el-dialog width="30%"  :title="$t('label.msg1_41')" :visible.sync="isShowInnerConfirmDialog" append-to-body @close="closeDialog">
            <p class="dialog-text">{{$t('message.msg1_49')}}</p>
            <el-button type="primary" @click="confirmReject">{{$t('message.msg1_28')}}</el-button>
        </el-dialog>
 </div>    
</template>
<script>
import axios from '../../../util/http'
import qs from 'qs'

export default {
  data () {
    return {
      axios,
      // 查询参数
      search: {
        dmlOrderStatus: '',
        attribute10: '',
        attribute09: '',
        attribute03: '',
        attribute07: '',
        attribute04: '',
        locNum: '',
        attribute19: '',
        attribute18: '',
        wsId: '1',
        currentPage: 1,
        printAll: false,
        startTimeCreateDt:'',
        endTimeCreateDt:'',
        startTimeWaveCreateDate:'',
        endTimeWaveCreateDate:'',
        startTimeLastUpdateDate:'',
        endTimeLastUpdateDate:'',
        startTimeOrderInDate:'',
        endTimeOrderInDate:'',
        pageSize:200
      },
      tableData: [],
      multipleSelection: [],
      totalRows: -1,
      sendStr: [],
      isShowInnerConfirmDialog: false,
      tableLoading: false,
      DML_PICK_ORDER_STATUS: [],
      Y_N_STATUS: [],
      submitIsDisabled:true,
      cancelDisabled:true,
      WS_ENTITY_WORKSTATION:[]
    }
  },
  created: function () {
    this.getTableData()
    this.getSelectValues()
    this.getSelectValuesWorkstationId()
  },
  methods: {
    getSelectValuesWorkstationId() {
        this.axios.get('pickManage/pickInfo/selectWsEntityWorkstation', {
          params: this.search
        }).then((res) => {
          if (res.errCode === 'S') {
            this.WS_ENTITY_WORKSTATION = res.data.result.map(item => {
              item.value = item.entityWorkstationId
              item.lable = item.entityWorkstationId
              return item
            })
          }
        })
    },
    getSelectValues() {
      let Enum = this.$Enum.EnumSelect()
      this.Y_N_STATUS = Enum.Y_N_STATUS
      this.axios.get('common/enum/selectEnumList', {
        params: 'test'
      }).then((res) => {
        if (res.errCode === 'S') {
          res.data.result.map(item => {
            if (item.lookupType === 'DML_PICK_ORDER_STATUS') {
              item.value = item.lookupValueNum
              item.label = item.meaning || item.item.lookupValueNum
              this.DML_PICK_ORDER_STATUS.push(item)
            }
            return item
          })
        }
      })
    },
    confirm () {
      this.search.currentPage = 1
      this.getTableData()
    },
    closeDialog() {
      this.search.currentPage = 1
      this.getTableData()
      this.handleCheckAllChange(false)
    },
    reset(){
        this.search.dmlOrderStatus=''
        this.search.attribute10=''
        this.search.attribute09= ''
        this.search.attribute03=''
        this.search.attribute07=''
        this.search.attribute04=''
        this.search.locNum =''
        this.search.attribute19=''
        this.search.attribute18=''
        this.search.wsId= '1'
        this.search.currentPage=1,
        this.search.printAll=false,
        this.search.startTimeCreateDt=''
        this.search.endTimeCreateDt=''
        this.search.startTimeWaveCreateDate=''
        this.search.endTimeWaveCreateDate=''
        this.search.startTimeLastUpdateDate=''
        this.search.endTimeLastUpdateDate=''
        this.search.startTimeOrderInDate=''
        this.search.endTimeOrderInDate=''
    },
    cancel () {
      this.$refs.multipleTable.clearSelection()
      this.handleCheckAllChange(false)
    },
    handleChangeTime() {},
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.getTableData()
    }, // 点击是否全部提交
    handleCheckAllChange (e) {
      this.search.printAll = e
      if (e || this.sendStr.length > 0) {
        this.submitIsDisabled = false
        this.cancelDisabled = false
      } else {
        this.submitIsDisabled = true
        this.cancelDisabled = true
      }
    },
    getTableData () {
      this.tableLoading = true
      let that = this
      axios.get('pickManage/pickInfo/selectManualPrintList', {
        params: that.search
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res)
          that.tableData = res.data.result
          that.totalRows = res.data.totalRows
        }
      })
      this.tableLoading = false
    }, // 执行打印
    toDoPrint () {
      this.tableLoading = true
      let resultData = {}
      resultData.result = JSON.stringify(this.sendStr)
      resultData.params = JSON.stringify(this.search)
      this.axios.post('pickManage/pickInfo/toDoManualPrint', qs.stringify(resultData)).then((res) => {
        if (res.errCode === 'S') {
          this.isShowInnerConfirmDialog = true
          this.tableLoading = false
        }
      })
      this.submitIsDisabled = true
      this.cancelDisabled = true
    },
    confirmReject() {
      this.isShowInnerConfirmDialog = false
      this.getTableData()
      this.submitIsDisabled = true
      this.cancelDisabled = true
      this.handleCheckAllChange(false)
    },
    handleSelectionChange (val) {
      let arr = []
      val.map(item => {
        arr.push(item)
      })
      this.sendStr = arr
       if (this.search.printAll || this.sendStr.length > 0) {
        this.submitIsDisabled = false
        this.cancelDisabled = false
      } else {
        this.submitIsDisabled = true
        this.cancelDisabled = true
      }
      console.log(this.sendStr)
    }
  }
}
</script>
<style scoped>
  .form .form-left {
    width:50%; padding-left:1rem; padding-right:1rem; padding-top:1rem;
  }
  .form .form-right {
    width:50%; padding-left:1rem; padding-right:1rem; padding-top:1rem;
  }
</style>
