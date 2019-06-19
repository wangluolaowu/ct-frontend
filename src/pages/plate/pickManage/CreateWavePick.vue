<template>
<div class="">
    <el-row>
        <el-col :span="23" class="main">
            <div class="grid-content bg-purple-dark">
                <el-tabs id="topTitle" v-model="search.orderType" @tab-click="handleTabClick">
                    <el-tab-pane :label="$t('label.label2_01')" name="S"></el-tab-pane>
                    <el-tab-pane :label="$t('label.label2_02')" name="V"></el-tab-pane>
                    <el-tab-pane :label="$t('label.label2_03')" name="U"></el-tab-pane>
                </el-tabs>
                <!-- 搜索区域 -->
                <el-form  class="demo-form-inline selectedCont clears" label-width="180px">
                   <el-row>
                     <el-col :span="8">
                    <el-form-item class="fl" label="ISP dealer">
                        <el-select  v-model="search.ispDealer">
                            <el-option :label="$t('label.label2_04')" value=""></el-option>
                            <el-option :label="$t('label.label2_05')" value="Y"></el-option>
                            <el-option :label="$t('label.label2_06')" value="N"></el-option>
                            <!-- <el-option :label="item.platformName" :key="item.clientType" :value="item.clientType" v-for="item in platformTypeList"></el-option> -->
                        </el-select>
                    </el-form-item>
                     </el-col>
                     <el-col :span="8">
                    <el-form-item class="fl" label="ICT dealer">
                        <el-select  v-model="search.ictDealer">
                            <el-option :label="$t('label.label2_04')" value=""></el-option>
                            <el-option :label="$t('label.label2_05')" value="Y"></el-option>
                            <el-option :label="$t('label.label2_06')" value="N"></el-option>
                        </el-select>
                    </el-form-item>
                     </el-col>
                    </el-row>
                    <el-row>
                     <el-col :span="8">
                    <el-form-item class="fl" :label="$t('label.label1_50')">
                      <template>
                        <el-select v-model="search.route" multiple filterable placeholder="请选择">
                          <el-option
                            v-for="item in routeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        </template>
                    </el-form-item>
                     </el-col>
                     <el-col :span="8">
                    <el-form-item class="fl" :label="$t('label.label6_01')">
                      <template>
                        <el-select v-model="search.dealerAccount" multiple filterable placeholder="请选择">
                          <el-option
                            v-for="item in dealerAccountList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </template>
                    </el-form-item>
                     </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5">
                    <el-form-item class="fl" >
                        <el-button type="primary" @click="confirm">{{$t('message.msg1_28')}}</el-button>
                    </el-form-item>
                      </el-col>
                         <el-col :span="5">
                    <el-form-item class="fl" >
                        <el-button :type="cancelDisabledButton" :disabled = "cancelDisabled" @click="cancel">{{$t('message.msg1_30')}}</el-button>
                    </el-form-item>
                      </el-col>
                       <el-col :span="3">
                    <el-form-item>
                     <el-checkbox v-model="search.submitAll"  @change="handleCheckAllChange">{{$t('message.msg1_33')}}</el-checkbox>
                    </el-form-item>
                      </el-col>
                      <el-col :span="8">
                    <el-form-item>
                     <el-button :type="submitIsDisabledButton" @click="submit" :disabled = "submitIsDisabled" >{{$t('message.msg1_34')}}</el-button>
                    </el-form-item>
                      </el-col>
                    </el-row>
                    <!--<el-form-item>
                       <el-button type="primary" @click="submit" :disabled = "submitIsDisabled" >提交</el-button>
                    </el-form-item>-->
                </el-form>

                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange" v-loading="tableLoading">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="dealerAccount" :label="$t('label.label1_67')" min-width="200" >
                    </el-table-column>
                    <el-table-column prop="custName" :label="$t('label.label1_68')"  min-width="200" >
                    </el-table-column>
                    <el-table-column prop="wip" :label="$t('label.label1_52')"  min-width="200">
                    </el-table-column>
                    <el-table-column prop="wipLine" :label="$t('label.label1_54')"  min-width="200">
                    </el-table-column>
                    <el-table-column prop="pickTicketNum" :label="$t('label.label2_07')" min-width="200">
                    </el-table-column>
                    <el-table-column prop="route" :label="$t('label.label1_50')" min-width="150">
                    </el-table-column>
                     <el-table-column prop="subRoute" :label="$t('label.label2_08')"  min-width="150">
                    </el-table-column>
                    <el-table-column prop="orderType" :label="$t('label.label1_51')" min-width="150">
                    </el-table-column>
                    <el-table-column prop="locNum" :label="$t('label.label2_09')" min-width="150">
                    </el-table-column>
                    <el-table-column prop="skuNum" :label="$t('label.label1_70')"  min-width="200">
                    </el-table-column>
                    <el-table-column prop="skuName" :label="$t('label.label1_78')"  min-width="200">
                    </el-table-column>
                    <el-table-column prop="qty" :label="$t('label.label1_80')" min-width="100">
                    </el-table-column>
                    <el-table-column  prop="ispDealer"  :label="$t('label.label1_57')"  min-width="100">
                      <template slot-scope="scope" width="100%">
                         {{$Enum.getEnumSelectByValue(Y_N_STATUS,scope.row.ispDealer)}}
                    </template>
                    </el-table-column>
                    <el-table-column prop="ictDealer" :label="$t('label.label1_58')"  min-width="100">
                       <template slot-scope="scope" width="100%">
                          {{$Enum.getEnumSelectByValue(Y_N_STATUS,scope.row.ictDealer)}}
                    </template>
                    </el-table-column>
                    <el-table-column prop="creationDate" :label="$t('label.label1_72')" min-width="200">
                      <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.creationDate,true)}}
                      </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange" :current-page.sync="search.currentPage" :page-size="pageSize" :page-sizes="[pageSize]" layout="total, sizes, prev, pager, next, jumper" :total="totalRows">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
    <!-- 弹层start -->
    <el-dialog :title="$t('label.label2_10')" :visible.sync="isShowDialog" width="90%" @close='closeConfirmReject'>
        <!-- 搜索区域 -->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item :label="$t('label.label2_11')">
                <template>
                        {{dialog.systemReason || '无'}}
                </template>
            </el-form-item>
            <el-form-item :label="$t('label.label2_12')">
                <el-input type="textarea" :rows="2"  v-model="dialog.manualReason">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="info" @click="showConfirmDialog">{{$t('message.msg1_30')}}</el-button>
                <el-button type="primary" @click="confirmAssign">{{$t('message.msg1_35')}}</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10">
          <el-col :span="4" v-for="(item, i) in this.dialogTableData" :key="i">
            <el-card style="min-height: 520px">
              <ul class="station-info">
                  <li>
                      <label for="">{{$t('message.msg1_36')}}</label><span>{{'&#12288;' + item.wsid}}</span>
                  </li>
                  <li>
                      <label for="">{{$t('message.msg1_37')}}</label><span>{{'&#12288;' +item.orderListCount}}</span>
                  </li>
                  <li>
                      <label for="">{{$t('message.msg1_38')}}</label><span>{{'&#12288;' +item.routeListCount}}</span>
                  </li>
                  <li>
                      <label for="">{{$t('message.msg1_39')}}</label><span>{{'&#12288;' +item.forecastWallCount}}</span>
                  </li>
              </ul>
              <transition-group>            
                <draggable v-model="item.result" :options="{group:'people', animation: 300}" @start="startItem" @end="endItem" @change="changeItem" :key="i">
                    <el-row
                      class="drag-item"
                      :class="{gray: element.isChange}"
                      v-for="(element, index) in item.result"
                      :key="index">
                      <el-col :span="6"> <div style="margin-top:3px">{{index + 1}}、</div></el-col>
                      <el-col :span="18" style="line-height:1.7">
                        <div>{{ 'route: ' + (element.route  || '') }}</div>
                        <div>{{ 'dealer: ' + (element.dealerCou  || '') }}</div>
                        <div>{{ $t('message.msg1_40') +': ' + (element.lineCou || '') }}</div>                        
                      </el-col>
                    </el-row>
                </draggable>
              </transition-group>
            </el-card>        
          </el-col>
        </el-row>
        </el-dialog>
        <el-dialog width="30%" :title="$t('message.msg1_41')" :visible.sync="isShowInnerConfirmDialog"  append-to-body>
            <p class="dialog-text">{{$t('message.msg1_42')}}</p>
            <el-button @click="isShowInnerConfirmDialog = false">{{$t('message.msg1_30')}}</el-button>
            <el-button type="primary" @click="confirmReject">{{$t('message.msg1_28')}}</el-button>
        </el-dialog>
        <el-dialog width="30%" :title="$t('message.msg1_43')" :visible.sync="isShowOkDialog" append-to-body @close='confirmShowOkDialog'>
            <p class="dialog-text">{{$t('message.msg1_44')}}</p>
            <el-button type="primary" @click="confirmShowOkDialog"> OK</el-button>
        </el-dialog>
    <!-- 弹层end -->
</div>
</template>

<script>
// 接口数据
import axios from '../../../util/http'
import draggable from 'vuedraggable'
import qs from 'qs'

export default {
  data () {
    return {
      axios,
      draggable,
      drag: false,
      cancelDisabledButton:'info',
      submitIsDisabledButton:'info',
      routeList:[],
      dealerAccountList:[],
      search: { // 查询参数
        orderType: 'S',
        ispDealer: '',
        ictDealer: '',
        route:[],
        dealerAccount:[],
        currentPage: 1,
        // locNum: 'RA080511',
        submitAll: false
      },
      isShowDialog: false,
      tableLoading: false,
      submitIsDisabled: true,
      cancelDisabled: true,
      totalRows: -1,
      pageSize: -1,
      tableData: [],
      dialogTableData: [],
      dialogTableDataExit: [],
      multipleSelection: [],
      dialog: {
        systemReason: '',
        manualReason: ''
      },
      id: '', // 点提交后服务器分配的id
      isShowInnerConfirmDialog: false,
      isShowOkDialog: false,
      updateOk: false,
      deleteOk: false,
      scope: [],
      sendStr: [],
      Y_N_STATUS: []
    }
  },
  created: function () {
    this.getTableData()
    this.getSelectValues()
  },
  methods: {
    getSelectValues() {
      let Enum = this.$Enum.EnumSelect()
      this.Y_N_STATUS = Enum.Y_N_STATUS
      this.axios.get('/pickManage/pickInfo/selectPickRouteList', {
        params: {
          orderType: this.search.orderType
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res.data.result)
          // 弹出层
          this.routeList = res.data.resultRoute
          this.dealerAccountList = res.data.resultDealer
        }
      })
    },
    handleSelectionChange (val) {
      let arr = []
      val.map(item => {
        arr.push(item)
      })
      this.sendStr = arr
      if (arr.length > 0 || this.submitAll) {
        this.submitIsDisabled = false
        this.cancelDisabled = false
        this.cancelDisabledButton ='primary'
        this.submitIsDisabledButton ='primary'
      } else {
        this.submitIsDisabled = true
        this.cancelDisabled = true
         this.cancelDisabledButton ='info'
        this.submitIsDisabledButton ='info'
      }
      console.log(this.sendStr)
    }, // 关闭弹层
    closeConfirmReject () {
      if (!this.deleteOk && !this.updateOk) {
        this.confirmReject()
        this.deleteOk = false
        this.updateOk = false
      }
    }, // 弹层上操作
    showConfirmDialog: function () {
      this.isShowInnerConfirmDialog = true
    }, // 全部打回
    confirmReject: function () {
      this.axios.get('reloc/createWave/deleteRelocInfoList', {
        params: {
          orderWaveId: this.id
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res.data.result)
          // 弹出层
          this.deleteOk = true
          this.isShowInnerConfirmDialog = false
          this.isShowDialog = false
          this.getTableData()
        }
      })
    }, // 确认分配ok
    confirmShowOkDialog () {
      this.updateOk = true
      this.isShowOkDialog = false
      this.isShowDialog = false
      this.getTableData()
    },
    confirmAssign () {
      let dataResult = {}
      let result = []
      this.dialogTableData.map((list, i) => {
        let wsid = list.wsid
        let newWsid = list.newWsid
        let newList = list.result.map((item, j) => {
          item.wsId = wsid
          item.newWsId = newWsid
          item.priorityNum = j + 1
          return item
        })
        result = result.concat(newList)
      })
      console.log('result===========' + JSON.stringify(this.dialogTableData))
      dataResult.result = JSON.stringify(result)
      dataResult.reason = JSON.stringify(this.dialog)
      dataResult.orderWaveId = this.id
      this.axios.post('reloc/createWave/updateRelocInfoList', qs.stringify(dataResult)).then(res => {
        if (res.errCode === 'S') {
          this.isShowOkDialog = true // 弹出层 分配成功
        }
      })

    },
    submit () {
      this.submitIsDisabled = true
      this.cancelDisabledButton ='info'
      this.submitIsDisabledButton ='info'
      this.tableLoading = true
      let dataResult = {}
      dataResult.idList = this.sendStr
      dataResult.submitAll = this.search.submitAll
      dataResult.orderType = this.search.orderType
      dataResult.result = JSON.stringify(this.sendStr)
      dataResult.search = JSON.stringify(this.search)
      this.axios.post('reloc/createWave/createWaveId', qs.stringify(dataResult)).then((res) => {
        if (res.errCode === 'S') {
          this.id = res.data.orderWaveId
          this.dialogTableData = res.data.result.map(item => {
            if (!item.result) {
              item.result = []
            }
            return item
          })
          this.deleteOk = false
          this.updateOk = false
          this.isShowDialog = true
        }else{
          this.getTableData()
        }
        this.submitIsDisabled = false
        this.cancelDisabledButton ='primary'
        this.submitIsDisabledButton ='primary'
        this.handleCheckAllChange(false)
        this.tableLoading = false
      })
    }, // 点击是否全部提交
    handleCheckAllChange (e) {
      this.search.submitAll = e
      if (e || this.sendStr.length > 0) {
        this.submitIsDisabled = false
        this.cancelDisabled = false
        this.cancelDisabledButton ='primary'
        this.submitIsDisabledButton ='primary'
      } else {
        this.submitIsDisabled = true
        this.cancelDisabled = true
        this.cancelDisabledButton ='info'
        this.submitIsDisabledButton ='info'
      }
    },
    confirm: function () {
      this.search.currentPage = 1
      this.getTableData()
    },
    cancel: function () {
      this.$refs.multipleTable.clearSelection()
      this.handleCheckAllChange(false)
    },
    handleTabClick: function (tab, event) {
      this.initParams()
      this.getTableData()
      this.getSelectValues()
    },
    initParams () {
      this.search.ispDealer = ''
      this.search.ictDealer = ''
      this.search.route = []
      this.search.dealerAccount = []
      this.search.currentPage = 1
    },
    getTableData () { // 创建波次查询列表
      this.tableLoading = true
      let that = this
      let routeTemp = that.search.route
      let dealerAccountTemp = that.search.dealerAccount
      let resultData = {}
      
      resultData.params = JSON.stringify(that.search)
      resultData.orderType = that.search.orderType
      this.axios.post('/reloc/createWave/selectDmlPickCreateWaveVList',  qs.stringify(resultData)).then((res) => {
        if (res.errCode === 'S') {
          that.tableData = res.data.result
          that.totalRows = res.data.totalRows
          that.pageSize = res.data.pageSize
        }
        this.tableLoading = false
      })
      this.dialog.systemReason = ''
      this.dialog.manualReason = ''
    },
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.getTableData()
    },
    changeItem (val) {
      if (val.added) {
        this.$set(val.added.element, 'isChange', true)
      }
      if (val.moved) {
        this.$set(val.moved.element, 'isChange', true)
      }
    },
    startItem (val) {
      this.drag = true
    },
    endItem (val) {
      this.drag = false
      this.dialogTableData.map((list, i) => {
        let orderCount = 0
        list.result.map((item, j) => {
          orderCount = Number(item.lineCou) + Number(orderCount)
          return item
        })
        list.orderListCount = Number(orderCount)
        list.routeListCount = list.result.length
      })
    }
  },
  mounted () {
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  components: {
    draggable
  }
}
</script>


<style>
  #topTitle {
    margin-bottom: 30px;
  }
  .selectedCont .el-form-item{
    margin-right:30px;
  }
  .selectedCont .el-form-item:last-child{
    margin-right: 0px;
  }
  .selectedCont{
    margin-bottom: 30px;
  }
  #groupBtn .el-button{
  
    letter-spacing: 2px;
    font-size: 15px;
    margin-top: -10px;
    margin-left: 20px;
  }
  .drag-item {
    border:1px solid #ddd ;
    background: #f9f9f9;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  .checkBoxGroup .el-checkbox{
    margin-right: 5px;
  }
  /* 提交按钮样式 */
  .checkBoxGroup .el-button{
    text-align: center;
    margin-top:-10px;
    font-size: 15px;
  }
  
  .clears:after{
    display: block;
    content: '';
    clear: both;
    height: 0;
    overflow: hidden;
    visibility:hidden;
  }
  .fl{
    float: left;
  }
  .fr{
    float:right;
  }
  .gray {
    background: #026780;
    color: #ffffff;
  }

  .el-table th>.cell{
    font-weight: bold
  }
</style>

