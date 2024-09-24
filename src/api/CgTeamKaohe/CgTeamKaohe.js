import request from '@/utils/request'

// 查询每月队考核列表
export function listCgTeamKaohe(query) {
  return request({
    url: '/CgTeamKaohe/CgTeamKaohe/list',
    method: 'get',
    params: query
  })
}

// 查询每月队考核详细
export function getCgTeamKaohe(id) {
  return request({
    url: '/CgTeamKaohe/CgTeamKaohe/' + id,
    method: 'get'
  })
}

// 新增每月队考核
export function addCgTeamKaohe(data) {
  return request({
    url: '/CgTeamKaohe/CgTeamKaohe',
    method: 'post',
    data: data
  })
}

// 修改每月队考核
export function updateCgTeamKaohe(data) {
  return request({
    url: '/CgTeamKaohe/CgTeamKaohe',
    method: 'put',
    data: data
  })
}

// 删除每月队考核
export function delCgTeamKaohe(id) {
  return request({
    url: '/CgTeamKaohe/CgTeamKaohe/' + id,
    method: 'delete'
  })
}
