import request from '@/utils/request'

// 查询热心服务事项列表
export function listCgHeartShi(query) {
  return request({
    url: '/CgHeartShi/CgHeartShi/list',
    method: 'get',
    params: query
  })
}

// 查询热心服务事项详细
export function getCgHeartShi(id) {
  return request({
    url: '/CgHeartShi/CgHeartShi/' + id,
    method: 'get'
  })
}

// 新增热心服务事项
export function addCgHeartShi(data) {
  return request({
    url: '/CgHeartShi/CgHeartShi',
    method: 'post',
    data: data
  })
}

// 修改热心服务事项
export function updateCgHeartShi(data) {
  return request({
    url: '/CgHeartShi/CgHeartShi',
    method: 'put',
    data: data
  })
}

// 删除热心服务事项
export function delCgHeartShi(id) {
  return request({
    url: '/CgHeartShi/CgHeartShi/' + id,
    method: 'delete'
  })
}
