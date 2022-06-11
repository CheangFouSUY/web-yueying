<template>
  <div class="nav">
    <a href="/" id="logoName">
      <img id="headerLogo" src="@/assets/logo.png" />
      <!-- 阅·影 -->
    </a>
    <a href="/book" class="navLink">图书</a>
    <a href="/movie" class="navLink">影视</a>
    <a href="/feed" class="navLink">话题</a>
    <a href="/group" class="navLink">小组</a>
    <div class="searchBox">
      <el-dropdown @command="handleCommand">
        <span id="Type">
          {{searchName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">全部</el-dropdown-item>
          <el-dropdown-item command="book">图书</el-dropdown-item>
          <el-dropdown-item command="drama">影视</el-dropdown-item>
          <el-dropdown-item command="feed">话题</el-dropdown-item>
          <el-dropdown-item command="group">小组</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <input type="text" v-model="searchInfo" placeholder="输入你想搜索的内容"/>
      <img class="navicon" @click="search" src="@/assets/Search.svg" alt="search_icon"/>
    </div>

    <a href="/login" v-if="!isLogin" class="navLink" id="login">登录</a>
    <el-dropdown v-else id="login" class="navLink">
      <a>
        <el-avatar v-if="profileP" id="userAvatar" :src="profileP"></el-avatar>
        <el-avatar v-else id="userAvatar" icon="el-icon-user-solid"></el-avatar>
        <span id="userInfo">{{ userName }}</span>
      </a>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user-solid" @click.native="viewProfile()">个人主页</el-dropdown-item>
        <el-dropdown-item icon="el-icon-collection-tag" @click.native="viewBookmark()">收藏表</el-dropdown-item>
        <el-dropdown-item icon="el-icon-lock" @click.native="logout()">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>你确定要登出吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="realLogout">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog class="bookmark-dialog" title="收藏表" :visible.sync="bookmarkVisible" width="50%">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="图书" name="book">
          <li v-for="item in bookmarkBookList" :key="item.id">
            <span class="bookmark-name" @click="enterBook(item.id)">{{ item.title }}</span>
            <span class="bookmark-delete" @click="deleteBook(item.id, item.score)">取消收藏</span>
          </li>
        </el-tab-pane>
        <el-tab-pane label="影视" name="movie">
          <li v-for="item in bookmarkMovieList" :key="item.id">
            <span class="bookmark-name" @click="enterMovie(item.id)">{{ item.title }}</span>
            <span class="bookmark-delete" @click="deleteMovie(item.id, item.score)">取消收藏</span>
          </li>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: "Header",
  props: {
    initialUsername: String,
    initialProfilePic: String,
  },
  data() {
    return {
      status: false,
      dialogVisible: false,
      bookmarkVisible: false,
      isLogin: false,
      userName: this.initialUsername,
      searchInfo: "",
      userId: "",
      profileP: "",
      searchType: "all",
      searchName: "全部",
      bookmarkBookList:[],
      bookmarkMovieList:[],
      activeName: "book"
    };
  },
  created() {
    var userInfo;
    if ((userInfo = user.getters.getUser(user.state()))) {
      if (userInfo.user.confirmed) {
        this.isLogin = true;
        this.userId = userInfo.user.id;
        this.getUser();
        this.getBookmarkList();
      }
    }
  },
  methods: {
    async deleteBook(bookid, score) {
      var formData = new FormData();
      formData.append("isSaved", false);
      formData.append("bookId", bookid);
      formData.append("rateScore", score);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "put",
        url: "/api/v1/book/react/" + bookid,
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.bookmarkBookList = this.bookmarkBookList.filter(item => item.id != bookid);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async deleteMovie(movieid, score) {
      var formData = new FormData();
      formData.append("isSaved", false);
      formData.append("movieId", movieid);
      formData.append("rateScore", score);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "put",
        url: "/api/v1/movie/react/" + movieid,
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.bookmarkMovieList = this.bookmarkMovieList.filter(item => item.id != movieid);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCommand(command) {
        this.searchType = command;
        if(command == "all") this.searchName = "全部";
        else if(command == "book") this.searchName = "图书";
        else if(command == "drama") this.searchName = "影视";
        else if(command == "feed") this.searchName = "话题";
        else if(command == "group") this.searchName = "小组";
    },
    getUser() {
      this.$axios({
        method: "get",
        url: "/api/v1/user/" + this.userId,
      }).then((res) => {
        this.userName = res.data.username;
        this.profileP = res.data.profile;
        this.status = true;
      });
    },
    getBookmarkList() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };
      
      this.$axios({
        method: "get",
        url: "/api/v1/book/list?isSaved=True",
        headers: header,
      }).then((res) => {
        this.bookmarkBookList = res.data.results;
      });
      this.$axios({
        method: "get",
        url: "/api/v1/movie/list?isSaved=True",
        headers: header,
      }).then((res) => {
        this.bookmarkMovieList = res.data.results;
      });
    },
    search() {
      setTimeout(() => {
        this.$router.push(
          "/search" + this.searchType + "/?name=" + this.searchInfo
        );
      }, 10);
    },
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.dialogVisible = true;
    },
    realLogout() {
      this.dialogVisible = false;
      this.isLogin = false;
      localStorage.removeItem("token");
      this.$store.dispatch("clear");
      this.$message.success("登出成功");
      setTimeout(() => {
        this.$router.push({ path:'/'});
        location.reload();
      }, 500);
    },
    viewBookmark() {
      this.bookmarkVisible = true;
    },
    viewProfile() {
      this.$router.push({ path: `/profile/${this.userId}` });
    },
    enterBook(bookid) {
      this.$router.push({ path: `/book/detail/${bookid}` });
    },
    enterMovie(movieid) {
      this.$router.push({ path: `/movie/detail/${movieid}` });
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
.bookmark-delete {
  float: right;
  cursor: pointer;
  color: red;
}
.bookmark-name:hover {
  cursor: pointer;
  color: #79a3b1;
}
.bookmark-name {
  color: #456268;
}
.bookmark-dialog li{
  list-style: none;
  font-size: 16px;
  line-height: 24px;
}
.bookmark-dialog ::v-deep .el-tabs__active-bar {
  background-color: #79a3b1 !important;
}
.bookmark-dialog ::v-deep .el-tabs__item:hover {
  color: #79a3b1 !important;
}
.bookmark-dialog ::v-deep .el-tabs__item.is-active {
  color: #79a3b1 !important;
}
.bookmark-dialog ::v-deep .el-tabs__item {
  color: #456268 !important;
  font-size: 20px;
}
#headerLogo {
  height: 50px;
  float: left;
  margin-left: 25px;
  margin-top: 0px;
}
#logoName {
  height: 45px;
  font-size: 36px;
  font-weight: 100;
  margin: -3px 20px auto -15px;
  padding: 5px 20px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.nav {
  height: 55px;
  font-size: 22px;
  background-color: #456268;
}
.navLink:hover {
  background-color: #3d595f;
}
a {
  display: block;
  float: left;
  height: 35px;
  margin: auto;
  padding: 10px 15px;
  padding-right: 15px;
  color: white;
  text-decoration: none;
  cursor: pointer;
}
.searchBox {
  display: inline-block;
  border-radius: 10px;
  background-color: rgba(208, 232, 242, 0.1);
  height: 40px;
  width: 400px;
  margin-top: 8px;
  margin-left: 180px;
}
.searchBox input {
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
  height: 30px;
  width: 275px;
  margin-top: 5px;
  margin-left: 10px;
  border: none;
  color: white;
  font-size: 16px;
  background-color: rgba(208, 232, 242, 0.01);
}
.searchBox input::placeholder {
  color: rgb(192, 192, 192);
}
.searchBox input:focus {
  outline: none;
}
.navicon {
  width: 30px;
  float: right;
  margin-top: 5px;
  margin-right: 5px;
}
.navicon:hover {
  cursor: pointer;
}
#userInfo {
  margin-left: 10px;
  max-width: 150px;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  top: -16px;
}
#userAvatar {
  display: inline-block;
  position: relative;
  top: -2px;
}
#userAvatar:hover{
  cursor: pointer;
}
#login {
  float: right;
}
#Type {
  margin-left: 10px;
  font-size: 16px;
  color: white;
  cursor: pointer;
}
</style>

<style>
.loginOption {
  float: right;
  margin-top: 8px;
  margin-right: 10px;
  background-color: rgba(208, 232, 242, 0.01);
}
.loginOption2 {
  background-color: rgba(208, 232, 242, 0.01);
}
</style>
