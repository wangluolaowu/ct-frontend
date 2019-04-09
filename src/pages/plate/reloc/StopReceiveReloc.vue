<template>
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
             <el-button type="primary" :disabled = "closeIsDisabled"  @click="restReceive(0)">停止接收任务</el-button>
        </el-form-item>
     </el-form>
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
        search: {
          entityWorkstationId: 1,
          extWorkstationType: 'RELOC',
          activeType: '',
          workstationType: 5
        },
        websock: null,
        WS_ENTITY_WORKSTATION: []
      }
    },
    created() {     
     this.initWebSocket();
    },
    destroyed() {     
     this.websock.close() //离开路由之后断开websocket连接
    },
    mounted () {
      this.getReceiveStatus()
      this.getSelectValues()
    },
    methods: {
      initWebSocket(){ //初始化weosocket
        const wsuri = "ws://localhost:8080/pickManage/pickInfo/selectStopRestReceiveStatusExit"
        this.websock = new WebSocket(wsuri);   
        this.websock.onmessage = this.websocketonmessage;      
        this.websock.onopen = this.websocketonopen;       
        this.websock.onerror = this.websocketonerror;      
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据    
        this.websocketsend(qs.stringify(this.search))
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket()
      },
      websocketonmessage(e){ //数据接收
        //const redata = JSON.parse(e)
        console.log('redata==========='+JSON.parse(e.Data))
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
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
