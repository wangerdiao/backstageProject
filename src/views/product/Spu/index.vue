<template>
  <div>
        <el-card style="margin:20px 0">
            <CategorySelect   @getCategoryId="getCategoryId" :show="!show"></CategorySelect>
        </el-card>
        <el-card>
            <!-- 底下会有三部分进行切换 -->
            <div v-show="scene==0">
              <!-- 展示Spu列表的结构 -->
              <el-button type="primary" icon="el-icon-plus" @click="addSpu" :disabled="!category3Id">添加Spu</el-button>
              <el-table border :data="records">
                <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
                <el-table-column label="Spu名称" prop="spuName"></el-table-column>
                <el-table-column label="Spu描述" prop="description"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="{row,$index}">
                    <!-- 这里的按钮将来用hintButton替换 -->  
                    <hint-button type="success" icon="el-icon-plus" size="mini" title="添加Sku"> </hint-button>
                    <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改Spu" @click="updateSpu(row)"></hint-button>
                    <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前Sku全部列表"></hint-button>
                    <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除Spu"></hint-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination :total="total" :current-page="page" :page-size="limit"  :page-sizes="[3,5,10]"  layout="prev,pager,next,jumper,->,sizes,total" 
                @current-change="getSpuList"
                @size-change="handlerSizeChange"
                style="text-align:center">
              </el-pagination>
            </div>
            <SpuForm v-show="scene==1" @changeScene="changeScene" ref="spu"></SpuForm>
            <SkuForm v-show="scene==2"></SkuForm>
        </el-card>
  </div>
</template>

<script>
import SkuForm from './SkuForm/index.vue';
import SpuForm from './SpuForm/index.vue';
export default {
    name: "Spu",
    data() {
        return {
            category1Id: "",
            category2Id: "",
            category3Id: "",
            show: true,
            page: 1,
            limit: 3,
            records: [],
            total: 0,
            scene: 0, //0展示spu列表  1展示添加或修改SPU  2展示添加SKU
        };
    },
    methods: {
        //三级联动的自定义事件，可以把子组件相应的id传递给父组件
        getCategoryId({ categoryId, level }) {
            //categoryId获取123级的id，level区分几级id
            if (level == 1) {
                this.category1Id = categoryId;
                this.category2Id = "";
                this.category3Id = "";
            }
            else if (level == 2) {
                this.category2Id = categoryId;
                this.category3Id = "";
            }
            else {
                //代表三级分类Id有了，可以发送请求获取平台属性了
                this.category3Id = categoryId;
                this.getSpuList(); //发送请求
            }
        },
        //获取Spu的列表
        async getSpuList(pages = 1) {
            //默认参数pages为1，当点击别的第几页时pages变为点击的页面数字
            this.page = pages;
            //需要携带的参数page,limit,category3Id
            const { page, limit, category3Id } = this;
            let result = await this.$API.Spu.getSpuList(page, limit, category3Id);
            if (result.code == 200) {
                this.total = result.data.total;
                this.records = result.data.records;
            }
        },
        //分页器页面展示的条数发生变化的回调
        handlerSizeChange(limits) {
            this.limit = limits;
            this.getSpuList();
        },
        //添加Spu按钮
        addSpu() {
          this.scene = 1
        },
        //修改Spu
        updateSpu(row){
          this.scene = 1
          //在父组件中可以通过$ref获取到子组件
          this.$refs.spu.initSpuData(row)
        },
        //Spu组件自定义事件，点击了取消按钮
        changeScene(scene) {
            this.scene=scene  //切换场景
        }
    },
    components: { SkuForm, SpuForm }
}
</script>

<style>

</style>