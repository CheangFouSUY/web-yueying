<template>
  <div>
    <Header></Header>
    <div class="book-wrap">
      <el-row :gutter="30">
        <el-col :span="6">
          <el-image :src="src"></el-image>
        </el-col>
        <el-col :span="14">
          <el-row id="book-title">{{ title }}</el-row>
          <el-row class="book-detail">
            <div class="book-detail-prop">作者</div>
            <div class="symbol">：</div>
            {{ author }}
          </el-row>
          <el-row class="book-detail">
            <div class="book-detail-prop">类型</div>
            <div class="symbol">：</div>
            {{ category }}
          </el-row>
          <el-row class="book-detail">
            <div class="book-detail-prop">年份</div>
            <div class="symbol">：</div>
            {{ year }}
          </el-row>
          <el-row class="book-detail">
            <div class="book-detail-prop">出版社</div>
            <div class="symbol">：</div>
            {{ publish }}
          </el-row>
        </el-col>
        <el-col :span="4">
          <img v-if="isBookmark === false" class="bookmark" @click="bookmark()" src="@/assets/Bookmark.svg" alt="bookmark" />
          <img v-else class="bookmark" @click="bookmark()" src="@/assets/Bookmark_fill.svg" alt="bookmark" />
          <el-row class="rate-box" type="flex" justify="center">
            <el-col id="rating" :span="10">{{rating}}</el-col>
            <el-col :span="8" :offset="0">
               <img class="rating-icon" src="@/assets/Star_fill.svg" alt="" />
            </el-col>
          </el-row>
          <el-row id="rate-now">点击评分</el-row>
        </el-col>
        <el-row :gutter="30" class="book-detail">
          <el-col :span="17">
            <div class="book-detail-prop">简介</div>
            <div class="symbol">：</div>
            {{ summary }}
          </el-col>
        </el-row>
      </el-row>
      <el-row class="like-comment-wrap">
          <img v-if="isLike === false" @click="like()" src="@/assets/Love.svg" alt="love" />
          <img v-else @click="like()" src="@/assets/Love_fill.svg" alt="love" />
          <span class="like-count">123</span>
          <img src="@/assets/Comment.svg" alt="comment" />
          <span class="comment-count">123</span>
      </el-row>
    </div>

    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "DaoMuBiJi",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      title: "盗墓笔记",
      rating: 4.6,
      likeCount: 50,
      commentCount: 50,
      author: "南派三叔",
      category: "科幻",
      year: "2007",
      publish: "上海文化出版社",
      summary:
        "故事起源於1952年，主角吴邪的祖父吴老狗在长沙的血屍墓里发现战国帛书，而引发後来吴邪从帛书解谜途中的一段段冒险。五十年後，吴邪一个看似单纯的吴家富二代，大学毕业後便经营著古董店，日子过一天是一天，殊不知其身世冒险之离奇，因为发现先人笔记中一个秘密就此展开。抱著好奇和一颗想见世面的心，他硬是跟上他三叔及一群盗墓高手的鲁王宫之旅，欲解开帛书之谜。在这个过程中他遇见了闷油瓶和胖子。在途中，很多他一辈子都没见过的东西，或是连想都没想过的东西，一个接著一个出现。遭遇的每件事，越来越离奇。就在他发现自己的生活满是谜题，并欲寻求解答时，唯一的线索──「三叔」却消失了。不甘放弃的吴邪，决定追根究柢，也决定今後不凡但却不为人知的冒险旅程。",
      src: require("@/assets/poster/DaoMuBiJi.jpg"),
      rating: 4.6,
      likeCount: 50,
      commentCount: 50,
      isLike: false,
      isBookmark:false,
    };
  },
  methods: {
    like(){
      this.isLike = !this.isLike;
    },
    bookmark(){
      this.isBookmark = !this.isBookmark;
    },
  },
};
</script>

<style scoped>
.like-comment-wrap {
  padding-top: 20px;
  /* outline: 1px black solid; */
}
.like-comment-wrap span {
  display: inline-block;
  margin-right: 20px;
  line-height: 30px;
  vertical-align: middle;
  /* outline: 1px black solid; */
}
.like-comment-wrap img {
  height: 36px;
  vertical-align: middle;
  /* outline: 1px black solid; */
}
.like-comment-wrap img:hover,
.bookmark:hover{
  cursor: pointer;
}
#rate-now:hover {
  cursor: pointer;
  color: #456268;
}
#rate-now {
  color: #79a3b1;
  font-size: 14px;
  text-align: center;
  z-index: 9;
  position: relative;
  bottom: 30px;
  /* outline: 1px black solid; */
}
.rating-icon {
  height: 64px;
  vertical-align: middle;
  /* outline: 1px black solid; */
}
#rating {
  font-size: 48px;
  /* outline: 1px black solid; */
}
.rate-box{
  position: relative;
  bottom: 30px;
}
.bookmark {
  display: block;
  height: 80px;
  margin: 0 auto;
  z-index: 99;
  position: relative;
  bottom: 42px;
  /* outline: 1px black solid; */
}
.symbol {
  display: inline-block;
  color: #79a3b1;
}
.book-detail-prop {
  display: inline-block;
  width: 60px;
  color: #79a3b1;
}
#book-title {
  margin: 10px 0;
  font-size: 36px;
  font-weight: 600;
}
.book-detail {
  line-height: 28px;
}
.book-wrap {
  width: 1200px;
  margin: 30px auto;
  padding: 30px 30px 10px;
  background-color: #fcf8ec;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.25);
  /* outline: 1px black solid; */
}
.el-row,
.el-col {
  font-size: 18px;
  color: #456268;
  /* outline: 1px red solid; */
}
</style>