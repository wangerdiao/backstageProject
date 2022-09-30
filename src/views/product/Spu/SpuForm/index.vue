<template>
  <div>
    <el-form label-width="80px" :model="spu">
      <el-form-item label="Spu名称">
        <el-input placeholder="Spu名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            v-for="tm in tradeMarkList"
            :key="tm.id"
            :label="tm.tmName"
            :value="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Spu描述">
        <el-input
          placeholder="Spu描述"
          type="textarea"
          rows="4"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="Spu图片">
        <!-- 上传图片 action图片上传的地址 on-preview图片预览触发on-remove删除会触发 file-list展示图片数组【数组里面必须要name，url】-->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
          :file-list="spuImg"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectAttr.length}未选择`" v-model="unSelectIdAndName">
          <el-option v-for="unselect in unSelectAttr" :key="unselect.id" :label="unselect.name" :value="`${unselect.id}:${unselect.name}`"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!unSelectIdAndName" @click="addSaleAttr">添加销售属性</el-button>
        <!-- table展示的是当前spu属于自己的销售属性 -->
        <el-table border style="margin-top: 10px" :data="spu.spuSaleAttrList">
          <el-table-column
            label="序号"
            width="80"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
          <el-table-column label="属性值名称列表">
            <template slot-scope="{ row, $index }">
              <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index,1)">
                {{ tag.saleAttrValueName }}</el-tag>
                <!-- @keyup.enter.native="handleInputConfirm"
                
               @click="showInput" -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput"  size="small" @blur="handleInputConfirm(row)" ></el-input>
              <el-button v-else  class="button-new-tag" size="small" @click="addSaleAttrValue(row)">+添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row, $index }">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0, //三级分类的id
        description: "", //描述
        spuName: "", //Spu名称
        tmId: '', //品牌id
        spuImageList: [
          //手机图片信息
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        spuSaleAttrList: [
          //平台属性于属性值
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "",
          //       saleAttrName: "",
          //       saleAttrValueName: "",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      }, //存储spu信息属性
      tradeMarkList: [], //存储品牌信息
      spuImg: [], //存储图片信息
      selectAttr: [], //平台全部的销售属性
      unSelectIdAndName:'',//收集未选择属性的id
    };
  },
  methods: {
    //当照片墙删除图片时候触发
    handleRemove(file, fileList) { //file删除的那张图，fileList照片墙剩余的图片
      console.log(file, fileList);
      this.spuImg = fileList //收集照片墙图片数据，对于已有的图片照片墙中有name,url属性，对于服务器而言不需要这两个属性，再发送请求时要处理这两个属性
    },
    //照片墙预览的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url; //图片地址赋值给这个属性
      this.dialogVisible = true;      //显示对话框
    },
    //在照片墙上传图片的回调
    handlerSuccess(response,file,fileList) {
      this.spuImg = fileList  //新增的图片也需要处理name,和url属性在提交给服务器的时候
    },
    //添加销售属性的回调
    addSaleAttr() {
      //已经收集需要添加的销售属性的信息，要把收集到的销售属性进行分割
      const [baseSaleAttrId,saleAttrName] = this.unSelectIdAndName.split(':')
      //向Spu对象的spuSaleAttrList属性中添加新的属性
      let newAttrList = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
      //添加新的销售属性
      this.spu.spuSaleAttrList.push(newAttrList)
      this.unSelectIdAndName = ''
    },
    //获取数据的回调
    async initSpuData(spu) {
      //初始化Spu数据
      let spuResult = await this.$API.Spu.getSpuProduct(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      //获取品牌信息
      let spuTradeMark = await this.$API.Spu.getSpuTradeMark();
      if (spuTradeMark.code == 200) {
        this.tradeMarkList = spuTradeMark.data;
      }
      //获取图片
      let imgResult = await this.$API.Spu.getSpuImg(spu.id);
      if (imgResult.code == 200) {
        let listArr = imgResult.data;
        //由于element ui展示图片需要数组，数组里要有name和url元素，因此需要把服务器返回的数据进行修改
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImg = listArr; //把整理好的数据赋值给定义好的变量
      }
      //获取平台的全部销售属性，总共三个
      let selectResult = await this.$API.Spu.getSpuAttrList();
      if (selectResult.code == 200) {
        this.selectAttr = selectResult.data;
      }
    },
    //添加tag按钮的回调
    addSaleAttrValue(row) {
      //点击销售属性添加按钮的时候，需要切换button与input，通过inputVisible控制
      this.$set(row,'inputVisible',true)
      //通过响应式数据inputValue字段收集新增的销售属性值
      this.$set(row,'inputValue','')
    },
    //input失去焦点事件
    handleInputConfirm(row) {
      const {baseSaleAttrId,inputValue} = row
      if(inputValue.trim() =='') { //属性值不能为空
        this.$message('属性值不能为空')
        return 
      }
      let result = row.spuSaleAttrValueList.every(item => item.saleAttrValueName!=inputValue)
      if(!result) return this.$message('不能取重复的属性值')
      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue}
      row.spuSaleAttrValueList.push(newSaleAttrValue) //新增的销售属性值
      //修改inputVisible 
      row.inputVisible=false
    },
    //保存按钮的回调
    async addOrUpdateSpu() {
      //需要整理照片墙的数据，对于图片需要携带imgName,imgUrl字段
      this.spu.spuImageList=this.spuImg.map(item => {
        return {
          imgName:item.name,
          imgUrl:item.response? item.response.data:item.url
        }
      })
      let result = await this.$API.Spu.reqAddOrUpdateSpu(this.spu)
      if(result.code==200) {
        this.$message({type:'success',message:'保存成功'})
        //通知父组件回到scene 0，让父组件区分修改和添加的保存按钮
        this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'})
      }
      Object.assign(this._data,this.$options.data())
    },
    //点击添加属性按钮时的回调
    async addSpuData(category3Id) {
      //在点击时候收集category3Id
      this.spu.category3Id = category3Id
      //获取品牌信息
      let spuTradeMark = await this.$API.Spu.getSpuTradeMark();
      if (spuTradeMark.code == 200) {
        this.tradeMarkList = spuTradeMark.data;
      }
      //获取平台的全部销售属性，总共三个
      let selectResult = await this.$API.Spu.getSpuAttrList();
      if (selectResult.code == 200) {
        this.selectAttr = selectResult.data;
      }
    },
    //取消按钮的回调
    cancel() {
      //通知父亲切换场景为0
      this.$emit('changeScene', {scene:0,flag:''})
      //清除数据,this._data是组件实例当中的响应式数据，this.$options可以获取配置对象，data()函数就是上面的data函数
      Object.assign(this._data,this.$options.data())
    }
  },
  computed:{
    //计算出未选择的销售属性
    unSelectAttr(){
      //整个平台共有颜色，尺寸，版本------selectAttr
      //当前Spu已有的销售属性spu.spuSaleAttrList
      //数组的过滤方法，从已有数组当中过滤出用户需要的元素，并未返回一个新的数据
      let result = this.selectAttr.filter(item => {
        //every数组的方法，会返回一个布尔值[真,假]
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName
        })
      })
      return result
    }
  }
};
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
