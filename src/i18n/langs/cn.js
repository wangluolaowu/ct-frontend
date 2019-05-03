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
    msg1_66: '',
    msg1_67: '',
    msg1_68: '',
    msg1_69: '',
    msg1_70: '',
    msg1_72: '',
    msg1_73: '',
    msg1_74: '',
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
    label1_96: '',
    label1_97: '',
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
    label4_07: '',
    label4_08: ''
  },
  ...zhLocale
}

export default cn
