 <template>
     <div class="mainContainer">
          <!--工具条-->
      <el-tabs id="topTitle" v-model="searchBIN.applicationName" @tab-click="handleTabClick">
        <el-tab-pane label="ControlTower" name="ControlTower"></el-tab-pane>
        <el-tab-pane :label="$t('label.label11_14')" name="Workstation"></el-tab-pane>
        <el-tab-pane :label="$t('label.label11_15')" name="MapTools"></el-tab-pane>
      </el-tabs>
      <el-col :span="24" class="toolbar conMarginLeft" >
        <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item  :label="$t('label.label11_03')">
              <el-input v-model="searchBIN.userName" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item :label="$t('label.label11_05')" >
              <el-input v-model="searchBIN.actionPara" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item  :label="$t('label.label11_04')" >
              <el-input v-model="searchBIN.component" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item :label="$t('label.label1_56')">
             <el-select  v-model="searchBIN.pageSize" style="width:200px">
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
           <el-form-item  :label="$t('label.label11_01')">
               <template>
                  <div>
                    <el-date-picker
                    v-model="searchBIN.startTime"
                     @change="handleChangeTime1"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                   
                    </el-date-picker>
                </div>
               </template>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item  :label="$t('label.label11_02')">
               <template>
                  <div>
                    <el-date-picker
                    v-model="searchBIN.endTime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="handleChangeTime2"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                   
                    </el-date-picker>
                </div>
               </template>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="5" >
          <el-form-item >  
              <el-button type="primary" @click="loadData">{{$t('message.msg1_28')}}</el-button>
          </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
                <el-button type="primary" @click="restData">{{$t('message.msg1_29')}}</el-button>
            </el-form-item>
          </el-col>
           <el-col :span="5">
            <el-form-item>
                <el-button type="primary" @click="SetDownloadFunc">{{$t('message.msg1_27')}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
       </el-col>
         <el-table :data="userInfoList" style="width: 100%" border>
            <!--第二步  开始进行修改和查询操作-->
             <el-table-column :label="$t('message.msg1_53')" align="center" min-width="150">
                <template slot-scope="scope">
                     <el-button type="text" @click="checkDetail(scope.row)">{{$t('message.msg1_54')}}</el-button>
                  </template>
             </el-table-column>
            <el-table-column prop="startTimeString" :label="$t('label.label11_01')" min-width="200">
            </el-table-column>
             <el-table-column prop="duration" :label="$t('label.label11_16')" min-width="200">
            </el-table-column>
            <el-table-column prop="endTimeString" :label="$t('label.label11_02')" min-width="200">
            </el-table-column>
             <el-table-column prop="userName" :label="$t('label.label11_03')" min-width="200">
            </el-table-column>
            <el-table-column prop="component" :label="$t('label.label11_04')" min-width="200">
            </el-table-column>
             <el-table-column prop="action" :label="$t('label.label11_05')" min-width="200">
            </el-table-column>
             <el-table-column prop="ipAddress" :label="$t('label.label11_06')" min-width="200">
            </el-table-column>
             <el-table-column prop="clientEnv" :label="$t('label.label11_07')" min-width="200">
            </el-table-column>
             <!--编辑与增加的页面-->
         </el-table>
           <el-pagination v-if="searchBIN.totalRows>0" class="pagination" background @current-change="handleCurrentChangeBIN"
                        :current-page.sync="searchBIN.currentPage" :page-size="searchBIN.pageSize" :page-sizes="[searchBIN.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="searchBIN.totalRows">
          </el-pagination>
          <!--新增界面-->
         <el-dialog :title="$t('label.label11_08')" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData"  ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item  :label="$t('label.label11_09')">
                   <span></span>
                  </el-form-item>
                  <el-form-item>
                   <span>{{$t('label.label11_03')}} : {{addFormData.userName}}</span>
                  </el-form-item>
                  <el-form-item >
                   <span>{{$t('label.label11_06')}} : {{addFormData.ipAddress}}</span>
                  </el-form-item>
                  <el-form-item >
                   <span>{{$t('label.label11_07')}} : {{addFormData.clientEnv}}</span>
                  </el-form-item>
                  <el-form-item  :label="$t('label.label11_10')">
                   <span></span>
                  </el-form-item>
                  <el-form-item >
                   <span>{{$t('label.label11_04')}} : {{addFormData.component}}</span>
                  </el-form-item>
                   <el-form-item >
                   <span>{{$t('label.label11_05')}} : {{addFormData.action}}</span>
                  </el-form-item>
                  <el-form-item >
                   <span>{{$t('label.label11_01')}} : {{addFormData.startTimeString}}</span>
                  </el-form-item>
                  <el-form-item >
                   <span>{{$t('label.label11_16')}} : {{addFormData.duration}}</span>
                  </el-form-item>
                    <el-form-item >
                   <span>{{$t('label.label11_02')}} : {{addFormData.endTimeString}}</span>
                  </el-form-item>
                  <el-form-item > 
                   <span>{{$t('label.label11_11')}} : {{addFormData.argument}}</span>
                  </el-form-item>
                  <el-form-item  :label="$t('label.label11_12')">
                   <span></span>
                  </el-form-item>
                   <el-form-item >
                   <span>{{$t('label.label11_13')}} : {{addFormData.exceptionInfo}}</span>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">{{$t('message.msg1_28')}}</el-button>
             </span>
          </el-dialog>
     </div>
  </template>
  
  <script>
    import axios from '../../../util/http'
    import qs from 'qs'
    export default {
      name: 'home',
      data() {
        return {
          userInfoList: [],
          addFormReadOnly: true,
          dialogVisible: false,
          isView: true,
          addFormData: {
           userName:''
          },
          searchBIN:{
            applicationName:'ControlTower',
            userName:'',
            actionPara:'',
            component:'',
            startTime:'',
            endTime:'',
            startTimeBegin:'',
            startTimeEnd:'',
            endTimeBegin:'',
            endTimeEnd:'',
            currentPage:1,
            pageSize:50,
            totalRows:-1 
          }
        }
      },
  mounted: function () {
        this.loadData()
      },
      methods: {
        loadData() {
           let param = {'params': JSON.stringify(this.searchBIN)}
          axios.post('/auditManage/selectAuditListBySearch', qs.stringify(param)).then((res) => {
            if(res.errCode === 'S'){
               var _data = res.data.result
               this.userInfoList = _data
               this.searchBIN.totalRows = res.data.totalRows
            }else{
               this.userInfoList = null
               this.searchBIN.totalRows = 0
            }
          })
        },
        handleChangeTime1(date){
          if(date){
           this.searchBIN.startTimeBegin =  date[0]
           this.searchBIN.startTimeEnd =  date[1]
          }  
          
        },
        handleChangeTime2(date){
          if(date){
           this.searchBIN.endTimeBegin =  date[0]
           this.searchBIN.endTimeEnd =  date[1]
          } 
        },
        checkDetail(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = false
          this.dialogVisible = true
        },
        handleCurrentChangeBIN(val){
            this.searchBIN.currentPage = val;
            this.loadData()
        },
        handleTabClick: function (tab, event) {
          this.initParams()
          this.loadData()
        },
        initParams () {
          let applicationNameTemp = this.searchBIN.applicationName
          this.searchBIN = {
            userName:'',
            actionPara:'',
            component:'',
            startTime:'',
            endTime:'',
            startTimeBegin:'',
            startTimeEnd:'',
            endTimeBegin:'',
            endTimeEnd:'',
            applicationName:applicationNameTemp,
            currentPage:1,
            pageSize:50,
            totalRows:-1
          }
        },
        restData(){
          let currentPageTemp = this.searchBIN.currentPage
          let pageSizeTemp = this.searchBIN.pageSize
          let totalRowsTemp = this.searchBIN.totalRows
          let applicationNameTemp = this.searchBIN.applicationName
            this.searchBIN = {
              userName:'',
              actionPara:'',
              component:'',
              startTime:'',
              endTime:'',
              startTimeBegin:'',
              startTimeEnd:'',
              endTimeBegin:'',
              endTimeEnd:'',
              applicationName:applicationNameTemp,
             currentPage:currentPageTemp,
             pageSize:pageSizeTemp,
             totalRows:totalRowsTemp
          }
        }, 
        SetDownloadFunc (arg1) {
        let fileName = 'Daimler 日志收集数据'
        axios.postD('/auditManage/exportAuditListBySearch', {}).then(res => {
        const content = res
        const blob = new Blob([content], {type: 'application/vnd.ms-excel'})
        const exportFileName = this.$DateFormat.dateFormat(new Date(),true)+'_'+fileName+'.xlsx'
        if ('download' in document.createElement('a')) { // 非IE下载
          this.$message.warning('文件下载中。。。')
          const elink = document.createElement('a')
          elink.download = exportFileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          this.$message.warning('文件下载中。。。')
          navigator.msSaveBlob(blob, exportFileName)
        }
      })
      } 
      }
    }
 </script>
 
 <style>
     body {
         background: #DFE9FB;
     }
 </style>