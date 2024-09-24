import request from '@/utils/request'

// 查询每月考勤列表
export function listCgMonthKaohe(query) {
  return request({
    url: '/CgMonthKaohe/CgMonthKaohe/list',
    method: 'get',
    params: query
  })
}

// 查询每月考勤详细
export function getCgMonthKaohe(id) {
  return request({
    url: '/CgMonthKaohe/CgMonthKaohe/' + id,
    method: 'get'
  })
}

// 新增每月考勤
export function addCgMonthKaohe(data) {
  return request({
    url: '/CgMonthKaohe/CgMonthKaohe',
    method: 'post',
    data: data
  })
}

// 修改每月考勤
export function updateCgMonthKaohe(data) {
  return request({
    url: '/CgMonthKaohe/CgMonthKaohe',
    method: 'put',
    data: data
  })
}

// 删除每月考勤
export function delCgMonthKaohe(id) {
  return request({
    url: '/CgMonthKaohe/CgMonthKaohe/' + id,
    method: 'delete'
  })
}
