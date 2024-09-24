// 引入 axios
const axios = require('axios');
 
// 创建 axios 实例
const instance = axios.create({
  baseURL: 'https://restapi.amap.com', // 所有请求的基地址
  timeout: 1000, // 请求超时时间
  headers: {'X-Custom-Header': 'foobar'} // 自定义头部
});
 
 
 
// 使用实例发送请求
instance.get('/someEndpoint')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
  
module.exports = instance;