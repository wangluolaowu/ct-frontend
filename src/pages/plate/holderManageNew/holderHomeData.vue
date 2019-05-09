 <template>
     <div class="mainContainer">
     <el-form class="demo-form-inline selectedCont clears" label-width="200px">
        <el-row>
        <el-col :span="8">
            <el-form-item label="货架ID" >
              <el-input v-model="searchBIN.holderId" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="货架编码" >
              <el-input v-model="searchBIN.holderNum" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
         <el-row>
        <el-col :span="8">
           <el-form-item label="当前坐标X" >
              <el-input v-model="searchBIN.posX" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="当前坐标Y" >
              <el-input v-model="searchBIN.posY" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
       <el-row>
        <el-col :span="8">
           <el-form-item label="毛重" >
              <el-input v-model="searchBIN.grossWeight" style="width:200px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">  
            <el-form-item label="总重" >
              <el-input v-model="searchBIN.totalWeight" style="width:200px"></el-input>
            </el-form-item>
        </el-col>   
        </el-row>
        <el-row>
        <el-col :span="8">
           <el-form-item label="货架类型" >
              <el-input v-model="searchBIN.holderModelNumber" style="width:200px"></el-input>
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
        <el-col :span="5" >
          <el-form-item>  
              <el-button type="primary" @click="loadData">查询</el-button> 
          </el-form-item>
          </el-col>
           <el-col :span="5">
            <el-form-item>
                <el-button type="primary" @click="restData">清空</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
                <el-button type="primary" @click="add">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
         <el-table :data="userInfoList" style="width: 100%" border  min-height="100">
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
            <el-table-column prop="holderId" label="货架ID" min-width="200">
            </el-table-column>
             <el-table-column prop="holderNum" label="货架编码" min-width="200">
            </el-table-column>
             <el-table-column prop="holderModelNumber" label="货架类型" min-width="200">
            </el-table-column>
            <el-table-column prop="holderModelNumber" label="货架类型" min-width="200">
            </el-table-column>
             <el-table-column prop="posX" label="当前坐标X" min-width="200">
            </el-table-column>
             <el-table-column prop="posY" label="当前坐标Y" min-width="200">
            </el-table-column>
             <el-table-column prop="grossWeight" label="毛重" min-width="200">
            </el-table-column>
             <el-table-column prop="totalWeight" label="总重" min-width="200">
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column label="操作"  min-width="350" fixed="right">
 
                <template slot-scope="scope">
 
                     <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button>
 
                     <el-button type="text" @click="modifyInfo(scope.row)">修改</el-button>
  
                     <!--<el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>-->
                  </template>
             </el-table-column>
             <!--编辑与增加的页面-->
         </el-table>
           <el-pagination v-if="searchBIN.totalRows>0" class="pagination" background @current-change="handleCurrentChangeBIN"
                        :current-page.sync="searchBIN.currentPage" :page-size="searchBIN.pageSize" :page-sizes="[searchBIN.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="searchBIN.totalRows">
          </el-pagination>
          <!--新增界面-->
         <el-dialog title="记录" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData"  ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item prop="holderId" label="货架ID">
                    <el-input type="text" v-model="addFormData.holderId" placeholder="货架ID" :disabled="keyDisabled"></el-input>
                  </el-form-item>
                   <el-form-item prop="holderNum" label="货架编码">
                    <el-input type="text" v-model="addFormData.holderNum"  placeholder="货架编码"></el-input>
                  </el-form-item>
                   <el-form-item prop="holderModelNumber" label="货架类型">
                    <el-input type="text" v-model="addFormData.holderModelNumber"  placeholder="货架类型"></el-input>
                  </el-form-item>
                   <el-form-item prop="posX" label="当前坐标X">
                    <el-input type="text" v-model="addFormData.posX" placeholder="当前坐标X" :disabled="true"></el-input>
                  </el-form-item>
                   <el-form-item prop="posY" label="当前坐标Y">
                    <el-input type="text" v-model="addFormData.posY" placeholder="当前坐标Y" :disabled="true"></el-input>
                  </el-form-item>
                   <el-form-item prop="grossWeight" label="毛重">
                    <el-input type="text" v-model="addFormData.grossWeight" placeholder="毛重"></el-input>
                  </el-form-item>
                   <el-form-item prop="totalWeight" label="总重">
                    <el-input type="text" v-model="addFormData.totalWeight" placeholder="总重" :disabled="true"></el-input>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={holderId:'',holderNum:'',holderModelNumber:'',posX:'',posY:'',grossWeight:'',totalWeight:''}">取 消</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">确 定</el-button>
             </span>
          </el-dialog>
         <el-dialog
          title="编辑"
          :visible.sync="dialogVisibleStart"
          width="90%" @close="loadData">
         <div class="tableDate mainContainer">
          <div class="table">
          <div class="button" style="width:8.5%;float:right;margin-top:60px;">
            <P><el-button class="el-icon-plus" @click.prevent="addRow()" ></el-button></P>
            <!--<p><el-button class="el-icon-minus" @click.prevent="delData()"></el-button></p>-->
            <p><el-button type="el-icon-minus" :disabled="submitDisabled" @click.prevent="submit">提交</el-button></p>
          </div>
         <el-table
          :data="tableData"
          ref="table"
          tooltip-effect="dark"
          border
          stripe
          style="width: 90%"
          @selection-change='selectRow' :rules="rulesAdd">
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column label="序号"  type="index" width="40" align="center"></el-table-column>
         <el-table-column prop="pi_holder_id" label="货架ID" width="180">
            <template slot-scope="scope">
            <el-input v-model="scope.row.pi_holder_id"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="pi_holder_num" label="货架编码">
           <template slot-scope="scope">
            <el-input v-model="scope.row.pi_holder_num"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="pi_orig_pos_x" label="当前坐标X" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.pi_orig_pos_x"></el-input>
          </template>
        </el-table-column>
       <el-table-column prop="pi_orig_pos_y" label="当前坐标Y" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.pi_orig_pos_y"></el-input>
          </template>
        </el-table-column>
       </el-table>
      </div>
     </div>
    </el-dialog>
     <el-dialog
      title="提示"
      :visible.sync="dialogresult"
      width="40%" @close="confirm">
       <el-table
        :data="tableDataDialog"
        border
        :row-class-name="tableRowClassName"
        style="width: 95%" @close='confirm'>
         <el-table-column prop="pi_holder_id" label="货架ID" align="center">
        </el-table-column>
         <el-table-column prop="pi_holder_num" label="货架编码" align="center">
        </el-table-column>
        <el-table-column prop="isSucess" label="是否成功" align="center">
        </el-table-column>
        <el-table-column prop="po_retmsg" label="错误描述" align="center">
        </el-table-column>
       </el-table>
       <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">确 定</el-button>
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
          keyDisabled:false,
          dialogVisibleStart:false,
          submitDisabled:true,
          dialogresult:false,
          tableDataDialog:[],
          isView: true,
          addFormData: {
            holderId:'',
            holderNum:'',
            holderModelNumber:'',
            posX:'',
            posY:'',
            grossWeight:'',
            totalWeight:''
          },
          searchBIN: {
            holderId:'',
            holderNum:'',
            holderModelNumber:'',
            posX:'',
            posY:'',
            grossWeight:'',
            totalWeight:'',
            currentPage:1,
            pageSize:50,
            totalRows:-1
          },
          tableData: [{
          rowNum: 1,
          pi_holder_id:'',
          pi_holder_num: '',
          pi_orig_pos_x: '',
          pi_orig_pos_y: ''
        }],
          addType:false,
          rulesAdd: {
            pi_holder_id: [{
              required: true,
              message: '货架ID不能为空',
              trigger: 'blur'
            }],
            pi_holder_num: [{
              required: true,
              message: '货架编码不能为空',
              trigger: 'blur'
            }],
            pi_orig_pos_x: [{
              required: true,
              message: '当前位置X不能为空',
              trigger: 'blur'
            }],
            pi_orig_pos_y: [{
              required: true,
              message: '当前位置Y不能为空',
              trigger: 'blur'
            }]
          }
        }
      },
  mounted: function () {
        this.loadData()
      },
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (row.isSucess === '否') {
            return 'warning-row'
          } 
          return 'success-row'
        },
        confirm(){
           this.tableData=[]
           this.dialogresult = false
           this.dialogVisibleStart = false
           this.loadData()
           this.addRow()
           
       },
        handleChangeTime(){

        },
        handleCurrentChangeBIN(val){
            this.searchBIN.currentPage = val;
            this.loadData()
        },
        restData(){
          let currentPageTemp = this.searchBIN.currentPage
          let pageSizeTemp = this.searchBIN.pageSize
          let totalRowsTemp = this.searchBIN.totalRows
            this.searchBIN = {
            holderId:'',
            holderNum:'',
            holderModelNumber:'',
            posX:'',
            posY:'',
            grossWeight:'',
            totalWeight:'',
            currentPage:currentPageTemp,
            pageSize:pageSizeTemp,
            totalRows:totalRowsTemp
          }
        }, 
        loadData() {
          let param = {'params': JSON.stringify(this.searchBIN)}
          axios.post('/holderManage/homePage/selectHolderListBySearch', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
            this.searchBIN.totalRows = res.data.totalRows
          })
        },
        add() {
          this.dialogVisibleStart = true
          // this.addFormReadOnly = false;
        }, // 获取表格选中时的数据
       selectRow (val) { 
        this.selectlistRow = val
        if(this.selectlistRow.length > 0){
            this.submitDisabled=false
        }else{
            this.submitDisabled=true
        }
      },
       submit(){
        let resultData = {}
        resultData.result=JSON.stringify(this.selectlistRow)
        axios.post('holderManage/homePage/insertHolderInfo', qs.stringify(resultData)).then(res => {
         if (res.errCode === 'S') {
            if (res.errCode === 'S') {
            this.tableDataDialog = res.data.result
            this.dialogresult=true
           }else{
            this.dialogresult=true
          }
         }
       })
      },  
      // 增加行
      addRow () {
        var list = {
          rowNum: '',
          pi_holder_id:  this.pi_holder_id,
          pi_holder_num: this.pi_holder_num,
          pi_orig_pos_x: this.pi_orig_pos_x,
          pi_orig_pos_y: this.pi_orig_pos_y
        }
        this.tableData.unshift(list)
      },
      // 删除方法
      // 删除选中行
      delData () {
        for (let i = 0; i < this.selectlistRow.length; i++) {
          let val = this.selectlistRow
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
          // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          val.forEach((val, index) => {
            this.tableData.forEach((v, i) => {
              if (val.rowNum === v.rowNum) {
                // i 为选中的索引
                this.tableData.splice(i, 1)
              }
            })
          })
        }
        // 删除完数据之后清除勾选框
        this.$refs.tableData.clearSelection()
      },
        checkDetail(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = false
          this.dialogVisible = true
          //  this.addFormReadOnly = true;
        },
        modifyInfo(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = true
          this.keyDisabled = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        deleteInfo(rowData) {
          this.$alert('是否删除这条记录', '信息删除', {
            confirmButtonText: '确定',
            callback: action => {
              var params = {
                holderId: rowData.holderId
              }
              axios.post('/holderManage/homePage/deleteHolderInfo', qs.stringify(params)).then((res) => {
                console.info(res)
                if (res.errCode === 'S') {
                  this.$message({
                    type: 'info',
                    message: `已删除`
                  })
                } else {
                  this.$message({
                    type: 'info',
                    message: `删除失败`
                  })
                }
                this.loadData()
              })
            }
          })
        }, // 增加一条记录
        addSubmit() {
        // 先判断表单是否通过了判断
          this.$refs.addFormData.validate((valid) => {
            // 代表通过验证 ,将参数传回后台
            if (valid) {
              let param = Object.assign({}, this.addFormData)
              let result = {}
              result.result = JSON.stringify(param)   
              if (!this.addType) {
                axios.post('/holderManage/homePage/updateHolderInfo', qs.stringify(result)).then((res) => {
                  if (res.errCode === 'S') {
                    this.$message({
                      type: 'info',
                      message: '修改成功'
                    })
                    this.loadData()
                  } else {
                    this.$message({
                      type: 'info',
                      message: '修改失败'
                    })
                  }
                  this.dialogVisible = false
                })
              } else {
                axios.post('/holderManage/homePage/insertHolderInfo', qs.stringify(result)).then((res) => {
                  if (res.errCode === 'S') {
                    this.$message({
                      type: 'info',
                      message: '添加成功'
                    })
                    this.loadData()
                  } else {
                    this.$message({
                      type: 'info',
                      message: '添加失败'
                    })
                  }
                  this.dialogVisible = false
                })
              }
               this.addType = false
               this.loadData()
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
     .el-table .warning-row {
         background: oldlace;
     }

     .el-table .success-row {
         background: #f0f9eb;
     }
 </style>