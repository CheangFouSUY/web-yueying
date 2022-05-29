<template>
  <div>
    <Header></Header>
    <el-carousel :interval="5000" height="540px">
      <el-carousel-item v-for="item in carouselImg" :key="item">
        <img class="poster" :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>

    <el-row class="main">
      <el-col :span="17" :offset="1">
        <el-row>
            <div class="Book">
              <img src="@/assets/Book.svg" alt="book icon" /><span>图书</span>
            </div>
            <Swiper :initialList="hotBook"></Swiper>
        </el-row>
        <!-- <el-divider></el-divider> -->
        <el-row>
            <div class="Book">
              <img src="@/assets/Video.svg" alt="video icon" /><span>影视</span>
            </div>
            <Swiper :initialList="hotDrama"></Swiper>
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-col class="hot-list-wrap">
          <el-row class="hot-list-title">热 榜</el-row>
          <el-tabs v-model="activeName" type="border-card" stretch="true">
            <el-tab-pane label="图书" name="book">
              <li
                class="hot-list"
                v-for="(item, index) in bookHotList.slice(0,10)"
                :key="item.title"
                :style="{ color: listColor[index+1 - 1] }"
              >
                <img id="hot" v-if="index+1 === 1" src="@/assets/Hot.jpg" alt="hot icon" />
                <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="hot-list-number">{{ index+1 }}</span>
                <span class="hot-list-name">{{ item.title }}</span>
              </li>
            </el-tab-pane>
            <el-tab-pane label="影视" name="drama">
              <li
                class="hot-list"
                v-for="(item, index) in movieHotList.slice(0,10)"
                :key="item.title"
                :style="{ color: listColor[index+1 - 1] }"
              >
                <img id="hot" v-if="index+1 === 1" src="@/assets/Hot.jpg" alt="hot icon" />
                <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="hot-list-number">{{ index+1 }}</span>
                <span class="hot-list-name">{{ item.title }}</span>
              </li>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-col>
    </el-row>

    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Swiper from "@/components/HomeSwiper.vue";

export default {
  name: "HomeView",
  components: {
    Header,
    Footer,
    Swiper,
  },
  data() {
    return {
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
      ],
      movieHotList: [
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
    };
  },
  mounted() {
    this.getBookMovieList();
  },
  methods: {
    getBookMovieList() {
      this.$axios
        .all([
          this.getHotBook(),
          this.getHotMovie(),
        ])
        .then(
        this.$axios.spread((bookList, movieList) => {
         this.bookHotList = bookList.data.results;
         this.movieHotList = movieList.data.results;
        })
      )
    },
    getHotBook() {
      return this.$axios({
        method: "get",
        url: "/api/v1/book/list?orderBy=l",
      });
    },
    getHotMovie() {
      return this.$axios({
        method: "get",
        url: "/api/v1/movie/list?orderBy=l",
      });
    }
  },
};
</script>

<style scoped>
.hot-list-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 2; 
  -webkit-box-orient: vertical;
  /* text-align: center; */
  overflow: hidden;
  /* text-overflow: ellipsis; */
  position: absolute;
  margin-left: 90px;
  /* outline: 1px slateblue solid; */
}
.hot-list-name:hover {
  color: blue;
  cursor: pointer;
}
.hot-list-number {
  display: inline-block;
  width: 60px;
  /* text-align: center; */
  /* outline: 1px slateblue solid; */
  padding-left: 15px;
}
.hot-list {
  font-size: 22px;
  line-height: 45px;
  list-style-type: none;
  color: #456268;
  /* outline: 1px fuchsia solid; */
  display: flex;
  align-items: center;
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
  padding: 100px 20px;
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
  /* outline: 1px red solid; */
}
#footer {
  position: relative;
  height: 88px;
}
.Book img,.Drama img {
  width: 60px;
  vertical-align: middle;
}
.Book,
.Drama {
  margin: 40px 40px -10px;
  font-size: 28px;
  color: #456268;
  display: flex;
  align-items: center;
}
.lbTitle {
  background-color: #79a3b1;
  text-align: center;
  font-size: 36px;
}
.lbType1,
.lbType2 {
  background-color: #79a3b1;
  text-align: center;
  font-size: 24px;
}
.lbType1 {
  /* border-right: 1px solid white; */
}
.lbType2 {
  /* border-left: 1px solid white; */
}
.bg-red {
  background-color: red;
}
.bg-blue {
  background-color: blue;
}
.hot-list img{
  height: 25px;
  width: 25px;
  /* border: solid 1px black; */
}
.main{
  margin-bottom: 30px;
}
#footer {
  position: relative;
  height: 88px;
}
</style>
