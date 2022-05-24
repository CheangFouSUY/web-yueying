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
          <li
            v-for="item in categoryList"
            :key="item.id"
            class="normalCategory"
            :class="{ activeCategory: item.isActive }"
            @click="changeFilter(item.id)"
          >
            {{ item.des }}
          </li>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row class="result-wrap">
        <div class="item-box" v-for="item in filterResult" :key="item.id">
          <el-image
            class="poster"
            :src="item.thumbnail"
            fit="cover"
            @click="goDetails(item.id)"
          ></el-image>
          <div class="title-wrap">
            <span class="book-title" @click="goDetails(item.id)">
              {{ item.title }}
            </span>
            <span class="rating">{{ item.rating }}</span>
          </div>
        </div>
      </el-row>
    </div>

    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "BookFilterpage",
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.getBook();
  },
  watch: {
    $route: {
      handler: "getBook",
    },
  },
  methods: {
    goDetails(id) {
        this.$router.push({ path: `/book/detail/${id}` });
    },
    changeFilter(id) {
      this.$router.replace({ name: "book filter", params: { id: id } });
    },
    getBook() {
      this.nowCategory = this.$route.params.id;
      this.renewFilterView();
      this.$axios({
        method: "get",
        url: "/api/v1/book/list?category=" + this.$route.params.id,
      })
        .then((res) => {
          this.filterResult = res.data.results;
          this.setRating(this.filterResult);
          console.log(this.filterResult);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    renewFilterView() {
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].id == this.nowCategory)
          this.categoryList[i].isActive = true;
        else this.categoryList[i].isActive = false;
      }
    },
    setRating(arr) {
      return arr.forEach(function (value, index, array) {
        array[index].rating = array[index].rating.toFixed(1);
      });
    },
  },
  data() {
    return {
      nowCategory: "",
      categoryList: [
        { id: 1, des: "爱情", isActive: false },
        { id: 2, des: "恐怖", isActive: false },
        { id: 3, des: "悬疑", isActive: false },
        { id: 4, des: "科幻", isActive: false },
        { id: 5, des: "艺术", isActive: false },
        { id: 6, des: "体育", isActive: false },
        { id: 7, des: "烹饪", isActive: false },
        { id: 8, des: "漫画", isActive: false },
        { id: 9, des: "教育", isActive: false },
        { id: 10, des: "哲学", isActive: false },
        { id: 11, des: "文学", isActive: false },
        { id: 0, des: "其他", isActive: false },
      ],
      filterResult: [],
    };
  },
};
</script>

<style scoped>
.rating {
  display: block;
  float: right;
}
.book-title:hover {
  color: #79a3b1;
  cursor: pointer;
}
.book-title {
  display: block;
  float: left;
  width: 150px;
  text-decoration: none;
  color: #456268;
}
.title-wrap {
  height: 60px;
  padding: 5px;
  position: relative;
  top: -4px;
  box-sizing: border-box;
  font-size: 20px;
  background-color: #fcf8ec;
}
.poster {
  width: 200px;
  height: 267px;
  /* outline: 1px red solid; */
}
.poster:hover {
  cursor: pointer;
}
.item-box a {
  display: block;
  /* overflow: hidden; */
}
.item-box {
  display: inline-block;
  margin: 20px 0;
  width: 210px;
  padding: 0 5px;
  box-sizing: border-box;
}
.result-wrap {
  margin: 0 70px;
}

.activeCategory {
  color: #79a3b1;
}
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
  vertical-align: middle;
}
.page-title span {
  vertical-align: middle;
  margin-left: 5px;
  color: #456268;
}
.page-title {
  font-size: 32px;
  margin-left: 40px;
  margin-top: 20px;
}

.main {
  margin: 30px auto;
  width: 1400px;
  /* outline: 1px black solid; */
}
#footer {
  position: relative;
  height: 88px;
}
</style>