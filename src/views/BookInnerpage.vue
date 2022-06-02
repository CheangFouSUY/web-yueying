<template>
  <div>
    <Header></Header>
    <div class="book-wrap">
      <el-row :gutter="30">
        <el-col :span="6">
          <el-image class="poster" :src="src"></el-image>
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
            {{ description }}
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
      <el-row class="comment-header">书评</el-row>
      <el-divider></el-divider>
      <el-row v-if="islogin" class="publish-box">
        <el-row :gutter="70">
          <el-col :span="1">
            <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
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
                <input
                  v-model="userComment.content"
                  type="text"
                  placeholder="书评内容："
                />
                <span class="showFileName"></span>
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

                  <input
                    id="imgUpload"
                    type="file"
                    accept="image/png,image/gif,image/jpeg"
                    @change="getImg($event)"
                  />
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
            <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
          </el-col>
          <el-col :span="22">
            <el-row v-if="status" class="comment-publisher">
              <span @click="enterProfile(item.createdBy)" style="cursor: pointer">
                {{ item.publisherName }}
              </span>
            </el-row>
            <el-row v-if="status" class="comment-time">
              <i class="el-icon-time"></i>
              {{ dateStr(item.time) }}
            </el-row>
            <el-row class="comment-title">{{ item.title }}</el-row>
            <el-row>{{ item.description }}</el-row>
            <el-image v-if="item.img" :src="item.img"></el-image>
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
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import User from "@/store/user";

export default {
  name: "BookInnerpage",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      status: false, //控制数据渲染
      islogin: false,
      user: "陌上花开",
      // userImg: "",
      id: "B11111",
      title: "盗墓笔记",
      isbn: "20134568",
      author: "南派三叔",
      category: "科幻",
      year: "2007",
      publish: "上海文化出版社",
      description:
        "故事起源於1952年，主角吴邪的祖父吴老狗在长沙的血屍墓里发现战国帛书，而引发後来吴邪从帛书解谜途中的一段段冒险。五十年後，吴邪一个看似单纯的吴家富二代，大学毕业後便经营著古董店，日子过一天是一天，殊不知其身世冒险之离奇，因为发现先人笔记中一个秘密就此展开。抱著好奇和一颗想见世面的心，他硬是跟上他三叔及一群盗墓高手的鲁王宫之旅，欲解开帛书之谜。在这个过程中他遇见了闷油瓶和胖子。在途中，很多他一辈子都没见过的东西，或是连想都没想过的东西，一个接著一个出现。遭遇的每件事，越来越离奇。就在他发现自己的生活满是谜题，并欲寻求解答时，唯一的线索──「三叔」却消失了。不甘放弃的吴邪，决定追根究柢，也决定今後不凡但却不为人知的冒险旅程。",
      src: require("@/assets/poster/DaoMuBiJi.jpg"),
      rating: "4.6",
      likeCount: "50",
      commentCount: "3",
      response: "L",
      isBookmark: false,
      userComment: {
        title: "",
        content: "",
        img: "",
      },
      isRate: false,
      rateValue: -1,
      rateColors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      comments: [
        // {
        //   id: "C0001",
        //   title: "大推！",
        //   createdBy: "b3e86355-9f73-4272-b2d2-badd776acccb",
        //   publisherName: "我直呼牛比",
        //   feed: null,
        //   book: "dfc78b5a-32f8-418c-b315-784ee8d5ee32",
        //   movie: null,
        //   updatedAt: "2022-05-22T12:22:00.813064Z",
        //   createdAt: "2022-05-22T12:22:00.813064Z",
        //   likes: 12,
        //   dislikes: 0,
        //   description:
        //     "《盗墓笔记》其实一点都不可怕，因为它并不是一个关于鬼怪和僵尸的小说。它讲述的，是一群人，在一个跨越千年的阴谋中，彼此牵绊了的一生。迷雾掩盖了真相，却让身在迷雾中的人，在分分合合中参悟了世间人情冷暖。三叔说，比鬼神更可怕的是人心。但我说，比金石更不朽的亦是人心。到头来，该散的人们各自散了。该留在心里的，也一个没有少。",
        // },
        // {
        //   id: "C0002",
        //   title: "真的很好看",
        //   publisherName: "一只高冷喵",
        //   feed: null,
        //   book: "dfc78b5a-32f8-418c-b315-784ee8d5ee32",
        //   movie: null,
        //   updatedAt: "2022-05-21T12:32:00.813064Z",
        //   createdAt: "2022-05-21T12:32:00.813064Z",
        //   likes: 1,
        //   dislikes: 2,
        //   description:
        //     "其实原来我以为自己是看不进去盗墓探险类的小说的。就像几年前流行天下霸唱的《鬼吹灯》，当时我也试着看了，但是完全没有进入状态，奇幻的景象可以想象，但是没有关键人物揪着你的心，让你继有读下去的欲望。而这次看《盗墓笔记》则不同，我一开始完全是冲着吴邪和张起灵这对暧昧的CP去的，没想到这一通看下来，除了对书中人物一通YY以外，我还对每一次华华丽丽的大冒险，都像亲身经历过一样，记忆犹新，回味无穷。",
        // },
        // {
        //   id: "C0003",
        //   title: "铁三角yyds",
        //   publisherName: "橘子东南飞",
        //   feed: null,
        //   book: "dfc78b5a-32f8-418c-b315-784ee8d5ee32",
        //   movie: null,
        //   updatedAt: "2022-05-19T10:57:18.048199Z",
        //   createdAt: "2022-05-19T10:57:18.048199Z",
        //   likes: 4,
        //   dislikes: 3,
        //   description:
        //     "还记得那时候，三叔因为看鬼吹灯，更新太慢，而自己动手，丰衣足食。结果，唉，实在不想说三叔都拖成了啥。那时候看书的男生很多，不想现在，基本是女的了。还记得那个时候每章下面的吐槽。出场较多的应该是红旗牌轿车，还有小哥堪比周杰伦的出场费啊等等。那个时候小哥对我来说就像神一样，每次无论多可怕的场景，只要他出现，就一点都不怕了，所以在秦岭神树那里，真的看的战战兢兢又期待，会不会有易容的小哥突然的出现。当然，现在的小哥也依然是我的男神。永远都会是。吴邪性格的变化，也让我们感觉像真的陪着他们走过了这么多年，这么多路。三叔真的坑，到现在，很多自己都圆不了。但我真的很感恩他当初没有按原计划把小哥写成女的。其实我是很排斥二次元和三次元破壁的。太久了，他们在心中已经生了根，他们属于三叔，但同样属于一路陪他们走来的人。他们在我的心中，早有他们的形象，不是任何人能代替扮演的，像真实存在一般，是鲜活存在的。我不是针对任何演员，但我不看任何电视电影，也很讨厌有人真人化。很多人走了，又有一些人走进，我不知道他们是不是因为喜欢他们偶像演的剧才进的，还是迟到了的发现与喜爱。也许将来我会不再看三叔的书。但对于书中的人物，对于瓶邪，对于铁三角，我永远都在。",
        // },
      ],
      categoryList: [
        "其他",
        "爱情",
        "恐怖",
        "悬疑",
        "科幻",
        "艺术",
        "体育",
        "烹饪",
        "漫画",
        "教育",
        "哲学",
        "文学",
      ],
    };
  },
  mounted() {
    var userInfo;
    if ((userInfo = User.getters.getUser(User.state()))) {
      this.islogin = true;
      this.user = userInfo.user.username;
    }
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
    submitReview(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append("title", this.userComment.title);
      formData.append("description", this.userComment.content);
      formData.append("img", this.userComment.img);
      formData.append("feed", "");
      formData.append("book", this.id);
      formData.append("movie", "");

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
      formData.append("bookId", this.id);
      formData.append("rateScore", this.rateValue);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      console.log(header);

      await this.$axios({
        method: "put",
        url: "/api/v1/book/react/" + this.id,
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
      formData.append("bookId", this.id);
      formData.append("rateScore", this.rateValue);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      console.log(header);

      await this.$axios({
        method: "put",
        url: "/api/v1/book/react/" + this.id,
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
      console.log("rate:", value);
      var formData = new FormData();
      formData.append("bookId", this.id);
      formData.append("rateScore", this.rateValue);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      console.log(header);

      await this.$axios({
        method: "put",
        url: "/api/v1/book/react/" + this.id,
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
        .all([this.getBookDetail(), this.getComment()])
        .then(
          this.$axios.spread((detailRes, commentRes) => {
            var r = detailRes.data;
            this.id = r.id;
            this.title = r.title;
            this.isbn = r.isbn;
            this.author = r.author;
            this.category = this.categoryList[r.category];
            this.year = r.year;
            this.publish = r.publisher;
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
      // console.log("getAll() done");
      // console.log("!!!!!", this.comments);

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

            for (let j = i + 1; j < this.comments.length; j++) {
              if (this.comments[i].createdBy == this.comments[j].createdBy)
                this.comments[j].publisherName = this.comments[i].publisherName;
            }
            if (i == this.comments.length - 1) this.status = true;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getBookDetail() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      console.log(header);
      return this.$axios({
        method: "get",
        url: "/api/v1/book/" + this.$route.params.id,
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
        url: "/api/v1/review/list?book=" + this.$route.params.id,
        headers: header,
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
    getImg(event) {
      var fileName = event.target.files[0].name;
      $(".showFileName").html(fileName);
      this.userComment.img = event.target.files[0];
      console.log("get img! ", this.userComment);
    },
    enterProfile(userid) {
      this.$router.push({ path: `/profile/${userid}` });
    },
    report(id) {
      this.$router.push({ path: `/report/${id}` });
    },
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
.publish-box input:focus {
  outline: none;
}
.publish-box input {
  width: 1060px;
  margin: 5px;
  padding: 10px;
  border: none;
  background: none;
  color: #456268;
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
}
.publish-write {
  margin: 5px 0;
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
.comment-title {
  margin: 10px 0;
  font-size: 18px;
  font-weight: 600;
  text-decoration: underline;
}
.comment-time {
  font-size: 12px;
  color: grey;
}
.comment-publisher {
  margin: 5px 0 0;
  font-size: 18px;
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
#footer {
  position: relative;
  height: 88px;
}
</style>