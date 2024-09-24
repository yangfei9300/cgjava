import request from '@/utils/request'

// 查询上班时刻列表
export function listCgScheduling(query) {
  return request({
    url: '/CgScheduling/CgScheduling/list',
    method: 'get',
    params: query
  })
}

// 查询上班时刻详细
export function getCgScheduling(id) {
  return request({
    url: '/CgScheduling/CgScheduling/' + id,
    method: 'get'
  })
}

// 新增上班时刻
export function addCgScheduling(data) {
  return request({
    url: '/CgScheduling/CgScheduling',
    method: 'post',
    data: data
  })
}

// 修改上班时刻
export function updateCgScheduling(data) {
  return request({
    url: '/CgScheduling/CgScheduling',
    method: 'put',
    data: data
  })
}

// 删除上班时刻
export function delCgScheduling(id) {
  return request({
    url: '/CgScheduling/CgScheduling/' + id,
    method: 'delete'
  })
}
