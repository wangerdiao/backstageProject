//让四个接口统一对外暴露
import * as tradeMark from './product/tradeMark'
import * as Sku from './product/Sku'
import * as Attr from './product/Attr'
import * as Spu from './product/Spu'
//对外暴露
export default {
    tradeMark,
    Attr,
    Sku,
    Spu
}