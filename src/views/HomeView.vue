<template>
  <div>
    <Header :isLogin="isLogin" :userInfo="userInfo"></Header>
    <el-carousel :interval="5000" height="540px">
      <el-carousel-item v-for="item in carouselImg" :key="item">
        <img class="poster" :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
    <el-row>
      <el-col :span="16" :offset="1"><div class="BooknDrama">
        <el-row>
          <el-col :span="24" :offset="1"><div class="Book">
            <img src="@/assets/Book.svg" alt="book icon" /><span>图书</span>
          </div></el-col>
          <el-col :span="23" :offset="0"><Swiper id="Swiper"></Swiper></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
            <el-col :span="4" :offset="1"><div class="Drama">
           <img src="@/assets/Video.svg" alt="video icon" /><span>影视</span>
          </div></el-col>
          <el-col :span="23" :offset="0"><Swiper id="Swiper"></Swiper></el-col>
        </el-row>
        </div></el-col>
      <el-col :span="6" :offset="1"><div class="Leaderboard bg-blue">
        <el-row>
          <el-col :span="24"><div class="lbTitle">热榜</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><div class="lbType1">图书</div></el-col>
          <el-col :span="12"><div class="lbType2">影视</div></el-col>
        </el-row>
        <el-row>
        </el-row>

        <!-- :) -->
        
        <!-- <el-col class="hot-list-wrap">
        <el-row class="hot-list-title">热 榜</el-row>
        <el-tabs v-model="activeName" type="border-card" stretch="true">
          <el-tab-pane label="图书" name="book">
            <li
              class="hot-list"
              v-for="item in bookHotList"
              :key="item.n"
              :style="{ color: listColor[item.n - 1] }"
            >
              <span class="hot-list-number">{{ item.n }}</span>
              <span class="hot-list-name">{{ item.title }}</span>
            </li>
          </el-tab-pane>
          <el-tab-pane label="影视" name="drama">
            <li
              class="hot-list"
              v-for="item in dramaHotList"
              :key="item.n"
              :style="{ color: listColor[item.n - 1] }"
            >
              <span class="hot-list-number">{{ item.n }}</span>
              <span class="hot-list-name">{{ item.title }}</span>
            </li>
          </el-tab-pane>
        </el-tabs>
      </el-col> -->
        </div></el-col>
    </el-row>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Swiper from "@/components/MainpageSwiper.vue";

export default {
  name: "HomeView",
  components: {
    Header,
    Footer,
    Swiper,
  },
  data() {
    return {
      isLogin: "false",
      userInfo: {
        username: "小黄鸭",
        useravatar: "",
      },
      carouselImg: [
        require("../assets/poster/poster1.jpg"),
        require("../assets/poster/poster2.jpg"),
        require("../assets/poster/poster3.jpg"),
        require("../assets/poster/poster4.jpg"),
        require("../assets/poster/poster5.jpg"),
      ],
      activeName: "book",
      listColor: [
        "red",
        "orangered",
        "orange",
        "#456268",
        "#456268",
        "#456268",
        "#456268",
        "#456268",
        "#456268",
        "#456268",
      ],
      bookHotList: [
        { n: 1, title: "人间失格" },
        { n: 2, title: "解忧杂货店" },
        { n: 3, title: "追风筝的人" },
        { n: 4, title: "活着" },
        { n: 5, title: "白夜行" },
        { n: 6, title: "摆渡人" },
        { n: 7, title: "我们仨" },
        { n: 8, title: "围城" },
        { n: 9, title: "边城" },
        { n: 10, title: "百年孤独" },
      ],
      dramaHotList: [
        { n: 1, title: "特战荣耀" },
        { n: 2, title: "亲爱的小孩" },
        { n: 3, title: "祝卿好" },
        { n: 4, title: "且试天下" },
        { n: 5, title: "与君初相识" },
        { n: 6, title: "山河月明" },
        { n: 7, title: "蓝焰突击" },
        { n: 8, title: "没有工作的一年" },
        { n: 9, title: "玉面桃花总相逢" },
        { n: 10, title: "我叫赵甲第" },
      ],
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
    };
  },
  methods: {},
};
</script>

<style scoped>
.hot-list-name {
  display: inline-block;
  text-align: center;
  /* outline: 1px slateblue solid; */
}
.hot-list-number {
  display: inline-block;
  width: 80px;
  text-align: center;
  /* outline: 1px slateblue solid; */
}
.hot-list {
  font-size: 22px;
  line-height: 45px;
  list-style-type: none;
  color: #456268;
  /* outline: 1px fuchsia solid; */
}

::v-deep .el-tabs__item:hover {
  color: #547379 !important;
}
::v-deep .el-tabs__item.is-active {
  color: #456268 !important;
}
::v-deep .el-tabs__item {
  font-size: 18px;
  font-weight: 600;
  background-color: #d0dde2;
}
.hot-list-title {
  padding: 10px;
  text-align: center;
  font-size: 26px;
  font-weight: 600;
  color: white;
  background-color: #456268;
}
.hot-list-wrap {
  padding: 50px;
}

.el-carousel {
  text-align: center;
  background-color: black;
}
.el-carousel .poster {
  height: 100%;
}
.el-col,
.el-row {
  outline: 1px red solid;
}
#footer {
  position: relative;
  height: 88px;
}
.mainSwiper{
  background-color: grey; 
  height: 450px;
  margin-bottom: 30px;
}
.BooknDrama{
  /* height: 450px; */
  /* padding-top: 10px; */
  margin-bottom: 20px;
  background-color: #FCF8EC;
}
.Book, .Drama{
  /* border: solid 1px black; */
  margin-bottom: 10px;
  background-color: #FCF8EC;
  font-size: 24px;
  display: flex;
  align-items: center;

}
.Leaderboard{
  height: 450px;
  margin-bottom: 20px;
}
.lbTitle{
  background-color: #79A3B1;
  text-align: center;
  font-size: 36px;
}
.lbType1, .lbType2{
  background-color: #79A3B1;
  text-align: center;
  font-size: 24px;
}
.lbType1{
  /* border-right: 1px solid white; */
}
.lbType2{
  /* border-left: 1px solid white; */
}
.bg-red{
  background-color: red;
}
.bg-blue{
  background-color: blue;
}
#footer{
  position: relative;
  height: 88px;
}
#Swiper{
  margin-top: 0px;
}
</style>
