import request from '@/utils/request'

// 查询十四扣分项列表
export function listCg_p_ssx(query) {
  return request({
    url: '/cg_p_ssx/cg_p_ssx/list',
    method: 'get',
    params: query
  })
}

// 查询十四扣分项详细
export function getCg_p_ssx(id) {
  return request({
    url: '/cg_p_ssx/cg_p_ssx/' + id,
    method: 'get'
  })
}

// 新增十四扣分项
export function addCg_p_ssx(data) {
  return request({
    url: '/cg_p_ssx/cg_p_ssx',
    method: 'post',
    data: data
  })
}

// 修改十四扣分项
export function updateCg_p_ssx(data) {
  return request({
    url: '/cg_p_ssx/cg_p_ssx',
    method: 'put',
    data: data
  })
}

// 删除十四扣分项
export function delCg_p_ssx(id) {
  return request({
    url: '/cg_p_ssx/cg_p_ssx/' + id,
    method: 'delete'
  })
}
