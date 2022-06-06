<template>
  <div class="report">
    <Header></Header>
    <div class="name">
      <el-row>
        <span id="namespan">举报者姓名&nbsp;:</span>
        <span id="name">{{ Report.reporter }}</span>
      </el-row>
      <el-row>
        <span id="conspan">&nbsp;&nbsp;举报内容&nbsp;&nbsp;:</span>
        <span id="con">[{{ Report.getreport }}] {{ Report.con }}</span>
      </el-row>
    </div>
    <div class="content">
      <div>
        <span>举报标题 :</span>
        <input v-model="Report.title" type="text" placeholder="举报标题" />
      </div>
      <div>
        <span>举报类型 :</span>
        <select id="reportType" v-model="Report.type" name="reportType">
          <option style="display: none"></option>
          <option value="1">垃圾内容</option>
          <option value="2">色情内容</option>
          <option value="3">非法活动</option>
          <option value="4">侵犯版权</option>
          <option value="5">骚扰、欺凌和威胁</option>
          <option value="6">仇恨言论</option>
          <option value="7">暴力内容</option>
          <!-- <option value="8">其他</option> -->
        </select>
      </div>
      <div class="concontent">
        <span>举报详情 :</span>
        <textarea
          id="content"
          name="content"
          placeholder="请输入举报详情(不少于15字符)"
          v-model="Report.content"
        ></textarea>
      </div>
      <button @click="Submit()">提交</button>
    </div>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import User from "@/store/user";

export default {
  components: {
    Header,
    Footer,
    User,
  },
  mounted() {
    var userInfo;
    if ((userInfo = User.getters.getUser(User.state()))) {
      this.islogin = true;
      this.Report.reporter = userInfo.user.username;
    }
    this.getDetail();
  },
  methods: {
    Submit() {
      if (!this.Report.title) {
        this.$notify({
          showClose: true,
          message: "标题不可为空！",
          type: "warning",
          position: "top-left",
        });
        return;
      }
      if (this.Report.content.length < 15) {
        this.$notify({
          showClose: true,
          message: "举报详情字符字数不得少于15",
          type: "warning",
          position: "top-left",
        });
        return;
      }
      let formData = new FormData();
      formData.append("title", this.Report.title);
      formData.append("description", this.Report.content);
      formData.append("category", this.Report.type);
      if (this.Report.isFeed) formData.append("reportFeed", this.Report.feedId);
      else formData.append("reportReview", this.Report.reviewId);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "post",
        url: "/api/v1/report/",
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.$message({
            showClose: true,
            message: "提交成功，感谢您的举报！",
            type: "success",
          });
            this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getDetail() {
      var arr = this.$route.params.id.split("&");

      if (arr[0] == "f") {
        this.Report.isFeed = true;
        await this.$axios({
          method: "get",
          url: "/api/v1/feed/" + arr[1],
        })
          .then((res) => {
            this.Report.feedId = arr[1];
            this.Report.con = res.data.description;
            this.Report.getreportid = res.data.createdBy;
          })
          .catch((err) => {
            console.log(err);
          });

        await this.$axios
          .get("/api/v1/user/" + this.Report.getreportid)
          .then((res) => {
            this.Report.getreport = res.data.username;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await this.$axios({
          method: "get",
          url: "/api/v1/review/" + arr[1],
        })
          .then((res) => {
            this.Report.reviewId = arr[1];
            this.Report.con = res.data.description;
            this.Report.getreportid = res.data.createdBy;
          })
          .catch((err) => {
            console.log(err);
          });

        await this.$axios
          .get("/api/v1/user/" + this.Report.getreportid)
          .then((res) => {
            this.Report.getreport = res.data.username;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  data() {
    return {
      Report: {
        reporter: "乐乐",
        getreportid: "123456",
        getreport: "黄乐一",
        con: "惊！到底是道德沦丧还是人性扭曲？为什么会出现这样惊人的现象，我们细看",
        title: "",
        type: "",
        content: "",
        isFeed: false,
        reviewId: "",
        feedId: "",
      },
    };
  },
};
</script>

<style scoped>
.name {
  background-color: #fcf8ec;
  /* border: black solid 1px; */
  margin: 20px auto auto 100px;
  width: 800px;
  height: 110px;
  box-shadow: 0px 4px 5px rgba(0, 9, 236, 0.25);
}
.name span {
  display: inline-block;
  /* outline: black solid 1px; */
  font-size: 24px;
  vertical-align: middle;
  margin-left: 10px;
}
#name,
#con {
  display: inline-block;
  margin-left: 10px;
  height: 40px;
  width: 300px;
  margin-top: 6px;
  padding-top: 5px;
  padding-left: 5px;
  border-radius: 10px;
  background-color: #d0e8f2;
  border: none;
  font-size: 22px;
}
#conspan {
  margin-left: 13px;
}
#con {
  width: 620px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#namespan {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.content {
  background-color: #fcf8ec;
  /* border: black solid 1px; */
  margin: 20px auto 18px 100px;
  padding-top: 12px;
  width: 1300px;
  height: 430px;
  box-shadow: 0px 4px 5px rgba(0, 9, 236, 0.25);
}
.content span {
  display: inline-block;
  font-size: 24px;
  margin-left: 20px;
  /* vertical-align: middle; */
}
.content input,
.content select {
  margin-left: 22px;
  display: inline-block;
  height: 40px;
  width: 1130px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: none;
  background-color: #d0e8f2;
  font-size: 22px;
  padding-left: 5px;
}
.content input:focus,
.content textarea:focus {
  outline: none;
}
.concontent {
  margin-top: 10px;
}
.content button {
  display: block;
  float: right;
  margin-right: 20px;
  margin-top: 225px;
  width: 165px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #456268;
  color: #fcf8ec;
  font-size: 20px;
}
.content button:hover {
  cursor: pointer;
  background-color: rgba(121, 163, 177);
  outline: none;
}
#reportType {
  width: 300px;
}
#content {
  display: inline-block;
  height: 240px;
  border: none;
  resize: none;
  position: absolute;
  border-radius: 10px;
  background-color: #d0e8f2;
  margin-left: 22px;
  font-size: 22px;
  width: 1130px;
  padding-left: 5px;
  padding-top: 5px;
}
#footer{
  position: relative;
  height: 88px;
}
</style>