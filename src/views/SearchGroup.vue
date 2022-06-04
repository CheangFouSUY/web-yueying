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
        <el-row v-if="!noData" class="Group">
            <el-row class="Text" align="middle" type="flex">
            <i class="el-icon-s-flag"></i><span>小组</span>
            </el-row>
            <el-row justify="center" type="flex">
                <div class="container">
                <div class="col" v-for="column in columns2" :key="column">
                 <div class="item-container" v-for="item in column" :key="item.id">
                     <el-avatar v-if="item.img" :src="item.img"></el-avatar>
                     <el-avatar v-else icon="el-icon-user-solid"></el-avatar>
                     <div class="textInside"><span @click="toGroup(item.id)">{{item.groupName}}</span></div></div>
                </div></div>
            </el-row>
        </el-row>
        <el-row v-if="!noData2" class="Feed">
            <el-row class="Text" align="middle" type="flex">
            <i class="el-icon-s-flag"></i><span>小组帖子</span>
            </el-row>
            <el-row justify="center" type="flex">
                <div class="container">
                <div class="col" v-for="column in columns" :key="column">
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
  data() {
      return {
        searchItem:'',
        groupData:[],
        groupFeedData:[],
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
      let cols = this.groupFeedData.length/3;
      let mid = 3;
      for (let col = 0; col < cols; col++) {
        columns.push(this.groupFeedData.slice(col * mid, col * mid + mid))
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
    getGroup() {
        this.$axios({
            method:'get',
            url:'/api/v1/group/list?searchName=' + this.searchItem,
        })
        .then(res =>{
            console.log(res);
            this.groupData = res.data.results;
            if(this.groupData.length == 0)
              this.noData = true;
        })
        .catch(err =>{
            console.log(err);
        })
    },
    getGroupFeed() {
        this.$axios({
            method:'get',
            url:'/api/v1/feed/list?search=' + this.searchItem + '&isPublic=False',
        })
        .then(res =>{
            console.log(res);
            this.groupFeedData = res.data.results;
            if(this.groupFeedData.length == 0)
              this.noData2 = true;
        })
        .catch(err =>{
            console.log(err);
        })
    },
    toGroup(groupId) {
      this.$router.push({path: `/group/${groupId}`})
    },
    toGroupFeed(feedId) {
      this.$router.push({path: `/feed/${feedId}`})
    },
    searchReload() {
      location.reload();
    }
  },
  mounted() {
    this.searchItem = this.$route.query.name;
    this.getGroup();
    this.getGroupFeed();
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
  padding: 10px;
  box-shadow: 5px 8px #458998;
  border-radius: 10px;
  word-wrap: break-word;
}
.textInside{
  /* border: 1px solid; */
  text-align: center;
  width: 340px;
}
.textInside span:hover{
  cursor: pointer;
  color: #79A3B1;
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