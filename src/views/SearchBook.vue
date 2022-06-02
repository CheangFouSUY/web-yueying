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
            <el-row>
                <Swiper :initialList="hotBook" :listType="'book'" v-if="hotBook.length"></Swiper>
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
        searchItem:'',
        hotBook:[],
        noData: false,
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
            if(this.hotBook.length == 0)
              this.noData = true;
        })
        .catch(err =>{
            console.log(err);
        })
    },
  },
  mounted() {
    this.searchItem = this.$route.query.name;
    this.getBook();
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
.noResult{
  /* border: 1px solid; */
  margin-top: 20px;
  font-size: 24px;
  padding-left: 20px;
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