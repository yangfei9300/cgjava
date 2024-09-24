import request from '@/utils/request'

// 查询华山指数列表
export function listCgPHszs(query) {
  return request({
    url: '/CgPHszs/CgPHszs/list',
    method: 'get',
    params: query
  })
}

// 查询华山指数详细
export function getCgPHszs(id) {
  return request({
    url: '/CgPHszs/CgPHszs/' + id,
    method: 'get'
  })
}

// 新增华山指数
export function addCgPHszs(data) {
  return request({
    url: '/CgPHszs/CgPHszs',
    method: 'post',
    data: data
  })
}

// 修改华山指数
export function updateCgPHszs(data) {
  return request({
    url: '/CgPHszs/CgPHszs',
    method: 'put',
    data: data
  })
}

// 删除华山指数
export function delCgPHszs(id) {
  return request({
    url: '/CgPHszs/CgPHszs/' + id,
    method: 'delete'
  })
}
