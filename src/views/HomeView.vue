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
            <Swiper v-if="status" :initialList="bookHotList" :initialIsBook="true"></Swiper>
        </el-row>
        <!-- <el-divider></el-divider> -->
        <el-row>
            <div class="Book">
              <img src="@/assets/Video.svg" alt="video icon" /><span>影视</span>
            </div>
            <Swiper v-if="status" :initialList="movieHotList" :initialIsBook="false"></Swiper>
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-col class="hot-list-wrap">
          <el-row class="hot-list-title">热 榜</el-row>
          <el-tabs v-model="activeName" type="border-card" stretch>
            <el-tab-pane label="图书" name="book">
              <li
                class="hot-list"
                v-for="(item, index) in bookHotList.slice(0,10)"
                :key="item.id"
                :style="{ color: listColor[index+1 - 1] }"
              >
                <img id="hot" v-if="index+1 === 1" src="@/assets/Hot.jpg" alt="hot icon" />
                <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="hot-list-number">{{ index+1 }}</span>
                <span class="hot-list-name" @click="enterBook(item.id)">{{ item.title }}</span>
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
                <span class="hot-list-name" @click="enterMovie(item.id)">{{ item.title }}</span>
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
      status: false,
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
         this.setRating(this.bookHotList);
         this.setRating(this.movieHotList);
        this.status = true;
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
    },
    setRating(arr) {
      return arr.forEach(function (value, index, array) {
        array[index].rating = array[index].rating.toFixed(1);
      });
    },
    enterBook(bookid){
      this.$router.push({ path: `/book/detail/${bookid}` });
    },
    enterMovie(movieid){
      this.$router.push({ path: `/movie/detail/${movieid}` });
    },
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
  color: #79a3b1;
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
