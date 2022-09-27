<template>
  <div>
        <el-card style="margin:20px 0px">
          <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
        </el-card>
        <el-card>
          <div v-show="isShowTable">
            <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">添加属性</el-button>
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
                <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <div v-show="!isShowTable">
            <el-form :inline="true" ref="form" :model="attrInfo">
              <el-form-item label="属性名">
                <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值</el-button>
            <el-button @click="isShowTable=true">取消</el-button>
            <el-table border style="width:100%;margin:20px 0" :data="attrInfo.attrValueList"> 
              <el-table-column label="序号" align="center" type="index" width="80px"></el-table-column>
              <el-table-column label="属性值名称"   width="width">
                <!-- 这里结构需要用到span与input来回切换 -->
                <template slot-scope="{row,$index}">
                  <el-input v-model="row.valueName" placeholder="请输入属性名称" size="mini" v-if="row.flag" @blur="row.flag=false" @keyup.native.enter="row.flag =false" :autofocus="true"></el-input>
                  <span v-else @click="row.flag=true " style="display:block">{{row.valueName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作"   width="width">
                <template slot-scope="{row}">
                  <el-button type="danger" icon="el-icon-delete"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary">保存</el-button>
            <el-button  @click="isShowTable=true" size="mini">取消</el-button>
          </div>
        </el-card>
  </div>
</template>

<script>
  //按需引入lodash深拷贝
  import cloneDeep from 'lodash/cloneDeep'
export default {
    name: "Attr",
    data() {
      return {
        category1Id:'',
        category2Id:'',
        category3Id:'',
        attrList:[],
        isShowTable:true, //控制table表格显示与隐藏
        attrInfo:{
              "attrName": "",  //属性名字
              "attrValueList": [],//属性值，可以有多个
              "categoryId": 0,  //三级分类的id
              "categoryLevel": 0, //服务器需要区分
            }, //收集或修改新增的属性和属性值
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
      },
      //添加属性值
      addAttrValue() {
        //向属性值数组里面添加元素
        this.attrInfo.attrValueList.push({
          attrId:this.attrInfo.id, //添加新的属性的还没有相应的ID,点击修改属性的时候添加新的属性值需要已有属性的id
          valueName:'',//相应属性值的名称
          flag:true, //给每一个属性值添加标记，用于切换查看模式和编辑模式每个属性值可以控制自己的切换模式
        })
      },
      //点击添加属性按钮清空先前的数据
      addAttr() {
        this.isShowTable=false //切换显示平台属性
        this.attrInfo = { 
              "attrName": "", 
              "attrValueList": [],
              "categoryId": this.category3Id,  //在点击添加的时候传递三级分类的id数据
              "categoryLevel": 0, 
        }
      },
      //点击平台属性的修改按钮
      updateAttr(row) {
        this.isShowTable=false
        console.log(row)
        this.attrInfo = cloneDeep(row) //将选中的属性赋值给attrInfo,由于是把对象赋值给对象且结构复杂需要用到深拷贝
      }
    }
}
</script>

<style>

</style>