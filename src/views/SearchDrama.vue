<template>
    <div>
        <Header></Header>
        <div class="main">
        <el-row class="Top" align="middle" type="flex">
            <img class="searchicon" src="@/assets/Search2.svg" alt="search_icon"><span>搜索"{{searchItem}}"</span>
        </el-row>
        <el-row class="noResult">
            <span v-if="noData">抱歉！没有结果</span>
        </el-row>
        <el-row v-if="!noData" class="Drama">
            <el-row class="Text" align="middle" type="flex">
            <img src="@/assets/Video.svg" alt="video icon" /><span>影视</span>
            </el-row>
            <el-row class="result-wrap">
                <div class="item-box" v-for="item in hotMovie" :key="item.id">
                  <el-image class="poster" :src="item.thumbnail" fit="cover" @click="enterMovie(item.id)" ></el-image>
                  <div class="title-wrap">
                    <span class="book-title" @click="enterMovie(item.id)">
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
        searchItem:'',
        hotMovie:[],
        noData: false,
      }
  },
  watch: {
    $route: {
      handler: "searchReload",
    }
  },
  methods: {
    getDrama() {
        this.$axios({
            method:'get',
            url:'/api/v1/movie/list?search=' + this.searchItem,
        })
        .then(res =>{
            console.log(res);
            this.hotMovie = res.data.results;
            this.setRating(this.hotMovie);
            if(this.hotMovie.length == 0)
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
    enterMovie(id) {
        this.$router.push({ path: `/movie/detail/${id}` });
    },
  },
  mounted() {
    this.searchItem = this.$route.query.name;
    this.getDrama();
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
.Book, .Drama{
    /* border: 1px solid black; */
    margin-top: 20px;
}
.Feed span, .Group span{
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
.noResult{
  /* border: 1px solid; */
  margin-top: 20px;
  font-size: 24px;
  padding-left: 20px;
}
</style>