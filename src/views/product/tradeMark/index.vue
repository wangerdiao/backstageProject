<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 表格组件，data表格组件展示的数据，数组类型 
        border:给表格添加边框 label:显示的标题 width：对应列的宽度 align标题的对齐方式  prop；对应列内容的字段
        注意1：elementUI中的table展示的数据以一列一列进行展示数据
      -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌logo" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器,需要展示当前第几页，数据总条数，每一页展示条数，连续页码数
    current-page代表的是当前第几页，total代表分页器一共需要展示数据条数
    page-size代表每一页需要展示多少数据 page-sizes可以设置每一页展示多少条数据
    layout可以实现分页器的布局  pager-count按钮的数量  如果9 连续页面就是7
    -->
    <el-pagination
      style="margin-top: 20px; textalign: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev,pager,next,jumper,->,sizes,total"
      @current-change="getPageList"
      @size-change="handlerSizeChange"
    >
    </el-pagination>
    <el-dialog :title="tmMark.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <!-- 展示表单元素，form表单model属性：把表单数据收集到对象身上，也可以用来表单验证
      Form组件提供了表单验证功能，通过rules属性传入约定的验证规则，将from-item的prop属性设置为需要校验的字段名即可 -->
      <el-form style="width: 80%" :model="tmMark" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmMark.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" label-width="100px" prop="logoUrl">
          <!-- 这里收集数据不可以使用v-model，action是设置图片上传地址
           :on-success可以监测图片上传成功，上传成功执行一次 :before-upload在图片上传之前执行一次-->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmMark.logoUrl" :src="tmMark.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item> 
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    var validateTmName = (rule, value, callback) => {
        if (value<2||value>10) {
          callback(new Error('请输入2-10位的品牌名称'));
        } else {
          callback();
        }
      };
    return {
      page: 1, //当前分页器第几页
      limit: 3, //列表展示多少条数据
      total: 0, //总共的数据条数
      list: [], //列表展示的数据
      dialogFormVisible: false, //控制对话框显示于隐藏
      tmMark:{ //收集品牌信息,key要根据后台给的数据写
        tmName:'', //品牌名
        logoUrl:'' ,//品牌图
      },
      rules:{ //表单验证规则,require是否必须校验，message提示信息,trigger事件触发规则
        tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { validator: validateTmName, trigger: 'change' } //自定义表单验证规则
          ],
          logoUrl: [
            { required: true, message: '请选择活动区域'}
          ],
      }
    };
  },
  mounted() {
    this.getPageList(); //获取列表数据方法
  },
  methods: {
    async getPageList(pager = 1) {
      //获取品牌列表的数据
      this.page = pager; //当分页器的页面变化时重新赋值
      const { page, limit } = this;
      let result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    handlerSizeChange(limit) {
      //当分页器展示的数据个数发生变化时候调用
      this.limit = limit;
      this.getPageList();
    },
    showDialog() {//点击显示对话框
      this.dialogFormVisible = true;
      this.tmMark = {tmName:'',logoUrl:''}  //清除先前的数据
    },
    updateTradeMark(row) {//修改品牌,row为点击品牌的信息
      this.dialogFormVisible = true;
      this.tmMark = {...row} //浅拷贝，防止tmMark全部拷贝服务器传来的数据
    },
    handleAvatarSuccess(res, file) { //上传图片成功，res和file都是上传成功后返回给前端的数据
        this.tmMark.logoUrl = res.data
      },
    beforeAvatarUpload(file) { //上传图片失败
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    addOrUpdate() { //添加或修改品牌
        //当全部的验证字段通过后再去书写业务逻辑
        this.$refs.ruleForm.validate(async(success) => {
          if(success) {
            this.dialogFormVisible=false
            let result = await this.$API.tradeMark.addOrUpdateTradeMark(this.tmMark)
            if(result.code==200) { 
              this.$message({
                type:'success',
                message:this.tmMark.id?'修改品牌成功':'添加品牌成功'
              }) //判断是添加还是修改后再提示信息
              this.getPageList(this.tmMark.id?this.page:1)
              }
          }else {
            console.log('error submit!!')
            return false
          }
        })
        
      },
    deleteTradeMark(row) { //删除品牌的操作
      console.log(row)
      this.$confirm(`是否删除${row.tmName}这一品牌`, '提示', { //弹出删除窗口
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => { //点解确定按钮触发
          let result = await this.$API.tradeMark.deleteTradeMark(row.id) //向服务器发送删除请求
          if(result.code==200) {
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPageList(this.list.length>1?this.page : this.page-1)
          }
        }).catch(() => { //点击取消按钮触发
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>