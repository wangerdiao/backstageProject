import request from'@/utils/request'
//Spu统一管理的接口
//获取Spu列表 地址/admin/product/{page}/{limit}  需要携带的参数page,limit,category3Id
export const getSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'GET',params:{category3Id}})
//获取Spu信息的接口 地址 GET /admin/product/getSpuById/{spuId}
export const getSpuProduct = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`,method:'GET'})
//获取品牌信息数据的接口  地址 GET /admin/product/baseTrademark/getTrademarkList
export const getSpuTradeMark = () => request({url:'/admin/product/baseTrademark/getTrademarkList',method:'GET'})
//获取SPU图片的接口  地址GET /admin/product/spuImageList/{spuId}
export const getSpuImg = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'GET'})
//获取品牌下拉框销售属性的接口 地址GET /admin/product/baseSaleAttrList
export const getSpuAttrList = () => request({url:`/admin/product/baseSaleAttrList`,method:'GET'})

