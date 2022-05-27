<template>
  <div>
    <Header></Header>
    <div class="main">
      <div class="page-title">
        <img src="@/assets/Book.svg" alt="book icon" />
        <span>图书</span>
      </div>

      <el-row class="ctg-title">分类</el-row>
      <el-row class="ctg-list">
        <el-col :span="2" class="ctg-list-type">类型</el-col>
        <el-col :span="18">
          <li v-for="item in categoryList" :key="item.id" @click="goFilter(item.id)">{{ item.des }}</li>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row class="ctg-title">热门</el-row>
      <el-row>
        <Swiper :initialList="hotBook" :listType="'book'" v-if="hotBook.length"></Swiper>
      </el-row>

      <el-row class="ctg-title">最新上架</el-row>
      <el-row>
        <Swiper :initialList="newBook" :listType="'book'" v-if="newBook.length"></Swiper>
      </el-row>

      <el-row class="ctg-title">爱情</el-row>
      <el-row>
        <Swiper :initialList="romanceBook" :listType="'book'" v-if="romanceBook.length"></Swiper>
      </el-row>

      <el-row class="ctg-title">悬疑</el-row>
      <el-row>
        <Swiper :initialList="suspenseBook" :listType="'book'" v-if="suspenseBook.length"></Swiper>
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
  name: "BookMainpage",
  components: {
    Header,
    Footer,
    Swiper,
  },
  mounted() {
    this.getAllBook();
  },
  methods: {
    goFilter(id) {
      this.$router.push({ path: `/book/filter=category${id}` });
    },
    getAllBook() {
      this.$axios
        .all([
          this.getHotBook(),
          this.getNewBook(),
          this.getRomanceBook(),
          this.getSuspenseBook(),
        ])
        .then(
          this.$axios.spread((hotlist, newlist, romlist, suslist) => {
            this.hotBook = hotlist.data.results;
            this.newBook = newlist.data.results;
            this.romanceBook = romlist.data.results;
            this.suspenseBook = suslist.data.results;
            this.setRating(this.hotBook);
            this.setRating(this.newBook);
            this.setRating(this.romanceBook);
            this.setRating(this.suspenseBook);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    },
    getHotBook() {
      return this.$axios({
        method: "get",
        url: "/api/v1/book/list?orderBy=r",
      });
    },
    getNewBook() {
      return this.$axios({
        method: "get",
        url: "/api/v1/book/list",
      });
    },
    getRomanceBook() {
      return this.$axios({
        method: "get",
        url: "/api/v1/book/list?category=1",
      });
    },
    getSuspenseBook() {
      return this.$axios({
        method: "get",
        url: "/api/v1/book/list?category=3",
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
      categoryList: [
        {id: 1, des: '爱情'},
        {id: 2, des: '恐怖'},
        {id: 3, des: '悬疑'},
        {id: 4, des: '科幻'},
        {id: 5, des: '艺术'},
        {id: 6, des: '体育'},
        {id: 7, des: '烹饪'},
        {id: 8, des: '漫画'},
        {id: 9, des: '教育'},
        {id: 10, des: '哲学'},
        {id: 11, des: '文学'},
        {id: 0, des: '其他'},
      ],
      hotBook: [],
      newBook: [],
      romanceBook: [],
      suspenseBook: [],
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
  color: #79a3b1;
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
}

.main {
  margin: 30px auto;
  width: 1400px;
}
#footer {
  position: relative;
  height: 88px;
}
</style>