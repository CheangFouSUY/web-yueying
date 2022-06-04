<template>
  <div>
    <Header></Header>
    <el-carousel :interval="5000" height="540px">
      <el-carousel-item v-for="item in carouselImg" :key="item">
        <img class="poster" :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>

    <el-row class="main">
      <el-col :span="17" :offset="1">
        <el-row>
          <div class="Book">
            <img src="@/assets/Book.svg" alt="book icon" /><span>热门图书</span>
          </div>
          <Swiper
            v-if="status"
            :initialList="bookHotList"
            :initialIsBook="true"
          ></Swiper>
        </el-row>
        <el-row>
          <div class="Book">
            <img src="@/assets/Video.svg" alt="video icon" /><span
              >热门影视</span
            >
          </div>
          <Swiper
            v-if="status"
            :initialList="movieHotList"
            :initialIsBook="false"
          ></Swiper>
        </el-row>

        <!-- 热门评论 -->
        <el-row>
          <div class="Book">
            <img src="@/assets/Video.svg" alt="video icon" /><span
              >热门评论</span
            >
          </div>
        </el-row>
        <el-row
          class="comment-box"
          v-for="item in reviewList.slice(0, 10)"
          :key="item.id"
        >
          <el-divider></el-divider>
          <el-row :gutter="70">
            <el-col :span="1">
              <el-avatar
                v-if="item.publisherAvatar"
                :size="50"
                :src="item.publisherAvatar"
              ></el-avatar>
              <el-avatar
                v-else
                :size="50"
                icon="el-icon-user-solid"
              ></el-avatar>
            </el-col>
            <el-col :span="22">
              <el-row v-if="status" class="comment-publisher">
                <span
                  @click="enterProfile(item.createdBy)"
                  style="cursor: pointer"
                >
                  {{ item.publisherName }}
                </span>
                <i class="el-icon-caret-right"></i>
                <span
                v-if="item.bookName"
                  @click="enterBook(item.book)"
                  style="cursor: pointer"
                >
                  {{ item.bookName }}
                </span>
                <span
                v-if="item.movieName"
                  @click="enterMovie(item.movie)"
                  style="cursor: pointer"
                >
                  {{ item.movieName }}
                </span>
              </el-row>
              <el-row v-if="status" class="comment-time">
                <i class="el-icon-time"></i>
                {{ dateStr(item.time) }}
              </el-row>
              <el-row class="comment-title">{{ item.title }}</el-row>
              <el-row
                class="comment-content"
                v-html="contentCalc(item.description)"
              ></el-row>
              <el-image
                v-if="item.img"
                class="comment-image"
                :src="item.img"
              ></el-image>
            </el-col>
          </el-row>
          <el-row class="comment-action">
            <el-col :span="3" :offset="5">
              <el-row type="flex" justify="center">
                <img
                  v-if="item.response === 'L'"
                  @click="commentResponse(item, 'O')"
                  src="@/assets/Happy_fill.svg"
                  alt="happy icon"
                />
                <img
                  v-else
                  @click="commentResponse(item, 'L')"
                  src="@/assets/Happy.svg"
                  alt="happy icon"
                />
              </el-row>
              <el-row class="comment-like-count" type="flex" justify="center">{{
                item.likes
              }}</el-row>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-row type="flex" justify="center">
                <img
                  v-if="item.response === 'D'"
                  @click="commentResponse(item, 'O')"
                  src="@/assets/Sad_fill.svg"
                  alt="sad icon"
                />
                <img
                  v-else
                  @click="commentResponse(item, 'D')"
                  src="@/assets/Sad.svg"
                  alt="sad icon"
                />
              </el-row>
              <el-row class="comment-like-count" type="flex" justify="center">{{
                item.dislikes
              }}</el-row>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-row type="flex" justify="center">
                <img
                  id="report"
                  @click="report('r&' + item.id)"
                  src="@/assets/Report.svg"
                  alt="report icon"
                />
              </el-row>
            </el-col>
          </el-row>
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-col class="hot-list-wrap">
          <el-row class="hot-list-title">热 榜</el-row>
          <el-tabs v-model="activeName" type="border-card" stretch>
            <el-tab-pane label="图书" name="book">
              <li
                class="hot-list"
                v-for="(item, index) in bookHotList.slice(0, 10)"
                :key="item.id"
                :style="{ color: listColor[index + 1 - 1] }"
              >
                <img
                  id="hot"
                  v-if="index + 1 === 1"
                  src="@/assets/Hot.jpg"
                  alt="hot icon"
                />
                <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="hot-list-number">{{ index + 1 }}</span>
                <span class="hot-list-name" @click="enterBook(item.id)">{{
                  item.title
                }}</span>
              </li>
            </el-tab-pane>
            <el-tab-pane label="影视" name="drama">
              <li
                class="hot-list"
                v-for="(item, index) in movieHotList.slice(0, 10)"
                :key="item.title"
                :style="{ color: listColor[index + 1 - 1] }"
              >
                <img
                  id="hot"
                  v-if="index + 1 === 1"
                  src="@/assets/Hot.jpg"
                  alt="hot icon"
                />
                <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="hot-list-number">{{ index + 1 }}</span>
                <span class="hot-list-name" @click="enterMovie(item.id)">{{
                  item.title
                }}</span>
              </li>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col class="hot-list-wrap">
          <el-row class="tag-list-title">热门话题</el-row>
          <div
            class="tag-list"
            v-for="item in tagList.slice(0, 10)"
            :key="item.id"
            @click="enterTag(item.id)"
          >
            #{{ item.title }}#
          </div>
        </el-col>
      </el-col>
    </el-row>

    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Swiper from "@/components/HomeSwiper.vue";

export default {
  name: "HomeView",
  components: {
    Header,
    Footer,
    Swiper,
  },
  data() {
    return {
      status: false,
      carouselImg: [
        require("../assets/poster/poster1.jpg"),
        require("../assets/poster/poster2.jpg"),
        require("../assets/poster/poster3.jpg"),
        require("../assets/poster/poster4.jpg"),
        require("../assets/poster/poster5.jpg"),
      ],
      activeName: "book",
      listColor: [
        "red",
        "orangered",
        "orange",
        "#456268",
        "#456268",
        "#456268",
        "#456268",
        "#456268",
        "#456268",
        "#456268",
      ],
      bookHotList: [],
      movieHotList: [],
      reviewList: [],
      tagList: [],
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    async commentResponse(item, r) {
      var formData = new FormData();
      formData.append("response", r);
      formData.append("reviewId", item.id);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      console.log(header);

      await this.$axios({
        method: "put",
        url: "/api/v1/review/react/" + item.id,
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          if (item.response == "O") {
            if (r == "L") item.likes++;
            else item.dislikes++;
          } else if (item.response == "L") {
            if (r == "O") item.likes--;
            else {
              item.likes--;
              item.dislikes++;
            }
          } else {
            if (r == "O") item.dislikes--;
            else {
              item.likes++;
              item.dislikes--;
            }
          }
          item.response = r;
        })
        .catch((err) => {
          console.log(err);
          switch (err.response.status) {
            case 403:
              this.$notify({
                title: "请先登录",
                type: "warning",
                position: "top-left",
              });
              break;
          }
        });
    },
    async getAll() {
      await this.$axios
        .all([
          this.getHotBook(),
          this.getHotMovie(),
          this.getHotReview(),
          this.getHotTag(),
        ])
        .then(
          this.$axios.spread((bookList, movieList, reviewList, tagList) => {
            this.bookHotList = bookList.data.results;
            this.movieHotList = movieList.data.results;
            this.setRating(this.bookHotList);
            this.setRating(this.movieHotList);
            this.reviewList = reviewList.data.results.filter((item) => {
              return !item.feed;
            });
            console.log(this.reviewList);
            this.tagList = tagList.data.results;
          })
        );

      for (let i = 0; i < this.reviewList.length; i++) {
        this.reviewList[i].time = new Date(
          this.reviewList[i].createdAt
        ).getTime();
        await this.$axios
          .get("api/v1/review/" + this.reviewList[i].id)
          .then((res) => {
            this.reviewList[i].img = res.data.img;
            this.reviewList[i].likes = res.data.likes;
            this.reviewList[i].dislikes = res.data.dislikes;
          })
          .catch((error) => {
            console.log(error);
          });

        if (this.reviewList[i].book)
          await this.$axios
            .get("/api/v1/book/" + this.reviewList[i].book)
            .then((res) => {
              this.reviewList[i].bookName = res.data.title;
            })
            .catch((error) => {
              console.log(error);
            });

        if (this.reviewList[i].movie)
          await this.$axios
            .get("/api/v1/movie/" + this.reviewList[i].movie)
            .then((res) => {
              this.reviewList[i].movieName = res.data.title;
            })
            .catch((error) => {
              console.log(error);
            });

        this.$axios
          .get("/api/v1/user/" + this.reviewList[i].createdBy)
          .then((res) => {
            this.reviewList[i].publisherName = res.data.username;
            if (res.data.profile)
              this.reviewList[i].publisherAvatar = res.data.profile;
            if (i == this.reviewList.length - 1) this.status = true;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getHotBook() {
      return this.$axios({
        method: "get",
        url: "/api/v1/book/list?orderBy=l",
      });
    },
    getHotMovie() {
      return this.$axios({
        method: "get",
        url: "/api/v1/movie/list?orderBy=l",
      });
    },
    getHotReview() {
      return this.$axios({
        method: "get",
        url: "/api/v1/review/list?orderBy=l",
      });
    },
    getHotTag() {
      return this.$axios({
        method: "get",
        url: "/api/v1/tag/list",
      });
    },
    setRating(arr) {
      return arr.forEach(function (value, index, array) {
        array[index].rating = array[index].rating.toFixed(1);
      });
    },
    dateStr(date) {
      var time = new Date().getTime();
      time = parseInt((time - date) / 1000);
      var s;
      if (time < 60 * 10) {
        return "刚刚";
      } else if (time < 60 * 60) {
        s = Math.floor(time / 60);
        return s + "分钟前";
      } else if (time < 60 * 60 * 24) {
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
      } else if (time < 60 * 60 * 24 * 5) {
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
      } else {
        // console.log(date);
        var date = new Date(parseInt(date));
        let y = date.getFullYear();
        let m =
          date.getMonth() < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let mn =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return y + "-" + m + "-" + d + " " + h + ":" + mn;
      }
    },
    contentCalc(s) {
      return s.replace(/(\r\n|\n|\r)/gm, "<br/>");
    },
    report(id) {
      this.$router.push({ path: `/report/${id}` });
    },
    enterProfile(userid) {
      this.$router.push({ path: `/profile/${userid}` });
    },
    enterBook(bookid) {
      this.$router.push({ path: `/book/detail/${bookid}` });
    },
    enterMovie(movieid) {
      this.$router.push({ path: `/movie/detail/${movieid}` });
    },
    enterTag(tagid) {
      this.$router.push({ path: `/tag/${tagid}` });
    },
  },
};
</script>

<style scoped>
.hot-list-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  /* text-align: center; */
  overflow: hidden;
  /* text-overflow: ellipsis; */
  position: absolute;
  margin-left: 90px;
  /* outline: 1px slateblue solid; */
}
.hot-list-name:hover {
  color: #79a3b1;
  cursor: pointer;
}
.hot-list-number {
  display: inline-block;
  width: 60px;
  /* text-align: center; */
  /* outline: 1px slateblue solid; */
  padding-left: 15px;
}
.hot-list {
  font-size: 22px;
  line-height: 45px;
  list-style-type: none;
  color: #456268;
  /* outline: 1px fuchsia solid; */
  display: flex;
  align-items: center;
}

::v-deep .el-tabs__item:hover {
  color: #547379 !important;
}
::v-deep .el-tabs__item.is-active {
  color: #456268 !important;
}
::v-deep .el-tabs__item {
  font-size: 18px;
  font-weight: 600;
  background-color: #d0dde2;
}
.comment-like-count {
  font-size: 12px;
}
.comment-action img {
  height: 28px;
  cursor: pointer;
}
.comment-action {
  width: 300px;
  padding-top: 10px;
}
.comment-content {
  font-size: 18px;
  word-wrap: break-word;
}
.comment-title {
  margin: 10px 0;
  font-size: 22px;
  font-weight: 600;
  text-decoration: underline;
  word-wrap: break-word;
}
.comment-image {
  max-width: 100%;
}
.comment-time {
  font-size: 12px;
  color: grey;
}
.comment-publisher {
  margin: 5px 0 0;
  font-size: 20px;
  font-weight: 600;
}
.comment-box {
  padding: 0 50px;
}
.tag-list-title {
  border-bottom: #456268 2px solid;
  /* text-align: center; */
  font-size: 26px;
  font-weight: 600;
  color: #456268;
}
.hot-list-title {
  padding: 10px;
  text-align: center;
  font-size: 26px;
  font-weight: 600;
  color: white;
  background-color: #456268;
}
.hot-list-wrap {
  padding: 100px 20px 0;
}
.tag-list:hover {
  color: #79a3b1;
  cursor: pointer;
}
.tag-list {
  margin: 10px 10px;
  font-size: 20px;
  color: #456268;
  /* outline: 1px black solid; */
}

.el-carousel {
  text-align: center;
  background-color: black;
}
.el-carousel .poster {
  height: 100%;
}
.el-col,
.el-row {
  /* outline: 1px red solid; */
}
#footer {
  position: relative;
  height: 88px;
}
.Book img,
.Drama img {
  width: 60px;
  vertical-align: middle;
}
.Book,
.Drama {
  margin: 40px 40px -10px;
  font-size: 28px;
  color: #456268;
  display: flex;
  align-items: center;
}
.lbTitle {
  background-color: #79a3b1;
  text-align: center;
  font-size: 36px;
}
.lbType1,
.lbType2 {
  background-color: #79a3b1;
  text-align: center;
  font-size: 24px;
}
.lbType1 {
  /* border-right: 1px solid white; */
}
.lbType2 {
  /* border-left: 1px solid white; */
}
.bg-red {
  background-color: red;
}
.bg-blue {
  background-color: blue;
}
.hot-list img {
  height: 25px;
  width: 25px;
  /* border: solid 1px black; */
}
.main {
  margin-bottom: 30px;
}
#footer {
  position: relative;
  height: 88px;
}
</style>
