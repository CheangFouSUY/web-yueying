<template>
  <div class="Profile">
    <Header :initialUsername="form.name"/>
    <el-row type="flex" justify="center">
      <el-col :span="20"
        ><div class="profile-box">
          <el-row>
            <el-col :span="6"
              ><div class="profile-content">
                <div class="profilePic">
                  <el-upload
                    v-if="isOwnProfile"
                    id="avatar-uploader"
                    action=""
                    :http-request="uploadAvatar"
                    :show-file-list="false"
                    accept="image/jpeg,image/gif,image/png,image/jpg"
                  >
                    <!-- <el-image
                    ></el-image> -->
                    <el-avatar
                      v-if="form.imageUrl"
                      shape="square"
                      :size="256"
                      :src="form.imageUrl"
                    >
                    </el-avatar>
                    <el-avatar
                      v-else
                      shape="square"
                      :size="256"
                      icon="el-icon-user-solid"
                    >
                    </el-avatar>
                    <div id="change-pic">更换头像</div>
                  </el-upload>
                  <div v-else>
                    <el-avatar
                      v-if="form.imageUrl"
                      shape="square"
                      :size="256"
                      :src="form.imageUrl"
                    >
                    </el-avatar>
                    <el-avatar
                      v-else
                      shape="square"
                      :size="256"
                      icon="el-icon-user-solid"
                    >
                    </el-avatar>
                  </div>
                </div></div
            ></el-col>
            <el-col :span="15"
              ><div class="profile-content">
                <el-row>
                  <el-col :span="20"
                    ><div class="profile-info">
                      <span class="profile-text1">名字&nbsp;:</span>
                      <span v-if="!form.isEdit" class="profile-text2"
                        >&nbsp;{{ form.name }}</span
                      >
                      <el-input
                        v-else
                        placeholder="请输入新昵称"
                        v-model="form.name"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20"
                    ><div class="profile-info">
                      <span class="profile-text1">性别&nbsp;:</span>
                      <span class="profile-text2">&nbsp;{{ form.sexWord }}</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20"
                    ><div class="profile-info">
                      <span class="profile-text1">生日&nbsp;:</span>
                      <span class="profile-text2">&nbsp;{{ form.dob }}</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20"
                    ><div class="profile-info">
                      <span class="profile-text1">邮箱&nbsp;:</span>
                      <span class="profile-text2">&nbsp;{{ form.email }}</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20"
                    ><div class="profile-info">
                      <span class="profile-text1">自我介绍&nbsp;:</span>
                      <span class="profile-text2">&nbsp;{{ form.about }}</span>
                    </div>
                  </el-col>
                </el-row>
              </div></el-col
            >
            <el-dialog
              title="编辑个人信息"
              :visible.sync="changeVisible"
              :close-on-click-modal="false"
              :show-close="false"
            >
              <el-form label-position="top" :model="form">
                <el-form-item label="名字" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.nameTemp"
                    autocomplete="off"
                    maxlength="15"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                  <el-form-item label="性别">
                    <el-radio-group v-model="form.sexTemp">
                      <el-radio label="M">男</el-radio>
                      <el-radio label="F">女</el-radio>
                      <el-radio label="O">其他</el-radio>
                    </el-radio-group>
                  </el-form-item>
                <el-form-item label="生日">
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择你的生日日期" v-model="form.dobTemp" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="自我介绍" :label-width="formLabelWidth">
                  <el-input
                    type="textarea"
                    autosize
                    v-model="form.aboutTemp"
                    autocomplete="off"
                    show-word-limit
                    resize="none"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelChanges">取消</el-button>
                <el-button type="primary" @click="updateProfileInfo"
                  >完成编辑</el-button
                >
              </div>
            </el-dialog>
            <el-col :span="3"
              ><div class="profile-content">
                <el-button
                  v-if="isOwnProfile"
                  class="Edit"
                  @click="changeVisible = true"
                  >编辑资料</el-button
                >
                <!-- <el-button class="EditFinish" type="danger" v-else @click="form.isEdit = !form.isEdit">完成编辑</el-button> -->
              </div></el-col
            >
          </el-row>
        </div></el-col
      >
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <FeedBox
          v-for="item in feeds"
          :key="item.id"
          :initialFeedId="item.id"
          :initialIsPin="false"
          :initialIsFeatured="false"
          :initialIsAdmin="false"
        ></FeedBox>
      </el-col>
    </el-row>
    <Footer id="footer" />
    <el-backtop target=".Profile">
      <i class="el-icon-arrow-up" style="color: #456268"></i>
    </el-backtop>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import FeedBox from "@/components/FeedBox.vue";
import user from "@/store/user";

export default {
  name: "Profile",
  components: {
    Header,
    Footer,
    FeedBox,
  },
  watch: {
    $route: {
      handler: "profileReload",
    },
  },
  data() {
    return {
      userId: "123456",
      isOwnProfile: false,
      form: {
        imageUrl: "",
        isEdit: false,
        id: "",
        name: "",
        nameTemp: "",
        sexWord: "",
        sex: "",
        sexTemp: "",
        dob: "",
        dobTemp: "",
        email: "",
        about: "",
        aboutTemp: "",
      },
      changeVisible: false,
      formLabelWidth: "120px",
      feeds: [],
    };
  },
  created() {
    var userInfo;
    if ((userInfo = user.getters.getUser(user.state()))) {
      this.userId = userInfo.user.id;
      if (this.userId == this.$route.params.id) this.isOwnProfile = true;
    }
    this.getProfile();
    this.getFeed();
  },
  methods: {
    profileReload() {
      location.reload();
    },
    async uploadAvatar(file) {
      const formData = new FormData();
      formData.append("email", this.form.email);
      formData.append("username", this.form.name);
      formData.append("profile", file.file);
      formData.append("userId", this.form.id);
      console.log(file.file);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "put",
        url: "/api/v1/user/" + this.$route.params.id,
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.form.imageUrl = res.data.profile;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getFeed() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "get",
        url: "/api/v1/feed/list?createdBy=" + this.$route.params.id,
        headers: header,
      })
        .then((res) => {
          this.feeds = res.data.results;
          console.log(this.feeds);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getProfile() {
      console.log(this.$route.params.id);
      await this.$axios({
        method: "get",
        url: "/api/v1/user/" + this.$route.params.id,
      })
        .then((res) => {
          var r = res.data;
          console.log(r);
          this.form.id = r.id;
          this.form.name = r.username;
          this.form.nameTemp = r.username;
          this.form.sex = r.gender;
          this.form.sexTemp = r.gender;
          console.log(this.form.sexTemp);
          this.form.dob = r.dob;
          this.form.dobTemp = r.dob;
          this.form.email = r.email;
          this.form.about = r.about;
          this.form.aboutTemp = r.about;
          if (r.profile) this.form.imageUrl = r.profile;
          if (this.form.sex == "M") {
            this.form.sexWord = "男";
          }
          if (this.form.sex == "F") {
            this.form.sexWord = "女";
          }
          if (this.form.sex == "O") {
            this.form.sexWord = "其他";
          }
        })
        .catch((err) => {
          this.$message.warning(err);
        });
    },
    cancelChanges() {
      this.changeVisible = false;
      this.form.nameTemp = this.form.name;
      this.form.aboutTemp = this.form.about;
      this.form.sexTemp = this.form.sex;
      this.form.dobTemp = this.form.dob;
    },
    async updateProfileInfo() {
      const formData = new FormData();
      formData.append("email", this.form.email);
      formData.append("username", this.form.nameTemp);
      formData.append("userId", this.form.id);
      formData.append("about", this.form.aboutTemp);
      formData.append("gender", this.form.sexTemp);
      formData.append("dob", this.form.dobTemp);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "put",
        url: "/api/v1/user/" + this.$route.params.id,
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.form.name = this.form.nameTemp;
          this.form.about = this.form.aboutTemp;
          this.form.dob = this.form.dobTemp;
          this.form.sex = this.form.sexTemp;
          if (this.form.sex == "M") {
            this.form.sexWord = "男";
          }
          if (this.form.sex == "F") {
            this.form.sexWord = "女";
          }
          if (this.form.sex == "O") {
            this.form.sexWord = "其他";
          }
          this.changeVisible = false;
          setTimeout(function () {
            location.reload(true);
          }, 500);
          // this.$store.commit('saveUserInfo', {
          // user: {
          //     'username': res.data.username,
          //     "confirmed": true,
          //     'id': res.data.id,
          //     "profilePic": res.data.profile,
          //  }
          // });
          this.$message.success("恭喜！修改成功");
        })
        .catch((err) => {
          console.log(err);
          this.$message.warning("抱歉！用户名已被使用");
        });
    },
  },
};
</script>

<style scoped>
.profile-box {
  margin-top: 20px;
  padding-top: 35px;
  height: 300px;
  /* width: 1266px; */
  background-color: #fcf8ec;
  box-shadow: 0px 4px 20px 3px rgba(0, 0, 0, 0.25);
  margin-bottom: 40px;
}
.profile-content {
  height: 300px;
}
.profile-content .el-row {
  margin-bottom: 10px;
}
.profilePic:hover #change-pic {
  display: block;
}
#change-pic:hover {
  cursor: pointer;
}
#change-pic {
  display: none;
  height: 40px;
  width: 256px;
  position: absolute;
  top: 216px;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
}
.profilePic {
  margin: auto;
  width: 256px;
  height: 256px;
}
.profilePic .el-image {
  display: block;
  width: 256px;
  height: 256px;
}
.profile-info {
  font-size: 20px;
  margin-top: 15px;
}
.profile-info .el-input {
  display: inline-block;
  width: 200px;
  margin-left: 10px;
  font-size: 19px;
  position: absolute;
  top: 10px;
}
.profile-text1 {
  color: #79a3b1;
}
.profile-text2 {
  color: #456268;
}
.Edit {
  background-color: #456268;
  color: #fcf8ec;
}
.bg-blue {
  background: blue;
}
.bg-red {
  background: red;
}
.bg-yellow {
  background: yellow;
}
.feedbox {
  /* width: 1266px; */
}
.Profile {
  height: 100vh;
  overflow-x: hidden;
}
#footer {
  position: relative;
  height: 88px;
}
</style>

<style>
.avatar-uploader .el-upload {
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
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
</style>