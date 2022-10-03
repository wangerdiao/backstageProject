<template>
  <div>
        <el-table border style="width:100%" :data="records"> 
          <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
          <el-table-column label="名称" prop="skuName"></el-table-column>
          <el-table-column label="描述" prop="skuDesc"></el-table-column>
          <el-table-column label="默认图片" width="110">
            <template slot-scope="{row}">
              <img :src="row.skuDefaultImg" style="width:80px;height:80px">
            </template>
          </el-table-column>
          <el-table-column label="重量(KG)" width="80" prop="weight"></el-table-column>
          <el-table-column label="价格(元)" width="80" prop="price"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button type="success" icon="el-icon-sort-down" size="mini" v-if="row.isSale==0" @click="sale(row)"></el-button>
              <el-button type="" icon="el-icon-sort-up" size="mini" v-else @click="cancel(row)"></el-button>
              <el-button type="primary" icon="el-icon-edit" size="mini" ></el-button>
              <el-button type="info" icon="el-icon-info" size="mini" @click="$message('正在开发中')"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :total="total" :current-page="page" :page-size="limit" :page-sizes="[3,5,10]" @current-change="getSkuList" @size-change="handlerSizeChange" layout="prev,pager,next,jumper,->,sizes,total" style="text-align:center"></el-pagination>
  </div>
</template>

<script>
export default {
    name:'Sku',
    data() {
      return {
        page:1,//当前第几页
        limit:10, //当前页面有几条数据
        total:0,//总共的数据数
        records:[] //存储sku列表数据
      }
    },
    mounted(){
      this.getSkuList()
    },
    methods:{
      //获取数据
      async getSkuList(pages =1) {
        this.page=pages
        let result = await this.$API.Sku.reqGetSkuList(this.page,this.limit)
        if(result.code==200) {
          this.total = result.data.total
          this.records = result.data.records
        }
      },
      //每一页数据个数发生变化
      handlerSizeChange(limits) {
        this.limit = limits
        this.getSkuList()
      },
      //上架商品
      async sale(row) {
        let result = await this.$API.Sku.reqSkuOnSale(row.id)
        if(result.code==200) {
          row.isSale = 1
          this.$message({type:'success',message:'上架成功'})
        }
      },
      //下架商品
      async cancel(row) {
        let result = await this.$API.Sku.reqSkuCancelSale(row.id) 
        if(result.code==200) {
          this.$message({type:'success',message:'下架成功'})
          row.isSale = 0
        }
      },
    
    }
}
</script>

<style>

</style>