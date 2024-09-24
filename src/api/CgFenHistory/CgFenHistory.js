import request from '@/utils/request'

// 查询分数记录列表
export function listCgFenHistory(query) {
  return request({
    url: '/CgFenHistory/CgFenHistory/list',
    method: 'get',
    params: query
  })
}

// 查询分数记录详细
export function getCgFenHistory(id) {
  return request({
    url: '/CgFenHistory/CgFenHistory/' + id,
    method: 'get'
  })
}

// 新增分数记录
export function addCgFenHistory(data) {
  return request({
    url: '/CgFenHistory/CgFenHistory',
    method: 'post',
    data: data
  })
}

// 修改分数记录
export function updateCgFenHistory(data) {
  return request({
    url: '/CgFenHistory/CgFenHistory',
    method: 'put',
    data: data
  })
}

// 删除分数记录
export function delCgFenHistory(id) {
  return request({
    url: '/CgFenHistory/CgFenHistory/' + id,
    method: 'delete'
  })
}
