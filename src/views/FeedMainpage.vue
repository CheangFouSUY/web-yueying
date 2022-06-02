<template>
  <div class="all">
    <Header></Header>
    <div class="main">
      <el-row class="action">
        <el-col :span="20">
          <span :style="{ color: allColor }" @click="showAll()">所有</span>
          <el-divider direction="vertical"></el-divider>
          <span :style="{ color: followColor }" @click="showFollow()"
            >关注</span
          >
        </el-col>
        <!-- <el-col :span="8">编辑已关注话题</el-col> -->
        <el-col :span="4">
          <el-button class="post-now" type="text" @click="formVisible = true"
            >发表话题 <i class="el-icon-position"></i
          ></el-button>

          <el-dialog title="发布话题" :visible.sync="formVisible">
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
              <el-button class="button-no" @click="formVisible = false">取 消</el-button>
              <el-button class="button-yes" @click="postFeed()">发布</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <div v-if="isShowFollow">
        <FeedBox
          v-for="item in followedFeeds"
          :key="item.id"
          :initialFeedId="item.id"
          :initialIsPin= "false"
          :initialIsFeatured="false"
          :initialIsAdmin="false"
        ></FeedBox>
      </div>
      <div v-else>
        <FeedBox
          v-for="item in feeds"
          :key="item.id"
          :initialFeedId="item.id"
          :initialIsPin= "false"
          :initialIsFeatured="false"
          :initialIsAdmin="false"
        ></FeedBox>
      </div>
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
      feeds: [
        // {
        //   id: "F0001",
        //   publisher: "娱乐八卦姐",
        //   time: 1642014005919,
        //   title: "布魯斯威利罹失語症宣布息影　「壓箱作」導演：他是偉大的人",
        //   fullContent:
        //     "67歲美國影星布魯斯威利（Bruce Willis）在今年3月閃電宣布引退，家人證實他罹患失語症，將漸漸失去說話和閱讀的能力。今年來他接片數量雖不少，但戲份大多不如以往，壓箱作品之一的《終極夜路》（Gasoline Alley），也將於近期在台灣上映。\n\n以洛杉磯街頭為背景的《終極夜路》，由布魯斯威利和戴文沙瓦（Devon Sawa）主演。故事描述一名有前科的刺青師，被警方認定為一宗連續殺人案的嫌疑犯，為了證明自己的清白，他必須設法查出真相。導演愛德華德雷克（Edward Drake）已經是第四次與布魯斯威利合作，對於這位昔日動作天王的表現，他依舊是讚譽有佳：「布魯斯是我有幸認識和合作過的最善良的人之一。」為了向布魯斯威利過去的事蹟致意，他表示劇組很認真的在製作這部電影，「我對這個人的評價不能再高了，他是個偉大的人。」\n\n除了布魯斯威利之外，愛德華德雷克這次還邀請曾演出《絕命終結站》的性格男星戴文沙瓦演出，對於這次和他合作的心得，愛德華德雷克表示：「戴文是我合作過最好的演員之一。他是非凡的。你可以從他的眼神中看出他的角色正在做決定，當他在推測他的選擇可能帶來的後果。」他又說：「當我遇到戴文之後，我才意識到我們有機會製作一部非常特別的作品。」《終極夜路》將於6月2日上映。\n\n转载于：ETtoday新聞雲",
        //   showContent: "",
        //   isExpand: false,
        //   image: [
        //     require("@/assets/feedpic1.jpg"),
        //     require("@/assets/feedpic2.jpg"),
        //   ],
        //   likeCount: 204,
        //   commentCount: 2,
        //   userComment: "",
        //   isFollow: false,
        //   isLike: true,
        //   comments: [
        //     {
        //       id: "C2001",
        //       publisher: "老公是王一博",
        //       time: "1651014005919",
        //       contents: "太帅啦",
        //       image: [],
        //       likes: 12,
        //       dislikes: 0,
        //       isLike: true,
        //       isDislike: false,
        //     },
        //     {
        //       id: "C2002",
        //       publisher: "我是我，不一样的花火",
        //       time: "1651815905919",
        //       contents: "布鲁斯威利yyds!!!!",
        //       image: [require("@/assets/feedpic3.jpg")],
        //       likes: 8,
        //       dislikes: 2,
        //       isLike: false,
        //       isDislike: false,
        //     },
        //   ],
        // },
        // {
        //   id: "F0002",
        //   publisher: "周董啦啦啦",
        //   time: 1651714005919,
        //   title: "快訊／昆凌生了！　周杰倫罕見「曝光三女兒正臉超Q照」：辛苦了",
        //   fullContent:
        //     "周杰倫和昆凌終於迎接三寶誕生！稍早昆凌在IG發文，正式官宣兩人的三女兒來到，「Just when you think you know Love, something little comes along to remind you just HOW BIG IT REALLY IS.」（當你以為你已經了解什麼是愛，有些小事情就會來提醒你，愛有多麽巨大。）\n\n而周杰倫更是罕見直接PO出女兒的正臉照，「母女兩位都辛苦了，@hannah_quinlivan，Thank God for this beautiful gift! （感謝神送來這麼美麗的禮物）」以往大女兒和二兒子幾乎沒有曝光過正面清晰長相，周董這回卻罕見讓小女兒露臉，可見得他心情有多麽愉悅。不過根據照片，小朋友看起來應已出生一陣子。\n\n先前周董好友劉畊宏在直播中，不小心透露周董女兒在上個月21日出生，雖然隨後他表示是誤會一場，但還是讓不少網友發現些許疑點，認為周董女兒很有可能真的已經出生，如今周董和昆凌選擇親自公布喜訊，瞬間也湧進不少粉絲祝福。對此，目前周董所屬杰威爾暫無回應。",
        //   showContent: "",
        //   isExpand: false,
        //   image: [
        //     require("@/assets/feedpic4.jpg"),
        //     require("@/assets/feedpic5.jpg"),
        //   ],
        //   likeCount: 204,
        //   commentCount: 5,
        //   userComment: "",
        //   isFollow: true,
        //   isLike: false,
        //   comments: [
        //     {
        //       id: "C3001",
        //       publisher: "看什么看",
        //       time: "1651814005919",
        //       contents: "太可爱了吧",
        //       image: [],
        //       likes: 80,
        //       dislikes: 0,
        //       isLike: true,
        //       isDislike: false,
        //     },
        //     {
        //       id: "C3002",
        //       publisher: "没看过帅哥？",
        //       time: "1651955905919",
        //       contents: "要99鸭！！！！",
        //       image: [],
        //       likes: 45,
        //       dislikes: 0,
        //       isLike: false,
        //       isDislike: false,
        //     },
        //     {
        //       id: "C3003",
        //       publisher: "还是没看过美女？",
        //       time: "1651966905919",
        //       contents: "好可爱！！",
        //       image: [],
        //       likes: 40,
        //       dislikes: 0,
        //       isLike: false,
        //       isDislike: false,
        //     },
        //     {
        //       id: "C3004",
        //       publisher: "再看也不是你的",
        //       time: "1652055905919",
        //       contents: "周董yyds",
        //       image: [],
        //       likes: 61,
        //       dislikes: 0,
        //       isLike: false,
        //       isDislike: false,
        //     },
        //     {
        //       id: "C3005",
        //       publisher: "你可以走了",
        //       time: "1652072905919",
        //       contents: "芜湖",
        //       image: [],
        //       likes: 20,
        //       dislikes: 2,
        //       isLike: false,
        //       isDislike: false,
        //     },
        //   ],
        // },
      ],
    };
  },
  mounted() {
    var userInfo;
    if ((userInfo = User.getters.getUser(User.state()))) {
      this.islogin = true;
      this.userId = userInfo.user.id;
    }
    this.getFeed();
  },
  computed: {
    followedFeeds() {
      return this.feeds.filter((item) => {
        return item.isFollow;
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
          title: "话题内容不能少于25字",
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
          switch (res.status) {
            case 201:
              this.$notify({
                showClose: true,
                message: "已发表话题",
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
  },
};
</script>
<style>
.el-dialog__header {
  background-color: #ccd9de;
}
.el-dialog__title,
.el-dialog__headerbtn i{
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
.button-yes:active, .button-yes:hover {
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
}
.action {
  margin: 0 0 30px;
  line-height: 36px;
  vertical-align: middle;
  font-size: 24px;
  /* outline: 1px black solid; */
}
.el-divider {
  position: relative;
  bottom: 3px;
  margin: auto 15px;
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