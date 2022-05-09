<template>
  <div>
    <Header :isLogin="isLogin" :userInfo="userInfo"></Header>
    <div class="main">
      <el-row class="action">
        <el-col :span="8">
          <span :style="{ color: allColor }" @click="showAll()">所有</span>
          <el-divider direction="vertical"></el-divider>
          <span :style="{ color: followColor }" @click="showFollow()">
            关注
          </span>
        </el-col>
        <!-- <el-col :span="8">编辑已关注话题</el-col> -->
        <!-- <el-col :span="8">发表话题</el-col> -->
      </el-row>
      <FeedBox :initialFeed="feeds" :initialUser="user" :isShowFollow="isShowFollow"></FeedBox>
    </div>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import FeedBox from "@/components/FeedBox.vue";

export default {
  name: "FeedMainpage",
  components: {
    Header,
    Footer,
    FeedBox,
  },
  data() {
    return {
      user: "栀子花开",
      activeName: "all",
      isShowFollow: false,
      allColor: "#79A3B1",
      followColor: "#456268",
      feeds: [
        {
          id: "F0001",
          publisher: "娱乐八卦姐",
          time: 1642014005919,
          title: "布魯斯威利罹失語症宣布息影　「壓箱作」導演：他是偉大的人",
          fullContent:
            "67歲美國影星布魯斯威利（Bruce Willis）在今年3月閃電宣布引退，家人證實他罹患失語症，將漸漸失去說話和閱讀的能力。今年來他接片數量雖不少，但戲份大多不如以往，壓箱作品之一的《終極夜路》（Gasoline Alley），也將於近期在台灣上映。\n\n以洛杉磯街頭為背景的《終極夜路》，由布魯斯威利和戴文沙瓦（Devon Sawa）主演。故事描述一名有前科的刺青師，被警方認定為一宗連續殺人案的嫌疑犯，為了證明自己的清白，他必須設法查出真相。導演愛德華德雷克（Edward Drake）已經是第四次與布魯斯威利合作，對於這位昔日動作天王的表現，他依舊是讚譽有佳：「布魯斯是我有幸認識和合作過的最善良的人之一。」為了向布魯斯威利過去的事蹟致意，他表示劇組很認真的在製作這部電影，「我對這個人的評價不能再高了，他是個偉大的人。」\n\n除了布魯斯威利之外，愛德華德雷克這次還邀請曾演出《絕命終結站》的性格男星戴文沙瓦演出，對於這次和他合作的心得，愛德華德雷克表示：「戴文是我合作過最好的演員之一。他是非凡的。你可以從他的眼神中看出他的角色正在做決定，當他在推測他的選擇可能帶來的後果。」他又說：「當我遇到戴文之後，我才意識到我們有機會製作一部非常特別的作品。」《終極夜路》將於6月2日上映。\n\n转载于：ETtoday新聞雲",
          showContent: "",
          isExpand: false,
          image: [
            require("@/assets/feedpic1.jpg"),
            require("@/assets/feedpic2.jpg"),
          ],
          likeCount: 204,
          commentCount: 2,
          userComment: "",
          isFollow: false,
          isLike: true,
          comments: [
            {
              id: "C2001",
              publisher: "老公是王一博",
              time: "1651014005919",
              contents: "太帅啦",
              image: [],
              likes: 12,
              dislikes: 0,
              isLike: true,
              isDislike: false,
            },
            {
              id: "C2002",
              publisher: "我是我，不一样的花火",
              time: "1651815905919",
              contents: "布鲁斯威利yyds!!!!",
              image: [require("@/assets/feedpic3.jpg")],
              likes: 8,
              dislikes: 2,
              isLike: false,
              isDislike: false,
            },
          ],
        },
        {
          id: "F0002",
          publisher: "周董啦啦啦",
          time: 1651714005919,
          title: "快訊／昆凌生了！　周杰倫罕見「曝光三女兒正臉超Q照」：辛苦了",
          fullContent:
            "周杰倫和昆凌終於迎接三寶誕生！稍早昆凌在IG發文，正式官宣兩人的三女兒來到，「Just when you think you know Love, something little comes along to remind you just HOW BIG IT REALLY IS.」（當你以為你已經了解什麼是愛，有些小事情就會來提醒你，愛有多麽巨大。）\n\n而周杰倫更是罕見直接PO出女兒的正臉照，「母女兩位都辛苦了，@hannah_quinlivan，Thank God for this beautiful gift! （感謝神送來這麼美麗的禮物）」以往大女兒和二兒子幾乎沒有曝光過正面清晰長相，周董這回卻罕見讓小女兒露臉，可見得他心情有多麽愉悅。不過根據照片，小朋友看起來應已出生一陣子。\n\n先前周董好友劉畊宏在直播中，不小心透露周董女兒在上個月21日出生，雖然隨後他表示是誤會一場，但還是讓不少網友發現些許疑點，認為周董女兒很有可能真的已經出生，如今周董和昆凌選擇親自公布喜訊，瞬間也湧進不少粉絲祝福。對此，目前周董所屬杰威爾暫無回應。",
          showContent: "",
          isExpand: false,
          image: [
            require("@/assets/feedpic4.jpg"),
            require("@/assets/feedpic5.jpg"),
          ],
          likeCount: 204,
          commentCount: 5,
          userComment: "",
          isFollow: true,
          isLike: false,
          comments: [
            {
              id: "C3001",
              publisher: "看什么看",
              time: "1651814005919",
              contents: "太可爱了吧",
              image: [],
              likes: 80,
              dislikes: 0,
              isLike: true,
              isDislike: false,
            },
            {
              id: "C3002",
              publisher: "没看过帅哥？",
              time: "1651955905919",
              contents: "要99鸭！！！！",
              image: [],
              likes: 45,
              dislikes: 0,
              isLike: false,
              isDislike: false,
            },
            {
              id: "C3003",
              publisher: "还是没看过美女？",
              time: "1651966905919",
              contents: "好可爱！！",
              image: [],
              likes: 40,
              dislikes: 0,
              isLike: false,
              isDislike: false,
            },
            {
              id: "C3004",
              publisher: "再看也不是你的",
              time: "1652055905919",
              contents: "周董yyds",
              image: [],
              likes: 61,
              dislikes: 0,
              isLike: false,
              isDislike: false,
            },
            {
              id: "C3005",
              publisher: "你可以走了",
              time: "1652072905919",
              contents: "芜湖",
              image: [],
              likes: 20,
              dislikes: 2,
              isLike: false,
              isDislike: false,
            },
          ],
        },
      ],
    };
  },
  methods: {
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
  },
};
</script>

<style scoped>
.el-icon-picture-outline-round:hover,
.el-icon-position:hover {
  cursor: pointer;
  color: #79a3b1;
}
.el-icon-picture-outline-round,
.el-icon-position {
  margin: 0 0 5px 20px;
  font-size: 24px;
  line-height: 30px;
}
.publish-write:focus-within {
  background-color: rgba(121, 163, 177, 0.2);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
}
.publish-box input:focus {
  outline: none;
}
.publish-box input {
  width: 1060px;
  margin: 5px;
  padding: 10px;
  border: none;
  background: none;
  color: #456268;
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
}
.publish-write {
  margin: 5px 0;
  border-radius: 10px;
  background: rgba(121, 163, 177, 0.1);
}
.comment-like-count {
  font-size: 12px;
}
.comment-action img:hover {
  cursor: pointer;
}
.comment-action img {
  height: 28px;
}
.comment-upload-image button {
  border: none;
  background: none;
}
.comment-upload-image {
  display: inline-block;
}
.comment-action {
  width: 300px;
  padding-top: 10px;
}
.comment-time {
  font-size: 12px;
  color: rgb(149, 149, 149);
}
.comment-publisher {
  font-size: 18px;
  font-weight: 600;
}
.comment-box {
  padding: 15px 0;
  /* outline: 1px black solid; */
}

.like-comment-wrap {
  padding-top: 20px;
}
.like-comment-wrap span {
  display: inline-block;
  margin-right: 20px;
  line-height: 30px;
  font-size: 16px;
  vertical-align: middle;
}
.like-comment-wrap img {
  height: 36px;
  vertical-align: middle;
}
.like-comment-wrap img:hover,
.bookmark:hover {
  cursor: pointer;
}
.comment-wrap {
  /* width: 1200px; */
  margin: 30px auto;
  /* padding: 30px 30px 10px; */
}

.feed-unfollow:hover,
.feed-follow:hover {
  cursor: pointer;
}
.feed-unfollow {
  width: 130px;
  margin-right: 20px;
  font-size: 18px;
  line-height: 32px;
  font-weight: 600;
  border-radius: 15px;
  background: none;
  color: #456268;
  border: #456268 1px solid;
}
.feed-follow {
  width: 130px;
  margin-right: 20px;
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  border: 1px #456268 solid;
  color: #fcf8ec;
  background-color: #456268;
  border-radius: 15px;
}
.feed-image img {
  width: 800px;
  margin: 10px;
}
.expand-button:hover {
  cursor: pointer;
  color: #8ebfce;
}
.expand-button {
  background: none;
  border: none;
  font-size: 16px;
  color: #79a3b1;
}
.feed-content {
  font-size: 18px;
}
.feed-title {
  margin: 20px 0;
  font-size: 28px;
  font-weight: 600;
}
.feed-time {
  color: grey;
}
.feed-publisher {
  font-size: 22px;
  font-weight: 600;
  /* outline: 1px black solid; */
}
.feed-box {
  color: #456268;
  padding: 50px 60px;
  margin: 0 0 50px;
  background-color: #fcf8ec;
  /* border: #456268 1px solid; */
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.25);
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
.el-row,
.el-col {
  /* color: #456268; */
  /* outline: 1px red solid; */
}
button {
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
}
#footer {
  position: relative;
  height: 88px;
}
</style>