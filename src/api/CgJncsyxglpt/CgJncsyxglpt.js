import request from '@/utils/request'

// 查询济南市城市服务运行管理平台列表
export function listCgJncsyxglpt(query) {
  return request({
    url: '/CgJncsyxglpt/CgJncsyxglpt/list',
    method: 'get',
    params: query
  })
}

// 查询济南市城市服务运行管理平台详细
export function getCgJncsyxglpt(id) {
  return request({
    url: '/CgJncsyxglpt/CgJncsyxglpt/' + id,
    method: 'get'
  })
}

// 新增济南市城市服务运行管理平台
export function addCgJncsyxglpt(data) {
  return request({
    url: '/CgJncsyxglpt/CgJncsyxglpt',
    method: 'post',
    data: data
  })
}

// 修改济南市城市服务运行管理平台
export function updateCgJncsyxglpt(data) {
  return request({
    url: '/CgJncsyxglpt/CgJncsyxglpt',
    method: 'put',
    data: data
  })
}

// 删除济南市城市服务运行管理平台
export function delCgJncsyxglpt(id) {
  return request({
    url: '/CgJncsyxglpt/CgJncsyxglpt/' + id,
    method: 'delete'
  })
}
