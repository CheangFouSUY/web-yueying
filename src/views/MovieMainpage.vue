<template>
  <div>
    <Header id="header"></Header>
    <div id="main" :style="{ 'min-height': mainMinHeight + 'px' }">
      <div class="page-title">
        <img src="@/assets/Video.svg" alt="video icon" />
        <span>影视</span>
      </div>

      <el-row class="ctg-title">分类</el-row>
      <el-row class="ctg-list">
        <el-col :span="2" class="ctg-list-type">类型</el-col>
        <el-col :span="18">
          <li
            v-for="item in categoryList"
            :key="item.id"
            @click="goFilter(item.id + '&99')"
          >
            {{ item.des }}
          </li>
        </el-col>
      </el-row>
      <el-row class="ctg-list">
        <el-col :span="2" class="ctg-list-type">地区</el-col>
        <el-col :span="18">
          <li
            v-for="item in areaList"
            :key="item.id"
            @click="goFilter('99&' + item.id)"
          >
            {{ item.des }}
          </li>
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
          :initialList="romanceMovie"
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
    this.getAllMovie();
    this.mainMinHeight =
      document.documentElement.clientHeight -
      $("#header").outerHeight(true) -
      $("#footer").outerHeight(true) -
      6;
  },
  methods: {
    goFilter(id) {
      this.$router.push({ path: `/movie/filter=category${id}` });
    },
    getAllMovie() {
      this.$axios
        .all([
          this.getHotMovie(),
          this.getNewMovie(),
          this.getRomanceMovie(),
          this.getHorrorMovie(),
        ])
        .then(
          this.$axios.spread((hotlist, newlist, romlist, horlist) => {
            this.hotMovie = hotlist.data.results;
            this.newMovie = newlist.data.results;
            this.romanceMovie = romlist.data.results;
            this.horrorMovie = horlist.data.results;
            this.setRating(this.hotMovie);
            this.setRating(this.newMovie);
            this.setRating(this.romanceMovie);
            this.setRating(this.horrorMovie);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    },
    getHotMovie() {
      return this.$axios({
        method: "get",
        url: "/api/v1/movie/list?orderBy=r",
      });
    },
    getNewMovie() {
      return this.$axios({
        method: "get",
        url: "/api/v1/movie/list",
      });
    },
    getRomanceMovie() {
      return this.$axios({
        method: "get",
        url: "/api/v1/movie/list?category=1",
      });
    },
    getHorrorMovie() {
      return this.$axios({
        method: "get",
        url: "/api/v1/movie/list?category=2",
      });
    },
    setRating(arr) {
      return arr.forEach(function (value, index, array) {
        array[index].rating = array[index].rating.toFixed(1);
      });
    },
  },
  data() {
    return {
      areaList: [
        { id: "99", des: "全部" },
        { id: "0", des: "中国" },
        { id: "1", des: "美国" },
        { id: "2", des: "英国" },
        { id: "3", des: "韩国" },
        { id: "4", des: "日本" },
        { id: "5", des: "泰国" },
        { id: "6", des: "马来西亚" },
      ],
      categoryList: [
        { id: "99", des: "全部" },
        { id: "1", des: "爱情" },
        { id: "2", des: "恐怖" },
        { id: "3", des: "悬疑" },
        { id: "4", des: "冒险" },
        { id: "5", des: "喜剧" },
        { id: "6", des: "动作" },
        { id: "7", des: "科幻" },
        { id: "8", des: "综艺" },
        { id: "9", des: "动漫" },
        { id: "10", des: "卡通" },
        { id: "11", des: "LGBT" },
        { id: "0", des: "其他" },
      ],
      hotMovie: [],
      newMovie: [],
      romanceMovie: [],
      horrorMovie: [],
      mainMinHeight:"",
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
}
.ctg-list {
  padding: 0;
  margin: 10px 70px;
  color: #456268;
}

.ctg-title {
  color: #456268;
  font-size: 26px;
  margin: 50px 70px 0;
}
.ctg-list-type {
  padding: 10px 0;
  font-size: 20px;
  color: #79a3b1;
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
  color: #456268;
}

#main {
  width: 1400px;
  margin: auto;
  padding: 30px 0;
  box-sizing: border-box;
}
#footer {
  bottom: 0;
}
</style>