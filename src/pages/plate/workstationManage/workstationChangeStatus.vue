
<template>
  <div class="tableDate">
    <div class="button" style="width:8%;float:right;">
      <p><el-button type="el-icon-minus" :disabled="submitDisabled" @click.prevent="submit">{{$t('message.msg1_34')}}</el-button></p>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        ref="table"
        tooltip-effect="dark"
        border
        stripe
        style="width: 85%"
        @selection-change='selectRow'>
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column  :label="$t('label.label1_86')" type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="entityWorkstationId" :label="$t('label.label7_02')">
          <template slot-scope="scope">
            {{scope.row.entityWorkstationId}}
          </template>
        </el-table-column>
        <el-table-column prop="entityWorkstationStatus"  :label="$t('label.label1_24')" align="center">
          <template slot-scope="scope">
               <el-select  v-model="scope.row.entityWorkstationStatus">
                <el-option
                v-for="item in $Enum.EnumSelect().openStatus4"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
                > 
              </el-option>
           </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
 
<script>
  import axios from '../../../util/http'
  import qs from 'qs'

  export default {
    data () {
      return {
          axios,
          qs,
          tableData:[],
          submitDisabled:true
      }
    },
    mounted () {
      this.loadData()
    },
    methods: {
      confirm(){
          this.dialogVisibleStart = false
      },
      loadData(){
          let param = {'params': 'test'}
          axios.post('/workstationManage/changeStatus/selectWorkStationList', qs.stringify(param)).then((res) => {
            if(res.errCode === 'S'){
              var _data = res.data.result
              this.tableData = _data
            }
          })
      },  
      submit(){
        let resultData = {}
        resultData.result=JSON.stringify(this.selectlistRow)
        this.axios.post('workstationManage/changeStatus/updateStatus', qs.stringify(resultData)).then(res => {
         if (res.errCode === 'S') {
            this.$message({type: 'info', message: '提交成功'})
         }else{
             this.$message({type: 'info', message: '提交失败,'+res.errMsg})
         }
         this.loadData()
       })
      },  
      // 获取表格选中时的数据
      selectRow (val) { 
        this.selectlistRow = val
        if(this.selectlistRow.length > 0){
            this.submitDisabled=false
        }else{
            this.submitDisabled=true
        }
      }
    }
  }
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>