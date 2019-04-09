
<template>
 <div>
  <el-form :inline="true" class="demo-form-inline">
          <el-col :span="8">
            <el-form-item label="订单状态">
                <el-select placeholder="完成" v-model="search.dmlOrderStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="手工打印" value="2"></el-option>
                    <el-option label="完成" value="3"></el-option>
                    <el-option label="不在途" value="5"></el-option>   
                </el-select>
            </el-form-item>
            <el-form-item label="路线" >
              <el-input v-model="search.attribute10"></el-input>
            </el-form-item>
            <el-form-item label="订单类型">
                <el-select placeholder="订单类型" v-model="search.attribute09">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="S" value="S"></el-option>
                    <el-option label="V" value="V"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            
             <el-col :span="8">
              <el-form-item label="WIP号" >
                 <el-input v-model="search.attribute03"></el-input>
            </el-form-item>
             </el-col>
              <el-col :span="8">
             <el-form-item label="客户">
               <el-input v-model="search.attribute07"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="8">
            <el-form-item label="WIP订单行" >
                 <el-input v-model="search.attribute04"></el-input>
            </el-form-item>
             </el-col>
            <el-col :span="8">
            <el-form-item label="货位">
                <el-input v-model="search.locNum"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="ISP经销商">
                <el-select placeholder="ISP经销商" v-model="search.attribute19">
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
            <el-form-item label="ICT经销商">
                 <el-select placeholder="ICT经销商" v-model="search.attribute18">
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
           <el-form-item label="下单初始日期" >
              <el-date-picker
                v-model="search.startTimeCreateDtVar"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="下单截止日期" >
              <el-date-picker
                v-model="search.endTimeCreateDtVar"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
                 <el-col :span="8">
           <el-form-item label="创建波次初始日期" >
              <el-date-picker
                v-model="search.startTimeWaveCreateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="创建波次截止日期" >
              <el-date-picker
                v-model="search.endTimeWaveCreateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
                 <el-col :span="8">
           <el-form-item label="打印初始日期" >
              <el-date-picker
                v-model="search.startTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="打印截止日期" >
              <el-date-picker
                v-model="search.endTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
                 <el-col :span="8">
           <el-form-item label="导入初始日期" >
              <el-date-picker
                v-model="search.startTimeOrderInDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="导入截止日期" >
              <el-date-picker
                v-model="search.endTimeOrderInDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span=12>
            <el-form-item>
                <el-button type="primary" @click="confirm">确认</el-button>
                 <el-button type="primary" @click="reset">清空</el-button>
                 <el-button type="primary" :disabled="cancelDisabled" @click="cancel">取消</el-button>
            </el-form-item>
            </el-col>
            <el-col :span=12>
            <el-form-item>
              <el-checkbox v-model="search.printAll" @change="handleCheckAllChange">打印全部</el-checkbox>
            </el-form-item>
            <el-form-item label="选择打印工作站：" >
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
                <el-button type="primary" :disabled="submitIsDisabled" @click="toDoPrint">打印</el-button>
            </el-form-item>
            </el-col>
        </el-form>

        <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border v-loading="tableLoading">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="attribute07" label="客户编码" width="100">
            </el-table-column>
            <el-table-column prop="attribute08" label="客户名称"  width="100">
            </el-table-column>
            <el-table-column prop="attribute03" label="WIP号"  width="100">
            </el-table-column>
            <el-table-column prop="attribute04" label="WIP订单行"  width="100">
            </el-table-column>
            <el-table-column prop="attribute01" label="拣货标签"  width="100">
            </el-table-column>
            <el-table-column prop="attribute10" label="路线"  width="100">
            </el-table-column>
            <el-table-column prop="attribute09" label="订单类型"  width="100">
            </el-table-column>
            <el-table-column prop="locNum" label="货位"  width="100">
            </el-table-column>
            <el-table-column prop="skuNum" label="零件编码"  width="100">
            </el-table-column>
            <el-table-column prop="createDtVar" label="下单时间" width="150">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.createDtVar,true)}}
                      </template>
            </el-table-column>
            <el-table-column prop="attribute19" label="ISP经销商" width="200"> 
              <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue(Y_N_STATUS,scope.row.attribute19)}}
              </template>
            </el-table-column>
            <el-table-column prop="attribute18" label="ICT经销商" width="200">
               <template slot-scope="scope" width="100%">
                  {{$Enum.getEnumSelectByValue(Y_N_STATUS,scope.row.attribute18)}}
              </template>
            </el-table-column>
            <el-table-column prop="dmlOrderStatus" label="订单状态" width="200">
              <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue(DML_PICK_ORDER_STATUS,scope.row.dmlOrderStatus)}}
              </template>
            </el-table-column>
            <el-table-column prop="orderInDate" label="导入时间" width="150">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.orderInDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="waveCreateDate" label="创建波次时间" width="200">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.waveCreateDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="lastUpdateDate" label="打印时间" width="200">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.lastUpdateDate,true)}}
                      </template>
            </el-table-column>
        </el-table>
         <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange"
                        :current-page.sync="search.currentPage" :page-size="pageSize" :page-sizes="[pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="totalRows">
          </el-pagination>
           <el-dialog width="30%" title="提示" :visible.sync="isShowInnerConfirmDialog" append-to-body @close="closeDialog">
            <p class="dialog-text">打印成功</p>
            <el-button type="primary" @click="confirmReject">确认</el-button>
        </el-dialog>
 </div>    
</template>
<script>
import axios from '../../util/http'
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
        startTimeCreateDtVar:'',
        endTimeCreateDtVar:'',
        startTimeWaveCreateDate:'',
        endTimeWaveCreateDate:'',
        startTimeLastUpdateDate:'',
        endTimeLastUpdateDate:'',
        startTimeOrderInDate:'',
        endTimeOrderInDate:''
      },
      tableData: [],
      multipleSelection: [],
      totalRows: -1,
      pageSize: -1,
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
        this.search.startTimeCreateDtVar=''
        this.search.endTimeCreateDtVar=''
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
          that.pageSize = res.data.pageSize
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
