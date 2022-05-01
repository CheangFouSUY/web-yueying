<template>
  <div>
    <Header></Header>
    <div class="page-title">
      <img src="@/assets/Book.svg" alt="book icon" />
      <span>图书</span>
    </div>
    <div class="category">
      <div class="ctg-title">类型</div>
      <ul class="ctg-list">
        <li>爱情</li>
        <li>恐怖</li>
        <li>悬疑</li>
        <li>科幻</li>
        <li>艺术</li>
        <li>体育</li>
        <li>烹饪</li>
        <li>漫画</li>
        <li>教育</li>
        <li>哲学</li>
        <li>文学</li>
      </ul>
    </div>
    <div class="hot-book">
      <div class="ctg-title">热门</div>
      <div class="poster-list-wrap">
        <img class="arrow-left" src="@/assets/Expand_left.svg" alt="arrow" />
        <ul class="book-list">
          <li class="poster-title-wrap">
            <a href="./daomubiji">
              <img src="@/assets/poster/DaoMuBiJi.jpg" alt="盗墓笔记" />
            </a>
            <div class="title-wrap">
              <span class="book-title">盗墓笔记</span>
              <span class="rating">4.6</span>
            </div>
          </li>
          <li class="poster-title-wrap">
            <a href="./DaoMuBiJi.vue">
              <img src="@/assets/poster/DaoMuBiJi.jpg" alt="盗墓笔记" />
            </a>
            <div class="title-wrap">
              <span class="book-title">盗墓笔记</span>
              <span class="rating">4.6</span>
            </div>
          </li>
          <li class="poster-title-wrap">
            <a href="./DaoMuBiJi.vue">
              <img src="@/assets/poster/DaoMuBiJi.jpg" alt="盗墓笔记" />
            </a>
            <div class="title-wrap">
              <span class="book-title">盗墓笔记</span>
              <span class="rating">4.6</span>
            </div>
          </li>
          <li class="poster-title-wrap">
            <a href="./DaoMuBiJi.vue">
              <img src="@/assets/poster/DaoMuBiJi.jpg" alt="盗墓笔记" />
            </a>
            <div class="title-wrap">
              <span class="book-title">盗墓笔记</span>
              <span class="rating">4.6</span>
            </div>
          </li>
          <li class="poster-title-wrap">
            <a href="./DaoMuBiJi.vue">
              <img src="@/assets/poster/DaoMuBiJi.jpg" alt="盗墓笔记" />
            </a>
            <div class="title-wrap">
              <span class="book-title">盗墓笔记</span>
              <span class="rating">4.6</span>
            </div>
          </li>
          <li class="poster-title-wrap">
            <a href="./DaoMuBiJi.vue">
              <img src="@/assets/poster/DaoMuBiJi.jpg" alt="盗墓笔记" />
            </a>
            <div class="title-wrap">
              <span class="book-title">盗墓笔记</span>
              <span class="rating">4.6</span>
            </div>
          </li>
        </ul>
        <img class="arrow-right" src="@/assets/Expand_right.svg" alt="arrow" />
      </div>
    </div>
    <div class="new-book">
      <div class="ctg-title">最新上架</div>
      <div class="poster-list-wrap">
        <img class="arrow-left" src="@/assets/Expand_left.svg" alt="arrow" />
        <ul class="book-list">
          <li class="poster-title-wrap">
            <a href="./DaoMuBiJi.vue">
              <img src="@/assets/poster/DaoMuBiJi.jpg" alt="盗墓笔记" />
            </a>
            <div class="title-wrap">
              <span class="book-title">盗墓笔记</span>
              <span class="rating">4.6</span>
            </div>
          </li>
          <li class="poster-title-wrap">
            <a href="./DaoMuBiJi.vue">
              <img src="@/assets/poster/DaoMuBiJi.jpg" alt="盗墓笔记" />
            </a>
            <div class="title-wrap">
              <span class="book-title">盗墓笔记</span>
              <span class="rating">4.6</span>
            </div>
          </li>
          <li class="poster-title-wrap">
            <a href="./DaoMuBiJi.vue">
              <img src="@/assets/poster/DaoMuBiJi.jpg" alt="盗墓笔记" />
            </a>
            <div class="title-wrap">
              <span class="book-title">盗墓笔记</span>
              <span class="rating">4.6</span>
            </div>
          </li>
          <li class="poster-title-wrap">
            <a href="./DaoMuBiJi.vue">
              <img src="@/assets/poster/DaoMuBiJi.jpg" alt="盗墓笔记" />
            </a>
            <div class="title-wrap">
              <span class="book-title">盗墓笔记</span>
              <span class="rating">4.6</span>
            </div>
          </li>
          <li class="poster-title-wrap">
            <a href="./DaoMuBiJi.vue">
              <img src="@/assets/poster/DaoMuBiJi.jpg" alt="盗墓笔记" />
            </a>
            <div class="title-wrap">
              <span class="book-title">盗墓笔记</span>
              <span class="rating">4.6</span>
            </div>
          </li>
          <li class="poster-title-wrap">
            <a href="./DaoMuBiJi.vue">
              <img src="@/assets/poster/DaoMuBiJi.jpg" alt="盗墓笔记" />
            </a>
            <div class="title-wrap">
              <span class="book-title">盗墓笔记</span>
              <span class="rating">4.6</span>
            </div>
          </li>
        </ul>
        <img class="arrow-right" src="@/assets/Expand_right.svg" alt="arrow" />
      </div>
    </div>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from '@/components/Footer.vue';

export default {
  name: "BookMainpage",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.ctg-list li:hover,
.book-title:hover {
  color: #79a3b1;
  cursor: pointer;
}
.ctg-list li {
  display: inline-block;
  margin: 10px 30px 10px 0;
  font-size: 20px;
  /* outline: 1px black solid; */
}
.ctg-list {
  padding: 0;
  margin: 10px 70px;
  /* outline: 1px black solid; */
}
.category {
  margin: 30px 60px;
  /* outline: 1px black solid; */
}

.rating {
  display: block;
  float: right;
  margin: 5px;
  /* outline: 1px black solid; */
}
.book-title {
  display: block;
  float: left;
  width: 150px;
  margin: 5px;
  /* outline: 1px black solid; */
}
.title-wrap {
  height: 60px;
  width: 200px;
  font-size: 20px;
  /* outline: 1px black solid; */
}
.poster-title-wrap {
  display: inline-block;
  width: 200px;
  margin: 0 8px;
  background-color: #fcf8ec;
}
.poster-title-wrap img {
  height: 100%;
}
.poster-title-wrap a {
  display: block;
  height: 270px;
  overflow: hidden;
}
.poster-list-wrap li {
  list-style: none;
  /* outline: 1px black solid; */
}
.poster-list-wrap ul {
  display: inline-block;
  /* width: 1px; */
  padding: 0;
  margin: 15px 50px;
  /* outline: 1px black solid; */
}

.ctg-title {
  color: #79a3b1;
  font-size: 26px;
  margin: 0 70px;
}
.arrow-left {
  display: inline-block;
  position: absolute;
  top: 40%;
  /* outline: 1px black solid; */
}
.arrow-right {
  display: inline-block;
  position: absolute;
  top: 40%;
  left: 95.7%;
  /* outline: 1px black solid; */
}
.hot-book,
.new-book {
  margin: 30px 60px;
  /* outline: 1px black solid; */
}
.poster-list-wrap {
  position: relative;
  margin: auto;
  /* outline: 1px black solid; */
}

.page-title img {
  width: 60px;
  margin: auto 0 auto 80px;
  vertical-align: middle;
}
.page-title span {
  vertical-align: middle;
  margin-left: 5px;
}
.page-title {
  font-size: 32px;
  margin-left: 40px;
  margin-top: 20px;
}
body,
div {
  color: #456268;
}
#footer{
  position: relative;
  height: 88px;
}
</style>