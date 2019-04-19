const Enum = {
 
}
Enum.EnumSelect = function() {
  let EnumObj = {}
  EnumObj = {
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
        value: 1
      },
      {
        label: '完成',
        value: 3
      },
      {
        label: '在途',
        value: 4
      },
      {
        label: '不在途',
        value: 5
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
    ]
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
