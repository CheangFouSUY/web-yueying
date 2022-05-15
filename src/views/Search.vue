<template>
    <div>
        <Header></Header>
        <div class="main">
        <el-row class="Top" align="middle" type="flex">
            <img class="searchicon" src="@/assets/Search2.svg" alt="search_icon"><span>搜索""</span>
        </el-row>
        <el-row class="Book" v-if="type === '1' || type ==='0'">
            <el-row class="Text" align="middle" type="flex">
            <img src="@/assets/Book.svg" alt="book icon" /><span>图书</span>
            </el-row>
            <el-row>
                <Swiper :initialList="hotBook"></Swiper>
            </el-row>
        </el-row>
        <el-row class="Drama" v-if="type === '2' || type ==='0'">
            <el-row class="Text" align="middle" type="flex">
            <img src="@/assets/Video.svg" alt="video icon" /><span>影视</span>
            </el-row>
            <el-row>
                <Swiper :initialList="hotBook"></Swiper>
            </el-row>
        </el-row>
        <el-row class="Feed" v-if="type === '3' || type ==='0'">
            <el-row class="Text" align="middle" type="flex">
            <i class="el-icon-position"></i><span>话题</span>
            </el-row>
            <el-row justify="center" type="flex">
                <div class="container">
                <div class="col" v-for="column in columns" :key="column">
                 <div class="item-container" v-for="item in column" :key="item.id"><span id="feedTitle">{{item.publisher}}</span>
                 <br/><span id="feedCon">{{item.fullContent}}</span></div>
                </div></div>
                <!-- <el-col :span="7" v-for="item in items" :key="item.id"><div class="bg-blue">{{ item.content }}</div></el-col> -->
                <!-- <el-col :span="7" ><div class="bg-yellow">{{ item.content  }}</div></el-col>
                <el-col :span="7"><div class="bg-blue">{{ item.content }}</div></el-col> -->
            </el-row>
        </el-row >
        <el-row class="Group" v-if="type === '4' || type ==='0'">
            <el-row class="Text" align="middle" type="flex">
            <i class="el-icon-s-flag"></i><span>小组</span>
            </el-row>
            <el-row justify="center" type="flex">
                <div class="container">
                <div class="col" v-for="column in columns2" :key="column">
                 <div class="item-container" v-for="item in column" :key="item.id">
                     <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                     {{item.gName}}</div>
                </div></div>
            </el-row>
        </el-row>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Swiper from "@/components/MainpageSwiper.vue";
import FeedBox from "@/components/FeedBox.vue";

export default {
    name:'Search',
    components: {
    Header,
    Footer,
    Swiper,
    FeedBox,
  },
  data() {
      return {
        type:'0',
        hotBook: [
        {
          id: "B001",
          title: "盗墓笔记1",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          name: "daomubiji",
        },
        {
          id: "B002",
          title: "盗墓笔记2",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          name: "daomubiji",
        },
        {
          id: "B003",
          title: "盗墓笔记3",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          name: "daomubiji",
        },
        {
          id: "B004",
          title: "盗墓笔记4",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          namel: "daomubiji",
        },
        {
          id: "B005",
          title: "盗墓笔记5",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          name: "daomubiji",
        },
        {
          id: "B006",
          title: "盗墓笔记6",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          name: "daomubiji",
        },
        {
          id: "B007",
          title: "盗墓笔记7",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          name: "daomubiji",
        },
        {
          id: "B008",
          title: "盗墓笔记8",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          name: "daomubiji",
        },
        {
          id: "B009",
          title: "盗墓笔记9",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          name: "daomubiji",
        },
        {
          id: "B0010",
          title: "盗墓笔记10",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          name: "daomubiji",
        },
      ],
        hotDrama: [
        {
          id: "D001",
          title: "猎罪图鉴1",
          rating: 4.8,
          src: require("../assets/poster/LieZuiTuJian.jpg"),
          name: "liezuitujian",
        },
        {
          id: "B002",
          title: "猎罪图鉴2",
          rating: 4.6,
          src: require("../assets/poster/LieZuiTuJian.jpg"),
          name: "liezuitujian",
        },
        {
          id: "B003",
          title: "猎罪图鉴3",
          rating: 4.6,
          src: require("../assets/poster/LieZuiTuJian.jpg"),
          name: "liezuitujian",
        },
        {
          id: "B004",
          title: "猎罪图鉴4",
          rating: 4.6,
          src: require("../assets/poster/LieZuiTuJian.jpg"),
          namel: "liezuitujian",
        },
        {
          id: "B005",
          title: "猎罪图鉴5",
          rating: 4.6,
          src: require("../assets/poster/LieZuiTuJian.jpg"),
          name: "liezuitujian",
        },
        {
          id: "B006",
          title: "猎罪图鉴6",
          rating: 4.6,
          src: require("../assets/poster/LieZuiTuJian.jpg"),
          name: "liezuitujian",
        },
        {
          id: "B007",
          title: "猎罪图鉴7",
          rating: 4.6,
          src: require("../assets/poster/LieZuiTuJian.jpg"),
          name: "liezuitujian",
        },
        {
          id: "B008",
          title: "猎罪图鉴8",
          rating: 4.6,
          src: require("../assets/poster/LieZuiTuJian.jpg"),
          name: "liezuitujian",
        },
        {
          id: "B009",
          title: "猎罪图鉴9",
          rating: 4.6,
          src: require("../assets/poster/LieZuiTuJian.jpg"),
          name: "liezuitujian",
        },
        {
          id: "B0010",
          title: "猎罪图鉴10",
          rating: 4.6,
          src: require("../assets/poster/LieZuiTuJian.jpg"),
          name: "liezuitujian",
        },
      ],
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
        {
          id: "F0003",
          publisher: "娱乐八卦妹",
          fullContent:'KPOP IS WORLD TREND !!!!'
        },
        {
          id: "F0004",
          publisher: "娱乐八卦弟",
          fullContent:'WHAT? IS THIS REALL?????? INDIA WON THOMAS CUPPPP!'
        },
      ],
      items: [
          {
              id:"1",
              content:"wat",
          },
          {
              id:"2",
              content:"sods",
          },
          {
              id:"3",
              content:"alal",
          },
          {
              id:"4",
              content:"4dad",
          },
          {
              id:"5",
              content:"5255",
          },
          {
              id:"6",
              content:"6",
          },
          {
              id:"7",
              content:"7",
          },
          {
              id:"8",
              content:"8",
          },
          {
              id:"9",
              content:"9",
          },
          {
              id:"10",
              content:"10",
          },
          {
              id:"11",
              content:"11",
          },
          {
              id:"12",
              content:"12",
          },
          
      ],
      groupData: [{
          id:1,
          gAvatar:<el-avatar icon="el-icon-user-solid"></el-avatar>,
          gName:'皮卡一家亲',
        }, {
          id:2,
          gAvatar:<el-avatar icon="el-icon-user-solid"></el-avatar>,
          gName:'皮卡两家亲',
        }, {
          id:3,
          gAvatar:<el-avatar icon="el-icon-user-solid"></el-avatar>,
          gName:"WHAT?"
        }, {
          id:4,
          gAvatar:<el-avatar icon="el-icon-user-solid"></el-avatar>,
          gName:'皮卡三家亲',
        }, {
          id:5,
          gAvatar:<el-avatar icon="el-icon-user-solid"></el-avatar>,
          gName:'皮卡六家亲',
        }],
      }
  },
  computed: {
    columns () {
      let columns = []
    //   let mid = Math.ceil(this.items.length / this.cols)
      let cols = this.feeds.length/3;
      let mid = 3;
      for (let col = 0; col < cols; col++) {
        columns.push(this.feeds.slice(col * mid, col * mid + mid))
      }
      return columns
    },
    columns2 () {
      let columns = []
    //   let mid = Math.ceil(this.items.length / this.cols)
      let cols = this.groupData.length/3;
      let mid = 3;
      for (let col = 0; col < cols; col++) {
        columns.push(this.groupData.slice(col * mid, col * mid + mid))
      }
      return columns
    }
  },
  methods: {
    contentCalc(item) {
      var s = "";
      s = item.fullContent.substring(0, 180) + "...";
      return s.replace(/(\r\n|\n|\r)/gm, "<br/>");
    },
  },
  filters: {
    truncate: function (text, length, suffix) {
                if (text.length > length) {
                    return text.substring(0, length) + suffix;
                } else {
                    return text;
                }
            },
  }
}
</script>

<style scoped>
.Top{
    font-size: 32px;
    color: #456268;
}
.searchicon{
    height: 48px;
}
.Book, .Drama, .Feed, .Group{
    /* border: 1px solid black; */
    margin-top: 20px;
}
.Book span, .Drama span, .Feed span, .Group span{
    font-size: 24px;
    color: #456268;
}
.Book img, .Drama img{
    height: 50px;
}
.Text{
    padding-left: 60px;
    font-size: 36px;
}
.main{
    margin: 20px 60px;
}
.bg-red{
    background-color: red;
}
.bg-blue{
    background-color: blue;
}
.bg-yellow{
    background-color: yellow;
}
.col {
  margin: 10px;
  /* border: 1px solid; */
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}
.Feed .item-container {
  /* border: 1px solid; */
  padding: 5px;
  margin: 10px;
  margin-bottom: 0px;
  width: 400px;
  height: 145px;
  /* text-align: center; */
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.Group .item-container {
  /* border: 1px solid; */
  padding: 5px;
  margin: 5px;
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 20px;
}
#feedCon{
  font-size: 20px;
}
#feedTitle{
  font-size: 30px;
  font-weight: bold;
  text-decoration: underline;
}
#feedCon:hover, #feedTitle:hover{
  cursor: pointer;
}
#feedCon:hover{
  color: #79A3B1;
}
</style>