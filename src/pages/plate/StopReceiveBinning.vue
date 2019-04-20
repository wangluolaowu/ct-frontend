<template>
     <div class="mainContainer conMarginLeft">
       <el-form :inline="true" class="demo-form-inline">
         <el-form-item label="工作站编号：">
           <el-select v-model="search.entityWorkstationId" @change="getReceiveStatus" v-loading.fullscreen.lock="fullscreenLoading">
                  <el-option
                  v-for="item in WS_ENTITY_WORKSTATION"
                  :key="item.value"
                  :label="item.lable"
                  :value="item.value" 
                  > 
                </el-option>
            </el-select>
          </el-form-item>    
          <el-form-item>
               <el-button type="primary" :disabled = "openIsDisabled"   @click="restReceive(1)">恢复接收任务</el-button>
               <el-button type="info" :disabled = "closeIsDisabled"  @click="restReceive(0)">停止接收任务</el-button>
          </el-form-item>
       </el-form>
     </div>
</template>
<script>
  import axios from '../../util/http'
  import qs from 'qs'
  export default {
    data () {
      return {
        axios,
        fullscreenLoading: false,
        closeIsDisabled: false,
        openIsDisabled: false,
        search: {
          entityWorkstationId: 1,
          extWorkstationType: 'BIN',
          activeType: '',
          workstationType: 1
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
              this.closeIsDisabled = false
            } else {
              this.openIsDisabled = false
              this.closeIsDisabled = true
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
              that.openIsDisabled = true
              that.closeIsDisabled = false
            }
            if (status === 0) { // 停止任务
              that.openIsDisabled = false
              that.closeIsDisabled = true
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
              that.openIsDisabled = true	
              that.closeIsDisabled = false	
            } else {	
              that.openIsDisabled = false	
              that.closeIsDisabled = true	
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
</style>
