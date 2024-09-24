import request from '@/utils/request'

// 查询队伍列列表
export function listCgTeam(query) {
  return request({
    url: '/CgTeam/CgTeam/list',
    method: 'get',
    params: query
  })
}

// 查询队伍列详细
export function getCgTeam(id) {
  return request({
    url: '/CgTeam/CgTeam/' + id,
    method: 'get'
  })
}

// 新增队伍列
export function addCgTeam(data) {
  return request({
    url: '/CgTeam/CgTeam',
    method: 'post',
    data: data
  })
}

export function updataWd(data) {
  return request({
    url: '/CgTeam/CgTeam/tongbuTime',
    method: 'post',
    data: data
  })
}


// 修改队伍列
export function updateCgTeam(data) {
  return request({
    url: '/CgTeam/CgTeam',
    method: 'put',
    data: data
  })
}

// 删除队伍列
export function delCgTeam(id) {
  return request({
    url: '/CgTeam/CgTeam/' + id,
    method: 'delete'
  })
}
