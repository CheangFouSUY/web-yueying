<template>
    <div class='login'>
        <Header/>
        <div id='logo'>
        <img id="logoBook" src="@/assets/LogoBlue.svg">
        <h1>阅·影</h1>
        </div>
        <div class='inputBox'>
        <img class="icon" src="@/assets/Email.svg" alt="email_icon">
        <input type="text" v-model="email" placeholder="输入你的邮箱">
        </div>
        <div class='inputBox'>
        <img class="icon" src="@/assets/Password.svg" alt="password_icon">  
        <input type="password" v-model="password" placeholder="输入你的密码">
        </div>
        <div class='ForgetnRegister'>
        <span @click='ForgetPw'>忘记密码</span>
        <span id='symbol'>|</span>
        <span @click='RegisterNow'>立即注册</span>
        </div>
        <button @click='Login'>登录</button>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Login',
  components: {
    Header
  },
  methods: {
    ForgetPw() {
        this.$router.push("/emailverify");
    },
    RegisterNow() {
        this.$router.push("/register");
    },
    Login() {
        this.$router.push("/");
    },
  }
}
</script>

<style scoped>
.login #logo{
    width: 350px;
    margin: 80px auto 40px;
}
.login #logoBook{
    display: inline-block;
    vertical-align: middle;
    width: 130px;
    margin: auto 8px;
}
#logo h1{
    display: inline-block;
    vertical-align: middle;
    margin: auto;
    font-size: 80px;
    color: #456268;
    font-weight: 100;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.login h1{
    margin-top: 50px;
    text-align: center;
    font-size: 72px;
    color: #456268;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.login input{
    display: inline-block;
    background: none;
    border: none;
    width: 350px;
    height: 55px;
    font-size:20px;
    font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
}
.login input:focus{
    outline: none;
}
.login button{
    display: block;
    margin-top: 20px;
    height: 55px;
    width: 400px;
    border: none;
    margin-left: auto;
    margin-right: auto;
    background-color: #79A3B1;
    border-radius: 10px;
    font-size: 20px;
    color: white;
}
.login button:hover{
    cursor: pointer;
    background-color: rgba(121, 163, 177, 0.6);
    outline: none;
}
.ForgetnRegister span{
    display: inline-block;
    font-size: 18px;
    color: #456268;
    cursor: pointer;
    margin-left: 10px;
}
.ForgetnRegister{
    width: 420px;
    display:inline-block;
    position: relative;
    top: -20px;
    text-align: right;
}
.ForgetnRegister span:hover{
    color: rgba(121, 163, 177, 0.6);
}
.login .inputBox{
  width: 420px;
  height: 55px;
  margin: 0px auto 40px;
  border-radius: 10px;
  background-color: rgba(121, 163, 177, 0.4);
}
.login .icon{
  display: inline;
  vertical-align: middle;
  width: 40px;
  margin: auto 10px 10px 0;
}
.login .inputBox:focus-within{
    background-color: rgba(121, 163, 177, 0.6);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}
.login .inputBox:hover{
    background-color: rgba(121, 163, 177, 0.6);
}
#symbol{
    cursor: default;
    font-size: 25px;
}
#symbol:hover{
    color: #456268;
}
input, select, textarea{
    color: #456268;
}
input::placeholder{
  color:  #456268;
;
}
.login{
    text-align: center;
}
</style>