<template>
	<el-container>
		<el-header id="headCon">
      <el-col id="logo" class="clears">
        <img id="logoTag" class="fl" src="../assets/images/logo.png" alt="">
        <!-- <img id="logoLine" class="fl" src="../assets/images/head1.png" alt=""> -->
        <span id="titles" class="fl">BIXI Control Tower</span>
      </el-col>
			<el-col  class="userinfo">
				<!-- <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"> 欢迎您，{{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <ul class="clears userinfoCon">
          <li><img src="../assets/images/u549.png"  alt="" title="用户"><span :title="sysUserName">{{sysUserName}}</span></li>
          <!-- <li><i class="el-icon-edit"></i>{{sysUserName}}</li> -->
          <li  @click='changeLanguage'  title="切换语言"><img src="../assets/images/u547.png"  alt=""><span v-model='sysLanguage'>{{sysLanguage}}</span></li>
          <li  @click='logout'><img src="../assets/images/u545.png"  alt="" title="退出"><span>退出</span></li>
        </ul>
			</el-col>
		</el-header>
        <el-container>
            <el-aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <!--导航菜单-->
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
                        unique-opened router v-show="!collapsed">
                    <div v-for="(item,index) in menuList" :key="index">
                        <el-submenu :index="index + ''" v-if="item.subMenuVoList.length > 0" :key="index">
                            <template slot="title"><i :class="item.icon">{{item.icon}}</i>{{item.name}}</template>
                            <template v-for="child in item.subMenuVoList">
                              <el-menu-item :index="child.url" :key="child.url" :route="{'path':child.url}">{{child.name}}</el-menu-item>
                            </template>
                        </el-submenu>
                        <!--<el-menu-item v-if="item.leaf && item.children.length > 0" :index="item.children[0].path" :key="index"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>-->
                    </div>
                </el-menu>
            </el-aside>
            <el-main>
                <el-row type="flex" justify="space-between" align="middle">
                    <el-col :span="12">
                        <h1 class="title">{{$route.name}}</h1>
                    </el-col>
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                            {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                </el-row>
                <transition name="fade" mode="out-in">
                <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
	</el-container>
</template>

<script>
import axios from '../util/http'
export default {
  data () {
    return {
      axios,
      // sysName: 'DAIMLER Control Tower',
      collapsed: false,
      sysUserName: '',
      sysLanguage:'中文',
      sysUserAvatar: '',
      user: null,
      menuList: null,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created() {
    // console.log(this.$router)
    this.http()
  },
  methods: {
    // 获取用户菜单
    http() {
      this.axios.get('/menu', {}).then((res) => {
        console.log(res)
        this.menuList = res
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    handleopen () {
      // console.log('handleopen');
    },
    handleclose () {
      // console.log('handleclose');
    },
    handleselect: function (a, b) {},
    // 退出登录
    logout: function () {
      // var _this = this
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      }).then(() => {
        this.axios.get('logout', {}).then((res) => {
          if (res.errCode === 'S') {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('user')
            // _this.$router.push('/login')
            window.location.href = res.data.logOutUrl
          }
        })
      })
        .catch(() => {})
    },
    showMenu (i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        'submenu-hook-' + i
      )[0].style.display = status ? 'block' : 'none'
    },
    changeLanguage(){
      //中英文切换
      let that = this;
      console.log(that.sysLanguage);
      if (that.sysLanguage == '中文') {
        that.sysLanguage = 'English'
      }else if(that.sysLanguage == 'English'){
        that.sysLanguage = '中文'
      }
    }
  },
  mounted () {
    var user = sessionStorage.getItem('user')
    this.sysUserName = user
  }
}
</script>

<style scoped lang="less" scope>
  .el-container{
    height:100%;
  }
  .el-header{
    display: flex;
    justify-content:space-between;
    align-items:center;
    background: url("../assets/images/head.jpg") 0 0 repeat;
    height: 80px!important;
  }
  #logo #logoTag{
    width:300px;
    height: 40px;
    margin-top: 8px;
    margin-right:30px;
  }
/*  #logo #logoLine{
    width: 50px;
    height: 42px;
    margin-top: 12px;
    margin-right: 10px;
    margin: 8px 15px 0 30px;
  }*/
  #titles{
    color: #fff;
    font-size: 36px;
    font-weight: 700;
  }
  .userinfo{
    display: flex;
    justify-content: flex-end;
    width:500px;
  }
  .userinfo-inner{
    font-size: 18px;
    margin-right: 20px;
    cursor: pointer;
  }
  .el-dropdown{
    color:#fff;
  }
  .el-menu{
    height:100%;
  }
  .clears:after{
    display: block;
    content: '';
    clear: both;
    height: 0;
    visibility: hidden;
    overflow: hidden;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  /*头部样式*/
  #headCon {
    min-width:1200px;
  }
  #logo{
    width:680px;
  }
   #titles{
    width:350px;
   }
   .userinfoCon{
    margin-right:20px;
   }
   .userinfoCon li{
     float:left;
     color:#fff;
     margin-right:15px;
     font-size:16px;
   }
   .userinfoCon li img{
      vertical-align: middle;
      width:36px;
      height:36px;
      margin-right:5px;
   }
   .userinfoCon li span{
     cursor:pointer;
     letter-spacing:1px;
     -ms-text-overflow: ellipsis;
     text-overflow: ellipsis;
     -o-text-overflow: ellipsis;
     overflow: hidden;
     white-space: nowrap;
   }
  
   .userinfoCon li:last-child{
    margin-right:0px;
   }
</style>
