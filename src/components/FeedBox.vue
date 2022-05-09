<template id="a">
  <div>
    <el-row
      class="feed-box"
      v-for="item in feeds"
      :key="item.id"
      v-show="
        (item.isFollow === true && isShowFollow === true) ||
        isShowFollow === false
      "
    >
      <el-row :gutter="70" align="middle" type="flex">
        <!-- 发布者头像、昵称、发布时间 -->
        <el-col :span="1">
          <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
        </el-col>
        <el-col :span="20">
          <el-row class="feed-publisher">{{ item.publisher }}</el-row>
          <el-row class="feed-time">
            <i class="el-icon-time"></i>
            {{ dateStr(item.time) }}
          </el-row>
        </el-col>

        <!-- 话题关注、取消关注 -->
        <el-row>
          <button
            class="feed-follow"
            v-if="item.isFollow === false"
            @click="follow(item)"
          >
            关注
          </button>
          <button class="feed-unfollow" v-else @click="unfollow(item)">
            取消关注
          </button>
        </el-row>
      </el-row>

      <!-- 话题标题、内容、展开功能 -->
      <el-row class="feed-title">{{ item.title }}</el-row>
      <el-row class="feed-content">
        <span v-html="contentCalc(item)"></span>
      </el-row>
      <el-row type="flex" justify="end">
        <button
          class="expand-button"
          v-if="item.isExpand === false"
          @click="changeExpand(item)"
        >
          展开<i class="el-icon-arrow-down"></i>
        </button>
        <button class="expand-button" v-else @click="changeExpand(item)">
          收起<i class="el-icon-arrow-up"></i>
        </button>
      </el-row>

      <!-- 话题照片 -->
      <el-row
        class="feed-image"
        v-for="i in item.image"
        :key="i"
        type="flex"
        justify="center"
      >
        <img :src="i" alt="feed-image" />
      </el-row>

      <!-- 话题点赞、评论、举报 -->
      <el-row class="like-comment-wrap">
        <img
          v-if="item.isLike === false"
          @click="like(item)"
          src="@/assets/Love.svg"
          alt="love"
        />
        <img
          v-else
          @click="like(item)"
          src="@/assets/Love_fill.svg"
          alt="love"
        />
        <span class="like-count">{{ item.likeCount }}</span>
        <img src="@/assets/Comment.svg" alt="comment" />
        <span class="comment-count">{{ item.commentCount }}</span>
      </el-row>

      <!-- 评论区 -->
      <div class="comment-wrap">
        <!-- 我要评论 -->
        <el-row class="publish-box">
          <el-row :gutter="70">
            <el-col :span="1">
              <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
            </el-col>
            <el-col :span="22">
              <el-row class="comment-publisher">{{ user }}</el-row>
              <el-row class="publish-write">
                <input
                  v-model="item.userComment"
                  type="text"
                  placeholder="写下评论"
                />
                <el-row class="publish-action" :span="20">
                  <el-upload
                    class="comment-upload-image"
                    action="#"
                    list-type="picture"
                    :before-remove="beforeRemove"
                    multiple
                    :auto-upload="false"  
                    :limit="3"
                    :on-exceed="handleExceed">
                    <button>
                      <i class="el-icon-picture-outline-round"></i>
                    </button>
                  </el-upload>
                  <i class="el-icon-position" @click="sendComment(item)"></i>
                  <!-- <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div> -->
                </el-row>
              </el-row>
            </el-col>
          </el-row>
        </el-row>

        <!-- 其他评论 -->
        <el-row class="comment-box" v-for="c in item.comments" :key="c.id">
          <el-divider></el-divider><br />
          <el-row :gutter="70">
            <el-col :span="1">
              <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
            </el-col>
            <el-col :span="22">
              <el-row class="comment-publisher">{{ c.publisher }}</el-row>
              <el-row class="comment-time">
                <i class="el-icon-time"></i>
                {{ dateStr(c.time) }}
              </el-row>
              <el-row>{{ c.contents }}</el-row>
              <el-row class="comment-image" v-for="cimg in c.image" :key="cimg">
                <img :src="cimg" alt="feed-image" />
              </el-row>
            </el-col>
          </el-row>
          <el-row class="comment-action">
            <el-col :span="3" :offset="5">
              <el-row type="flex" justify="center">
                <img
                  v-if="c.isLike === false"
                  @click="commentLike(c)"
                  src="@/assets/Happy.svg"
                  alt="happy icon"
                />
                <img
                  v-else
                  @click="commentLike(c)"
                  src="@/assets/Happy_fill.svg"
                  alt="happy icon"
                />
              </el-row>
              <el-row class="comment-like-count" type="flex" justify="center">
                {{ c.likes }}
              </el-row>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-row type="flex" justify="center">
                <img
                  v-if="c.isDislike === false"
                  @click="commentDislike(c)"
                  src="@/assets/Sad.svg"
                  alt="sad icon"
                />
                <img
                  v-else
                  @click="commentDislike(c)"
                  src="@/assets/Sad_fill.svg"
                  alt="sad icon"
                />
              </el-row>
              <el-row class="comment-like-count" type="flex" justify="center">{{
                c.dislikes
              }}</el-row>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-row type="flex" justify="center">
                <img @click="report" src="@/assets/Report.svg" alt="report icon" />
              </el-row>
            </el-col>
          </el-row>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "FeedBox",
  props: {
    initialFeed: Array,
    initialUser: String,
    isShowFollow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      feeds: this.initialFeed,
      user: this.initialUser,
    };
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    showAll() {
      this.isShowFollow = false;
      this.allColor = "#79A3B1";
      this.followColor = "#456268";
    },
    showFollow() {
      this.isShowFollow = true;
      this.followColor = "#79A3B1";
      this.allColor = "#456268";
    },
    follow(item) {
      item.isFollow = true;
    },
    unfollow(item) {
      item.isFollow = false;
    },
    like(item) {
      item.isLike = !item.isLike;
      if (item.isLike === true) item.likeCount++;
      else item.likeCount--;
    },
    commentLike(comment) {
      comment.isLike = !comment.isLike;
      if (comment.isLike === true) comment.likes++;
      else comment.likes--;
    },
    commentDislike(comment) {
      comment.isDislike = !comment.isDislike;
      if (comment.isDislike === true) comment.dislikes++;
      else comment.dislikes--;
    },
    sendComment(item) {
      if (!item.userComment) {
        this.$notify({
          showClose: true,
          type: "warning",
          message: "评论不能为空",
        });
      } else {
        let a = {};
        a.publisher = this.user;
        a.contents = item.userComment;
        a.time = new Date().getTime();
        // a.image = [];
        a.likes = 0;
        a.dislikes = 0;
        a.isLike = false;
        a.isDislike = false;
        item.comments.unshift(a);
        item.commentCount++;
        item.userComment = "";
      }
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
    contentCalc(item) {
      var s = "";
      if (item.isExpand === false) {
        s = item.fullContent.substring(0, 180) + "...";
      } else {
        s = item.fullContent;
      }
      return s.replace(/(\r\n|\n|\r)/gm, "<br/>");
    },
    changeExpand(item) {
      item.isExpand = !item.isExpand;
    },
    report() {
      this.$router.push('/report')
    }
  },
};
</script>

<style scoped>
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
.comment-time {
  font-size: 12px;
  color: grey;
}
.comment-publisher {
  font-size: 18px;
  font-weight: 600;
}
.comment-box {
  padding: 15px 0;
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
.like-comment-wrap img:hover{
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
}
.feed-title {
  margin: 20px 0;
  font-size: 30px;
  font-weight: 600;
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
</style>