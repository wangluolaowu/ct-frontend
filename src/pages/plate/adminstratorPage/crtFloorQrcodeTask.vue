 <template>
     <div>
         <h4 class="h2">Create Test QRCode Check Task</h4>
         <el-form :label-position="labelPosition" label-width="150px" :model="filters" class="main">
                  <el-form-item label="Retcode">
                    <span>{{filters.po_retcode}}</span>
                   </el-form-item>
                   <el-form-item label="Retmsg">
                     <span>{{filters.po_retmsg}}</span>
                    </el-form-item>
                     <el-form-item label="Kid Id">
                    <el-input v-model="filters.pi_kid_id" placeholder="Src PosX" style="width:400px"></el-input>
                    </el-form-item>
                      <el-form-item label="Min Holder"> 
                    <el-input v-model="filters.pi_min_holder" placeholder="Src PosY" style="width:400px"></el-input>
                    </el-form-item>
                     <el-form-item label="Max Holder">
                    <el-input v-model="filters.pi_max_holder" placeholder="Dest PosX" style="width:400px"></el-input>
                    </el-form-item>
                     <el-form-item label="Min X"> 
                    <el-input v-model="filters.pi_min_x" placeholder="Src PosY" style="width:400px"></el-input>
                    </el-form-item>
                     <el-form-item label="Max X">
                    <el-input v-model="filters.pi_max_x" placeholder="Dest PosX" style="width:400px"></el-input>
                    </el-form-item>
                     <el-form-item label="Min Y">
                    <el-input v-model="filters.pi_min_y" placeholder="Dest PosY" style="width:400px"></el-input>
                    </el-form-item>
                     <el-form-item label="Max Y">
                    <el-input v-model="filters.pi_max_y" placeholder="Dest PosY" style="width:400px"></el-input>
                    </el-form-item>
                   <el-form-item>
                     <el-button type="primary" v-on:click="submit">提交</el-button>
                  </el-form-item>
            </el-form>
     </div> 
 </template>
 <script>
 import axios from '../../../util/http'
 import qs from 'qs'
 export default {
      data() {
        return {
          axios,
          qs,
          labelPosition:'right',
          filters: {
            po_retcode: '',
            po_retmsg: '',
            pi_kid_id: '',
            pi_min_holder:'',
            pi_max_holder:'',
            pi_min_x: '',
            pi_max_x: '',
            pi_min_y:'',
            pi_max_y: ''
          },
          MD_MAP_DIRECTION_LIMIT:[]
        }
      },
  mounted: function () {
  },
  methods: {
        submit() {
           this.$confirm('确认提交吗?', '提示', {
          // type: 'warning'
          }).then(() => {
              let result = this.filters
              delete result.po_retcode
              delete result.po_retmsg
              delete result.po_move_task_id
              let param = {'params': JSON.stringify(result)}
              axios.post('/adminPageManage/createTask/crtFloorQrcodeTask', qs.stringify(param)).then((res) => {
                this.filters = res.data
                this.$message.warning('提交成功')
              })
          }).catch(() => {})
        }
      }
    }
 </script>
 <style lang="less" scoped>
 .h2{
    margin:10px 0;
    font-size: 18px;
    font-weight: bold;
  }
 </style>
     