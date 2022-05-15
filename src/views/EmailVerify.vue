<template>
  <div>
    <Header></Header>
    <div id="Border">
    <div id="logo">
      <img id="logoBook" src="@/assets/LogoBlue.svg">
      <h1>阅·影</h1>
    </div>
    <h1 class="emailTitle">邮箱验证</h1>
    <div class="verifyBox">
      <button id="sendCode" @click="SendCode">发送验证码</button>
      <div class="inputBox">
        <img class="icon" src="@/assets/Email.svg" alt="email_icon">  
        <input type="text" v-model="email" placeholder="输入邮箱">
      </div>
      <div class="inputBox">
        <img class="icon" src="@/assets/Key.svg" alt="key_icon">  
        <input type="text" v-model="verifyKey" placeholder="输入验证码">
      </div>
      <div class='changeLoginWay'>
        <button @click='QuesVerify'>密保问题验证</button>
        <span class='symbol'>|</span>
        <button @click='Login'>回到登录</button>
        <span class='symbol'>|</span>
        <button @click='RegisterNow'>立即注册</button>
      </div>
      <button id="submit" @click="Submit">验证</button>
    </div>
  </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'EmailVerify',
  components: {
    Header
  },
  methods:{
    QuesVerify(){
      this.$router.push('/sqverify')
    },
    Login(){
      this.$router.push('/login')
    },
    RegisterNow(){
      this.$router.push('/register')
    },
    SendCode(){

    }
  }
}
</script>

<style scoped>
/* logo和标题 */
#logo{
    width: 350px;
    margin: 0px auto 40px;
    /* outline: 1px black solid; */
}
#logoBook{
    display: inline-block;
    vertical-align: middle;
    width: 130px;
    margin: auto 8px;
  /* outline: 1px black solid; */
}
#logo h1{
    display: inline-block;
    vertical-align: middle;
    margin: auto;
    font-size: 80px;
    color: #456268;
    font-weight: 100;
  /* outline: 1px black solid; */
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.emailTitle{
  font-weight: 100;
  color: #456268;
  text-align: center;
  letter-spacing: 0.5em;
  text-indent: 0.5em;
  margin: 0 auto 20px;
}

/* 输入框 */
.inputBox{
    height: 55px;
    width: 400px;
    margin: 0px auto 40px;
    border-radius: 10px;
    background-color: rgba(121, 163, 177, 0.4);
  /* outline: 1px black solid; */
    text-align: left;
}
.icon{
  display: block;
  float: left;
  width: 40px;
  margin: 5px 10px;
  /* outline: 1px black solid; */
}
input:focus{
    outline: none;
}
.inputBox:focus-within{
    background-color: rgba(121, 163, 177, 0.6);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}
.inputBox:hover{
    background-color: rgba(121, 163, 177, 0.6);
}
input{
    font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
    display: inline-block;
    height: 50px;
    width: 320px;
    border: none;
    background: none;
    color: #456268;
    font-size: 20px;
    /* border: solid 1px; */
}
#sendCode{
  height: 50px;
  float: right;
  font-size: 20px;
  color: #456268;
  border: none;
  background: none;
}
/* 跳转链接 */
.changeLoginWay button{
    display: inline-block;
    font-size: 14px;
    color: #456268;
    border: none;
    background: none;
    /* outline: 1px black solid; */
}
.changeLoginWay{
    width: 390px;
    margin: -40px auto 10px;
    text-align: right;
    /* outline: 1px black solid; */
}
.changeLoginWay button:hover, #sendCode:hover{
    color: rgba(121, 163, 177, 0.6);
}
.symbol{
  color: #456268;
  font-weight: 100;
  font-size: 14px;
  margin: auto 2px;
}

#submit{
    /* height: 40px; */
    /* width: 400px; */
    height: 50px;
    width: 100px;
    margin: 25px auto;
    background-color: #79A3B1;
    border: none;
    color: white;
    font-size: 20px;
    border-radius: 10px;
    /* letter-spacing: 4em; */
    /* text-indent: 4em; */
    /* text-align: center; */
}
#submit:hover{
    background-color: rgba(121, 163, 177, 0.6);
}
button{
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
  cursor: pointer;
}
.verifyBox{
    width: 650px;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    /* outline: 1px black solid; */
}
#Border{
    width: 700px; 
    margin: auto;
    margin-top: 60px;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding-top: 20px;
    /* border: solid 1px; */
}
</style>