import request from '@/utils/request'

// 查询地址围栏列表
export function listCgGeographicFence(query) {
  return request({
    url: '/CgGeographicFence/CgGeographicFence/list',
    method: 'get',
    params: query
  })
}

// 查询地址围栏详细
export function getCgGeographicFence(id) {
  return request({
    url: '/CgGeographicFence/CgGeographicFence/' + id,
    method: 'get'
  })
}

// 新增地址围栏
export function addCgGeographicFence(data) {
  return request({
    url: '/CgGeographicFence/CgGeographicFence',
    method: 'post',
    data: data
  })
}

// 修改地址围栏
export function updateCgGeographicFence(data) {
  return request({
    url: '/CgGeographicFence/CgGeographicFence',
    method: 'put',
    data: data
  })
}

// 删除地址围栏
export function delCgGeographicFence(id) {
  return request({
    url: '/CgGeographicFence/CgGeographicFence/' + id,
    method: 'delete'
  })
}
