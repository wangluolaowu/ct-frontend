<template>
  <div class="mainOrder">
    <div id="mainTabCon">     
      <div class="tabConOther">
        <h4 class="h2">{{$t('message.msg1_03')}}</h4>
        <el-table :data='tableData.SList' highlight-current-row v-loading="tableLoadingSDT" style="width: 99.9%" border>
          <el-table-column prop="inC" :label="$t('label.label1_01')" min-width='200' ></el-table-column>
          <el-table-column prop="waveC" :label="$t('label.label1_02')" min-width='200' ></el-table-column>
          <el-table-column prop="complC" :label="$t('label.label1_03')"  min-width='300'></el-table-column>

          <el-table-column prop="uncomplC" :label="$t('label.label1_04')" min-width='200' ></el-table-column>
          <el-table-column prop="comingC" :label="$t('label.label1_05')" min-width='200' ></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')" min-width='300' ></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" :label="$t('label.label1_07')" min-width='250' ></el-table-column>
          <el-table-column prop="forecastComplSecond" :label="$t('label.label1_08')" min-width='200' >
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabConOther">
        <h4 class="h2">{{$t('message.msg1_04')}}</h4>
        <el-table :data='tableData.SOrderList' highlight-current-row v-loading="tableLoadingSD" border>
          <el-table-column prop="entityWorkstationId" :label="$t('label.label1_09')" min-width='200' ></el-table-column>
          <el-table-column prop="forecastWallCount" :label="$t('label.label1_10')" min-width='200' ></el-table-column>
          <el-table-column prop="workstationStatus" :label="$t('label.label1_11')" min-width='200' >
            <template slot-scope="scope">
              {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complC" :label="$t('label.label1_12')" min-width="250" ></el-table-column>
          <el-table-column prop="uncomplC" :label="$t('label.label1_13')" min-width="250" ></el-table-column>
          <el-table-column prop="comingC" :label="$t('label.label1_14')" min-width="160" ></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')" min-width="300" ></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" :label="$t('label.label1_07')" min-width="250" ></el-table-column>
          <el-table-column prop="forecastComplSecond" :label="$t('label.label1_08')" min-width="200" >
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="SOrderListSearch.totalRows>0" class="pagination" background @current-change="SOrderListHandleCurrentChange"
                       :current-page.sync="SOrderListSearch.currentPage" :page-size="SOrderListSearch.pageSize" :page-sizes="[SOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="SOrderListSearch.totalRows">
        </el-pagination>
      </div>
       <div class="tabCon tabConOther">
        <h4 class="h2">{{$t('message.msg1_01')}}</h4>
        <el-table :data='tableData.Vlist' highlight-current-row v-loading="tableLoadingVDT" style="width: 100%" border>
          <el-table-column prop="inC" :label="$t('label.label1_01')" min-width="200" ></el-table-column>
          <el-table-column prop="waveC" :label="$t('label.label1_02')"  min-width='200' ></el-table-column>
          <el-table-column prop="complC" :label="$t('label.label1_03')" min-width="220" ></el-table-column>
          <el-table-column prop="uncomplC" :label="$t('label.label1_04')" min-width="220" ></el-table-column>
          <el-table-column prop="comingC" :label="$t('label.label1_05')" min-width="200" ></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')" min-width='300' ></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" :label="$t('label.label1_07')" min-width="250" ></el-table-column>
          <el-table-column prop="forecastComplSecond"  :label="$t('label.label1_08')" min-width="200" >
            <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabConOther">
        <h4 class="h2">{{$t('message.msg1_02')}}</h4>
        <el-table :data='tableData.VOrderList' highlight-current-row v-loading="tableLoadingVD" style="width: 100%" border>
          <el-table-column prop="entityWorkstationId" :label="$t('label.label1_09')" min-width='220' ></el-table-column>
          <el-table-column prop="forecastWallCount" :label="$t('label.label1_10')" min-width='220' ></el-table-column>
          <el-table-column prop="workstationStatus" :label="$t('label.label1_11')" min-width="220" >
            <template slot-scope="scope">
              {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complC" :label="$t('label.label1_12')" min-width="250" ></el-table-column>
          <el-table-column prop="uncomplC" :label="$t('label.label1_13')" min-width="250" ></el-table-column>
          <el-table-column prop="comingC" :label="$t('label.label1_14')" min-width="160" ></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')" min-width="300" ></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" :label="$t('label.label1_07')" min-width="250" ></el-table-column>
          <el-table-column prop="forecastComplSecond" :label="$t('label.label1_08')" min-width="200" >
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="VOrderListSearch.totalRows>0" class="pagination" background @current-change="VOrderListSearchHandleCurrentChange"
                       :current-page.sync="VOrderListSearch.currentPage" :page-size="VOrderListSearch.pageSize" :page-sizes="[VOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="VOrderListSearch.totalRows">
        </el-pagination>
      </div>
     <div class="tabCon tabConOther">
        <h4 class="h2">{{$t('message.msg1_67')}}</h4>
        <el-table :data='tableData.USUMlist' highlight-current-row  style="width: 100%" border>
          <el-table-column prop="inC" :label="$t('label.label1_01')" min-width="200" ></el-table-column>
          <el-table-column prop="waveC" :label="$t('label.label1_02')"  min-width='200' ></el-table-column>
          <el-table-column prop="complC" :label="$t('label.label1_03')" min-width="250" ></el-table-column>
          <el-table-column prop="uncomplC" :label="$t('label.label1_04')" min-width="200"></el-table-column>
          <el-table-column prop="comingC" :label="$t('label.label1_05')"  min-width="200" ></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')" min-width='300'></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" :label="$t('label.label1_07')" min-width="250" ></el-table-column>
          <el-table-column prop="forecastComplSecond"  :label="$t('label.label1_08')" min-width="200" >
            <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabConOther">
        <h4 class="h2">{{$t('message.msg1_66')}}</h4>
        <el-table :data='tableData.UOrderList' highlight-current-row  style="width: 100%" border>
          <el-table-column prop="entityWorkstationId" :label="$t('label.label1_09')" min-width='200' ></el-table-column>
          <el-table-column prop="forecastWallCount" :label="$t('label.label1_10')" min-width='200'></el-table-column>
          <el-table-column prop="workstationStatus" :label="$t('label.label1_11')" min-width='200' >
            <template slot-scope="scope">
              {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complC" :label="$t('label.label1_12')" min-width="250" ></el-table-column>
          <el-table-column prop="uncomplC" :label="$t('label.label1_13')" min-width="250" ></el-table-column>
          <el-table-column prop="comingC" :label="$t('label.label1_14')" min-width="160" ></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')" min-width="300"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" :label="$t('label.label1_07')" min-width='250'></el-table-column>
          <el-table-column prop="forecastComplSecond" :label="$t('label.label1_08')" min-width="200" >
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="UOrderListSearch.totalRows>0" class="pagination" background @current-change="UOrderListSearchHandleCurrentChange"
                       :current-page.sync="UOrderListSearch.currentPage" :page-size="UOrderListSearch.pageSize" :page-sizes="[UOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="UOrderListSearch.totalRows">
        </el-pagination>
      </div>
      <div class="tabConOther">
        <h4 class="h2">{{$t('message.msg1_05')}}</h4>
        <el-table :data='tableData.PutawayAllList' highlight-current-row v-loading="tableLoadingSJT" style="width: 100%" border>
          <el-table-column prop="inC" :label="$t('label.label1_01')" min-width="200" ></el-table-column>
          <el-table-column prop="whiteWaveC" :label="$t('label.label1_02')"  min-width="180" ></el-table-column>
          <el-table-column prop="blueWaveC" :label="$t('label.label1_15')"  min-width="190" ></el-table-column>
          <el-table-column prop="blueUncomplC" :label="$t('label.label1_16')" min-width="250" ></el-table-column>
          <el-table-column prop="uncomplC" :label="$t('label.label1_04')"  min-width="250"></el-table-column>
          <el-table-column prop="comingC" :label="$t('label.label1_05')"  min-width="145" ></el-table-column>
          <el-table-column prop="complC" :label="$t('label.label1_03')"  min-width="250"></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')"  min-width="300" ></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" :label="$t('label.label1_07')"  min-width="250" ></el-table-column>
          <el-table-column prop="forecastComplSecond" :label="$t('label.label1_08')" min-width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabConOther">
        <h4 class="h2">{{$t('message.msg1_06')}}</h4>
        <el-table :data='tableData.PutawayList' highlight-current-row v-loading="tableLoadingSJ" style="width: 100%" border>
          <el-table-column prop="entityWorkstationId" :label="$t('label.label1_09')" min-width="150"></el-table-column>
          <el-table-column prop="workstationStatus" :label="$t('label.label1_11')" min-width="200" >
             <template slot-scope="scope" width="100%">
              {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complC" :label="$t('label.label1_12')" min-width="250" ></el-table-column>
          <el-table-column prop="dayWaveC" :label="$t('label.label1_17')" min-width="250" ></el-table-column>
          <el-table-column prop="currWaveC" :label="$t('label.label1_18')"  min-width="250" ></el-table-column>
          <el-table-column prop="whiteUncomplC" :label="$t('label.label1_19')"  min-width="320" ></el-table-column>
          <el-table-column prop="comingC" :label="$t('label.label1_05')"  min-width="160" ></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')"  min-width="300" ></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" :label="$t('label.label1_07')"  min-width="250" ></el-table-column>
          <el-table-column prop="forecastComplSecond" :label="$t('label.label1_08')"  min-width="200" >
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.whiteUncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="PutawayListSearch.totalRows>0" class="pagination" background @current-change="PutawayListSearchHandleCurrentChange"
                       :current-page.sync="PutawayListSearch.currentPage" :page-size="PutawayListSearch.pageSize" :page-sizes="[PutawayListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="PutawayListSearch.totalRows">
        </el-pagination>
      </div>
      <div class="tabConOther">
        <h4 class="h2">{{$t('message.msg1_07')}}</h4>
        <!--新添加表格-->
        <el-table :data='tableData.TiaoCangAllList' highlight-current-row v-loading="tableLoadingTCT" style="width: 100%" border>
           <el-table-column prop="inC" :label="$t('label.label1_01')"  min-width="190" ></el-table-column>
          <el-table-column prop="waveC"  :label="$t('label.label1_02')"  min-width='180' ></el-table-column>
          <el-table-column prop="complC"  :label="$t('label.label1_03')"   min-width='250' ></el-table-column>

          <el-table-column prop="uncomplC" :label="$t('label.label1_04')"  min-width='180' ></el-table-column>
          <el-table-column prop="comingC" :label="$t('label.label1_05')"  min-width="150"></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')"   min-width='320' ></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" :label="$t('label.label1_07')"  min-width="250" ></el-table-column>
          <el-table-column prop="forecastComplSecond" :label="$t('label.label1_08')"   min-width='200' >
             <template slot-scope="scope">
                  {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabConOther">
        <h4 class="h2">{{$t('message.msg1_08')}}</h4>
        <el-table :data='tableData.TiaoCangLists' highlight-current-row v-loading="tableLoadingTC" border>
          <el-table-column prop="entityWorkstationId" :label="$t('label.label1_09')"   min-width='150' ></el-table-column>
          <el-table-column prop="workstationStatus" :label="$t('label.label1_11')"  min-width='100' >
             <template slot-scope="scope" width="100%">
              {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complC" :label="$t('label.label1_12')"  min-width='250' ></el-table-column>

          <el-table-column prop="uncomplC" :label="$t('label.label1_13')"  min-width="250" ></el-table-column>
          <el-table-column prop="comingC" :label="$t('label.label1_14')" min-width="220" ></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')"  min-width="320" ></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" :label="$t('label.label1_07')" min-width="250" ></el-table-column>
          <el-table-column prop="forecastComplSecond" :label="$t('label.label1_08')" min-width="200">
             <template slot-scope="scope">
                  {{getDate(scope.row.forecastComplSecond,scope.row.uncomplC,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="SOrderListSearch.totalRows>0" class="pagination" background @current-change="SOrderListHandleCurrentChange"
                       :current-page.sync="SOrderListSearch.currentPage" :page-size="SOrderListSearch.pageSize" :page-sizes="[SOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="SOrderListSearch.totalRows">
        </el-pagination>
      </div>
       <div class="tabConOther">
        <h4 class="h2">{{$t('message.msg1_09')}}</h4>
        <!--新添加表格-->
        <el-table :data='tableData.resultCallShelfSum' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
           <el-table-column prop="allCou" :label="$t('label.label1_01')"  min-width="190" ></el-table-column>
          <el-table-column prop="complCou" :label="$t('label.label1_03')"  min-width='250' ></el-table-column>

          <el-table-column prop="uncomplCou" :label="$t('label.label1_04')"  min-width='250' ></el-table-column>
          <el-table-column prop="comingCou" :label="$t('label.label1_05')"  min-width='150'></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')" min-width="320" ></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" :label="$t('label.label1_07')"  min-width='250' ></el-table-column>
          <el-table-column prop="forecastComplSecond" :label="$t('label.label1_08')" min-width="200" >
             <template slot-scope="scope">
                  {{getDate(scope.row.forecastComplSecond,scope.row.uncomplCou,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
       <div class="tabConOther">
        <h4 class="h2">{{$t('message.msg1_10')}}</h4>
        <el-table :data='tableData.resultCallShelfInfoList' highlight-current-row v-loading="tableLoading" border>
          <el-table-column prop="entityWorkstationId" :label="$t('label.label1_09')"  min-width='150' ></el-table-column>
          <el-table-column prop="workstationStatus" :label="$t('label.label1_11')"  min-width='100' >
             <template slot-scope="scope" width="100%">
             {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complCou" :label="$t('label.label1_12')"  min-width='250' ></el-table-column>

          <el-table-column prop="uncomplCou" :label="$t('label.label1_13')" min-width="250"></el-table-column>
          <el-table-column prop="comingCou" :label="$t('label.label1_14')" min-width="180"></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')" min-width="320" ></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" :label="$t('label.label1_07')"  min-width='250' ></el-table-column>
          <el-table-column prop="forecastComplSecond" :label="$t('label.label1_08')"  min-width='200' >
             <template slot-scope="scope">
                 {{getDate(scope.row.forecastComplSecond,scope.row.uncomplCou,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="SOrderListSearch.totalRows>0" class="pagination" background @current-change="SOrderListHandleCurrentChange"
                       :current-page.sync="SOrderListSearch.currentPage" :page-size="SOrderListSearch.pageSize" :page-sizes="[SOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="SOrderListSearch.totalRows">
        </el-pagination>
      </div>
       <div class="tabConOther">
        <h4 class="h2">{{$t('message.msg1_11')}}</h4>
        <!--新添加表格-->
        <el-table :data='tableData.resultStockSum' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
           <el-table-column prop="allCou" :label="$t('label.label1_01')"  min-width="190" ></el-table-column>
          <el-table-column prop="wavedCou" :label="$t('label.label1_02')"  min-width="200"></el-table-column>
          <el-table-column prop="complCou" :label="$t('label.label1_03')"   min-width='250' ></el-table-column>

          <el-table-column prop="uncomplCou" :label="$t('label.label1_04')" min-width='200' ></el-table-column>
          <el-table-column prop="comingCou" :label="$t('label.label1_05')"  min-width='150' ></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')"  min-width="320"></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" :label="$t('label.label1_07')"  min-width='250' ></el-table-column>
          <el-table-column prop="forecastComplSecond" :label="$t('label.label1_08')"   min-width='200' >
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplSecond,scope.row.uncomplCou,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
       <div class="tabConOther">
        <h4 class="h2">{{$t('message.msg1_12')}}</h4>
        <el-table :data='tableData.resultStockInfoList' highlight-current-row v-loading="tableLoading" border>
          <el-table-column prop="entityWorkstationId" :label="$t('label.label1_09')"  min-width="150" ></el-table-column>
          <el-table-column prop="workstationStatus" :label="$t('label.label1_11')"  min-width='100'>
             <template slot-scope="scope" width="100%">
              {{$Enum.getEnumSelectByValue(WS_STATUS,scope.row.workstationStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="complCou" :label="$t('label.label1_12')"   min-width='250' ></el-table-column>

          <el-table-column prop="uncomplCou" :label="$t('label.label1_13')"  min-width="250" ></el-table-column>
          <el-table-column prop="comingCou" :label="$t('label.label1_14')"  min-width="180" ></el-table-column>
          <el-table-column prop="instantRaion" :label="$t('label.label1_06')"  min-width="320" ></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" :label="$t('label.label1_07')"  min-width='250'  ></el-table-column>
          <el-table-column prop="forecastComplSecond" :label="$t('label.label1_08')"  min-width='200'>
             <template slot-scope="scope">
                 {{getDate(scope.row.forecastComplSecond,scope.row.uncomplCou,scope.row.instantRaion)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="SOrderListSearch.totalRows>0" class="pagination" background @current-change="SOrderListHandleCurrentChange"
                       :current-page.sync="SOrderListSearch.currentPage" :page-size="SOrderListSearch.pageSize" :page-sizes="[SOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="SOrderListSearch.totalRows">
        </el-pagination>
      </div>
     </div> 
    <div class="tabConOther lineCon" id="tabContainer">
      <div class="grid-content bg-purple-dark">
        <el-tabs id="topTitle" v-model="search.orderType" @tab-click="handleTabClick">
          <!--@tab-click="handleTabClick"-->
          <el-tab-pane :label="$t('message.msg1_04')"  name="S"></el-tab-pane>
          <el-tab-pane :label="$t('message.msg1_02')" name="V"></el-tab-pane>
          <el-tab-pane :label="$t('message.msg1_66')" name="U"></el-tab-pane>
          <el-tab-pane :label="$t('message.msg1_06')" name="BIN"></el-tab-pane>
          <el-tab-pane :label="$t('message.msg1_08')" name="RELOC"></el-tab-pane>
          <el-tab-pane :label="$t('message.msg1_10')" name="CALL_SHELF"></el-tab-pane>
          <el-tab-pane :label="$t('message.msg1_12')" name="STOCK_TAKING"></el-tab-pane>
        </el-tabs>
        <div class="clears">
          <h4 class="h2 fl">{{$t('message.msg1_13')}}</h4>
          <span class="fr">{{endTime24}}</span>
        </div>
        <div id="myChart" style="width: 100%;height: 500px;"></div>
      </div>
    </div>

    </div>
</template>
<script>
// import qs from 'qs'
import axios from '../../../util/http'
import dateFormat from '../../../util/date'
import echarts from 'echarts'
import qs from 'qs'
export default {
  name: 'Order',
  data () {
    return {
      axios,
      qs,
      dateFormat,
      tableLoading: false,
      WS_STATUS: [],
      tableLoadingSDT: false,
      tableLoadingSD: false,
      tableLoadingVDT: false,
      tableLoadingVD: false,
      tableLoadingSJT: false,
      tableLoadingSJ: false,
      tableLoadingTCT: false,
      tableLoadingTC: false,
      timer: '',
      search: { // 查询参数
        extWorkstationType: 'kanban'
      },
      tableData: {
        Vlist: [],
        VOrderList: [],
        SList: [],
        SOrderList: [],
        USUMlist:[],
        UOrderList: [],
        PutawayAllList: [],
        PutawayList: [],
        TiaoCangAllList: [],
        TiaoCangLists: [],
        PickOutOrdersList: [],
        ShelvesToalList: [],
        OrderSummaryList: [],
        SetPointList: [],
        resultStockSum: [],
        resultStockInfoList: [],
        resultCallShelfSum: [],
        resultCallShelfInfoList: []
      },
      VOrderListSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1,
        extWorkstationType: 'V'
      },
      SOrderListSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1,
        extWorkstationType: 'S'
      },
      UOrderListSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1,
        extWorkstationType: 'U'
      },
      PutawayListSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1
      },
      sum24KeyList:[],
      sum24ValueList:[],
      endTime24:'',
      interval:''
    }
  },
  // 页面加
  mounted () {
    //this.getTimeOut()
    
  },
  created () {
     this.getSelectValues()
     this.getSum24()
     //this.interval=window.setInterval(() => {
     //setTimeout(this.getTimeOut(), 0)
   // }, 60000)
    this.getStockCallShelfList()
    this.websocketToLogin()
  },
  destroyed() { 
     clearInterval(this.interval)
  },
  methods: {
     websocketToLogin () {
      // 【agentData：发送的参数；this.getConfigResult：回调方法】
        let This = this
        this.interval=window.setInterval(() => {
         setTimeout(This.$socketApi.sendSock(qs.stringify(this.search), this.getConfigResult), 0)
        }, 60000)
      
      },
      getConfigResult (res) {
        let that = this
      // 接收回调函数返回数据的方法
        if (res.errCode === 'S') {
          that.tableData.Vlist = res.data.resultVSum
          that.tableData.VOrderList = res.data.resultVInfoList
          that.tableData.SList = res.data.resultSSum
          that.tableData.SOrderList = res.data.resultSInfoList
          that.tableData.USUMlist = res.data.resultUSum
          that.tableData.UOrderList = res.data.resultUInfoList
          that.tableData.PutawayAllList = res.data.resultBINSum
          that.tableData.PutawayList = res.data.resultBINInfoList
          that.tableData.TiaoCangAllList = res.data.resultRELOCSum
          that.tableData.TiaoCangLists = res.data.resultRELOCInfoList
          that.tableData.resultStockSum = res.data.resultStockSum
          that.tableData.resultStockInfoList = res.data.resultStockInfoList
          that.tableData.resultCallShelfSum = res.data.resultCallShelfSum
          that.tableData.resultCallShelfInfoList = res.data.resultCallShelfInfoList      
        }
      },
    // 切换
    handleTabClick: function (tab, event) {
      this.getSum24()
    },
    initParams () {
        this.sum24KeyList=[]
        this.sum24ValueList=[]
      },
    getDate(data, unCou,instation) {
      //console.log('data=='+data+"===unCou==="+unCou+"====instation==="+instation)
      if (data) {
        return Math.floor(data / 60)
      } else {
        if(unCou && !instation){
          return '∞'   
          }
        return '0'
      }
    },
    getSelectValues() {
       this.axios.get('common/enum/selectEnumList', {
        params: 'test'
      }).then((res) => {
        if (res.errCode === 'S') {
          res.data.result.map(item => {
            if (item.lookupType === 'WS_STATUS') {
              item.value = item.lookupValueNum
              item.label = item.meaning||item.lookupValueNum
              this.WS_STATUS.push(item)
            }
           
            return item
          })
        }
        //this.getTimeOut()
      })
    },
    getTimeOut() {
     this.getStockCallShelfList ()
    },
    getStockCallShelfList () { // 盘点，召唤货架信息
      let that = this
      this.axios.get('kanban/orderKanban/selectStockCallShelfList', {
        params: {
          orderType: 'V'
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData.Vlist = res.data.resultVSum
          that.tableData.VOrderList = res.data.resultVInfoList
          that.tableData.SList = res.data.resultSSum
          that.tableData.SOrderList = res.data.resultSInfoList
          that.tableData.USUMlist = res.data.resultUSum
          that.tableData.UOrderList = res.data.resultUInfoList
          that.tableData.PutawayAllList = res.data.resultBINSum
          that.tableData.PutawayList = res.data.resultBINInfoList
          that.tableData.TiaoCangAllList = res.data.resultRELOCSum
          that.tableData.TiaoCangLists = res.data.resultRELOCInfoList
          that.tableData.resultStockSum = res.data.resultStockSum
          that.tableData.resultStockInfoList = res.data.resultStockInfoList
          that.tableData.resultCallShelfSum = res.data.resultCallShelfSum
          that.tableData.resultCallShelfInfoList = res.data.resultCallShelfInfoList      
        }
      })
    }, // 切换
    getSum24(){
      let sum24KeyListTemp = []
      let sum24ValueListTemp = []
      //this.sum24KeyList = []
      //this.sum24ValueList = []
      this.axios.get('kanban/orderKanban/select24HDmlBinDeliveryVList', {
        params: this.search
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {

           res.data.result.reverse().map((item,i) => {
            if(i === res.data.result.length -1){
              this.endTime24 = item.LAST_UPDATE_TIME
            }  
            sum24KeyListTemp.push(item.LAST_UPDATE_DATE)
            sum24ValueListTemp.push(item.COU)
          })
        }
        this.drawLine (sum24KeyListTemp,sum24ValueListTemp)
      })
    },
    drawLine (sum24KeyListTemp,sum24ValueListTemp) { // 统计图
      //console.log('this.sum24KeyList============' + JSON.stringify(sum24KeyListTemp))
      //console.log('this.sum24ValueList============' +  JSON.stringify(sum24ValueListTemp))
      let mychart = echarts.init(document.getElementById('myChart'))
      mychart.clear()
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
        grid:{
          y2: 100
        },
        xAxis: {
          axisLabel: {
            interval: 0,
            rotate: 60,

        },
        
          data: sum24KeyListTemp
        },
        yAxis: {},
        series: [{
          name: '订单',
          type: 'bar',
          data: sum24ValueListTemp, // 需要填写的Y动态数据
          barWidth: 30,
          itemStyle:{
              normal:{
                color:'#5097AB',
                lineStyle:{
                  color:'#5097AB',
                }
              }
            }
        }]
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .mainOrder{
    font-weight: 650;
    color: #333;
  }
  .mainOrder el-table{
    text-align: center!important;
  }
  .tabCon{
    margin-top: 25px;
  }
  .tabConOther{
    margin-bottom: 50px;
  }
  .tabConOther >.h2,.tabConLast>.h2{
    margin:10px 0;
    font-size: 18px;
    font-weight: bold;
  }
  #mainTabCon{
    margin: 40px auto 50px;
  }
  .lineCon,#mainTabCon{
    border: 1px solid #e6e6e6;
    padding: 0 5px 20px;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .lineCon{
    padding: 10px 5px 30px;
  }
  .clears{
    width: 90%;
    margin: 25px auto 30px;
  }
  .clears .h2{
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
  html{
    color: #333333;
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
  }
  .el-table th>.cell{
    text-align: center!important;
    font-size: 15px;
  }
  .el-table__empty-block .el-table__empty-text{
    font-size: 15px;
  }
  #tabContainer .el-tabs__nav-wrap {
    width: 90%;
    margin: 0 auto;
  }
  .mainOrder tbody .el-table__row td .cell{
    text-align: center;
  }
  .mainOrder .pagination{
    text-align: right;
  }
</style>
