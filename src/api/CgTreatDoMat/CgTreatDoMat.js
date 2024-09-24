import request from '@/utils/request'

// 查询待办事件列表
export function listCgTreatDoMat(query) {
  return request({
    url: '/CgTreatDoMat/CgTreatDoMat/list',
    method: 'get',
    params: query
  })
}

// 查询待办事件详细
export function getCgTreatDoMat(id) {
  return request({
    url: '/CgTreatDoMat/CgTreatDoMat/' + id,
    method: 'get'
  })
}

// 新增待办事件
export function addCgTreatDoMat(data) {
  return request({
    url: '/CgTreatDoMat/CgTreatDoMat',
    method: 'post',
    data: data
  })
}
export function exportImgsCgTreatDoMat(data) {
  return request({
    url: '/CgTreatDoMat/CgTreatDoMat/exportImgs',
    method: 'post',
    data: data
  })
}


// 修改待办事件
export function updateCgTreatDoMat(data) {
  return request({
    url: '/CgTreatDoMat/CgTreatDoMat',
    method: 'put',
    data: data
  })
}

// 删除待办事件
export function delCgTreatDoMat(id) {
  return request({
    url: '/CgTreatDoMat/CgTreatDoMat/' + id,
    method: 'delete'
  })
}
