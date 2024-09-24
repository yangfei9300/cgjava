import request from '@/utils/request'

// 查询用户信息列表
export function listCgUser(query) {
  return request({
    url: '/CgUser/CgUser/list',
    method: 'get',
    params: query
  })
}

// 查询用户信息详细
export function getCgUser(id) {
  return request({
    url: '/CgUser/CgUser/' + id,
    method: 'get'
  })
}

// 新增用户信息
export function addCgUser(data) {
  return request({
    url: '/CgUser/CgUser',
    method: 'post',
    data: data
  })
}
export function tonewUserKaoqin(data) {
  return request({
    url: '/api/public/tonewUserKaoqin',
    method: 'post',
    data: data
  })
}

// 修改用户信息
export function updateCgUser(data) {
  return request({
    url: '/CgUser/CgUser',
    method: 'put',
    data: data
  })
}

// 删除用户信息
export function delCgUser(id) {
  return request({
    url: '/CgUser/CgUser/' + id,
    method: 'delete'
  })
}
