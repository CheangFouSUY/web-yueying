<template>
  <div class="nav">
    <a href="/" id="logoName">
      <img id="headerLogo" src="@/assets/LogoWhite.svg" />
      阅·影
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
        <el-dropdown-item icon="el-icon-collection-tag">收藏表</el-dropdown-item>
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
      isLogin: false,
      userName: this.initialUsername,
      searchInfo: "",
      userId: "",
      profileP: "",
      searchType: "all",
      searchName: "全部",
    };
  },
  created() {
    var userInfo;
    if ((userInfo = user.getters.getUser(user.state()))) {
      if (userInfo.user.confirmed) {
        this.isLogin = true;
        this.userId = userInfo.user.id;
        this.getUser();
      }
    }
  },
  methods: {
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
    viewProfile() {
      this.$router.push({ path: `/profile/${this.userId}` });
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
#headerLogo {
  width: 55px;
  float: left;
  margin-left: 30px;
  margin-top: -4px;
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
  vertical-align: middle;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
}
#userAvatar {
  vertical-align: middle;
}
#login {
  float: right;
}
#Type {
  margin-left: 10px;
  font-size: 16px;
  color: white;
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
