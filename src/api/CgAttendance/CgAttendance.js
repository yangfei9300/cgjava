import request from '@/utils/request'

// 查询考勤（每天00点更新）列表
export function listCgAttendance(query) {
  return request({
    url: '/CgAttendance/CgAttendance/list',
    method: 'get',
    params: query
  })
}

// 查询考勤（每天00点更新）详细
export function getCgAttendance(id) {
  return request({
    url: '/CgAttendance/CgAttendance/' + id,
    method: 'get'
  })
}

// 新增考勤（每天00点更新）
export function addCgAttendance(data) {
  return request({
    url: '/CgAttendance/CgAttendance',
    method: 'post',
    data: data
  })
}
export function cguserexportKaoqin(data) {
  return request({
    url: '/api/cguser/exportKaoqin',
    method: 'post',
    data: data
  })
}
export function exportKaoqin(data) {
  return request({
    url: '/CgAttendance/CgAttendance/exportKaoqin',
    method: 'post',
    data: data
  })
}

export function getHoutaiKaoqinList(data) {
  return request({
    url: '/CgAttendance/CgAttendance/getHoutaiKaoqinList',
    method: 'post',
    data: data
  })
}




// 修改考勤（每天00点更新）
export function updateCgAttendance(data) {
  return request({
    url: '/CgAttendance/CgAttendance',
    method: 'put',
    data: data
  })
}

// 删除考勤（每天00点更新）
export function delCgAttendance(id) {
  return request({
    url: '/CgAttendance/CgAttendance/' + id,
    method: 'delete'
  })
}
