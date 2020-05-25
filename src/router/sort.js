const Sort = resolve => require(['@/containers/Sort'], resolve)
const SortItem = resolve => require(['@/containers/Sort/SortItem'], resolve)
const SortHistory = resolve => require(['@/containers/Sort/SortHistory'], resolve)
const HistoryDetails = resolve => require(['@/containers/Sort/HistoryDetails'], resolve)
const routes = [{
  path: '/sort',
  name: 'Sort',
  component: Sort,
  meta: {
    login: true,
    hasBack: true,
    title: '练习类型选择'
    // hasRight: true,
    // rightTitle: '练习记录',
    // path: 'Sort_history'
    // hasHeader: false
  }
},
{
  path: '/sort_item',
  name: 'Sort_Item',
  component: SortItem,
  meta: {
    login: true,
    hasBack: true,
    title: '盛金源测试',
    hasFooter: false
  }
},
{
  path: '/sort_history',
  name: 'Sort_history',
  component: SortHistory,
  meta: {
    login: true,
    hasBack: true,
    title: '测试记录',
    hasFooter: false
  }
},
{
  path: '/history_details',
  name: 'History_Details',
  component: HistoryDetails,
  meta: {
    hasBack: true,
    title: '考试详情',
    hasFooter: false
  }
}
]

export default routes
