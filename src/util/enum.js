import i18n from '../i18n/i18n'

const Enum = {

}
Enum.EnumSelect = function() {
  let EnumObj = {}
  let EnumObjEn = {}
  EnumObj = {
    pick_order_type_all: [
      {
        label: '全部',
        value: ''
      },
      {
        label: 'S',
        value: 'S'
      },
      {
        label: 'V',
        value: 'V'
      },
      {
        label: 'U',
        value: 'U'
      }
    ],
    modify_enable_flag: [
      {
        label: '提交未处理',
        value: 0
      },
      {
        label: 'RCS已更新',
        value: 1
      },
      {
        label: '后台数据已更新',
        value: 2
      }
    ],
    modify_enable_flag_all: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '提交未处理',
        value: 0
      },
      {
        label: 'RCS已更新',
        value: 1
      },
      {
        label: '后台数据已更新',
        value: 2
      }
    ],
    enable_flag: [
      {
        label: '锁点',
        value: 0
      },
      {
        label: '正常点',
        value: 1
      }
    ],
    direction_limit: [
      {
        label: 'x+',
        value: 8
      },
      {
        label: 'x-',
        value: 4
      },
      {
        label: 'y+',
        value: 2
      },
      {
        label: 'y-',
        value: 1
      }
    ],
    openStatus: [
      {
        label: '开启',
        value: true
      },
      {
        label: '禁用',
        value: false
      }
    ],
    openStatus3: [
      {
        label: '开启',
        value: 1
      },
      {
        label: '禁用',
        value: 0
      }
    ],
    openStatus3_all: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '开启',
        value: 1
      },
      {
        label: '禁用',
        value: 0
      }
    ],
    openStatus4: [
      {
        label: '停用',
        value: 10
      },
      {
        label: '启用',
        value: 20
      }
    ],
    openStatus2: [
      {
        label: '开启',
        value: '1'
      },
      {
        label: '禁用',
        value: '0'
      }
    ],
    Y_N_STATUS: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '是',
        value: 'Y'
      },
      {
        label: '否',
        value: 'N'
      }
    ],
    Y_N_STATUS2: [
      {
        label: '是',
        value: 'Y'
      },
      {
        label: '否',
        value: 'N'
      }
    ],
    workstation_status: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '小工作站',
        value: '1'
      },
      {
        label: '大工作站',
        value: '2'
      }
    ],
    workstation_status2: [
      {
        label: '小工作站',
        value: '1'
      },
      {
        label: '大工作站',
        value: '2'
      }
    ],
    WS_STATUS: [
      {
        label: 'INACTIVE',
        value: 10
      },
      {
        label: 'ACTIVE',
        value: 20
      }
    ],
    KM_KID_TASK_TYPE: [
      {
        label: '待命/STANDBY',
        value: 1
      },
      {
        label: '移动/SIMPLE_MOVE',
        value: 2
      },
      {
        label: '负载移动/LOAD_MOVE',
        value: 3
      },
      {
        label: '充电/CHARGE',
        value: 4
      },
      {
        label: '退出/QUIT',
        value: 5
      }
    ],
    KM_KID_TASK_STATUS: [
      {
        label: '新建/NEW',
        value: 1
      },
      {
        label: '已分配/ASSIGNED',
        value: 2
      },
      {
        label: '已接受/ACCEPTED',
        value: 3
      },
      {
        label: '已拒绝/REJECTED',
        value: 4
      },
      {
        label: '运行中/EXECUTING',
        value: 5
      },
      {
        label: '完成/COMPLETED',
        value: 6
      },
      {
        label: '已抓取/PULLED',
        value: 98
      },
      {
        label: '失败/FAILED',
        value: 99
      }
    ],
    KID_BATTERY_FAULT_CODE: [
      {
        label: '向下摄像头解码失败',
        value: 1
      },
      {
        label: '向上摄像头解码失败',
        value: 2
      },
      {
        label: '左轮电机报警',
        value: 3
      },
      {
        label: '右轮电机报警',
        value: 4
      },
      {
        label: '旋转电机报警',
        value: 5
      },
      {
        label: '电机通讯失败',
        value: 6
      },
      {
        label: '举升失败',
        value: 7
      },
      {
        label: '下降失败',
        value: 8
      },
      {
        label: '归零失败',
        value: 9
      },
      {
        label: '空车时检测到前方有障碍物',
        value: 10
      },
      {
        label: '载重时检测到前方有障碍物',
        value: 11
      },
      {
        label: '电机计数器错误',
        value: 12
      }
    ],
    KM_KID_STATUS: [
      {
        label: '已注册/REGISTERED',
        value: 1
      },
      {
        label: '待命/STANDBY',
        value: 2
      },
      {
        label: '任务已分配/TASK_ASSIGNED',
        value: 3
      },
      {
        label: '任务执行中/TASK_EXECUTING',
        value: 4
      },
      {
        label: '充电中/CHARGING',
        value: 5
      },
      {
        label: '充电完成/COMPL_CHARGE',
        value: 6
      },
      {
        label: 'SERVER重启',
        value: 90
      },
      {
        label: '维修中/MAINTAINING',
        value: 98
      },
      {
        label: '断线/OFFLINE',
        value: 99
      }
    ],
    TM_MOVE_TASK_RELEASE_LOAD: [
      {
        label: '放下',
        value: 1
      },
      {
        label: '举升',
        value: 2
      }
    ],
    pi_dest_object_side: [
      {
        label: '0',
        value: 0
      },
      {
        label: '1',
        value: 1
      },
      {
        label: '2',
        value: 2
      },
      {
        label: '3',
        value: 3
      },
      {
        label: '4',
        value: 4
      }
    ],
    pi_run_direction: [
      {
        label: 'X',
        value: 'X'
      },
      {
        label: 'Y',
        value: 'Y'
      }
    ],
    pi_task_type: [
      {
        label: '0',
        value: 0
      },
      {
        label: 'simple move',
        value: 2
      },
      {
        label: 'load move',
        value: 3
      },
      {
        label: 'charge move',
        value: 4
      }
    ],
    dml_Bin_Status: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '未创建波次',
        value: '1'
      },
      {
        label: '完成',
        value: '3'
      },
      {
        label: '在途',
        value: '4'
      },
      {
        label: '不在途',
        value: '5'
      }
    ],
    dml_Bin_Status_all: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '未创建波次',
        value: '1'
      },
      {
        label: '手工打印',
        value: '2'
      },
      {
        label: '完成',
        value: '3'
      },
      {
        label: '在途',
        value: '4'
      },
      {
        label: '不在途',
        value: '5'
      }
    ],
    page_size: [
      {
        label: '10',
        value: 10
      },
      {
        label: '20',
        value: 20
      },
      {
        label: '30',
        value: 30
      },
      {
        label: '50',
        value: 50
      },
      {
        label: '100',
        value: 100
      },
      {
        label: '200',
        value: 200
      }
    ],
    pi_pose_control_type: [
      {
        label: '移动',
        value: 'SIMPLE_MOVE'
      },
      {
        label: '举起',
        value: 'SIMPLE_MOVE1'
      },
      {
        label: '放下',
        value: 'SIMPLE_MOVE2'
      },
      {
        label: '旋转90',
        value: 'SIMPLE_MOVE3'
      },
      {
        label: '旋转180',
        value: 'SIMPLE_MOVE4'
      },
      {
        label: '旋转270',
        value: 'SIMPLE_MOVE5'
      },
      {
        label: '旋转360',
        value: 'SIMPLE_MOVE6'
      },
      {
        label: '旋转-90',
        value: 'SIMPLE_MOVE7'
      },
      {
        label: '旋转-180',
        value: 'SIMPLE_MOVE8'
      },
      {
        label: '旋转-270',
        value: 'SIMPLE_MOVE9'
      },
      {
        label: '旋转-360',
        value: 'SIMPLE_MOVE10'
      }
    ],
    CHARGE_STATUS: [
      {
        label: '在充电',
        value: 1
      },
      {
        label: '未充电',
        value: 2
      }
    ],
    CHARGE_STATUS_all: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '在充电',
        value: 1
      },
      {
        label: '未充电',
        value: 2
      }
    ],
    order_type: [
      {
        label: '全部',
        value: ''
      },
      {
        label: 'V',
        value: 'V'
      },
      {
        label: 'S',
        value: 'S'
      },
      {
        label: 'U',
        value: 'U'
      },
      {
        label: 'RELOC',
        value: 'RELOC'
      }
    ],
    order_type2: [
      {
        label: 'V',
        value: 'V'
      },
      {
        label: 'S',
        value: 'S'
      },
      {
        label: 'U',
        value: 'U'
      },
      {
        label: 'RELOC',
        value: 'RELOC'
      }
    ],
    order_type_route_all: [
      {
        label: '全部',
        value: ''
      },
      {
        label: 'V',
        value: 'V'
      },
      {
        label: 'S',
        value: 'S'
      },
      {
        label: 'V_SUB',
        value: 'V_SUB'
      }
    ],
    order_type_route: [
      {
        label: 'V',
        value: 'V'
      },
      {
        label: 'S',
        value: 'S'
      },
      {
        label: 'V_SUB',
        value: 'V_SUB'
      }
    ],
    side_Num_All: [
      {
        label: '全部',
        value: ''
      },
      {
        label: 'A',
        value: 1
      },
      {
        label: 'B',
        value: 3
      }
    ],
    side_Num: [
      {
        label: 'A',
        value: 1
      },
      {
        label: 'B',
        value: 3
      }
    ]
  }

  EnumObjEn = {
    modify_enable_flag: [
      {
        label: 'Unprocessed submission',
        value: 0
      },
      {
        label: 'RCS has been updated',
        value: 1
      },
      {
        label: 'Background data updated',
        value: 2
      }
    ],
    modify_enable_flag_all: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'Unprocessed submission',
        value: 0
      },
      {
        label: 'RCS has been updated',
        value: 1
      },
      {
        label: 'Background data updated',
        value: 2
      }
    ],
    enable_flag: [
      {
        label: 'Lock point',
        value: 0
      },
      {
        label: 'Normal point',
        value: 1
      }
    ],
    direction_limit: [
      {
        label: 'x+',
        value: 8
      },
      {
        label: 'x-',
        value: 4
      },
      {
        label: 'y+',
        value: 2
      },
      {
        label: 'y-',
        value: 1
      }
    ],
    openStatus: [
      {
        label: 'open',
        value: true
      },
      {
        label: 'closed',
        value: false
      }
    ],
    openStatus3: [
      {
        label: 'open',
        value: 1
      },
      {
        label: 'closed',
        value: 0
      }
    ],
    openStatus3_all: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'open',
        value: 1
      },
      {
        label: 'closed',
        value: 0
      }
    ],
    openStatus2: [
      {
        label: 'Open',
        value: '1'
      },
      {
        label: 'Closed',
        value: '0'
      }
    ],
    Y_N_STATUS: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'Yes',
        value: 'Y'
      },
      {
        label: 'No',
        value: 'N'
      }
    ],
    Y_N_STATUS2: [
      {
        label: 'Yes',
        value: 'Y'
      },
      {
        label: 'No',
        value: 'N'
      }
    ],
    workstation_status: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'Small workstation',
        value: '1'
      },
      {
        label: 'Large workstation',
        value: '2'
      }
    ],
    workstation_status2: [
      {
        label: 'Small workstation',
        value: '1'
      },
      {
        label: 'Large workstation',
        value: '2'
      }
    ],
    WS_STATUS: [
      {
        label: 'INACTIVE',
        value: 10
      },
      {
        label: 'ACTIVE',
        value: 20
      }
    ],
    KM_KID_TASK_TYPE: [
      {
        label: 'STANDBY',
        value: 1
      },
      {
        label: 'SIMPLE_MOVE',
        value: 2
      },
      {
        label: 'LOAD_MOVE',
        value: 3
      },
      {
        label: 'CHARGE',
        value: 4
      },
      {
        label: 'QUIT',
        value: 5
      }
    ],
    KM_KID_TASK_STATUS: [
      {
        label: 'NEW',
        value: 1
      },
      {
        label: 'ASSIGNED',
        value: 2
      },
      {
        label: 'ACCEPTED',
        value: 3
      },
      {
        label: 'REJECTED',
        value: 4
      },
      {
        label: 'EXECUTING',
        value: 5
      },
      {
        label: 'COMPLETED',
        value: 6
      },
      {
        label: 'PULLED',
        value: 98
      },
      {
        label: 'FAILED',
        value: 99
      }
    ],
    KID_BATTERY_FAULT_CODE: [
      {
        label: 'Failed to decode downward camera',
        value: 1
      },
      {
        label: 'Upward Camera Decoding Failed',
        value: 2
      },
      {
        label: 'Left wheel motor alarm',
        value: 3
      },
      {
        label: 'Right-wheel motor alarm',
        value: 4
      },
      {
        label: 'Rotating motor alarm',
        value: 5
      },
      {
        label: 'Failure of motor communication',
        value: 6
      },
      {
        label: 'Lift failure',
        value: 7
      },
      {
        label: 'Fall failure',
        value: 8
      },
      {
        label: 'Zeroing failure',
        value: 9
      },
      {
        label: 'Obstacles were detected in front of empty cars',
        value: 10
      },
      {
        label: 'Obstacles were detected in front of the load',
        value: 11
      },
      {
        label: 'Motor Counter Error',
        value: 12
      }
    ],
    KM_KID_STATUS: [
      {
        label: 'REGISTERED',
        value: 1
      },
      {
        label: 'STANDBY',
        value: 2
      },
      {
        label: 'TASK_ASSIGNED',
        value: 3
      },
      {
        label: 'TASK_EXECUTING',
        value: 4
      },
      {
        label: 'CHARGING',
        value: 5
      },
      {
        label: 'COMPL_CHARGE',
        value: 6
      },
      {
        label: 'SERVER restart',
        value: 90
      },
      {
        label: 'MAINTAINING',
        value: 98
      },
      {
        label: 'OFFLINE',
        value: 99
      }
    ],
    TM_MOVE_TASK_RELEASE_LOAD: [
      {
        label: 'Put down',
        value: 1
      },
      {
        label: 'Lift',
        value: 2
      }
    ],
    pi_dest_object_side: [
      {
        label: '0',
        value: 0
      },
      {
        label: '1',
        value: 1
      },
      {
        label: '2',
        value: 2
      },
      {
        label: '3',
        value: 3
      },
      {
        label: '4',
        value: 4
      }
    ],
    pi_run_direction: [
      {
        label: 'X',
        value: 'X'
      },
      {
        label: 'Y',
        value: 'Y'
      }
    ],
    pi_task_type: [
      {
        label: '0',
        value: 0
      },
      {
        label: 'simple move',
        value: 2
      },
      {
        label: 'load move',
        value: 3
      },
      {
        label: 'charge move',
        value: 4
      }
    ],
    dml_Bin_Status: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'No wave number created',
        value: '1'
      },
      {
        label: 'Complete',
        value: '3'
      },
      {
        label: 'On the way',
        value: '4'
      },
      {
        label: 'No way',
        value: '5'
      }
    ],
    dml_Bin_Status_all: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'No wave number created',
        value: '1'
      },
      {
        label: 'Manual printed',
        value: '2'
      },
      {
        label: 'Complete',
        value: '3'
      },
      {
        label: 'On the way',
        value: '4'
      },
      {
        label: 'No way',
        value: '5'
      }],
    page_size: [
      {
        label: '10',
        value: 10
      },
      {
        label: '20',
        value: 20
      },
      {
        label: '30',
        value: 30
      },
      {
        label: '50',
        value: 50
      },
      {
        label: '100',
        value: 100
      },
      {
        label: '200',
        value: 200
      }
    ],
    pi_pose_control_type: [
      {
        label: 'move',
        value: 'SIMPLE_MOVE'
      },
      {
        label: 'lift',
        value: 'SIMPLE_MOVE1'
      },
      {
        label: 'put down',
        value: 'SIMPLE_MOVE2'
      },
      {
        label: 'Rotate 90',
        value: 'SIMPLE_MOVE3'
      },
      {
        label: 'Rotate 180',
        value: 'SIMPLE_MOVE4'
      },
      {
        label: 'Rotate 270',
        value: 'SIMPLE_MOVE5'
      },
      {
        label: 'Rotate 360',
        value: 'SIMPLE_MOVE6'
      },
      {
        label: 'Rotate-90',
        value: 'SIMPLE_MOVE7'
      },
      {
        label: 'Rotate-180',
        value: 'SIMPLE_MOVE8'
      },
      {
        label: 'Rotate-270',
        value: 'SIMPLE_MOVE9'
      },
      {
        label: 'Rotate-360',
        value: 'SIMPLE_MOVE10'
      }
    ],
    CHARGE_STATUS: [
      {
        label: 'Charging',
        value: 1
      },
      {
        label: 'uncharged',
        value: 2
      }
    ],
    CHARGE_STATUS_all: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'Charging',
        value: 1
      },
      {
        label: 'uncharged',
        value: 2
      }
    ],
    order_type: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'V',
        value: 'V'
      },
      {
        label: 'S',
        value: 'S'
      },
      {
        label: 'U',
        value: 'U'
      },
      {
        label: 'RELOC',
        value: 'RELOC'
      }
    ],
    pick_order_type_all: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'S',
        value: 'S'
      },
      {
        label: 'V',
        value: 'V'
      },
      {
        label: 'U',
        value: 'U'
      }
    ],
    order_type2: [
      {
        label: 'V',
        value: 'V'
      },
      {
        label: 'S',
        value: 'S'
      },
      {
        label: 'U',
        value: 'U'
      },
      {
        label: 'RELOC',
        value: 'RELOC'
      }
    ],
    order_type_route_all: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'V',
        value: 'V'
      },
      {
        label: 'S',
        value: 'S'
      },
      {
        label: 'V_SUB',
        value: 'V_SUB'
      }
    ],
    order_type_route: [
      {
        label: 'V',
        value: 'V'
      },
      {
        label: 'S',
        value: 'S'
      },
      {
        label: 'V_SUB',
        value: 'V_SUB'
      }
    ],
    side_Num_All: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'A',
        value: 1
      },
      {
        label: 'B',
        value: 3
      }
    ],
    side_Num: [
      {
        label: 'A',
        value: 1
      },
      {
        label: 'B',
        value: 3
      }
    ]
  }

  if (i18n.locale === 'en') {
    return EnumObjEn
  }
  return EnumObj
}

Enum.getEnumSelectByValue = function(enumArray, enumKey) {
  if (enumKey === undefined || enumKey === null) {
    return ''
  }
  for (let i in enumArray) {
    let e = enumArray[i]
    if (e && ((e.value === enumKey) || (e.VALUE === enumKey))) {
      return e.label || e.LABEL
    }
  }

  return enumKey
}

export default Enum
