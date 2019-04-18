
<template>
  <div class="robotInfo">
    <div class="tabOne">
      <h4 class="h2">统计信息</h4>
      <div class="grid-content bg-purple-dark">
        <el-tabs id="topTitle" v-model="search.orderType" @tab-click="handleTabClick">
          <el-tab-pane label="拣货S" name="S"></el-tab-pane>
          <el-tab-pane label="拣货V" name="V"></el-tab-pane>
          <el-tab-pane label="上架" name="BIN"></el-tab-pane>
          <el-tab-pane label="调仓-拣出" name="RELOC"></el-tab-pane>
          <el-tab-pane label="调仓-召唤货架" name="CALL_SHELF"></el-tab-pane>
          <el-tab-pane label="盘点" name="STOCK_TAKING"></el-tab-pane>
        </el-tabs>
        <div class="canvasOne">
          <div class="clears">
            <h4 class="h2 fl">最近30天订单完成情况</h4>
            <div class="fr">
              <span class="startTime">{{startTimeDone}}</span>
              <span >——</span>
              <span class="endTime">{{endTimeDone}}</span>
            </div>
          </div>
          <div id="myChart" style="width: 100%;height: 400px;"></div>
        </div>
        <div class="canvasOne">
          <div class="clears">
            <h4 class="h2 fl">最近30天订单收工打印的统计图</h4>
            <div class="fr">
              <span class="startTime">{{startTimePrint}}</span>
              <span >——</span>
              <span class="endTime">{{endTimePrint}}</span>
            </div>
          </div>
          <div id="myChart2" style="width: 100%;height: 400px;"></div>
        </div>
      </div>
    </div>
    <div class="tabOne">
      <h4 class="h2">订单流水</h4>
       <el-tabs id="topTitle" v-model="searchOrder.orderType"  @tab-click="handleTabClickOrder()">
          <el-tab-pane label="拣货" name="dialogPICK"></el-tab-pane>
          <el-tab-pane label="上货" name="dialogBIN"></el-tab-pane>
          <el-tab-pane label="调仓" name="dialogRELOC"></el-tab-pane>
          <el-tab-pane label="盘点" name="dialogSTOCK_TAKING"></el-tab-pane>
      </el-tabs>
      <!-- 搜索区域 -->
      <div  v-if="dialogList.dialogPICK" >
      <el-form label-width="160px" class="demo-form-inline selectedCont clears">
        <el-row>
        <el-col :span="8">
            <el-form-item label="订单状态">
                <el-select placeholder="完成" v-model="searchPick.dmlOrderStatus" style="width:200px">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未创建波次" value="1"></el-option>
                    <el-option label="手工打印" value="2"></el-option>
                    <el-option label="完成" value="3"></el-option>
                    <el-option label="在途" value="4"></el-option>
                    <el-option label="不在途" value="5"></el-option>    
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="路线" >
              <el-input v-model="searchPick.attribute10" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
            </el-row>
            <el-row>
            <el-col :span="8">
            <el-form-item label="订单类型">
                <el-select placeholder="订单类型" v-model="searchPick.attribute09" style="width:200px">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="S" value="S"></el-option>
                    <el-option label="V" value="V"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            
             <el-col :span="8">
              <el-form-item label="WIP号" >
                 <el-input v-model="searchPick.attribute03" style="width:200px"></el-input>
            </el-form-item>
             </el-col>
             </el-row>
             <el-row>
              <el-col :span="8">
             <el-form-item label="客户">
               <el-input v-model="searchPick.attribute07" style="width:200px"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="8">
            <el-form-item label="WIP订单行" >
                 <el-input v-model="searchPick.attribute04" style="width:200px"></el-input>
            </el-form-item>
             </el-col>
             </el-row>
             <el-row>
            <el-col :span="8">
            <el-form-item label="货位">
                <el-input v-model="searchPick.locNum" style="width:200px"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="页面大小">
               <el-select placeholder="页面大小" v-model="searchPick.pageSize" style="width:200px">
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
            <el-form-item label="ISP经销商">
                <el-select placeholder="ISP经销商" v-model="searchPick.attribute19" style="width:200px">
                <el-option
                v-for="item in Y_N_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
                > 
              </el-option>
          </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="ICT经销商">
                 <el-select placeholder="ICT经销商" v-model="searchPick.attribute18" style="width:200px">
                <el-option
                v-for="item in Y_N_STATUS"
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
           <el-form-item label="下单初始日期" style="width:200px">
              <el-date-picker
                v-model="searchPick.startTimeCreateDt"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="下单截止日期" style="width:200px">
              <el-date-picker
                v-model="searchPick.endTimeCreateDt"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            </el-row>
            <el-row>
                 <el-col :span="8">
           <el-form-item label="创建波次初始日期" style="width:200px">
              <el-date-picker
                v-model="searchPick.startTimeWaveCreateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="创建波次截止日期" style="width:200px">
              <el-date-picker
                v-model="searchPick.endTimeWaveCreateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            </el-row>
            <el-row>
                 <el-col :span="8">
           <el-form-item label="打印初始日期" style="width:200px">
              <el-date-picker
                v-model="searchPick.startTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="打印截止日期" style="width:200px">
              <el-date-picker
                v-model="searchPick.endTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            </el-row>
            <el-row>
                 <el-col :span="8">
           <el-form-item label="导入初始日期" style="width:200px">
              <el-date-picker
                v-model="searchPick.startTimeOrderInDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="导入截止日期" style="width:200px">
              <el-date-picker
                v-model="searchPick.endTimeOrderInDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            </el-row>
            <el-col :span="8">
            <el-form-item >  
                 <el-button type="primary" @click="confirm">确认</el-button>
                 <el-button type="primary" @click="reset">清空</el-button>
                 <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item>
                 <el-checkbox v-model="searchPick.submitAll"  @change="handleCheckAllChangePICK">提交全部</el-checkbox>
                 <el-button  type="primary" :disabled="downLoadDisabledPick" @click="SetDownloadFunc('PICK')">下载excel </el-button>
            </el-form-item>
            </el-col>
      </el-form>
      <el-table ref="multipleTable" :data="tableData.pick" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChangePick" border v-loading="tableLoadingPick">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="attribute07" label="客户编码" width="100">
            </el-table-column>
            <el-table-column prop="attribute08" label="客户名称"  width="100">
            </el-table-column>
            <el-table-column prop="attribute03" label="WIP号"  width="100">
            </el-table-column>
            <el-table-column prop="attribute04" label="WIP订单行"  width="100">
            </el-table-column>
            <el-table-column prop="attribute01" label="拣货记录"  width="100">
            </el-table-column>
            <el-table-column prop="attribute10" label="路线"  width="100">
            </el-table-column>
            <el-table-column prop="attribute09" label="订单类型"  width="100">
            </el-table-column>
            <el-table-column prop="locNum" label="货位"  width="100">
            </el-table-column>
            <el-table-column prop="skuNum" label="零件编码"  width="100">
            </el-table-column>
            <el-table-column prop="createDt" label="下单时间" width="150">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.createDt,true)}}
                </template>
            </el-table-column>
            <el-table-column prop="attribute19" label="ISP经销商" width="200"> 
              <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue(Y_N_STATUS,scope.row.attribute19)}}
              </template>
            </el-table-column>
            <el-table-column prop="attribute18" label="ICT经销商" width="200">
               <template slot-scope="scope" width="100%">
                  {{$Enum.getEnumSelectByValue(Y_N_STATUS,scope.row.attribute18)}}
              </template>
            </el-table-column>
            <el-table-column prop="dmlOrderStatus" label="订单状态" width="200">
              <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue(DML_PICK_ORDER_STATUS,scope.row.dmlOrderStatus)}}
              </template>
            </el-table-column>
            <el-table-column prop="orderInDate" label="导入时间" width="150">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.orderInDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="waveCreateDate" label="创建波次时间" width="200">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.waveCreateDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="lastUpdateDate" label="打印时间" width="200">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.lastUpdateDate,true)}}
                      </template>
            </el-table-column>
        </el-table>
         <el-pagination v-if="searchPick.totalRows>0" class="pagination" background @current-change="handleCurrentChangePick"
                        :current-page.sync="searchPick.currentPage" :page-size="searchPick.pageSize" :page-sizes="[searchPick.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="searchPick.totalRows">
          </el-pagination>
      </div> 
      <div  v-if="dialogList.dialogBIN" >
        <el-form class="demo-form-inline selectedCont clears" label-width="160px">
        <el-row>
        <el-col :span="8">
            <el-form-item label="订单状态" >
              <el-select placeholder="订单状态" v-model="searchBIN.dmlBinStatus" style="width:200px">
                <el-option
                v-for="item in $Enum.EnumSelect().dml_Bin_Status"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
                > 
              </el-option>
           </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="WIP号" >
              <el-input v-model="searchBIN.binWip" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="GRN" >
              <el-input v-model="searchBIN.binGrn" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="订单号" >
              <el-input v-model="searchBIN.binOrdNo" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
       <el-row>
        <el-col :span="8">
           <el-form-item label="零件编码" >
              <el-input v-model="searchBIN.skuNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="货架位" >
              <el-input v-model="searchBIN.locNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item label="页面大小" >
             <el-select placeholder="页面大小" v-model="searchBIN.pageSize" style="width:200px">
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
        <el-col :span="8">  
            <el-form-item label="条码号" >
              <el-input v-model="searchBIN.binTicketNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item label="上货标签打印开始日期" >
               <el-date-picker
                v-model="searchBIN.startTimeCreateDt"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="上货标签打印截止日期" >
               <el-date-picker
                v-model="searchBIN.endTimeCreateDt"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="导入时间开始日期" >
               <el-date-picker
                v-model="searchBIN.startTimeBinInDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="导入时间截止日期" >
               <el-date-picker
                v-model="searchBIN.endTimeBinInDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="创建波次开始日期" >
               <el-date-picker
                v-model="searchBIN.startTimeWhiteCreationDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="创建波次截止日期" >
               <el-date-picker
                v-model="searchBIN.endTimeWhiteCreationDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="完成时间开始日期" >
               <el-date-picker
                v-model="searchBIN.startTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="完成时间截止日期" >
               <el-date-picker
                v-model="searchBIN.endTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
        <el-col :span="8">
        <el-form-item>  
              <el-button type="primary" @click="confirmBIN">确认</el-button>
              <el-button type="primary" @click="resetBIN">清空</el-button>
              <el-button type="primary" @click="cancelBIN">取消</el-button>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item>    
              <el-checkbox v-model="searchBIN.submitAll"  @change="handleCheckAllChangeBIN">提交全部</el-checkbox>
              <el-button  type="primary" :disabled="downLoadDisabledBIN" @click="SetDownloadFunc('BIN')">下载excel </el-button>
        </el-form-item>
        </el-col>
      </el-form>
      <el-table ref="multipleTableBIN" :data="tableData.BIN" height="500" style="width: 100%" @selection-change="handleSelectionChangeBIN" border v-loading="tableLoadingBIN">
            <el-table-column type="selection" width="55" fixed="left">
            </el-table-column>
            <el-table-column prop="binTicketNum" label="上货标签号" width="100" fixed>
            </el-table-column>
            <el-table-column prop="binGrn" label="GRN"  width="100" fixed>
            </el-table-column>
            <el-table-column prop="skuNum" label="零件编码"  width="100">
            </el-table-column>
            <el-table-column prop="binPartDesc" label="零件描述"  width="100">
            </el-table-column>
            <el-table-column prop="binWip" label="WIP号"  width="100">
            </el-table-column>
            <el-table-column prop="binWipLine" label="WIP订单行"  width="100">
            </el-table-column>
            <el-table-column prop="binOrdNo" label="订单号"  width="100">
            </el-table-column>
            <el-table-column prop="binOrdLine" label="订单行"  width="100">
            </el-table-column>
            <el-table-column prop="binQty" label="数量"  width="100">
            </el-table-column>
             <el-table-column prop="locNum" label="货架位"  width="100">
            </el-table-column>
            <el-table-column prop="createDt" label="上货标签打印时间" width="150">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.createDt,true)}}
                      </template>
            </el-table-column>
            <el-table-column prop="dmlBinStatus" label="订单状态" width="200"> 
              <template slot-scope="scope" width="100%">
                {{$Enum.getEnumSelectByValue($Enum.EnumSelect().dml_Bin_Status,scope.row.dmlBinStatus)}}
              </template>
            </el-table-column>
            <el-table-column prop="binInDate" label="导入时间" width="200">
               <template slot-scope="scope" width="100%">
                 {{$DateFormat.dateFormat(scope.row.binInDate,true)}}
              </template>
            </el-table-column>
            <el-table-column prop="whiteCreationDate" label="创建波次时间" width="200">
              <template slot-scope="scope" width="100%">
                {{$DateFormat.dateFormat(scope.row.whiteCreationDate,true)}}
              </template>
            </el-table-column>
            <el-table-column prop="lastUpdateDate" label="完成时间" width="150">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.lastUpdateDate,true)}}
                      </template>
            </el-table-column>
        </el-table>
         <el-pagination v-if="searchBIN.totalRows>0" class="pagination" background @current-change="handleCurrentChangeBIN"
                        :current-page.sync="searchBIN.currentPage" :page-size="searchBIN.pageSize" :page-sizes="[searchBIN.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="searchBIN.totalRows">
          </el-pagination>
      </div> 
      <div  v-if="dialogList.dialogRELOC"  class="tabOne">
         <el-tabs id="topTitle" v-model="searchReloc.orderType" @tab-click="handleTabClickReloc">
          <el-tab-pane label="调仓--拣出" name="RELOC_PICK_OUT"></el-tab-pane>
          <el-tab-pane label="召唤货架" name="CALL_SHELF"></el-tab-pane>
         </el-tabs>
         <div v-if="TabRELOC.RELOC_PICK_OUT">
        <el-form class="demo-form-inline selectedCont clears" label-width="160px">
        <el-row>
        <el-col :span="8">
            <el-form-item label="货位号" >
                 <el-input v-model="searchRelocPickOut.locNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="零件编码" >
              <el-input v-model="searchRelocPickOut.skuNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item label="导入时间开始日期" >
               <el-date-picker
                v-model="searchRelocPickOut.startTimeOrderInDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="导入时间截止日期" >
               <el-date-picker
                v-model="searchRelocPickOut.endTimeOrderInDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="创建波次开始日期" >
               <el-date-picker
                v-model="searchRelocPickOut.startTimeWaveCreateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="创建波次截止日期" >
               <el-date-picker
                v-model="searchRelocPickOut.endTimeWaveCreateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="完成时间开始日期" >
               <el-date-picker
                v-model="searchRelocPickOut.startTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="完成时间截止日期" >
               <el-date-picker
                v-model="searchRelocPickOut.endTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item label="页面大小" >
               <el-select placeholder="页面大小" v-model="searchBIN.pageSize" style="width:200px">
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
        <el-col :span="12">
        <el-form-item>  
              <el-button type="primary" @click="confirmRELOC_PICKOUT">确认</el-button>
              <el-button type="primary" @click="resetRELOC_PICKOUT">清空</el-button>
              <el-button type="primary" @click="cancelRELOC_PICKOUT">取消</el-button>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item>    
               <el-checkbox v-model="searchRelocPickOut.submitAll"  @change="handleCheckAllChangeRelocPickOut">提交全部</el-checkbox>
              <el-button  type="primary" :disabled="downLoadDisabledRelocPickOut" @click="SetDownloadFunc('RELOC_PICKOUT')">下载excel </el-button>
        </el-form-item>
        </el-col>
        </el-row>  
      </el-form>
      <el-table ref="multipleTableRELOC_PICKOUT" :data="tableData.RELOC_PICKOUT" height="500" style="width: 100%" @selection-change="handleSelectionChangeRELOC_PICKOUT" border v-loading="tableLoadingRELOC_PICKOUT">
            <el-table-column type="selection" width="55" fixed="left">
            </el-table-column>
            <el-table-column  type="index" label="序号" width="100" fixed>
            </el-table-column>
            <el-table-column prop="locNum" label="货位号"  width="100" fixed>
            </el-table-column>
            <el-table-column prop="skuNum" label="零件编号"  width="100">
            </el-table-column>
            <el-table-column prop="skuName" label="零件描述"  width="100">
            </el-table-column>
            <el-table-column prop="orderInDate" label="导入时间" width="200">
               <template slot-scope="scope" width="100%">
                  {{$DateFormat.dateFormat(scope.row.orderInDate,true)}}
              </template>
            </el-table-column>
            <el-table-column prop="waveCreateDate" label="创建波次时间" width="200">
              <template slot-scope="scope" width="100%">
                 {{$DateFormat.dateFormat(scope.row.waveCreateDate,true)}}
              </template>
            </el-table-column>
            <el-table-column prop="lastUpdateDate" label="完成时间" width="150">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.lastUpdateDate,true)}}
                      </template>
            </el-table-column>
        </el-table>
         <el-pagination v-if="searchRelocPickOut.totalRows>0" class="pagination" background @current-change="handleCurrentChangeRELOC_PICKOUT"
                        :current-page.sync="searchRelocPickOut.currentPage" :page-size="searchRelocPickOut.pageSize" :page-sizes="[searchRelocPickOut.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="searchRelocPickOut.totalRows">
          </el-pagination>
      </div> 
      <div v-if="TabRELOC.CALL_SHELF">
        <el-form class="demo-form-inline selectedCont clears" label-width="160px">
        <el-row>
        <el-col :span="8">
            <el-form-item label="货位号" >
                 <el-input v-model="searchCALL_SHELF.locNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
           <el-form-item label="页面大小" >
              <el-input v-model="searchCALL_SHELF.pageSize" style="width:200px"></el-input>
            </el-form-item>
        </el-col> 
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item label="提交时间开始日期" >
               <el-date-picker
                v-model="searchCALL_SHELF.startTimeCreateWaveDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="提交时间截止日期" >
               <el-date-picker
                v-model="searchCALL_SHELF.endTimeCreateWaveDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="完成时间开始日期" >
               <el-date-picker
                v-model="searchCALL_SHELF.startTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="完成时间截止日期" >
               <el-date-picker
                v-model="searchCALL_SHELF.endTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
       <el-col :span="12">
        <el-form-item>  
              <el-button type="primary" @click="confirmCALL_SHELF">确认</el-button>
              <el-button type="primary" @click="resetCALL_SHELF">清空</el-button>
              <el-button type="primary" @click="cancelCALL_SHELF">取消</el-button>
        </el-form-item>
        </el-col>
       <el-col :span="12">
        <el-form-item>
              <el-checkbox v-model="searchCALL_SHELF.submitAll"  @change="handleCheckAllChangeCALL_SHELF">提交全部</el-checkbox>
              <el-button  type="primary" :disabled="downLoadDisabledCALL_SHELF" @click="SetDownloadFunc('CALL_SHELF')">下载excel </el-button>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <el-table ref="multipleTableCALL_SHELF" :data="tableData.CALL_SHELF" height="500"  @selection-change="handleSelectionChangeCALL_SHELF" border v-loading="tableLoadingCALL_SHELF">
            <el-table-column type="selection" width="55" fixed="left">
            </el-table-column>
            <el-table-column type="index" label="序号"  fixed>
            </el-table-column>
            <el-table-column prop="locNum" label="货位号"   fixed>
            </el-table-column>
            <el-table-column prop="createWaveDate" label="提交时间" >
               <template slot-scope="scope" width="100%">
                  {{$DateFormat.dateFormat(scope.row.createWaveDate,true)}}
              </template>
            </el-table-column>
            <el-table-column prop="lastUpdateDate" label="完成时间">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.lastUpdateDate,true)}}
                      </template>
            </el-table-column>
        </el-table>
         <el-pagination v-if="searchCALL_SHELF.totalRows>0" class="pagination" background @current-change="handleCurrentChangeCALL_SHELF"
                        :current-page.sync="searchCALL_SHELF.currentPage" :page-size="searchCALL_SHELF.pageSize" :page-sizes="[searchCALL_SHELF.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="searchCALL_SHELF.totalRows">
          </el-pagination>
      </div> 
      </div>
      <div  v-if="dialogList.dialogSTOCK_TAKING">
         <el-form class="demo-form-inline selectedCont clears" label-width="160px">
        <el-row>
        <el-col :span="8">
            <el-form-item label="货位号" >
               <el-input v-model="searchSTOCK_TAKING.locNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="盘点次数" >
              <el-input v-model="searchSTOCK_TAKING.binQty" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="零件编码" >
              <el-input v-model="searchSTOCK_TAKING.skuNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="用户ID" >
              <el-input v-model="searchSTOCK_TAKING.rfdcUserId" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
       <el-row>
        <el-col :span="8">
           <el-form-item label="任务页" >
              <el-input v-model="searchSTOCK_TAKING.page" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="页面大小" >
              <el-select placeholder="页面大小" v-model="searchBIN.pageSize" style="width:200px">
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
           <el-form-item label="导入时间开始日期" >
               <el-date-picker
                v-model="searchSTOCK_TAKING.startTimeCreationDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="导入时间截止日期" >
               <el-date-picker
                v-model="searchSTOCK_TAKING.endTimeCreationDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="创建波次开始日期" >
               <el-date-picker
                v-model="searchSTOCK_TAKING.startTimeWavedDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="创建波次截止日期" >
               <el-date-picker
                v-model="searchSTOCK_TAKING.endTimeWavedDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="完成时间开始日期" >
               <el-date-picker
                v-model="searchSTOCK_TAKING.startTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                @change="handleChangeTime"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="完成时间截止日期" >
               <el-date-picker
                v-model="searchSTOCK_TAKING.endTimeLastUpdateDate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                style="width:200px"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">
        <el-form-item>  
              <el-button type="primary" @click="confirmSTOCK_TAKING">确认</el-button>
              <el-button type="primary" @click="resetSTOCK_TAKING">清空</el-button>
              <el-button type="primary" @click="cancelSTOCK_TAKING">取消</el-button>
        </el-form-item>
          </el-col>
       <el-col :span="12">
        <el-form-item>
              <el-checkbox v-model="searchSTOCK_TAKING.submitAll"  @change="handleCheckAllChangeSTOCK_TAKING">提交全部</el-checkbox>
              <el-button  type="primary" :disabled="downLoadDisabledSTOCK_TAKING"   @click="SetDownloadFunc('STOCK_TAKING')">下载excel </el-button>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <el-table ref="multipleTableSTOCK_TAKING" :data="tableData.STOCK_TAKING" height="500" style="width: 100%" @selection-change="handleSelectionChangeSTOCK_TAKING" border v-loading="tableLoadingSTOCK_TAKING">
            <el-table-column type="selection" width="55" fixed="left">
            </el-table-column>
            <el-table-column prop="locNum" label="货位号" width="100" fixed>
            </el-table-column>
            <el-table-column prop="skuNum" label="零件编码"  width="100" fixed>
            </el-table-column>
            <el-table-column prop="page" label="任务页"  width="100">
            </el-table-column>
            <el-table-column prop="binQty" label="盘点数量"  width="100">
            </el-table-column>
            <el-table-column prop="noOfCount" label="盘点次数"  width="100">
            </el-table-column>
            <el-table-column prop="countBy" label="盘点用户"  width="100">
            </el-table-column>
            <el-table-column prop="rfdcUserId" label="用户ID"  width="100">
            </el-table-column>
            <el-table-column prop="creationDate" label="导入时间"  width="100">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.creationDate,true)}}
                      </template>
            </el-table-column>
            <el-table-column prop="wavedDate" label="创建波次时间"  width="100">
              <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.wavedDate,true)}}
                      </template>
            </el-table-column>
             <el-table-column prop="lastUpdateDate" label="完成时间"  width="100">
               <template slot-scope="scope">
                        {{$DateFormat.dateFormat(scope.row.lastUpdateDate,true)}}
                      </template>
            </el-table-column>
        </el-table>
         <el-pagination v-if="searchSTOCK_TAKING.totalRows>0" class="pagination" background @current-change="handleCurrentChangeSTOCK_TAKING"
                        :current-page.sync="searchSTOCK_TAKING.currentPage" :page-size="searchSTOCK_TAKING.pageSize" :page-sizes="[searchSTOCK_TAKING.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="searchSTOCK_TAKING.totalRows">
          </el-pagination>
      </div> 
    </div>
  </div>
</template>
<script>
  import axios from '../../util/http'
  import echarts from 'echarts'
  import qs from 'qs'

  export default {
    data () {
      return {
        axios,
        qs,
        tableLoading: false,
        tableLoadingPick: false,
        tableLoadingBIN: false,
        tableLoadingSTOCK_TAKING:false,
        tableLoadingRELOC_PICKOUT:false,
        tableLoadingCALL_SHELF:false,
        tableData: {
          pick: [],
          BIN:[],
          RELOC_PICKOUT:[],
          CALL_SHELF:[],
          STOCK_TAKING:[]
        },
        search: { // 查询参数
          orderType: 'S',
          currentPage: 1
        },
       searchPickSelect:[],
       searchBINSelect:[],
       searchRelocPickOutSelect:[],
       searchCALL_SHELFSelect:[],
       searchSTOCK_TAKINGSelect:[],
       downLoadDisabledPick:true,
       downLoadDisabledBIN:true,
       downLoadDisabledRelocPickOut:true,
       downLoadDisabledCALL_SHELF:true,
       downLoadDisabledSTOCK_TAKING:true,
       searchPick: {
        dmlOrderStatus: '',
        attribute10: '',
        attribute09: '',
        attribute03: '',
        attribute07: '',
        attribute04: '',
        locNum: '',
        attribute19: '',
        attribute18: '',
        wsId: '',
        currentPage: 1,
        printAll: false,
        startTimeCreateDt:'',
        endTimeCreateDt:'',
        startTimeWaveCreateDate:'',
        endTimeWaveCreateDate:'',
        startTimeLastUpdateDate:'',
        endTimeLastUpdateDate:'',
        startTimeOrderInDate:'',
        endTimeOrderInDate:'',
        totalRows:-1,
        pageSize:50,
        submitAll:false
      }, // 查询参数
      searchBIN: {
        dmlBinStatus:'',
        binWip:'',
        binGrn:'',
        binOrdNo:'',
        skuNum:'',
        locNum:'',
        binTicketNum:'',
        pageSize:50,
        binTicketNum:'',
        startTimeCreateDt:'',
        endTimeCreateDt:'',
        startTimeBinInDate:'',
        endTimeBinInDate:'',
        startTimeWhiteCreationDate:'',
        endTimeWhiteCreationDate:'',
        startTimeLastUpdateDate:'',
        endTimeLastUpdateDate:'',
        totalRows:-1,
        currentPage:1,
        submitAll:false
      },
      searchRelocPickOut:{
        locNum:'',
        skuNum:'',
        startTimeOrderInDate:'',
        endTimeOrderInDate:'',
        startTimeWaveCreateDate:'',
        endTimeWaveCreateDate:'',
        startTimeLastUpdateDate:'',
        endTimeLastUpdateDate:'',
        pageSize:50,
        totalRows:-1,
        currentPage:1,
        submitAll:false
      },
      searchCALL_SHELF:{
        locNum:'',
        startTimeCreateWaveDate:'',
        endTimeCreateWaveDate:'',
        startTimeLastUpdateDate:'',
        endTimeLastUpdateDate:'',
        pageSize:50,
        totalRows:-1,
        currentPage:1,
        submitAll:false
      },
      searchSTOCK_TAKING:{
        locNum:'',
        binQty:'',
        skuNum:'',
        rfdcUserId:'',
        page:'',
        startTimeCreationDate:'',
        endTimeCreationDate:'',
        startTimeWavedDate:'',
        endTimeWavedDate:'',
        startTimeLastUpdateDate:'',
        endTimeLastUpdateDate:'',
        pageSize:50,
        totalRows:-1,
        currentPage:1,
        submitAll:false
      },
      searchOrder: { 
          orderType: 'dialogPICK'
        },
      searchReloc: { 
          orderType: 'RELOC_PICK_OUT'
        },
        TabRELOC:{ 
          RELOC_PICK_OUT:true,
          CALL_SHELF:false
        },
        startTimeDone:'',
        endTimeDone:'',
        startTimePrint:'',
        endTimePrint:'',
        dataTimeDonekeyList: [],
        dataTimeDoneValueList: [],
        dataTimePrintkeyList: [],
        dataTimePrintValueList: [],
        dialogList:{
          dialogPICK:true,
          dialogBIN:false,
          dialogRELOC:false,
          dialogSTOCK_TAKING:false
        },
        DML_PICK_ORDER_STATUS: [],
        Y_N_STATUS: []
      }
    },
    mounted () {
      this.getSelectValues()
      this.getdialogPICK()
      this.getMychartData()
    },
    methods: {
      handleCheckAllChangePICK(val){
        this.searchPick.submitAll=val
        if(this.searchPickSelect.length > 0 || val){
         this.downLoadDisabledPick = false
        }else{
         this.downLoadDisabledPick = true
        }
      },
       handleCheckAllChangeBIN(val){
        this.searchBIN.submitAll=val
        if(this.searchBINSelect.length > 0 || val){
         this.downLoadDisabledBIN = false
        }else{
         this.downLoadDisabledBIN = true
        }
      },
       handleCheckAllChangeRelocPickOut(val){
        this.searchRelocPickOut.submitAll=val
        if(this.searchRelocPickOutSelect.length > 0 || val){
         this.downLoadDisabledRelocPickOut = false
        }else{
         this.downLoadDisabledRelocPickOut = true
        }
      },
       handleCheckAllChangeCALL_SHELF(val){
        this.searchCALL_SHELF.submitAll=val
        if(this.searchCALL_SHELFSelect.length > 0 || val){
         this.downLoadDisabledCALL_SHELF = false
        }else{
         this.downLoadDisabledCALL_SHELF = true
        }
      },
       handleCheckAllChangeSTOCK_TAKING(val){
        this.searchSTOCK_TAKING.submitAll=val
        if(this.searchSTOCK_TAKINGSelect.length > 0 || val){
         this.downLoadDisabledSTOCK_TAKING = false
        }else{
         this.downLoadDisabledSTOCK_TAKING = true
        }
      },
     SetDownloadFunc (arg1) {
       let resultData = {}
       let fileName = ''
       resultData.OrderType = arg1
       if(arg1 === 'PICK'){
        fileName='拣货订单流水数据'
        resultData.submitAll=this.searchPick.submitAll
        resultData.params = JSON.stringify(this.searchPick)
        resultData.result = JSON.stringify(this.searchPickSelect)
       }else if(arg1 === 'BIN'){
         fileName='上货订单流水数据'
         resultData.submitAll=this.searchBIN.submitAll
          resultData.params = JSON.stringify(this.searchBIN)
        resultData.result = JSON.stringify(this.searchBINSelect)
       }else if(arg1 === 'STOCK_PICK_OUT'){
         fileName='调仓订单流水数据'
         resultData.submitAll=this.searchRelocPickOut.submitAll
          resultData.params = JSON.stringify(this.searchRelocPickOut)
        resultData.result = JSON.stringify(this.searchRelocPickOutSelect)
       }else if(arg1 === 'CALL_SHELF'){
          fileName='召唤货架订单流水数据'
         resultData.submitAll=this.searchCALL_SHELF.submitAll
          resultData.params = JSON.stringify(this.searchCALL_SHELF)
        resultData.result = JSON.stringify(this.searchCALL_SHELFSelect)
       }else{
          fileName='盘点订单流水数据'
         resultData.submitAll=this.searchSTOCK_TAKING.submitAll
          resultData.params = JSON.stringify(this.searchSTOCK_TAKING)
        resultData.result = JSON.stringify(this.searchSTOCK_TAKINGSelect)
       }
 
       this.axios.postD('kanban/orderSum/exportDmlPickDetailsVList', qs.stringify(resultData)).then(res => {
        const content = res
        const blob = new Blob([content], {type: 'application/vnd.ms-excel'})
        const exportFileName = this.$DateFormat.dateFormat(new Date(),true)+'_'+fileName+'.xls'
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
    },
    getSelectValues() {
      let Enum = this.$Enum.EnumSelect()
      this.Y_N_STATUS = Enum.Y_N_STATUS
      this.axios.get('common/enum/selectEnumList', {
        params: 'test'
      }).then((res) => {
        if (res.errCode === 'S') {
          res.data.result.map(item => {
            if (item.lookupType === 'DML_PICK_ORDER_STATUS') {
              item.value = item.lookupValueNum
              item.label = item.meaning || item.item.lookupValueNum
              this.DML_PICK_ORDER_STATUS.push(item)
            }
            return item
          })
        }
      })
    },
    handleSelectionChangePick(val){
       this.searchPickSelect = val
      if (this.searchPickSelect.length > 0 || this.searchPick.submitAll) {
        this.downLoadDisabledPick = false
      } else {
        this.downLoadDisabledPick = true
      }
      },
      handleCurrentChangePick(){
      this.searchPick.currentPage = val
      this.getdialogPICK()
      },
      handleChangeTime(){

      },
      handleSelectionChangeBIN(val){
        this.searchBINSelect = val
        if (this.searchBINSelect.length > 0 || this.searchBIN.submitAll) {
          this.downLoadDisabledBIN = false
        } else {
          this.downLoadDisabledBIN = true
        }
      }, 
      handleCurrentChangeBIN(){
      this.searchBIN.currentPage = val
      this.getdialogBIN()
      },
      handleSelectionChangeRELOC_PICKOUT(val){
        this.searchRelocPickOutSelect = val
        if (this.searchRelocPickOutSelect.length > 0 || this.searchRelocPickOut.submitAll) {
          this.downLoadDisabledRelocPickOut = false
        } else {
          this.downLoadDisabledRelocPickOut = true
        }
      }, 
      handleCurrentChangeRELOC_PICKOUT(){
      this.searchRelocPickOut.currentPage = val
      this.getdialogRELOC_PICKOUT()
      },
      handleSelectionChangeCALL_SHELF(val){
        this.searchCALL_SHELFSelect = val
        if (this.searchCALL_SHELFSelect.length > 0 || this.searchCALL_SHELF.submitAll) {
          this.downLoadDisabledCALL_SHELF = false
        } else {
          this.downLoadDisabledCALL_SHELF = true
        }
      }, 
      handleCurrentChangeCALL_SHELF(){
      this.searchCALL_SHELF.currentPage = val
      this.getdialogCALL_SHELF()
      },
      handleSelectionChangeSTOCK_TAKING(val){
        this.searchSTOCK_TAKINGSelect = val
        if (this.searchSTOCK_TAKINGSelect.length > 0 || this.searchSTOCK_TAKING.submitAll) {
          this.downLoadDisabledSTOCK_TAKING = false
        } else {
          this.downLoadDisabledSTOCK_TAKING = true
        }
      }, 
      handleCurrentChangeSTOCK_TAKING(){
      this.searchSTOCK_TAKING.currentPage = val
      this.getdialogSTOCK_TAKING()
      },
      cancel(){
        this.$refs.multipleTable.clearSelection()
      },
      confirm(){
        this.searchPick.currentPage = 1
        this.getdialogPICK()
      },
      reset(){
        this.searchPick.dmlOrderStatus=''
        this.searchPick.attribute10=''
        this.searchPick.attribute09= ''
        this.searchPick.attribute03=''
        this.searchPick.attribute07=''
        this.searchPick.attribute04=''
        this.searchPick.locNum =''
        this.searchPick.attribute19=''
        this.searchPick.attribute18=''
        this.searchPick.wsId= ''
        this.searchPick.currentPage=1,
        this.searchPick.printAll=false,
        this.searchPick.startTimeCreateDtVar=''
        this.searchPick.endTimeCreateDtVar=''
        this.searchPick.startTimeWaveCreateDate=''
        this.searchPick.endTimeWaveCreateDate=''
        this.searchPick.startTimeLastUpdateDate=''
        this.searchPick.endTimeLastUpdateDate=''
        this.searchPick.startTimeOrderInDate=''
        this.searchPick.endTimeOrderInDate=''
    },
    cancelBIN(){
        this.$refs.multipleTableBIN.clearSelection()
      },
      confirmBIN(){
        this.searchBIN.currentPage = 1
        this.getdialogBIN()
      },
      resetBIN(){
        this.searchBIN.dmlBinStatus=''
        this.searchBIN.binWip=''
        this.searchBIN.binGrn=''
        this.searchBIN.binOrdNo=''
        this.searchBIN.skuNum=''
        this.searchBIN.locNum=''
        this.searchBIN.binTicketNum=''
        this.searchBIN.startTimeCreateDt=''
        this.searchBIN.endTimeCreateDt=''
        this.searchBIN.startTimeBinInDate=''
        this.searchBIN.endTimeBinInDate=''
        this.searchBIN.startTimeWhiteCreationDate=''
        this.searchBIN.endTimeWhiteCreationDate=''
        this.searchBIN.startTimeLastUpdateDate=''
        this.searchBIN.endTimeLastUpdateDate=''
    },
    cancelRELOC_PICKOUT(){
        this.$refs.multipleTableRELOC_PICKOUT.clearSelection()
      },
      confirmRELOC_PICKOUT(){
        this.searchRELOC_PICKOUT.currentPage = 1
        this.getdialogRELOC_PICKOUT()
      },
      resetRELOC_PICKOUT(){
        this.searchRelocPickOut.locNum=''
        this.searchRelocPickOut.skuNum=''
        this.searchRelocPickOut.startTimeOrderInDate=''
        this.searchRelocPickOut.endTimeOrderInDate=''
        this.searchRelocPickOut.startTimeWaveCreateDate=''
        this.searchRelocPickOut.endTimeWaveCreateDate=''
        this.searchRelocPickOut.startTimeLastUpdateDate=''
        this.searchRelocPickOut.endTimeLastUpdateDate=''
    },
    cancelCALL_SHELF(){
        this.$refs.multipleTableCALL_SHELF.clearSelection()
      },
    confirmCALL_SHELF(){
        this.searchCALL_SHELF.currentPage = 1
        this.getdialogCALL_SHELF()
      },
    resetCALL_SHELF(){
        this.searchCALL_SHELF.locNum=''
        this.searchCALL_SHELF.startTimeCreateWaveDate=''
        this.searchCALL_SHELF.endTimeCreateWaveDate=''
        this.searchCALL_SHELF.startTimeLastUpdateDate=''
        this.searchCALL_SHELF.endTimeLastUpdateDate=''
    },
    cancelSTOCK_TAKING(){
        this.$refs.multipleTableSTOCK_TAKING.clearSelection()
      },
    confirmSTOCK_TAKING(){
        this.searchSTOCK_TAKING.currentPage = 1
        this.getdialogSTOCK_TAKING()
      },
    resetSTOCK_TAKING(){
        this.searchSTOCK_TAKING.locNum=''
        this.searchSTOCK_TAKING.binQty=''
        this.searchSTOCK_TAKING.skuNum=''
        this.searchSTOCK_TAKING.rfdcUserId=''
        this.searchSTOCK_TAKING.page=''
        this.searchSTOCK_TAKING.startTimeCreationDate=''
        this.searchSTOCK_TAKING.endTimeCreationDate=''
        this.searchSTOCK_TAKING.startTimeWavedDate=''
        this.searchSTOCK_TAKING.endTimeWavedDate=''
        this.searchSTOCK_TAKING.startTimeLastUpdateDate=''
        this.searchSTOCK_TAKING.endTimeLastUpdateDate=''
    },
    handleTabClickOrder(tab, event){
        let dialogListTemp = this.dialogList
        for(var st in dialogListTemp) {
         if(this.searchOrder.orderType === st) {
          this.dialogList[st] = true
          if(st === "dialogPICK"){
           this.getdialogPICK()
          }else if(st === "dialogBIN"){
           this.getdialogBIN()
          }else if(st === "dialogRELOC"){
            this.getdialogRELOC_PICKOUT()
          }else{
            this.getdialogSTOCK_TAKING()
          } 
         }else{
           this.dialogList[st]= false
         }
        } 
      },
      handleTabClickReloc(tab,event){     
        if(this.searchReloc.orderType === 'CALL_SHELF'){
           this.TabRELOC.CALL_SHELF = true
           this.TabRELOC.RELOC_PICK_OUT = false
         }else{
           this.TabRELOC.CALL_SHELF = false
           this.TabRELOC.RELOC_PICK_OUT = true
         }
      },
      getdialogPICK () {
        let that = this
        let resultData = {}
        resultData.params=JSON.stringify(this.searchPick)
        resultData.orderType="V/S"
        this.axios.post('kanban/orderSum/selectDmlPickDetailsVList', qs.stringify(resultData)).then((res) => {
          if (res.errCode === 'S') {
            that.tableData.pick = res.data.result
            that.searchPick.totalRows = res.data.totalRows
          }
        })
      },
      getdialogBIN () {
        let that = this
        this.axios.get('kanban/orderSum/selectBINDetailsVList', {
          params: that.searchBIN
        }).then((res) => {
          if (res.errCode === 'S') {
            that.tableData.BIN = res.data.result
            that.searchBIN.totalRows = res.data.totalRows
          }
        })
      },
      getdialogRELOC_PICKOUT () {
        let that = this
        let resultData = {}
        resultData.params=JSON.stringify(this.searchRelocPickOut)
        resultData.orderType="RELOC"
        this.axios.post('kanban/orderSum/selectDmlPickDetailsVList', qs.stringify(resultData)).then((res) => {
          if (res.errCode === 'S') {
            that.tableData.RELOC_PICKOUT = res.data.result
            that.searchRelocPickOut.totalRows = res.data.totalRows
          }
        })
      },
       getdialogCALL_SHELF () {
        let that = this
        let resultData = {}
        resultData.params=JSON.stringify(this.searchCALL_SHELF)
        resultData.orderType="CALL_SHELF"
        this.axios.post('kanban/orderSum/selectSTOCKDetailsVList', qs.stringify(resultData)).then((res) => {
          if (res.errCode === 'S') {
            that.tableData.CALL_SHELF = res.data.result
            that.searchCALL_SHELF.totalRows = res.data.totalRows
          }
        })
      },
      getdialogSTOCK_TAKING() {
        let that = this
        let resultData = {}
        resultData.params=JSON.stringify(this.searchSTOCK_TAKING)
        resultData.orderType="STOCK_TAKING"
        this.axios.post('kanban/orderSum/selectSTOCKDetailsVList', qs.stringify(resultData)).then((res) => {
          if (res.errCode === 'S') {
            that.tableData.searchSTOCK_TAKING = res.data.result
            that.searchSTOCK_TAKING.totalRows = res.data.totalRows
          }
        })
      },
      // 切换
      handleTabClick: function (tab, event) {
        this.initParams()
        this.getMychartData()
      },
      initParams () {
        this.dataTimeDonekeyList=[]
        this.dataTimeDoneValueList=[]
        this.dataTimePrintkeyList=[]
        this.dataTimePrintValueList=[]
      },
      getMychartData () {
        let that = this
        this.axios.get('kanban/orderSum/select30DayHDmlBinDeliveryVList', {
          params: that.search
        }).then((res) => {
          if (res.errCode === 'S') {
            res.data.resultDone.map((item,i) => {
            if(i === 0){
              this.startTimeDone = item.LAST_UPDATE_DATE
            }
            if(i === res.data.resultDone.length-1){
              this.endTimeDone = item.LAST_UPDATE_DATE
            }
            this.dataTimeDonekeyList.push(item.LAST_UPDATE_DATE)
            this.dataTimeDoneValueList.push(item.COU)
          })
           res.data.resultPrint.map((item,i) => {
            if(i === 0){
              this.startTimePrint = item.LAST_UPDATE_DATE
            }
            if(i === res.data.resultDone.length-1){
              this.endTimePrint = item.LAST_UPDATE_DATE
            }
            this.dataTimePrintkeyList.push(item.LAST_UPDATE_DATE)
            this.dataTimePrintValueList.push(item.COU)
          })
          this.drawLine(this.dataTimeDonekeyList,this.dataTimeDoneValueList)
          this.drawLineTwo(this.dataTimePrintkeyList,this.dataTimePrintValueList)
         }
        })
          
      },
      // 统计图
      drawLine (dataTimeDonekeyListArg,dataTimeDoneValueListArg) {
        let mychart = echarts.init(document.getElementById('myChart'))
        mychart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            top: 30,
            right: 50
          },
          dataZoom: [
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              start: 5,
              end: 20
            }
          ],
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            // x轴的动态数据需要填写在则里面
            data: dataTimeDonekeyListArg
          },
          yAxis: {},
          series: [{
            name: '订单',
            type: 'bar',
            data: dataTimeDoneValueListArg, // 需要填写的Y动态数据
            barWidth: 20
          }]
        })
      },
      drawLineTwo (dataTimePrintkeyListArg,dataTimePrintValueListArg) {
        let mychartss = echarts.init(document.getElementById('myChart2'))
        mychartss.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            top: 30,
            right: 50
          },
          dataZoom: [
            {
              type: 'inside', // inside,slider
              show: true,
              xAxisIndex: [0],
              start: 5,
              end: 20
            }
          ],
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            // x轴的动态数据需要填写在则里面
            data: dataTimePrintkeyListArg
          },
          yAxis: {},
          series: [{
            name: '订单',
            type: 'bar',
            data: dataTimePrintValueListArg, // 需要填写的Y动态数据
            barWidth: 30
          }]
        })
      }
    },
    filters: {
      formatDate (time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
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
  .tabOne >.h2{
    font-size: 18px;
    font-weight: bold;
    margin: 10px;
  }
  .h4{
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0px;
  }
  .tabTwo{
    margin-top: 40px;
  }

  /*统计图*/
  .canvasOne{
    width: 90%;
    margin: 25px auto 30px;
  }
  .clears .h2,.canvasOne .fr span{
    font-size: 16px;
    font-weight: bold;
  }
  .clears:after{
    display: block;
    content: '';
    clear: both;
    height: 0;
    visibility:hidden;
    overflow: hidden;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
</style>
<style>
  .robotInfo .el-tabs__nav-wrap {
    width: 90%;
    margin: 0 auto;
  }
</style>
