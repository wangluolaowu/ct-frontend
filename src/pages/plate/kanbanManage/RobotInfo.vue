<template>
  <div class="robotInfo">
    <div class="tabOne">
      <h4 class="h2">{{$t('message.msg1_14')}}</h4>
      <el-table :data='tableData.list' :row-class-name="tableRowClassName"  highlight-current-row v-loading="tableLoading" style="width: 100%" border>
        <el-table-column prop="kidId" :label="$t('label.label1_20')" min-width='200' >
        </el-table-column>
        <el-table-column prop="batteryFaultCode" :label="$t('label.label1_21')" min-width="200" >
           <template slot-scope="scope" width="100%">
             {{$Enum.getEnumSelectByValue(KID_BATTERY_FAULT_CODE,scope.row.batteryFaultCode)}}
            </template>
        </el-table-column>
        <el-table-column prop="posX" :label="$t('label.label1_22')" min-width='200'>
        </el-table-column>
        <el-table-column prop="posY" :label="$t('label.label1_23')" min-width='200'>
        </el-table-column>
        <el-table-column prop="kidStatus" :label="$t('label.label1_24')" min-width='200' >
           <template slot-scope="scope" width="100%">
              {{$Enum.getEnumSelectByValue(KM_KID_STATUS,scope.row.kidStatus)}}
            </template>
        </el-table-column>
        <el-table-column prop="kidTaskId" :label="$t('label.label1_25')" min-width='200'>
        </el-table-column>
        <el-table-column prop="holderId" :label="$t('label.label1_26')" min-width='200' >
        </el-table-column>
        <el-table-column prop="batteryPower" :label="$t('label.label1_27')" min-width='200'>
        </el-table-column>
        <el-table-column prop="lastUpdateDate" :label="$t('label.label1_28')" min-width="200" >
          <template slot-scope="scope">
                {{$DateFormat.dateFormat(scope.row.lastUpdateDate,true)}}
            </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="listSearch.totalRows>0" class="pagination" background @current-change="listSearchHandleCurrentChange"
                        :current-page.sync="listSearch.currentPage" :page-size="listSearch.pageSize" :page-sizes="[listSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="listSearch.totalRows">
    </el-pagination>
    </div>
    <div class="tabOne tabTwo">
      <h4 class="h2">{{$t('message.msg1_15')}}</h4>
      <el-table :data='tableData.list1' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
        <el-table-column prop="kidIncharge" :label="$t('label.label1_20')" min-width="200" >
        </el-table-column>
        <el-table-column prop="taskId" :label="$t('label.label1_25')" min-width="200" >
        </el-table-column>
        <el-table-column prop="tasktType" :label="$t('label.label1_29')" min-width="200" >
          <template slot-scope="scope" width="100%">
            {{$Enum.getEnumSelectByValue(KM_KID_TASK_TYPE,scope.row.tasktType)}}
            </template>
        </el-table-column>
        <el-table-column prop="taskStatus" :label="$t('label.label1_30')" min-width="200" >
          <template slot-scope="scope" width="100%">
            {{$Enum.getEnumSelectByValue(KM_KID_TASK_STATUS,scope.row.taskStatus)}}
            </template>
        </el-table-column>
        <el-table-column prop="srcPosX" :label="$t('label.label1_31')" min-width="200" >
        </el-table-column>
        <el-table-column prop="srcPosY" :label="$t('label.label1_32')" min-width="200" >
        </el-table-column>
        <el-table-column prop="posX" :label="$t('label.label1_33')" min-width="200" >
        </el-table-column>
        <el-table-column prop="posY" :label="$t('label.label1_34')" min-width="200" >
        </el-table-column>
        <el-table-column prop="destPosX" :label="$t('label.label1_35')" min-width="200" >
        </el-table-column>
        <el-table-column prop="destPosY" :label="$t('label.label1_36')"  min-width="200">
        </el-table-column>
        <el-table-column prop="objectId" :label="$t('label.label1_26')" min-width="200" >
        </el-table-column>
        <el-table-column prop="wsId" :label="$t('label.label1_09')" min-width="200" >
        </el-table-column>
        <el-table-column prop="creationDate" :label="$t('label.label1_37')" min-width="200" >
           <template slot-scope="scope">
                {{$DateFormat.dateFormat(scope.row.creationDate,true)}}
            </template>
        </el-table-column>
        <el-table-column prop="lastUpdateDate" :label="$t('label.label1_28')" min-width="200" >
           <template slot-scope="scope">
                {{$DateFormat.dateFormat(scope.row.lastUpdateDate,true)}}
            </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="list1Search.totalRows>0" class="pagination" background @current-change="list1SearchHandleCurrentChange"
                        :current-page.sync="list1Search.currentPage" :page-size="list1Search.pageSize" :page-sizes="[list1Search.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="list1Search.totalRows">
    </el-pagination>
    </div>
    <div class="tabOne tabTwo">
      <h4 class="h2">{{$t('message.msg1_16')}}</h4>
      <el-table :data='tableData.list2' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
        <el-table-column prop="kidIncharge" :label="$t('label.label1_20')" min-width="200" >
        </el-table-column>
        <el-table-column prop="taskId" :label="$t('label.label1_25')" min-width="200" >
        </el-table-column>
        <el-table-column prop="taskType" :label="$t('label.label1_29')" min-width="200" >
           <template slot-scope="scope" width="100%">
             {{$Enum.getEnumSelectByValue(KM_KID_TASK_TYPE,scope.row.tasktType)}}
            </template>
        </el-table-column>
        <el-table-column prop="taskStatus" :label="$t('label.label1_30')" min-width="200" >
          <template slot-scope="scope" width="100%">
             {{$Enum.getEnumSelectByValue(KM_KID_TASK_STATUS,scope.row.taskStatus)}}
            </template>
        </el-table-column>
        <el-table-column prop="srcPosX" :label="$t('label.label1_31')"  min-width="200" >
        </el-table-column>
        <el-table-column prop="srcPosY" :label="$t('label.label1_32')"  min-width="200" >
        </el-table-column>
        <el-table-column prop="posX" :label="$t('label.label1_33')"  min-width="200" >
        </el-table-column>
        <el-table-column prop="posY" :label="$t('label.label1_34')"  min-width="200" >
        </el-table-column>
        <el-table-column prop="destPosX" :label="$t('label.label1_35')"  min-width="200">
        </el-table-column>
        <el-table-column prop="destPosY" :label="$t('label.label1_36')"  min-width="200" >
        </el-table-column>
        <el-table-column prop="destObjectSide" :label="$t('label.label1_39')" min-width="250" >
        </el-table-column>
        <el-table-column prop="destObjectDirection" :label="$t('label.label1_38')" min-width="250" >
        </el-table-column>
        <el-table-column prop="objectGrossWeight" :label="$t('label.label1_40')"  min-width="200" >
        </el-table-column>
        <el-table-column prop="objectId" :label="$t('label.label1_26')" min-width="200" >
        </el-table-column>
        <el-table-column prop="releaseLoadFlag" :label="$t('label.label1_41')"  min-width="200" >
          <template slot-scope="scope" width="100%">
            {{$Enum.getEnumSelectByValue(TM_MOVE_TASK_RELEASE_LOAD,scope.row.releaseLoadFlag)}}
            </template>
        </el-table-column>
        <el-table-column prop="chargePointId" :label="$t('label.label1_42')"  min-width="200" >
        </el-table-column>
        <el-table-column prop="wsId" :label="$t('label.label1_09')"  min-width="200" >
        </el-table-column>
        <el-table-column prop="creationDate" :label="$t('label.label1_37')" min-width="200" >
           <template slot-scope="scope">
                {{$DateFormat.dateFormat(scope.row.creationDate,true)}}
            </template>
        </el-table-column>
        <el-table-column prop="lastUpdateDate" :label="$t('label.label1_28')" min-width="200" >
           <template slot-scope="scope">
                {{$DateFormat.dateFormat(scope.row.lastUpdateDate,true)}}
            </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="list2Search.totalRows>0" class="pagination" background @current-change="list2SearchHandleCurrentChange"
                        :current-page.sync="list2Search.currentPage" :page-size="list2Search.pageSize" :page-sizes="[list2Search.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="list2Search.totalRows">
    </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from '../../../util/http'
export default {
  data () {
    return {
      axios,
      tableLoading: false,
      KID_BATTERY_FAULT_CODE: [],
      KM_KID_STATUS: [],
      KM_KID_TASK_TYPE: [],
      KM_KID_TASK_STATUS: [],
      TM_MOVE_TASK_RELEASE_LOAD: [],
      tableData: {
        list: [],
        list1: [],
        list2: []
      },
      listSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1
      },
      list1Search: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1
      },
      list2Search: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1
      }

    }
  },
  mounted () {
    this.getPostOne()
    this.getPostTwo()
    this.getPostThree()
    this.getSelectValues()
  },
  methods: {
    getSelectValues() {
      let Enum = this.$Enum.EnumSelect()
      this.KID_BATTERY_FAULT_CODE = Enum.KID_BATTERY_FAULT_CODE
      this.KM_KID_STATUS = Enum.KM_KID_STATUS
      this.KM_KID_TASK_TYPE = Enum.KM_KID_TASK_TYPE
      this.KM_KID_TASK_STATUS = Enum.KM_KID_TASK_STATUS
      this.TM_MOVE_TASK_RELEASE_LOAD = Enum.TM_MOVE_TASK_RELEASE_LOAD
    },
    tableRowClassName({row, rowIndex}) {
        if (row.kidStatus){
          if(row.kidStatus === 2) {
            return 'success-green'
          }else if(row.kidStatus === 99){
            return 'success-red'
          }else if(row.kidStatus === 5){
            return 'success-yellow'
          }
        }
        return 'warning-row'
      },
    getPostOne () {
      let that = this
      this.axios.get('kanban/kidInfoV/selectKidInfoVList', {
        params: that.listSearch
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
          that.tableData.list = res.data.result
        }
      })
    },
    listSearchHandleCurrentChange (val) {
      this.listSearch.currentPage = val
      this.getPostOne()
    },
    getPostTwo () {
      let that = this
      this.axios.get('kanban/kidInfoV/selectKidTaskAbnormalVList', {
        params: that.list1Search
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
          that.tableData.list1 = res.data.result
        }
      })
    },
    list1SearchHandleCurrentChange (val) {
      this.list1Search.currentPage = val
      this.getPostTwo()
    },
    getPostThree () {
      let that = this
      this.axios.get('kanban/kidInfoV/selectKidTaskDestOccupiedVList', {
        params: that.list2Search
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
          that.tableData.list2 = res.data.result
        }
      })
    },
    list2SearchHandleCurrentChange (val) {
      this.list2Search.currentPage = val
      this.getPostThree()
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
  .tabTwo{
    margin-top: 50px;
  }
  .tabOne >.h2{
    font-size: 18px;
    margin: 10px 0;
    font-weight: bold;
  }
</style>
<style>
   .el-table__row td .cell{
    text-align: center!important;
  }
  .pagination{
    text-align: right!important;
  }
   .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-green {
    background: rgba(0, 255, 136, 0.877);
  }
  .el-table .success-yellow {
    background: rgba(179, 255, 0, 0.897);
  }

   .el-table .success-red {
    background: rgba(235, 10, 10, 0.897);
  }
</style>
