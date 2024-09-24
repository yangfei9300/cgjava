import request from '@/utils/request'

// 查询轮播图列表
export function listCgBanners(query) {
  return request({
    url: '/CgBanners/CgBanners/list',
    method: 'get',
    params: query
  })
}

// 查询轮播图详细
export function getCgBanners(id) {
  return request({
    url: '/CgBanners/CgBanners/' + id,
    method: 'get'
  })
}

// 新增轮播图
export function addCgBanners(data) {
  return request({
    url: '/CgBanners/CgBanners',
    method: 'post',
    data: data
  })
}

// 修改轮播图
export function updateCgBanners(data) {
  return request({
    url: '/CgBanners/CgBanners',
    method: 'put',
    data: data
  })
}

// 删除轮播图
export function delCgBanners(id) {
  return request({
    url: '/CgBanners/CgBanners/' + id,
    method: 'delete'
  })
}
