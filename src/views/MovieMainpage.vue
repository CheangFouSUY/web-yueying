<template>
  <div>
    <Header></Header>
    <div class="main">
      <div class="page-title">
        <img src="@/assets/Video.svg" alt="video icon" />
        <span>影视</span>
      </div>

      <el-row class="ctg-title">分类</el-row>
      <el-row class="ctg-list">
        <el-col :span="2" class="ctg-list-type">类型</el-col>
        <el-col :span="18">
          <li v-for="item in category" :key="item">{{ item }}</li>
        </el-col>
      </el-row>
      <el-row class="ctg-list">
        <el-col :span="2" class="ctg-list-type">地区</el-col>
        <el-col :span="18">
          <li v-for="item in place" :key="item">{{ item }}</li>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row class="ctg-title">热门</el-row>
      <el-row>
        <Swiper
          :initialList="hotMovie"
          :listType="'movie'"
          v-if="hotMovie.length"
        ></Swiper>
      </el-row>

      <el-row class="ctg-title">最新上架</el-row>
      <el-row>
        <Swiper
          :initialList="newMovie"
          :listType="'movie'"
          v-if="newMovie.length"
        ></Swiper>
      </el-row>

      <el-row class="ctg-title">爱情</el-row>
      <el-row>
        <Swiper
          :initialList="romance.Movie"
          :listType="'movie'"
          v-if="romanceMovie.length"
        ></Swiper>
      </el-row>

      <el-row class="ctg-title">恐怖</el-row>
      <el-row>
        <Swiper
          :initialList="horrorMovie"
          :listType="'movie'"
          v-if="horrorMovie.length"
        ></Swiper>
      </el-row>
    </div>

    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Swiper from "@/components/MainpageSwiper.vue";

export default {
  name: "DramaMainpage",
  components: {
    Header,
    Footer,
    Swiper,
  },
  mounted() {
    this.getMovie();
  },
  methods: {
    getMovie() {
      this.$axios
        .get("/api/v1/movie/list?orderBy=r")
        .then((res) => {
          var result = res.data.results;
          this.hotMovie = result;
          this.hotMovie.forEach(function (value, index, array) {
            array[index].rating = array[index].rating.toFixed(1);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      this.$axios
        .get("http://127.0.0.1:8000/api/v1/movie/list")
        .then((res) => {
          var result = res.data.results;
          this.newMovie = result;
          this.newMovie.forEach(function (value, index, array) {
            array[index].rating = array[index].rating.toFixed(1);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      this.$axios
        .get("http://127.0.0.1:8000/api/v1/movie/list?category=1")
        .then((res) => {
          var result = res.data.results;
          this.romanceMovie = result;
          this.romanceMovie.forEach(function (value, index, array) {
            array[index].rating = array[index].rating.toFixed(1);
          });
        });
      this.$axios
        .get("http://127.0.0.1:8000/api/v1/movie/list?category=2")
        .then((res) => {
          var result = res.data.results;
          this.horrorMovie = result;
          this.horrorMovie.forEach(function (value, index, array) {
            array[index].rating = array[index].rating.toFixed(1);
          });
        });
    },
  },
  data() {
    return {
      place: ["中国", "美国", "英国", "韩国", "日本", "泰国", "马来西亚"],
      category: [
        "爱情",
        "恐怖",
        "悬疑",
        "冒险",
        "喜剧",
        "动作",
        "科幻",
        "综艺",
        "动漫",
        "卡通",
        "LGBT",
        "其他",
      ],
      hotMovie: [],
      newMovie: [],
      romanceMovie: [],
      horrorMovie: [],
    };
  },
};
</script>

<style scoped>
.ctg-list li:hover {
  color: #79a3b1;
  cursor: pointer;
}
.ctg-list li {
  display: inline-block;
  margin: 10px 30px 10px 0;
  font-size: 20px;
  /* outline: 1px black solid; */
}
.ctg-list {
  padding: 0;
  margin: 10px 70px;
  color: #456268;
}
.ctg-list-type {
  padding: 10px 0;
  font-size: 20px;
  color: #79a3b1;
}

.ctg-title {
  color: #79a3b1;
  font-size: 26px;
  margin: 50px 70px 0;
}

.page-title img {
  width: 60px;
  /* margin: auto 0 auto 80px; */
  vertical-align: middle;
}
.page-title span {
  vertical-align: middle;
  margin-left: 5px;
}
.page-title {
  font-size: 32px;
  margin-left: 40px;
  margin-top: 20px;
}

.main {
  margin: 30px 60px;
}
#footer {
  position: relative;
  height: 88px;
}
</style>