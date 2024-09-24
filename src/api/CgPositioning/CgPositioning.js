import request from '@/utils/request'

// 查询定位记录表列表
export function listCgPositioning(query) {
  return request({
    url: '/CgPositioning/CgPositioning/list',
    method: 'get',
    params: query
  })
}

// 查询定位记录表详细
export function getCgPositioning(id) {
  return request({
    url: '/CgPositioning/CgPositioning/' + id,
    method: 'get'
  })
}

// 新增定位记录表
export function addCgPositioning(data) {
  return request({
    url: '/CgPositioning/CgPositioning',
    method: 'post',
    data: data
  })
}

// 修改定位记录表
export function updateCgPositioning(data) {
  return request({
    url: '/CgPositioning/CgPositioning',
    method: 'put',
    data: data
  })
}

// 删除定位记录表
export function delCgPositioning(id) {
  return request({
    url: '/CgPositioning/CgPositioning/' + id,
    method: 'delete'
  })
}
