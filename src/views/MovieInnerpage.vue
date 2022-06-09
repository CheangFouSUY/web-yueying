<template>
  <div>
    <Header></Header>
    <div id="main" :style="{ 'min-height': mainMinHeight + 'px' }">
      <div class="book-wrap">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-image class="poster" :src="src"></el-image>
          </el-col>
          <el-col :span="14">
            <el-row id="book-title">{{ title }}</el-row>
            <el-row class="book-detail">
              <div class="book-detail-prop">导演</div>
              <div class="symbol">：</div>
              {{ director }}
            </el-row>
            <el-row class="book-detail">
              <div class="book-detail-prop">主演</div>
              <div class="symbol">：</div>
              {{ actor }}
            </el-row>
            <el-row class="book-detail">
              <div class="book-detail-prop">类型</div>
              <div class="symbol">：</div>
              {{ category }}
            </el-row>
            <el-row class="book-detail">
              <div class="book-detail-prop">地区</div>
              <div class="symbol">：</div>
              {{ area }}
            </el-row>
            <el-row class="book-detail">
              <div class="book-detail-prop">年份</div>
              <div class="symbol">：</div>
              {{ year }}
            </el-row>
          </el-col>
          <el-col :span="4">
            <img
              v-if="isBookmark === false"
              class="bookmark"
              @click="bookmark()"
              src="@/assets/Bookmark.svg"
              alt="bookmark"
            />
            <img
              v-else
              class="bookmark"
              @click="bookmark()"
              src="@/assets/Bookmark_fill.svg"
              alt="bookmark"
            />
            <!-- <el-row><i class="el-icon-collection-tag"></i></el-row> -->
            <el-row class="rate-box" type="flex" justify="center">
              <el-col id="rating" :span="10">{{ rating }}</el-col>
              <el-col :span="8" :offset="0">
                <img class="rating-icon" src="@/assets/Star_fill.svg" alt="" />
              </el-col>
            </el-row>
            <el-rate
              v-model="rateValue"
              @change="selectRate(rateValue)"
              :colors="rateColors"
            ></el-rate>
          </el-col>
          <el-row :gutter="30" class="book-detail">
            <el-col :span="17">
              <div class="book-detail-prop">简介</div>
              <div class="symbol">：</div>
              <span>&nbsp;</span>
              <span
                style="word-wrap: break-word"
                v-html="contentCalc(description)"
              ></span>
            </el-col>
          </el-row>
        </el-row>
        <el-row class="like-comment-wrap">
          <img
            v-if="response === 'L'"
            @click="like()"
            src="@/assets/Love_fill.svg"
            alt="love"
          />
          <img v-else @click="like()" src="@/assets/Love.svg" alt="love" />
          <span class="like-count">{{ likeCount }}</span>
          <img src="@/assets/Comment.svg" alt="comment" />
          <span class="comment-count">{{ commentCount }}</span>
        </el-row>
      </div>
      <div class="comment-wrap">
        <el-row class="comment-header">影评</el-row>
        <el-divider></el-divider>
        <el-row v-if="islogin" class="publish-box">
          <el-row :gutter="70">
            <el-col :span="1">
              <el-avatar
                v-if="userAvatar"
                :size="50"
                :src="userAvatar"
              ></el-avatar>
              <el-avatar
                v-else
                :size="50"
                icon="el-icon-user-solid"
              ></el-avatar>
            </el-col>
            <el-col :span="22">
              <el-row class="comment-publisher">{{ user }}</el-row>
              <el-row class="publish-write">
                <form>
                  <input
                    v-model="userComment.title"
                    type="text"
                    placeholder="书评标题："
                  />
                  <div class="comment-autosize-wrapper">
                    <pre
                      class="comment-autosize"
                    ><br>{{ userComment.content }}</pre>
                    <textarea
                      v-model="userComment.content"
                      placeholder="书评内容："
                    ></textarea>
                  </div>
                  <span class="showFileName"></span>
                  <i
                    v-if="userComment.img"
                    class="el-icon-delete"
                    @click="deleteImg()"
                    style="cursor: pointer"
                  ></i>
                  <input
                    id="imgUpload"
                    type="file"
                    accept="image/png,image/gif,image/jpeg"
                    @change="getImg($event)"
                  />
                  <el-row class="publish-action" :span="20">
                    <i
                      class="el-icon-picture-outline-round"
                      onclick="$('input[id=imgUpload]').click();"
                    ></i>
                    <i
                      id="imgIcon"
                      class="el-icon-position"
                      @click="submitReview($event)"
                    ></i>
                  </el-row>
                </form>
              </el-row>
            </el-col>
          </el-row>
        </el-row>
        <el-row class="comment-box" v-for="item in comments" :key="item.id">
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
      </div>
    </div>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import User from "@/store/user";
export default {
  name: "DaoMuBiJi",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      status: false, //控制数据渲染
      islogin: false,
      user: "",
      userId: "",
      userAvatar: "",
      id: "",
      title: "",
      director: "",
      actor: "",
      year: "",
      category: "悬疑",
      area: "中国",
      description: "",
      src: "",
      rating: 0,
      likeCount: 0,
      commentCount: 0,
      response: "O",
      isBookmark: false,
      userComment: {
        title: "",
        content: "",
        img: "",
      },
      isRate: false,
      rateValue: -1,
      rateColors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      comments: [],
      categoryList: [
        "其他",
        "爱情",
        "恐怖",
        "悬疑",
        "冒险",
        "喜剧",
        "动作",
        "科幻",
        "综艺",
        "动漫",
        "卡通",
        "LGBT",
      ],
      areaList: ["中国", "美国", "英国", "韩国", "日本", "泰国", "马来西亚"],
      mainMinHeight: "",
    };
  },
  mounted() {
    var userInfo;
    if ((userInfo = User.getters.getUser(User.state()))) {
      this.islogin = true;
      this.userId = userInfo.user.id;
    }
    this.getAll();
    this.mainMinHeight = document.documentElement.clientHeight - $("#header").outerHeight(true) - $("#footer").outerHeight(true) - 6;
  },
  watch: {
    $route: {
      handler: "movieReload",
    },
  },
  methods: {
    async commentResponse(item, r) {
      var formData = new FormData();
      formData.append("response", r);
      formData.append("reviewId", item.id);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

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
    submitReview(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append("title", this.userComment.title);
      formData.append("description", this.userComment.content);
      formData.append("img", this.userComment.img);
      formData.append("book", "");
      formData.append("feed", "");
      formData.append("movie", this.id);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "post",
        url: "/api/v1/review/",
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          switch (res.status) {
            case 201:
              this.$notify({
                showClose: true,
                message: "已发布评论",
                type: "success",
                position: "top-left",
              });
              setTimeout(function () {
                location.reload();
              }, 1500);
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          switch (err.response.status) {
            case 400:
              if (this.userComment.title.length > 150)
                this.$notify({
                  title: "标题长度不可超过150字符！",
                  type: "warning",
                  position: "top-left",
                });
              else if (this.userComment.content.length > 5000)
                this.$notify({
                  title: "内容长度不可超过5000字符！",
                  type: "warning",
                  position: "top-left",
                });
              else
                this.$notify({
                  title: "标题和内容不能为空！",
                  type: "warning",
                  position: "top-left",
                });
              break;
          }
        });
    },
    async like() {
      var likeStatus;
      if (this.response == "L") likeStatus = "O";
      else likeStatus = "L";

      var formData = new FormData();
      formData.append("response", likeStatus);
      formData.append("movieId", this.id);
      formData.append("rateScore", this.rateValue);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      console.log(header);

      await this.$axios({
        method: "put",
        url: "/api/v1/movie/react/" + this.id,
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.response = likeStatus;
          if (this.response == "L") this.likeCount++;
          else this.likeCount--;
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
    async bookmark() {
      var formData = new FormData();
      formData.append("isSaved", !this.isBookmark);
      formData.append("movieId", this.id);
      formData.append("rateScore", this.rateValue);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      console.log(header);

      await this.$axios({
        method: "put",
        url: "/api/v1/movie/react/" + this.id,
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.isBookmark = !this.isBookmark;
          if (this.isBookmark) {
            this.$notify({
              title: "已收藏",
              type: "success",
              position: "top-left",
            });
          } else {
            this.$notify({
              title: "已取消收藏",
              type: "success",
              position: "top-left",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          switch (err.response.status) {
            case 403:
              this.$notify({
                title: "请先登录！",
                type: "warning",
                position: "top-left",
              });
              break;
          }
        });
    },
    async selectRate(value) {
      var formData = new FormData();
      formData.append("movieId", this.id);
      formData.append("isSaved", this.isBookmark);
      formData.append("rateScore", this.rateValue);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "put",
        url: "/api/v1/movie/react/" + this.id,
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          switch (res.status) {
            case 200:
              this.$notify({
                title: "已更新评分",
                type: "success",
                position: "top-left",
              });
              break;
            case 201:
              this.$notify({
                title: "已提交评分",
                type: "success",
                position: "top-left",
              });
              break;
          }
          setTimeout(function () {
            location.reload();
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          this.rateValue = 0;
          switch (err.response.status) {
            case 403:
              this.$notify({
                title: "请先登录！",
                type: "warning",
                position: "top-left",
              });
              break;
          }
        });
    },
    async getAll() {
      await this.$axios
        .all([this.getMovieDetail(), this.getComment()])
        .then(
          this.$axios.spread((detailRes, commentRes) => {
            var r = detailRes.data;
            this.id = r.id;
            this.title = r.title;
            this.director = r.director;
            this.actor = r.actor;
            this.category = this.categoryList[r.category];
            this.area = this.areaList[r.area];
            this.year = r.year.toString().substring(0,4);
            this.description = r.description;
            this.src = r.thumbnail;
            this.rating = r.rating.toFixed(1);
            this.likeCount = r.likes;
            this.commentCount = commentRes.data.count;
            this.comments = commentRes.data.results;
            this.response = r.response;
            this.isBookmark = r.isSave;
            this.isRate = r.isRate;
            this.rateValue = r.score;
            console.log(r.message);
          })
        )
        .catch((error) => {
          console.log(error);
        });

      if (this.islogin)
        await this.$axios
          .get("/api/v1/user/" + this.userId)
          .then((res) => {
            this.user = res.data.username;
            this.userAvatar = res.data.profile;
          })
          .catch((error) => {
            console.log(error);
          });

      //获取评论的详情
      for (let i = 0; i < this.comments.length; i++) {
        this.comments[i].time = new Date(this.comments[i].createdAt).getTime();
        await this.$axios
          .get("api/v1/review/" + this.comments[i].id)
          .then((res) => {
            this.comments[i].img = res.data.img;
            this.comments[i].likes = res.data.likes;
            this.comments[i].dislikes = res.data.dislikes;
          })
          .catch((error) => {
            console.log(error);
          });

        this.$axios
          .get("/api/v1/user/" + this.comments[i].createdBy)
          .then((res) => {
            this.comments[i].publisherName = res.data.username;
            if (res.data.profile)
              this.comments[i].publisherAvatar = res.data.profile;
            if (i == this.comments.length - 1) this.status = true;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getMovieDetail() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      console.log(header);
      return this.$axios({
        method: "get",
        url: "/api/v1/movie/" + this.$route.params.id,
        headers: header,
      });
    },
    getComment() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      console.log(header);
      return this.$axios({
        method: "get",
        url: "/api/v1/review/list?movie=" + this.$route.params.id,
        headers: header,
      });
    },
    getUser() {
      return this.$axios({
        method: "get",
        url: "/api/v1/user/" + this.userId,
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
    getImg(event) {
      var fileName = event.target.files[0].name;
      $(".showFileName").html(fileName);
      this.userComment.img = event.target.files[0];
    },
    deleteImg() {
      $("#imgUpload").attr("type", "text");
      $("#imgUpload").attr("type", "file");
      $(".showFileName").html("");
      this.userComment.img = "";
    },
    enterProfile(userid) {
      this.$router.push({ path: `/profile/${userid}` });
    },
    report(id) {
      this.$router.push({ path: `/report/${id}` });
    },
    movieReload() {
      location.reload();
    }
  },
};
</script>

<style scoped>
.showFileName {
  margin: 0 15px;
  line-height: 26px;
}
#imgUpload {
  display: none;
}
.el-icon-picture-outline-round:hover,
.el-icon-position:hover {
  cursor: pointer;
  color: #79a3b1;
}
.el-icon-picture-outline-round,
.el-icon-position {
  margin: 0 0 5px 20px;
  font-size: 24px;
  line-height: 30px;
}
.publish-write:focus-within {
  background-color: rgba(121, 163, 177, 0.2);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
}
.publish-box input:focus,
.publish-box textarea:focus {
  outline: none;
}
.publish-box textarea {
  position: absolute;
  top: 0;
  left: 0;
  resize: none;
  height: 100%;
  border: none;
  background: none;
}
.publish-box textarea,
.comment-autosize {
  width: 100%;
  min-height: 40px;
  padding: 10px;
  box-sizing: border-box;
  color: #456268;
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  font-size: 16px;
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
}
.comment-autosize-wrapper {
  position: relative;
  width: 100%;
}
.comment-autosize {
  margin: 0;
  visibility: hidden;
}
.publish-box input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: none;
  background: none;
  color: #456268;
  font-size: 16px;
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
}
.publish-write {
  height: auto;
  margin: 5px 0;
  padding: 5px;
  border-radius: 10px;
  background: rgba(121, 163, 177, 0.1);
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
.comment-header {
  font-size: 24px;
  font-weight: 600;
}

/* 详情部分 */
.like-comment-wrap {
  padding-top: 20px;
}
.like-comment-wrap span {
  display: inline-block;
  margin-right: 20px;
  line-height: 30px;
  font-size: 16px;
  vertical-align: middle;
}
.like-comment-wrap img {
  height: 36px;
  vertical-align: middle;
}
.like-comment-wrap img:hover,
.bookmark:hover {
  cursor: pointer;
}
.el-rate {
  position: relative;
  bottom: 20px;
  z-index: 999;
  text-align: center;
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
}
.rating-icon {
  height: 64px;
  vertical-align: middle;
}
#rating {
  font-size: 48px;
}
.rate-box {
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
}
.symbol {
  display: inline-block;
  color: #79a3b1;
  font-size: 18px;
}
.book-detail-prop {
  display: inline-block;
  width: 60px;
  color: #79a3b1;
  font-size: 18px;
}
#book-title {
  margin: 10px 0;
  font-size: 36px;
  font-weight: 600;
}
.book-detail {
  line-height: 28px;
  font-size: 18px;
}
.poster {
  width: 280px;
  height: 370px;
  overflow: hidden;
}
.book-wrap,
.comment-wrap {
  width: 1200px;
  margin: 30px auto;
  padding: 30px 30px 10px;
}
.book-wrap {
  background-color: #fcf8ec;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.25);
}
.el-row,
.el-col {
  color: #456268;
}
#report:hover {
  cursor: pointer;
}
#main {
  width: 1400px;
  margin: auto;
  padding: 30px 0;
  box-sizing: border-box;
}
#footer {
  bottom: 0;
}
</style>