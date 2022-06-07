<template id="a">
  <div>
    <el-row class="feed-box">
      <!-- 小组帖子标签 -->
      <div v-if="isPin || isFeatured" class="feed-tag"></div>
      <span v-if="isPin" class="feed-tag-span">置顶</span>
      <span v-if="isFeatured && !isPin" class="feed-tag-span">精选</span>

      <!-- 发布者/管理员对帖子的操作 -->
      <el-dropdown v-if="isAdmin || isMine" trigger="click">
        <i class="el-icon-more"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="isAdmin && !isPin" @click.native="pin()">置顶</el-dropdown-item>
          <el-dropdown-item v-else-if="isAdmin && isPin" @click.native="pin()">取消置顶</el-dropdown-item>
          <el-dropdown-item v-if="isAdmin && !isFeatured" @click.native="feature()">精选</el-dropdown-item>
          <el-dropdown-item v-if="isAdmin && isFeatured" @click.native="feature()">取消精选</el-dropdown-item>
          <el-dropdown-item v-if="isMine" @click.native="deleteDialogVisible = true">删除帖子</el-dropdown-item>
          <el-dropdown-item v-else-if="isAdmin" @click.native="deleteDialogVisible = true">删除帖子</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 删除帖子确认框 -->
      <el-dialog title="删除帖子" :visible.sync="deleteDialogVisible" width="30%">
        <span>确认是否需要删除帖子</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteDialogVisible = false; deleteFeed();">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 发布者头像、昵称、发布时间 -->
      <el-row :gutter="70" align="middle" type="flex">
        <el-col :span="1">
          <el-avatar v-if="publisherAvatar" :size="50" :src="publisherAvatar" @click.native="enterProfile(createdBy)"></el-avatar>
          <el-avatar v-else :size="50" icon="el-icon-user-solid" @click="enterProfile(createdBy)"></el-avatar>
        </el-col>
        <el-col :span="20">
          <el-row class="feed-publisher">
            <span v-if="!isGroup && !isPublic">{{ groupName }}</span>
            <el-divider v-if="!isGroup && !isPublic" direction="vertical"></el-divider>
            <span @click="enterProfile(createdBy)" style="cursor: pointer">
              {{ publisherName }}
            </span>
          </el-row>
          <el-row class="feed-time">
            <i class="el-icon-time"></i>
            {{ dateStr(createdAt) }}
          </el-row>
        </el-col>
      </el-row>

      <!-- 话题标题、内容、展开功能 -->
      <el-row class="feed-title">
        <span @click="enterFeed()">{{ title }}</span>
      </el-row>
      <el-row class="feed-content">
        <span v-if="isPublic" class="feed-hashtag" @click="enterTag(belongTag)">#{{ tagTitle }}#</span>
        <span v-html="descriptionCalc()"></span>
      </el-row>
      <el-row type="flex" justify="end">
        <div v-if="isNeedExpand && !isShowComment">
          <button class="expand-button" v-if="this.isExpand === false" @click="changeExpand()">
            展开<i class="el-icon-arrow-down"></i>
          </button>
          <button class="expand-button" v-else @click="changeExpand()">
            收起<i class="el-icon-arrow-up"></i>
          </button>
        </div>
      </el-row>

      <!-- 话题照片 -->
      <el-row class="feed-image" type="flex" justify="center">
        <img v-if="image" :src="image" alt="feed-image" />
      </el-row>

      <!-- 话题点赞、评论、举报 -->
      <el-row class="like-comment-wrap">
        <img v-if="response === 'L'" @click="like()" src="@/assets/Love_fill.svg" alt="love"/>
        <img v-else @click="like()" src="@/assets/Love.svg" alt="love" />
        <span class="like-count">{{ likeCount }}</span>
        <img @click="enterFeed()" src="@/assets/Comment.svg" alt="comment" />
        <span class="comment-count">{{ commentCount }}</span>
        <img @click="report('f&' + id)" src="@/assets/Report.svg" alt="report icon"/>
      </el-row>

      <!-- 评论区 -->
      <div v-if="isShowComment" class="comment-wrap">

        <!-- 我要评论 -->
        <el-row v-if="islogin" class="publish-box">
          <el-row :gutter="70">
            <el-col :span="1">
              <el-avatar v-if="userAvatar" :size="50" :src="userAvatar"></el-avatar>
              <el-avatar v-else :size="50" icon="el-icon-user-solid"></el-avatar>
            </el-col>
            <el-col :span="22">
              <el-row class="comment-publisher">{{ user }}</el-row>
              <el-row class="publish-write">
                <form>
                  <div class="comment-autosize-wrapper">
                    <pre class="comment-autosize" >
                      <br>{{ userComment.content }}
                    </pre>
                    <textarea v-model="userComment.content" placeholder="书评内容："></textarea>
                  </div>
                  <span class="showFileName"></span>
                  <i v-if="userComment.img" class="el-icon-delete" @click="deleteImg()" style="cursor: pointer"></i>
                    <input id="imgUpload" type="file" accept="image/png,image/gif,image/jpeg" @change="getImg($event)"/>
                  <el-row class="publish-action" :span="20">
                    <i class="el-icon-picture-outline-round" onclick="$('input[id=imgUpload]').click();"></i>
                    <i class="el-icon-position" @click="submitReview($event)"></i>
                  </el-row>
                </form>
              </el-row>
            </el-col>
          </el-row>
        </el-row>

        <!-- 其他评论 -->
        <el-row class="comment-box" v-for="c in comments" :key="c.id">
          <el-divider></el-divider>
          <br />
          <!-- 评论详情 -->
          <el-row :gutter="70">
            <el-col :span="1">
              <el-avatar v-if="c.publisherAvatar" :size="50" :src="c.publisherAvatar" @click.native="enterProfile(c.createdBy)"></el-avatar>
              <el-avatar v-else :size="50" icon="el-icon-user-solid" @click.native="enterProfile(c.createdBy)"></el-avatar>
            </el-col>
            <el-col :span="22">
              <el-row v-if="status" @click="enterProfile(c.createdBy)">
                <span @click="enterProfile(c.createdBy)" class="comment-publisher">{{ c.publisherName }}</span>
              </el-row>
              <el-row v-if="status" class="comment-time">
                <i class="el-icon-time"></i>
                {{ dateStr(c.time) }}
              </el-row>
              <span style="word-wrap: break-word" v-html="contentCalc(c.description)"></span>
              <img v-if="c.img" :src="c.img" class="comment-image" alt="comment-image"/>
            </el-col>
          </el-row>
          <!-- 评论操作 -->
          <el-row class="comment-action">
            <el-col :span="3" :offset="5">
              <el-row type="flex" justify="center">
                <img v-if="c.response === 'L'" @click="commentResponse(c, 'O')" src="@/assets/Happy_fill.svg" alt="happy icon"/>
                <img v-else @click="commentResponse(c, 'L')" src="@/assets/Happy.svg" alt="happy icon"/>
              </el-row>
              <el-row class="comment-like-count" type="flex" justify="center">{{ c.likes }}</el-row>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-row type="flex" justify="center">
                <img v-if="c.response === 'D'" @click="commentResponse(c, 'O')" src="@/assets/Sad_fill.svg" alt="sad icon"/>
                <img v-else @click="commentResponse(c, 'D')" src="@/assets/Sad.svg" alt="sad icon"/>
              </el-row>
              <el-row class="comment-like-count" type="flex" justify="center">{{ c.dislikes }}</el-row>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-row type="flex" justify="center">
                <img id="report" @click="report('r&' + c.id)" src="@/assets/Report.svg" alt="report icon"/>
              </el-row>
            </el-col>
          </el-row>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
import User from "@/store/user";

export default {
  name: "FeedBox",
  
  props: {
    initialFeedId: String,
    initialIsInnerpage: Boolean,
    initialIsGroup: Boolean,
    initialIsPin: Boolean,
    initialIsFeatured: Boolean,
    initialIsAdmin: Boolean,
  },

  data() {
    return {
      status: false,
      islogin: false,
      deleteDialogVisible: false,
      user: "",
      userId: "",
      userAvatar: "",
      id: this.initialFeedId,
      createdBy: "",
      publisherName: "",
      publisherAvatar: "",
      isMine: false,
      createdAt: "",
      isPublic: true,
      belongTo: "",
      belongTag: "",
      tagTitle: "",
      isPin: this.initialIsPin,
      isFeatured: this.initialIsFeatured,
      isAdmin: this.initialIsAdmin,
      isGroup: this.initialIsGroup,
      groupName: "",
      title: "",
      description: "",
      isExpand: false,
      image: "",
      likeCount: 0,
      commentCount: 0,
      isShowComment: this.initialIsInnerpage,
      response: "O",
      userComment: {
        content: "",
        img: "",
      },
      comments: [],
    };
  },

  mounted() {
    var userInfo;
    if ((userInfo = User.getters.getUser(User.state()))) {
      this.islogin = true;
      this.userId = userInfo.user.id;
    }
    this.getAll();
  },

  computed: {
    isNeedExpand() {
      if (this.description.length <= 180) this.isExpand = true;
      return this.description.length > 180;
    },
  },

  methods: {
    async deleteFeed() {
      var formData = new FormData();
      formData.append("feedId", this.id);
      if (!this.isPublic) 
        formData.append("groupId", this.belongTo);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "delete",
        url: "/api/v1/feed/" + this.id,
        data: formData,
        headers: header,
      })
        .then(res => {
          console.log(res);
          if (this.initialIsInnerpage) this.$router.push("/feed");
          else location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    },
    async feature() {
      var formData = new FormData();
      formData.append("feedId", this.id);
      formData.append("groupId", this.belongTo);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "put",
        url: "/api/v1/group/setFeatured/" + this.belongTo + "/" + this.id,
        data: formData,
        headers: header,
      })
        .then(res => {
          console.log(res);
          this.isFeatured = !this.isFeatured;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async pin() {
      var formData = new FormData();
      formData.append("feedId", this.id);
      formData.append("groupId", this.belongTo);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "put",
        url: "/api/v1/group/setPin/" + this.belongTo + "/" + this.id,
        data: formData,
        headers: header,
      })
        .then(res => {
          console.log(res);
          this.isPin = !this.isPin;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async follow() {
      var formData = new FormData();
      formData.append("isFollowed", !this.isFollow);
      formData.append("feedId", this.id);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "put",
        url: "/api/v1/feed/react/" + this.id,
        data: formData,
        headers: header,
      })
        .then(res => {
          console.log(res);
          this.isFollow = !this.isFollow;
        })
        .catch(err => {
          console.log(err);
          switch (err.response.status) {
            case 401:
              this.$notify({
                title: "请先加入小组！",
                type: "warning",
                position: "top-left",
              });
              break;
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
    async like() {
      var likeStatus;
      if (this.response == "L") likeStatus = "O";
      else likeStatus = "L";

      var formData = new FormData();
      formData.append("response", likeStatus);
      formData.append("feedId", this.id);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "put",
        url: "/api/v1/feed/react/" + this.id,
        data: formData,
        headers: header,
      })
        .then(res => {
          console.log(res);
          this.response = likeStatus;
          if (this.response == "L") this.likeCount++;
          else this.likeCount--;
        })
        .catch(err => {
          console.log(err);
          switch (err.response.status) {
            case 401:
              this.$notify({
                title: "请先加入小组！",
                type: "warning",
                position: "top-left",
              });
              break;
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
        .then(res => {
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
        .catch(err => {
          console.log(err);
          switch (err.response.status) {
            case 401:
              this.$notify({
                title: "请先加入小组！",
                type: "warning",
                position: "top-left",
              });
              break;
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
      formData.append("description", this.userComment.content);
      formData.append("img", this.userComment.img);
      formData.append("feed", this.id);
      formData.append("book", "");
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
        .then(res => {
          console.log(res);
          this.$notify({
            showClose: true,
            message: "已发布评论",
            type: "success",
            position: "top-left",
          });
          location.reload();
        })
        .catch(err => {
          console.log(err);
          switch (err.response.status) {
            case 400:
              if (this.userComment.content.length > 5000)
                this.$notify({
                  title: "评论长度不可超过5000字符！",
                  type: "warning",
                  position: "top-left",
                });
              else
                this.$notify({
                  title: "评论不能为空！",
                  type: "warning",
                  position: "top-left",
                });
              break;
            case 401:
              this.$notify({
                title: "请先加入小组！",
                type: "warning",
                position: "top-left",
              });
              break;
          }
        });
    },
    async getAll() {
      await this.$axios
        .all([this.getFeedDetail(), this.getComment()])
        .then(
          this.$axios.spread((detailRes, commentRes) => {
            var r = detailRes.data;
            this.title = r.title;
            this.description = r.description;
            this.image = r.img;
            this.isPublic = r.isPublic;
            this.createdBy = r.createdBy;
            this.belongTo = r.belongTo;
            this.belongTag = r.belongTag;
            this.createdAt = new Date(r.createdAt).getTime();
            this.likeCount = r.likes;
            this.commentCount = commentRes.data.count;
            this.comments = commentRes.data.results;
            this.response = r.response;
            this.isFollow = r.isFollow;
            this.isMine = r.createdBy == this.userId;
          })
        )
        .catch((error) => {
          console.log(error);
        });

      // 用户资料
      if (this.islogin){
        await this.$axios
          .get("/api/v1/user/" + this.userId)
          .then(res => {
            this.user = res.data.username;
            this.userAvatar = res.data.profile;
          })
          .catch(error => {
            console.log(error);
          });
      }

      // 发布者资料
      await this.$axios
        .get("/api/v1/user/" + this.createdBy)
        .then(res => {
          this.publisherName = res.data.username;
          if (res.data.profile) this.publisherAvatar = res.data.profile;
        })
        .catch(error => {
          console.log(error);
        });

      // 所属小组/话题资料
      if (!this.isPublic) {
        await this.$axios
          .get("/api/v1/group/" + this.belongTo)
          .then(res => {
            this.groupName = res.data.groupName;
          })
          .catch(error => {
            console.log(error);
          });
      }
      else{
        await this.$axios
          .get("/api/v1/tag/" + this.belongTag)
          .then(res => {
            this.tagTitle = res.data.title;
          })
          .catch(error => {
            console.log(error);
          });
      }

      // 评论详情
      for (let i = 0; i < this.comments.length; i++) {
        this.comments[i].time = new Date(this.comments[i].createdAt).getTime();

        await this.$axios
          .get("api/v1/review/" + this.comments[i].id)
          .then(res => {
            this.comments[i].img = res.data.img;
            this.comments[i].likes = res.data.likes;
            this.comments[i].dislikes = res.data.dislikes;
          })
          .catch(error => {
            console.log(error);
          });

        await this.$axios
          .get("/api/v1/user/" + this.comments[i].createdBy)
          .then((res) => {
            this.comments[i].publisherName = res.data.username;
            if (res.data.profile)
              this.comments[i].publisherAvatar = res.data.profile;
            if (i == this.comments.length - 1) this.status = true;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    getFeedDetail() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      return this.$axios({
        method: "get",
        url: "/api/v1/feed/" + this.id,
        headers: header,
      });
    },
    getComment() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      return this.$axios({
        method: "get",
        url: "/api/v1/review/list?feed=" + this.id,
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
      } 
      else if (time < 60 * 60) {
        s = Math.floor(time / 60);
        return s + "分钟前";
      } 
      else if (time < 60 * 60 * 24) {
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
      } 
      else if (time < 60 * 60 * 24 * 5) {
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
      } 
      else {
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
    descriptionCalc() {
      if (this.isShowComment)
        return this.description.replace(/(\r\n|\n|\r)/gm, "<br/>");
      var s = "";
      if (this.isExpand === false) {
        s = this.description.substring(0, 180) + "...";
      } 
      else {
        s = this.description;
      }
      return s.replace(/(\r\n|\n|\r)/gm, "<br/>");
    },
    changeExpand() {
      this.isExpand = !this.isExpand;
    },
    getImg(event) {
      var fileName = event.target.files[0].name;
      $(".showFileName").html(fileName);
      this.userComment.img = event.target.files[0];
    },
    deleteImg() {
      $("#imgUpload").attr('type', 'text');
      $("#imgUpload").attr('type', 'file');
      $(".showFileName").html("");
      this.userComment.img = "";
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
    enterGroup(groupid) {
      this.$router.push({ path: `/group/${groupid}` });
    },
    enterTag(tagid) {
      this.$router.push({ path: `/tag/${tagid}` });
    },
    enterFeed() {
      this.$router.push({ path: `/feed/${this.id}` });
    },
  },
};
</script>

<style>
.el-dropdown-menu__item:not(is-disabled):hover {
  background-color: #ebeef0 !important;
  color: #456268 !important;
}
</style>

<style scoped>
.el-dropdown {
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 5px;
  transform: rotate(90deg);
  cursor: pointer;
}
.feed-tag-span {
  color: #fcf8ec;
  display: inline-block;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 4px;
  left: 8px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
}
.feed-tag {
  width: 0;
  height: 0;
  border: 30px solid #456268;
  border-right: 30px solid transparent;
  border-bottom: 30px solid transparent;
  position: absolute;
  top: 0;
  left: 0;
}

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
  margin: 0 0 5px 15px;
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
.publish-write {
  margin: 5px 0;
  border-radius: 10px;
  background: rgba(121, 163, 177, 0.1);
}

.comment-like-count {
  font-size: 12px;
}
.comment-action img:hover {
  cursor: pointer;
}
.comment-action img {
  height: 28px;
}
.comment-upload-image button {
  border: none;
  background: none;
}
.comment-upload-image {
  display: inline-block;
}
.comment-action {
  width: 300px;
  padding-top: 10px;
}
.comment-image {
  display: block;
  max-width: 100%;
}
.comment-time {
  font-size: 12px;
  color: grey;
}
.comment-publisher {
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}
.comment-box {
  padding: 15px 0;
  word-wrap: break-word;
}

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
.like-comment-wrap img:hover {
  cursor: pointer;
}
.comment-wrap {
  margin: 30px auto;
}

.feed-unfollow:hover,
.feed-follow:hover {
  cursor: pointer;
}
.feed-unfollow {
  width: 130px;
  margin-right: 20px;
  font-size: 18px;
  line-height: 32px;
  font-weight: 600;
  border-radius: 15px;
  background: none;
  color: #456268;
  border: #456268 1px solid;
}
.feed-follow {
  width: 130px;
  margin-right: 20px;
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  border: 1px #456268 solid;
  color: #fcf8ec;
  background-color: #456268;
  border-radius: 15px;
}
.feed-image img {
  width: 800px;
  margin: 10px;
}
.expand-button:hover {
  cursor: pointer;
  color: #8ebfce;
}
.expand-button {
  background: none;
  border: none;
  font-size: 16px;
  color: #79a3b1;
}
.feed-content {
  font-size: 18px;
  word-wrap: break-word;
}
.feed-hashtag {
  color: #79a3b1;
  cursor: pointer;
}
.feed-title {
  margin: 20px 0;
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
}
.feed-time {
  color: grey;
}
.feed-publisher {
  font-size: 22px;
  font-weight: 600;
}
.feed-box {
  color: #456268;
  padding: 50px 60px;
  margin: 0 0 50px;
  background-color: #fcf8ec;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.25);
}
.el-divider {
  position: relative;
  bottom: 3px;
  margin: auto 15px;
}
button {
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
}
.el-avatar:hover{
  cursor: pointer;
}
</style>