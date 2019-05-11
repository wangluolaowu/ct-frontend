// 引入element语言包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  message: {
    msg1_01: '拣货V单汇总',
    msg1_02: '拣货-V单',
    msg1_03: '拣货-S单汇总',
    msg1_04: '拣货-S单',
    msg1_05: '上架订单汇总',
    msg1_06: '上架',
    msg1_07: '调仓-拣出订单汇总',
    msg1_08: '调仓-拣出订单',
    msg1_09: '召唤货架汇总',
    msg1_10: '召唤货架',
    msg1_11: '盘点订单汇总',
    msg1_12: '盘点',
    msg1_13: '24小时订单完成统计',
    msg1_14: '故障机器人清单',
    msg1_15: '疑似异常机器人任务（执行时间超过3分钟）',
    msg1_16: '载货机器人疑似故障信息',
    msg1_17: '充电桩信息',
    msg1_18: '工作站信息',
    msg1_19: '统计信息',
    msg1_20: '最近30天订单完成情况',
    msg1_21: '最近30天订单收工打印的统计图',
    msg1_22: '拣货',
    msg1_23: '上货',
    msg1_24: '调仓',
    msg1_25: '订单流水',
    msg1_26: '导出全部',
    msg1_27: '导出excel',
    msg1_28: '确认',
    msg1_29: '清空',
    msg1_30: '取消',
    msg1_31: '调仓-拣出',
    msg1_32: '调仓-召唤货架',
    msg1_33: '提交全部',
    msg1_34: '提交',
    msg1_35: '任务分配',
    msg1_36: '工作站',
    msg1_37: '订单总行数',
    msg1_38: '路线总数',
    msg1_39: '播种墙',
    msg1_40: '订单行',
    msg1_41: '提示',
    msg1_42: '确认全部取消么？',
    msg1_43: '已提交完成',
    msg1_44: '任务分配已完成',
    msg1_45: '创建波次号',
    msg1_46: '创建波时间',
    msg1_47: '打印全部',
    msg1_48: '打印',
    msg1_49: '打印成功',
    msg1_50: '恢复接收任务',
    msg1_51: '停止接收任务',
    msg1_52: '新增',
    msg1_53: '操作',
    msg1_54: '查看详情',
    msg1_55: '修改',
    msg1_56: '删除',
    msg1_57: '下载数据集模板',
    msg1_58: '下载excel模板',
    msg1_59: '只能上传xls,xlsx文件',
    msg1_60: '点击上传',
    msg1_61: '系统查询总数',
    msg1_62: '当前选择总数',
    msg1_63: '货架数量',
    msg1_64: 'Bin位数量',
    msg1_65: '机器人全部信息',
    msg1_66: '拣货-U单',
    msg1_67: '拣货-U单汇总',
    msg1_68: '确定',
    msg1_69: '是否全部暂停',
    msg1_70: '是否全部恢复',
    msg1_72: '暂停部分机器人',
    msg1_73: '全选',
    msg1_74: '恢复机器人',
    msg1_75: '记录',
    msg1_76: '查询',
    msg1_77: '资源管理',
    msg1_78: '',
    msg1_79: '',
    msg1_80: '',
    msg1_81: '',
    'mes': '你好',
    'riqi': '日期',
    'text': '好好学习，天天向上'
  },
  placeholder: {
    enter: '用户名'
  },
  label: {
    label1_01: '系统接收订单行总数',
    label1_02: '当天已创建波次订单行',
    label1_03: '当天已完成订单行',
    label1_04: '当前未完成订单行',
    label1_05: '正在进行中订单行',
    label1_06: '瞬时平均效率（行/人/分钟）',
    label1_07: '完成百分比',
    label1_08: '预计完成时间(分钟)',
    label1_09: '工作站编号',
    label1_10: '播种墙数量',
    label1_11: '工作状态',
    label1_12: '当天已完成订单行总数',
    label1_13: '已分配且未完成的订单行数量',
    label1_14: '正在进行中订单行数量',
    label1_15: '蓝领已提交订单行',
    label1_16: '蓝领已提交未完成订单行',
    label1_17: '当天已提交订单行总数',
    label1_18: '蓝领本次已提交订单行总数',
    label1_19: '蓝领已提交且未完成的订单行总数',
    label1_20: '机器人编码',
    label1_21: '错误类型',
    label1_22: 'X轴位置',
    label1_23: 'Y轴位置',
    label1_24: '状态',
    label1_25: '任务编码',
    label1_26: '货架编码',
    label1_27: '电量（%）',
    label1_28: '最后更新日期',
    label1_29: '任务类型',
    label1_30: '任务状态',
    label1_31: '初始位置X',
    label1_32: '初始位置Y',
    label1_33: '实时位置X',
    label1_34: '实时位置Y',
    label1_35: '目标位置X',
    label1_36: '目标位置Y',
    label1_37: '创建日期',
    label1_38: '到达目的地后货架方向',
    label1_39: '到达目的地后货架边',
    label1_40: '货架总重量',
    label1_41: '是否举升',
    label1_42: '充电桩编码',
    label1_43: '是否启用',
    label1_44: '是否在线',
    label1_45: '方向',
    label1_46: '充电信息',
    label1_47: '正在充电机器人编码',
    label1_48: '是否接收任务',
    label1_49: '订单状态',
    label1_50: '路线',
    label1_51: '订单类型',
    label1_52: 'WIP号',
    label1_53: '客户',
    label1_54: 'WIP订单行',
    label1_55: '货位',
    label1_56: '页面大小',
    label1_57: 'ISP经销商',
    label1_58: 'ICT经销商',
    label1_59: '下单初始日期',
    label1_60: '下单截止日期',
    label1_61: '创建波次初始日期',
    label1_62: '创建波次截止日期',
    label1_63: '最后完成时间初始日期',
    label1_64: '最后完成时间截止日期',
    label1_65: '导入初始日期',
    label1_66: '导入截止日期',
    label1_67: '客户编码',
    label1_68: '客户名称',
    label1_69: '拣货记录',
    label1_70: '零件编码',
    label1_71: '下单时间',
    label1_72: '导入时间',
    label1_73: '创建波次时间',
    label1_74: '订单号',
    label1_75: '上架条码',
    label1_76: '上货标签打印开始日期',
    label1_77: '上货标签打印截止日期',
    label1_78: '零件描述',
    label1_79: '订单行',
    label1_80: '数量',
    label1_81: '上货标签打印时间',
    label1_82: '完成时间',
    label1_83: '货位号',
    label1_84: '完成时间开始日期',
    label1_85: '完成时间截止日期',
    label1_86: '序号',
    label1_87: '提交时间开始日期',
    label1_88: '提交时间截止日期',
    label1_89: '提交时间',
    label1_90: '盘点次数',
    label1_91: '用户ID',
    label1_92: '任务页',
    label1_93: '盘点数量',
    label1_94: '盘点用户',
    label1_95: '机器人状态',
    label1_96: '拣出',
    label1_97: '召唤货架',
    label1_98: '',
    label1_99: '',
    label1_100: '',
    label1_101: '',
    label1_102: '',
    label1_103: '',
    label1_104: '',
    label1_105: '',
    label1_106: '',
    label1_107: '',
    label1_108: '',
    label2_01: '订单类型S',
    label2_02: '订单类型V',
    label2_03: '订单类型U',
    label2_04: '全部',
    label2_05: '是',
    label2_06: '否',
    label2_07: '备货标签',
    label2_08: '子路线',
    label2_09: '货架位',
    label2_10: '任务分配',
    label2_11: '系统预分配原因',
    label2_12: '手工分配原因',
    label2_13: '初始日期',
    label2_14: '截止日期日期',
    label2_15: '手工打印',
    label2_16: '完成',
    label2_17: '不在途',
    label2_18: '打印初始日期',
    label2_19: '打印截止日期',
    label2_20: '选择打印工作站',
    label2_21: '拣货标签',
    label2_22: '工作站模式',
    label2_23: '算法',
    label2_24: '规则ID',
    label2_25: '规则描述',
    label2_26: '',
    label2_27: '',
    label2_28: '',
    label2_29: '',
    label2_30: '',
    label2_31: '',
    label2_32: '',
    label3_01: '波次号',
    label3_02: '任务波次订单行总数',
    label3_03: '上货标签号',
    label3_04: '订单总数',
    label3_05: '货架总数',
    label3_06: '货位总数',
    label3_07: '',
    label3_08: '',
    label4_01: 'Bin位号',
    label4_02: '用户名',
    label4_03: '配件编号数量',
    label4_04: '配件数量',
    label4_05: '任务页数量',
    label4_06: '',
    label5_01: '机器人编号',
    label5_02: '机器人服役里程',
    label5_03: '机器人软件版本号',
    label5_04: '机器人MAC地址',
    label5_05: '机器人设计版本号',
    label5_06: '机器人IP地址',
    label5_07: '机器人生产批次',
    label5_08: '机器人服役开始日期',
    label5_09: '机器人服役截止时间',
    label5_10: '最近一次维修开始日期',
    label5_11: '最近一次维修截止日期',
    label5_12: '最近一次保养开始日期',
    label5_13: '最近一次保养截止日期',
    label5_14: '机器人服役开始时间',
    label5_15: '最近一次保养时间',
    label5_16: '最近一次维修时间',
    label5_17: '注释',
    label5_18: '充电桩类型',
    label5_19: '动作类型',
    label5_20: '是否成功',
    label5_21: '错误描述',
    label6_01: '经销商代码',
    label6_02: '客户名称',
    label6_03: '路线',
    label6_04: '子路线',
    label7_01: '工作站软件版本号',
    label7_02: '工作站ID',
    label7_03: '工作站生产批次',
    label7_04: '工作站设计版本号 ',
    label7_05: '扫描枪型号',
    label7_06: '工作站服役开始时间',
    label7_07: '工作站电脑MAC地址',
    label7_08: '工作站IP地址',
    label7_09: '拍灯器个数',
    label7_10: '投影机型号',
    label7_11: '工作站服役起始日期',
    label7_12: '工作站服役截止时间',
    label7_13: '工作站服役时长',
    label8_01: '货架ID',
    label8_02: '货架编码',
    label8_03: '当前坐标X',
    label8_04: '当前坐标Y',
    label8_05: '货架净重',
    label8_06: '总重',
    label8_07: '货架类型',
    label8_08: '货架状态',
    label8_09: '货位编号',
    label8_10: '货位类型',
    label8_11: '区域',
    label8_12: '宽',
    label8_13: '高',
    label8_14: '深',
    label8_15: '',
    label8_16: '',
    label9_01: '充电桩状态',
    label9_02: '充电桩启停状态',
    label9_03: '规则编号',
    label9_04: '规则优先级',
    label9_05: '开始时间',
    label9_06: '结束时间',
    label9_07: '启用时间',
    label9_08: '最低电量(%)',
    label9_09: '最高电量(%)',
    label9_10: '充电桩ID',
    label9_11: '充电桩编号',
    label9_12: '充电桩设计版本号',
    label9_13: '充电桩生产批次',
    label9_14: '充电桩服役时长',
    label9_15: '充电桩电脑MAC地址',
    label9_16: '充电桩IP地址',
    label9_17: '额定电压范围',
    label9_18: '额定电流范围',
    label9_19: '当前电流范围',
    label9_20: '当前电压范围',
    label9_21: '当前最大电流',
    label9_22: '充电桩软件版本号',
    label9_23: '充电桩服役开始时间',
    label9_24: '充电桩服役截止时间',
    label9_25: '充电桩类型',
    label9_26: '充电桩服役启动时间',
    label9_27: '',
    label10_01: '密码',
    label10_02: '节点名称',
    label10_03: '节点描述',
    label10_04: '节点状态',
    label10_05: '子菜单管理',
    label10_06: '当前菜单节点名称',
    label10_07: '节点URL',
    label10_08: '权限名称',
    label10_09: '权限',
    label10_10: '权限-资源',
    label10_11: '当前权限:',
    label10_12: '请输入资源名称',
    label10_13: '可选资源',
    label10_14: '已选资源',
    label10_15: '登录名',
    label10_16: '资源',
    label10_17: '资源名称',
    label10_18: '角色',
    label10_19: '描述',
    label10_20: '成员管理',
    label10_21: '菜单管理',
    label10_22: '权限管理管理',
    label10_23: '角色-用户',
    label10_24: '当前角色',
    label10_25: '请输入用户名称',
    label10_26: '可选用户',
    label10_27: '已选用户',
    label10_28: '菜单-用户',
    label10_29: '角色-权限',
    label10_30: '请输入权限',
    label10_31: '可选',
    label10_32: '已选',
    label10_33: '',
    label10_34: '',
    label10_35: '',
    label10_36: '',
    label10_37: '',
    label10_38: '',
    label10_39: '',
    label4_08: '错误描述'
  },
  ...zhLocale
}

export default cn
