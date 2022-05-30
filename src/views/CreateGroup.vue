<template>
  <div class="creategroups">
      <Header></Header>
    <el-row type="flex" justify="center">
      <el-col :span="6"><div class="grid-content bg-yellow">
        <div class="profilePic">
        <el-upload
        :class="{disabled: uploadDisabled}"
        class="imgUpload"
        list-type="picture-card"
        action=""
        :auto-upload="false"
        :limit="1"
        accept="image/jpeg,image/gif,image/png,image/jpg"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <!-- <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar"> -->
        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
         <i class="el-icon-plus"></i>
      </el-upload>
        <!-- <img v-if="form.imageUrl" :src="form.imageUrl" onclick="$('input[id=imgUpload]').click();" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" onclick="$('input[id=imgUpload]').click();"></i>
          <input
          id="imgUpload"
          ref="fileInput"
          type="file"
          accept="image/png,image/gif,image/jpeg"
          @change="getImg($event);"
          @input="pickFile"
        /> -->
        <!-- <el-button v-if="form.imageUrl" type="danger" icon="el-icon-delete" circle @click="cancelImgUrl"></el-button> -->
        </div>
        </div></el-col>
      <el-col :span="12" ><div class="grid-content bg-yellow">
        <div class="inputBox">
          <div>
            <span>小组名</span>
            <input type="text" v-model="form.gName" placeholder="输入小组名">
          </div>
          <div>
             <span>小组类型</span>
              <el-radio-group id="radiogroup" fill="#D0E8F2" v-model="form.type">
                <el-radio-button id="radiogroupbutton" label="b">图书</el-radio-button>
                <el-radio-button id="radiogroupbutton" label="m">影视</el-radio-button>
                <el-radio-button id="radiogroupbutton" label="o">其他</el-radio-button>
              </el-radio-group>
          </div>
          <div>
             <span>小组简介</span>
            <textarea id="gDesc" v-model="form.desc" placeholder="输入小组简介(最多50字符)"></textarea>
          </div>
        </div>
        <el-button id="createGroupButton" @click="createGroup">创建</el-button>
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
      uploadDisabled: false,
      form: {
        imageUrl:'',
        gName:'',
        type:'b',
        desc:'',
        imageFile:'',
      },
    };
  },
  methods: {
      handleChange(file, fileList) {
        this.form.imageUrl = file.raw;
        this.uploadDisabled = fileList.length >= 1;
        console.log(this.uploadDisabled)
        console.log(this.form.imageUrl);
      },
      handleRemove(file, fileList){
        this.uploadDisabled = fileList.length >= 1;
      },
      handleAvatarSuccess(res, file) {
        // this.form.imageUrl = file.raw;
        // console.log(this.form.imageUrl)
      },
      beforeAvatarUpload(file) {
        const isTypeTrue = 
          file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === 'image/png';
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
        const formData = new FormData();
        // var imageFile = document.querySelector('#file');
        formData.append("groupName", this.form.gName);
        formData.append("description", this.form.desc);
        formData.append("category", this.form.type);
        formData.append("img", this.form.imageFile);

        var header = {}
        if (localStorage.getItem('token'))
            header = { 'Authorization': 'Bearer ' + localStorage.getItem('token')}

        // var header2 = {
        //       'Content-Type': 'multipart/form-data'
        //     }
        this.$axios({
            method: 'post',  
            url: '/api/v1/group/create',
            data: formData,
            headers:  header,
        })
        .then(res => {
            console.log(res);
            switch (res.status) {
              case 201:
                var id = res.data.id;
                this.$message({
                showClose: true,
                message: '创建成功！',
                type: 'success'
                })
              this.$router.push({ path: `/group/${id}` });
              }
        })
        .catch(err => {
            console.log(err);
         })
      },
      getImg(event) {
        var fileName = event.target.files[0].name;
        $(".showFileName").html(fileName);
        this.form.imageFile = event.target.files[0];
        console.log("Get IMG", this.form.imageFile);
    },
    // selectImage () {
    //   this.$refs.fileInput.click()
    // },
    pickFile () {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.form.imageUrl = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
        console.log(file);
      }
    },
    cancelImgUrl() {
      this.form.imageUrl = '';
      let input = this.$refs.fileInput
      let file = input.files
      file[0] = null;
      console.log(file);
    }
    },
}
</script>

<style>
.disabled .el-upload--picture-card{
  display: none;
}
.el-upload-list__item {
  transition: none !important;
}
.el-upload--picture-card{
  width: 256px;
  height: 256px;
}
.el-upload{
  width: 256px;
  height: 256px;
  line-height: 100px;
}
.el-upload-list--picture-card .el-upload-list__item{
  width: 256px;
  height: 256px;
  line-height: 100px;
}
.el-upload-list--picture-card .el-upload-list__item-thumbnail{
  width: 256px;
  height: 256px;
  line-height: 1000px;
}
</style>

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
  /* background: rgba(121, 163, 177, 0.4); */
  background-color: #D0E8F2;
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
#createGroupButton{
  float: right;
  margin-right: 55px;
  font-size: 24px;
  width: 120px;
  background-color: #456268;
  color: #FCF8EC;
}
.profilePic button{
  margin-left: 105px;
  margin-top: 10px;
}
.el-icon-plus{
  margin-top: 105px;
  cursor: pointer;
}
#gDesc{
  display: inline-block;
  height: 300px;
  width: 600px;
  resize: none;
  position: absolute;
  border-radius: 10px;
  /* background: rgba(121, 163, 177, 0.4); */
  background-color: #D0E8F2;
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
  background-color: whitesmoke;
}
/* .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
  cursor: pointer;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
} */
</style>

