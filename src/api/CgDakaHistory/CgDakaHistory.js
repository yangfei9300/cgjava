import request from '@/utils/request'

// 查询打卡记录列表
export function listCgDakaHistory(query) {
  return request({
    url: '/CgDakaHistory/CgDakaHistory/list',
    method: 'get',
    params: query
  })
}

// 查询打卡记录详细
export function getCgDakaHistory(id) {
  return request({
    url: '/CgDakaHistory/CgDakaHistory/' + id,
    method: 'get'
  })
}

// 新增打卡记录
export function addCgDakaHistory(data) {
  return request({
    url: '/CgDakaHistory/CgDakaHistory',
    method: 'post',
    data: data
  })
}

// 修改打卡记录
export function updateCgDakaHistory(data) {
  return request({
    url: '/CgDakaHistory/CgDakaHistory',
    method: 'put',
    data: data
  })
}

// 删除打卡记录
export function delCgDakaHistory(id) {
  return request({
    url: '/CgDakaHistory/CgDakaHistory/' + id,
    method: 'delete'
  })
}
