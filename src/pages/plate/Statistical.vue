
<template>
  <div class="robotInfo">
    <div class="tabOne">
      <h4 class="h2">统计信息</h4>
      <div class="grid-content bg-purple-dark">
        <el-tabs id="topTitle" v-model="search.orderType" @tab-click="handleTabClick">
          <el-tab-pane label="拣货S" name="S"></el-tab-pane>
          <el-tab-pane label="拣货V" name="V"></el-tab-pane>
          <el-tab-pane label="上架" name="BIN"></el-tab-pane>
          <el-tab-pane label="调仓-拣出" name="RELOC"></el-tab-pane>
          <el-tab-pane label="调仓-召唤货架" name="CALL_SHELF"></el-tab-pane>
          <el-tab-pane label="盘点" name="STOCK_TAKING"></el-tab-pane>
        </el-tabs>
        <div class="canvasOne">
          <div class="clears">
            <h4 class="h2 fl">最近30天订单完成情况</h4>
            <div class="fr">
              <span class="startTime">{{startTimeDone}}</span>
              <span >——</span>
              <span class="endTime">{{endTimeDone}}</span>
            </div>
          </div>
          <div id="myChart" style="width: 100%;height: 400px;"></div>
        </div>
        <div class="canvasOne">
          <div class="clears">
            <h4 class="h2 fl">最近30天订单收工打印的统计图</h4>
            <div class="fr">
              <span class="startTime">{{startTimePrint}}</span>
              <span >——</span>
              <span class="endTime">{{endTimePrint}}</span>
            </div>
          </div>
          <div id="myChart2" style="width: 100%;height: 400px;"></div>
        </div>
      </div>
    </div>
    <div class="tabOne">
      <h4 class="h2">订单流水</h4>
       <el-tabs id="topTitle" v-model="searchOrder.orderType" @tab-click="handleTabClickOrder()">
          <el-tab-pane label="拣货" name="dialogPICK"></el-tab-pane>
          <el-tab-pane label="上货" name="dialogBIN"></el-tab-pane>
          <el-tab-pane label="调仓" name="dialogRELOC"></el-tab-pane>
          <el-tab-pane label="盘点" name="dialogSTOCK_TAKING"></el-tab-pane>
      </el-tabs>
      <!-- 搜索区域 -->
      <div  v-if="dialogList.dialogPICK">
      <el-form :inline="true" class="demo-form-inline selectedCont clears">
        <el-col :span="8">
            <el-form-item label="订单状态">
                <el-select placeholder="完成" v-model="searchPick.dmlOrderStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未创建波次" value="1"></el-option>
                    <el-option label="手工打印" value="2"></el-option>
                    <el-option label="完成" value="3"></el-option>
                    <el-option label="在途" value="4"></el-option>
                    <el-option label="不在途" value="5"></el-option>    
                </el-select>
            </el-form-item>
            <el-form-item label="路线" >
              <el-input v-model="searchPick.attribute10"></el-input>
            </el-form-item>
            <el-form-item label="订单类型">
                <el-select placeholder="订单类型" v-model="searchPick.attribute09">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="S" value="S"></el-option>
                    <el-option label="V" value="V"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            
             <el-col :span="8">
              <el-form-item label="WIP号" >
                 <el-input v-model="searchPick.attribute03"></el-input>
            </el-form-item>
             </el-col>
              <el-col :span="8">
             <el-form-item label="客户">
               <el-input v-model="searchPick.attribute07"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="8">
            <el-form-item label="WIP订单行" >
                 <el-input v-model="searchPick.attribute04"></el-input>
            </el-form-item>
             </el-col>
            <el-col :span="8">
            <el-form-item label="货位">
                <el-input v-model="searchPick.locNum"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="ISP经销商">
                <el-select placeholder="ISP经销商" v-model="searchPick.attribute19">
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
                 <el-select placeholder="ICT经销商" v-model="searchPick.attribute18">
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
                v-model="searchPick.startTimeCreateDtVar"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="下单截止日期" >
              <el-date-picker
                v-model="searchPick.endTimeCreateDtVar"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
                 <el-col :span="8">
           <el-form-item label="创建波次初始日期" >
              <el-date-picker
                v-model="searchPick.startTimeWaveCreateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="创建波次截止日期" >
              <el-date-picker
                v-model="searchPick.endTimeWaveCreateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
                 <el-col :span="8">
           <el-form-item label="打印初始日期" >
              <el-date-picker
                v-model="searchPick.startTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="打印截止日期" >
              <el-date-picker
                v-model="searchPick.endTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
                 <el-col :span="8">
           <el-form-item label="导入初始日期" >
              <el-date-picker
                v-model="searchPick.startTimeOrderInDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="导入截止日期" >
              <el-date-picker
                v-model="searchPick.endTimeOrderInDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span=12>
            <el-form-item>
                <el-button type="primary" @click="confirm">确认</el-button>
                 <el-button type="primary" @click="reset">清空</el-button>
                 <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
            </el-col>
      </el-form>
      <el-table ref="multipleTable" :data="tableData.pick" style="width: 100%" @selection-change="handleSelectionChangePick" border v-loading="tableLoadingPick">
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
            <el-table-column prop="attribute01" label="拣货记录"  width="100">
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
         <el-pagination v-if="searchPick.totalRows>0" class="pagination" background @current-change="handleCurrentChangePick"
                        :current-page.sync="searchPick.currentPage" :page-size="searchPick.pageSize" :page-sizes="[searchPick.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="searchPick.totalRows">
          </el-pagination>
      </div>  
    </div>
  </div>
</template>
<script>
  import axios from '../../util/http'
  import echarts from 'echarts'

  export default {
    data () {
      return {
        axios,
        tableLoading: false,
        tableLoadingPick: false,
        tableData: {
          pick: []
        },
        search: { // 查询参数
          orderType: 'S',
          currentPage: 1
        },
         // 查询参数
       searchPick: {
        dmlOrderStatus: '',
        attribute10: '',
        attribute09: '',
        attribute03: '',
        attribute07: '',
        attribute04: '',
        locNum: '',
        attribute19: '',
        attribute18: '',
        wsId: '',
        currentPage: 1,
        printAll: false,
        startTimeCreateDtVar:'',
        endTimeCreateDtVar:'',
        startTimeWaveCreateDate:'',
        endTimeWaveCreateDate:'',
        startTimeLastUpdateDate:'',
        endTimeLastUpdateDate:'',
        startTimeOrderInDate:'',
        endTimeOrderInDate:'',
        totalRows:-1,
        pageSize:-1
      },
      searchOrder: { // 查询参数
          orderType: 'dialogPICK'
        },
        startTimeDone:'',
        endTimeDone:'',
        startTimePrint:'',
        endTimePrint:'',
        dataTimeDonekeyList: [],
        dataTimeDoneValueList: [],
        dataTimePrintkeyList: [],
        dataTimePrintValueList: [],
        dialogList:{
          dialogPICK:true,
          dialogBIN:false,
          dialogRELOC:false,
          dialogSTOCK_TAKING:false
        },
        DML_PICK_ORDER_STATUS: [],
        Y_N_STATUS: []
      }
    },
    mounted () {
      this.getSelectValues()
      this.getMychartData()
      this.getDataPick()
    },
    methods: {
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
    handleSelectionChangePick(){

      },
      handleCurrentChangePick(){
      this.searchPick.currentPage = val
      this.getDataPick()
      },
      handleChangeTime(){

      },
      cancel(){
        this.$refs.multipleTable.clearSelection()
      },
      confirm(){
        this.searchPick.currentPage = 1
        this.getDataPick()
      },
      reset(){
        this.searchPick.dmlOrderStatus=''
        this.searchPick.attribute10=''
        this.searchPick.attribute09= ''
        this.searchPick.attribute03=''
        this.searchPick.attribute07=''
        this.searchPick.attribute04=''
        this.searchPick.locNum =''
        this.searchPick.attribute19=''
        this.searchPick.attribute18=''
        this.searchPick.wsId= ''
        this.searchPick.currentPage=1,
        this.searchPick.printAll=false,
        this.searchPick.startTimeCreateDtVar=''
        this.searchPick.endTimeCreateDtVar=''
        this.searchPick.startTimeWaveCreateDate=''
        this.searchPick.endTimeWaveCreateDate=''
        this.searchPick.startTimeLastUpdateDate=''
        this.searchPick.endTimeLastUpdateDate=''
        this.searchPick.startTimeOrderInDate=''
        this.searchPick.endTimeOrderInDate=''
    },
      handleTabClickOrder(tab, event){
        let dialogListTemp = this.dialogList
        for(var st in dialogListTemp) {
         if(this.searchOrder.orderType === st) {
          this.dialogList[st] = true
         }else{
           this.dialogList[st]= false
         }
        }
        
      },
      getDataPick () {
        let that = this
        this.axios.get('kanban/orderSum/selectDmlPickDetailsVList', {
          params: that.searchPick
        }).then((res) => {
          if (res.errCode === 'S') {
            that.tableData.pick = res.data.result
            that.searchPick.totalRows = res.data.totalRows
            that.searchPick.pageSize = res.data.pageSize
          }
        })
      }, // 单分页
      listSearchHandleCurrentChange (val) {
        this.listSearch.currentPage = val
        this.getPostOne()
      },
      // 切换
      handleTabClick: function (tab, event) {
        this.initParams()
        this.getMychartData()
      },
      initParams () {
        this.dataTimeDonekeyList=[]
        this.dataTimeDoneValueList=[]
        this.dataTimePrintkeyList=[]
        this.dataTimePrintValueList=[]
      },
      getMychartData () {
        let that = this
        this.axios.get('kanban/orderSum/select30DayHDmlBinDeliveryVList', {
          params: that.search
        }).then((res) => {
          if (res.errCode === 'S') {
            res.data.resultDone.map((item,i) => {
            if(i === 0){
              this.startTimeDone = item.LAST_UPDATE_DATE
            }
            if(i === res.data.resultDone.length-1){
              this.endTimeDone = item.LAST_UPDATE_DATE
            }
            this.dataTimeDonekeyList.push(item.LAST_UPDATE_DATE)
            this.dataTimeDoneValueList.push(item.COU)
          })
           res.data.resultPrint.map((item,i) => {
            if(i === 0){
              this.startTimePrint = item.LAST_UPDATE_DATE
            }
            if(i === res.data.resultDone.length-1){
              this.endTimePrint = item.LAST_UPDATE_DATE
            }
            this.dataTimePrintkeyList.push(item.LAST_UPDATE_DATE)
            this.dataTimePrintValueList.push(item.COU)
          })
          this.drawLine(this.dataTimeDonekeyList,this.dataTimeDoneValueList)
          this.drawLineTwo(this.dataTimePrintkeyList,this.dataTimePrintValueList)
         }
        })
          
      },
      // 统计图
      drawLine (dataTimeDonekeyListArg,dataTimeDoneValueListArg) {
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
              xAxisIndex: [0],
              start: 5,
              end: 20
            }
          ],
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            // x轴的动态数据需要填写在则里面
            data: dataTimeDonekeyListArg
          },
          yAxis: {},
          series: [{
            name: '订单',
            type: 'bar',
            data: dataTimeDoneValueListArg, // 需要填写的Y动态数据
            barWidth: 20
          }]
        })
      },
      drawLineTwo (dataTimePrintkeyListArg,dataTimePrintValueListArg) {
        let mychartss = echarts.init(document.getElementById('myChart2'))
        mychartss.setOption({
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
              type: 'inside', // inside,slider
              show: true,
              xAxisIndex: [0],
              start: 5,
              end: 20
            }
          ],
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            // x轴的动态数据需要填写在则里面
            data: dataTimePrintkeyListArg
          },
          yAxis: {},
          series: [{
            name: '订单',
            type: 'bar',
            data: dataTimePrintValueListArg, // 需要填写的Y动态数据
            barWidth: 30
          }]
        })
      }
    },
    filters: {
      formatDate (time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>
<style scoped>
  .tabOne{
    border: 1px solid #e6e6e6;
    padding: 0 5px 40px 5px;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin-top: 40px;
  }
  .tabOne >.h2{
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0px;
  }
  .tabTwo{
    margin-top: 40px;
  }

  /*统计图*/
  .canvasOne{
    width: 90%;
    margin: 25px auto 30px;
  }
  .clears .h2,.canvasOne .fr span{
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
  .robotInfo .el-tabs__nav-wrap {
    width: 90%;
    margin: 0 auto;
  }
</style>
