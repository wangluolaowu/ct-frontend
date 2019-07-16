 <template>
     <div class="mainContainer">
         <h4 class="h2">Create Test Load Move Task</h4>
         <el-form :label-position="labelPosition" label-width="150px" :model="filters" class="main">
                  <el-form-item label="Retcode">
                    <span>{{filters.po_retcode}}</span>
                   </el-form-item>
                   <el-form-item label="Retmsg">
                     <span>{{filters.po_retmsg}}</span>
                    </el-form-item>
                    <el-form-item label="Move Task Id">
                      <span>{{filters.po_move_task_id}}</span>
                    </el-form-item>
                     <el-form-item label="Src PosX">
                         <span>{{filters.pi_src_pos_x}}</span>
                    </el-form-item>
                     <el-form-item label="Src PosY"> 
                         <span>{{filters.pi_src_pos_y}}</span>
                    </el-form-item>
                     <el-form-item label="Dest PosX">
                    <el-input v-model="filters.pi_dest_pos_x" placeholder="Dest PosX" style="width:400px"></el-input>
                    </el-form-item>
                     <el-form-item label="Dest PosY">
                    <el-input v-model="filters.pi_dest_pos_y" placeholder="Dest PosY" style="width:400px"></el-input>
                    </el-form-item>
                     <el-form-item label="Holder Id"> 
                    <el-input v-model="filters.pi_holder_id" placeholder="Holder Id" style="width:400px"></el-input>
                    </el-form-item>
                     <el-form-item label="Kid incharge"> 
                    <el-input v-model="filters.pi_kid_incharge" placeholder="Kid incharge" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="Dest Holder Side"> 
                        <el-select placeholder="Dest Holder Side" v-model="filters.pi_dest_object_side">
                        <el-option
                            v-for="item in $Enum.EnumSelect().pi_dest_object_side"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Dest Map Direction">
                        <el-select placeholder="Dest Map Direction" v-model="filters.pi_dest_object_direction">
                        <el-option
                            v-for="item in MD_MAP_DIRECTION_LIMIT"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="Release Load Flag"> 
                         <el-select placeholder="Release Load Flag" v-model="filters.pi_release_load_flag">
                          <el-option
                            v-for="item in TM_MOVE_TASK_RELEASE_LOAD"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                          > 
                        </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="beachhead posx">
                    <el-input v-model="filters.pi_beachhead_pos_x" placeholder="beachhead posx" style="width:400px"></el-input>
                    </el-form-item>
                     <el-form-item label="beachhead posy">
                    <el-input v-model="filters.pi_beachhead_pos_y" placeholder="beachhead posy" style="width:400px"></el-input>
                    </el-form-item>
                   <el-form-item>
                     <el-button type="primary" v-on:click="submit">{{$t('message.msg1_34')}}</el-button>
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
            po_move_task_id: '',
            pi_src_pos_x: 0,
            pi_src_pos_y: 0,
            pi_dest_pos_x:'',
            pi_dest_pos_y: '',
            pi_holder_id: '',
            pi_kid_incharge:'',
            pi_dest_object_side:0,
            pi_dest_object_direction:'',
            pi_release_load_flag:1,
            pi_beachhead_pos_x:0,
            pi_beachhead_pos_y:0,
            pi_created_by:'MTR',
            pi_object_gross_weight:0
          },
          MD_MAP_DIRECTION_LIMIT:[],
          TM_MOVE_TASK_RELEASE_LOAD:[]
        }
      },
  mounted: function () {
      this.getEnumSelectValues()
  },
  methods: {
        getEnumSelectValues() {
            this.axios.get('common/enum/selectEnumList', {
                params: 'test'
            }).then((res) => {
                if (res.errCode === 'S') {
                    res.data.result.map(item => {
                    if (item.lookupType === 'MD_MAP_DIRECTION_LIMIT') {
                    item.value = item.lookupValueNum
                    item.label = item.meaning||item.lookupValueNum
                    this.MD_MAP_DIRECTION_LIMIT.push(item)
                    }
                    if (item.lookupType === 'TM_MOVE_TASK_RELEASE_LOAD') {
                    item.value = item.lookupValueNum
                    item.label = item.meaning||item.lookupValueNum
                    this.TM_MOVE_TASK_RELEASE_LOAD.push(item)
                    }
                    return item
                })
                }
            })
       },
        submit() {
           this.$confirm('确认提交吗?', '提示', {
          // type: 'warning'
          }).then(() => {
              let result = this.filters
              delete result.po_retcode
              delete result.po_retmsg
              delete result.po_move_task_id
              let param = {'params': JSON.stringify(result)}
              axios.post('/adminpage/createTask/createLoadMoveTask', qs.stringify(param)).then((res) => {
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
     