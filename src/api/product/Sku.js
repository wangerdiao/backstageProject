import request from '@/utils/request'
//获取图片接口GET /admin/product/spuImageList/{spuId}
export const reqGetSkuImg = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'GET'})
//获取销售属性列表 地址 /admin/product/spuSaleAttrList/{spuId}
export const reqGetSkuAttrList = (spuId) => request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'GET'})
//获取属性信息接口 GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrInfo =(category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'GET'})
//点击保存发送收集的信息给服务器 地址POST /admin/product/saveSkuInfo
export const reqGetAllInfo = () => request({url:'/admin/product/saveSkuInfo',method:'POST'})