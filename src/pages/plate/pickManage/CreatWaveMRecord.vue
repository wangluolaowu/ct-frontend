<template>
  <div id="mainContainer">
    <el-row>
      <el-col :span="23" class="main">
        <div class="grid-content bg-purple-dark">
          <el-tabs v-model="search.orderType" @tab-click="handleTabClick">
            <el-tab-pane :label="$t('label.label2_01')" name="S"></el-tab-pane>
            <el-tab-pane :label="$t('label.label2_02')" name="V"></el-tab-pane>
          </el-tabs>
          <!-- 搜索区域 -->
          <el-form :inline="true" class="demo-form-inline">
            <el-row :span="24">
              <el-col :span="8">
                <el-form-item :label="$t('label.label2_13')" prop>
                  <el-date-picker
                  v-model="search.startTime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  @change="handleChangeTime"
                ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.label2_14')" prop>
                  <el-date-picker
                    v-model="search.endTime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                     @change="handleChangeTime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item>
                  <el-button type="primary" @click="confirm">{{$t('message.msg1_28')}}</el-button>
                  <el-button type="info" @click="cancel">{{$t('message.msg1_29')}}</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            
          </el-form>


           <!-- 弹层start -->
    <div>
       <el-row v-for="(tableDataItem, j) in this.dialogTableData" :key="j" width="100%">
         <div>
           <label>
           <span style="line-height:3">{{$t('message.msg1_45') + ': ' + (tableDataItem[0].orderWaveId || '') }}</span>
           <span style="line-height:3">{{$t('message.msg1_46') + ': ' + $DateFormat.dateFormat(tableDataItem[0].creatDate,true) }}</span>
           </label>
           </div>
        <el-row :gutter="10">
          <el-col :span="4" v-for="(item, i) in tableDataItem" :key="i">
            <el-card style="min-height: 520px">
              <ul class="station-info">
                  <li>
                      <label for="">{{$t('message.msg1_36')}}</label><span>{{i + 1}}</span>
                  </li>
                  <li>
                      <label for="">{{$t('message.msg1_37')}}</label><span>{{item.orderListCount || ''}}</span>
                  </li>
                  <li>
                      <label for="">{{$t('message.msg1_39')}}</label><span>{{item.forecastWallCount || ''}}</span>
                  </li>
              </ul>
              <transition-group>            
                <draggable v-model="item.result" :options="{group:'people', animation: 300,disabled:true}"  :key="i">
                    <el-row
                      class="drag-item"
                      :class="{gray: element.isChange}"
                      v-for="(element, index) in item.result"
                      :key="index">
                      <el-col :span="6"> <div style="margin-top:3px">{{index + 1}}、</div></el-col>
                      <el-col :span="18" style="line-height:1.7">
                        <div>{{ 'route: ' + (element.route  || '') }}</div>
                        <div>{{ 'dealer: ' + (element.dealerCou  || '') }}</div>
                        <div>{{  $t('message.msg1_40') +': ' + (element.orderLineCou || '') }}</div>                        
                      </el-col>
                    </el-row>
                </draggable>
              </transition-group>
            </el-card>        
          </el-col>
        </el-row>
       </el-row>
        </div>
    <!-- 弹层end -->
        <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange" :current-page.sync="search.currentPage" :page-size="pageSize" :page-sizes="[pageSize]" layout="total, sizes, prev, pager, next, jumper" :total="totalRows">
        </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from '../../../util/http'
import draggable from 'vuedraggable'

export default {
  data() {
    return {
      axios,
      draggable, 
      closeIsDisabled: false,
      openIsDisabled: false,
      search: { // 查询参数
        orderType: 'S',
        startTime: '',
        endTime: '',
        currentPage: 1
      },
      totalRows: -1,
      pageSize: 5,
      dialogTableData: []
    }
  },
  mounted() {
    this.confirm()
  },
  methods: {
    // 单分页
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.confirm()
    },
    cancel() {//点击清空时应执行的操作
      this.startTime = ''
      this.endTime = ''
    },handleTabClick: function (tab, event) {
      this.initParams()
      this.confirm()
    },
    initParams () {
      this.search.ispDealer = ''
      this.search.ictDealer = ''
      this.search.currentPage = 1
    },
    handleChangeTime(){//点查找按钮
      let that = this;
      let startTime = that.startTime;
      let endTime = that.endTime;
      //判断时间
      if(startTime > endTime){
        return false;
      }
    },
    confirm() { // 获取波次号列表以及对应波次号信息
      let that = this
      this.axios.get('binningManage/pickRecord/selectPickRecordWavedIdList', {
        params: that.search
      }).then((res) => {
        if (res.errCode === 'S') {
          that.dialogTableData = res.data.result
          that.totalRows = res.data.totalRows
          that.pageSize = res.data.pageSize
        }
      })
    },
    // 分页器
    currentchange(currentPage) {
      console.log(currentPage)
      this.search.currentPage = currentPage
      this.getTableData()
    }
  },
  components: {
    draggable
  }
}
</script>
<style lang="less" scoped>
  .WorkstationBox {
    overflow:auto;
    white-space: nowrap;
  }
  .Workstation {
    box-shadow: 1px 1px 5px #888888;
    margin: 10px;
    width: 300px;
    display: inline-table;
    vertical-align: top;
  }
  .activated {
    color: dimgrey;
  }
  .drag-item {
    border:1px solid #ddd ;
    background: #f9f9f9;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  #mainContainer .el-form{
    margin: 15px auto;
  }
  #groupBtn .el-button{
    display: inline-block;
    width: 80px;
    height: 40px;
    margin-right: 15px;
  }
  .gray {
    background: #026780;
    color: #ffffff;
  }
</style>
<style>
  .pagination{
    text-align: right;
  }

</style>
