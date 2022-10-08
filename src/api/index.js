//让四个接口统一对外暴露
import * as tradeMark from './product/tradeMark'
import * as Sku from './product/Sku'
import * as Attr from './product/Attr'
import * as Spu from './product/Spu'
//引入用户权限相关的接口
import * as user from './acl/user'
import role  from './acl/role'
import permission  from './acl/permission'
//对外暴露
export default {
    tradeMark,
    Attr,
    Sku,
    Spu,
    user,
    role,
    permission
}