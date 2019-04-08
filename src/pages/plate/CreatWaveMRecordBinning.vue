<template>
  <div id="mainContainer">
    <el-row :span="24" style="margin-bottom: 20px;">
      <el-col :span="12">
        <div class="block">
          <span class="demonstration">初始日期</span>
              <el-date-picker
                v-model="search.startTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择初始日期"
                @change="handleChangeTime"
              ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="block">
          <span class="demonstration">结束日期</span>
         <el-date-picker
                v-model="search.endTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
                 @change="handleChangeTime"
              ></el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="12">
        <el-button type="primary" @click="researchBtn" style="display: inline-block;width:80px;">查找</el-button>
        <el-button type="primary" @click="cancel" style="display: inline-block;width:80px;"> 取消</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" highlight-current-rowstyle="width: 100%" border v-loading="tableLoading">
      <el-table-column prop="ROW_ID" label="序号"></el-table-column>
      <el-table-column prop="BINWAVEID" label="波次号"></el-table-column>
      <el-table-column prop="ORDERSUM" label="任务波次订单行总数"></el-table-column>
      <el-table-column prop="WHITECREATIONDATE" label="创建波次时间">
         <template slot-scope="scope">
                {{$DateFormat.dateFormat(scope.row.WHITECREATIONDATE,true)}}
            </template>
      </el-table-column>
    </el-table>
 <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange" :current-page.sync="search.currentPage" :page-size="pageSize" :page-sizes="[pageSize]" layout="total, sizes, prev, pager, next, jumper" :total="totalRows">
                </el-pagination>
  </div>
</template>
<script>
import axios from '../../util/http'
import dateFormat from '../../util/date'

export default {
  data () {
    return {
      axios,
      dateFormat,
      tableLoading: false,
      search:{
        startTime: '',
        endTime:'',
        currentPage:1
      },
      totalRows: -1,
      pageSize: -1,
      tableData: []
    }
  },
  mounted () {
    this.researchBtn()
  },
  methods: { 
    getDate(data, flag) {
      return this.dateFormat(data, flag)
    },
    researchBtn () {
      this.tableLoading = true
      let that = this
      this.axios.get('binningManage/binWaveHistory/selectBinWaveHistory', {
        params:this.search
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
          that.tableData = res.data.result
          that.totalRows = res.data.totalRows
          that.pageSize = res.data.pageSize
        }
        this.tableLoading = false
      })
    },
    cancel (){
      this.search.startTime = ''
      this.search.endTime = ''
    },
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.researchBtn()
    },
    handleChangeTime(){//点查找按钮
      let that = this;
      let startTime = that.startTime;
      let endTime = that.endTime;
      //判断时间
      if(startTime > endTime){
        return false;
      }
    }
  }
}
</script>
<style>
.activated{
color: dimgrey;
}
#mainContainer{
margin: 40px 0 100px;
}

</style>
<style>
html{
  color: #333333;
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
}
.el-table .cell{
  text-align: center!important;
  font-size: 15px;
}
.el-col .title{
  font-size: 24px;
  font-weight: bolder;
}
.el-breadcrumb__item .el-breadcrumb__inner,.el-breadcrumb__separator{
  font-size: 18px;
}
.el-table__empty-block .el-table__empty-text{
  font-size: 15px;
}
#topTitle .el-tabs__item{
  font-size: 15px;
  font-weight: bold;
}
.el-picker-panel{
  top: 195px;
}
#tabs .has-gutter >tr >th >.cell{
  color: #999;
}
</style>
