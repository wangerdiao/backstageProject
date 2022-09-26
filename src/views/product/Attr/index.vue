<template>
  <div>
        <el-card style="margin:20px 0px">
          <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
        </el-card>
        <el-card>
          <div v-show="isShowTable">
            <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="isShowTable=false">添加属性</el-button>
          <!-- 表格展示平台属性 -->
          <el-table border style="width:100%" :data="attrList">
            <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
            <el-table-column prop="attrName" label="属性名称" width="150px"></el-table-column>
            <el-table-column label="属性值列表">
              <template slot-scope="{row}">
                <el-tag type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id" style="margin:0px 10px">{{attrValue.valueName}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150px">
              <template slot-scope="{row}">
                <el-button type="warning" icon="el-icon-edit" size="mini" @click="isShowTable=false"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <div v-show="!isShowTable">
            <el-form :inline="true" ref="form" >
              <el-form-item label="属性名">
                <el-input placeholder="请输入属性名"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
            <el-button @click="isShowTable=true">取消</el-button>
            <el-table border style="width:100%;margin:20px 0">
              <el-table-column label="序号" align="center" type="index" width="80px"></el-table-column>
              <el-table-column label="属性值名称"   width="width"></el-table-column>
              <el-table-column label="操作"   width="width"></el-table-column>
            </el-table>
            <el-button type="primary">保存</el-button>
            <el-button @click="isShowTable=true">取消</el-button>
          </div>
        </el-card>
  </div>
</template>

<script>
export default {
    name: "Attr",
    data() {
      return {
        category1Id:'',
        category2Id:'',
        category3Id:'',
        attrList:[],
        isShowTable:false, //控制table表格显示与隐藏
      }
    },
    methods:{
      //自定义事件，获取三级分类的ID
      getCategoryId({categoryId,level}) {
        if(level ==1) {
          this.category1Id = categoryId
          this.category2Id=''
          this.category3Id=''
        }else if(level==2) {
          this.category2Id = categoryId
          this.category3Id=''
        }else { //代表三级分类Id有了，可以发送请求获取平台属性了
          this.category3Id = categoryId
          this.getAttrList()
        }
      },
      async getAttrList() { //获取平台属性数据
        const {category1Id,category2Id,category3Id} = this
        let result = await this.$API.Attr.reqGetAttrList(category1Id,category2Id,category3Id)
        if(result.code==200) {
          this.attrList = result.data
        }
      }
    }
}
</script>

<style>

</style>