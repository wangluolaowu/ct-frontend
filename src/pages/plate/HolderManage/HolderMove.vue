
<template>
  <div class="tableDate mainContainer">
    <div class="button" style="width:3%;float:right;">
      <P><el-button class="el-icon-plus" @click.prevent="addRow()"></el-button></P>
      <p><el-button class="el-icon-minus" @click.prevent="delData()"></el-button></p>
      <p><el-button type="el-icon-minus" :disabled="submitDisabled" @click.prevent="submit">提交</el-button></p>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        ref="table"
        tooltip-effect="dark"
        border
        stripe
        style="width: 95%"
        @selection-change='selectRow'>
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column label="序号"  type="index" width="60" align="center"></el-table-column>
        <el-table-column  label="机器人编码" align="center">
          <template slot-scope="scope">
               <el-select placeholder="机器人编码" v-model="scope.row.pi_kid_id">
                <el-option
                v-for="item in PI_KID_ID"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
                > 
              </el-option>
           </el-select>
          </template>
        </el-table-column>
         <el-table-column  label="货架编码" align="center">
          <template slot-scope="scope">
               <el-select placeholder="货架编码" v-model="scope.row.pi_holder_id">
                <el-option
                v-for="item in PI_HOLDER_ID"
                :key="item.VALUE"
                :label="item.LABEL"
                :value="item.VALUE" 
                > 
              </el-option>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column label="动作类型">
          <template slot-scope="scope">
             <el-select placeholder="动作类型" v-model="scope.row.pi_release_load_flag">
               <el-option
                    v-for="item in $Enum.EnumSelect().TM_MOVE_TASK_RELEASE_LOAD"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" 
                    > 
              </el-option>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column label="目标位置X">
          <template slot-scope="scope">
            <el-input v-model="scope.row.pi_dest_pos_x"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="目标位置Y">
          <template slot-scope="scope">
            <el-input v-model="scope.row.pi_dest_pos_y"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
      title="提示"
      :visible.sync="dialogVisibleStart"
      width="40%" @close="confirm">
       <el-table
        :data="tableDataDialog"
        border
        :row-class-name="tableRowClassName"
        style="width: 95%" @close='confirm'>
         <el-table-column prop="pi_kid_id" label="机器人编码" align="center">
        </el-table-column>
         <el-table-column prop="pi_holder_id" label="货架编码" align="center">
           <template slot-scope="scope">
             {{$Enum.getEnumSelectByValue(PI_HOLDER_ID,scope.row.pi_holder_id)}}
          </template>
        </el-table-column>
        <el-table-column prop="isSucess" label="是否成功" align="center">
        </el-table-column>
        <el-table-column prop="po_retmsg" label="错误描述" align="center">
        </el-table-column>
       </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">确 定</el-button>
         </span>
    </el-dialog>
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
        tableData: [],
        selectlistRow: [],
        PI_KID_ID:[],
        submitDisabled:true,
        dialogVisibleStart:false,
        tableDataDialog:[],
        PI_HOLDER_ID:[]
      }
    },
    mounted () {
      this.getSelectValues()
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (row.isSucess === '否') {
          return 'warning-row'
        } 
        return 'success-row'
      },
      confirm(){
          this.tableData=[]
          this.addRow()
          this.dialogVisibleStart = false
      },
      submit(){
        let resultData = {}
        resultData.params=JSON.stringify(this.selectlistRow)
        this.axios.post('holderManage/holderMoveContr/holderMove', qs.stringify(resultData)).then(res => {
         if (res.errCode === 'S') {
            this.tableDataDialog = res.data.result
            this.dialogVisibleStart=true
         }else{
            this.dialogVisibleStart=true
         }
       })
      },  
      getSelectValues(){
       this.axios.get('robotManage/kidMoveContr/holdUpAndDown/selectKidsInfoList', {
        params: 'test'
       }).then((res) => {
        if (res.errCode === 'S') {
          this.PI_KID_ID=res.data.result
        }
       })
       this.axios.get('holderManage/holderMoveContr/selectPiHolderId', {
        params: 'test'
       }).then((res) => {
        if (res.errCode === 'S') {
          this.PI_HOLDER_ID=res.data.result
        }
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
      },
      // 增加行
      addRow () {
        var list = {
          rowNum: '',
          pi_kid_id: 0,
          pi_holder_id: this.pi_holder_id,
          pi_dest_pos_x: this.pi_dest_pos_x,
          pi_dest_pos_y: this.pi_dest_pos_y,
          pi_release_load_flag: this.pi_release_load_flag
          }
          this.tableData.unshift(list)
      },
      // 删除方法
      // 删除选中行
      delData () {
        for (let i = 0; i < this.selectlistRow.length; i++) {
          let val = this.selectlistRow
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
          // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          val.forEach((val, index) => {
            this.tableData.forEach((v, i) => {
              if (val.rowNum === v.rowNum) {
                // i 为选中的索引
                this.tableData.splice(i, 1)
              }
            })
          })
        }
        // 删除完数据之后清除勾选框
        this.$refs.tableData.clearSelection()
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