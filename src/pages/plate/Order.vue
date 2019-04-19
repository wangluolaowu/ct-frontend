<template>
  <div class="mainOrder">
    <div id="mainTabCon">
      <div class="tabCon tabConOther">
        <h4 class="h2">拣货V单汇总</h4>
        <el-table :data='tableData.Vlist' highlight-current-row v-loading="tableLoadingVDT" style="width: 100%" border>
          <el-table-column prop="inC" label="系统接收订单行总数" width="200"></el-table-column>
          <el-table-column prop="waveC" label="当天已创建波次订单行"  width='200'></el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行" width="150"></el-table-column>
          <el-table-column prop="uncomplC" label="当前未完成订单行" width="150"></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行"  width="200"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" min-width='220'></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" label="完成百分比" width="190"></el-table-column>
          <el-table-column prop="forecastComplSecond"  label="预计完成时间" width="200">
            <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabConOther">
        <h4 class="h2">拣货-V单</h4>
        <el-table :data='tableData.VOrderList' highlight-current-row v-loading="tableLoadingVD" style="width: 100%" border>
          <el-table-column prop="entityWorkstationId" label="工作站编号" min-width='100'></el-table-column>
          <el-table-column prop="forecastWallCount" label="播种墙数量" min-width='100'></el-table-column>
          <el-table-column prop="workstationStatus" label="工作状态" width="200">
            <template slot-scope="scope">
              {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行总数" width="180"></el-table-column>
          <el-table-column prop="uncomplC" label="已分配且未完成的订单行数量" width="220" ></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行数量" width="160"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplSecond" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="VOrderListSearch.totalRows>0" class="pagination" background @current-change="VOrderListSearchHandleCurrentChange"
                       :current-page.sync="VOrderListSearch.currentPage" :page-size="VOrderListSearch.pageSize" :page-sizes="[VOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="VOrderListSearch.totalRows">
        </el-pagination>
      </div>

      <div class="tabConOther">
        <h4 class="h2">拣货-S单汇总</h4>
        <el-table :data='tableData.SList' highlight-current-row v-loading="tableLoadingSDT" style="width: 100%" border>
          <el-table-column prop="inC" label="系统接收订单行总数" width="190"></el-table-column>
          <el-table-column prop="waveC" label="当天已创建波次订单行" min-width='200'></el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行"  min-width='200'></el-table-column>

          <el-table-column prop="uncomplC" label="当前未完成订单行"  min-width='200'></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行" width="150"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplSecond" label="预计完成时间" min-width='170'>
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabConOther">
        <h4 class="h2">拣货-S单</h4>
        <el-table :data='tableData.SOrderList' highlight-current-row v-loading="tableLoadingSD" border>
          <el-table-column prop="entityWorkstationId" label="工作站编号"  min-width='100'></el-table-column>
          <el-table-column prop="forecastWallCount" label="播种墙数量"  min-width='100'></el-table-column>
          <el-table-column prop="workstationStatus" label="工作状态" width="200">
             <template slot-scope="scope" width="100%">
             {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行总数" width="200"></el-table-column>

          <el-table-column prop="uncomplC" label="已分配且未完成的订单行数量" width="220"></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行数量" width="180"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplSecond" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="SOrderListSearch.totalRows>0" class="pagination" background @current-change="SOrderListHandleCurrentChange"
                       :current-page.sync="SOrderListSearch.currentPage" :page-size="SOrderListSearch.pageSize" :page-sizes="[SOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="SOrderListSearch.totalRows">
        </el-pagination>
      </div>
      <div class="tabConOther">
        <h4 class="h2">上架订单汇总</h4>
        <el-table :data='tableData.PutawayAllList' highlight-current-row v-loading="tableLoadingSJT" style="width: 100%" border>
          <el-table-column prop="inC" label="系统接收订单行数量" width="200"></el-table-column>
          <el-table-column prop="whiteWaveC" label="当天已创建波次订单行" width="180"></el-table-column>
          <el-table-column prop="blueWaveC" label="蓝领已提交订单行" width="190"></el-table-column>
          <el-table-column prop="blueUncomplC" label="蓝领已提交未完成订单行" width="190"></el-table-column>
          <el-table-column prop="uncomplC" label="当前未完成订单行" width="140"></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行" width="145"></el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行" width="140"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）"  width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplSecond" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabConOther">
        <h4 class="h2">上架</h4>
        <el-table :data='tableData.PutawayList' highlight-current-row v-loading="tableLoadingSJ" style="width: 100%" border>
          <el-table-column prop="entityWorkstationId" label="工作站编号" width="100"></el-table-column>
          <el-table-column prop="workstationStatus" label="工作状态" width="200">
             <template slot-scope="scope" width="100%">
              {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行总数" width="175"></el-table-column>
          <el-table-column prop="dayWaveC" label="当天已提交订单行总数" width="175"></el-table-column>
          <el-table-column prop="currWaveC" label="蓝领本次已提交订单行总数" width="190"></el-table-column>
          <el-table-column prop="whiteUncomplC" label="蓝领已提交且未完成的订单行总数" width="230"></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行" width="160"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplSecond" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.whiteUncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="PutawayListSearch.totalRows>0" class="pagination" background @current-change="PutawayListSearchHandleCurrentChange"
                       :current-page.sync="PutawayListSearch.currentPage" :page-size="PutawayListSearch.pageSize" :page-sizes="[PutawayListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="PutawayListSearch.totalRows">
        </el-pagination>
      </div>
      <div class="tabConOther">
        <h4 class="h2">调仓-拣出订单汇总</h4>
        <!--新添加表格-->
        <el-table :data='tableData.TiaoCangAllList' highlight-current-row v-loading="tableLoadingTCT" style="width: 100%" border>
           <el-table-column prop="inC" label="系统接收订单行总数" width="190"></el-table-column>
          <el-table-column prop="waveC" label="当天已创建波次订单行"  min-width='180'></el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行"  min-width='180'></el-table-column>

          <el-table-column prop="uncomplC" label="当天未完成订单行"  min-width='180'></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行" width="150"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）"  min-width='220'></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplSecond" label="预计完成时间"  min-width='200'>
             <template slot-scope="scope">
                  {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabConOther">
        <h4 class="h2">调仓-拣出订单</h4>
        <el-table :data='tableData.TiaoCangLists' highlight-current-row v-loading="tableLoadingTC" border>
          <el-table-column prop="entityWorkstationId" label="工作站编号"  min-width='100'></el-table-column>
          <el-table-column prop="workstationStatus" label="工作状态"  min-width='100'>
             <template slot-scope="scope" width="100%">
              {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行总数"  min-width='200'></el-table-column>

          <el-table-column prop="uncomplC" label="已分配且未完成的订单行" width="220"></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行" width="180"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplSecond" label="预计完成时间" width="200">
             <template slot-scope="scope">
                  {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="SOrderListSearch.totalRows>0" class="pagination" background @current-change="SOrderListHandleCurrentChange"
                       :current-page.sync="SOrderListSearch.currentPage" :page-size="SOrderListSearch.pageSize" :page-sizes="[SOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="SOrderListSearch.totalRows">
        </el-pagination>
      </div>
       <div class="tabConOther">
        <h4 class="h2">召唤货架汇总</h4>
        <!--新添加表格-->
        <el-table :data='tableData.resultCallShelfSum' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
           <el-table-column prop="allCou" label="系统当天录入订单行总数" width="190"></el-table-column>
          <el-table-column prop="complCou" label="当天已完成订单行"  min-width='150'></el-table-column>

          <el-table-column prop="uncomplCou" label="当天未完成订单行"  min-width='150'></el-table-column>
          <el-table-column prop="comingCou" label="正在进行中订单行"  min-width='150'></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" label="完成百分比"  min-width='100'></el-table-column>
          <el-table-column prop="forecastComplSecond" label="预计完成时间" width="200">
             <template slot-scope="scope">
                  {{getDate(scope.row.forecastComplSecond,scope.row.uncomplCou,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
       <div class="tabConOther">
        <h4 class="h2">召唤货架</h4>
        <el-table :data='tableData.resultCallShelfInfoList' highlight-current-row v-loading="tableLoading" border>
          <el-table-column prop="entityWorkstationId" label="工作站编号"  min-width='100'></el-table-column>
          <el-table-column prop="workstationStatus" label="工作状态"  min-width='100'>
             <template slot-scope="scope" width="100%">
             {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complCou" label="当天已完成订单行总数"  min-width='200'></el-table-column>

          <el-table-column prop="uncomplCou" label="已分配且未完成的订单行数量" width="220"></el-table-column>
          <el-table-column prop="comingCou" label="正在进行中订单行数量" width="180"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比"  min-width='100'></el-table-column>
          <el-table-column prop="forecastComplSecond" label="预计完成时间" min-width='200'>
             <template slot-scope="scope">
                 {{getDate(scope.row.forecastComplSecond,scope.row.uncomplCou,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="SOrderListSearch.totalRows>0" class="pagination" background @current-change="SOrderListHandleCurrentChange"
                       :current-page.sync="SOrderListSearch.currentPage" :page-size="SOrderListSearch.pageSize" :page-sizes="[SOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="SOrderListSearch.totalRows">
        </el-pagination>
      </div>
       <div class="tabConOther">
        <h4 class="h2">盘点订单汇总</h4>
        <!--新添加表格-->
        <el-table :data='tableData.resultStockSum' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
           <el-table-column prop="allCou" label="系统当天接收订单行总数" width="190"></el-table-column>
          <el-table-column prop="wavedCou" label="当天已创建波次订单行" width="200"></el-table-column>
          <el-table-column prop="complCou" label="当天已完成订单行"  min-width='150'></el-table-column>

          <el-table-column prop="uncomplCou" label="当天未完成订单行"  min-width='150'></el-table-column>
          <el-table-column prop="comingCou" label="正在进行中订单行"  min-width='150'></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" label="完成百分比"  min-width='100'></el-table-column>
          <el-table-column prop="forecastComplSecond" label="预计完成时间"  min-width='200'>
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplCou,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
       <div class="tabConOther">
        <h4 class="h2">盘点订单</h4>
        <el-table :data='tableData.resultStockInfoList' highlight-current-row v-loading="tableLoading" border>
          <el-table-column prop="entityWorkstationId" label="工作站编号" width="100"></el-table-column>
          <el-table-column prop="workstationStatus" label="工作状态"  min-width='100'>
             <template slot-scope="scope" width="100%">
              {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complCou" label="当天已完成订单行总数"  min-width='200'></el-table-column>

          <el-table-column prop="uncomplCou" label="已分配且未完成的订单行数量" width="220"></el-table-column>
          <el-table-column prop="comingCou" label="正在进行中订单行数量" width="180"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" min-width='100' ></el-table-column>
          <el-table-column prop="forecastComplSecond" label="预计完成时间"  min-width='200'>
             <template slot-scope="scope">
                 {{getDate(scope.row.forecastComplSecond,scope.row.uncomplCou,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="SOrderListSearch.totalRows>0" class="pagination" background @current-change="SOrderListHandleCurrentChange"
                       :current-page.sync="SOrderListSearch.currentPage" :page-size="SOrderListSearch.pageSize" :page-sizes="[SOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="SOrderListSearch.totalRows">
        </el-pagination>
      </div>
     </div> 
    <div class="tabConOther lineCon" id="tabContainer">
      <div class="grid-content bg-purple-dark">
        <el-tabs id="topTitle" v-model="search.orderType" >
          <!--@tab-click="handleTabClick"-->
          <el-tab-pane label="拣货S" name="S"></el-tab-pane>
          <el-tab-pane label="拣货V" name="V"></el-tab-pane>
          <el-tab-pane label="上架" name="S1"></el-tab-pane>
          <el-tab-pane label="调仓-拣出" name="RELOC"></el-tab-pane>
          <el-tab-pane label="调仓-召唤货架" name="S2"></el-tab-pane>
          <el-tab-pane label="盘点" name="S3"></el-tab-pane>
        </el-tabs>
        <div class="clears">
          <h4 class="h2 fl">24小时订单完成统计</h4>
          <span class="fr">{{endTime24}}</span>
        </div>
        <div id="myChart" style="width: 100%;height: 400px;"></div>
      </div>
    </div>

    </div>
</template>
<script>
// import qs from 'qs'
import axios from '../../util/http'
import dateFormat from '../../util/date'
import echarts from 'echarts'
export default {
  name: 'Order',
  data () {
    return {
      axios,
      dateFormat,
      tableLoading: false,
      WS_STATUS: [],
      tableLoadingSDT: false,
      tableLoadingSD: false,
      tableLoadingVDT: false,
      tableLoadingVD: false,
      tableLoadingSJT: false,
      tableLoadingSJ: false,
      tableLoadingTCT: false,
      tableLoadingTC: false,
      timer: '',
      search: { // 查询参数
        orderType: 'S',
        ispDealer: '',
        ictDealer: '',
        currentPage: 1
      },
      tableData: {
        Vlist: [],
        VOrderList: [],
        SList: [],
        SOrderList: [],
        PutawayAllList: [],
        PutawayList: [],
        TiaoCangAllList: [],
        TiaoCangLists: [],
        PickOutOrdersList: [],
        ShelvesToalList: [],
        OrderSummaryList: [],
        SetPointList: [],
        resultStockSum: [],
        resultStockInfoList: [],
        resultCallShelfSum: [],
        resultCallShelfInfoList: []
      },
      VOrderListSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1,
        extWorkstationType: 'V'
      },
      SOrderListSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1,
        extWorkstationType: 'S'
      },
      PutawayListSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1
      },
      sum24KeyList:[],
      sum24ValueList:[],
      endTime24:'',
      interval:''
    }
  },
  // 页面加
  mounted () {
    this.getTimeOut()
    this.getSelectValues()
  },
  created () {
     this.interval=window.setInterval(() => {
     setTimeout(this.getTimeOut(), 0)
    }, 60000)
  },
  destroyed() { 
     clearInterval(this.interval)
  },
  methods: {
    getDate(data, unCou,instation) {
      if (data) {
        return Math.floor(data / 60) + ':' + data % 60
      } else {
        if(unCou && !instation){
          return '∞'   
          }
        return '0'
      }
    },
    getSelectValues() {
      this.WS_STATUS = this.$Enum.EnumSelect().WS_STATUS
    },
    getTimeOut() {
      this.getPutaway()
      this.getPutawayData()
      this.getSData()
      this.getVData()
      this.getVAllData()
      this.getSAllData()
      this.getSum24()
      this.getTiaoCangAllList()
      this.getTiaoCangLists()
      this.getStockCallShelfList()
      this.getSum24()
    },
    getStockCallShelfList () { // 盘点，召唤货架信息
      let that = this
      this.tableLoadingVDT = true
      this.axios.get('kanban/orderKanban/selectStockCallShelfList', {
        params: {
          orderType: 'V'
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData.resultStockSum = res.data.resultStockSum
          that.tableData.resultStockInfoList = res.data.resultStockInfoList
          that.tableData.resultCallShelfSum = res.data.resultCallShelfSum
          that.tableData.resultCallShelfInfoList = res.data.resultCallShelfInfoList
        }
      })
      this.tableLoadingVDT = false
    },
    getVAllData () { // 获取拣货V单汇总
      let that = this
      this.tableLoadingVDT = true
      this.axios.get('kanban/orderKanban/selectDmlPickDeliveryStatList', {
        params: {
          orderType: 'V'
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData.Vlist = res.data.result
        }
      })
      this.tableLoadingVDT = false
    },
    getVData () { // 获取拣货V单
      let that = this
      this.tableLoadingVD = true
      this.axios.get('kanban/orderKanban/selectDmlPickDeliveryWsStatList', {
        params: that.VOrderListSearch
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData.VOrderList = res.data.result
        }
      })
      this.tableLoadingVD = false
    }, // V单分页
    VOrderListSearchHandleCurrentChange (val) {
      this.VOrderListSearch.currentPage = val
      this.getVData()
    },
    // 获取拣货S单汇总
    getSAllData () {
      let that = this
      this.tableLoadingSDT = true
      this.axios.get('kanban/orderKanban/selectDmlPickDeliveryStatList', {
        params: {
          orderType: 'S'
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData.SList = res.data.result
        }
      })
      this.tableLoadingSDT = false
    }, // S单分页
    SOrderListHandleCurrentChange (val) {
      this.SOrderListSearch.currentPage = val
      this.getSData()
    },
    // 获取拣货S单
    getSData () {
      let that = this
      this.tableLoadingSD = true
      this.axios.get('kanban/orderKanban/selectDmlPickDeliveryWsStatList', {
        params: that.SOrderListSearch
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData.SOrderList = res.data.result
        }
      })
      this.tableLoadingSD = false
    }, // 获取拣货S单汇总
    getTiaoCangAllList() {
      this.tableLoadingTCT = true
      let that = this
      this.axios.get('kanban/orderKanban/selectDmlPickDeliveryStatList', {
        params: {
          orderType: 'RELOC'
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res)
          that.tableData.TiaoCangAllList = res.data.result
        }
      })
      this.tableLoadingTCT = false
    },
    getTiaoCangLists() {
      this.tableLoadingTC = true
      let that = this
      this.axios.get('kanban/orderKanban/selectDmlPickDeliveryWsStatList', {
        params: {
          extWorkstationType: 'RELOC'
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData.TiaoCangLists = res.data.result
        }
      })
      this.tableLoadingTC = false
    }, // 上架订单汇总
    getPutawayData () {
      this.tableLoadingSJT = true
      this.axios.get('kanban/orderKanban/selectDmlBinDeliveryStatList', {}).then((res) => {
        if (res.errCode === 'S') {
          let result = []
          result.push(res.data.result)
          this.tableData.PutawayAllList = result
        }
      })
      this.tableLoadingSJT = false
    },
    // 上架
    getPutaway () {
      let that = this
      this.tableLoadingSJ = true
      this.axios.get('kanban/orderKanban/selectDmlBinDeliveryWsStatList', {
        params: that.PutawayListSearch
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
          that.tableData.PutawayList = res.data.result
        }
      })
      this.tableLoadingSJ = false
    }, // 上架分页
    PutawayListSearchHandleCurrentChange (val) {
      this.PutawayListSearch.currentPage = val
      this.getPutaway()
    }, // 切换
    getSum24(){
      this.axios.get('kanban/orderKanban/select24HDmlBinDeliveryVList', {
        params: this.PutawayListSearch
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
           res.data.result.map((item,i) => {
            if(i === 0){
              this.endTime24 = item.LAST_UPDATE_TIME
            }
            this.sum24KeyList.push(item.LAST_UPDATE_DATE)
            this.sum24ValueList.push(item.COU)
          })
        }
        this.drawLine ()
      })
    },
    drawLine () { // 统计图
      let mychart = echarts.init(document.getElementById('myChart'))
      mychart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          top: 30,
          right: 50
        },
        dataZoom: [
          {
            type: 'inside',
            show: true,
            xAxisIndex: [0]
          }
        ],
        xAxis: {
          axisLabel: {
            interval: 0,
            rotate: 40 },

          data: this.sum24KeyList
        },
        yAxis: {},
        series: [{
          name: '订单',
          type: 'bar',
          data: this.sum24ValueList, // 需要填写的Y动态数据
          barWidth: 30
        }]
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .mainOrder{
    font-weight: 650;
    color: #333;
  }
  .mainOrder el-table{
    text-align: center!important;
  }
  .tabCon{
    margin-top: 25px;
  }
  .tabConOther{
    margin-bottom: 50px;
  }
  .tabConOther >.h2,.tabConLast>.h2{
    margin:10px 0;
    font-size: 18px;
    font-weight: bold;
  }
  #mainTabCon{
    margin: 40px auto 50px;
  }
  .lineCon,#mainTabCon{
    border: 1px solid #e6e6e6;
    padding: 0 5px 20px;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .lineCon{
    padding: 10px 5px 30px;
  }
  .clears{
    width: 90%;
    margin: 25px auto 30px;
  }
  .clears .h2{
    font-size: 16px;
    font-weight: bold;
  }
  .clears:after{
    display: block;
    content: '';
    clear: both;
    height: 0;
    visibility:hidden;
    overflow: hidden;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
</style>
<style>
  html{
    color: #333333;
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
  }
  .el-table th>.cell{
    text-align: center!important;
    font-size: 15px;
  }
  .el-table__empty-block .el-table__empty-text{
    font-size: 15px;
  }
  #tabContainer .el-tabs__nav-wrap {
    width: 90%;
    margin: 0 auto;
  }
  .mainOrder tbody .el-table__row td .cell{
    text-align: center;
  }
  .mainOrder .pagination{
    text-align: right;
  }
</style>
