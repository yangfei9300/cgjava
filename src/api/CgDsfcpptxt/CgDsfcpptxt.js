import request from '@/utils/request'

// 查询第三方测评平台系统列表
export function listCgDsfcpptxt(query) {
  return request({
    url: '/CgDsfcpptxt/CgDsfcpptxt/list',
    method: 'get',
    params: query
  })
}

export function importTemplate(query) {
  return request({
    url: '/CgDsfcpptxt/CgDsfcpptxt/importTemplate',
    method: 'get',
    params: query
  })
}

// 查询第三方测评平台系统详细
export function getCgDsfcpptxt(id) {
  return request({
    url: '/CgDsfcpptxt/CgDsfcpptxt/' + id,
    method: 'get'
  })
}

// 新增第三方测评平台系统
export function addCgDsfcpptxt(data) {
  return request({
    url: '/CgDsfcpptxt/CgDsfcpptxt',
    method: 'post',
    data: data
  })
}

// 修改第三方测评平台系统
export function updateCgDsfcpptxt(data) {
  return request({
    url: '/CgDsfcpptxt/CgDsfcpptxt',
    method: 'put',
    data: data
  })
}

// 删除第三方测评平台系统
export function delCgDsfcpptxt(id) {
  return request({
    url: '/CgDsfcpptxt/CgDsfcpptxt/' + id,
    method: 'delete'
  })
}
