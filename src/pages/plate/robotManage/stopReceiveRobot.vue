<template>
  <div class="mainCon">
    <!--滑块-->
   <!--<div class="slider-con" >
     <div class="block">
       <h1>暂停全部机器人</h1>
       <el-slider v-model="sliderVal"  @change="getVal()"></el-slider>
     </div>
   </div>-->
    <!--弹窗-->
    <el-dialog
      :title="$t('message.msg1_41')"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>{{$t('message.msg1_69')}}</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancleBtn()">{{$t('message.msg1_30')}}</el-button>
          <el-button type="primary" @click="succeBtn()">{{$t('message.msg1_68')}}</el-button>
         </span>
    </el-dialog>
     <!--弹窗-->
    <el-dialog
      :title="$t('message.msg1_41')"
      :visible.sync="dialogVisibleStart"
      width="30%"
    >
      <span>{{$t('message.msg1_69')}}</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancleBtnStart()">{{$t('message.msg1_30')}}</el-button>
          <el-button type="primary" @click="succeBtnStart()">{{$t('message.msg1_68')}}</el-button>
         </span>
    </el-dialog>

  <el-row :span="24" >
    <el-col :span="12" class="stopCon">
      <!--暂停部分机器人-->
      <template >
        <h1>{{$t('message.msg1_72')}}</h1>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedStop" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in stopRobotName" :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{$t('message.msg1_73')}}</el-checkbox>
        <el-button class="submitBtn" type="primary" @click="submitBtn(0)">{{$t('message.msg1_34')}}</el-button>
      </template>
    </el-col>
    <el-col :span="12" class="resumeCon">
      <!--恢复暂停机器人-->
      <template >
        <h1>{{$t('message.msg1_74')}}</h1>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedResumeRobot" @change="handleCheckedRemoChange">
          <el-checkbox v-for="items in resumeName" :label="items" :key="items">{{items}}</el-checkbox>
        </el-checkbox-group>
        <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">{{$t('message.msg1_73')}}</el-checkbox>
        <el-button class="submitBtn" type="primary" @click="submitBtn(1)">{{$t('message.msg1_34')}}</el-button>
      </template>
    </el-col>
  </el-row>

<el-dialog width="30%" :title="$t('message.msg1_41')" :visible.sync="isShowInnerConfirmDialog" append-to-body >
            <p class="dialog-text">{{$t('message.msg1_43')}}</p>
            <el-button type="primary" @click="confirmReject">{{$t('message.msg1_68')}}</el-button>
        </el-dialog>

  </div>
</template>
<script>
import axios from '../../../util/http'
import qs from 'qs'
export default {
  data() {
    return {
      axios,
      sliderVal: 0,
      sliderValStart: 0,
      stopOptions: [],
      resumeOpt: [],
      dialogVisible: false,
      checkAll: false,
      checkAll2: false,
      checkedStop: [],
      checkedResumeRobot: [],
      stopRobotName: [],
      resumeName: [],
      isIndeterminate: false,
      isIndeterminate2: false,
      isShowInnerConfirmDialog: false,
      dialogVisibleStart: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData () {
      this.axios.get('robotManage/stopReceive/selectKidsInfoList', {
        params: 'test1'
      }).then((res) => {
        if (res.errCode === 'S') {
          this.stopOptions = res.data.result
          this.resumeOpt = res.data.result
          this.stopRobotName = res.data.result
          this.resumeName = res.data.result
          this.checkedResumeRobot = res.data.resultStart
          this.checkedStop = res.data.resultPause
          this.isIndeterminate = false
          this.isIndeterminate2 = false
          this.checkAll2 = res.data.result.length === res.data.resultStart.length
          this.checkAll = res.data.result.length === res.data.resultPause.length
        }
      })
    },
    submitBtn (arg) {
       this.$confirm('确认提交吗?', '提示', {
        // type: 'warning'
      }).then(() => {
      let dataResult = {}
      dataResult.activeType = arg
      if (arg === 1) {
        dataResult.idList = JSON.stringify(this.checkedResumeRobot)
      } else {
        dataResult.idList = JSON.stringify(this.checkedStop)
      }

      if (this.checkAll || this.checkAll2) {
        dataResult.idList = JSON.stringify([0])
      }
      this.axios.post('robotManage/stopReceive/updateKidsInfoList', qs.stringify(dataResult)).then((res) => {
        if (res.errCode === 'S') {
          this.stopOptions = res.data.result
          this.resumeOpt = res.data.result
          this.stopRobotName = res.data.result
          this.resumeName = res.data.result
          this.checkedResumeRobot = res.data.resultStart
          this.checkedStop = res.data.resultPause
          this.isShowInnerConfirmDialog = true
        }
       })
      }).catch(() => {})
    },
    confirmReject() {
      this.isShowInnerConfirmDialog = false
      this.getData()
    },
    getVal: function () { //  打印当前滑块的值
      console.log('当前值' + this.sliderVal)
      if (this.sliderVal === 100) { // 如果值为100，表示滑块滑倒最右侧，弹出提示框
        this.dialogVisible = true
      }
    },
    getValStart: function () { //  打印当前滑块的值
      console.log('当前值' + this.sliderValStart)
      if (this.sliderValStart === 100) { // 如果值为100，表示滑块滑倒最右侧，弹出提示框
        this.dialogVisibleStart = true
      }
    },
    cancleBtn: function () {
      console.log('点击取消')
      this.sliderVal = 0
      this.dialogVisible = false
    },
    cancleBtnStart: function () {
      console.log('点击取消')
      this.sliderValStart = 0
      this.dialogVisibleStart = false
    },
    succeBtn: function() { // 弹窗中的点击确定执行的事件
      this.submitBtn(2)
      this.sliderVal = 0
      this.dialogVisible = false
    },
    succeBtnStart: function() { // 弹窗中的点击确定执行的事件
      this.submitBtn(3)
      this.sliderValStart = 0
      this.dialogVisibleStart = false
    },
    handleCheckAllChange(val) { // 暂停机器人
      this.checkedStop = val ? this.stopOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) { // 暂停机器人
      let checkedCount = value.length
      this.checkAll = checkedCount === this.stopRobotName.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.stopRobotName.length
    },
    handleCheckAllChange2(val) { // 恢复暂停机器人
      this.checkedResumeRobot = val ? this.resumeOpt : []
      this.isIndeterminate2 = false
    },
    handleCheckedRemoChange(value) { // 恢复暂停机器人
      let checkedCount = value.length
      this.checkAll2 = checkedCount === this.resumeName.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.resumeName.length
    }

  }
}
</script>

<style scoped>
  .slider-con{
    width: 300px;
    margin-left: 30px;
  }
  .stopCon h1,.resumeCon h1{
    margin-top: 15px;
    font-size: 16px;
    font-weight: bold;
  }
</style>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .el-slider__bar{
    height: 20px;
  }
  .el-slider__runway{
    height: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
  }
  .el-dialog__footer{
    text-align: center;
  }
  .mainCon  .el-form-item__content{
    text-align: left;
  }
  .mainCon .resumeCon .el-button, .mainCon .stopCon .el-button{
    width: 100px;
    display: block;
    margin: 10px auto;
  }
  .mainCon  .el-col-12{
    text-align: left;
    padding: 0 20px;
  }
  .mainCon .el-checkbox{
    margin-top: 10px;
  }
  .mainCon .el-slider__button{
    border-radius: 0;
    background-color: #409EFF;
  }
  .mainCon .el-slider__button:hover{
    transform:scale(1);
    -webkit-transform:scale(1);
    -o-transform:scale(1);
    -moz-transform:scale(1);
    -ms-transform:scale(1);
  }
  .mainCon .el-slider__button-wrapper{
    width: 20px;
    height: 20px;
    top: 0;
    left: 3%;
  }
   .mainCon .el-checkbox{
    width: 80px;
    margin-left:0!important;
  } 
</style>