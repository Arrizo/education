const Warehouse = resolve => require(['@/containers/Warehouse'], resolve)
const Examination = resolve => require(['@/containers/Warehouse/Examination'], resolve)
const Administrators = resolve => require(['@/containers/Warehouse/Administrators'], resolve)
const routes = [
  {
    path: '/ware',
    name: 'Ware',
    component: Warehouse,
    meta: {
      login: true
    // hasBack: true,
    // title: '测试类型选择',
    // hasRight: true,
    // rightTitle: '练习记录',
    // path: 'Sort_history'
    // hasHeader: false
    }
  },
  {
    path: '/examination',
    name: 'Examination',
    component: Examination,
    meta: {
      hasBack: true,
      title: '实操测试',
      hasFooter: false
      // hasRight: true,
      // rightTitle: '练习记录',
      // path: 'Sort_history'
      // hasHeader: false
    }
  },
  {
    path: '/administrators',
    name: 'Administrators',
    component: Administrators,
    meta: {
      hasBack: true,
      title: '实操测试',
      hasFooter: false
      // hasRight: true,
      // rightTitle: '练习记录',
      // path: 'Sort_history'
      // hasHeader: false
    }
  }
]

export default routes
