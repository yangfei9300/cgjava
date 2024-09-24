import request from '@/utils/request'

// 注册方法
export function getAddressList(data) {
  return request({
    url: '/api/gaodemap/getAddressList',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}
