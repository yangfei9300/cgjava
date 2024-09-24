import request from '@/utils/request'

// 查询文件列表
export function listCgFileZip(query) {
  return request({
    url: '/CgFileZip/CgFileZip/list',
    method: 'get',
    params: query
  })
}

// 查询文件详细
export function getCgFileZip(id) {
  return request({
    url: '/CgFileZip/CgFileZip/' + id,
    method: 'get'
  })
}

// 新增文件
export function addCgFileZip(data) {
  return request({
    url: '/CgFileZip/CgFileZip',
    method: 'post',
    data: data
  })
}

// 修改文件
export function updateCgFileZip(data) {
  return request({
    url: '/CgFileZip/CgFileZip',
    method: 'put',
    data: data
  })
}

// 删除文件
export function delCgFileZip(id) {
  return request({
    url: '/CgFileZip/CgFileZip/' + id,
    method: 'delete'
  })
}
