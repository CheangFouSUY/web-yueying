<template>
<div class="nav">
    <a href="/" id="logoName">
        <img id="headerLogo" src="@/assets/LogoWhite.svg">
        阅·影
    </a>
    <a href="/book" class="navLink">图书</a>
    <a href="/drama" class="navLink">影视</a>
    <a href="/feed" class="navLink">话题</a>
    <a href="/group" class="navLink">小组</a>
    <div class='searchBox'>
                <select id="Type" name="Type">
                    <option value="all">全部</option>
                    <option value="books">图书</option>
                    <option value="dramas">影视</option>
                    <option value="feeds">话题</option>
                    <option value="groups">小组</option>
                </select>
        <input type='text' v-model='searchInfo' placeholder="输入你想搜索的内容">
        <img class="navicon" @click="search" src="@/assets/Search.svg" alt="search_icon">
    </div>
    <el-button v-if="isLogin" id="login" @click="login">登录</el-button>
    <!-- <el-select v-else v-model="value"
    class="loginOption"
    popper-class="loginOption2">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->
    <el-button slot="reference" v-if="!isLogin" id="login" @click="logout">登出</el-button>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%">
    <span>你确定要登出吗？</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="realLogout">确定</el-button>
    </span>
    </el-dialog>
    <!-- <span v-if="!isLogin" id="userInfo">{{userInfo.username}}</span> -->
    <span v-if="!isLogin" id="userInfo">MIKIWONGaaaaaaa</span>
    <el-avatar v-if="!isLogin" id="userAvatar" src="https://www.pngall.com/wp-content/uploads/5/Pokemon-Pikachu-PNG-Image.png"></el-avatar>
    <!-- <span v-else id="loginname" @click="login">{{ userInfo.username }}</span> -->
</div>
</template>

<script>
export default {
    name:'Header',
    props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
    userInfo: String,
    dialogVisible: false,
    },
    methods:{
        search() { 
            this.$router.push('/search/' + this.searchInfo)
        },
        login() {
            // this.$router.push('/login'),
            this.isLogin = !this.isLogin
        },
        logout() {
            this.dialogVisible = true;
        },
        realLogout() {
            this.dialogVisible = false;
            this.isLogin = !this.isLogin;
            this.$message.success("登出成功");
        }
    },
    data() {
        return {
            isLogin: this.isLogin,
            userInfo: this.userInfo,
            value: this.userInfo.username,
            searchInfo:'',
            options: [
                {

                },
            ]
        }
    }
}
</script>

<style scoped>
#headerLogo{
    width: 55px;
    float: left;
    margin-left: 30px;
    margin-top: -4px;
}

#logoName{
    height: 45px;
    font-size: 36px;
    font-weight: 100;
    margin: -3px 20px auto -15px;
    padding: 5px 20px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.nav{
    height: 55px;
    font-size: 22px;
    background-color: #79A3B1;
}
.navLink:hover{
    background-color: #6f9caa;
}
a{
    display: block;
    float: left;
    height: 35px;
    /* outline: 1px black solid; */
    margin: auto;
    padding: 10px 15px;
    padding-right: 15px;
    color: white;
    text-decoration: none;
}
.searchBox{
    display: inline-block;
    border-radius: 10px;
    background-color: rgba(208, 232, 242, 0.1);
    height: 40px;
    width: 400px;
    margin-top: 8px;
    margin-left: 300px; 
}
.searchBox input{
    font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
    height: 30px;
    width: 275px;
    margin-top: 5px;
    margin-left: 10px;
    border: none;
    color: white;
    background-color: rgba(208, 232, 242, 0.01);
}
.searchBox input::placeholder{
    color: white;
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
.navicon:hover{
    cursor: pointer;
}
#userInfo{
    /* border: 1px solid black; */
    float:right;
    width: 150px;
    margin-top: 15px;
    margin-right: 5px;
    font-size: 18px;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
}
#userAvatar{
    float: right;
    margin-top: 7px;
    margin-right: 5px;
}
#login{
    float:right;
    margin-top: 8px;
    margin-right: 10px;
    color: white;
    background-color: rgba(208, 232, 242, 0.01);
}
#login:active{
    border-color: white;
}
#loginname{
    float: right;
    margin-top: 13px;
    margin-right: 20px;
    color: white;
    font-size: 20px;
}
#Type{
    float: left;
    height: 30px;
    background-color: rgba(208, 232, 242, 0.01);
    margin-left: 10px;
    margin-top: 5px;
    font-size: 16px;
    color: white;
    font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
    outline: none;
    position: relative;
    border: none;
}
#Type:hover{
    cursor: pointer;
}
#Type option{
    background-color: #79A3B1;
}
</style>

<style>
.loginOption{
    float: right;
    margin-top: 8px;
    margin-right: 10px;
    background-color: rgba(208, 232, 242, 0.01);
}
.loginOption2{
    background-color: rgba(208, 232, 242, 0.01);
}
</style>
