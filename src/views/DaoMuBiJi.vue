<template>
  <div>
    <Header></Header>
    <div class="book-wrap">
      <img class="poster" src="@/assets/poster/DaoMuBiJi.jpg" alt="daomubiji" />
      <div class="book-detail-wrap">
        <h2>盗墓笔记</h2>
        <div>
          <span class="book-detail-prop">作者</span>
          <span class="symbol">：</span>
          <span class="book-detail-text">南派三叔</span>
        </div>
        <div>
          <span class="book-detail-prop">类型</span>
          <span class="symbol">：</span>
          <span class="book-detail-text">科幻</span>
        </div>
        <div>
          <span class="book-detail-prop">年份</span>
          <span class="symbol">：</span>
          <span class="book-detail-text">2007</span>
        </div>
        <div>
          <span class="book-detail-prop">出版社</span>
          <span class="symbol">：</span>
          <span class="book-detail-text">上海文化出版社</span>
        </div>
        <div class="book-about">
          <span class="book-detail-prop">简介</span>
          <span class="symbol">：</span>
          <span class="book-detail-text">
            故事起源於1952年，主角吴邪的祖父吴老狗在长沙的血屍墓里发现战国帛书，而引发後来吴邪从帛书解谜途中的一段段冒险。五十年後，吴邪一个看似单纯的吴家富二代，大学毕业後便经营著古董店，日子过一天是一天，殊不知其身世冒险之离奇，因为发现先人笔记中一个秘密就此展开。抱著好奇和一颗想见世面的心，他硬是跟上他三叔及一群盗墓高手的鲁王宫之旅，欲解开帛书之谜。在这个过程中他遇见了闷油瓶和胖子。在途中，很多他一辈子都没见过的东西，或是连想都没想过的东西，一个接著一个出现。遭遇的每件事，越来越离奇。就在他发现自己的生活满是谜题，并欲寻求解答时，唯一的线索──「三叔」却消失了。不甘放弃的吴邪，决定追根究柢，也决定今後不凡但却不为人知的冒险旅程。
          </span>
        </div>
      </div>
      <div class="bookmark-rating-wrap">
        <img class="bookmark" src="@/assets/Bookmark_fill.svg" alt="bookmark" />
        <div class="rating-wrap">
          <span class="rating">4.6</span>
          <img class="rating-icon" src="@/assets/Star_fill.svg" alt="" />
        </div>
        <span class="rate-now">点击评分</span>
      </div>
      <div class="like-comment-wrap">
        <img src="@/assets/Love.svg" alt="love" />
        <span class="like-count">123</span>
        <img src="@/assets/Comment.svg" alt="comment" />
        <span class="comment-count">123</span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "DaoMuBiJi",
  components: {
    Header,
  },
};
</script>

<style scoped>
.like-comment-wrap{
    padding-top: 20px;
  /* outline: 1px black solid; */
}
.like-comment-wrap span{
    display: inline-block;
    margin-right: 20px;
    line-height: 30px;
    vertical-align: middle;
  /* outline: 1px black solid; */
}
.like-comment-wrap img{
    height: 36px;
    vertical-align: middle;
  /* outline: 1px black solid; */
}
.rate-now:hover{
    cursor: pointer;
    color: #456268;
}
.rate-now{
    display: block;
    height: 30px;
    width: 100px;
    margin: 5px 0;
    color: #79a3b1;
    text-align: center;
    position: relative;
    z-index: 999;
    /* outline: 1px black solid; */
}
.rating-icon {
  height: 45px;
  vertical-align: middle;
  /* outline: 1px black solid; */
}
.rating {
  font-size: 36px;
  vertical-align: middle;
  /* outline: 1px black solid; */
}
.rating-wrap{
    margin: 0 0 5px;
    height: 40px;
  text-align: center;
  /* outline: 1px black solid; */
}
.bookmark {
  display: block;
  height: 50px;
  margin: 0 auto;
  position: relative;
  bottom: 38px;
  /* outline: 1px black solid; */
}
.book-detail-text {
  display: inline-block;
  position: absolute;
  width: 790px;
  /* outline: 1px black solid; */
}
.book-detail-wrap .symbol {
  display: inline-block;
  color: #79a3b1;
}
.book-detail-prop {
  display: inline-block;
  width: 60px;
  color: #79a3b1;
}
.book-detail-wrap div {
  margin: 5px 0;
}
.book-detail-wrap h2 {
  margin: 10px 0;
  font-size: 36px;
  color: #456268;
}
.bookmark-rating-wrap {
  display: inline-block;
  height: 170px;
  width: 100px;
  vertical-align: top;
  /* outline: 1px black solid; */
}
.book-detail-wrap {
  display: inline-block;
  height: 390px;
  width: 740px;
  padding: 5px 30px;
  vertical-align: top;
  /* outline: 1px black solid; */
}
.poster {
  height: 400px;
}
.book-wrap {
  width: 1200px;
  margin: 30px auto;
  padding: 30px 30px 10px;
  background-color: #FCF8EC;
  /* outline: 1px black solid; */
}
span {
  color: #456268;
  font-size: 18px;
}
</style>