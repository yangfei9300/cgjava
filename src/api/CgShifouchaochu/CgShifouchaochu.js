import request from '@/utils/request'

// 查询定位问题（是否超出）列表
export function listCgShifouchaochu(query) {
  return request({
    url: '/CgShifouchaochu/CgShifouchaochu/list',
    method: 'get',
    params: query
  })
}

// 查询定位问题（是否超出）详细
export function getCgShifouchaochu(id) {
  return request({
    url: '/CgShifouchaochu/CgShifouchaochu/' + id,
    method: 'get'
  })
}

// 新增定位问题（是否超出）
export function addCgShifouchaochu(data) {
  return request({
    url: '/CgShifouchaochu/CgShifouchaochu',
    method: 'post',
    data: data
  })
}

// 修改定位问题（是否超出）
export function updateCgShifouchaochu(data) {
  return request({
    url: '/CgShifouchaochu/CgShifouchaochu',
    method: 'put',
    data: data
  })
}

// 删除定位问题（是否超出）
export function delCgShifouchaochu(id) {
  return request({
    url: '/CgShifouchaochu/CgShifouchaochu/' + id,
    method: 'delete'
  })
}
