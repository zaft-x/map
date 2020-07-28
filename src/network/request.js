import request from "./manager"

export function getDeveiceList(params){
  return request({
      url:`/device/list`,
      method:'get',
      params
  })
}

export function getInfo(deviceNo){
  return request({
    url:`/device/info/${deviceNo}`,
    method:'get',
  })
}

export function setThreshold(threshold){
  return request({
    url:`/device/setThreshold/${threshold}`,
    method:'get',
  })
}

export function getThreshold(){
  return request({
    url:`/device/getThreshold`,
    method:'get'
  })
}