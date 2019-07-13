<template>
  <div id="mainContainer">
    <!-- 搜索区域 -->
    <el-form class="demo-form-inline selectedCont clears" label-width="200px">
            <el-row>
              <el-col :span="10">
                <el-form-item :label="$t('label.label2_13')" >
                  <el-date-picker
                  v-model="search.startTime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  @change="handleChangeTime"
                ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :label="$t('label.label2_14')" >
                  <el-date-picker
                    v-model="search.endTime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                     @change="handleChangeTime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>    
             <el-row>
              <el-col :span="10">
              <el-form-item :label="$t('label.label1_51')">
                <el-select v-model="search.orderType" style="width:220px">
                          <el-option
                            v-for="item in $Enum.EnumSelect().pick_order_type_all"
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
          <el-col :span="4">
            <el-form-item >  
                <el-button type="primary" @click="loadData">{{$t('message.msg1_28')}}</el-button>   
            </el-form-item>
            </el-col>
            <el-col :span="4">
            <el-form-item >  
                <el-button type="primary" @click="restData">{{$t('message.msg1_29')}}</el-button>    
            </el-form-item>
            </el-col>
        </el-row>    
    </el-form>
    <el-table :data="tableData" highlight-current-rowstyle="width: 100%" border v-loading="tableLoading">
               <el-table-column type="index" :label="$t('label.label1_86')" width="150"></el-table-column>
                <el-table-column prop="pickTicketNum" :label="$t('label.label2_07')" min-width="200">
                </el-table-column>
                  <el-table-column prop="locNum" :label="$t('label.label2_09')" min-width="150">
                </el-table-column>
                <el-table-column prop="skuNum" :label="$t('label.label1_70')"  min-width="200">
                </el-table-column>
                <el-table-column prop="pickQty" :label="$t('label.label1_80')" min-width="100">
                </el-table-column>
                <el-table-column prop="creationDate" :label="$t('label.label1_72')" min-width="200">
                      <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.creationDate,true)}}
                      </template>
                    </el-table-column>
                <el-table-column prop="wip" :label="$t('label.label1_52')"  min-width="200">
                    </el-table-column>
                    <el-table-column prop="wipLine" :label="$t('label.label1_54')"  min-width="200">
                    </el-table-column>
                 <el-table-column prop="dealerAccount" :label="$t('label.label1_67')" min-width="200" >
                    </el-table-column>
                    <el-table-column prop="route" :label="$t('label.label1_50')" min-width="150">
                    </el-table-column>
                     <el-table-column prop="subRoute" :label="$t('label.label2_08')"  min-width="150">
                    </el-table-column>
                    <el-table-column prop="partDesc" :label="$t('label.label2_26')"  min-width="200">
                    </el-table-column>
                    <el-table-column prop="custName" :label="$t('label.label1_68')"  min-width="200">
                    </el-table-column>
                    <el-table-column prop="orderType" :label="$t('label.label1_51')" min-width="150">
                    </el-table-column>
                    <el-table-column prop="errorCode" :label="$t('label.label2_27')"  min-width="200">
                      <template slot-scope="scope" width="100%">
                          {{$Enum.getEnumSelectByValue(PICK_BIN_ERROR_CODE,scope.row.errorCode)}}
                    </template>
                    </el-table-column>
                    
    </el-table>
 <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange" :current-page.sync="search.currentPage" :page-size="pageSize" :page-sizes="[pageSize]" layout="total, sizes, prev, pager, next, jumper" :total="totalRows">
  </el-pagination>
  </div>
</template>
<script>
import axios from '../../../util/http'
import dateFormat from '../../../util/date'

export default {
  data () {
    return {
      axios,
      dateFormat,
      tableLoading: false,
      search:{
        startTime: '',
        endTime:'',
        orderType:'',
        currentPage:1
      },
      PICK_BIN_ERROR_CODE:[],
      totalRows: -1,
      pageSize: -1,
      tableData: []
    }
  },
  mounted () {
    this.getSelectValues()
  },
  methods: { 
    getDate(data, flag) {
      return this.dateFormat(data, flag)
    },
    getSelectValues() {
      let Enum = this.$Enum.EnumSelect()
      this.Y_N_STATUS = Enum.Y_N_STATUS
      this.axios.get('common/enum/selectEnumList', {
        params: 'test'
      }).then((res) => {
        if (res.errCode === 'S') {
          res.data.result.map(item => {
            if (item.lookupType === 'PICK_BIN_ERROR_CODE') {
              item.value = item.lookupValueNum
              item.label = item.meaning || item.item.lookupValueNum
              this.PICK_BIN_ERROR_CODE.push(item)
            }
            return item
          })
        }
        this.loadData()
      })
    },
    restData(){
        this.search.startTime = ''
        this.search.endTime  = ''
        this.search.orderType = ''
    },
    loadData () {
      this.tableLoading = true
      let that = this
      this.axios.get('binningManage/pickRecord/selectPickErrorWavedIdList', {
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
      this.loadData()
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
