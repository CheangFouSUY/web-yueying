<template>
    <div>
        <Header></Header>
        <div class="main">
        <router-view :key="$route.fullPath"></router-view>
        <el-row class="Top" align="middle" type="flex">
            <img class="searchicon" src="@/assets/Search2.svg" alt="search_icon"><span>搜索"{{searchItem}}"</span>
        </el-row>
        <el-row class="noResult">
            <span v-if="noData">抱歉！没有结果</span>
        </el-row>
        <el-row v-if="!noData" class="Book">
            <el-row class="Text" align="middle" type="flex">
            <img src="@/assets/Book.svg" alt="book icon" /><span>图书</span>
            </el-row>
            <el-row class="result-wrap">
                <div class="item-box" v-for="item in hotBook" :key="item.id">
                  <el-image class="poster" :src="item.thumbnail" fit="cover" @click="enterBook(item.id)" ></el-image>
                  <div class="title-wrap">
                    <span class="book-title" @click="enterBook(item.id)">
                      {{ item.title }}
                    </span>
                    <span class="rating">{{ item.rating }}</span>
                  </div>
                </div>
            </el-row>
        </el-row>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Swiper from "@/components/MainpageSwiper.vue";

export default {
    name:'Search',
    components: {
    Header,
    Footer,
    Swiper,
  },
  data() {
      return {
        searchItem:'',
        hotBook:[],
        noData: false,
      }
  },
  watch: {
    $route: {
      handler: "searchReload",
    }
  },
  methods: {
    getBook() {
        this.$axios({
            method:'get',
            url:'/api/v1/book/list?search=' + this.searchItem,
        })
        .then(res =>{
            console.log(res);
            this.hotBook = res.data.results;
            this.setRating(this.hotBook);
            if(this.hotBook.length == 0)
              this.noData = true;
        })
        .catch(err =>{
            console.log(err);
        })
    },
    searchReload() {
      location.reload();
    },
    setRating(arr) {
      return arr.forEach(function (value, index, array) {
        array[index].rating = array[index].rating.toFixed(1);
      });
    },
    enterBook(id) {
        this.$router.push({ path: `/book/detail/${id}` });
    },
  },
  mounted() {
    this.searchItem = this.$route.query.name;
    this.getBook();
  }
}
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
  height: 50px;
  text-decoration: none;
  color: #456268;
  overflow: hidden;
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
  margin: 0 60px;
}
.Top{
    font-size: 32px;
    color: #456268;
}
.searchicon{
    height: 48px;
}
.Book{
    margin-top: 20px;
}
.Book span{
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
.col {
  margin: 10px;
  /* border: 1px solid; */
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}
.noResult{
  /* border: 1px solid; */
  margin-top: 20px;
  font-size: 24px;
  padding-left: 20px;
}
</style>