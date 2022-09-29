import request from'@/utils/request'
//Spu统一管理的接口
//获取Spu列表 地址/admin/product/{page}/{limit}  需要携带的参数page,limit,category3Id
export const getSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'GET',params:{category3Id}})
