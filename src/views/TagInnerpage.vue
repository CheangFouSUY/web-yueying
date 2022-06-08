<template>
  <div class="all">
    <Header id="header"></Header>
    <div id="main" :style="{ 'min-height': mainMinHeight + 'px' }">
      <el-row>
        <span class="tag-title">#{{ tagTitle }}#</span>
        <el-row class="action">
          <span @click="openForm()"> 发布帖子 </span>
          <el-divider direction="vertical"></el-divider>
          <span v-if="!isJoined" @click="joinTag()"> 参与话题 </span>
          <span v-else @click="unjoinTag()"> 退出话题 </span>

          <el-dialog title="发布帖子" :visible.sync="formVisible">
            <el-form label-position="top" :model="form">
              <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input
                  v-model="form.title"
                  autocomplete="off"
                  maxlength="25"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="内容" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  autosize
                  v-model="form.description"
                  autocomplete="off"
                  minlength="25"
                  show-word-limit
                  resize="none"
                ></el-input>
                <el-upload
                  action=""
                  :auto-upload="false"
                  :on-change="handleChange"
                  :before-remove="beforeRemove"
                  :limit="1"
                  accept="image/jpeg,image/gif,image/png,image/jpg"
                  :on-exceed="handleExceed"
                >
                  <el-button
                    class="form-upload-img"
                    size="small"
                    type="primary"
                  >
                    <i class="el-icon-picture-outline-round"></i>
                    上传图片
                  </el-button>
                </el-upload>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button class="button-no" @click="formVisible = false"
                >取 消</el-button
              >
              <el-button class="button-yes" @click="postFeed()" v-loading.fullscreen.lock="fullscreenLoading">发布</el-button>
            </div>
          </el-dialog>
        </el-row>
      </el-row>
      <FeedBox
        v-for="item in notGroupFeeds"
        :key="item.id"
        :initialFeedId="item.id"
        :initialIsInnerpage="false"
        :initialIsPin="false"
        :initialIsFeatured="false"
        :initialIsAdmin="false"
      ></FeedBox>
    </div>
    <Footer id="footer"></Footer>
    <el-backtop target=".all">
      <i class="el-icon-arrow-up" style="color: #456268"></i>
    </el-backtop>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import FeedBox from "@/components/FeedBox.vue";
import User from "@/store/user";

export default {
  name: "TagInnerpage",
  components: {
    Header,
    Footer,
    FeedBox,
  },
  data() {
    return {
      islogin: false,
      fullscreenLoading: false,
      count: 0,
      user: "栀子花开",
      id: "",
      tagTitle: "",
      isJoined: false,
      formVisible: false,
      formLabelWidth: "120px",
      form: {
        title: "",
        description: "",
        img: "",
      },
      dataList: "",
      feeds: [],
      mainMinHeight: "",
    };
  },
  mounted() {
    var userInfo;
    if ((userInfo = User.getters.getUser(User.state()))) {
      this.islogin = true;
      this.userId = userInfo.user.id;
    }
    this.getTag();
    this.getFeed();
    this.mainMinHeight =
      document.documentElement.clientHeight -
      $("#header").outerHeight(true) -
      $("#footer").outerHeight(true) -
      6;
  },
  computed: {
    notGroupFeeds() {
      return this.feeds.filter((item) => {
        return item.isPublic;
      });
    },
  },
  methods: {
    handleChange(file, fileList) {
      this.form.img = file.raw;
      console.log(this.form.img);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    openForm() {
      if (!this.islogin) {
        this.$notify({
          showClose: true,
          type: "warning",
          title: "请先登录",
          position: "top-left",
        });
        return;
      }
      if (!this.isJoined) {
        this.$notify({
          showClose: true,
          type: "warning",
          title: "请先参与话题",
          position: "top-left",
        });
        return;
      }
      this.formVisible = true;
    },
    postFeed() {
      if (!this.islogin) {
        this.$notify({
          showClose: true,
          type: "warning",
          title: "请先登录",
          position: "top-left",
        });
        return;
      }
      if (!this.form.title) {
        this.$notify({
          showClose: true,
          type: "warning",
          title: "标题不能为空",
          position: "top-left",
        });
        return;
      } else if (this.form.description.length < 25) {
        this.$notify({
          showClose: true,
          type: "warning",
          title: "话题内容不能少于25字",
          position: "top-left",
        });
        return;
      }
      this.fullscreenLoading = true;
      let formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("img", this.form.img);
      formData.append("belongTag", this.id);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "post",
        url: "/api/v1/feed/",
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.formVisible = false;
          this.fullscreenLoading = false;
          switch (res.status) {
            case 201:
              this.$notify({
                showClose: true,
                message: "已发表帖子",
                type: "success",
                position: "top-left",
              });
              setTimeout(function () {
                location.reload();
              }, 1500);
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          switch (err.response.status) {
            case 400:
              this.$notify({
                title: "标题和内容不能为空！",
                type: "warning",
                position: "top-left",
              });
              break;
            case 401:
              this.$notify({
                title: "请先加入小组！",
                type: "warning",
                position: "top-left",
              });
              break;
          }
        });
    },
    unjoinTag() {
      let formData = new FormData();
      formData.append("tagId", this.id);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "delete",
        url: "/api/v1/tag/unjoin/" + this.id,
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          switch (res.status) {
            case 200:
              this.$notify({
                showClose: true,
                message: "已退出话题",
                type: "success",
                position: "top-left",
              });
              this.isJoined = false;
              // setTimeout(function () {
              //   location.reload();
              // }, 1500);
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    joinTag() {
      let formData = new FormData();
      formData.append("user", this.userId);
      formData.append("tag", this.id);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "post",
        url: "/api/v1/tag/join/",
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          switch (res.status) {
            case 201:
              this.$notify({
                showClose: true,
                message: "已参与话题",
                type: "success",
                position: "top-left",
              });

              this.isJoined = true;
          }
        })
        .catch((err) => {
          console.log(err);
          switch (err.response.status) {
            case 403:
              this.$notify({
                title: "请先登录",
                type: "warning",
                position: "top-left",
              });
              break;
          }
        });
    },
    getTag() {
      this.id = this.$route.params.id;

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "get",
        url: "/api/v1/tag/" + this.$route.params.id,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.tagTitle = res.data.title;
          this.isJoined = res.data.isJoined;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFeed() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      console.log(header);
      this.$axios({
        method: "get",
        url: "/api/v1/feed/list?tag=" + this.$route.params.id,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.feeds = res.data.results;
          console.log(this.feeds);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getImg(event) {
      console.log("!!!!!");
      console.log(document.querySelector("#imgUpload").files[0]);
      var fileName = event.target.files[0].name;
      $(".showFileName").html(fileName);
      console.log(fileName);
      this.form.img = event.target.files[0];
      console.log("get img! ", this.form);
    },
  },
};
</script>
<style>
.el-dialog__header {
  background-color: #ccd9de;
}
.el-dialog__title,
.el-dialog__headerbtn i {
  color: #456268 !important;
  font-size: 24px;
}
.el-form-item__label {
  color: #456268;
  font-size: 20px;
}
</style>
<style scoped>
.button-no:hover {
  background-color: rgba(121, 163, 177, 0.1);
  border-color: rgba(121, 163, 177, 0.4);
}
.button-yes:active,
.button-yes:hover {
  border-color: rgba(121, 163, 177, 0.4);
}
.button-yes {
  color: #456268;
  background-color: rgba(121, 163, 177, 0.4);
  border-color: transparent;
}
.button-no {
  color: #456268;
}
.form-button:hover {
  cursor: pointer;
}
.form-upload-img {
  margin-top: 30px;
  padding: 5px 15px;
  border: none;
  background-color: rgba(121, 163, 177, 0.25);
  color: #456268;
  border-radius: 5px;
  font-size: 18px;
}
.showFileName {
  color: #456268;
  margin: 0 15px;
  line-height: 26px;
}
#imgUpload {
  display: none;
}
.post-now:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(121, 163, 177, 0.25);
}
.post-now {
  margin-left: 45px;
  padding: 10px 20px;
  font-size: 22px;
  /* font-weight: 600; */
  color: #456268;
  border: none;
  border-radius: 10px;
  background-color: rgba(121, 163, 177, 0.4);
}

.action span:hover {
  cursor: pointer;
  color: #79a3b1;
}
.action {
  margin: 10px 0 30px;
  font-size: 18px;
  color: #456268;
}
.tag-title {
  font-size: 24px;
  font-weight: 600;
  color: #456268;
}
.el-divider {
  position: relative;
  bottom: 2px;
  margin: auto 15px;
}
#main {
  width: 1200px;
  margin: auto;
  padding: 30px 0;
  box-sizing: border-box;
}
.all {
  height: 100vh;
  overflow-x: hidden;
}
button {
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
}
#footer {
  bottom: 0;
}
</style>