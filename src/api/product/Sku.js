import request from '@/utils/request'
//获取sku列表的数据  /admin/product/list/{page}/{limit}
export const reqGetSkuList = (page,limit) => request({url:`/admin/product/list/${page}/${limit}`,method:'GET'})
//sku上架接口 GET /admin/product/onSale/{skuId}
export const reqSkuOnSale = (skuId) => request({url:`/admin/product/onSale/${skuId}`,method:'GET'})
//sku下架接口/admin/product/cancelSale/{skuId}
export const reqSkuCancelSale = (skuId) => request({url:`/admin/product/cancelSale/${skuId}`,method:'GET'})
