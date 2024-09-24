import request from '@/utils/request'

// 查询事件类型列表
export function listCgEventType(query) {
  return request({
    url: '/CgEventType/CgEventType/list',
    method: 'get',
    params: query
  })
}

// 查询事件类型详细
export function getCgEventType(id) {
  return request({
    url: '/CgEventType/CgEventType/' + id,
    method: 'get'
  })
}

// 新增事件类型
export function addCgEventType(data) {
  return request({
    url: '/CgEventType/CgEventType',
    method: 'post',
    data: data
  })
}

// 修改事件类型
export function updateCgEventType(data) {
  return request({
    url: '/CgEventType/CgEventType',
    method: 'put',
    data: data
  })
}

// 删除事件类型
export function delCgEventType(id) {
  return request({
    url: '/CgEventType/CgEventType/' + id,
    method: 'delete'
  })
}
