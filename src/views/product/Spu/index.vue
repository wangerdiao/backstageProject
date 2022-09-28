<template>
  <div>
        <el-card style="margin:20px 0">
            <CategorySelect   @getCategoryId="getCategoryId" :show="!show"></CategorySelect>
        </el-card>
        <el-card>
            <!-- 底下会有三部分进行切换 -->
            <div>
              <!-- 展示Spu列表的结构 -->
              <el-button type="primary" icon="el-icon-plus">添加Spu</el-button>
              <el-table border>
                <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
                <el-table-column label="Spu名称"></el-table-column>
                <el-table-column label="Spu描述"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="{row,$index}">
                    <!-- 这里的按钮将来用hintButton替换 -->
                    <el-button type="success" icon="el-icon-plus" size="mini"> </el-button>
                    <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
                    <el-button type="info" icon="el-icon-info" size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination :total="23" :current-page="6" :page-size="3"  :page-sizes="[3,5,10]"  layout="prev,pager,next,jumper,->,sizes,total" style="text-align:center">


              </el-pagination>
            </div>
        </el-card>
  </div>
</template>

<script>
export default {
    name:'Spu',
    data() {
      return {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        show:true,//控制三级分类的可操作性
      }
    },
    methods:{
      //三级联动的自定义事件，可以把子组件相应的id传递给父组件
      getCategoryId({categoryId,level}) {
        //categoryId获取123级的id，level区分几级id
        if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      }else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      }else {
        //代表三级分类Id有了，可以发送请求获取平台属性了
        this.category3Id = categoryId;
        this.getSpuList();
        }
      },
      //获取Spu的列表
      getSpuList() {

      }
  }
}
</script>

<style>

</style>