import request from '@/utils/request'

// 查询队考核列表
export function listCgPDuiKaohe(query) {
  return request({
    url: '/CgPDuiKaohe/CgPDuiKaohe/list',
    method: 'get',
    params: query
  })
}

// 查询队考核详细
export function getCgPDuiKaohe(id) {
  return request({
    url: '/CgPDuiKaohe/CgPDuiKaohe/' + id,
    method: 'get'
  })
}

// 新增队考核
export function addCgPDuiKaohe(data) {
  return request({
    url: '/CgPDuiKaohe/CgPDuiKaohe',
    method: 'post',
    data: data
  })
}

// 修改队考核
export function updateCgPDuiKaohe(data) {
  return request({
    url: '/CgPDuiKaohe/CgPDuiKaohe',
    method: 'put',
    data: data
  })
}

// 删除队考核
export function delCgPDuiKaohe(id) {
  return request({
    url: '/CgPDuiKaohe/CgPDuiKaohe/' + id,
    method: 'delete'
  })
}
