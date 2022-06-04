<template>
    <div>
        <Header></Header>
        <div class="main">
        <el-row class="Top" align="middle" type="flex">
            <img class="searchicon" src="@/assets/Search2.svg" alt="search_icon"><span>搜索"{{searchItem}}"</span>
        </el-row>
        <el-row class="noResult">
            <span v-if="noData && noData2">抱歉！没有结果</span>
        </el-row>
          <el-row v-if="!noData2" class="Tag">
            <el-row class="Text" align="middle" type="flex">
            <i class="el-icon-position"></i><span>话题</span>
            </el-row>
            <el-row v-for="item in tags" :key="item.id">
              <el-col :span="12" :offset=2><div class="TagContent">
                <span id="tagCon" @click="toTag(item.id)">#{{ item.title }}</span>
                </div></el-col>
            </el-row>
        </el-row>
        <el-row v-if="!noData" class="Feed">
            <el-row class="Text" align="middle" type="flex">
            <i class="el-icon-position"></i><span>话题帖子</span>
            </el-row>
            <el-row justify="center" type="flex">
                <div class="container">
                <div class="col" v-for="column in columns" :key="column">
                 <div class="item-container" v-for="item in column" :key="item.id"><span id="feedTitle" @click="toFeed(item.id)">{{item.title}}</span>
                 <br/><span id="feedCon" @click="toFeed(item.id)">{{item.description}}</span></div>
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
  data() {
      return {
        searchItem:'',
        feeds:[],
        feedsId:[],
        tags:[],
        noData: false,
        noData2: false,
      }
  },
  watch: {
    $route: {
      handler: "searchReload",
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
  },
  methods: {
    getFeed() {
        this.$axios({
            method:'get',
            url:'/api/v1/feed/list?search=' + this.searchItem + '&isPublic=True',
        })
        .then(res =>{
            console.log(res.data.results);
            this.feeds = res.data.results;
            if(this.feeds.length == 0)
              this.noData = true;
        })
        .catch(err =>{
            console.log(err);
        })
    },
    getTag() {
      this.$axios({
            method:'get',
            url:'/api/v1/tag/list?search=' + this.searchItem,
        })
        .then(res =>{
            console.log(res.data.results);
            this.tags = res.data.results;
            if(this.tags.length == 0)
              this.noData2 = true;
        })
        .catch(err =>{
            console.log(err);
        })
    },
    toFeed(feedId) {
      this.$router.push({path: `/feed/${feedId}`})
    },
    toTag(tagId) {
      this.$router.push({path: `/tag/${tagId}`})
    },
    searchReload() {
      location.reload();
    }
  },
  mounted() {
    this.searchItem = this.$route.query.name;
    this.getFeed();
    this.getTag();
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
.Book, .Drama, .Feed, .Group, .Tag{
    /* border: 1px solid black; */
    margin-top: 20px;
}
.Book span, .Drama span, .Feed span, .Group span, .Tag span{
    font-size: 24px;
    color: #456268;
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
.Feed .item-container {
  /* border: 1px solid; */
  padding: 5px;
  margin: 10px;
  margin-bottom: 0px;
  width: 400px;
  height: 145px;
  /* text-align: center; */
  /* display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical; */
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 5px 8px #458998;
  word-wrap: break-word;
}
.noResult{
  /* border: 1px solid; */
  margin-top: 20px;
  font-size: 24px;
  padding-left: 20px;
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