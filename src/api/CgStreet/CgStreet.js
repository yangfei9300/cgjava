import request from '@/utils/request'

// 查询街道列表
export function listCgStreet(query) {
  return request({
    url: '/CgStreet/CgStreet/list',
    method: 'get',
    params: query
  })
}

// 查询街道详细
export function getCgStreet(id) {
  return request({
    url: '/CgStreet/CgStreet/' + id,
    method: 'get'
  })
}

// 新增街道
export function addCgStreet(data) {
  return request({
    url: '/CgStreet/CgStreet',
    method: 'post',
    data: data
  })
}

// 修改街道
export function updateCgStreet(data) {
  return request({
    url: '/CgStreet/CgStreet',
    method: 'put',
    data: data
  })
}

// 删除街道
export function delCgStreet(id) {
  return request({
    url: '/CgStreet/CgStreet/' + id,
    method: 'delete'
  })
}
