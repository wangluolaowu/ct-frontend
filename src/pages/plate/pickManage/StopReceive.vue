<template>
     <div class="mainCon">
       <el-form :inline="true" class="demo-form-inline conMarginLeft">
        <el-form-item :label="$t('label.label1_09')" >
          <el-select v-model="search.entityWorkstationId" @change="websocketToLogin" v-loading.fullscreen.lock="fullscreenLoading">
                  <el-option
                  v-for="item in WS_ENTITY_WORKSTATION"
                  :key="item.value"
                  :label="item.lable"
                  :value="item.value" 
                  > 
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('label.label1_51')" >
            <el-select  v-model="search.extWorkstationType" @change="websocketToLogin" v-loading.fullscreen.lock="fullscreenLoading">
                  <el-option label="V" value="V"></el-option>
                  <el-option label="S" value="S"></el-option>
                  <el-option label="U" value="U"></el-option>
              </el-select>
          </el-form-item>
          
          <el-form-item>
              <el-button  :type="openIsDisabledButton" :disabled = "openIsDisabled"   @click="restReceive(1)">{{$t('message.msg1_50')}}</el-button>
              <el-button  :type="closeIsDisabledButton"  :disabled = "closeIsDisabled"  @click="restReceive(0)">{{$t('message.msg1_51')}}</el-button>
          </el-form-item>
      </el-form>
     </div>
</template>
<script>
  import axios from '../../../util/http'
  import qs from 'qs'

  export default {
    data () {
      return {
        axios,
        fullscreenLoading: false,
        closeIsDisabled: false,
        openIsDisabled: false,
        openIsDisabledButton:'',
        closeIsDisabledButton:'',
        search: {
          entityWorkstationId: 1,
          extWorkstationType: 'S',
          activeType: '',
          workstationType: 2
        },
        WS_ENTITY_WORKSTATION: [],
        interval:''
      }
    },
    mounted () {
      this.getSelectValues()
    },
    created() {
      this.getReceiveStatus()     
      this.websocketToLogin()
    },
    destroyed() { 
     clearInterval(this.interval)
    },
    methods: {
       getConfigResult (res) {
      // 接收回调函数返回数据的方法
        if (res.errCode === 'S') {
            if (res.data.result === 20) {
              this.openIsDisabled = true
              this.openIsDisabledButton="info"
              this.closeIsDisabled = false
              this.closeIsDisabledButton="primary"
            } else {
              this.openIsDisabled = false
              this.openIsDisabledButton="primary"
              this.closeIsDisabled = true
              this.closeIsDisabledButton="info"
            }
        }
      },
      websocketToLogin () {
      // 【agentData：发送的参数；this.getConfigResult：回调方法】
        let This = this
        this.interval=window.setInterval(() => {
         setTimeout(This.$socketApi.sendSock(qs.stringify(this.search), this.getConfigResult), 0)
        }, 1000)
      
      },
      getSelectValues() {
        this.axios.get('pickManage/pickInfo/selectWsEntityWorkstation', {
          params: this.search
        }).then((res) => {
          if (res.errCode === 'S') {
            this.WS_ENTITY_WORKSTATION = res.data.result.map(item => {
              item.value = item.entityWorkstationId
              item.lable = item.entityWorkstationId
              return item
            })
          }
        })
      },
      restReceive (status) {
        let that = this
        this.search.activeType = status
        this.fullscreenLoading = true
        this.axios.get('pickManage/pickInfo/updateStopRestReceiveStatus', {
          params: this.search
        }).then((res) => {
          // console.log(res);
          if (res.errCode === 'S') {
            if (status === 1) { // 恢复任务
              this.openIsDisabled = true
              this.openIsDisabledButton="info"
              this.closeIsDisabled = false
              this.closeIsDisabledButton="primary"
            }
            if (status === 0) { // 停止任务
             this.openIsDisabled = false
              this.openIsDisabledButton="primary"
              this.closeIsDisabled = true
              this.closeIsDisabledButton="info"
            }
          }
        })
        this.fullscreenLoading = false
      },
      getReceiveStatus () {
        let that = this	
        this.fullscreenLoading = true	
        this.axios.get('pickManage/pickInfo/selectStopRestReceiveStatus', {	
          params: this.search	
        }).then((res) => {	
          // console.log(res);	
          if (res.errCode === 'S') {	
            if (res.data.result === 20) {	
              this.openIsDisabled = true
              this.openIsDisabledButton="info"
              this.closeIsDisabled = false
              this.closeIsDisabledButton="primary"
            } else {	
               this.openIsDisabled = false
              this.openIsDisabledButton="primary"
              this.closeIsDisabled = true
              this.closeIsDisabledButton="info"
            }	
          }	
        })	
        this.fullscreenLoading = false	
      }
    }
}
</script>
<style lang="less" scoped>
.activated{
 color: dimgrey;
}
.mainCon{
  margin-top: 20px;
}
</style>
<style>
.mainCon .el-form-item{
  margin-right: 20px;
}
.mainCon .el-form-item:last-child{
  margin-right: 0px;
}
.mainCon .el-button{
  margin-left: 15px;
}
.mainCon .el-button:first-child{
  margin-left: 0;
}

</style>
