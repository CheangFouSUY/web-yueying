<template>
  <div class="creategroups">
      <Header></Header>
    <el-row type="flex" justify="center">
      <el-col :span="6"><div class="grid-content bg-yellow">
        <div class="profilePic">
        <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
        </div>
        </div></el-col>
      <el-col :span="12" ><div class="grid-content bg-yellow">
        <div class="inputBox">
          <div>
            <span>小组名</span>
            <input type="text" placeholder="输入小组名">
          </div>
          <div>
             <span>小组类型</span>
              <el-radio-group id="radiogroup" fill="rgba(121, 163, 177, 0.4)" v-model="radio1">
                <el-radio-button id="radiogroupbutton" label="图书"></el-radio-button>
                <el-radio-button id="radiogroupbutton" label="影视"></el-radio-button>
                <el-radio-button id="radiogroupbutton" label="其他"></el-radio-button>
              </el-radio-group>
          </div>
          <div>
             <span>小组简介</span>
            <textarea id="gDesc" placeholder="输入小组简介（最多50字符）"></textarea>
          </div>
        </div>
        <el-button @click="createGroup">创建</el-button>
        </div></el-col>
    </el-row>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'CreateGroup',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      imageUrl: '',
      input: '',
      groupCreate: {
        name:'',
        type:'',
        desc:'',
      },
      radio1: '图书',
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isTypeTrue = 
          file.type === "image/jpeg" ||
          file.type === "image/jpg";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isTypeTrue) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return (isTypeTrue && isLt2M);
      },
      createGroup() {
        this.$message({
            showClose: true,
            message: '创建成功！',
            type: 'success'
        })
          this.$router.push("/group/inner");
      }
    },
}
</script>

<style scoped>
.content{
  margin: auto;
  background-color: #FCF8EC;
  height: 550px;
  width: 90%;
  margin-top: 10px;
}
.el-row {
  margin-bottom: 20px;
  margin-top: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-yellow {
  background-color: #FCF8EC;
}
.grid-content {
  min-height: 520px;
  padding-top: 50px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
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
  width: 256px;
  height: 256px;
  line-height: 256px;
  text-align: center;
  background-color: white;
}
.avatar {
  width: 256px;
  height: 256px;
  display: block;
}
.profilePic{
  margin: auto;
  width: 256px;
  height: 256px;
}
.inputBox {
  height: 450px;
}
.inputBox input{
  font-size: 20px;
  border-radius: 10px;
  background: rgba(121, 163, 177, 0.4);
  margin-left: 35px;
  padding-left: 5px;
  padding-right: 5px;
  border: none;
  height: 40px;
}
.inputBox input:focus{
  outline: none;
}
.inputBox span{
  display: inline-block;
  margin-bottom: 30px;
  font-size: 24px;
  color: #456268;
  font-weight: bold;
}
.grid-content button{
  float: right;
  margin-right: 55px;
  font-size: 24px;
  background-color: #456268;
  color: #FCF8EC;
}
#gDesc{
  display: inline-block;
  height: 300px;
  width: 600px;
  resize: none;
  position: absolute;
  border-radius: 10px;
  background: rgba(121, 163, 177, 0.4);
  font-size: 20px;
  margin-left: 10px;
  border: none;
  padding-left: 5px;
  padding-right: 5px;
}
#gDesc:focus{
  outline: none;
}
#radiogroup{
  margin-left: 10px;
}
</style>

<style>
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color:#456268;
}
.el-radio-button__inner{
  font-size: 22px;
}
.el-radio-button__inner:hover{
  color:grey;
}
</style>

