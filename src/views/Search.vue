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
        <el-row v-if="!noBookData" class="Book">
            <el-row class="Text" align="middle" type="flex">
            <img src="@/assets/Book.svg" alt="book icon" /><span>图书</span>
            </el-row>
            <el-row>
                <Swiper :initialList="hotBook" :listType="'book'" v-if="hotBook.length"></Swiper>
            </el-row>
        </el-row>
        <el-row v-if="!noMovieData" class="Drama">
            <el-row class="Text" align="middle" type="flex">
            <img src="@/assets/Video.svg" alt="video icon" /><span>影视</span>
            </el-row>
            <el-row>
                <Swiper :initialList="hotMovie" :listType="'movie'" v-if="hotMovie.length"></Swiper>
            </el-row>
        </el-row>
        <el-row v-if="!noFeedData" class="Feed">
            <el-row class="Text" align="middle" type="flex">
            <i class="el-icon-position"></i><span>话题</span>
            </el-row>
            <el-row justify="center" type="flex">
                <div class="container">
                <div class="col" v-for="column in columns" :key="column">
                 <div class="item-container" v-for="item in column" :key="item.id"><span id="feedTitle"  @click="toFeed(item.id)">{{item.title}}</span>
                 <br/><span id="feedCon" @click="toFeed(item.id)">{{item.description}}</span></div>
                </div></div>
            </el-row>
        </el-row >
        <el-row v-if="!noGroupData" class="Group">
            <el-row class="Text" align="middle" type="flex">
            <i class="el-icon-s-flag"></i><span>小组</span>
            </el-row>
            <el-row justify="center" type="flex">
                <div class="container">
                <div class="col" v-for="column in columns2" :key="column">
                 <div class="item-container" v-for="item in column" :key="item.id">
                     <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                     <div class="textInside"><span @click="toGroup(item.id)">{{item.groupName}}</span></div></div>
                </div></div>
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
  watch: {
    $route: {
      handler: "searchReload",
    }
  },
  data() {
      return {
        searchItem:'',
        hotBook:[],
        hotMovie:[],
        feeds:[],
        groupData:[],
        noData: false,
        noBookData: false,
        noMovieData: false,
        noFeedData: false,
        noGroupData: false,
      }
  },
  computed: {
    columns () {
      let columns = []
    //   let mid = Math.ceil(this.items.length / this.cols)
      let cols = this.feeds.length/3;
      let mid = 3;
      for (let col = 0; col < cols; col++) {
        columns.push(this.feeds.slice(col * mid, col * mid + mid))
      }
      return columns
    },
    columns2 () {
      let columns = []
    //   let mid = Math.ceil(this.items.length / this.cols)
      let cols = this.groupData.length/3;
      let mid = 3;
      for (let col = 0; col < cols; col++) {
        columns.push(this.groupData.slice(col * mid, col * mid + mid))
      }
      return columns
    }
  },
  methods: {
    getAll() {
      this.$axios
        .all([
          this.getBook(),
          this.getMovie(),
          this.getFeed(),
          this.getGroup(),
        ])
        .then(
          this.$axios.spread((blist, mlist, flist, glist) => {
            console.log(flist.data.results);
            this.hotBook = blist.data.results;
            this.hotMovie = mlist.data.results;
            this.feeds = flist.data.results;
            this.groupData = glist.data.results;

            if(this.hotBook.length == 0)
              this.noBookData = true;
            if(this.hotMovie.length == 0)
              this.noMovieData = true;
            if(this.feeds.length == 0)
              this.noFeedData = true;
            if(this.groupData.length == 0)
              this.noGroupData = true;
            if(this.hotBook.length == 0 && this.hotMovie.length == 0 && this.feeds.length == 0 && this.groupData.length == 0)
              this.noData = true;
              
          })
        )
        .catch((error) => {
          console.log(error);
        });
    },
    getBook() {
      return this.$axios({
        method: "get",
        url: '/api/v1/book/list?search=' + this.searchItem,
      });
    },
    getMovie() {
      return this.$axios({
        method: "get",
        url: '/api/v1/movie/list?search=' + this.searchItem,
      });
    },
    getFeed() {
      return this.$axios({
        method: "get",
        url: '/api/v1/feed/list?search=' + this.searchItem,
      });
    },
    getGroup() {
      return this.$axios({
        method: "get",
        url: '/api/v1/group/list?searchName=' + this.searchItem,
      });
    },
    toGroup(groupId) {
      this.$router.push({path: `/group/${groupId}`})
    },
    toFeed(feedId) {
      this.$router.push({path: `/feed/${feedId}`})
    },
    searchReload() {
      location.reload();
    }
  },
  mounted() {
    this.searchItem = this.$route.query.name;
    this.getAll();
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
  box-shadow: 5px 8px #458998;
}
.Group .item-container {
  border: 1px solid;
  padding: 5px;
  margin: 5px;
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 20px;
  box-shadow: 5px 8px #458998;
  border-radius: 10px;
}
.noResult{
  /* border: 1px solid; */
  margin-top: 20px;
  font-size: 24px;
  padding-left: 20px;
}
.textInside{
  /* border: 1px solid; */
  text-align: center;
  width: 340px;
}
.Group .el-avatar{
  margin-right: 8px;
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