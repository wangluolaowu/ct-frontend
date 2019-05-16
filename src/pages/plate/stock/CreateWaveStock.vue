<template>
<div class="">
    <el-row>
        <el-col :span="23" class="main">
            <div class="grid-content bg-purple-dark">
            <el-form  label-width="150px" class="demo-form-inline">
              <el-row>
                <el-col :span="8">
              <el-form-item >
                    <el-tooltip class="item" effect="dark" :content="$t('message.msg1_57')"  placement="bottom">
                        <el-button icon="yx-download3" @click="SetDownloadFunc">{{$t('message.msg1_58')}}</el-button>
                    </el-tooltip>
              </el-form-item>
                </el-col>
                <el-col :span="8">
              <el-form-item>
             <el-upload
                class="upload-demo"
                action=""
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :before-upload="beforeUpload"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                 <el-tooltip class="item" effect="dark" :content="$t('message.msg1_59')" placement="bottom">
                        <el-button size="small" icon="yx-download3">{{$t('message.msg1_60')}}</el-button>
                    </el-tooltip>
                <span slot="tip" class="el-upload__tip"></span>
              </el-upload>
              </el-form-item>
              </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                 <el-form-item :label="$t('label.label1_83')">
                 <el-input v-model="search.locNum" style="width:200px"></el-input>
                </el-form-item>
                </el-col>
                 <el-col :span="8">
                 <el-form-item :label="$t('label.label1_90')">
                 <el-input v-model="search.noOfCount" style="width:200px"></el-input>
                </el-form-item>
                 </el-col>
              </el-row>
               <el-row>
                <el-col :span="8">
                 <el-form-item :label="$t('label.label1_70')">
                 <el-input v-model="search.skuNum" style="width:200px"></el-input>
                </el-form-item>
                 </el-col>
                  <el-col :span="8">
                 <el-form-item  :label="$t('label.label1_91')">
                 <el-input v-model="search.rfdcUserId" style="width:200px"></el-input>
                </el-form-item>
                   </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                 <el-form-item :label="$t('label.label1_92')">
                 <el-input v-model="search.page" style="width:200px"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8">  
            <el-form-item  :label="$t('label.label1_56')">
              <el-select  v-model="search.pageSize" style="width:200px">
                <el-option
                v-for="item in $Enum.EnumSelect().page_size"
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
                  <el-col :span="8">
           <el-form-item  :label="$t('label.label2_13')">
              <el-date-picker
                v-model="search.startTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
            </el-col>
             <el-col :span="8">
            <el-form-item :label="$t('label.label2_14')" >
              <el-date-picker
                v-model="search.endTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                 @change="handleChangeTime"
                 style="width:200px"
              ></el-date-picker>
            </el-form-item>
             </el-col>
               </el-row>
               <el-row>
                  <el-col :span="8">
                  <el-form-item >
                    <el-button type="primary" @click="confirm">{{$t('message.msg1_28')}}</el-button>
                    <el-button :type="cancelIsDisabledButton" :disabled = "cancelIsDisabled" @click="cancel">{{$t('message.msg1_30')}}</el-button>
                  </el-form-item>
                 </el-col>
                  <el-col :span="12" >
                    <el-form-item>
                       <el-checkbox v-model="search.submitAll"  @change="handleCheckAllChange">{{$t('message.msg1_33')}}</el-checkbox>
                       <el-button :type="submitIsDisabledButton" @click="submit" :disabled = "submitIsDisabled" >{{$t('message.msg1_34')}}</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
               </el-form>
                <el-table ref="multipleTable" :data="tableData"  :row-class-name="tableRowClassName" style="width: 99.99%" border @selection-change="handleSelectionChange" v-loading="tableLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.5)">
                    <el-table-column type="selection" min-width="55">
                    </el-table-column>
                    <el-table-column prop="locNum" :label="$t('label.label1_83') " min-width="200">
                    </el-table-column>
                    <el-table-column prop="skuNum"  :label="$t('label.label1_70')"  min-width="200">
                    </el-table-column>
                    <el-table-column prop="page" :label="$t('label.label1_92')"  min-width="100"> 
                    </el-table-column>
                    <el-table-column prop="binQty" :label="$t('label.label1_93')"  min-width="100">
                    </el-table-column>
                    <el-table-column prop="noOfCount" :label="$t('label.label1_90')"  min-width="100">
                    </el-table-column>
                     <el-table-column prop="countBy" :label="$t('label.label1_94')" min-width="100">
                    </el-table-column>
                     <el-table-column prop="rfdcUserId"  :label="$t('label.label1_91')" min-width="100">
                    </el-table-column>
                    <el-table-column prop="creationDate"  :label="$t('label.label1_72')" min-width="200">
                      <template slot-scope="scope">
                         {{$DateFormat.dateFormat(scope.row.creationDate,true)}}
                     </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange" :current-page.sync="search.currentPage" :page-size="search.pageSize" :page-sizes="[search.pageSize]" layout="total, sizes, prev, pager, next, jumper" :total="totalRows">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
    <!-- 弹层start -->
    <el-dialog :title="$t('message.msg1_35')" :visible.sync="isShowDialog" width="90%" @close='closeConfirmReject'>
        <!-- 搜索区域 -->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="info" @click="showConfirmDialog">{{$t('message.msg1_30')}}</el-button>
                <el-button type="primary" @click="confirmAssign">{{$t('message.msg1_35')}}</el-button>
            </el-form-item>
        </el-form>
        <el-row >
             <el-table ref="multipleTableDialog" :data="tableDataDialog" tooltip-effect="dark" style="width: 100%" border>
                    <el-table-column prop="RFDCUSERID" :label="$t('label.label1_91')">
                    </el-table-column>
                    <el-table-column prop="COUNTBY"  :label="$t('label.label4_02')">
                    </el-table-column>
                    <el-table-column prop="SKUNUM" :label="$t('label.label4_03')">
                    </el-table-column>
                    <el-table-column prop="BINQTY"  :label="$t('label.label4_04')">
                    </el-table-column>
                    <el-table-column prop="PAGE"  :label="$t('label.label4_05')">
                    </el-table-column>
                </el-table>
                <el-pagination v-if="totalRowsDialog>0" class="pagination" background @current-change="handleCurrentChangeDialog" :current-page.sync="currentPageDialog" :page-size="pageSizeDialog" :page-sizes="[pageSizeDialog]" layout="total, sizes, prev, pager, next, jumper" :total="totalRowsDialog">
                </el-pagination>
        </el-row>
        </el-dialog>
        <el-dialog width="30%" :title="$t('message.msg1_41')" :visible.sync="isShowInnerConfirmDialog"  append-to-body>
            <p class="dialog-text">{{$t('message.msg1_42')}}</p>
            <el-button @click="isShowInnerConfirmDialog = false">{{$t('message.msg1_30')}}</el-button>
            <el-button type="primary" @click="confirmReject">{{$t('message.msg1_28')}}</el-button>
        </el-dialog>
        <el-dialog width="30%" :title="$t('message.msg1_43')" :visible.sync="isShowOkDialog" append-to-body>
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
      cancelIsDisabledButton:'info',
      submitIsDisabledButton:'info',
      search: {
        locNum: '',
        noOfCount: '',
        skuNum: '',
        rfdcUserId: '',
        page: '',
        startTime: '',
        endTime: '',
        currentPage: 1,
        pageSize:200,
        submitAll: false
      },
      tableLoading: false,
      tableLoadingDialog: false,
      isShowDialog: false,
      submitIsDisabled: true,
      cancelIsDisabled: true,
      totalRows: -1,
      currentPageDialog: 1,
      totalRowsDialog: -1,
      pageSizeDialog: -1,
      tableData: [],
      tableDataDialog: [],
      multipleSelection: [],
      id: '', // 点提交后服务器分配的id
      isShowInnerConfirmDialog: false,
      isShowOkDialog: false,
      scope: [],
      sendStr: [],
      updateOk: false,
      deleteOk: false,
      fileList: []
    }
  },
  created: function () {
    this.getTableData()
  },
  methods: {
    handleChangeTime() {

    },
     // 下载excel模板
    SetDownloadFunc () {
      this.axios.post('stock/createWave/downloadExcelTemplate', {}).then(res => {
        if (res.errCode === 'S') {
          window.location.href = res.data.result
        } else {
          this.$message.warning('文件下载失败')
        }
      })
    },
    tableRowClassName({row, rowIndex}) {
        if (row.skuNumValidate && row.skuNumValidate === true && row.locNumValidate === true) {
          return ''
        } 
        return 'warning-row'
      },
    beforeUpload (file, fileList) {
      let fd = new FormData()
      fd.append('file', file)
      this.axios.post('stock/createWave/reportExcelTemplate', fd).then(res => {
        if (res.errCode === 'S') {
          this.search.currentPage = 1
          this.getTableData()
          this.$message.warning('文件导入成功')
        } else {
          this.$message.warning('文件导入失败')
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSelectionChange (val) {
      let arr = []
      val.map(item => {
        arr.push(item)
      })
      this.sendStr = arr
      console.log(this.sendStr)
      if (arr.length > 0 || this.submitAll) {
        this.cancelIsDisabled = false
        this.submitIsDisabled = false
        this.cancelIsDisabledButton = 'primary'
        this.submitIsDisabledButton = 'primary'
      } else {
        this.cancelIsDisabled = true
        this.submitIsDisabled = true
        this.cancelIsDisabledButton = 'info'
        this.submitIsDisabledButton = 'info'
      }
    }, // 关闭弹层
    closeConfirmReject () {
      if (!this.deleteOk && !this.updateOk) {
        this.confirmReject()
        this.deleteOk = false
        this.updateOk = false
      }
    },
    // 弹层上操作
    showConfirmDialog: function () {
      this.isShowInnerConfirmDialog = true
    }, // 全部打回
    confirmReject: function () {
      this.axios.get('stock/createWave/deleteStockInfoList', {
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
          this.handleCheckAllChange (false) 
          this.search.currentPage = 1
          this.getTableData()
        }
      })
    }, // 确认分配ok
    confirmShowOkDialog () {
      this.updateOk = true
      this.isShowOkDialog = false
      this.isShowDialog = false
      this.search.currentPage = 1
      this.handleCheckAllChange (false) 
      this.getTableData()
    },
    confirmAssign () {
      let dataResult = {}
      dataResult.orderWaveId = this.id
      this.axios.post('stock/createWave/updateStockInfoList', qs.stringify(dataResult)).then(res => {
        if (res.errCode === 'S') {
          console.log(res.data.result)
          this.isShowOkDialog = true // 弹出层 分配成功
        }
      })
    }, // 确认创建波次
    submitSelect () {
      this.axios.get('stock/createWave/selectStockInfoList', {
        params: {
          orderWaveId: this.id,
          orderType: this.search.orderType
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          this.tableDataDialog = res.data.result
          this.deleteOk = false
          this.updateOk = false
          this.isShowDialog = true
        }
        this.submitIsDisabled = false
        this.tableLoading = false
      })
    },
    submit () {
      this.submitIsDisabled = true
      this.cancelIsDisabledButton = 'info'
      this.submitIsDisabledButton = 'info'
      this.tableLoading = true
      let dataResult = {}   
      dataResult.submitAll = this.search.submitAll
      dataResult.orderType = this.search.orderType
      dataResult.result = JSON.stringify(this.sendStr)
      dataResult.search = JSON.stringify(this.search)
      this.axios.post('stock/createWave/createWaveId', qs.stringify(dataResult)).then((res) => {
        if (res.errCode === 'S') {
          this.id = res.data.orderWaveId
          this.tableDataDialog = res.data.result
          this.deleteOk = false
          this.updateOk = false
          this.isShowDialog = true
          this.submitIsDisabled = false
          this.cancelIsDisabledButton = 'primary'
          this.submitIsDisabledButton = 'primary'
          this.tableLoading = false
        } else {
          this.submitIsDisabled = false
          this.tableLoading = false
          this.cancelIsDisabledButton = 'primary'
          this.submitIsDisabledButton = 'primary'
          this.$message.warning('提交失败')
          this.handleCheckAllChange (false) 
          this.getTableData()
        }
      })
    }, // 点击是否全部提交
    handleCheckAllChange (e) {
      this.search.submitAll = e
      if (e || this.sendStr.length > 0) {
        this.cancelIsDisabled = false
        this.submitIsDisabled = false
        this.cancelIsDisabledButton = 'primary'
        this.submitIsDisabledButton = 'primary'
      } else {
        this.cancelIsDisabled = true
        this.submitIsDisabled = true
        this.cancelIsDisabledButton = 'info'
        this.submitIsDisabledButton = 'info'
      }
    },
    confirm: function () {
      this.search.currentPage = 1
      this.getTableData()
    },
    cancel: function () {
      this.$refs.multipleTable.clearSelection()
    },
    handleTabClick: function (tab, event) {
      this.initParams()
      this.getTableData()
    },
    initParams () {
      this.search.locNum = ''
      this.search.noOfCount = ''
      this.search.skuNum = ''
      this.search.rfdcUserId = ''
      this.search.page = ''
      this.search.startTime = ''
      this.search.endTime = ''
      this.search.currentPage = 1
    },
    getTableData () { // 创建波次查询列表
      this.tableLoading = true
      let that = this
      this.axios.get('stock/createWave/selectMainStockInfoList', {
        params: that.search
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData = res.data.result
          that.totalRows = res.data.totalRows
        }
          this.tableLoading = false
      })
    
    },
    getTableDataDialog () { // 创建波次查询列表
      let that = this
      this.axios.get('stock/createWave/selectStockInfoList', {
        params: {
          currentPage: that.search.currentPage,
          orderWaveId: this.id
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableDataDialog = res.data.result
          that.totalRowsDialog = res.data.totalRows
          that.pageSizeDialog = res.data.pageSize
        }
      })
    },
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.getTableData()
    },
    handleCurrentChangeDialog (val) {
      this.search.currentPage = val
      this.getTableDataDialog()
    }
  }
}
</script>


<style>
  .drag-item {border:1px solid #ddd ; background: #f9f9f9; padding: 10px; margin-top: 10px; cursor: pointer;}
  .gray {background: #026780; color: #ffffff;}
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .formBtn .el-form-item__content{
    margin-left:80px!important;
  }
  .formGroupBtn .el-form-item__content{
    margin-left:0px!important;
  }
</style>

