//这模块主要获取品牌管理的数据模块
import request from '@/utils/request'
//获取品牌列表接口/admin/product/baseTrademark/{page}/{limit}
export const  reqTradeMarkList = (page,limit) => request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'GET'})
//添加品牌接口 POST     /admin/product/baseTrademark/save 携带两个参数：品牌名称和品牌LOGO
//对于新增的品牌，给服务器传递数据，不需要传递ID，ID由服务器生成

//修改品牌接口  put     /admin/product/baseTrademark/update  携带三个参数：ID，品牌名称，品牌LOGO
//修改一个品牌前端需要携带参数ID，来告诉服务器修改哪一个品牌
export const addOrUpdateTradeMark = (tradeMark) => {
    if(tradeMark.id) { //有id代表修改品牌
        return request({url:'/admin/product/baseTrademark/update',method:'PUT',data:tradeMark})
    }else{ //否则就是添加品牌
        return request({url:'/admin/product/baseTrademark/save',method:'POST',data:tradeMark})
    }

}
//删除品牌的接口 地址/admin/product/baseTrademark/remove/{id}
export const deleteTradeMark = (id) => request({url:`/admin/product/baseTrademark/remove/${id}`,method:'DELETE'})