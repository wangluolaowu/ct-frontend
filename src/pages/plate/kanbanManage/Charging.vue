<template>
  <div class="charingCon">
    <h4 class="h2">{{$t('message.msg1_17')}}</h4>
    <el-table :data='tableData.list' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
      <el-table-column prop="chargePointId" :label="$t('label.label1_42')" min-width='200'>
      </el-table-column>
      <el-table-column prop="activeFlag" :label="$t('label.label1_43')" min-width='200'>
      </el-table-column>
      <el-table-column prop="connAliveFlag" :label="$t('label.label1_44')" min-width='200'>
      </el-table-column>
      <el-table-column prop="posX" :label="$t('label.label1_22')" min-width='200'>
      </el-table-column>
      <el-table-column prop="posY" :label="$t('label.label1_23')" min-width='200'>
      </el-table-column>
      <el-table-column prop="offsetDirectioin" :label="$t('label.label1_45')" min-width='200'>
         <template slot-scope="scope" width="100%">
            {{ $Enum.getEnumSelectByValue(MD_MAP_DIRECTION_LIMIT,scope.row.offsetDirectioin) }}
         </template>
      </el-table-column>
      <el-table-column prop="endStatus" :label="$t('label.label1_46')" min-width='200'>
        <template slot-scope="scope" width="100%">
            {{ $Enum.getEnumSelectByValue(CS_CHARGE_POINT_STATUS,scope.row.endStatus) }}
         </template>
      </el-table-column>

      <el-table-column prop="chargingKidId" :label="$t('label.label1_47')" min-width="200">
      </el-table-column>
      <el-table-column prop="lastUpdateDate" :label="$t('label.label1_28')" min-width="200">
        <template slot-scope="scope">
                {{ $DateFormat.dateFormat(scope.row.lastUpdateDate,true) }}
            </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="listSearch.totalRows>0" class="pagination" background @current-change="listSearchHandleCurrentChange"
                        :current-page.sync="listSearch.currentPage" :page-size="listSearch.pageSize" :page-sizes="[listSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="listSearch.totalRows">
    </el-pagination>
  </div>
</template>
<script>
import axios from '../../../util/http'

export default {
  data () {
    return {
      axios,
      tableLoading: false,
      MD_MAP_DIRECTION_LIMIT: [],
      CS_CHARGE_POINT_STATUS:[],
      tableData: {
        list: []
      },
      listSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1
      }
    }
  },
  mounted () {
    this.getEnumSelectValues()
  },
  methods: {
    getEnumSelectValues() {
      this.tableLoading = true
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
            if (item.lookupType === 'CS_CHARGE_POINT_STATUS') {
              item.value = item.lookupValueNum
              item.label = item.meaning||item.lookupValueNum
              this.CS_CHARGE_POINT_STATUS.push(item)
            }
            return item
          })
        }
        this.getPostReqs()
      })
    },
    getPostReqs () {
      let that = this
      this.axios.get('kanban/csChargePointInfoV/selectCsChargePointInfoVList', {
        params: that.listSearch
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
          console.log(res.data.result)
          that.tableData.list = res.data.result.map(item => {
            if (item.activeFlag === 1) {
              item.activeFlag = '是'
            } else {
              item.activeFlag = '否'
            }
            if (item.connAliveFlag && item.connAliveFlag === 1) {
              item.connAliveFlag = '是'
            } else {
              item.connAliveFlag = '否'
            }
            return item
          })
          this.tableLoading = false
        }
      })
    }, // 单分页
    listSearchHandleCurrentChange (val) {
      this.listSearch.currentPage = val
      this.getPostReqs()
    }
  }
}
</script>
<style scoped>
  .charingCon{
    margin: 40px 0 50px;
    border: 1px solid #e6e6e6;
    padding: 0 5px 40px 5px;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .charingCon >.h2{
    font-size: 18px;
    font-weight: bold;
    margin:10px 0;
  }
  
</style>
