<template>
<div class="">
    <el-row>
        <el-col :span="23" class="main">
            <div class="grid-content bg-purple-dark">
            <el-form class="demo-form-inline">
              <el-row>
                <el-col :span="5">
              <el-form-item >
                    <el-tooltip class="item" effect="dark" :content="$t('message.msg1_57')" placement="bottom">
                        <el-button icon="yx-download3" @click="SetDownloadFunc">{{$t('message.msg1_58')}} </el-button>
                    </el-tooltip>
              </el-form-item>
                </el-col>
                <el-col :span="5">
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
                  <el-col :span="5">
                <el-form-item>
                      <el-button :type="submitIsDisabledButton" :disabled = "submitIsDisabled" @click="submit">{{$t('message.msg1_34')}}</el-button>
                </el-form-item>
                  </el-col>
                    <el-col :span="5">
                <el-form-item>
                      <el-button :type="cancelIsDisabledButton" :disabled = "cancelIsDisabled" @click="cancel">{{$t('message.msg1_30')}}</el-button>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                 <el-card style="min-height: 20px">          
                   <span>{{$t('message.msg1_61') + ':'+tableTotalRows}}</span>
                   <span>{{$t('message.msg1_62') + ':'+tableSelectRows}}</span>
                 </el-card>
               </el-row>
               </el-form>
               
                <el-table ref="multipleTable" :data="tableData" :row-class-name="tableRowClassName" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange" v-loading="tableLoading">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="locNum" :label="$t('label.label4_01')">
                    </el-table-column>
                    <el-table-column prop="skuNum" :label="$t('label.label1_70')">
                    </el-table-column>
                    <el-table-column prop="skuName" :label="$t('label.label1_78')">
                    </el-table-column>
                    <el-table-column prop="skuQty" :label="$t('label.label1_80')" width="100">
                    </el-table-column>
                    <el-table-column prop="creationDate" :label="$t('label.label1_72')">
                      <template slot-scope="scope">
                         {{$DateFormat.dateFormat(scope.row.creationDate,true)}}
                     </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange" :current-page.sync="search.currentPage" :page-size="pageSize" :page-sizes="[pageSize]" layout="total, sizes, prev, pager, next, jumper" :total="totalRows">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
    <!-- 弹层start -->
    <el-dialog :title="$t('message.msg1_35')" :visible.sync="isShowDialog" width="90%" @close='closeConfirmReject'>
        <!-- 搜索区域 -->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item :label="$t('label.label2_11')">
                <template>
                        {{dialog.systemReason || '无'}}
                </template>
            </el-form-item>
            <el-form-item :label="$t('label.label2_12')">
                <el-input type="textarea" :rows="2"  v-model="dialog.manualReason">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="showConfirmDialog">{{$t('message.msg1_30')}}</el-button>
                <el-button type="primary" @click="confirmAssign">{{$t('message.msg1_35')}}</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10">
          <el-col :span="4" v-for="(item, i) in this.dialogTableData" :key="i">
            <el-card style="min-height: 520px">
              <ul class="station-info" style="min-height: 80px">
                  <li>
                      <label for="">{{$t('message.msg1_36')}}</label><span>{{'&#12288;' +item.wsid}}</span>
                  </li>
                  <li>
                      <label for="">{{$t('message.msg1_37')}}</label><span>{{'&#12288;' +item.orderListCount}}</span>
                  </li>
              </ul>
              <transition-group>            
                <draggable v-model="item.result" :options="{group:'people', animation: 300}" @start="startItem" @end="endItem" @change="changeItem" :key="i">
                    <el-row
                      class="drag-item"
                      :class="{gray: element.isChange}"
                      v-for="(element, index) in item.result"
                      :key="index">
                      <el-col :span="6"> <div style="margin-top:3px">{{index + 1}}、</div></el-col>
                      <el-col :span="18" style="line-height:1.7">
                        <div>{{ $t('message.msg1_63') + ': ' + (element.holderCou  || '') }}</div>
                        <div>{{ $t('message.msg1_64') + ': ' + (element.locCou || '') }}</div>                        
                      </el-col>
                    </el-row>
                </draggable>
              </transition-group>
            </el-card>        
          </el-col>
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
      submitIsDisabledButton:'info',
      cancelIsDisabledButton:'info',
      drag: false,
      search: { // 查询参数
        orderType: 'RELOC',
        ispDealer: '',
        ictDealer: '',
        currentPage: 1,
        submitAll: false
      },
      tableLoading: false,
      isShowDialog: false,
      submitIsDisabled: true,
      cancelIsDisabled: true,
      totalRows: -1,
      pageSize: -1,
      tableData: [],
      dialogTableData: [],
      dialogTableDataExit: [],
      multipleSelection: [],
      dialog: {
        systemReason: '',
        manualReason: ''
      },
      id: '', // 点提交后服务器分配的id
      isShowInnerConfirmDialog: false,
      isShowOkDialog: false,
      scope: [],
      sendStr: [],
      updateOk: false,
      deleteOk: false,
      fileList: [],
      tableTotalRows:'0',
      tableSelectRows:'0'
    }
  },
  created: function () {
    this.getTableData()
  },
  methods: { // 下载excel模板
    SetDownloadFunc () {
      this.axios.post('reloc/createWave/downloadExcelTemplate', {}).then(res => {
        if (res.errCode === 'S') {
          window.location.href = res.data.result
        } else {
          this.$message.warning('文件下载失败')
        }
      })
    },
    tableRowClassName({row, rowIndex}) {
        if (row.locNumValidate && row.locNumValidate === true) {
          return ''
        } 
        return 'warning-row'
      },
    beforeUpload (file, fileList) {
      this.tableLoading = true
      let fd = new FormData()
      fd.append('file', file)
      this.axios.post('reloc/createWave/reportExcelTemplate', fd).then(res => {
        if (res.errCode === 'S') {
          this.getTableData()
          this.$message.warning('文件导入成功')
        } else {
          this.$message.warning('文件导入失败,'+res.errMsg)
        }
        this.tableLoading = false
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
      this.tableSelectRows = this.sendStr.length
      console.log(this.sendStr)
      if (arr.length > 0) {
        this.cancelIsDisabled = false
        this.submitIsDisabled = false
        this.submitIsDisabledButton = 'primary'
        this.cancelIsDisabledButton = 'primary'
      } else {
        this.cancelIsDisabled = true
        this.submitIsDisabled = true
        this.submitIsDisabledButton = 'info'
        this.cancelIsDisabledButton = 'info'
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
      this.axios.get('reloc/createWave/deleteRelocInfoList', {
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
          this.getTableData()
        }
      })
    }, // 确认分配ok
    confirmShowOkDialog () {
      this.updateOk = true
      this.isShowOkDialog = false
      this.isShowDialog = false
      this.tableTotalRows = 0
      this.tableSelectRows = 0
      this.getTableData()
      
    },
    confirmAssign () {
      let dataResult = {}
      let result = []
      this.dialogTableData.map((list, i) => {
        let wsid = list.wsid
        let newWsid = list.newWsid
        let newList = list.result.map((item, j) => {
          item.wsId = wsid
          item.newWsId = newWsid
          item.priorityNum = j + 1
          return item
        })
        result = result.concat(newList)
      })
      //console.log('result===========' + JSON.stringify(this.dialogTableData))
      dataResult.result = JSON.stringify(result)
      dataResult.reason = JSON.stringify(this.dialog)
      dataResult.orderWaveId = this.id
      this.axios.post('reloc/createWave/updateRelocInfoList', qs.stringify(dataResult)).then(res => {
        if (res.errCode === 'S') {
          console.log(res.data.result)
          this.isShowOkDialog = true // 弹出层 分配成功
        }
      })
    }, // 确认创建波次
    submitSelect () {
      this.axios.get('reloc/createWave/selectRelocInfoList', {
        params: {
          orderWaveId: this.id,
          orderType: this.search.orderType
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          this.dialogTableData = res.data.result.map(item => {
            if (!item.result) {
              item.result = []
            }
            return item
          })
          this.deleteOk = false
          this.updateOk = false
          this.isShowDialog = true
          this.$message.warning('提交成功')
        }
        this.submitIsDisabled = false
        this.submitIsDisabledButton = 'primary'
        this.cancelIsDisabledButton = 'primary'
        this.tableLoading = false
      })
    },
    submit () {
      this.submitIsDisabled = true
      this.submitIsDisabledButton = 'info'
      this.cancelIsDisabledButton = 'info'
      this.tableLoading = true
      let dataResult = {}
      //console.log('JSON.stringify(this.sendStr)==========' + JSON.stringify(this.sendStr))
      dataResult.result = JSON.stringify(this.sendStr)
      dataResult.submitAll = this.search.submitAll
      dataResult.orderType = this.search.orderType
      dataResult.idList = ''
      dataResult.search = JSON.stringify(this.search)
      this.axios.post('reloc/createWave/createWaveId', qs.stringify(dataResult)).then((res) => {
        if (res.errCode === 'S') {
          this.id = res.data.orderWaveId
          this.dialogTableData = res.data.result.map(item => {
            if (!item.result) {
              item.result = []
            }
            return item
          })
          this.deleteOk = false
          this.updateOk = false
          this.isShowDialog = true
          this.$message.warning('提交成功')
          this.submitIsDisabled = false
          this.submitIsDisabledButton = 'primary'
          this.cancelIsDisabledButton = 'primary'
          this.tableLoading = false
        } else {
          this.submitIsDisabled = false
          this.submitIsDisabledButton = 'primary'
          this.cancelIsDisabledButton = 'primary'
          this.tableLoading = false
          this.$message.warning('提交失败')
          this.tableTotalRows = 0
          this.tableSelectRows = 0
          this.getTableData()
        }
      })
    }, // 点击是否全部提交
    handleCheckAllChange (e) {
      this.search.submitAll = e
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
      this.search.ispDealer = ''
      this.search.ictDealer = ''
      this.search.currentPage = 1
    },
    getTableData () { // 创建波次查询列表
      let that = this
      let dataResult = {}
      dataResult.params = JSON.stringify(this.search)
      this.axios.post('reloc/createWave/selectMainRelocInfoList', qs.stringify(dataResult)).then((res) => {
      // this.axios.get('reloc/createWave/selectMainRelocInfoList', {params: this.search}).then((res) => {
        if (res.errCode === 'S') {
          that.tableData = res.data.result
          this.tableTotalRows = that.tableData.length
        }
      })
      this.dialog.systemReason = ''
      this.dialog.manualReason = ''
    },
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.getTableData()
    },
    changeItem (val) {
      console.log(val)
      console.log(this)
      if (val.added) {
        this.$set(val.added.element, 'isChange', true)
      }
      if (val.moved) {
        this.$set(val.moved.element, 'isChange', true)
      }
    },
    startItem (val) {
      this.drag = true
    },
    endItem (val) {
      this.drag = false
      this.dialogTableData.map((list, i) => {
        let orderCount = 0
        list.result.map((item, j) => {
          orderCount = Number(item.lineCou) + Number(orderCount)
          return item
        })
        list.orderListCount = Number(orderCount)
      })
    }
  },
  mounted () {
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  components: {
    draggable
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
</style>

