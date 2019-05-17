 <template>
     <div class="mainContainer">
          <!--工具条-->
         <el-col :span="24" class="toolbar conMarginLeft" >
             <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" :placeholder="$t('label.label10_02')"></el-input>
                   </el-form-item>
                   <el-form-item>
                     <el-button type="primary" v-on:click="getUsers">{{$t('message.msg1_68')}}</el-button>
                  </el-form-item>
                 <el-form-item>
                     <el-button type="primary" @click="addUser">{{$t('message.msg1_52')}}</el-button>
                  </el-form-item>
            </el-form>
       </el-col>


         <el-table :data="userInfoList" style="width: 100%" border>
            <el-table-column type="index"  :label="$t('label.label1_86')" width="180">
            </el-table-column>
            <el-table-column prop="name"  :label="$t('label.label10_02')" width="180">
            </el-table-column>
             <el-table-column prop="description"  :label="$t('label.label10_03')">
            </el-table-column>
             <el-table-column prop="available"  :label="$t('label.label10_04')" >
               <template slot-scope="scope">
                 {{$Enum.getEnumSelectByValue($Enum.EnumSelect().openStatus2,scope.row.available)}}
            </template>
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column :label="$t('message.msg1_53')" align="center" min-width="350">
 
                <template slot-scope="scope">
                     <el-button type="text" @click="modifyUser(scope.row)">{{$t('message.msg1_55')}}</el-button>
                        <el-button type="text" @click="checkDetail(scope.row)">{{$t('label.label10_05')}}</el-button>    
                     <el-button
                      size="mini"
                      :disabled="scope.$index===0"
                      @click="moveUp(scope.$index,scope.row)"><i class="el-icon-arrow-up"></i></el-button>
                    <el-button
                      size="mini"
                      :disabled="scope.$index===(userInfoList.length-1)"
                      @click="moveDown(scope.$index,scope.row)"><i class="el-icon-arrow-down"></i></el-button>
                      <!--<el-button type="info" size="mini" round v-if="scope.$index===0">默认</el-button>-->
                     <!--<el-button type="text" @click="deleteUser(scope.row)">删除</el-button>-->
                  </template>
             </el-table-column>
             <!--编辑与增加的页面-->
         </el-table>
          <!--新增界面-->
         <el-dialog :title="$t('message.msg1_75')" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="150px" class="demo-ruleForm login-container">
                  <el-form-item prop="name"  :label="$t('label.label10_02')">
                    <el-input type="text" v-model="addFormData.name"  :label="$t('label.label1_56')"></el-input>
                  </el-form-item>
                   <el-form-item prop="description"  :label="$t('label.label10_03')">
                    <el-input type="text" v-model="addFormData.description" ></el-input>
                  </el-form-item>
                   <el-form-item prop="available"  :label="$t('label.label10_04')">
                     <el-select  v-model="addFormData.available">
                        <el-option
                            v-for="item in $Enum.EnumSelect().openStatus2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={id:'',name:'',description:'',available:''}">{{$t('message.msg1_30')}}</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">{{$t('message.msg1_28')}}</el-button>
             </span>
          </el-dialog>
           <el-dialog
      :title="$t('message.msg1_75')"
      :visible.sync="dialogVisibleStart"
      width="90%" @close="loadData">
 <div class="tableDate mainContainer">
    
    <div class="table">
       <el-row>
            <el-card style="min-height: 20px">          
              <span>{{$t('label.label10_06')+':'+addFormData.name}}</span>
            </el-card>
          </el-row>
          <div class="button" style="width:8.5%;float:right;margin-top:60px;">
            <P><el-button class="el-icon-plus" @click.prevent="addRow()" ></el-button></P>
            <!--<p><el-button class="el-icon-minus" @click.prevent="delData()"></el-button></p>-->
            <p><el-button type="el-icon-minus" :disabled="submitDisabled" @click.prevent="submit">{{$t('message.msg1_34')}}</el-button></p>
          </div>
       <el-table
        :data="tableData"
        ref="table"
        tooltip-effect="dark"
        border
        stripe
        style="width: 90%"
        @selection-change='selectRow'>
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column :label="$t('label.label1_86')" width="40" align="center" >
          <template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template>
        </el-table-column>
         <el-table-column prop="name"  :label="$t('label.label10_02')" width="180">
            <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="description"  :label="$t('label.label10_03')">
           <template slot-scope="scope">
            <el-input v-model="scope.row.description"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="url" :label="$t('label.label10_07')" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.url"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="available" :label="$t('label.label10_04')">
          <template slot-scope="scope">
            <el-select v-model="scope.row.available">
                        <el-option
                            v-for="item in $Enum.EnumSelect().openStatus2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" 
                        > 
                        </el-option>
                        </el-select>
          </template>
        </el-table-column>
        <el-table-column :label="$t('message.msg1_53')" align="center" min-width="200">
                <template slot-scope="scope">
                     <el-button
                      size="mini"
                      :disabled="scope.$index===0"
                      @click="moveUpChild(scope.$index,scope.row)"><i class="el-icon-arrow-up"></i></el-button>
                    <el-button
                      size="mini"
                      :disabled="scope.$index===(tableData.length-1)"
                      @click="moveDownChild(scope.$index,scope.row)"><i class="el-icon-arrow-down"></i></el-button>
                      <!--<el-button type="info" size="mini" round v-if="scope.$index===0">默认</el-button>-->
                     <!--<el-button type="text" @click="deleteUser(scope.row)">删除</el-button>-->
                  </template>
             </el-table-column>
      </el-table>
    </div>
    </div>
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
          qs,
          axios,
          userInfoList: [],
          addFormReadOnly: true,
          dialogVisible: false,
          dialogVisibleStart:false,
          submitDisabled:true,
          isView: true,
          tableData: [{
          rowNum: 1,
          id:0,
          name: '',
          description: '',
          url: '',
          available:''
        }],
        selectlistRow: [],
          addFormData: {
            id: '',
            name: '',
            description: '',
            available: ''
          },
          rules2: {
            username: [{
              required: true,
              message: '用户名不能为空',
              trigger: 'blur'
            }],
            password: [{
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            }]
          },
          filters: {
            name: ''
          }
        }
      },
  mounted: function () {
        this.loadData()
      },
      methods: { //上移
      moveUp(index,row){
        var that = this;
        console.log('上移',index,row);
        console.log(that.userInfoList[index]);
        if (index > 0) {
          let upDate = that.userInfoList[index - 1];
          that.userInfoList.splice(index - 1, 1);
          that.userInfoList.splice(index,0, upDate);
          let result = []
          that.userInfoList[index].menuIndex=index+1
          that.userInfoList[index-1].menuIndex=index
          result.push(that.userInfoList[index])
          result.push(that.userInfoList[index-1])
          this.updateIndex(result);
        } else {
          alert('已经是第一条，不可上移');
        }
      }, //下移
      moveDown(index,row){
          var that = this;
          console.log('下移',index,row);
          if ((index + 1) === that.userInfoList.length){
            alert('已经是最后一条，不可下移');
          } else {
            console.log(index);
            let downDate = that.userInfoList[index + 1];
            that.userInfoList.splice(index + 1, 1);
            that.userInfoList.splice(index,0, downDate);
            let result = []
            that.userInfoList[index].menuIndex=index+1
            that.userInfoList[index+1].menuIndex=index+2
            result.push(that.userInfoList[index])
            result.push(that.userInfoList[index+1])
            this.updateIndex(result);
          }
        },
        moveUpChild(index,row){
        var that = this;
        console.log('上移',index,row);
        console.log(that.tableData[index]);
        let menuIndex = index
        if (index > 0) {
          let upDate = that.tableData[index - 1];
          that.tableData.splice(index - 1, 1);
          that.tableData.splice(index,0, upDate);
          let result = []
          that.tableData[index].menuIndex=menuIndex+1
          that.tableData[index-1].menuIndex=menuIndex
          result.push(that.tableData[index])
          result.push(that.tableData[index-1])
          this.updateIndex(result);
        } else {
          alert('已经是第一条，不可上移');
        }
      }, //下移
      moveDownChild(index,row){
          var that = this;
          console.log('下移',index,row);
          let menuIndex = index+1
          if ((index + 1) === that.tableData.length){
            alert('已经是最后一条，不可下移');
          } else {
            console.log(index);
            let downDate = that.tableData[index + 1];
            that.tableData.splice(index + 1, 1);
            that.tableData.splice(index,0, downDate);
            let result = []
            that.tableData[index].menuIndex=menuIndex
            that.tableData[index+1].menuIndex=menuIndex+1
            result.push(that.tableData[index])
            result.push(that.tableData[index+1])
            this.updateIndex(result);
          }
        },
        loadData() {
          let param = {'name': this.filters.name}
          axios.post('/custom/ctMenu/selectCtMenuList', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
          })
        },
        updateIndex(result) {
          let param = {'result': JSON.stringify(result)}
          console.log('result========' + JSON.stringify(param))
          axios.post('/custom/ctMenu/insertChildCtMenu', qs.stringify(param)).then((res) => {
            if (res.errCode === 'S') {
              //this.loadData()
            }
          })
        },
        getUsers() {
          this.loadData()
        },
        addUser() {
          this.addFormData = {
            id: '',
            name: '',
            description: '',
            available: ''
          }
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        checkDetail(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = false
          this.getChildMenuList(rowData.id)
          this.dialogVisibleStart = true
          //  this.addFormReadOnly = true;
        },
        getChildMenuList(arg){
          let param = {'parentId': arg}
          axios.post('/custom/ctMenu/selectChildCtMenuListByParentId', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.tableData = _data
          })
        },
        modifyUser(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
       // 获取表格选中时的数据
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
        resultData.parentId = this.addFormData.id
        this.axios.post('/custom/ctMenu/insertChildCtMenu', qs.stringify(resultData)).then(res => {
         if (res.errCode === 'S') {
            this.dialogVisibleStart=false
            this.loadData()
         }
       })
      },  
      // 增加行
      addRow () {
        var list = {
          rowNum: '',
          name: this.name,
          description: this.description,
          url: this.url,
          available:"1"
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
      deleteUser(rowData) {
          this.$alert('是否删除这条记录', '信息删除', {
            confirmButtonText: '确定',
            callback: action => {
              var params = {
                ctUserId: rowData.id
              }
              axios.post('/custom/ctUser/deleteCtUser', qs.stringify(params)).then((res) => {
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
              if (param.id) {
                axios.post('/custom/ctMenu/updateCtMenu', qs.stringify(result)).then((res) => {
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
                axios.post('/custom/ctMenu/insertCtMenu', qs.stringify(result)).then((res) => {
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
 </style>