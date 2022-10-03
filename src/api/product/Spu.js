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
//修改或者添加Spu的接口 对于修改或者添加，两者区别在于携带参数是否有id
export const reqAddOrUpdateSpu = (spuInfo) => {
    //携带的参数有id，---------修改
    if(spuInfo.id) {
        return request({url:'/admin/product/updateSpuInfo',method:'POST',data:spuInfo})
    }else { //携带参数不带id  ----添加
        return request({url:'/admin/product/saveSpuInfo',method:'POST',data:spuInfo})
    }   
}
//删除spu的接口 地址DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({url:`/admin/product/deleteSpu/${spuId}`,method:'DELETE'})
//获取图片接口GET /admin/product/spuImageList/{spuId}
export const reqGetSkuImg = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'GET'})
//获取销售属性列表 地址 /admin/product/spuSaleAttrList/{spuId}
export const reqGetSkuAttrList = (spuId) => request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'GET'})
//获取属性信息接口 GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrInfo =(category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'GET'})
//点击保存发送收集的信息给服务器,添加Sku 地址POST /admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) => request({url:'/admin/product/saveSkuInfo',method:'POST',data:skuInfo})
//获取sku列表数据的接口 GET /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`,method:'GET'})
