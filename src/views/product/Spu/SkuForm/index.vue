<template>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">{{spu.spuName}}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input  placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input  placeholder="价格(元)" v-model="skuInfo.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input  placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px" >
          <el-form-item :label="attr.saleAttrName" v-for="attr in spuSaleAttrList" :key="attr.id">
            <el-select  placeholder="请选择" v-model="attr.attrIdAndAttrValueId">
                <el-option  :label="attrValue.saleAttrValueName" v-for="attrValue in attr.spuSaleAttrValueList" :key="attrValue.id" :value="`${attr.id}:${attrValue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item :label="saleAttr.attrName" v-for="saleAttr in spuSaleAttrInfo" :key="saleAttr.id">
            <el-select  placeholder="请选择" v-model="saleAttr.saleAttrIdAndValueId">
                <el-option  :value="`${saleAttr.id}:${saleAttrValue.id}`" :label="saleAttrValue.valueName"  v-for="saleAttrValue in saleAttr.attrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width:100%" border :data="skuImgList" @selection-change="handlerSelectChange">
          <el-table-column label="" width="80" type="selection"></el-table-column>
          <el-table-column label="图片">
            <template  slot-scope="{row}">
                <img :src="row.imgUrl" style="width:100px;height:100px"> 
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
                <el-button type="primary" size="mini" v-if="row.isDefault==0" @click="changeDefault(row)">设置默认</el-button>
                <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item >
        <el-button type="primary">保存</el-button>
        <el-button >取消</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            skuImgList:[],//存储图片信息
            spuSaleAttrList:[],//存储平台属性信息
            spuSaleAttrInfo:[],//存储销售属性信息
            skuInfo:{ //收集Sku信息的字段
                //第一类数据通过父组件传递过来
                "category3Id": 0,   
                "spuId": 0,
                "tmId": 0,
                //第二类数据需要通过双向绑定
                "price": 0,
                "skuName": "",
                "weight": "",
                "skuDesc": "",
                //第三类收集数据需要自己手写代码
                "skuAttrValueList": [ //收集平台属性
                    {
                    "attrId": 0,
                    "valueId": 0,
                    }
                ],
                "skuDefaultImg": "", //默认图片
                "skuImageList": [ //收集图片信息 
                    // {
                    // // "id": 0,
                    // // "imgName": "string",
                    // // "imgUrl": "string",
                    // // "isDefault": "string",
                    // // "skuId": 0,
                    // // "spuImgId": 0
                    // }
                ],
                "skuSaleAttrValueList": [ //收集销售属性
                    // {
                    // "id": 0,
                    // "saleAttrId": 0,
                    // "saleAttrName": "string",
                    // "saleAttrValueId": 0,
                    // "saleAttrValueName": "string",
                    // "skuId": 0,
                    // "spuId": 0
                    // }
                ],
                },
            spu:{},//收集父组件传递来的row
            imgList:[],//收集图片的字段，待整理
        }
    },
    methods:{
        //在父组件点击添加sku时发送请求
        async getData(category1Id,category2Id,spu) {
            //收集父组件传递的数据
            this.skuInfo.category3Id = spu.category3Id
            this.skuInfo.tmId = spu.tmId
            this.skuInfo.spuId = spu.id
            this.spu = spu
            let result = await this.$API.Sku.reqGetSkuImg(spu.id) //获取图片的数据
            if(result.code==200) {
                let list = result.data
                list.forEach(item => {
                    item.isDefault = 0  //添加isDefault字段
                })
                this.skuImgList = list
            }
            let result2 = await this.$API.Sku.reqGetSkuAttrList(spu.id) //获取销售属性的数据
            console.log(result2)
            if(result2.code==200) {
                this.spuSaleAttrList = result2.data
            }
            let result3 = await this.$API.Sku.reqGetAttrInfo(category1Id,category2Id,spu.category3Id) //获取属性的信息
            if(result3.code==200) {
                this.spuSaleAttrInfo = result3.data
            }
        },
        //图片的复选框勾选的回调
        handlerSelectChange(params) {
            //获取到用户选中图片的信息，但在收集的信息当中缺少需要的isDefault字段
            this.imgList = params //缺少isDefault字段，需要整理参数    
        },
        //设置默认图片操作，排它思想
        changeDefault(row) {
            this.imgList.forEach(item => { //先让所有的图片isDefault为0
                item.isDefault = 0
            })
            row.isDefault = 1  //点击的图片isDefault为1
            //收集默认图片的地址
            this.skuInfo.skuDefaultImg = row.imgUrl
        }
    }
}
</script>

<style>

</style>