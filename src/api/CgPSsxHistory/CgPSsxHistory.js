import request from '@/utils/request'

// 查询十四扣分项目每月记录列表
export function listCgPSsxHistory(query) {
  return request({
    url: '/CgPSsxHistory/CgPSsxHistory/list',
    method: 'get',
    params: query
  })
}

// 查询十四扣分项目每月记录详细
export function getCgPSsxHistory(id) {
  return request({
    url: '/CgPSsxHistory/CgPSsxHistory/' + id,
    method: 'get'
  })
}

// 新增十四扣分项目每月记录
export function addCgPSsxHistory(data) {
  return request({
    url: '/CgPSsxHistory/CgPSsxHistory',
    method: 'post',
    data: data
  })
}

// 修改十四扣分项目每月记录
export function updateCgPSsxHistory(data) {
  return request({
    url: '/CgPSsxHistory/CgPSsxHistory',
    method: 'put',
    data: data
  })
}

// 删除十四扣分项目每月记录
export function delCgPSsxHistory(id) {
  return request({
    url: '/CgPSsxHistory/CgPSsxHistory/' + id,
    method: 'delete'
  })
}
