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
            <el-row class="result-wrap">
                <div class="item-box" v-for="item in hotBook" :key="item.id">
                  <el-image class="poster" :src="item.thumbnail" fit="cover" @click="goDetails(item.id)" ></el-image>
                  <div class="title-wrap">
                    <span class="book-title" @click="enterBook(item.id)">
                      {{ item.title }}
                    </span>
                    <span class="rating">{{ item.rating }}</span>
                  </div>
                </div>
            </el-row>
        </el-row>
        <el-row v-if="!noMovieData" class="Drama">
            <el-row class="Text" align="middle" type="flex">
            <img src="@/assets/Video.svg" alt="video icon" /><span>影视</span>
            </el-row>
            <el-row class="result-wrap">
                <div class="item-box" v-for="item in hotMovie" :key="item.id">
                  <el-image class="poster" :src="item.thumbnail" fit="cover" @click="goDetails(item.id)" ></el-image>
                  <div class="title-wrap">
                    <span class="book-title" @click="enterMovie(item.id)">
                      {{ item.title }}
                    </span>
                    <span class="rating">{{ item.rating }}</span>
                  </div>
                </div>
            </el-row>
        </el-row>
          <el-row v-if="!noTagData" class="Tag">
            <el-row class="Text" align="middle" type="flex">
            <i class="el-icon-position"></i><span>话题</span>
            </el-row>
            <el-row v-for="item in tags" :key="item.id">
              <el-col :span="12" :offset=2><div class="TagContent">
                <span id="tagCon" @click="toTag(item.id)">#{{ item.title }}</span>
                </div></el-col>
            </el-row>
        </el-row>
        <el-row v-if="!noFeedData" class="Feed">
            <el-row class="Text" align="middle" type="flex">
            <i class="el-icon-position"></i><span>话题帖子</span>
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
                     <el-avatar :src="item.img"></el-avatar>
                     <div class="textInside"><span @click="toGroup(item.id)">{{item.groupName}}</span></div></div>
                </div></div>
            </el-row>
        </el-row>
        <el-row v-if="!noGroupFeedData" class="Feed">
            <el-row class="Text" align="middle" type="flex">
            <i class="el-icon-s-flag"></i><span>小组帖子</span>
            </el-row>
            <el-row justify="center" type="flex">
                <div class="container">
                <div class="col" v-for="column in columns3" :key="column">
                 <div class="item-container" v-for="item in column" :key="item.id"><span id="feedTitle" @click="toGroupFeed(item.id)">{{item.title}}</span>
                 <br/><span id="feedCon" @click="toGroupFeed(item.id)">{{item.description}}</span></div>
                </div></div>
            </el-row>
        </el-row >
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
        tags:[],
        groupFeedData: [],
        noData: false,
        noBookData: false,
        noMovieData: false,
        noFeedData: false,
        noGroupData: false,
        noTagData: false,
        noGroupFeedData: false,
      }
  },
  computed: {
    columns () {
      let columns = []
      let cols = this.feeds.length/3;
      let mid = 3;
      for (let col = 0; col < cols; col++) {
        columns.push(this.feeds.slice(col * mid, col * mid + mid))
      }
      return columns
    },
    columns2 () {
      let columns = []
      let cols = this.groupData.length/3;
      let mid = 3;
      for (let col = 0; col < cols; col++) {
        columns.push(this.groupData.slice(col * mid, col * mid + mid))
      }
      return columns
    },
    columns3 () {
      let columns = []
      let cols = this.groupFeedData.length/3;
      let mid = 3;
      for (let col = 0; col < cols; col++) {
        columns.push(this.groupFeedData.slice(col * mid, col * mid + mid))
      }
      return columns
    },
  },
  methods: {
    getAll() {
      this.$axios
        .all([
          this.getBook(),
          this.getMovie(),
          this.getFeed(),
          this.getGroup(),
          this.getTag(),
          this.getGroupFeed(),
        ])
        .then(
          this.$axios.spread((blist, mlist, flist, glist, tlist, gflist) => {
            console.log(flist.data.results);
            this.hotBook = blist.data.results;
            this.hotMovie = mlist.data.results;
            this.feeds = flist.data.results;
            this.groupData = glist.data.results;
            this.tags = tlist.data.results;
            this.groupFeedData = gflist.data.results;
            this.setRating(this.hotBook);
            this.setRating(this.hotMovie);

            if(this.hotBook.length == 0)
              this.noBookData = true;
            if(this.hotMovie.length == 0)
              this.noMovieData = true;
            if(this.feeds.length == 0)
              this.noFeedData = true;
            if(this.groupData.length == 0)
              this.noGroupData = true;
            if(this.groupFeedData.length == 0)
              this.noGroupFeedData = true;
            if(this.tags.length == 0)
              this.noTagData = true;
            if(this.hotBook.length == 0 && this.hotMovie.length == 0 && this.feeds.length == 0 && this.groupData.length == 0 && this.tags.length == 0 && this.groupFeedData.length == 0)
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
        url:'/api/v1/feed/list?search=' + this.searchItem + '&isPublic=True',
      });
    },
    getGroup() {
      return this.$axios({
        method: "get",
        url: '/api/v1/group/list?searchName=' + this.searchItem,
      });
    },
    getTag() {
      return this.$axios({
            method:'get',
            url:'/api/v1/tag/list?search=' + this.searchItem,
        });
    },
    getGroupFeed() {
      return this.$axios({
          method:'get',
          url:'/api/v1/feed/list?search=' + this.searchItem + '&isPublic=False',
      })
    },
    toGroup(groupId) {
      this.$router.push({path: `/group/${groupId}`})
    },
    toFeed(feedId) {
      this.$router.push({path: `/feed/${feedId}`})
    },
    toTag(tagId) {
      this.$router.push({path: `/tag/${tagId}`})
    },
    toGroupFeed(feedId) {
      this.$router.push({path: `/feed/${feedId}`})
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
    enterMovie(id) {
        this.$router.push({ path: `/movie/detail/${id}` });
    },
  },
  mounted() {
    this.searchItem = this.$route.query.name;
    this.getAll();
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
.Book, .Drama, .Feed, .Group, .Tag{
    margin-top: 20px;
}
.Feed span, .Group span, .Tag span{
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
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}
.Feed .item-container {
  padding: 5px;
  margin: 10px;
  margin-bottom: 0px;
  width: 400px;
  height: 145px;
  text-overflow: ellipsis;
  box-shadow: 5px 8px #458998;
  word-wrap: break-word;
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
  word-wrap: break-word;
}
.noResult{
  margin-top: 20px;
  font-size: 24px;
  padding-left: 20px;
}
.textInside{
  text-align: center;
  width: 340px;
}
.textInside span:hover{
  cursor: pointer;
  color: #79A3B1;
}
.Group .el-avatar{
  margin-right: 8px;
}
.TagContent{
  margin-bottom: 5px;
}
#feedCon{
  font-size: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
#feedTitle{
  font-size: 26px;
  font-weight: bold;
  text-decoration: underline;
}
#feedCon:hover, #feedTitle:hover{
  cursor: pointer;
}
#feedCon:hover{
  color: #79A3B1;
}
#tagCon:hover{
  cursor: pointer;
  color: #79A3B1;
}
</style>