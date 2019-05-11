<template>
     <div class="mainContainer">
       <el-form :inline="true" class="demo-form-inline conMarginLeft">
         <el-form-item :label="$t('label.label1_09')" >
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
          <el-form-item :label="$t('label.label1_51')" >
            <el-select  v-model="search.extWorkstationType" @change="websocketToLogin" v-loading.fullscreen.lock="fullscreenLoading">
                  <el-option :label="$t('label.label1_96')" value="RELOC"></el-option>
                  <el-option :label="$t('label.label1_97')" value="CALL_SHELF"></el-option>
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
        qs,
        fullscreenLoading: false,
        closeIsDisabled: false,
        openIsDisabled: false,
         openIsDisabledButton:'',
        closeIsDisabledButton:'',
        search: {
          entityWorkstationId: '',
          extWorkstationType: 'RELOC',
          activeType: '',
          workstationType: 5
        },
        websock: null,
        WS_ENTITY_WORKSTATION: [],
        interval:''
      }
    },
    mounted () {
      this.getSelectValues()
    },
    created() {     
      this.websocketToLogin()
      this.getReceiveStatus()
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
            this.WS_ENTITY_WORKSTATION = res.data.result.map((item, j)=> {
              if(j === 0){
                this.search.entityWorkstationId = item.entityWorkstationId
              }
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
      }, // 刚进入页面，获取当前任务状态
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
</style>
