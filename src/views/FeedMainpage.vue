<template>
  <div class="all">
    <Header></Header>
    <div class="main">
      <div class="page-title">
        <img src="@/assets/Feed.svg" alt="feed icon" />
        <span>话题广场</span>
      </div>
      <el-row class="tag-box">
        
        <span v-for="item in tags" :key="item.id" @click="enterTag(item.id)">
        #{{ item.title }}#
        </span>
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
  name: "FeedMainpage",
  components: {
    Header,
    Footer,
    FeedBox,
  },
  data() {
    return {
      islogin: false,
      user: "栀子花开",
      activeName: "all",
      isShowFollow: false,
      allColor: "#79A3B1",
      followColor: "#456268",
      formVisible: false,
      formLabelWidth: "120px",
      form: {
        title: "",
        description: "",
        img: "",
      },
      dataList: "",
      feeds: [],
      tags: [],
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
    postFeed() {
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
          title: "帖子内容不能少于25字",
          position: "top-left",
        });
        return;
      }
      let formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("img", this.form.img);

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
    showAll() {
      this.isShowFollow = false;
      this.allColor = "#79A3B1";
      this.followColor = "#456268";
    },
    showFollow() {
      this.isShowFollow = true;
      this.followColor = "#79A3B1";
      this.allColor = "#456268";
    },
    getTag() {
      this.$axios({
        method: "get",
        url: "/api/v1/tag/list",
      }).then((res) => {
        console.log(res);
        this.tags = res.data.results;
        console.log(this.tags);
      }).then((err) =>{
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
        url: "/api/v1/feed/list",
        headers: header,
      }).then((res) => {
        console.log(res);
        this.feeds = res.data.results;
        console.log(this.feeds);
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
    enterTag(tagid) {
      this.$router.push({ path: `/tag/${tagid}` });
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

.tag-box span:hover {
  color: #79a3b1;
  cursor: pointer;
}
.tag-box span{
  display: inline-block;
  width: 33%;
  margin: 5px 0;
  font-size: 20px;
  color: #456268;
  /* outline: 1px black solid; */
}
.tag-box {
  margin: 10px 0 30px;
}
.page-title img {
  width: 65px;
  /* margin: auto 0 auto 80px; */
  vertical-align: middle;
}
.page-title span {
  vertical-align: middle;
  margin-left: 5px;
}
.page-title {
  font-size: 32px;
  margin-top: 20px;
  color: #456268;
}

.main {
  width: 1200px;
  margin: 30px auto;
}
.all {
  height: 100vh;
  overflow-x: hidden;
}
button {
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
}
#footer {
  position: relative;
  height: 88px;
}
</style>