import request from '@/utils/request'

// 查询待办事件假数据列表
export function listCgPShijian(query) {
  return request({
    url: '/CgPShijian/CgPShijian/list',
    method: 'get',
    params: query
  })
}

// 查询待办事件假数据详细
export function getCgPShijian(id) {
  return request({
    url: '/CgPShijian/CgPShijian/' + id,
    method: 'get'
  })
}

// 新增待办事件假数据
export function addCgPShijian(data) {
  return request({
    url: '/CgPShijian/CgPShijian',
    method: 'post',
    data: data
  })
}

// 修改待办事件假数据
export function updateCgPShijian(data) {
  return request({
    url: '/CgPShijian/CgPShijian',
    method: 'put',
    data: data
  })
}

// 删除待办事件假数据
export function delCgPShijian(id) {
  return request({
    url: '/CgPShijian/CgPShijian/' + id,
    method: 'delete'
  })
}
