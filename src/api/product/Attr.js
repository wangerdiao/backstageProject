import request from '@/utils/request'
//获取一级分类接口 地址/admin/product/getCategory1
export const reqGetCategory1 = () => request({url:'/admin/product/getCategory1',method:'GET'})
//获取二级分类/admin/product/getCategory2/{category1Id}
export const reqGetCategory2 = (category1Id) => request({url:`/admin/product/getCategory2/${category1Id}`,method:'GET'})
// 获取三级分类接口/admin/product/getCategory3/{category2Id}
export const reqGetCategory3 = (category2Id) => request({url:`/admin/product/getCategory3/${category2Id}`,method:'GET'})
//获取商品平台属性接口 地址/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrList = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'GET'})
//添加属性与属性值的接口 地址：/admin/product/saveAttrInfo
export const reqAddOrUpdateAttrList = (data) => request({url:'/admin/product/saveAttrInfo',method:'POST',data})
// { 需要添加的参数
//     "attrName": "string",  属性名
//     "attrValueList": [  属性名中属性值
//       {
//         "attrId": 0,    属性id
//         "valueName": "string"
//       }
//     ],
//     "categoryId": 0,   category3Id
//     "categoryLevel": 0,
//   }

//删除属性的接口   地址/admin/product/deleteAttr/{attrId}
export const reqDeleteAttr = (attrId) => request({url:`/admin/product/deleteAttr/${attrId}`,method:'DELETE'})