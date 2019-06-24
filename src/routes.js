import Login from './pages/Login.vue'
import LoginAlone1 from './pages/LoginAlone1.vue'
import NotFound from './pages/404.vue'
import Layout from './pages/Layout.vue'
let routerlist = [
  {
    path: 'robot',
    childen: {
      BaseToggle: '基本状态切换',
      Anm: '动作控制',
      Power: '电池和充电管理',
      Paths: '路径规划',
      Mover: '移动管理',
      Charts: '分解动作最优化'
    },
    icon: 'robot',
    name: '机器人管理'
  }
]
const routes = [
  {
    path: '/login',
    component: Login,
    name: '登录',
    hidden: true
  },
  {
    path: '/loginAlone',
    component: LoginAlone1,
    name: '登录',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '页面未找到',
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    icon: 'el-icon-setting',
    name: '看板',
    children: [
      {
        path: 'kanban/order',
        component: () => import('@/pages/plate/kanbanManage/Order'),
        name: '订单看板'
      },
      {
        path: 'kanban/robot',
        component: () => import('@/pages/plate/kanbanManage/RobotInfo'),
        name: '机器人信息'
      },
      {
        path: '/kanban/ws',
        component: () => import('@/pages/plate/kanbanManage/Workstation'),
        name: '工作站信息'
      },
      {
        path: '/kanban/charger',
        component: () => import('@/pages/plate/kanbanManage/Charging'),
        name: '充电桩信息'
      },
      {
        path: '/kanban/stat',
        component: () => import('@/pages/plate/kanbanManage/Statistical'),
        name: '统计信息'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '拣货管理',
    icon: 'el-icon-service',
    children: [
      {
        path: '/picking/stopReceive',
        component: () => import('@/pages/plate/pickManage/StopReceive'),
        name: '停止恢复接收任务'
      },
      {
        path: '/picking/createBatch',
        component: () => import('@/pages/plate/pickManage/CreateWavePick'),
        name: '创建波次'
      },
      {
        path: '/picking/taskRule',
        component: () => import('@/pages/plate/pickManage/TaskAllocation'),
        name: '任务分配规则'
      },
      {
        path: '/picking/batchHistory',
        component: () => import('@/pages/plate/pickManage/CreatWaveMRecord'),
        name: '波次历史记录'
      },
      {
        path: '/picking/print',
        component: () => import('@/pages/plate/pickManage/ManualPrint'),
        name: '手动打印'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '上货管理',
    icon: 'el-icon-service',
    children: [
      {
        path: '/binning/stopReceive',
        component: () => import('@/pages/plate/binManage/StopReceiveBinning'),
        name: '停止恢复接收任务'
      },
      {
        path: '/binning/createBatch',
        component: () => import('@/pages/plate/binManage/CreateWaveBinning'),
        name: '创建波次'
      },
      {
        path: '/binning/batchHistory',
        component: () => import('@/pages/plate/binManage/CreatWaveMRecordBinning'),
        name: '波次历史记录'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '调仓',
    icon: 'el-icon-service',
    children: [
      {
        path: '/relocManage/stopReceive',
        component: () => import('@/pages/plate/reloc/StopReceiveReloc'),
        name: '停止恢复接收任务'
      },
      {
        path: '/relocManage/createBatch',
        component: () => import('@/pages/plate/reloc/CreateWaveReloc'),
        name: '创建波次'
      },
      {
        path: '/relocManage/batchHistory',
        component: () => import('@/pages/plate/reloc/CreatWaveMReloc'),
        name: '波次历史记录'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '盘点',
    icon: 'el-icon-service',
    children: [
      {
        path: '/relocChecking/stopReceive',
        component: () => import('@/pages/plate/stock/StopReceiveStock'),
        name: '停止恢复接收任务'
      },
      {
        path: '/relocChecking/createBatch',
        component: () => import('@/pages/plate/stock/CreateWaveStock'),
        name: '创建波次'
      },
      {
        path: '/relocChecking/batchHistory',
        component: () => import('@/pages/plate/stock/CreatWaveMRecordStock'),
        name: '波次历史记录'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '用户管理',
    icon: 'el-icon-service',
    children: [
      {
        path: '/custom/menu',
        component: () => import('@/pages/plate/custom/CtMenuManage'),
        name: '菜单管理'
      },
      {
        path: '/custom/user',
        component: () => import('@/pages/plate/custom/CtUserManage'),
        name: '用户管理'
      },
      {
        path: '/custom/role',
        component: () => import('@/pages/plate/custom/CtRoleManage'),
        name: '角色管理'
      },
      {
        path: '/custom/resource',
        component: () => import('@/pages/plate/custom/CtResource'),
        name: '资源管理'
      },
      {
        path: '/custom/permssion',
        component: () => import('@/pages/plate/custom/CtPermssion'),
        name: '权限管理'
      },
      {
        path: '/custom/clientUser',
        component: () => import('@/pages/plate/custom/clientUser'),
        name: '客户端用户管理'
      },
      {
        path: '/custom/mapUser',
        component: () => import('@/pages/plate/custom/mapUser'),
        name: '地图用户管理'
      },
      {
        path: '/custom/department',
        component: () => import('@/pages/plate/custom/CtDepartment'),
        name: '部门管理'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '机器人管理',
    icon: 'el-icon-service',
    children: [
      {
        path: '/robotManage/stopReceive',
        component: () => import('@/pages/plate/robotManage/stopReceiveRobot'),
        name: '暂停/恢复机器人'
      },
      {
        path: '/robotManage/kidMoveContr',
        component: () => import('@/pages/plate/robotManage/kidMoveContr'),
        name: '动作控制'
      },
      {
        path: '/robotManage/masterData',
        component: () => import('@/pages/plate/robotManage/kidHomeData'),
        name: '机器人主数据'
      },
      {
        path: '/robotManage/kidInfo',
        component: () => import('@/pages/plate/robotManage/kidInfo'),
        name: '机器人信息'
      },
      {
        path: '/robotManage/errorMessage',
        component: () => import('@/pages/plate/robotManage/kidMoveContr'),
        name: '错误信息'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '货架管理',
    icon: 'el-icon-service',
    children: [
      {
        path: '/shelfManage/masterData',
        component: () => import('@/pages/plate/holderManageNew/holderHomeData'),
        name: '货架主数据'
      },
      {
        path: '/shelfManage/shelfCarry',
        component: () => import('@/pages/plate/holderManageNew/holderMove'),
        name: '货架搬运'
      },
      {
        path: '/shelfManage/shelfLocation',
        component: () => import('@/pages/plate/holderManageNew/shelfLocation'),
        name: '货位'
      },
      {
        path: '/shelfManage/shelfType',
        component: () => import('@/pages/plate/holderManageNew/holderSideType'),
        name: '货架位类型'
      },
      {
        path: '/shelfManage/shelfModify',
        component: () => import('@/pages/plate/holderManageNew/shelfModify'),
        name: '货架变更'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '充电桩管理',
    icon: 'el-icon-service',
    children: [
      {
        path: '/chargeManage/masterData',
        component: () => import('@/pages/plate/charageManage/charageHomePage'),
        name: '充电桩主数据'
      },
      {
        path: '/chargeManage/batteryManage',
        component: () => import('@/pages/plate/charageManage/charageChangeContr'),
        name: '电池和充电管理'
      },
      {
        path: '/chargeManage/changeStatus',
        component: () => import('@/pages/plate/charageManage/changeStatus'),
        name: '基本状态切换'
      },
      {
        path: '/chargeManage/errorMessage',
        component: () => import('@/pages/plate/charageManage/changeStatus'),
        name: '错误信息'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '工作站管理',
    icon: 'el-icon-service',
    children: [
      {
        path: '/workstationManage/masterData',
        component: () => import('@/pages/plate/workstationManage/workstationHomePage'),
        name: '工作站主数据'
      },
      {
        path: '/workstationManage/changeStatus',
        component: () => import('@/pages/plate/workstationManage/workstationChangeStatus'),
        name: '基础状态切换'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '经销商管理',
    icon: 'el-icon-service',
    children: [
      {
        path: '/dealerManage/dealer',
        component: () => import('@/pages/plate/dealerManage/dealer'),
        name: '经销商'
      },
      {
        path: '/dealerManage/route',
        component: () => import('@/pages/plate/dealerManage/route'),
        name: '路线'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: 'AdminstratorPage',
    icon: 'el-icon-service',
    children: [
      {
        path: '/adminstratorPage/kidMoveTask',
        component: () => import('@/pages/plate/adminstratorPage/createSimpleMoveTask'),
        name: '小车移动任务'
      },
      {
        path: '/adminstratorPage/shelfMoveTask',
        component: () => import('@/pages/plate/adminstratorPage/createLoadMoveTask'),
        name: '托货架移动任务'
      },
      {
        path: '/adminstratorPage/chargeTask',
        component: () => import('@/pages/plate/adminstratorPage/createChargeMoveTask'),
        name: '充电任务'
      },
      {
        path: '/adminstratorPage/floorQrcodeTask',
        component: () => import('@/pages/plate/adminstratorPage/crtFloorQrcodeTask'),
        name: '检查地图任务'
      },
      {
        path: '/adminstratorPage/shelfCheckTask',
        component: () => import('@/pages/plate/adminstratorPage/crtHolderQrcodeTask'),
        name: '货架检查任务'
      },
      {
        path: '/adminstratorPage/taskChange',
        component: () => import('@/pages/plate/adminstratorPage/createKidTaskChange'),
        name: '任务变更'
      },
      {
        path: '/adminstratorPage/mapChange',
        component: () => import('@/pages/plate/adminstratorPage/mapChange'),
        name: '地图编辑'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '审计管理',
    icon: 'el-icon-service',
    children: [
      {
        path: '/auditLog/auditLog',
        component: () => import('@/pages/plate/auditLog/auditLog'),
        name: '审计'
      }
    ]
  }
]
for (let i in routerlist) {
  console.log(i)
}

export default routes
