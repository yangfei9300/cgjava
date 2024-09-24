import request from '@/utils/request'

// 查询旷工时间列表
export function listCgVastSecond(query) {
  return request({
    url: '/CgVastSecond/CgVastSecond/list',
    method: 'get',
    params: query
  })
}

// 查询旷工时间详细
export function getCgVastSecond(id) {
  return request({
    url: '/CgVastSecond/CgVastSecond/' + id,
    method: 'get'
  })
}

// 新增旷工时间
export function addCgVastSecond(data) {
  return request({
    url: '/CgVastSecond/CgVastSecond',
    method: 'post',
    data: data
  })
}

// 修改旷工时间
export function updateCgVastSecond(data) {
  return request({
    url: '/CgVastSecond/CgVastSecond',
    method: 'put',
    data: data
  })
}

// 删除旷工时间
export function delCgVastSecond(id) {
  return request({
    url: '/CgVastSecond/CgVastSecond/' + id,
    method: 'delete'
  })
}
